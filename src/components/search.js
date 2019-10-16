import React from 'react';

import "./css/search.css"

class Popup extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            playlistsLocal: []
        }
    }
    
    componentDidMount(){
        this.setState({
            playlistsLocal: JSON.parse(localStorage.getItem("playlists"))
        })
    }

    saveToLocalStorage = () =>{
        localStorage.setItem("playlists", JSON.stringify(this.state.playlistsLocal))
    }

    addToPlaylist = playlistId =>{
        let playlistToModify = this.state.playlistsLocal.filter(playlist => playlist.id === playlistId)
        playlistToModify[0].songs = [...playlistToModify[0].songs, this.props.song]
        
        this.setState({ playlistsLocal: [...this.state.playlistsLocal.filter(playlist => playlist.id !== playlistId), playlistToModify[0]] }, () => {
            this.saveToLocalStorage();
        })
        

        
    }
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <ul>
                {
                    this.state.playlistsLocal.map(playlist => {
                        return(
                            <li key={playlist.id}
                                onClick={()=> this.addToPlaylist(playlist.id)}>{playlist.title}
                            </li>
                        )
                    })
                }
            </ul>
          <button onClick={this.props.closePopup}>close me</button>
          </div>
        </div>
      );
    }
  }

class Search extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            searchBox: "",
            searchSongs: [],
            pop: {
                show: false,
                songId: "",
            }
        }

    }
    handleChange = event => {
        this.setState({
            searchBox: event.target.value.trim(),
        })

    }

    handleClick = async e =>{
        e.preventDefault()
        await fetch("https://www.googleapis.com/youtube/v3/search?q=" + this.state.searchBox.split(" ").join("%20") +"&part=snippet&maxresult=1&key=AIzaSyDP18snsIBdV5V4J9hGUN6KVbr2ZYegjiQ")
            .then(res => res.json())
            .then(data => {                
                this.setState({
                    searchSongs: data.items.map(res => {
                        const song = {
                            title: res.snippet.title,
                            author: res.snippet.channelTitle,
                            id: res.id.videoId,
                            thumbnail: res.snippet.thumbnails.default.url
                        }
                        return song
                    })
                })
                
            })
            .catch(err => console.log("Errore nel fetching da youtube.com: " + err))
            
    }

    togglePopup = song => {
        this.setState({
            pop: {
                show: !this.state.pop.show,
                song: song,
            }
        })

    }

    render(){
        return(
          <div>
              <form className = "searchBox" onSubmit={this.handleClick}>
                  <input type="text" placeholder="search" onChange={this.handleChange}></input>
              </form>

              <ul className="songList">
                {    
                    this.state.searchSongs.map(song => {
                        return(
                            <li className="songRow" key={song.id}>
                                <div className="song"  onClick = {() => this.props.playSong(song, null)}>
                                    <img className = "thumbnail" src={song.thumbnail} alt={song.title}></img>
                                    <div className="info">
                                        <p className = "title">{song.title}</p>
                                        <p className = "author">{song.author}</p>
                                    </div>
                                </div>
                                <div>
                                    <input type="button" onClick={() => this.togglePopup(song)}></input>
                                </div>
                                
                            </li>
                        )
                    })
                    
                }
              </ul>
              {
                  this.state.pop.show ?
                    <Popup
                        song = {this.state.pop.song}
                        closePopup = {this.togglePopup} />
                    : null

              }
          </div>
        )
    }
}

export default Search