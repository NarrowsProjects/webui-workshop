import {h, info} from '/js/src/index.js';

export default (model) => h('.p2', [
  h('h1', 'Home Page'),
  h('button.btn.btn-primary.m1#NavigateAbout', {
    onclick: () => {
      console.log('Navigating to About page');
      model.router.go('?page=about');
    }
  }, [info(), 'About'])
]);

