import React from 'react';

import "./css/search.css"


class Search extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            searchBox: null,
            searchSongs: []
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
    addToQueue(song){
        console.log(song)
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
                                    <p onClick={() => this.props.addSong(song)}>ADD</p>
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

export default Search