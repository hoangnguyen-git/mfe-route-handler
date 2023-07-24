const express = require("express");
const bodyParser = require("body-parser");
const proxy = require("express-http-proxy");

const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.disable("x-powered-by");
server.use(bodyParser.json());

// var layoutServer = "http://localhost:8080",
//   catalogServer = "http://localhost:8081",
//   cartServer = "http://localhost:8082",
//   reviewServer = "http://localhost:8083";
//   userServer = "http://localhost:8084";
var layoutServer = "https://layout-mfe-demo-dev.netlify.app",
  catalogServer = "https://catalog-mfe-demo-dev.netlify.app",
  cartServer = "https://cart-mfe-demo-dev.netlify.app",
  reviewServer = "https://reviews-mfe-demo-dev.netlify.app";
  userServer = "http://localhost:8084";

function match(domain) {
  return proxy(domain, {
    proxyReqPathResolver(req) {
      console.log(`${domain}${req.url}`);
      return `${domain}${req.url}`;
    }
  });
}

const port = process.env.PORT || 3000;

server.use("/layout", match(layoutServer));

server.use("/cart", match(cartServer));

server.use("/products", match(catalogServer));

server.use("/reviews", match(reviewServer));

server.use("/login", match(userServer));

server.use("/register", match(userServer));

server.use("/", match(layoutServer));

server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:3000`);
});