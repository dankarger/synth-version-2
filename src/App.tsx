import React from 'react';
import './App.scss';

import Ui from './components/Ui'
import Fader from "./components/Fader";
import Osc from "./components/Osc";
import Module from "./components/Module";
import Keyboard from "./components/Keyboard";
import Osc2 from "./components/Osc2";

function App() {
    return (
        <div className="App">
           <h1>Synth V2</h1>
            <Ui name='ui1'>
                <Module name={'2'} type={'osc'}>
                    <Osc oscName={'Osc1'} typeName={'osc'}/>
                </Module>
                <Module name={'3'} type={'osc'}>
                    <Osc oscName={'Osc2'} typeName={'osc'}/>
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
            <Ui name={''}>

                    {/*<Module name={'keyboard'} type={'keyboard'}>*/}
                       <Keyboard />
                    {/*</Module>*/}


            </Ui>
            <Osc2 />
        </div>
    );
}

export default App;
