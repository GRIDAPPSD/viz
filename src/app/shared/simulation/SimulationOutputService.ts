import { Subject, Observable } from 'rxjs';

import { ModelDictionaryMeasurement } from '../../models/model-dictionary/ModelDictionaryMeasurement';
import { SimulationOutputMeasurement } from './SimulationOutputMeasurement';
import { SimulationControlService } from './SimulationControlService';
import { StompClientService } from '@shared/StompClientService';
import { SIMULATION_OUTPUT_TOPIC } from './topics';

export class SimulationOutputService {

  private static readonly _INSTANCE = new SimulationOutputService();

  private readonly _stompClientService = StompClientService.getInstance();
  private _modelDictionaryMeasurements: { [mRID: string]: ModelDictionaryMeasurement };
  private _outputTimestamp: number;
  private _simulationOutputMeasurementsStream = new Subject<SimulationOutputMeasurement[]>();

  private constructor() {
    this._subscribeToSimulationOutputTopic();
  }

  static getInstance() {
    return SimulationOutputService._INSTANCE;
  }

  getOutputTimestamp() {
    return this._outputTimestamp;
  }

  setModelDictionaryMeasures(value: { [mRID: string]: ModelDictionaryMeasurement }) {
    this._modelDictionaryMeasurements = value;
  }

  simulationOutputMeasurementsReceived(): Observable<SimulationOutputMeasurement[]> {
    return this._simulationOutputMeasurementsStream.asObservable();
  }

  private _subscribeToSimulationOutputTopic() {
    this._stompClientService.readFrom(SIMULATION_OUTPUT_TOPIC)
      .subscribe({
        next: data => {
          const payload = JSON.parse(data);
          if (payload) {
            this._outputTimestamp = payload.message.timestamp;
            const measurements: SimulationOutputMeasurement[] = payload.message.measurements.map(measurement => {
              const measurementInModelDictionary = this._modelDictionaryMeasurements[measurement.measurement_mrid];
              if (measurementInModelDictionary)
                return {
                  name: measurementInModelDictionary.name,
                  type: measurementInModelDictionary.measurementType,
                  magnitude: measurement.magnitude,
                  angle: measurement.angle,
                  value: measurement.value,
                  mRID: measurement.measurement_mrid,
                  phases: measurementInModelDictionary.phases,
                  conductingEquipmentName: measurementInModelDictionary.ConductingEquipment_name,
                  connectivityNode: measurementInModelDictionary.ConnectivityNode
                };
              return null;
            }).filter(e => e !== null);
            this._simulationOutputMeasurementsStream.next(measurements);
          }
        }
      });
  }
}