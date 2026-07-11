import {Server} from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
import { createCorsOptions } from "../config/corsOptions.js";

dotenv.config({});

const app = express();

const server = http.createServer(app);
const corsOptions = createCorsOptions();

const io = new Server(server, {
    cors: corsOptions,
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

const userSocketMap = {}; // {userId->socketId}


io.on('connection', (socket)=>{
    const userId = socket.handshake.query.userId
    if(userId !== undefined){
        userSocketMap[userId] = socket.id;
    } 

    io.emit('getOnlineUsers',Object.keys(userSocketMap));

    socket.on('disconnect', ()=>{
        delete userSocketMap[userId];
        io.emit('getOnlineUsers',Object.keys(userSocketMap));
    })

})

export {app, io, server};

