"use strict";

const api = require("./api");

(async () => {
  const concurrentAsync = [];
  concurrentAsync.push(new Promise(
    (async resolve => resolve(console.log("unsafeGetOne: " + await api.unsafeGetOne())))
  ));
  concurrentAsync.push(new Promise(
    (async resolve => resolve(console.log("unsafeGetTwo: " + await api.unsafeGetTwo())))
  ));
  await Promise.all(concurrentAsync);
})();
