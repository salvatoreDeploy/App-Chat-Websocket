import express, { request, response } from "express";

const app = express();

app.get("/", (request, response) => {
    /* return response.send("Olá NLW 05"); */
    return response.json({
        message: "Olá NLW 05",
    });
});

app.post("/", (request, response) => {
    return response.json({
        message: "Usuario salvo com sucesso",
    })
})

app.listen(3333, () => console.log("Servidor rodando na porta 3333"));