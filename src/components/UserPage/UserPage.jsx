import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import {useEffect} from 'react'
import * as Tone from 'tone'
function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  useEffect(() => {
    Tone.Transport.stop()
    Tone.Transport.cancel()
  }, [])
  return (
    <div className="container">
      <h1>Welcome to SynthDeaf! Head over to play to start tweaking</h1>
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
