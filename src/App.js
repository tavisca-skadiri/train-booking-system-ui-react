import React from 'react';
import Nav from './navbar/Nav';
import Tabs from './tabs/Tabs';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Nav/>
        <Tabs/>
      </div>
    );
  }
}
export default App;
