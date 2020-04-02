import * as React from 'react';
import { useEffect, useState } from 'react';
import { Collapse, Input, Row, Col, Button } from 'antd';
import { RegexWorkbench } from '../components/Workbench/Workbench';

export const RegexToolView: React.FC = () => {
  // @ts-ignore
  // const regexpGroups = window.regexpGroups;
  const [ regexpList, setRegexpList ] = useState([] as string[]);
  window.addEventListener('message', event => {
    console.log(event);
    // return;
    if (event.data.regexpList) {
      setRegexpList(event.data.regexpList);
    }
  });
  // @ts-ignore
  useEffect(() => {
    // @ts-ignore
    vscode.postMessage({
      command: 'getRegexpList',
    });
  }, []);
  // const regexpList = JSON.parse(localStorage.getItem('regexp-list') || '[]');
  console.log(regexpList);
  const { Panel } = Collapse;
  return (
    <>
      <Collapse accordion bordered={false} defaultActiveKey={['panel-0']}>
        {regexpList?.map((regexp: string, index: number) => (
          <Panel
            header={regexp}
            key={'panel-' + String(index)}
            className="regex-collapse-panel"
          >
            <RegexWorkbench regexp={regexp}></RegexWorkbench>
          </Panel>
        ))}
      </Collapse>
    </>
  );
};
