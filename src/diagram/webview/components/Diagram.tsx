import * as React from 'react';
import { parse, visualize, Raphael } from 'regulex-cjs';
import { useEffect } from 'react';

interface IDiagramProps {
  regexp: string | RegExp;
}

export const RegExpDiagram: React.FC<IDiagramProps> = (props) => {
  useEffect(() => {
    const regexpString = typeof props.regexp === 'string' ? props.regexp : props.regexp.source;
    const ast = parse(regexpString);
    const paper = Raphael('regexp-diagram');
    visualize(ast, 'g', paper, { color: { background: 'transparent' } });
  });

  return (
    <div id="regexp-diagram" />
  );
};
