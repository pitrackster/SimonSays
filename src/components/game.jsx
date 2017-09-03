import React, { Component } from 'react'
import {PropTypes as T} from 'prop-types'

import Synth from './../models/synth'

class Game extends Component {
  constructor(props) {
    super(props)

    this.initialState = { 
      sequence: [this.getRandomIndex()],
      currentButton: '',
      playerSequence: [],
      playing: false
    }

    this.buttons = [
      {
        color: 'green',
        note: 391.995
      },
      {
        color: 'red',
        note: 329.628
      },
      {
        color: 'yellow',
        note: 261.626
      },
      {
        color: 'blue',
        note: 195.998
      }
    ]
  
    this.state = this.initialState    
    this.synth = new Synth()   
  }

  playSequence(seq, index = 0) {    
    if(index < seq.length) {
      const btn = this.buttons[seq[index]]
      this.setState(Object.assign(this.state, {playing: true}))
      this.play(btn)
      setTimeout(() => {
        this.stop()  
      }, 400)
      
      setTimeout(() => {
        index += 1
        this.playSequence(seq, index)
      }, 500)  
    } else {
      this.setState(Object.assign(this.state, {playing: false}))
    }    
  }

  componentDidMount() {
    this.props.updateLevel(1)
    this.props.updateScore(0)
    this.playSequence(this.state.sequence)
  }

  getRandomIndex() {
    //  Math.floor(Math.random() * (max - min + 1)) + min;
    return Math.floor(Math.random() * 4)
  }

  levelUp(){
    let newSequence = Array.from(this.state.sequence)
    newSequence.push(this.getRandomIndex())

    this.props.updateScore(this.props.score + 10)
    this.props.updateLevel(this.props.level + 1)

    this.setState(Object.assign(this.state, {playerSequence: [], sequence: newSequence}))
    setTimeout(() => {
      this.playSequence(newSequence)
    }, 500)
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
    if (this.state.playing) {
      return false
    }
    if (this.state.playerSequence.length > this.state.sequence.length) {
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
            <div className="info-text">{`Level: ${this.props.level}`}</div>
            <div className="info-text">{`Score: ${this.props.score}`}</div>
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
  onEnd: T.func.isRequired,
  score: T.number.isRequired,
  updateScore: T.func.isRequired,
  level: T.number.isRequired,
  updateLevel: T.func.isRequired
}

export default Game
