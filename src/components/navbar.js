import React from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import "./css/navbar.css"

class Navbar extends React.Component{
    render(){
        return(
            <div className="navbar">
                <ul>
                    <li>
                        <Link to="/"><i className="icon ion-ios-home"></i></Link>
                    </li>
                    <li>
                        <Link to="/search"><i className="icon ion-ios-search"></i></Link>
                    </li>
                    <li>
                        <Link to="/playlist"><i className="icon ion-ios-list"></i></Link>
                    </li>
                </ul>
            </div>
    )
    }
}

export default Navbar