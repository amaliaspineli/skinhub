const { onRequest } = require("firebase-functions/v2/https");
const functions = require("firebase-functions");
const express = require("express");

const app = express();

// Importa o SSR do Angular
const angularServer = require("../dist/skinhub/server/server.mjs");

app.use((req, res) => {
    angularServer.app(req, res);
});

exports.ssr = onRequest(
    { region: "us-central1", timeoutSeconds: 30, memory: "512MB" },
    app
);
