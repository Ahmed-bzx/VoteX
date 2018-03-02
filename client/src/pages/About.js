import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div id='about-page'>
        <h1>About this App</h1>
        <p>This is the first dynamic web application challenge at
        <a href="https://www.freecodecamp.org/challenges/build-a-voting-app" rel='noopener noreferrer' target="_blank"> FreeCodeCamp.</a></p>
        <p>It was built using the MERN Stack (MongoDB, Express, React and Node.js) with other packages</p>
        <h4>Story..</h4>
        <p>This is the first time I build a full stack app.
        It was quite challenging at the beginning,
        but I learned ton of things during the couple of weeks I spent working in this application.
        I had lots of fun learning how React works.
        I think I had fallen in love with this framework or library as you want to call it.</p>
        <p>I will prepare my coffee and head on to the next challenge.</p>
        <p>You can find me on <a href='https://twitter.com/ah__bz'  rel='noopener noreferrer' target='_black'><i className="fab fa-twitter"></i></a> </p>
      </div>
    );
  }
}

export default About;
