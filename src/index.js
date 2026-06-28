import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { useState } from "react";

const myData = [
  {
    id: "1",
    name: "INTEGRITY",
    envelopeIcon: "blue-open-env.png",
    text: "* Despite the pressure to change, you stayed true to yourself. You are filled with ",
    heartIcon: "heart-blue.png",
  },

  {
    id: "2",
    name: "DETERMINATION",
    envelopeIcon: "red-open-env.png",
    text: "* No obstacle could extinguish the fire that drove you forward. You are filled with ",
    heartIcon: "heart-red.png",
  },

  {
    id: "3",
    name: "JUSTICE",
    envelopeIcon: "yellow-open-env.png",
    text: "* Despite having every reason to hate, you refused to become cruel. You are filled with ",
    heartIcon: "heart-yellow.png",
  },

  {
    id: "4",
    name: "PERSERVERANCE",
    envelopeIcon: "purple-open-env.png",
    text: "* Despite every ending telling you to stop, you kept walking. You are filled with ",
    heartIcon: "heart-purple.png",
  },

  {
    id: "5",
    name: "KINDNESS",
    envelopeIcon: "green-open-env.png",
    text: "* You chose compassion where others chose indifference and resentment. You are filled with ",
    heartIcon: "heart-green.png",
  },

  {
    id: "6",
    name: "BRAVERY",
    envelopeIcon: "orange-open-env.png",
    text: "* Fear stood before you, but you found the strength to move forward. You are filled with ",
    heartIcon: "heart-orange.png",
  },

  {
    id: "7",
    name: "PATIENCE",
    envelopeIcon: "light-blue-open-env.png",
    text: "* You understood that some things cannot be rushed, no matter how badly you wanted them. You are filled with ",
    heartIcon: "heart-light-blue.png",
  },
];

function App() {
  return <>{<Header /> ? <SendMessage /> : <OpenEnvelopeScreen />}</>;
}

// screen 2: functionality - onClick event on the enveloper icon changes the UI - envelope icon changes and the text bellow is displayed.
// screen 3 and 4: onClick on the text or the open envelope the envelope changes to closed envelope and the header is displayed

function OpenEnvelopeScreen() {
  // first I set up the current image state
  const [imageSrc, setImageSrc] = useState("new-message-env.png");
  const [textMsg, setTextMsg] = useState("");
  const [header, setHeader] = useState(" ");

  const targetDetermination = myData[1];
  // here I set the new image and a message on a click event
  function handleImageClick() {
    setImageSrc(targetDetermination.envelopeIcon);
    setTextMsg(<DeterminationMessage />);
  }

  // here I set a closed envelope image, removing the txt message, and showing the header component
  function handleMessageRead() {
    setImageSrc("closed-env.png");
    setTextMsg(" ");
    setHeader(<Header />);
  }

  return (
    <>
      <div className="app-container">
        <div className="header">{header}</div>
        <div className="message-data-container">
          <img
            src={imageSrc}
            alt="new-message-envelope"
            className="envelope"
            // if there is a textMessage on click it triggers the handleMessageRead function otherwise handleImageClick function
            onClick={textMsg ? handleMessageRead : handleImageClick}
            style={{ cursor: "pointer" }}
          />
          <div onClick={handleMessageRead} style={{ cursor: "pointer" }}>
            {textMsg}
          </div>
        </div>
      </div>
    </>
  );
}

// Build StartingScreen component and implemet the logic there
// The app start with a black screen with a white envelope in the center after loading the page the sound of incomming message and the screen changes to envelope with 1 message icon

function StartScreen() {
  return;
}

function SendMessage() {
  // checking if a new message has arrived
  const [hasNewMessage, setHasNewMessage] = useState(false);

  // first I set up the current image state
  const [imageSrc, setImageSrc] = useState("closed-env.png");
  const [textMsg, setTextMsg] = useState("");

  const targetDetermination = myData[1];

  // the function handle the recieved message
  function handleBtnClick() {
    setHasNewMessage(true);
    setImageSrc("new-message-env.png");
  }

  // here I set the new image and a message on a click event
  function handleImageClick() {
    if (hasNewMessage) {
      setImageSrc(targetDetermination.envelopeIcon);
      setTextMsg(<DeterminationMessage />);
    }
  }

  // here I set a closed envelope image, removing the txt message, and showing the header component
  function handleMessageRead() {
    setHasNewMessage(false);
    setImageSrc("closed-env.png");
    setTextMsg(" ");
  }

  return (
    <>
      <div className="app-container">
        <div className="header">
          <HeartContainer />
          <NewMessageBtn
            onClick={handleBtnClick}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="message-data-container">
          <img
            src={imageSrc}
            alt="new-message-envelope"
            className="envelope"
            // if there is a textMessage on click it triggers the handleMessageRead function otherwise handleImageClick function
            onClick={textMsg ? handleMessageRead : handleImageClick}
            style={{ cursor: "pointer" }}
          />
          {
            <div onClick={handleMessageRead} style={{ cursor: "pointer" }}>
              {textMsg}
            </div>
          }
        </div>
      </div>
    </>
  );
}

function ClosedEnvelope() {
  return <img className="envelope" src="closed-env.png" alt="envelope" />;
}

function OpenEnvelope(props) {
  return (
    <img className="envelope" src={props.envelopeIcon} alt="open-envelope" />
  );
}

function NewMessageEnvelope() {
  return <img className="envelope" src="new-message-env.png" alt="envelope" />;
}

function DeterminationMessage() {
  return (
    <div className="text-box">
      Seeing this fills you with
      <span className="colorRed"> DETERMINATION</span>
    </div>
  );
}

function ReadMessage() {
  return (
    <div className="center-envelope">
      <OpenEnvelope {...myData[3]} />
      <Message {...myData[3]} />
    </div>
  );
}

// component for the dynamic message from the JSON array
function Message(props) {
  return (
    <div className="text-box">
      {props.text}
      <span className="colorRed">{props.name}</span>
    </div>
  );
}

// single heart icon - should be dynamic, because the hearts will be taken from the JSON array
function Heart() {
  return <img className="heart" src="heart-red.png" alt="heart red" />;
}

// hearts container to pass the 3 randomly selected hearts from the selected envelope
function HeartContainer() {
  return (
    <div className="heart-container">
      <Heart />
    </div>
  );
}

// the button
function NewMessageBtn({ onClick, style }) {
  return (
    <button onClick={onClick} style={style}>
      Send Message
    </button>
  );
}

// combined hearts container and send message button into single header
function Header() {
  return (
    <>
      <HeartContainer />
      <NewMessageBtn />
    </>
  );
}

// components needed:
// closed envelope - png
// envelope with number 1
// open envelope with heart
// text box with different tekst
// button "Send Message"
// heart image
// hearts box on the left upper corner (max 3 hearts)

// flow
// screen 1: black screen with a white envelope in the center
// screen 2: after loading the page the sound of incomming message and the screen changes to envelope with 1 message icon
// screen 3: After user clicks on the envelope the screen changes to open envelope with heart and text box below with a message.
// after user clicks outside or anywhere the screen changes
// screen 4: closed envelope in the center, 1 heart in the upper left corner, and a button "Send message" showing.
// screen 5: if user clicks btn the envelope changes to the one with 1 message, and button is disabled until the message is open
// screen 6: open message showing randomly selected message and heart color.
// user can send up to 2 messages daily, after midnight the app restart to the screen 1.

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
