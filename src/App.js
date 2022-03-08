import React, { Component, useEffect, useRef, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useGaTracker } from "./useGaTracker";
import logo from "./logo.svg";
import "./App.css";
import QRCodeStyling from "qr-code-styling";
import { blackSrc } from "./blackSrc";
import { whiteSrc } from "./whiteSrc";
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
    super(props);
    this.state = { loading: false, msg: null };
  }

  handleClick = () => {
    this.setState({ loading: true });
    fetch("/.netlify/functions/hello")
      .then((response) => response.json())
      .then((json) => this.setState({ loading: false, msg: json.msg }));
  };

  render() {
    const { loading, msg } = this.state;

    return (
      <p>
        <button onClick={this.handleClick("hello")}>
          {loading ? "Loading..." : "Call Lambda"}
        </button>
        <button onClick={this.handleClick("async-dadjoke")}>
          {loading ? "Loading..." : "Call Async Lambda"}
        </button>
        <br />
        <span>{msg}</span>
      </p>
    );
  }
}
const Nid = new URLSearchParams(window.location.search).get("id");
const campaign = new URLSearchParams(window.location.search).get("campaign");
const src = Date.now() % 2 ? whiteSrc : blackSrc;

const Guy = () => {
  return (
    <div>
      <img
        src={"data:image/png;base64," + src}
        style={{ background: "radial-gradient(white , transparent 70%)" }}
      />
      <p style={{ fontFamily: "monospace" }}>
        Have you seen <b>this</b> guy?
      </p>
    </div>
  );
};
const Code = ({ id, campaign }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");

  const ref = useRef(id);

  useEffect(() => {
    const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      type: "svg",
      data: `https://inspiring-bhabha-0e80f6.netlify.app/${
        campaign && "?campaign=" + campaign
      }&id=${id}`,
      image: "/TylGuyogo.png",
      dotsOptions: {
        color: "black",
        type: "rounded",
      },
      backgroundOptions: {
        color: "white",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 20,
      },
    });
    qrCode.update({
      data: `${window.location.href} + ${
        campaign && "?campaign=" + campaign
      }&id=${id}`,
    });
    qrCode.getRawData().then((data) => {
      setData(URL.createObjectURL(data));
    });

    setLoading(false);
  }, [id]);
  debugger;
  return !loading ? <img src={data} /> : "nah";
};
const QrGen = ({
  location: { search },
  campaign = new URLSearchParams(search)?.get("campaign") ?? "",
}) => {
  debugger;
  const [[startIdRange, endIdRange], setIdRange] = useState([0, 10]);
  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {Array(endIdRange - startIdRange)
        .fill(0)
        .map((_, i) => i + startIdRange)
        .map((id) => (
          <Code campaign={campaign} key={id} id={id}></Code>
        ))}
    </div>
  );
};
const App = () => {
  useGaTracker();
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
    {/* <Route exact path="/" component={Guy} />*/}
          <Route path="/" component={QrGen} />
        </Switch>
      </header>
    </div>
  );
};

export default App;
