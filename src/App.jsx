import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Movies from './components/movies';
import NavBar from './components/navbar';
import { Redirect, Route, Switch } from 'react-router-dom';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {


  render() {
    console.log("App - Render");
    return (
      <main className='container'>
        <ToastContainer />
        <NavBar />
        <div className="content">
          <Switch>
            <Route path='/login' component={LoginForm} />
            <Route path='/register' component={RegisterForm} />
            <Route path='/movies/:id' component={MovieForm} />
            <Route path='/movies' component={Movies} />
            <Route path='/customers' component={Customers} />
            <Route path='/rentals' component={Rentals} />
            <Route path='/not-found' component={NotFound} />
            <Redirect from='/' exact to='/movies' />
            <Redirect to='/not-found' />
          </Switch>
        </div>
      </main>
    );
  }

}

export default App;
