import React, { Component } from 'react';
import PollCard from '../components/PollCard';
import { Card, Loader } from 'semantic-ui-react'

class Polls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: [],
      dataReceived: false
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    fetch('/api/polls', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    })
    .then((response) => response.json() )
		.then((data) => this.setState({ polls: data, dataReceived: true }) )
  }

  render() {
    const { polls, dataReceived } = this.state;

    if(!dataReceived) {
      return <Loader className='loader' active inline='centered'>Loading</Loader>
    } else {
      return (
        <div id='polls-page'>
          <h1>All Polls</h1>

          <div>
            <Card.Group className='cards-container'>
            {
              polls.map((poll, i) => {
                return <PollCard key={i} poll={ poll } />
              })
            }
            </Card.Group>
          </div>
        </div>
      );
    }
  }
}

export default Polls;
