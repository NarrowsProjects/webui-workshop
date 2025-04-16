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
const header = (model) =>
  h('.p2.shadow-level2.level2', {
    style: 'display: flex; justify-content: center'
  }, `Welcome to the ${model.router.params.page} page`);

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
