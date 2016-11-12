/**
 * Created by cristian.jora on 04.11.2016.
 */
var express = require('express');
var history = require('connect-history-api-fallback');
var path = require("path");
var serveStatic = require("serve-static")
app = express();
app.use(history());
app.use(serveStatic(path.join(__dirname, "dist")));
var port = process.env.PORT || 80;
app.listen(port);
console.log("server started "+port);

