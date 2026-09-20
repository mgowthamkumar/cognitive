// Vercel Serverless Function Gateway
const app = require('../server/dist/index.js').default || require('../server/dist/index.js');
module.exports = app;
