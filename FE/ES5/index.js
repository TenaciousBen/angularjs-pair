var express = require('express'),
    app = express(),
    port = 9000;
var router = express.Router();

app.use(express.static("./public"));
app.listen(port);