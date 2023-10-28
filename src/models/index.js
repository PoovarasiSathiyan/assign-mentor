const mongoose = require('mongoose')


try{
    mongoose.connect(`${process.env.dbUrl}/${process.env.dbName}`)
    console.log("Database Connected Sucessfully")
    }
catch (error) {
    console.log(error)
}

module.exports=mongoose