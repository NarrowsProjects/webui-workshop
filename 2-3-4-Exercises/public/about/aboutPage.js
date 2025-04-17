import {h, iconHome, iconCloudDownload} from '/js/src/index.js';

export default (model) => h('.p2', [
  h('h1', 'About Page'),
  h('p', `Data requested ${model.about.requestedTimes} times`),
  h('button.btn.btn-primary.m1#NavigateHome', {
    onclick: () => {
      console.log('Navigating to Home page');
      model.router.go('?page=home');
    }
  }, [iconHome(), 'Home']),
  h('button.btn.btn-secondary.m1#ApplicationDataButton', {
    onclick: () => {
      console.log('Fetching Application Data');
      model.about.getDetails();
      console.log('Application Data:', model.about.details);
    }
  }, [iconCloudDownload(), 'Get Application Data']),
  renderTable(model)
]);

function renderTable(model){
  const keys = Object.keys(model.about.details);
  if (keys.length !== 0){
    return h('table.table', [
      h('thead', h('tr', [
        h('th', 'Property'),
        h('th', 'Value')
      ])),
      h('tbody', 
        Object.entries(model.about.details).map(([key, value]) => 
          h('tr', [
            h('td', key),
            h('td', String(value))
          ])
        )
      )
    ])
  } else return h('p', 'No data available yet. Click "Get Application Data" to fetch details.')
}