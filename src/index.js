import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import MainSearch from "./Elements/search.js"
import MainHome from "./Elements/home.js"
import MainPlaylists from "./Elements/playlists.js"

import "./index.css"

const root = document.getElementById("root")

function Navbar(){
    return(
            <div className="navbar">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/search">Search</Link>
                        </li>
                        <li>
                            <Link to="/playlist">Playlist</Link>
                        </li>
                    </ul>
                </div>
    )
}

class MainBody extends React.Component{
    render(){
        return(
            <Router>
                <Navbar/>
                    <Switch>
                        <div className="body">
                            <Route exact path="/" component = {MainHome}/>
                            <Route exact path="/search" component = {MainSearch}/>
                            <Route exact path="/playlist" component = {MainPlaylists}/>
                        </div>
                    </Switch>
            </Router>
            
        )
    }
}

ReactDOM.render(<MainBody/>, root)
//ReactDOM.render(<Main />, document.getElementById('root'));