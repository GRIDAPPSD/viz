import * as React from 'react';

import { Backdrop } from '../backdrop/Backdrop';

import './Wait.light.scss';
import './Wait.dark.scss';

interface Props {
  show: boolean;
}

interface State {
  height: number;
}

export class Wait extends React.Component<Props, State> {

  readonly waitElementRef = React.createRef<HTMLDivElement>();

  constructor(props: any) {
    super(props);
    this.state = {
      height: 0
    };
  }

  componentDidMount() {
    if (this.waitElementRef.current) {
      let height = this.waitElementRef.current.clientHeight;
      if (height === 0) {
        let waitElementParent = this.waitElementRef.current.parentElement;
        while (height === 0 && waitElementParent !== null) {
          height = waitElementParent.clientHeight;
          waitElementParent = waitElementParent.parentElement;
        }
      }
      this.setState({ height });
    }
  }

  render() {
    if (this.props.show) {
      return (
        <div
          ref={this.waitElementRef}
          className='wait'
          style={{
            height: this.state.height > 0 ? this.state.height + 'px' : '100%'
          }}>
          <Backdrop visible />
          <div className='dots'>
            <span className='dot' />
            <span className='dot' />
            <span className='dot' />
            <span className='dot' />
            <span className='dot' />
            <span className='dot' />
            <span className='dot' />
            <span className='dot' />
            <span className='dot' />
          </div>
        </div>
      );
    }
    return null;
  }

}