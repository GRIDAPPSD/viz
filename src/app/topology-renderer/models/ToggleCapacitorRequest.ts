import { MessageRequest } from '../../models/message-requests/MessageRequest';

export class ToggleCapacitorRequest implements MessageRequest {
  readonly url = '/topic/goss.gridappsd.fncs.input';
  readonly replyTo = '/topic/goss.gridappsd.fncs.input.capacitor';
  constructor(readonly requestBody: any) {

  }

}