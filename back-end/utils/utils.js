import mongoose from "mongoose"


export const isIdValid = (id) => {
    return mongoose.Types.ObjectId.isValid(id)
}