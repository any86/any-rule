import * as React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { RegexContext } from '../Workbench/Workbench';

import * as CodeMirror from 'codemirror';
import 'codemirror/addon/display/placeholder';
import 'codemirror/addon/mode/simple';

import 'codemirror/lib/codemirror.css';
import './TestCaseEditor.less';
import shortid = require('shortid');

interface ICodeMirrorEditorProps {
  mode: string;
}

const CodeMirrorEditor: React.FC<ICodeMirrorEditorProps> = props => {
  const container = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');
  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = '';
      const codeMirror = CodeMirror(container.current!, {
        value,
        lineWrapping: true,
        placeholder: '请输入测试文本',
        mode: props.mode,
      });

      codeMirror.on('focus', () => {
        container.current?.classList.add('active');
      });

      codeMirror.on('blur', () => {
        container.current?.classList.remove('active');
      });

      codeMirror.on('change', cm => {
        setValue(cm.getValue());
      });
    }
  }, [props.mode]);

  return (
    <div className="test-case-editor input-area" ref={container}></div>
  );
};

export const TestCaseEditor = () => {
  const { regex } = useContext(RegexContext);

  const [mode, setMode] = useState('simplemode');

  useEffect(() => {
    const mode = `mode-${shortid.generate()}`;
    // @ts-ignore
    CodeMirror.defineSimpleMode(mode, {
      start: [
        { regex: new RegExp(regex), token: 'string' },
      ],
    });
    setMode(mode);
  }, [regex]);

  return <CodeMirrorEditor mode={mode}></CodeMirrorEditor>;
};
