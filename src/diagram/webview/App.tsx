import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RegexToolView } from './views/RegexTools';
import 'antd/dist/antd.less';
import './App.less';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <RegexToolView />
      </div>
    );
  }
}

export function Render() {
  ReactDOM.render(<App />, document.getElementById('root'));
}
