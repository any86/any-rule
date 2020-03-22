import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RegexpDiagram } from './views/RegexpDiagram';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <RegexpDiagram />
      </div>
    );
  }
}

export function Render() {
  ReactDOM.render(<App />, document.getElementById('root'));
}
