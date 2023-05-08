class DAO {

    mongoose = require('mongoose');

    product = require('./modelos/Producto');

    image = require('./modelos/Imagen');

    constructor() {
      const URL_CONNECT = this.getURLConexionMongo();        
      this.mongoose.connect(URL_CONNECT).then(() => {
        console.log("conectado a mongo");
      }).catch(error => {
        console.error("fallo al conectar con mongo ", error)
      })
    }

    getURLConexionMongo = () => {
      require('dotenv').config();
      const user = process.env.USER;
      const password = process.env.PASSWORD;
      const clouster_name = process.env.CLUSTER_NAME;
      return `mongodb+srv://${user}:${password}@nodeapi.pr4qp8k.mongodb.net/${clouster_name}?retryWrites=true&w=majority`;
    }

    createImage = async (data, contentType, name) => {
      const image = new Image({
        data,
        contentType,
        name
      });
      return await image.save();
    }

    idIsValid = (id) => {
      return id !== undefined && id !== null && this.mongoose.Types.ObjectId.isValid(id);
    }

    getAllProducts = async () => {
      return await this.product.find({});
    }

    createProduct = async (p) => {
      return await this.product.create(p);
    }

    findByIdProduct = async (id) => {
      return await this.product.findById(id);
    }

    findByIdAndDeleteProduct = async (id) => {
      return await this.product.findByIdAndDelete(id);
    }

    findByIdAndUpdateProduct = async (id, p) => {
      return await this.product.findByIdAndUpdate(id, p);
    }

}
module.exports = DAO;