const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const Models = require('./models');

const nameModel = "product";

const productSchema = mongoose.Schema(
    Models.getMongooseModel(nameModel),
    {
        timestamps: true
    }
)

module.exports = mongoose.model(nameModel, productSchema)