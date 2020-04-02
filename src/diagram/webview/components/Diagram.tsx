import * as React from 'react';
import { parse, visualize, Raphael } from 'regulex-cjs';
import { useEffect, useContext, HTMLAttributes } from 'react';
import * as shortid from 'shortid';
import { RegexContext } from './Workbench/Workbench';

const mode = {
  light: {},
  dark: {},
};

export const RegExpDiagram: React.FC<HTMLAttributes<HTMLDivElement>> = () => {
  const id = `regexp-diagram-${shortid.generate()}`;
  const { regex } = useContext(RegexContext);
  useEffect(() => {
    // const regexpString = typeof props.regexp === 'string' ? props.regexp : props.regexp.source;
    document.getElementById(id)!.innerHTML = '';
    try {
      const ast = parse(regex);
      const paper = Raphael(id);
      visualize(ast, 'g', paper, { color: { background: 'transparent' } });
    } catch (e) {
      console.log('error occured', e);
      document.getElementById(id)!.innerHTML =
        '<div stype="padding: 30px; text-align: center;">无法解析正则表达式</div>';
    }
  }, [regex]);

  return <div id={id} />;
};
