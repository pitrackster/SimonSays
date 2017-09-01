import React, { Component } from 'react'
import {PropTypes as T} from 'prop-types'
import Tone from 'tone'

import Synth from './../models/synth'

class Game extends Component {
  constructor(props) {
    super(props)

    this.initialState = {      
      score: 0,
      level: 1,
      sequence: [this.getRandomIndex()],
      currentButton: '',
      playerSequence: []
    }

    this.buttons = [
      {
        color: 'green',
        note: 391.995
      },
      {
        color: 'yellow',
        note: 261.626
      },
      {
        color: 'red',
        note: 329.628
      },
      {
        color: 'blue',
        note: 195.998
      }
    ]

    //create a synth and connect it to the master output (your speakers)
    this.synth = new Tone.Synth({
      oscillator : {
        type : 'triangle'
      }
    }).toMaster()    
  
    this.state = this.initialState  
    
    this.synth = new Synth()
   
  }

  playSequence(seq, index = 0) {
    if(index < seq.length) {
      const btn = this.buttons[seq[index]]
      //const btn = this.buttons.find(button => button.note === note)
      this.play(btn)
      setTimeout(() => {
        this.stop()  
      }, 400)
      
      setTimeout(() => {
        index += 1
        this.playSequence(seq, index)
      }, 500)  
    }
  }

  componentDidMount() {
    this.playSequence(this.state.sequence)
  }

  getRandomIndex() {
    return Math.floor(Math.random() * (3 - 1 + 1) + 1)
  }

  levelUp(){
    let newSequence = Array.from(this.state.sequence)
    newSequence.push(this.getRandomIndex())
    this.setState(Object.assign(this.state, {playerSequence: [], sequence: newSequence, score: this.state.score + 10, level: this.state.level + 1 }))
    setTimeout(() => {
      this.playSequence(newSequence)
    }, 1000)
  }

  play(button){
    this.synth.play(button.note)
    this.lighten(button.color)   
  }

  stop(){
    this.synth.stop()
    this.unlighten()  
  }

  recordUserSequence(button){
    if(this.state.playerSequence.length > this.state.sequence.length) {
      // send an error sound and end game
      this.endGame()
    } else if (this.state.playerSequence.length <= this.state.sequence.length) {
      // check the given button 
      if(button.color === this.buttons[this.state.sequence[this.state.playerSequence.length]].color){
        this.play(button)
        let newSequence = Array.from(this.state.playerSequence)
        newSequence.push(button.color)
        this.setState(Object.assign(this.state, {playerSequence: newSequence}))
        if(this.state.playerSequence.length === this.state.sequence.length) {
          this.levelUp()
        }
        
      } else {
        this.endGame()
      }
    }
  }

  
  lighten(color){
    this.setState(Object.assign(this.state, {currentButton: color}))
  }

  unlighten(){
    this.setState(Object.assign(this.state, {currentButton: ''}))
  }

  endGame() {
    // @TODO create an error sound
    this.setState(this.initialState)
    this.props.onEnd('end')
  }

  render() {
    return(
        <div className="game">
          <div className="game-infos-row">
            <div className="info-text">{`Level: ${this.state.level}`}</div>
            <div className="info-text">{`Score: ${this.state.score}`}</div>
          </div>

          <div className="squares-row">
            {this.buttons.map((button, index) =>
              <div className="square-wrapper" key={index} onMouseUp={() => this.stop(button)} onMouseDown={() => this.recordUserSequence(button)}>
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
