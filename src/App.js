import './App.css';
import NavBar from './components/NavBar';
import React, { Component } from 'react'
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  pageSize=15;
  apiKey= process.env.REACT_APP_NEWSAPP_API

  state = {                         //state naam ka obj jisme progress ki value 0 hai
    progress:0
  }

  setProgress = (progress)=>{                              // arrow func bana k usme state set kar di progress naam ki jiski default value 0 hai
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
        <Router>
         <NavBar/>
         <LoadingBar                        // component use kiya aur color height progress set krdi
           color='#f11946'
           height={3}
           progress={this.state.progress}        //progress
         />
         {/* <News setProgress={this.setProgress} pageSize={this.pageSize}  country="de" category="science"/> */}
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize}  country="in" category="general"/>} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize}  country="in" category="entertainment"/>} />
            <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize}  country="in" category="general"/>} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize}  country="in" category="health"/>} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize}  country="in" category="science"/>} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize}  country="in" category="sports"/>} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize}  country="in" category="technology"/>} />   
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
