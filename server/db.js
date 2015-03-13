/*
A reusable DB object
 */
var url = 'totem';
var db = require('mongojs').connect(url);

module.exports = db;