
import './App.css'
import React, { Component } from 'react'
import NavBar from './components/NavBar'
import NewsComponent from './components/News'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'




export default class App extends Component {

  state = {
    progress: 0,
  }

  setProgress = (progresss) => {
    this.setState({ progress: progresss })
  }
  render() {
    return (

      <Router>
        <NavBar />
        <LoadingBar
          color='#f11946'
          progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
        />

        <div className="container my-3">
          <Routes>
            <Route
              path="/"
              element={<NewsComponent setProgress={this.setProgress} key="general" pageSize={8} category={"general"} />}
            />

            <Route
              path="/home"
              element={<NewsComponent setProgress={this.setProgress} key="general" pageSize={8} category={"general"} />}
            />
            <Route
              path="/business"
              element={<NewsComponent setProgress={this.setProgress} key="business" pageSize={8} category={"business"} />}
            />

            <Route
              path="/entertainment"
              element={<NewsComponent setProgress={this.setProgress} key="entertainment" pageSize={8} category={"entertainment"} />}
            />

            <Route
              path="/health"
              element={<NewsComponent setProgress={this.setProgress} key="health" pageSize={8} category={"health"} />}
            />

            <Route
              path="/science"
              element={<NewsComponent setProgress={this.setProgress} key="science" pageSize={8} category={"science"} />}
            />

            <Route
              path="/sports"
              element={<NewsComponent setProgress={this.setProgress} key="sports" pageSize={8} category={"sports"} />}
            />

            <Route
              path="/technology"
              element={<NewsComponent setProgress={this.setProgress} key="technology" pageSize={8} category={"technology"} />}
            />

          </Routes>
        </div>
      </Router>

      // <div>
      //   <NavBar />
      //   <NewsComponent  setProgress={this.setProgress} pageSize={7} category={"sport"} />
      // </div>
    )
  }
}

