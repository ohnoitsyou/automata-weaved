"use strict";
var express = require("express");
var debug = require("debug")("weaved");

var Weaved = function() {
  this.version = "0.1.0";
  this.router = express.Router();
  this.viewsFolder = __dirname + "/views";
  this.stylesFolder = __dirname + "/css";
  this.scriptsFolder = __dirname + "/js";

  this.load = function(options) {
    debug("[Load] Starting");
    debug("[Load] Finishing");
  };
  this.initilize = function() {
    debug("[Initilize] Starting");
    debug("[Initilize] Finishing");
    return true;
  };
  this.loadRoutes = function() {
    debug("[LoadRoutes] Starting");
    this.router.get("/", function(req, res) {
      res.send("Weaved!");
    });
    debug("[LoadRoutes] Finishing");
    return this.router;
  };
}

module.exports = Weaved;
