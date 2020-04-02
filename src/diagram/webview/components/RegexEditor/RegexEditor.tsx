import * as React from 'react';
import { useRef, useEffect, MutableRefObject, useContext } from 'react';

import * as CodeMirror from 'codemirror';
import 'codemirror/addon/display/placeholder';
import 'codemirror/lib/codemirror.css';
import { RegexContext } from '../Workbench/Workbench';
import * as shortid from 'shortid';
import './RegexEditor.less';

export const RegexEditor: React.FC<{}> = () => {
  const id = `regex-editor${shortid.generate()}`;

  const { regex, flag, dispatch } = useContext(RegexContext);
  const codeMirrorElement: MutableRefObject<HTMLDivElement | null> = useRef(
    null,
  );
  const regexEditorElement: MutableRefObject<HTMLDivElement | null> = useRef(
    null,
  );

  let codeMirror: CodeMirror.Editor;

  useEffect(() => {
    codeMirror = CodeMirror(codeMirrorElement.current!, {
      value: regex,
      lineWrapping: false,
      placeholder: '请输入测试文本',
    });

    codeMirror.on('focus', () => {
      regexEditorElement.current?.classList.add('active');
    });

    codeMirror.on('blur', () => {
      regexEditorElement.current?.classList.remove('active');
    });

    codeMirror.on('change', editor => {
      // setRegexp(codeMirror.getValue());
      dispatch({
        type: 'regex',
        value: editor.getValue(),
      });
    });

    codeMirror.on('beforeChange', (instance, change) => {
      var newtext = change.text.join('').replace(/\n/g, ''); // remove ALL \n !
      change.update!(change.from, change.to, [newtext]);
      return true;
    });
  }, []);

  return (
    <div id={id} ref={regexEditorElement} className="regex-editor input-area">
      <div className="separator">/</div>
      <div className="codemirror-wrapper" ref={codeMirrorElement}></div>
      {/* <Input onFocus={onFocus} onBlur={onBlur} value={regexp} onChange={onChange} onKeyPress={onKeyPress} placeholder="请输入正则表达式" /> */}
      <div className="separator">/</div>
      {/* <Select></Select> */}
      <div className="flag-selector">{flag}</div>
    </div>
  );
};
