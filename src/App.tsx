import React from 'react';
import './App.css';
import Ui from './components/Ui'
import Fader from "./components/Fader";
import Osc from "./components/Osc";
import Module from "./components/Module";

function App() {
  return (
          <div className="App">
              SYNTH
              <Ui name='ui'>
                  <Module name={'1'} type={'volume'}>
                      <Fader name={'fader1'} type={'volume1'}/>
                  </Module>
                  <Fader name={'fader2'} type={'volume2'}/>
                  <Fader name={'fader3'} type={'volume3'}/>
          <div className="osc-div">
              <Osc name={'Osc1'} type={'osc'}/>
          </div>
      </Ui>
      </div>

  );
}

export default App;
