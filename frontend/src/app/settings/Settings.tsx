import * as React from 'react';

import { IconButton } from '@shared/buttons';
import { Tooltip } from '@shared/tooltip';
import { SlideToggle, FormControlModel } from '@shared/form';
import { Fade } from '@shared/fade';
import { Dialog } from '@shared/dialog';

import './Settings.light.scss';
import './Settings.dark.scss';

interface Props {
}

interface State {
  showSettingsMenu: boolean;
  top: number;
  left: number;
  themeSelectedPreviously: 'light' | 'dark';
}

export class Settings extends React.Component<Props, State> {

  readonly isDarkThemeSelectedFormControl = new FormControlModel(true);
  readonly menuOpenerRef = React.createRef<HTMLElement>();

  constructor(props: Props) {
    super(props);

    this.state = {
      showSettingsMenu: false,
      top: 0,
      left: 0,
      themeSelectedPreviously: this._getPreviouslySelectedTheme()
    };

    this.showSettingsMenu = this.showSettingsMenu.bind(this);
    this.hideSettingsMenu = this.hideSettingsMenu.bind(this);
  }

  private _getPreviouslySelectedTheme() {
    const selectedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    return selectedTheme ? selectedTheme : __DEFAULT_SELECTED_THEME__;
  }

  componentDidMount() {
    const boundingBox = this.menuOpenerRef.current.getBoundingClientRect();
    this.setState({
      left: boundingBox.left - 200,
      top: boundingBox.top + 15
    });
    if (this.state.themeSelectedPreviously !== 'dark') {
      setTimeout(() => {
        this._toggleTheme(this.state.themeSelectedPreviously === 'dark');
      }, 16);
    }
    this.isDarkThemeSelectedFormControl.valueChanges()
      .subscribe({
        next: this._toggleTheme
      });
  }

  private _toggleTheme(isDarkThemeSelected: boolean) {
    // These variables are injected by webpack
    // They are declared in src/webpack-injections.d.ts
    const styleFilename = isDarkThemeSelected ? __DARK_THEME_STYLE_FILENAME__ : __LIGHT_THEME_STYLE_FILENAME__;
    const link = document.head.querySelector('link[rel=stylesheet]') as HTMLLinkElement;
    link.href = styleFilename;
    localStorage.setItem('theme', isDarkThemeSelected ? 'dark' : 'light');
  }

  componentWillUnmount() {
    this.isDarkThemeSelectedFormControl.cleanup();
  }

  render() {
    return (
      <section
        ref={this.menuOpenerRef}
        className='settings'>
        <Tooltip content='Settings'>
          <IconButton
            rounded
            hasBackground={false}
            className='settings__trigger'
            icon='more_vert'
            size='large'
            rippleDuration={1250}
            onClick={this.showSettingsMenu} />
        </Tooltip>
        <Dialog
          transparentBackdrop
          show={this.state.showSettingsMenu}
          top={this.state.top}
          left={this.state.left}
          onBackdropClicked={this.hideSettingsMenu}>
          <Fade in={this.state.showSettingsMenu}>
            <ul className='settings__menu'>
              <li className='settings__menu__item'>
                <div className='settings__menu__item__name'>
                  Theme
                </div>
                <div className='settings__menu__item__action'>
                  <SlideToggle
                    className='theme-toggler'
                    direction='horizontal'
                    onText='Dark'
                    offText='Light'
                    isOn={this.state.themeSelectedPreviously === 'dark'}
                    formControlModel={this.isDarkThemeSelectedFormControl} />
                </div>
              </li>
            </ul>
          </Fade>
        </Dialog>
      </section>
    );
  }

  showSettingsMenu() {
    this.setState({
      showSettingsMenu: true
    });
  }

  hideSettingsMenu() {
    this.setState({
      showSettingsMenu: false
    });
  }

}
