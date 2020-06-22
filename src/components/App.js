import React, { Component } from 'react';
import Artist from './Artist';
import Tracks from './Tracks';

const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com';

class App extends Component {
  state = { artistQuery: '', artist: null, topTracks: [] };

  updateArtistQuery = event => {
    this.setState({ artistQuery: event.target.value })
  }

  handleKeyPress = event => {
    if (event.key == 'Enter') {
      this.searchArtist();
    }
  }

  searchArtist = () => {
    fetch(`${API_ADDRESS}/artist/${this.state.artistQuery}`)
    .then(response => response.json())
    .then(json => {
      if (json.artists.total > 0) {
        const artist = json.artists.items[0];

        this.setState({ artist })
        this.fetchTopTracks();
      }
    })
    .catch(error => {alert(error.message)})
  }

  fetchTopTracks = () => {
    fetch(`${API_ADDRESS}/artist/${this.state.artist.id}/top-tracks`)
    .then(response => response.json())
    .then(json => this.setState({ topTracks: json.tracks }))
    .catch(error => {alert(error.message)})
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <h2>Music Master</h2>
        <input
          onChange={this.updateArtistQuery}
          placeholder='Search for an Artist'
          onKeyPress={this.handleKeyPress}
        />
        <button onClick={this.searchArtist}>Search</button>

        <hr />
        { this.state.artist
          ?
            <div><Artist artist={this.state.artist}/></div>
          : "No artist found"
        }
        <Tracks tracks={this.state.topTracks} />
      </div>
    )
  }
}

export default App;
