import React, { Component } from 'react'

import Home from './components/home.jsx'
import Game from './components/game.jsx'
import End from './components/end.jsx'

class App extends Component {
  constructor(props) {
    super(props)

    this.initialState = {
      view: 'home',
      score:0,
      level:1
    }
  
    this.state = this.initialState
  }

  changeView(view) {
    this.setState(Object.assign(this.state, {view: view}))
  } 

  updateScore(score){
    this.setState(Object.assign(this.state, {score: score}))
  }

  updateLevel(level){
    this.setState(Object.assign(this.state, {level: level}))
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
              <Game level={this.state.level} score={this.state.score} updateLevel={(level) => this.updateLevel(level)} updateScore={(score) => this.updateScore(score)} onEnd={() => this.changeView('end')} />
            }
            {this.state.view === 'end' &&
              <End level={this.state.level} score={this.state.score} onRestart={() => this.changeView('game')} />
            }
          </div>
        </div>      
      </div>
    )
  }
}

export default App
