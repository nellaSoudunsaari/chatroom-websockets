const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const PORT = 8080;
const server = http.createServer(express);
const wsServer = new WebSocket.Server({server});

server.listen (PORT, function() {
    console.log("Server is listening on " + PORT);
})

wsServer.on('connection', function connection(ws){
    console.log("Asiakas otti yhteyden");

    ws.on('message', function incoming(data) {
        console.log(`Saatiin asiakkaalta viesti: ${data}`);

        wsServer.clients.forEach(function each(client){
            if (client !== ws && client.readyState === WebSocket.OPEN){
                client.send(data.toString());
            }
        })
    })
})