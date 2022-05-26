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
            <Ui name='ui1'>
                <Module name={'2'} type={'osc'}>
                    <Osc name={'Osc1'} type={'osc'}/>
                </Module>
                <Module name={'3'} type={'osc'}>
                    <Osc name={'Osc2'} type={'osc'}/>
                </Module>
                <Module name={'1'} type={'volume'}>
                    <Fader name={'fader1'} type={'volume'}/>
                    <Fader name={'fader2'} type={'volume'}/>
                    <Fader name={'fader3'} type={'volume'}/>
                </Module>

            </Ui>
            <Ui name={'UI2'}>
                <Module name={'filter'} type={'filter'}>
                    <Fader name={'filter'} type={'filter'}/>
                </Module>
                <Module name={'FX1'} type={'fx'}>
                    <Fader name={'fx1'} type={'fx'}/>
                </Module>
                <Module name={'FX2'} type={'fx'}>
                    <Fader name={'fx2'} type={'fx'}/>
                </Module>
            </Ui>
            <Ui name={'keyboard'}>

                    <Module name={'keyboard'} type={'keyboard'}>
                        <div className="keyboards">
                        Keyboard
                        </div>
                    </Module>


            </Ui>
        </div>
    );
}

export default App;
