import { Render } from "./App";

window.addEventListener('message', event => {
  const regexpGroups = event.data.regexpGroups;
  console.log(event.data);
  // @ts-ignore
  window.regexpGroups = regexpGroups;
  // @ts-ignore
  console.log(window.regexpGroups);
  Render();
});
