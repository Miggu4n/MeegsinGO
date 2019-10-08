import React from 'react';
import ReactDOM from 'react-dom';

import "./css/search.css"

class SearchSong extends React.Component{
    
    async playSong(id){
        await fetch("https://downloader.freemake.com/api/videoinfo/" + id)
        .then(res => res.json())
        .then(data => {
            const player = document.getElementById("songPlayer")
            player.src = data.qualities[1].url
            player.play()
        })
        .catch(err => console.log(err))
    }
    render(){
        return(
            <div>
                <ul>
                    {this.props.songs.map(res => {
                        return(
                            <li key={res.id}>
                                <img src={res.thumbnail} alt={res.title} onClick={() => this.playSong(res.id)}></img>
                                <h2>{res.title}</h2>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
    
}

class MainSearch extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            searchBox: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    handleChange(event){
        this.setState({
            searchBox: event.target.value.trim(),
            searchSongs: []
        })

    }
    async handleClick(e){
        e.preventDefault()
        await fetch("https://www.googleapis.com/youtube/v3/search?q=" + this.state.searchBox.split(" ").join("%20") +"&part=snippet&maxresult=5&key=AIzaSyDP18snsIBdV5V4J9hGUN6KVbr2ZYegjiQ")
            .then(res => res.json())
            .then(data => {                
                this.setState({
                    searchSongs: data.items.map(res => {
                        const song = {
                            title: res.snippet.title,
                            id: res.id.videoId,
                            thumbnail: res.snippet.thumbnails.medium.url
                        }
                        return song
                    })
                })
                
            })
            .catch(err => console.log(err))

            // if it looks stupid but it works, it ain't stupid
            ReactDOM.render(<SearchSong songs={this.state.searchSongs}/>, document.getElementById("search"))
    }


    
    render(){
        return(
          <div>
              <form className = "searchBox" onSubmit={this.handleClick}>
                  <input type="text" placeholder="search" onChange={this.handleChange}></input>
              </form>
          </div>
        )
    }
}

export default MainSearch