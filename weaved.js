"use strict";
var express = require("express");
var debug = require("debug")("weaved");
var request = require("request");
var path = require("path");
var fs = require("fs");

var Weaved = function() {
  this.version = "0.1.0";
  this.router = express.Router();
  this.viewsFolder = __dirname + "/views";
  this.stylesFolder = __dirname + "/css";
  this.scriptsFolder = __dirname + "/js";
  this.deviceAddress = "";

  this.load = function(options) {
    debug("[Load] Starting");
    this.deviceAddress = options.weavedAddress;
    debug("[Load] Finishing");
  };
  this.initilize = function() {
    debug("[Initilize] Starting");
    debug("[Initilize] Finishing");
    return true;
  };
  this.loadRoutes = function() {
    debug("[LoadRoutes] Starting");
    var self = this;
    this.router.get("/", function(req, res) {
      res.send("Weaved!");
    });
    this.router.get("/on", function(req, res) {
      request.post(self.deviceAddress + "/cgi-bin/on.sh", function(e, r, b) {
        if(!e && r.statusCode == 200) {
          debug("Success");
        } else {
          debug("Not success: %s", e);
        }
        res.send("Device turned on");
      });
    });
    this.router.get("/off",function(req, res) {
      request.post(self.deviceAddress + "/cgi-bin/off.sh", function(e, r, b) {
        if(!e && r.statusCode == 200) {
          debug("Success");
        } else {
          debug("Not success: %s", e);
        }
        res.send("Device turned off");
      });
    });
    this.router.get("/status", function(req, res) {
      request.get(self.deviceAddress + "/cgi-bin/stat.sh", function(e, r, b) {
        if(!e && r.statusCode == 200) {
          debug("Success");
        } else {
          debug("Not success: %s", e);
        }
        res.send(b);
      });
    });
    this.router.get("/render", function(req, res) {
      var viewPath = res.locals.pluginDir + "/" + path.relative(res.locals.pluginDir, self.viewsFolder);
      res.locals.app.render(viewPath + "/weaved", {layout: null}, function( err, html) {
        res.send(html);
      });
    });
    debug("[LoadRoutes] Finishing");
    return this.router;
  };
  this.registerScripts = function(pluginDir) {
    debug("[RegisterScripts] Starting");
    var files = [], fileList = [],
        filePath = path.join(path.basename(pluginDir), path.relative(pluginDir, this.scriptsFolder));
    try {
      fileList = fs.readdirSync(this.scriptsFolder);
    } catch(e) {
      debug("[RegisterScripts] Problem: %s", e);
    }
    files = fileList.map(function(file) {
      debug("[RegisterScripts] found file: %s", file);
      return path.join(filePath, file);
    });
    debug("[RegisterScripts] Finishing");
    return files;
  };
}

module.exports = Weaved;
