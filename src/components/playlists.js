import React from 'react';
//import ReactDOM from 'react-dom';

class Playlist extends React.Component{
    playPlaylist = playlistId =>{
        let localPlaylists = JSON.parse(localStorage.getItem("playlists"))
        let toPlay = localPlaylists.filter(playlist => playlist.id === playlistId)
        localStorage.setItem("onQueue", JSON.stringify(toPlay[0].songs))
    }
    render(){
        return(
            <div>
                <p class="playlistTitle" onClick={() => this.playPlaylist(this.props.playlist.id)}>{this.props.playlist.title}</p>
                <ul>
                    {
                        this.props.playlist.songs.map(song => {
                            return(
                                <li onClick={() => this.props.playSong(song, null)}>{song.title}</li>
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
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
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
    render(){
        return(
            <div>
                <div className="newPlaylist">
                    <form className = "searchBox" onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Playlist name" onChange={this.handleChange}></input>
                        <input type="button" value="Crea playlist" onClick={this.handleClick}/>
                    </form>   
                </div>
                <div className="playlistsList">
                    {
                        this.state.playlistsLocal.map(playlist => {
                            return(
                                <Playlist playlist={playlist}playSong={this.props.playSong} />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Playlists