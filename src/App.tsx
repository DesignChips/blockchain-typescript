import * as React from 'react';
import './App.css';
import { Block, BlockChainServer } from './BlockChain/type';
import { Server } from './BlockChain/Server';

const logo = require('./logo.svg');
// const server = new Server();

interface AppProps {

}

interface AppState {
 server: BlockChainServer;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      server: new Server()
    };
  }

  handleMine() {
    const recipient: string = `someone else's address`;
    const block: Block = this.state.server.mine(recipient);
    console.log('新しいブロックを採掘しました');
    console.log(block);
  }

  handleDisplayChain() {
    const chain = this.state.server.chain();
    console.log(chain);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button type="button" onClick={() => { this.handleMine(); }}>採掘する</button>
        <button type="button" onClick={() => { this.handleDisplayChain(); }}>チェーンを表示する</button>
      </div>
    );
  }
}

export default App;
