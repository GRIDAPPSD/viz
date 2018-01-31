import * as React from 'react';
import './RequestConfigForm.styles.scss';
import { DropdownMenu } from '../dropdown-menu/DropdownMenu';
import { MenuItem } from '../dropdown-menu/MenuItem';
import { Link } from 'react-router-dom';

interface Props {
  show: boolean;
  onDone: () => void;
}

interface State {

}
export class RequestConfigForm extends React.Component<Props, {}> {

  constructor(props: any) {
    super(props);
  }
  render() {
    if (this.props.show)
      return (
        <form className='request-config-form'>
          <div className='group power-system-config'>
            <header>Power System Config</header>
            <div className='controls'>
              <div className='control'>
                <label>Geographical Region Name</label>
                <DropdownMenu
                  menuItems={[new MenuItem('ieee8500nodecktassets_Region', 'ieee8500nodecktassets_Region', 'ieee8500nodecktassets_Region')]}
                  onMenuItemClick={console.log}
                  reset={true}
                />
              </div>
              <div className='control'>
                <label>SubGeographical Region Name</label>
                <DropdownMenu
                  menuItems={[new MenuItem('ieee8500nodecktassets_SubRegion', 'ieee8500nodecktassets_SubRegion', 'ieee8500nodecktassets_SubRegion')]}
                  onMenuItemClick={console.log}
                  reset={true}
                />
              </div>
              <div className='control'>
                <label>Line Name</label>
                <DropdownMenu
                  menuItems={[new MenuItem('ieee8500', 'ieee8500', 'ieee8500')]}
                  onMenuItemClick={console.log}
                  reset={true}
                />
              </div>
            </div>
          </div>
          <div className='group simulation-config'>
            <header>Simulation Config</header>
            <div className='control'>
              <label>Duration</label>
              <span className='input-field ripple'>
                <input type='number' name='duration' className='duration' defaultValue='120' />
                <span className='ripple-bar'></span>
              </span>
            </div>
            <div className='control'>
              <label>Simulator</label>
              <span className='input-field ripple'>
                <input type='text' name='simulator' className='simulator' defaultValue='GridLAB-D' />
                <span className='ripple-bar'></span>
              </span>
            </div>
            <div className='control'>
              <label>Timestep Frequency</label>
              <span className='input-field ripple'>
                <input type='number' name='timestep_frequency' className='timestep-frequency' defaultValue='1000' />
                <span className='ripple-bar'></span>
              </span>
            </div>
            <div className='control'>
              <label>Timestep Increment</label>
              <span className='input-field ripple'>
                <input type='number' name='timestep_increment' className='timestep-increment' step='1000' defaultValue='1000' />
                <span className='ripple-bar'></span>
              </span>
            </div>
            <div className='control'>
              <label>Simulation Name</label>
              <span className='input-field ripple'>
                <input type='text' name='simulation_name' className='simulation-name' defaultValue='ieee8500' />
                <span className='ripple-bar'></span>
              </span>
            </div>
            <div className='control'>
              <label>Power Flow Solver Method</label>
              <span className='input-field ripple'>
                <input type='text' name='power_flow_solver_method' className='power-flow-solver-method' defaultValue='NR' />
                <span className='ripple-bar'></span>
              </span>
            </div>
          </div>
          <div className='group application-config'>
            <header>Application Config</header>
            <div className='controls'>
              <div className='control'>
                <label>VVO</label>
                <textarea name='vvo' defaultValue={REQUEST.application_config.applications[0].config_string}></textarea>
              </div>
            </div>
          </div>
          <Link to='/ieee8500' className='done app-icon' onClick={this.props.onDone}></Link>
        </form>
      );
    return null;
  }
}

const REQUEST = {
  "power_system_config": {
    "GeographicalRegion_name": "ieee8500nodecktassets_Region",
    "SubGeographicalRegion_name": "ieee8500nodecktassets_SubRegion",
    "Line_name": "ieee8500"
  },
  "simulation_config": {
    "start_time": "2009-07-21 00:00:00",
    "duration": "120",
    "simulator": "GridLAB-D",
    "timestep_frequency": "1000",
    "timestep_increment": "1000",
    "simulation_name": "ieee8500",
    "power_flow_solver_method": "NR",
    "simulation_output": {
      "output_objects": [{
        "name": "rcon_FEEDER_REG",
        "properties": ["connect_type", "Control", "control_level", "PT_phase", "band_center", "band_width", "dwell_time", "raise_taps", "lower_taps", "regulation"]
      }, {
        "name": "rcon_VREG2",
        "properties": ["connect_type", "Control", "control_level", "PT_phase", "band_center", "band_width", "dwell_time", "raise_taps", "lower_taps", "regulation"]
      }, {
        "name": "rcon_VREG3",
        "properties": ["connect_type", "Control", "control_level", "PT_phase", "band_center", "band_width", "dwell_time", "raise_taps", "lower_taps", "regulation"]
      }, {
        "name": "rcon_VREG4",
        "properties": ["connect_type", "Control", "control_level", "PT_phase", "band_center", "band_width", "dwell_time", "raise_taps", "lower_taps", "regulation"]
      }, {
        "name": "reg_FEEDER_REG",
        "properties": ["configuration", "phases", "to", "tap_A", "tap_B", "tap_C"]
      }, {
        "name": "reg_VREG2",
        "properties": ["configuration", "phases", "to", "tap_A", "tap_B", "tap_C"]
      }, {
        "name": "reg_VREG3",
        "properties": ["configuration", "phases", "to", "tap_A", "tap_B", "tap_C"]
      }, {
        "name": "reg_VREG4",
        "properties": ["configuration", "phases", "to", "tap_A", "tap_B", "tap_C"]
      }, {
        "name": "cap_capbank0a",
        "properties": ["phases", "pt_phase", "phases_connected", "control", "control_level", "capacitor_A", "dwell_time", "switchA"]
      }, {
        "name": "cap_capbank1a",
        "properties": ["phases", "pt_phase", "phases_connected", "control", "control_level", "capacitor_A", "dwell_time", "switchA"]
      }, {
        "name": "cap_capbank2a",
        "properties": ["phases", "pt_phase", "phases_connected", "control", "control_level", "capacitor_A", "dwell_time", "switchA"]
      }, {
        "name": "cap_capbank0b",
        "properties": ["phases", "pt_phase", "phases_connected", "control", "control_level", "capacitor_B", "dwell_time", "switchB"]
      }, {
        "name": "cap_capbank1b",
        "properties": ["phases", "pt_phase", "phases_connected", "control", "control_level", "capacitor_B", "dwell_time", "switchB"]
      }, {
        "name": "cap_capbank2b",
        "properties": ["phases", "pt_phase", "phases_connected", "control", "control_level", "capacitor_B", "dwell_time", "switchB"]
      }, {
        "name": "cap_capbank0c",
        "properties": ["phases", "pt_phase", "phases_connected", "control", "control_level", "capacitor_C", "dwell_time", "switchC"]
      }, {
        "name": "cap_capbank1c",
        "properties": ["phases", "pt_phase", "phases_connected", "control", "control_level", "capacitor_C", "dwell_time", "switchC"]
      }, {
        "name": "cap_capbank2c",
        "properties": ["phases", "pt_phase", "phases_connected", "control", "control_level", "capacitor_C", "dwell_time", "switchC"]
      }, {
        "name": "cap_capbank3",
        "properties": ["phases", "pt_phase", "phases_connected", "control", "control_level", "capacitor_A", "capacitor_B", "capacitor_C", "dwell_time", "switchA", "switchB", "switchC"]
      }, {
        "name": "xf_hvmv_sub",
        "properties": ["power_in_A", "power_in_B", "power_in_C"]
      }, {
        "name": "nd_l2955047",
        "properties": ["voltage_A", "voltage_B", "voltage_C"]
      }, {
        "name": "nd_l2673313",
        "properties": ["voltage_A", "voltage_B", "voltage_C"]
      }, {
        "name": "nd_l3160107",
        "properties": ["voltage_A", "voltage_B", "voltage_C"]
      }, {
        "name": "nd_l2876814",
        "properties": ["voltage_A", "voltage_B", "voltage_C"]
      }, {
        "name": "nd_l3254238",
        "properties": ["voltage_A", "voltage_B", "voltage_C"]
      }, {
        "name": "nd_m1047574",
        "properties": ["voltage_A", "voltage_B", "voltage_C"]
      }, {
        "name": "nd__hvmv_sub_lsb",
        "properties": ["voltage_A", "voltage_B", "voltage_C"]
      }, {
        "name": "nd_190-8593",
        "properties": ["voltage_A", "voltage_B", "voltage_C"]
      }, {
        "name": "nd_190-8581",
        "properties": ["voltage_A", "voltage_B", "voltage_C"]
      }, {
        "name": "nd_190-7361",
        "properties": ["voltage_A", "voltage_B", "voltage_C"]
      }]
    },
    "model_creation_config": {
      "load_scaling_factor": "1",
      "schedule_name": "ieeezipload",
      "z_fraction": "0",
      "i_fraction": "1",
      "p_fraction": "0"
    }
  },
  "application_config": {
    "applications": [
      {
        "name": "vvo", "config_string": "{\"static_inputs\": {\"ieee8500\" : {\"control_method\": \"ACTIVE\", \"capacitor_delay\": 60, \"regulator_delay\": 60, \"desired_pf\": 0.99, \"d_max\": 0.9, \"d_min\": 0.1,\"substation_link\": \"xf_hvmv_sub\",\"regulator_list\": [\"reg_FEEDER_REG\", \"reg_VREG2\", \"reg_VREG3\", \"reg_VREG4\"],\"regulator_configuration_list\": [\"rcon_FEEDER_REG\", \"rcon_VREG2\", \"rcon_VREG3\", \"rcon_VREG4\"],\"capacitor_list\": [\"cap_capbank0a\",\"cap_capbank0b\", \"cap_capbank0c\", \"cap_capbank1a\", \"cap_capbank1b\", \"cap_capbank1c\", \"cap_capbank2a\", \"cap_capbank2b\", \"cap_capbank2c\", \"cap_capbank3\"], \"voltage_measurements\": [\"nd_l2955047,1\", \"nd_l3160107,1\", \"nd_l2673313,2\", \"nd_l2876814,2\", \"nd_m1047574,3\", \"nd_l3254238,4\"],       \"maximum_voltages\": 7500, \"minimum_voltages\": 6500,\"max_vdrop\": 5200,\"high_load_deadband\": 100,\"desired_voltages\": 7000,   \"low_load_deadband\": 100,\"pf_phase\": \"ABC\"}}}"
      }
    ]

  }
};