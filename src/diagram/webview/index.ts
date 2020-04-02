import { Render } from "./App";

// window.addEventListener('message', event => {
//   const regexpGroups = event.data.regexpGroups;
//   console.log('event', event);
//   // @ts-ignore
//   window.regexpGroups = regexpGroups;
//   // localStorage.setItem('regexp-list', JSON.stringify(regexpGroups));
//   // @ts-ignore
//   console.log(window.regexpGroups);
//   Render();
// });

// @ts-ignore
window.vscode = acquireVsCodeApi();

Render();