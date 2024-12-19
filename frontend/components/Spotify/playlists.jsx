import React from 'react';
import './playlists.css';

const playlistsData = [
  {
    id: "3cEYpjA9oz9GiPac4AsH4n",
    name: "Heart On My Sleeve",
    artistName: "Ella Mai",
    artworkUrl: "https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/03/45/19/034519dc-9ff9-7f63-3d02-23a101a0cc3a/22UMGIM01299.rgb.jpg/300x300bb.jpg"
  },
  {
    id: "4yqA0izY8I7kN8NuXhFXsR",
    name: "The Best of Me",
    artistName: "Bryan Adams",
    artworkUrl: "https://i.scdn.co/image/ab67616d0000b27377fdcfda6535601aff081b6a"
  },
  {
    id: "5QSRycGD8hemx37CCS3QIJ",
    name: "The Best of Me",
    artistName: "Bryan Adams",
    artworkUrl: "https://mosaic.scdn.co/640/ab67616d00001e022172b607853fa89cefa2beb4ab67616d00001e0235d2e0ed94a934f2cc46fa49ab67616d00001e0277fdcfda6535601aff081b6aab67616d00001e02d7c5d731da2aebf34604bb66"
  },
];

const handlePlaylistClick = (id) => {
  window.location.href = `/playlist/${id}`;
};

const Playlists = () => {

  return (
    <div className="playlists">
      <h2>Playlists</h2>
      <ul className="playlist-list">
        {playlistsData.map((playlist) => (
          <li key={playlist.id} className="playlist-item" onClick={() => handlePlaylistClick(playlist.id)}>
            <img src={playlist.artworkUrl} alt={`${playlist.name} artwork`} className="playlist-artwork" />
            <div className="playlist-info">
              <span className="playlist-name">{playlist.name}</span>
              <span className="playlist-artist">{playlist.artistName}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlists;