const express = require('express');
const apiRouter = require('../../api');

function makeTestApp() {
    const app = express();
    app.use(express.json());
    app.use('/api', apiRouter);
    app.use((err, _req, res, _next) => {
        res.status(err.status || 500).json({ error: err.message || 'INTERNAL_ERROR', ...(err.extras || {}) });
    });
    return app;
}

module.exports = { makeTestApp };
