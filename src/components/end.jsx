import React, { Component } from 'react'
import {PropTypes as T} from 'prop-types'

class End extends Component {
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
        <div>
          <h1>SCORES</h1>
          <button onClick={() => this.props.onRestart('game')}>RESTART</button>        
        </div>
      )
  }
}

End.propTypes = {
  onRestart: T.func.isRequired
}

export default End
