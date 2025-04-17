import {h, info, iconPerson} from '/js/src/index.js';

export default (model) => h('.p2', [
  h('h1', 'Home Page'),
  h('button.btn.btn-primary.m1#NavigateAbout', {
    onclick: () => {
      console.log('Navigating to About page');
      model.router.go('?page=about');
    }
  }, [info(), 'About']),
  h('button.btn.btn-secondary.m1#ChangeNameButton', {
    onclick: () => {
      console.log('Fetching username');
      model.home.setUserName('New username');
      console.log('Username:', model.home.getUserName());
    }
  }, [iconPerson(), 'Change Username']),
  h('label.m1', `Current User: ${model.home.getUserName()}`)
]);
