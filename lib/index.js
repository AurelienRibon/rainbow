'use strict';

const App = require('./app');

const app = new App();
app.load();

window._app      = app;
window._stage    = app.stage;
window._renderer = app.renderer;
