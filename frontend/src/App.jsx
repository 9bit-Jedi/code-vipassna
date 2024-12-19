import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./Navigation/Navbar.jsx";
import Body from "../components/Spotify/body.jsx";
import PlaylistPage from '../components/playlistPage.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Body />} />
          <Route path="/playlist/:id" element={<PlaylistPage />} /> */}
          <Route path="/" element={<Body/>} />
          <Route path="/spotify" exact element={<Body/>} />
          {/* <Route path="/apple" element={<ApplePlaylists/>} /> */}
          <Route path="/playlist/:id" element={<PlaylistPage/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
