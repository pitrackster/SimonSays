import React, { Component } from 'react'


import Home from './components/home.jsx'
import Game from './components/game.jsx'
import End from './components/end.jsx'

/*

The game also features 3 skill levels:

Repeat a sequence of 8 colours
Repeat a sequence of 14 colours
Repeat a sequence of 20 colours
Repeat a sequence of 31 colours



Green – G4 391.995 Hz
Red – E4 329.628 Hz
Yellow – C4 261.626 Hz
Blue – G3 195.998 Hz


Sequence length: 1‐5, tone duration 0.42 seconds, pause between tones 0.05 seconds
Sequence length: 6‐13, tone duration 0.32 seconds, pause between tones 0.05 seconds
Sequence length: 14‐31, tone duration 0.22 seconds, pause between tones 0.05 seconds



*/

class App extends Component {
  constructor(props) {
    super(props)

    this.initialState = {
      view: 'home'
    }
  
    this.state = this.initialState
  }

  changeView(view) {
    this.setState(Object.assign(this.state, {view: view}))
  } 

  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {this.state.view === 'home' &&
              <Home onStart={() => this.changeView('game')} />
            }
            {this.state.view === 'game' &&
              <Game score={this.state.score} synth={this.synth} onEnd={() => this.changeView('end')} />
            }
            {this.state.view === 'end' &&
              <End onRestart={() => this.changeView('game')} />
            }
          </div>
        </div>      
      </div>
    )
  }
}

export default App
