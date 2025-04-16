import {h} from '/js/src/index.js';

/**
 * Main view layout
 * @return {vnode} application view to be drawn according to model
 */
export default (model) => [
  h('.flex-column.absolute-fill', [
    header(model),
    content()
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
const content = () => h('', 'Add your content here');
