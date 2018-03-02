import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'
import './css/App.css';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Polls from './pages/Polls';
import MyPolls from './pages/MyPolls';
import Poll from './pages/Poll';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      isOpen: false,
      user: {
        id: '',
        name: '',
      }
    }

    this.close = this.close.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    fetch('/api/user', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({
          isAuth: true,
          user: {
            id: data.google.id,
            name: data.google.name,
          }
        });
      })
      .catch((err) => console.log(err))
  }

  close() {
    this.setState({ isOpen: false })
  }

  render() {
    const { isAuth, user } = this.state;

    return (
        <Router>
          <div id="outer-container" >

            <div id='navbar'>
              <Menu isOpen={ this.state.isOpen } pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
                <Link className='menu-item' to="/" name='home' onClick={this.close}><span>Home</span></Link>
                {
                  isAuth && user ? <Link className='menu-item' to="/mypolls" name='mypolls' onClick={this.close}><span>My Polls</span></Link> : null
                }
                <Link className='menu-item' to="/polls" name='polls' onClick={this.close}><span>All Polls</span></Link>
                <Link className='menu-item' to="/about" name='about' onClick={this.close}><span>About</span></Link>
                {
                  isAuth && user ? <a className='menu-item' href='/auth/logout' onClick={this.close}><span>Logout</span></a> : null
                }
              </Menu>
            </div>

            <main id="page-wrap">
              <div id="app">
                <div>
                  <Route exact path='/' render={ props => <Home isAuth={isAuth} user={user} {...props}/> }/>
                  <Route exact path='/about' component={About}/>
                  <Route exact path='/polls' component={Polls}/>
                  <Route exact path='/mypolls' render={ props => <MyPolls isAuth={isAuth} user={user} {...props}/> }/>
                  <Route exact path='/poll/:pollId' render={ props => <Poll isAuth={isAuth} user={user} {...props}/> }/>
                </div>
              </div>
            </main>

          </div>
        </Router>
    );
  }
}

export default App;
