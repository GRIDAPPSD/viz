import { timeFormat, timeParse } from 'd3-time-format';

export const enum TimeZone {
  EST = 'EST',
  PST = 'PST',
  UTC = 'UTC',
  LOCAL = 'LOCAL'
}

export class DateTimeService {

  private static readonly _INSTANCE_ = new DateTimeService();

  private readonly _formatter = timeFormat('%Y-%m-%d %H:%M:%S');
  private readonly _parserRegular = timeParse('%Y-%m-%d %H:%M:%S');
  private readonly _parserWithMilliseconds = timeParse('%Y-%m-%d %H:%M:%S.%L');

  private _timeZone = this._restoreSavedTimeZone();
  private _timeZoneOffsetInMilliseconds = 0;

  private _restoreSavedTimeZone() {
    const savedTimeZone = localStorage.getItem('timeZone') as TimeZone || TimeZone.LOCAL;
    this.setTimeZone(savedTimeZone);
    return savedTimeZone;
  }

  static getInstance() {
    return DateTimeService._INSTANCE_;
  }

  setTimeZone(timeZone: TimeZone) {
    localStorage.setItem('timeZone', timeZone);
    this._timeZone = timeZone;

    switch (timeZone) {
      case TimeZone.LOCAL:
        this._timeZoneOffsetInMilliseconds = 0;
        break;
      case TimeZone.UTC:
        this._timeZoneOffsetInMilliseconds = new Date().getTimezoneOffset() * 60 * 1000;
        break;
      case TimeZone.EST:
      case TimeZone.PST: {
        const offsetFromGmt = new Date().getTimezoneOffset() * 60 * 1000;
        // We want to find the offset difference between user's time zone
        // and EST. GMT is 5 hours ahead of EST, and 8 hours ahead of PST
        this._timeZoneOffsetInMilliseconds = offsetFromGmt - (timeZone === TimeZone.EST ? 5 : 8) * 60 * 60 * 1000;
      }
    }
  }

  currentTimeZone() {
    return this._timeZone;
  }

  resolveDateTime(dateTime: Date) {
    return new Date(dateTime.getTime() + this._timeZoneOffsetInMilliseconds);
  }

  format(date: Date | number | string) {
    if (typeof date === 'number') {
      return this._formatter(this.resolveDateTime(new Date(date * 1000)));
    }
    if (date instanceof Date) {
      return this._formatter(this.resolveDateTime(date));
    }
    return date;
  }

  /**
   * Parse the given date time string and return epoch time in second precision
   * @param str Date time string in YYYY-MM-DD HH:MM:SS or YYYY-MM-DD HH:MM:SS.LLL format
   */
  parse(str: string) {
    const parsedDateTime = !str.includes('.') ? this._parserRegular(str) : this._parserWithMilliseconds(str);
    return parsedDateTime ? (parsedDateTime.getTime() - this._timeZoneOffsetInMilliseconds) / 1000 : null;
  }

}
