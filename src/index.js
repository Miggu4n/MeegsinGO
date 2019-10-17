import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route} from "react-router-dom";


import Navbar from "./components/navbar.js"
import Search from "./components/search.js"
import Home from "./components/home.js"
import Playlists from "./components/playlists.js"
import Player from "./components/player.js"

import "./index.css"
import { object } from 'prop-types';

const root = document.getElementById("root")

class Body extends React.Component{
    constructor(props){
        super(props)
        this.state={
            currentSong: {},
            songSrc: "",
            isLoading: false,
            hasErrors: false,
            queue: [],
            nextSong: {}

        }
    }
    componentDidMount(){
        this.setState({
            queue: JSON.parse(localStorage.getItem("onQueue")),
        })
    }


    doThePlay = async () => {
        
        this.setState({
            isLoading: true,
            hasErrors: false,
        })

        document.getElementById("audioPlayer").pause()
        console.log(this.state.nextSong.id + "--undefined")
        await fetch("https://downloader.freemake.com/api/videoinfo/" + this.state.nextSong.id)
        .then(res => res.json())
        .then(data => {
            this.setState({
                songSrc: data.qualities[1].url,
                currentSong: this.state.nextSong,
                isLoading: false,
                hasErrors: false
            })
            document.getElementById("audioPlayer").play()
            
        })
        .catch(err => {
            this.setState({
                isLoading: false,
                hasErrors: true
            })

            console.log("Errore: " + err)
        })

        this.setState({nextSong: {}})
    }


    playSong = async (forward) => {
        this.setState({
            queue: JSON.parse(localStorage.getItem("onQueue")),
        })

        let indexPlaying = this.state.queue.findIndex(i => i.id === this.state.currentSong.id)

        console.log(forward)
        console.log("Now playing ")
        if(forward === true && indexPlaying > -1){
            console.log("Ciao1")
            this.setState({nextSong: this.state.queue[indexPlaying + 1]}, () => {
                this.doThePlay();
            })
        } else if(forward === false  && indexPlaying > 0){
            console.log("Ciao2")
            this.setState({nextSong: this.state.queue[indexPlaying - 1]}, () => {
                this.doThePlay();
            })
        } else if(forward === 0){
            console.log("Ciao3")
            this.setState({nextSong: this.state.queue[0]}, () => {
                this.doThePlay();
            })
        } else if (typeof(forward) === "object"){
            console.log("Ciao4")
            this.setState({nextSong: forward}, () => {
                this.doThePlay();
            })
        }
       
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