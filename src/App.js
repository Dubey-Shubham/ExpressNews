import './App.css';
import NavBar from './components/NavBar';
import React, { Component } from 'react'
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  pageSize=15;
  render() {
    return (
      <div>
        <Router>
         <NavBar/>
         {/* <News pageSize={this.pageSize}  country="de" category="science"/> */}
          <Routes>
            <Route exact path="/" element={<News key="general" pageSize={this.pageSize}  country="in" category="general"/>} />
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={this.pageSize}  country="in" category="entertainment"/>} />
            <Route exact path="/general" element={<News key="general" pageSize={this.pageSize}  country="in" category="general"/>} />
            <Route exact path="/health" element={<News key="health" pageSize={this.pageSize}  country="in" category="health"/>} />
            <Route exact path="/science" element={<News key="science" pageSize={this.pageSize}  country="in" category="science"/>} />
            <Route exact path="/sports" element={<News key="sports" pageSize={this.pageSize}  country="in" category="sports"/>} />
            <Route exact path="/technology" element={<News key="technology" pageSize={this.pageSize}  country="in" category="technology"/>} />   
          </Routes>
        </Router>
        {/* multiple router use kiye so that page to page route kar sakein
            exact use kare so that routing sahi ho
            key use ki so that route krte hi naya page load ho
            category href se connect karega */}
      </div>
    )
  }
}
