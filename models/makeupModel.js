const mongoose = require("mongoose");
const Joi = require("joi");

const makeupSchema = new mongoose.Schema({
  name:String,
  price:Number,
  model:String,
  brand:String,
  category:String,
  date:{
    type:Date, default:Date.now()
  },
  user_id:String
})

exports.MakeupModel = mongoose.model("makeupproducts",makeupSchema);

exports.validateMakeup = (_reqBody) => {
  let schemaJoi = Joi.object({
    name:Joi.string().min(2).max(99).required(),
    price:Joi.number().min(2).max(100000).required(),
    model:Joi.string().min(2).max(3000000).required(),
    brand:Joi.string().min(2).max(1000).required(),
    category:Joi.string().min(2).max(300000).required()
  })
  return schemaJoi.validate(_reqBody)
}
