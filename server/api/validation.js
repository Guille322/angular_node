const  StatusCodes = require('http-status-codes').StatusCodes;

class Validation {

    static type = {
        type: 'type',
        min: 'min',
        max: 'max',
        range: 'range',
        enum: 'enum',
        notNull: 'notNull',
        regularExpression: 'rExpr',
        email: 'email'
    };

    dao = null

    constructor(dao) {
        this.dao = dao;
    }

    validateIdParam(message) {
      return (req, res, next) => {
        const { id } = req.params;
        if (!this.dao.idIsValid(id)) {
          return res.status(StatusCodes.NOT_FOUND).json({ message: message });
        }
        next();
      };
    }

    valid(...properties) {   
        const statusValidationFailed = StatusCodes.BAD_REQUEST;
        return (req, res, next) => {
          const validationFailed = (ruleValue, valuesToReplace, property) => {
            if (ruleValue.hasOwnProperty("default") && ruleValue.default !== undefined) {
              const value = req.body[property[0]];
              const clonedBody = req.body;
              clonedBody[property[0]] = ruleValue.default;
              req.body = clonedBody;
              return null;
            } else {
              valuesToReplace.forEach(value => {
                const value2 = Array.isArray(ruleValue[value]) ? "$(" + ruleValue[value] + ")" : ruleValue[value];
                ruleValue.message = ruleValue.message.replace("$" + value, value2);
              });
              return res
                .status(statusValidationFailed)
                .json({ message: ruleValue.message });
            }
          }
          for (const property of properties) {
            const value = req.body[property[0]];
            const rules = property[1];
            let value_aux, val;
            for (const rule in rules) {
              const ruleValue = rules[rule];
              switch (rule) {
                case Validation.type.type:
                  const typeColumn = ruleValue.value.name.toLowerCase();
                  const typeValue = (typeof value).toLowerCase();
                  let auxValidationFailed = typeColumn !== typeValue;
                  if (typeColumn === "number" && typeValue === "string" && /^[0-9]+([,.][0-9]+)?$/.test(value.toString())) {
                    req.body[property[0]] = parseFloat(value.replace(",","."));
                    auxValidationFailed = false;
                  }
                  if (auxValidationFailed) {
                    val = validationFailed(ruleValue, ["value"], property);
                    if (val !== null) {
                      return val;
                    }
                  }
                  break;
                case Validation.type.min:
                  value_aux = typeof value === "string" ? value.length : value;
                  if (value_aux < ruleValue.value) {
                    val = validationFailed(ruleValue, ["value"], property);
                    if (val !== null) {
                      return val;
                    }
                  } 
                  break;
                case Validation.type.max:
                  value_aux = typeof value === "string" ? value.length : value;
                  if (value_aux > ruleValue.value) {
                    val = validationFailed(ruleValue, ["value"], property);
                    if (val !== null) {
                      return val;
                    }
                  }
                  break;
                case Validation.type.range:
                  value_aux = typeof value === "string" ? value.length : value;
                  if (value_aux < ruleValue.min || value_aux > ruleValue.max) {
                    val = validationFailed(ruleValue, ["min", "max"], property);
                    if (val !== null) {
                      return val;
                    }
                  }
                  break;
                case Validation.type.enum:
                  if (!ruleValue.values.includes(value)) {
                    val = validationFailed(ruleValue, ["values"], property);
                    if (val !== null) {
                      return val;
                    }
                  }
                  break;
                case Validation.type.notNull:
                  if (value === null || value === undefined || value.toString().trim() === "") {
                    val = validationFailed(ruleValue, [], property);
                    if (val !== null) {
                      return val;
                    }
                  }
                  break;
                case Validation.type.regularExpression:
                  if (!(ruleValue.value.test(value))) {
                    val = validationFailed(ruleValue, ["value"], property);
                    if (val !== null) {
                      return val;
                    }
                  }
                  break;
                case Validation.type.email:
                    if (!(/^[a-zA-Z0-9~¨_\-\.]+@[a-zA-Z0-9~¨_\-\.]{4,255}\.[a-zA-Z0-9~¨_\-\.]{2,63}$/gm.test(value))) {
                      val = validationFailed(ruleValue, [], property);
                      if (val !== null) {
                        return val;
                      }
                    }
                    break;
                default:
                  // Si la regla no está soportada, puedes simplemente ignorarla
                  break;
              }
            }
          }
          next();
        };
      }

}


module.exports = Validation;