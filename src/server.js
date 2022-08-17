"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = (0, express_1["default"])();
app.get("/", function (req, res) {
    res.status(200).json("hello world");
});
app.listen(3000, function () {
    console.log("server is running on: http://localhost:3000");
});
