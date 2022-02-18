import React, { Component } from "react"
import { Route, Switch, Redirect } from 'react-router-dom'
import { useGaTracker } from './useGaTracker'
import logo from "./logo.svg"
import "./App.css"
// import ReactPixel from 'react-facebook-pixel';

// const advancedMatching = { em: 'some@email.com' }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching
// const options = {
//   autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
//   debug: false, // enable logs
// };
// ReactPixel.init('yourPixelIdGoesHere', advancedMatching, options);

// ReactPixel.pageView(); // For tracking page view
// ReactPixel.track(event, data); // For tracking default events. More info about standard events: https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking#standard-events
// ReactPixel.trackSingle('PixelId', event, data); // For tracking default events.
// ReactPixel.trackCustom(event, data); // For tracking custom events. More info about custom events: https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking#custom-events
// ReactPixel.trackSingleCustom('PixelId', event, data); // For tracking custom events.

// componentDidMount() {
//     const ReactPixel =  require('react-facebook-pixel');
//     ReactPixel.default.init('yourPixelIdGoesHere');
//   }

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
			<img src="data:image/png;base64,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" 
				style={{background: "radial-gradient(white , transparent 70%)"}} />
			<p>Have you seen this guy?</p>
		</div>
const App =() => {
	useGaTracker();
    	return (
		<div className="App">
			<header className="App-header">
      				<Switch>
					<Route path="/" exact component={Guy} />
				</Switch>
        		</header>
      		</div>
    	)
  
}

export default App
