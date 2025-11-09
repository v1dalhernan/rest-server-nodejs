const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config.js');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        //Conectar a base de datosf
        this.conectarDB();

        //Middleware
        this.middlewares();


        //routas de la aplicacion
        this.routers();
    }


    async conectarDB() {
        await dbConection();
    }

    middlewares() {

        //cors
        this.app.use(cors());

        //lectura y parseo del body 
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));
    }



    

    routers() {
        this.app.use(this.usuariosPath, require('../routes/user'));
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        });
    }
}


module.exports = Server;