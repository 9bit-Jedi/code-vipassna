
import React from 'react';
import Playlists from './playlists';
import './body.css';
import GeminiDataDisplay from '../GeminiDataDisplay';


const Body = () => {
  return (
    <div className="body">
      <GeminiDataDisplay/>
      <Playlists />
    </div>
  );
};

export default Body;