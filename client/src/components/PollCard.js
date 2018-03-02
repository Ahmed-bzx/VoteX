import React, { Component } from 'react';
import moment from 'moment';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


class PollCard extends Component {
  render() {
    const { _id, title, author, createdAt } = this.props.poll;

    return (
      <Card
        className='card'
        as={Link}
        to={ '/poll/' + _id }
        header={ title }
        meta={ 'by ' + author.name }
        extra= { <p>{moment(createdAt).fromNow()}</p> }
      />
    )
  }
}

export default PollCard;
