import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAccessToken } from '../utils/spotifyAuth';
import './playlistPage.css';

const PlaylistPage = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      if (!id) {
        setError('Invalid or missing playlist ID');
        return;
      }

      const decodedId = decodeURIComponent(id);
      console.log("Decoded ID:", decodedId);

      try {
        const code = new URLSearchParams(window.location.search).get('code');
        const accessToken = await getAccessToken(code);

        if (!accessToken) {
          throw new Error("Access token not found.");
        }

        const response = await fetch(`https://api.spotify.com/v1/playlists/${decodedId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (response.status === 400) {
          const errorData = await response.json();
          if (errorData.error.message === "Invalid base62 id") {
            setError('Invalid playlist ID format');
            return;
          } else {
            setError('Spotify API Error'); // Handle other 400 errors
            return;
          }
        }

        if (!response.ok) {
          throw new Error(`Spotify API Error: ${response.status}`);
        }
        const data = await response.json();

        console.log(data)
        setPlaylist({
          id: data.id,
          name: data.name,
          artistName: data.owner.display_name,
          artworkUrl: data.images[0].url,
          tracks: data.tracks.items.map(item => ({
            id: item.track.id,
            name: item.track.name,
            album: item.track.album.name,
            duration: item.track.duration_ms,
            popularity: item.track.popularity
          }))
        });
      } catch (error) {
        console.error('Error fetching playlist:', error);
        setError(error.message || 'Error fetching playlist');
      }
    };

    fetchPlaylist();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="playlist-page">
      <h2 className="playlist-title">{playlist.name}</h2>
      <img src={playlist.artworkUrl} alt={`${playlist.name} artwork`} className="playlist-artwork" />
      <h3 className="playlist-artist">{playlist.artistName}</h3>
      <ul className="track-list">
        {playlist.tracks.map((track) => (
          <li key={track.id} className="track-item">
            <div className="track-name"><b>{track.name}</b></div>
            <div className="track-album">Album: {track.album}</div>
            <div className="track-duration">Duration: {Math.floor(track.duration / 60000)}:{('0' + Math.floor((track.duration % 60000) / 1000)).slice(-2)}</div>
            <div className="track-popularity">Popularity: {track.popularity}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistPage;