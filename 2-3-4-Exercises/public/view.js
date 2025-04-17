import aboutPage from './about/aboutPage.js';
import {h} from '/js/src/index.js';
import homePage from './home/homePage.js';

/**
 * Main view layout
 * @return {vnode} application view to be drawn according to model
 */
export default (model) => [
  h('.flex-column.absolute-fill', [
    header(model),
    content(model)
  ])
];

/**
 * Top header of the page
 * @return {vnode}
 */
const header = (model) =>{
  const page = model.router.params.page;
  
  return h('.p2.shadow-level2.level2', {
    style: 'display: flex; justify-content: center'
  }, [
    `Welcome to the ${page} page. `,
    renderNumber(model)
  ])};

function renderNumber(model){
  const socketNr = model.socketNr;
  if (socketNr === null) return renderSocketButton(model);

  return `Your current number is: ${socketNr}.`
}

function renderSocketButton(model){
  return h("button.btn.btn-primary#NrSocketButton", { onclick: _=> model.openNrStream() }, "Get Your Number")
}

/**
 * Page content
 * @return {vnode}
 */
const content = (model) => {
  switch(model.router.params.page){
    case("home"): return homePage(model);
    case("about"): return aboutPage(model);
  }
}
