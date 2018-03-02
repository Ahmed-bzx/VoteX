import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PollCard from '../components/PollCard';
import { Card, Loader } from 'semantic-ui-react';

class MyPolls extends Component {
  constructor() {
    super();
    this.state = {
      userPolls: [],
      dataReceived: false
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const { user } = this.props;

    if(user) {
      fetch('/api/polls/' + user.id , {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'no-cors'
      })
      .then((response) => response.json() )
      .then((data) => this.setState({ userPolls: data, dataReceived: true }) )
    }
  }

  render() {
    const { isAuth, user } = this.props;
    const { userPolls, dataReceived } = this.state;

    // if the user isn't authanticated redirect to '/'
    if (!isAuth || !user) {
      return <Redirect to={'/'} />;
    }

    if(!dataReceived) {
      return <Loader className='loader' active inline='centered'>Loading</Loader>
    } else {
      return (
        <div id='mypolls-page'>
          <h1>My Polls</h1>
          <div>
            <Card.Group className='cards-container'>
            {
              userPolls.map((poll, i) => {
                return <PollCard key={i} poll={ poll } />
              })
            }
            </Card.Group>
          </div>
        </div>
      )
    }
  }
}

export default MyPolls;
