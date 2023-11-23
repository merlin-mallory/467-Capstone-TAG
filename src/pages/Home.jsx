import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import splash_img from '../img/splash_img.png'
import Header from '../components/Header';
import makeGamesImg from '../img/makegames1.jpeg';
import playGamesImg from '../img/playgames1.jpeg';

function Home() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleMakeGamesClick = (e) => {
    if (user && user.email) {
      navigate('/make-games');
    } else {
      e.preventDefault();
      alert("You must be logged in to Make Games.");
    }
  }

  return (
    <div className="home-container">
      <Header />

      <div className="home-splash-container">
        <img src={splash_img} alt="Splash" className="home-splash-img" />
      </div>

      <center>
      <Link to="/make-games" onClick={handleMakeGamesClick}><img src={makeGamesImg} alt="Make Games" width="20%" height="20%" /></Link>
      <Link to="/scroll"><img src={playGamesImg} alt="Play Games" width="20%" height="20%" /></Link>
      <br />
      <Link to="/play-details">QR Code Demo</Link>
      </center>

      <footer>
        (footer content here)
      </footer>
    </div>
  );
}

export default Home;
