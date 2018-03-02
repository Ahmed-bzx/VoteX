import React, { Component } from 'react';
import CreatePollModal from '../components/CreatePollModal';
import { Icon } from 'semantic-ui-react'


class Home extends Component {
  render() {
    return (
      <div id='home-page'>
      <div id='main-container'>

          <div id='logo-container'>
            <h1 id="logo">Vote<strong id='logo-x'>X</strong></h1>
          </div>

          <div id='headline-container'>
            <h1 id='headline'>Create polls, <br />Share them <br /> & Vote.</h1>
            <p id='sub-headline'>A super easy to use voting app</p>
          </div>

          <div id='CTA-container'>
          {
            this.props.isAuth && this.props.user ? <CreatePollModal user={this.props.user}/> : <a href='/auth/google'><button id='google-button'><Icon name='google plus' /> Sign in with Google </button></a>
          }
          </div>

        </div>
      </div>
    );
  }
}

export default Home;
