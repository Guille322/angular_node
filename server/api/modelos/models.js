const Validation = require('../validation');

class Models {

    static lastModelValidations = "";

    static mongoose = require('mongoose');

    static idType = Models.mongoose.Schema.Types.ObjectId;
    
    static models = [
        [
            "product", {
                name: {
                    type: String,
                    require: true,
                    default: "mesa",
                    validations: {
                        [Validation.type.range]: { min: 1, max: 10, message: "El nombre debe de medir entre $min y $max caractéres" },
                        [Validation.type.enum]: { values: ["sofa", "silla", "mesa"], message: "El nombre sólo puede tener los valores $values" }
                    }
                },
                quantity: {
                    type: Number,
                    require: true,
                    validations: {
                        [Validation.type.type]: { message: "La cantidad tiene que ser numérica" },
                        [Validation.type.min]: { value: 1, default: undefined, message: "El mínimo es $value" },
                        [Validation.type.max]: { value: 8, message: "El máximo es $value" }
                    }
                },
                price: {
                    type: Number,
                    require: true,
                    validations: {
                        [Validation.type.type]: { message: "El precio tiene que ser numérico" },
                        [Validation.type.notNull]: { message: "No puede ser nulo" },
                        [Validation.type.range]: { min: 0, max: 500, message: "El precio debe de estar entre $min y $max" }
                    }
                },
                email: {
                    type: String,
                    require: true,
                    validations: {
                        [Validation.type.type]: { message: "El correo tiene que ser una cadena" },
                        [Validation.type.email]: { message: "No es un correo electrónico válido" },
                    }
                },
                image: {
                    type: Models.idType,
                    ref: "image"
                }
            },
            "image", {
                data: {
                  type: Buffer,
                  required: true
                },
                contentType: {
                  type: String,
                  required: true
                },
                name: {
                  type: String,
                  required: true
                }
            }
        ]
    ]

    static getMongooseModel(name) {
        const model = this.models.find(model => model[0] === name);
        if (!model) {
            return null;
        }

        const schema = {};
        Object.entries(model[1]).forEach(([key, value]) => {
            const { type, require, ref } = value;
            schema[key] = { type, require: require ?? false };
            if (value.hasOwnProperty("ref")) {
                schema[key].ref = ref;
            }
        });
        return schema;
    }

    static getValidations(name, column = null) {
        if (column === null) {
            column = name;
            name = Models.lastModelValidations;
        } else {
            Models.lastModelValidations = name;
        }
   
        const data = [column, {}];
        const model = this.models.find(model => model[0] === name);
        if (!model) {
            return data;
        }

        const columnData = model[1][column];
        
        if (!columnData || !columnData.validations) {
            return data;
        }
        

        const keys = Object.keys(columnData.validations);
        keys.forEach((key) => {
            const validation = columnData.validations[key];
            if (key === Validation.type.type && !validation.hasOwnProperty("value")) {
                console.log(columnData.type)
                validation.value = columnData.type;
            }
            if (columnData.hasOwnProperty("default") && columnData.default !== undefined && !validation.hasOwnProperty("default")) {
                validation.default = columnData.default;
            }
        });
          
        // si columnData tiene seteado un default value, entonces le tiene que añadir a cada validacion del array,
        // la propiedad default con su respectivo valor
        //console.log([column, columnData.validations]);
        return [column, columnData.validations];
    }

}

module.exports = Models