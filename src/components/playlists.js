import React from 'react';
//import ReactDOM from 'react-dom';
import "./css/playlists.css";

class Playlist extends React.Component{
    playPlaylist = playlistId =>{
        let localPlaylists = JSON.parse(localStorage.getItem("playlists"))
        let toPlay = localPlaylists.filter(playlist => playlist.id === playlistId)
        localStorage.setItem("onQueue", JSON.stringify(toPlay[0].songs))
        this.props.playSong(0)
    }
    render(){
        return(
            <div className="playlistList">
                <p className="playlistTitle" onClick={() => this.playPlaylist(this.props.playlist.id)}>{this.props.playlist.title}</p>
                <ul className="playlist">
                    {
                        this.props.playlist.songs.map(song => {
                            return(
                                <li onClick={() => this.props.playSong(song)}>
                                    <div className="songInPlaylist">
                                        <img src={song.thumbnail}></img>
                                        <div className="songInfo">
                                            <p className="songTitle">{song.title}</p>
                                            <p className="songAuthor">{song.author}</p>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
class Playlists extends React.Component{
    constructor(props){
        super(props)
        this.state={
            playlistsLocal: [],
            newPlaylistTitle: "",
        }
    }
    componentDidMount(){
        const localPlaylists = JSON.parse(localStorage.getItem("playlists"))
        if(localPlaylists !== null){
            this.setState({
                playlistsLocal: [...localPlaylists]
            })
        }
    }

    uuid(){
        let dt = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c==='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }
    
    
    saveToLocalStorage = () =>{
        localStorage.setItem("playlists", JSON.stringify(this.state.playlistsLocal))
    }

    handleChange = e =>{
        this.setState({
            newPlaylistTitle: e.target.value
        })
    }

    handleClick = e =>{
        let newPlaylist = {
            id: this.uuid(),
            title: this.state.newPlaylistTitle,
            songs: [],
        }

        // this.setState({
        //     playlistsLocal: [...this.state.playlistsLocal, newPlaylist],
        //     newPlaylistTitle: "",

        // })
       
        this.setState({ playlistsLocal: [...this.state.playlistsLocal, newPlaylist] }, () => {
            this.saveToLocalStorage();
        })
        
        
    }

    handleSubmit = e =>{
        e.preventDefault();
    }
    render(){
        return(
            <div>
                <div className="newPlaylist">
                    <form className = "searchBoxx" onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Playlist name" onChange={this.handleChange}></input>
                        <i className="icon ion-ios-add" onClick={this.handleClick}></i>
                    </form>   
                </div>
                <div className="playlistsList">
                    {
                        this.state.playlistsLocal.map(playlist => {
                            return(
                                <Playlist playlist={playlist} playSong={this.props.playSong} />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Playlists