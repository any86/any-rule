import * as React from 'react';
import { RegExpDiagram } from '../components/Diagram';

export const RegexpDiagramView: React.FC = () => {
  // @ts-ignore
  const regexpGroups = window.regexpGroups;
  console.log(regexpGroups);
  return (
    <>
      <div>
        {regexpGroups.map((regexp: string) => <RegExpDiagram className="regexp-diagram" regexp={new RegExp(regexp)} />)}
      </div>
    </>
  );
};
