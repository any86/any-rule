import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RegexpDiagramView } from './views/RegexpDiagram';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <RegexpDiagramView />
      </div>
    );
  }
}

export function Render() {
  ReactDOM.render(<App />, document.getElementById('root'));
}
