import React, { Component } from 'react'
import {PropTypes as T} from 'prop-types'

class Home extends Component {
  constructor(props) {
    super(props)

    this.initialState = {
      view: 'home',
      score: 0,
      level: 1,
      sequence: []
    }
  
    this.state = this.initialState
  }

  render() {
    return(
        <div className="row home">
          <div className="col-md-12 text-center">
            <h1 className="game-title">Super Simon Game</h1>
            <div className="color-container">
              <div className="color green"></div>
              <div className="color red"></div>
              <div className="color yellow"></div>
              <div className="color blue"></div>
            </div>
            <span className="game-start" onClick={() => this.props.onStart('game')}>Start</span>  
          </div>               
        </div>
      )
  }
}

Home.propTypes = {
  onStart: T.func.isRequired
}

export default Home
