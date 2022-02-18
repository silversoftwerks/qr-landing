import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import useGaTracker from './useGaTracker'
import logo from "./logo.svg"
import "./App.css"
import ReactPixel from 'react-facebook-pixel';

const advancedMatching = { em: 'some@email.com' }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching
const options = {
  autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
  debug: false, // enable logs
};
ReactPixel.init('yourPixelIdGoesHere', advancedMatching, options);

ReactPixel.pageView(); // For tracking page view
ReactPixel.track(event, data); // For tracking default events. More info about standard events: https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking#standard-events
ReactPixel.trackSingle('PixelId', event, data); // For tracking default events.
ReactPixel.trackCustom(event, data); // For tracking custom events. More info about custom events: https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking#custom-events
ReactPixel.trackSingleCustom('PixelId', event, data); // For tracking custom events.

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
const Guy = () => <div>
			<p>Have you seen this guy?</p>
		</div>
const App =() => {
	useGaTracker();
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

export default App
