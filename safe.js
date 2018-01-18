"use strict";

const api = require("./api");

(async () => {
  const concurrentAsync = [];
  concurrentAsync.push(new Promise(
    (async resolve => resolve(console.log("safeGetOne: " + await api.safeGetOne())))
  ));
  concurrentAsync.push(new Promise(
    (async resolve => resolve(console.log("safeGetTwo: " + await api.safeGetTwo())))
  ));
  await Promise.all(concurrentAsync);
})();
