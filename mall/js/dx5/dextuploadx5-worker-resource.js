﻿/*
 * DEXTUploadX5 - resource web worker
 * http://www.dextsolution.com
 *
 * Copyright DEVPIA Inc.
 */
self.importScripts("dextuploadx5-common.js"); self.importScripts("json2.js"); self.onmessage = function (evt) { var lang = evt.data, resourceUrl = "res/dextuploadx5-svg-message" + (lang ? "-" + lang : "") + ".txt";     AJAX(resourceUrl, "get", { error: function (status, msg) { throw new Error(status + "\n" + msg); }, abort: function () { throw new Error("Aborted."); }, load: function (data) { self.postMessage(JSON.parse(data)); } }, "text", { nocache: new Date().getTime().toString(16) }, undefined, false, false); };
