const mongoose = require('mongoose');

const dbConection = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_CNN);

        console.log("conexion correcta");

    } catch(err) {
        console.log(err);
        throw new Error('Error al ahora de iniciar la base de datos');
    }
}


module.exports = {
    dbConection,
}