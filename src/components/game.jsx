import React, { Component } from 'react'
import {PropTypes as T} from 'prop-types'
import Tone from 'tone'

class Game extends Component {
  constructor(props) {
    super(props)

    this.initialState = {      
      score: 0,
      level: 1,
      sequence: [],
      currentButton: ''
    }

    /*Green – G4 391.995 Hz
Red – E4 329.628 Hz
Yellow – C4 261.626 Hz
Blue – G3 195.998 Hz*/


    this.buttons = [
      {
        color: 'green',
        note: 'G4'
      },
      {
        color: 'yellow',
        note: 'C4'
      },
      {
        color: 'red',
        note: 'E4'
      },
      {
        color: 'blue',
        note: 'G3'
      }
    ]

    //create a synth and connect it to the master output (your speakers)
    this.synth = new Tone.Synth({
      oscillator : {
        type : 'triangle'
      }
    }).toMaster()
    
    //play a middle 'C' for the duration of an 8th note
    //this.synth.triggerAttackRelease('C4', '8n')
  
    this.state = this.initialState
  }

  nextLevel(){

  }

  play(button){
    this.synth.triggerAttackRelease(button.note, '8n')
    this.setState(Object.assign(this.state, {currentButton: button.color}))
  }

  stop(){
    this.setState(Object.assign(this.state, {currentButton: ''}))
  }

  playSequence(){

  }



  endGame() {
    this.setState(this.initialState)
    this.props.onEnd('end')
  }

  render() {
    return(
        <div className="game">
          <div className="game-infos-row">
            <div className="info-text level-col">{`Level: ${this.state.level}`}</div>
            <div className="info-text score-col">{`Score: ${this.state.score}`}</div>
          </div>

          <div className="squares-row">
            {this.buttons.map((button, index) =>
              <div className="square-wrapper" key={index} onMouseUp={() => this.stop(button)} onMouseDown={() => this.play(button)}>
                <div className="square" id={button.color}></div>
                <div style={{display: this.state.currentButton === button.color ? '' : 'none'}} className={`highlight-${button.color}`} ></div>
              </div>            
            )} 
          </div>                   
        </div>
      )
  }
}

Game.propTypes = {
  onEnd: T.func.isRequired
}

export default Game
