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
  renderRemoteData(model)
]);

function renderRemoteData(model) {
  return model.about.details.match({
    NotAsked: () => h('p', 'No data requested yet. Click "Get Application Data" to fetch details.'),
    Loading: () => h('p', 'Loading application data...'),
    Success: (data) => renderTable(data),
    Failure: (error) => h('p', {style: 'color: red'}, `Error: ${error}`)
  });
}

function renderTable(data) {
  const keys = Object.keys(data);
  if (keys.length !== 0) {
    const entries = Object.entries(data);
    return h('table.table', [
      h('thead', h('tr', [
        h('th', 'Property'),
        h('th', 'Value')
      ])),
      h('tbody', 
        entries.map(([key, value]) => 
          h('tr', [
            h('td', key),
            h('td', String(value))
          ])
        )
      )
    ]);
  }
  return h('p', 'No data available');
}