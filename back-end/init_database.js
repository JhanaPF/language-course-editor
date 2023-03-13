const mongoose = require('mongoose');
const {user} = require('./schemas/schemas.js')
require('dotenv').config()
const isProduction = process.env.NODE_ENV === 'production' 


mongoose.connect(isProduction ? process.env.DATABASE : 'mongodb://localhost:27017/dictionnaries', { useNewUrlParser: true,  useUnifiedTopology: true });
db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
    console.log("Connecté à Mongoose");

    const addAdmin = new Promise((resolve, reject) => {
 
        const admin = {
            name: "admin",
            mail: "admin@gmail.com",
            password: "$2a$12$sElZzYlhPZjAxk7XGLrx2ubXBhhgZ4Zu3p0Pp/xPpdiJFF5HRtaIS", // Azerty-1234
            role: 'admin',
        }

        const newAdmin = new user(admin)
        newAdmin.save()
        .then(() => resolve("Admin persisted"))
        .catch((err) => reject(err))
    });

    addAdmin
    .then((value) => {
        console.log(value)
        process.exit()
    })
    .catch((error) => {
        console.log("didn't persist admin, probably already exists")
        console.log(error)
        process.exit(1)
    })
})