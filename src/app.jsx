import React, { Component } from 'react'

import Home from './components/home.jsx'
import Game from './components/game.jsx'
import End from './components/end.jsx'



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
              <Game onEnd={() => this.changeView('end')} />
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
