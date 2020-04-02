import * as React from 'react';
import { useReducer } from 'react';
import { Row, Col, Button, Input } from 'antd';
import { RegExpDiagram } from '../Diagram';
import { Editor } from '../Editor/Editor';
import './Workbench.less';
import { RegexEditor } from '../RegexEditor/RegexEditor';
import { TestCaseEditor } from '../TestCaseEditor/TestCaseEditor';

interface IWorkspaceProps extends React.HTMLAttributes<HTMLDivElement> {
  regexp: string;
}

interface IWorkbenchState {
  regex: string;
  flag: string;
}

interface IWorkbenchAction {
  type: 'regex' | 'flag';
  value: string;
}

const reducer: React.Reducer<IWorkbenchState, IWorkbenchAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'regex':
      return { regex: action.value, flag: state.flag };
    case 'flag':
      return { regex: action.value, flag: state.flag };
  }
};

export const RegexContext = React.createContext({
  regex: '',
  flag: '',
  dispatch: (action: IWorkbenchAction) => {},
});
export const RegexWorkbench: React.FC<IWorkspaceProps> = props => {
  const rawRegexp = props.regexp;
  const [state, dispatch] = useReducer(reducer, {
    regex: props.regexp,
    flag: '',
  });
  return (
    <div className="anyrule-workbench">
      <RegexContext.Provider value={{ regex: state.regex, flag: '', dispatch }}>
        <Row gutter={16} style={{ paddingTop: '16px' }}>
          <Col span={21}>
            <RegexEditor></RegexEditor>
            {/* <Input placeholder="请输入正则表达式" value={regexp} onChange={event => setRegexp(event.currentTarget.value)} /> */}
          </Col>
          <Col span={3}>
            <Button type="primary" style={{ width: '100%' }}>
              替换
            </Button>
          </Col>
        </Row>
        <Row
          style={{ maxWidth: '100%', overflowX: 'scroll', margin: '20px 0' }}
        >
          <RegExpDiagram style={{ marginLeft: 'auto', marginRight: 'auto' }} />
        </Row>
        <Row>
          <TestCaseEditor></TestCaseEditor>
          {/* <Editor regexp={props.regexp} /> */}
        </Row>
      </RegexContext.Provider>
    </div>
  );
};
