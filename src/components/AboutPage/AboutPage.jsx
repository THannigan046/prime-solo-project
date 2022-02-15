import React, { useState, useEffect } from 'react';
import * as Tone from 'tone'
// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {

  useEffect(() => {
    Tone.Transport.stop()
    Tone.Transport.cancel()
  }, [])
  return (
    <div className="container">
      <div>
        <h3>Synthdeaf is designed with React, Redux/Sagas, node and postgresql for data management, and tonejs as the main audio framework. Modules explained below</h3>

        <h4>Select your desired 8 notes with your sequencer selectors, then select your desired wave type and sequencer and pattern. </h4>

        <h4>Wave Types:</h4>
        <ul>
          <li>"Sine" - Smooth and clean. Fundamental frequency, no harmonics.</li>
          <li>"Triangle" - clearer and brighter than a sine while still smooth. Minimal odd harmonics</li>
          <li>"Sawtooth" - Buzzy and Bright, like a violin being bowed. Even harmonics</li>
          <li>"Square" - Alternates between two values, great for bass sounds. Odd harmonics</li>
        </ul>

        <h4>Patterns:</h4>
        <ul> <li>up - cycles upward</li> <li>“down” - cycles downward</li> <li>“upDown” - up then and down</li> <li>“downUp” - cycles down then and up</li> <li>“alternateUp” - jump up two and down one</li> <li>“alternateDown” - jump down two and up one</li> <li>“random” - randomly select an index</li> <li>“randomWalk” - randomly moves one index away from the current position</li> <li>“randomOnce” - randomly select an index without repeating until all values have been chosen.</li> </ul>

        <h4>Once you're happy with your synth sound, feel free to check some boxes and start tweaking drums.</h4>

        <h4>All drum sounds are from a CR78 kit found <a href='https://github.com/cwilso/web-audio-samples'>here</a></h4>

        <h4>Once you're set, just adjust the bpm and hit play!</h4>

        <h4>Special thanks to Edan Schwartz and Tucker Landis, this project would not be possible without either of you.</h4>
      </div>
    </div>
  );
}

export default AboutPage;
