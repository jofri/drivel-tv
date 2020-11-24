/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import '../styles/style.css';
import { useHistory } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import home from '../assets/home.svg';
import profile from '../assets/profile.svg';
import broadcast from '../assets/broadcast.svg';
import deleteBroadcast from '../assets/delete.svg';
import logOut from '../assets/log-out.svg';
import search from '../assets/search.svg';
import guest from '../assets/guest_profile_picture.png';

/* Using react-burger-menu plugin for menu functionality */
import '../styles/hamburger-style.css';

function Navbar() {
  // Import useHistory for redirect functionality
  const history = useHistory();

  // Redirects user to homepage
  const sendToHome = () => {
    history.push('/');
  };

  return (
    <header>
      <div onClick={sendToHome}>
        <p className="logo-text">Drivel.TV</p>
      </div>

      <div className="search">
        <form className="search-form">
          <input className="search-input" type="text" placeholder="Find broadcast..." />
          <button type="button" className="search-button"><img className="search-icon" src={search} alt="" /></button>
        </form>
      </div>

      <div className="menu-container">
        <button type="button" className="live-button" onClick={sendToHome}>JUMP TO LIVE</button>
        <img className="profile-icon" src={guest} alt="" />
        <Menu right>
          <a id="home" className="menu-item" href="/">
            <img src={home} alt="" />
            Home
          </a>
          <a id="profile" className="menu-item" href="/profile">
            <img src={profile} alt="" />
            Profile
          </a>
          <a id="create-broadcast" className="menu-item" href="/create-broadcast">
            <img src={broadcast} alt="" />
            Create broadcast
          </a>
          <a id="delete-broadcast" className="menu-item" href="/delete-broadcast">
            <img src={deleteBroadcast} alt="" />
            Delete broadcast
          </a>
          <a id="log-out" className="menu-item" href="/log-out">
            <img src={logOut} alt="" />
            Log out
          </a>
        </Menu>
      </div>

    </header>
  );
}

export default Navbar;
