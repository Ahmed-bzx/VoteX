import React, { Component } from 'react';
import moment from 'moment';
import Chart from '../components/Chart';
import { Segment, Form, Checkbox, Button, Loader } from 'semantic-ui-react';

class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '',
      poll: {}
    }

    this.handleVote = this.handleVote.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    fetch('/api/poll/' +  this.props.match.params.pollId, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    })
    .then((response) => response.json())
		.then((data) => this.setState({ poll: data }))
  }

  handleChange = (e, { value }) => this.setState({ selectedOption: value });

  handleVote() {
    const { poll, selectedOption} = this.state;

    fetch('/api/vote', {
      method: 'POST',
      credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ poll: poll, option: selectedOption })
		})
	    .then((res) => {
        this.props.history.goBack();
	    })
	    .catch((err) => console.log(err))
  }

  handleDelete() {
    fetch('/api/delete/' + this.state.poll._id, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then((res) => {
        this.props.history.goBack();
      })
      .catch((err) => console.log(err))
  }


  render() {
    const { title, options, author, createdAt } = this.state.poll;
    const { isAuth, user } = this.props;

      if(!title) {
        return <Loader className='loader' active inline='centered'>Loading</Loader>
      } else {
        return (
          <div id='poll-page'>
            <Segment id='poll-container'>

              <div id='vote-section'>
                <h2>{ title }</h2>
                <p style={{ color: '#777' }}>Created by: { author.name }</p>
                <p style={{ color: '#777' }}>Total Votes: {options.reduce((total, option) => (total + option.points), 0)}</p>
                {
                  isAuth && user.id === author.id ? null : options.map((option, i) => {
                    return <Form.Field key={i}>
                              <Checkbox
                              label={option.option}
                              name='selectedOption'
                              value={option.option}
                              checked={this.state.selectedOption === option.option}
                              onChange={this.handleChange}
                              />
                            </Form.Field>
                  })
                }
                <div id='poll-button-container'>
                  {
                    isAuth && user.id === author.id ? <Button basic color='red' content='Delete this poll' onClick={this.handleDelete}></Button> : <Button id='vote-button' content='Vote' disabled={ user.id === author.id ? true : false } onClick={this.handleVote}></Button>
                  }
                  <Button id='back-button' content='back' onClick={() =>this.props.history.goBack()}></Button>
                </div>

                <p id='share-link'><strong>Share : </strong>{ document.location.href }</p>
                <hr/>
                <p>{ moment(createdAt).fromNow() }</p>
              </div>

              <div id='chart-section'>
                <Chart options={ options} />
              </div>

            </Segment>
          </div>
      )
    }

  }
}

export default Poll;
