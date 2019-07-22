import * as React from 'react';

import { IconButton } from '@shared/buttons';
import { SimulationStatus } from '@shared/simulation';
import { Tooltip } from '@shared/tooltip';
import { Ripple } from '@shared/ripple';
import { PlotModel } from '@shared/plot-model';
import { OverlayService } from '@shared/overlay';
import { PlotModelCreator } from './views/plot-model-creator/PlotModelCreator';
import { ModelDictionary } from '@shared/topology';

import './SimulationControl.scss';

interface Props {
  timestamp: string;
  simulationStatus: SimulationStatus;
  simulationId: string;
  onStartSimulation: () => void;
  onStopSimulation: () => void;
  onPauseSimulation: () => void;
  onResumeSimulation: () => void;
  onPlotModelCreationDone: (plotModels: PlotModel[]) => void;
  modelDictionary: ModelDictionary;
  existingPlotModels: PlotModel[];
}

interface State {
  simulationIdCopiedSuccessfully: boolean;
  showStartSimulationButton: boolean;
}

export class SimulationControl extends React.Component<Props, State> {

  private readonly _overlayService = OverlayService.getInstance();

  constructor(props: Props) {
    super(props);
    this.state = {
      simulationIdCopiedSuccessfully: false,
      showStartSimulationButton: false
    };

    this.saveSimulationIdToClipboard = this.saveSimulationIdToClipboard.bind(this);
    this.showPlotModelCreator = this.showPlotModelCreator.bind(this);
  }

  render() {
    return (
      <div className='simulation-control'>
        {
          this.props.simulationId
          &&
          < div className='simulation-control__simulation-id'>
            <span className='simulation-control__simulation-id__label'>Simulation ID</span>
            <Ripple>
              <span className='simulation-control__simulation-id__value-wrapper'>
                {
                  this.state.simulationIdCopiedSuccessfully
                  &&
                  <Tooltip content='Copied to clipboard'>
                    <span className='simulation-control__simulation-id__value__copied-successfully-tooltip' />
                  </Tooltip>
                }
                <span
                  className='simulation-control__simulation-id__value'
                  onClick={this.saveSimulationIdToClipboard}
                  style={{ pointerEvents: this.state.simulationIdCopiedSuccessfully ? 'none' : 'all' }}>
                  {this.props.simulationId}
                </span>
              </span>
            </Ripple>
          </div>
        }
        <span className='simulation-control__timestamp'>
          {this.props.timestamp}
        </span>
        {
          this.state.showStartSimulationButton
          &&
          (
            this.props.simulationStatus === SimulationStatus.STARTED || this.props.simulationStatus === SimulationStatus.RESUMED
              ?
              <>
                <Tooltip position='bottom' content='Pause simulation'>
                  <IconButton
                    icon='pause'
                    className='simulation-control__action'
                    onClick={this.props.onPauseSimulation} />
                </Tooltip>
                <Tooltip position='bottom' content='Stop simulation'>
                  <IconButton
                    icon='stop'
                    className='simulation-control__action'
                    onClick={this.props.onStopSimulation} />
                </Tooltip>
              </>
              : this.props.simulationStatus === SimulationStatus.PAUSED
                ?
                <>
                  <Tooltip position='bottom' content='Resume simulation'>
                    <IconButton
                      icon='play_arrow'
                      className='simulation-control__action resume'
                      onClick={this.props.onResumeSimulation} />
                  </Tooltip>
                  <Tooltip position='bottom' content='Stop simulation'>
                    <IconButton
                      icon='stop'
                      className='simulation-control__action'
                      onClick={this.props.onStopSimulation} />
                  </Tooltip>
                </>
                :
                <Tooltip position='bottom' content='Start simulation'>
                  <IconButton
                    icon='play_arrow'
                    className='simulation-control__action start'
                    onClick={this.props.onStartSimulation} />
                </Tooltip>
          )
        }
        <Tooltip
          position='bottom'
          content='Edit plots'>
          <IconButton
            icon='show_chart'
            className='simulation-control__action add-component-to-plot'
            disabled={!this.props.modelDictionary}
            onClick={this.showPlotModelCreator} />
        </Tooltip>
      </div>

    );
  }

  saveSimulationIdToClipboard(event: React.SyntheticEvent) {
    const fakeInput = document.createElement('input');
    fakeInput.setAttribute('style', 'position:fixed');
    fakeInput.value = (event.target as HTMLElement).textContent;
    document.body.appendChild(fakeInput);
    fakeInput.select();

    this.setState({
      simulationIdCopiedSuccessfully: document.execCommand('copy')
    });

    window.getSelection().removeAllRanges();
    document.body.removeChild(fakeInput);

    setTimeout(() => {
      this.setState({
        simulationIdCopiedSuccessfully: false
      });
    }, 2000);
  }

  showPlotModelCreator() {
    this._overlayService.show(
      <PlotModelCreator
        modelDictionary={this.props.modelDictionary}
        existingPlotModels={this.props.existingPlotModels}
        onSubmit={models => {
          this.props.onPlotModelCreationDone(models);
          this._overlayService.hide();
          this.setState({
            showStartSimulationButton: true
          });
        }}
        onClose={this._overlayService.hide} />
    );
  }

}
