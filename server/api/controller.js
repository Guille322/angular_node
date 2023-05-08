const express = require('express');
const { Router } = express;
const app = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require("path");

const  StatusCodes = require('http-status-codes').StatusCodes;
require('dotenv').config();

const URL_CLIENT = process.env.URL_CLIENT || "http://localhost:4200";
const URL_SERVER = process.env.URL_SERVER || "http://localhost:3000";
const SECRET_KEY = '9hks31bso22ADFO2d';

const DAO = require('./dao');
const Validation = require('./validation');
const Models = require('./modelos/models');

const dao = new DAO();
const validation = new Validation(dao);

const cors = require('cors');
app.use(cors());
app.use(express.static(path.join(__dirname, 'upload')))

function auth(req, res, next) {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1].toString();
  
    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token de autorización no válido' });
    }
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Acceso no autorizado' });
    }
  }

  app.get('/products', auth, async (req, res) => {
    try {
      const ps = await dao.getAllProducts();
      res.status(StatusCodes.OK).json(ps)
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: e.message })
    }
  })

  const tryCatch = (funcion) => {
    return async (req, res) => {
      try {
        await funcion(req, res);
      } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Error: " + e.message });
      }
    }
  }
  
  app.post('/product', auth, validation.valid(
    Models.getValidations("product", "quantity"),
    Models.getValidations("price"), 
    Models.getValidations("name"),
    ["email", {[Validation.type.notNull]: { message: "No puede ser nulo el correo" }}],
    Models.getValidations("email"),
  ), tryCatch(async (req, res) => {
      const p = await dao.createProduct(req.body);
      res.status(StatusCodes.OK).json(p);
  }));
  const storage = require('./filesManager')
  const multer = require('multer')

  const uploader = multer({
    storage
    }).single('file');

  app.post('/upload', validation.valid(
    ["file", {[Validation.type.notNull]: { message: "No puede ser nulo el archivo" }}],
    ["body", {[Validation.type.notNull]: { message: "No puede ser nulo el body" }}]
    ), uploader, tryCatch(async (req, res) => {
      const { body, file} = req;
      let fileName = body.name, fileUrl = `${URL_SERVER}/${file.filename}`;
  }));


  // https://www.youtube.com/watch?v=BxueeHszCAA
  app.delete('/product/:id', auth, validation.validateIdParam, async (req, res) => {
    try {
      const {id} = req.params;
      const p = await dao.findByIdAndDeleteProduct(id);
      if (!p) {
        return res.status(StatusCodes.NOT_FOUND).json({message: "No se pudo encontrar"})
      }
      return res.status(StatusCodes.OK).json(p)
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: e.message })
    }
  })
  
  app.put('/product/:id', auth, validation.validateIdParam, async (req, res) => {
    try {
      const {id} = req.params;
      const p = await dao.findByIdAndUpdateProduct(id, req.body);
      if (!p) {
        return res.status(StatusCodes.NOT_FOUND).json({message: "No se pudo encontrar"})
      }
      const puupdt = await dao.findByIdProduct(id)
      return res.status(StatusCodes.OK).json(puupdt)
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: e.message })
    }
  })
  
  app.get('/product/:id', auth, validation.validateIdParam, async (req, res) => {
    try {
      const {id} = req.params;
      const p = await dao.findByIdProduct(id)
      res.status(StatusCodes.OK).json(p)
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: e.message })
    }
  })
  
  // https://youtu.be/L7AFwNrnHeY?t=1329
  
  app.get('/', (req, res) => {
    res.send('hello 1');
  });

  app.post('/login', (req, res) => {
  
    if (!req.body || !req.body.username || !req.body.password) {
   
      return res.status(StatusCodes.BAD_REQUEST).json(
          {
            message: 'El nombre de usuario y la contraseña son obligatorios'
          }
      );
    }
    const { username, password } = req.body;
    
    // Verificar las credenciales del usuario
    if (username !== 'root' || password !== '123456') {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Credenciales no válidas' });
    }
    
    // Generar un token de acceso con JWT
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  
    // Enviar el token de acceso al cliente
    res.set('Access-Control-Allow-Origin', URL_CLIENT);
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
    return res.json({ token });
  });
  
  
  app.get('/protegido', auth, (req, res) => {
    return res.status(StatusCodes.OK).json({ message: 'Acceso permitido' });
  });

  //app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', URL_CLIENT);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization'); // agregamos authorization aquí
    next();
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Ha ocurrido un error en el servidor" });
  });


  

module.exports = app;