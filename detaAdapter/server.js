/**
 * @remix-run/express v1.6.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
/*
var { Deta } = require("deta");
var deta = Deta('c0d13zay_YrZ2SkRGrdvwmPKFBQ4xaxKRDdDYk4EX')
var remixCache = deta.Base("remixCache")
const isBinaryType  = require("./binaryTypes");
*/
var node = require('@remix-run/node');

/**
 * A function that returns the value to use as `context` in route `loader` and
 * `action` functions.
 *
 * You can think of this as an escape hatch that allows you to pass
 * environment/platform-specific values through to your loader/action, such as
 * values that are generated by Express middleware like `req.session`.
 */

/**
 * Returns a request handler for Express that serves the response using Remix.
 */
function createRequestHandler({
  build,
  getLoadContext,
  mode = process.env.NODE_ENV
}) {
  let handleRequest = node.createRequestHandler(build, mode);
  return async (req, res, next) => {
    try {
      let request = createRemixRequest(req);
      let loadContext = getLoadContext === null || getLoadContext === void 0 ? void 0 : getLoadContext(req, res);
      let response = await handleRequest(request, loadContext);
      await sendRemixResponse(res, response);
    } catch (error) {
      // Express doesn't support async functions, so we have to pass along the
      // error manually using next().
      next(error);
    }
  };
}
function createRemixHeaders(requestHeaders) {
  let headers = new node.Headers();

  for (let [key, values] of Object.entries(requestHeaders)) {
    if (values) {
      if (Array.isArray(values)) {
        for (let value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  return headers;
}
let reqUrl;
function createRemixRequest(req) {
  let origin = `${req.protocol}://${req.get("host")}`;
  let url = new URL(req.url, origin);
  reqUrl = url.href
  let controller = new node.AbortController();
  req.on("close", () => {
    controller.abort();
  });
  let init = {
    method: req.method,
    headers: createRemixHeaders(req.headers),
    signal: controller.signal
  };
 
  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req;
  }

  return new node.Request(url.href, init);
}
async function sendRemixResponse(res, nodeResponse) {
  // console.log(reqUrl)
  /*
   try {
     const body = await remixCache.get(reqUrl)
     if (body) {
     //  console.log(body)
       if (!body.headers["cache-control"]) {
     console.log("no cache-control")
     
     res.append("cache-control", "no-store");
   }
    for (let [key, values] of Object.entries(body.headers)) {
    for (let value of values) {
      res.append(key, value);
    }
  }
  
     res.send(body.body)
     return
     }
    
   } catch (e) {
     console.log(e)
   }
    
  */
   
  res.statusMessage = nodeResponse.statusText;
  res.status(nodeResponse.status);
  
  const allHeader = nodeResponse.headers.raw()
   if (!allHeader["cache-control"]) {
     //console.log("no cache-control")
     allHeader["cache-control"] = ["no-store"]
   }
  for (let [key, values] of Object.entries(allHeader)) {
    for (let value of values) {
      res.append(key, value);
    }
  }

 
  if (nodeResponse.body) {
  /*
    if (isBase64Encoded) {
      body = await readableStreamToString(nodeResponse.body, "base64");
    } else {
      body = await nodeResponse.text();
    }
    
  }
//   console.log(body)
    
    try {
      await remixCache.put(
        {
          body:body,
          headers:nodeResponse.headers.raw()
        },
        reqUrl,
        {expireIn: 10}
      )
    } catch (e) {
      console.log(e)
    }
   
   res.send(body)
   */
   await node.writeReadableStreamToWritable(nodeResponse.body, res);

   
  } else {
    res.end();
  }
}

exports.createRemixHeaders = createRemixHeaders;
exports.createRemixRequest = createRemixRequest;
exports.createRequestHandler = createRequestHandler;
exports.sendRemixResponse = sendRemixResponse;
