export default class Synth {
  
  constructor(){
    this.context = new AudioContext()
    this.vco = this.context.createOscillator()
    this.vco.type = 'square' 
    this.vca = this.context.createGain()
    this.vca.gain.value = 0
    this.vco.start(0)
    
    
    /* Connections */
    this.vco.connect(this.vca)
    this.vca.connect(this.context.destination)

    this.AR = 0
    //this.vco.stop(1000)
  }

  play(note){

    // avoid chrome 'glide' effect
    this.vco.frequency.setValueAtTime( note, 0 )
    this.vca.gain.setValueAtTime(0, this.context.currentTime)
    // ATTACK
    this.vca.gain.linearRampToValueAtTime(1, this.context.currentTime + this.AR)
    
    //this.vca.gain.value = 1
  }

  stop(){
    //this.vca.gain.value = 0

    this.vca.gain.cancelScheduledValues(this.context.currentTime)
    // RELEASE
    this.vca.gain.linearRampToValueAtTime(0, this.context.currentTime + this.AR)
  }
}