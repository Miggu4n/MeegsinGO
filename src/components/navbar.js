import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import "./css/navbar.css"

class Navbar extends React.Component{
    render(){
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
}

export default Navbar