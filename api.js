"use strict";

async function timeout(ms) {
  return new Promise((resolve => setTimeout(() => resolve(), ms)));
}

let connection = undefined;
let connectionSemaphore = false;
let connectionCounter = 0;

async function unsafeAsyncConnectionEstablish() {
  if (!connection) {
    await timeout(2000);
    connectionCounter++;
    console.log("Connection establish, connectionCounter = " + connectionCounter);
    connection = {
      getOne: () => 1,
      getTwo: () => 2,
    };
  }
}

async function safeAsyncConnectionEstablish() {
  if (!connectionSemaphore && !connection) {
    connectionSemaphore = true;
    await timeout(2000);
    connectionCounter++;
    console.log("Connection establish, connectionCounter = " + connectionCounter);
    connection = {
      getOne: () => 1,
      getTwo: () => 2,
    };
    connectionSemaphore = false;
  } else if (!connection) {
    await timeout(500);
    return safeAsyncConnectionEstablish();
  }
}

const api = {
  unsafeGetOne: async () => {
    await unsafeAsyncConnectionEstablish();
    return connection.getOne();
  },

  unsafeGetTwo: async () => {
    await unsafeAsyncConnectionEstablish();
    return connection.getOne();
  },

  safeGetOne: async () => {
    await safeAsyncConnectionEstablish();
    return connection.getOne();
  },

  safeGetTwo: async () => {
    await safeAsyncConnectionEstablish();
    return connection.getOne();
  }
};

module.exports = api;
