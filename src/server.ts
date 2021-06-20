import express, { request, response } from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path";

import "./database/";
import { routes } from './routes';

import { http } from './http';
import "./websocket/client";

/* const app = express(); */

/* Montando a view via node: */
/* app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html"); */

/* app.get("/pages/client", (request, response) => {
    return response.render("html/client.html")
}) */
/* Fim */

/* const http = createServer(app); //Criando o protocolo http
const io = new Server(http);//Criando o protocolo websocket
 */
/* app.get("/", (request, response) => {
    /* return response.send("Olá NLW 05"); */
    /* return response.json({
        message: "Olá NLW 05",
    });
});  */

/* app.post("/", (request, response) => {
    return response.json({
        message: "Usuario salvo com sucesso",
    })
}) */

/* io.on("connection", (socket: Socket) => {
    console.log("Se conectou", socket.id);
});

app.use(express.json());

app.use(routes); */

/* app.listen(3333, () => console.log("Servidor rodando na porta 3333")); */
http.listen(3333, () => console.log("Servidor rodando na porta 3333"));