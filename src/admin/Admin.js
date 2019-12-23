import React from 'react';

import Nav from '../navbar/Nav';
import TrainList from './trainList/TrainList';

class Admin extends React.Component {
  render() {
    return (
      <div>
        <Nav/>
        <div className="tabs">
            <div id="adminTab">
                <TrainList/>
            </div>
        </div>
      </div>
    );
  }
}
export default Admin;
