import React, { Component } from 'react';
import { Button, Modal, Icon, Form, List } from 'semantic-ui-react';

class Option extends Component {
  onDelete = () => {
    this.props.onDelete(this.props.option);
  }

  render() {
    return (
      <List.Item className='option-item'>
        <List.Content floated='right'> <a className='remove-option' onClick={this.onDelete}>remove</a> </List.Content>
        <List.Content> <List.Header>{ this.props.option }</List.Header> </List.Content>
      </List.Item>
    )
  }
}

class CreatePollModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: '',
      newOption: '',
      options: [],
      errorMessage: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addOption = this.addOption.bind(this);
    this.deleteOption =this.deleteOption.bind(this);
  }

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false, title: '', options: [], newOption: '', errorMessage: '' });

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({ [name]: value });
  }

  handleSubmit() {
    let { title, options } = this.state;

    // if there are a title and more than one option, create the poll
    if(title && options.length > 1) {
      options = options.map((option) => {
        return { option: option, points: 0 }
      });

      const newPoll = { title: title, options: options, user: this.props.user };

      fetch('/api/newpoll', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPoll)
      })
      .then((res) => {
        this.close();
      });
    }
  }

  isValid() {
    let { options, newOption } = this.state;
    if(!newOption.trim()) {
      return false;
    } else if (options.includes(newOption)) {
      this.setState({ errorMessage: 'option already exists!'});
      return false;
    }

    return true;
  }

  addOption() {
    if (this.isValid()) {
      let { options, newOption } = this.state;
      options.push(newOption);
      this.setState({ options: options, newOption: '', errorMessage: '' });
    }
  }

  deleteOption(option) {
    let options = this.state.options.filter((val) => {
      return option !== val;
    });
    this.setState({ options: options });
  }

  renderOptions() {
    return this.state.options.map((option, i) => {
      return <Option key={i} option={option} onDelete={this.deleteOption}/>
    })
  }


  render() {
    const { open, dimmer, title, newOption, errorMessage } = this.state;

    return (
      <div>
        <button id='create-new-poll-button' onClick={this.show(true)}><Icon name='add' /> New Poll</button>

        <Modal size='tiny' dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Create New Poll</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Poll Title</label>
                <input name='title' value={title} placeholder='What is in your mind?' onChange={this.handleChange} />
              </Form.Field>


              <List relaxed>
                { this.renderOptions() }
              </List>

              <Form.Group>
                <Form.Input name='newOption' value={newOption} placeholder='Add New Option' onChange={this.handleChange} />
                <Form.Button id='add-option-button' content='+' onClick={this.addOption} />
              </Form.Group>

              <p>{ errorMessage }</p>

              <Button id='create-poll-button' type='submit' content="Create" onClick={this.handleSubmit} />
              <Button id='cancel-button' color='black' onClick={this.close}> Cancel </Button>
              </Form>
            </Modal.Content>
          </Modal>
        </div>
    )
  }
}


export default CreatePollModal;
