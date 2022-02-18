import React, { Component } from "react"
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import useGaTracker from './useGaTracker'
import logo from "./logo.svg"
import "./App.css"

class LambdaDemo extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, msg: null }
  }

  handleClick = api => e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }))
  }

  render() {
    const { loading, msg } = this.state

    return (
      <p>
        <button onClick={this.handleClick("hello")}>{loading ? "Loading..." : "Call Lambda"}</button>
        <button onClick={this.handleClick("async-dadjoke")}>{loading ? "Loading..." : "Call Async Lambda"}</button>
        <br />
        <span>{msg}</span>
      </p>
    )
  }
}
const Guy=()=>  <div>
            <p>Have you seen this guy?</p>
         </div>
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
	    <Router>
      		<Switch>
          	<Route path="/" exact component={Guy} />
					</Switch>
		</Router>
        </header>
      </div>
    )
  }
}

export default App
