'use strict';

import socket from 'socket.io';
import mongoose from 'mongoose';
import Message from './models/message';

const PORT = process.env.NODE_PORT || 8080;

mongoose.connection.on('connected', () => {

    let io = socket(PORT);
    console.log(`🌏  Server start on port ${PORT}`);
    console.log('📦  Mongoose connection open');

    io.on('connection', socket => {
        // On stock les données du client dans la socket
        socket._user = { username: socket.handshake.query.username };

        Message.find().exec().then(messages => {
            // Lorsqu'un utilisateur se connecte, on lui envoie tous les messages
            // depuis la base de données
            socket.emit('chat.connected', messages);
        });

        socket.on('chat.send_message', content => {
            let message = new Message();
            message.username = socket._user.username;
            message.content = content;
            message.save();

            io.emit('chat.receive_message', message);
        });
    });
});

mongoose.connection.on('error', console.error);
mongoose.connect('mongodb://admin:admin@ds021691.mlab.com:21691/tchat');
// Permet d'utiliser les promise native avec mongoose
mongoose.Promise = global.Promise;
