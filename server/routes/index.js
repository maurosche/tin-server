const express = require('express');

const app = express();

// app.use( require('./upload'));
// app.use( require('./imagenes'));

app.use( require('./login'));
app.use( require('./foto'));
app.use( require('./usuario'));
app.use( require('./chat'));
app.use( require('./like'));
app.use( require('./match'));
app.use( require('./trip'));

module.exports = app;