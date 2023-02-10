const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const { connection } = require("../config.db");

const getItems = (request, response) => {
    connection.query("SELECT * FROM items",
        (error, results) => {
            if (error)
                throw error;
            response.status(200).json(results);
        });
};

//ruta
app.route("/Items")
    .get(getItems);


const postAddItem = (request, response) => {
    const { name } = request.body;
    connection.query("INSERT INTO items(name) VALUES (?) ",
        [name],
        (error, results) => {
            if (error)
                throw error;
            response.status(201).json({ "Quehacer añadido con exito": results.affectedRows });
        });
};

//ruta
app.route("/addItem")
    .post(postAddItem);



const postEditItem = (request, response) => {
    const { id, state } = request.body;
    connection.query("update items set state=? where ID=?",
        [state, id],
        (error, results) => {
            if (error)
                throw error;
            response.status(201).json({ "Quehacer modificado con exito": results.affectedRows });
        });
};

//ruta
app.route("/editItem")
    .post(postEditItem);


const deleteItemSelected = (request, response) => {
    connection.query("Delete from items where state= 1",
        (error, results) => {
            if (error)
                throw error;
            response.status(201).json({ "Item eliminado": results.affectedRows });
        });
};

//ruta
app.route("/deleteItemSelected")
    .delete(deleteItemSelected);


const deleteAllItem = (request, response) => {
    connection.query("Delete from items",
        (error, results) => {
            if (error)
                throw error;
            response.status(201).json({ "Item eliminado": results.affectedRows });
        });
};

//ruta
app.route("/deleteAllItem")
    .delete(deleteAllItem);


module.exports = app; 