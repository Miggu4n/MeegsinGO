import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route} from "react-router-dom";


import Navbar from "./components/navbar.js"
import Search from "./components/search.js"
import Home from "./components/home.js"
import Playlists from "./components/playlists.js"
import Player from "./components/player.js"

import "./index.css"

const root = document.getElementById("root")

class Body extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            currentSong: {},
            songSrc: "",
            isLoading: false,
            hasErrors: false,
            nextSongs: [],
            previousSongs: [],

        }
    }

    addSong = (song) =>{
        console.log("Credo di dover aggiungere " + song)
        this.setState({
            nextSongs: [...this.state.nextSongs, song]
        })
    }
    playSong = async (song, forward) => {
        console.log("Now playing ")
        this.setState({
            currentSong: song,
            isLoading: true,
            hasErrors: false,
        })

        document.getElementById("audioPlayer").pause()

        await fetch("https://downloader.freemake.com/api/videoinfo/" + song.id)
        .then(res => res.json())
        .then(data => {
            this.setState({
                songSrc: data.qualities[1].url,
                currentSong: song,
                isLoading: false,
                hasErrors: false
            })

            if(forward === true){
                this.setState({
                    previousSongs: [...this.state.previousSongs, song],
                    nextSongs: this.state.nextSongs.filter(song => song !== this.state.currentSong)
                })
            } else if(forward === false){
                this.setState({
                    previousSongs: this.state.previousSongs.filter(song => song !== this.state.currentSong),
                    nextSongs: [...this.state.nextSongs, this.state.currentSong]
                })
                
            } else if (forward === null){
                this.setState({
                    previousSongs: [...this.state.previousSongs, this.state.currentSong],
                })
            }
            document.getElementById("audioPlayer").play()
            
        })
        .catch(err => {
            this.setState({
                isLoading: false,
                hasErrors: true
            })
        })
        
    }

    render(){
        return(

            <BrowserRouter>
                <Navbar/>
                <Switch>
                    <div className="body">
                        <Route 
                            exact path="/"
                            render = {props => <Home />}/>

                        <Route
                            exact path="/search"
                            render = {props => <Search 
                                                    {...props}
                                                    playSong = {this.playSong} 
                                                    addSong = {this.addSong} />} />

                        <Route
                            exact path="/playlist"
                            render = {props => <Playlists
                                                    {...props}
                                                    playSong = {this.playSong}/>} />

                        {/* <audio
                            autoPlay
                            controls
                            src={this.state.songSrc} /> */}

                    </div>
                </Switch>
                <Player
                    playSong={this.playSong}
                    songSrc={this.state.songSrc}
                    currentSong={this.state.currentSong}
                    isLoading={this.state.isLoading}
                    hasErrors={this.state.hasErrors}
                    previousSongs={this.state.previousSongs}
                    nextSongs={this.state.nextSongs} />

            </BrowserRouter>
            
        )
    }
}

ReactDOM.render(<Body/>, root)
//ReactDOM.render(<Main />, document.getElementById('root'));