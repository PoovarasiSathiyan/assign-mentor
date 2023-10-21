const mongoose = require('mongoose')
const DB = require('../common/dbConfig')

try{
    mongoose.connect(`${DB.dbUrl}/${DB.dbName}`)
    console.log("Database Connected Sucessfully")
    }
catch (error) {
    console.log(error)
}

module.exports=mongoose