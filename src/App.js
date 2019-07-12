import React from 'react';
import {default as Chatkit} from '@pusher/chatkit-server';

import ChatMessage from './Components/ChatMessage';
import Signup from './Components/Signup';
import ChatApp from './Components/ChatApp';
const chatkit = new Chatkit({
  instanceLocator: "v1:us1:663aa7d5-cc1c-417e-af0b-3b7c385aa787",
  key: "f2244098-b4fb-4b79-85d6-041327361ea5:ExZr8GdFNKbCh1yQWxg2keM+sH3WFqUDNCGbYpBNC/0="
})
class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        currentUsername: '',
        currentId: '',
        currentView: 'ChatMessage'
      }
      this.changeView = this.changeView.bind(this);
      this.createUser = this.createUser.bind(this);
  }

  changeView(view) {
      this.setState({
          currentView: view
      })
  }

  createUser(username) {
    chatkit.createUser({
        id: username,
        name: username,
    })
    .then((currentUser) => {
        this.setState({
            currentUsername: username,
            currentId: username,
            currentView: 'chatApp'
        })
    }).catch((err) => {
             if(err.status === 400) {
            this.setState({
                currentUsername: username,
                currentId: username,
                currentView: 'chatApp'
            })
        } else {
            console.log(err.status);
        }
    });
  }

  render() {
        let view ='';
        if (this.state.currentView === "ChatMessage") {
            view = <ChatMessage  changeView={this.changeView}/>
        }
        else if (this.state.currentView === "signup") {
          view = <Signup onSubmit={this.createUser}/>
        }
        else if (this.state.currentView === "chatApp") {
          view = <ChatApp currentId={this.state.currentId} />
        }
        return (
            <div className="App">
                {view}
            </div>
        );
    }
}
export default App;