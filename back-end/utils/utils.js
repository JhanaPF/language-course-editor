const mongoose = require('mongoose')


const isIdValid = (id) => {
    return mongoose.Types.ObjectId.isValid(id)
}

module.exports={isIdValid}