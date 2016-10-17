import React from 'react';
import {render} from 'react-dom';

import ToDew from './ToDew.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
      <p>To Dew!</p>
      <ToDew />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
