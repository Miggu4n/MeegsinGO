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
        if(!(this.props.src === "")){
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
        }
        
    }

    next(){
        if(this.props.nextSongs.length > 0){
            this.props.playSong(this.props.nextSongs[0], true)
        } else {
            console.log("Non hai nulla dopo, pagliaccio")
        }
        
    }
    previous(){
        if(this.props.previousSongs.length > 0){
            this.props.playSong(this.props.previousSongs[this.props.previousSongs.length - 1], false)
        } else {
            console.log("Non hai nulla prima, pagliaccio")
        }
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
                        <p
                            className="back"
                            onClick={() => this.previous()} > PREV</p>
                        <p 
                            className="play"
                            onClick={() => this.play()}>PLAY</p>
                        <p
                            className="forward"
                            onClick={() => this.next()}> NEXT</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Player