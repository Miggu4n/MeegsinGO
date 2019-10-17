import React from 'react';

import "./css/player.css"


class Player extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isPlaying: false,

        }
    }

    play(){
        
        if(this.props.songSrc !== ""){
            console.log("Ciao")
            if(this.state.isPlaying === true){
                document.getElementById("audioPlayer").pause()
                this.setState({
                    isPlaying: false,
                })
            } else {
                document.getElementById("audioPlayer").play()
                this.setState({
                    isPlaying: true,
                })
            }
        } else {
            this.props.playSong(0)
        }
        
    }

    next(){
        this.props.playSong(true)        
    }
    previous(){
        this.props.playSong(false)        
    }
    render(){
        return(
            <div className="playerContainer">
                
                <img className="thumbnail" src={this.props.currentSong.thumbnail} alt={this.props.currentSong.title}></img>
                <div className="player">
                    <div className="info">
                        <p className="title">{this.props.currentSong.title}</p>
                        <p className="author">{this.props.currentSong.author}</p>
                    </div>
                    <audio
                        id="audioPlayer"
                        className ="audioPlayer"
                        src={this.props.songSrc}
                        onPlay = {() => this.setState({isPlaying: true})}
                        onPause = {() => this.setState({isPlaying: false})}
                        controls
                        autoPlay />
                    <div className="controls">
                        <i
                            className="icon ion-ios-skip-backward"
                            onClick={() => this.previous()} ></i>
                        <i 
                            className="icon ion-ios-play"
                            onClick={() => this.play()}></i>
                        <i
                            className="icon ion-ios-skip-forward"
                            onClick={() => this.next()}></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default Player