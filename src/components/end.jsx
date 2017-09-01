import React, { Component } from 'react'
import {PropTypes as T} from 'prop-types'

class End extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <div className="end">
          <div className="end-text">You finished with a score of 100000!</div>
          <div className="color-container">
            <div className="color red"></div>
            <div className="color green"></div>
            <div className="color yellow"></div>
            <div className="color blue"></div>
          </div>
          <div className="end-text" onClick={() => this.props.onRestart('game')}>Retry ?</div>  
        </div>
      )
  }
}

End.propTypes = {
  onRestart: T.func.isRequired
}

export default End
