import {h, iconHome, iconCloudDownload} from '/js/src/index.js';


export default (model) => h('.p2', [
  h('h1', 'About Page'),
  h('button.btn.btn-primary.m1#NavigateHome', {
    onclick: () => {
      console.log('Navigating to Home page');
      model.router.go('?page=home');
    }
  }, [iconHome(), 'Home']),
  h('button.btn.btn-secondary.m1#ApplicationDataButton', {
    onclick: () => {
      console.log('Fetching Application Data');
    }
  }, [iconCloudDownload(), 'Get Application Data'])

]);