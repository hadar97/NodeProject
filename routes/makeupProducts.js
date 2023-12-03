const express= require("express");
const {auth, authAdmin} = require("../middlewares/auth");
const {MakeupModel,validateMakeup} = require("../models/makeupModel")
const router = express.Router();



router.get("/" , async(req,res)=> {
  let perPage = Math.min(req.query.perPage,20) || 10;
  let page = req.query.page || 1;
  let sort = req.query.sort || "_id";
  let reverse = req.query.reverse == "yes" ? -1 : 1;
  try{
    let data = await MakeupModel
    .find({})
    .limit(perPage)
    .skip((page - 1)*perPage)
    .sort({[sort]:reverse})
    res.json(data);
  } 
  catch(err){
    console.log(err)
    res.status(500).json({msg:"err",err})
  }

})
router.post("/", auth, async(req,res) => {
  let valdiateBody = validateMakeup(req.body);
  if(valdiateBody.error){
    return res.status(400).json(valdiateBody.error.details)
  }
  try{
    let makeupProd = new MakeupModel(req.body);
    makeupProd.user_id = req.tokenData._id;
    await makeupProd.save();
    res.status(201).json(makeupProd)
  }
  catch(err){
    console.log(err)
    res.status(500).json({msg:"err",err})
  }
})
router.put("/:idEdit",auth, async(req,res) => {
  let valdiateBody = validateMakeup(req.body);
  if(valdiateBody.error){
    return res.status(400).json(valdiateBody.error.details)
  }
  try{
    let idEdit = req.params.idEdit
    let  data
    if(req.tokenData.role=="admin"){
       data = await MakeupModel.updateOne({_id:idEdit},req.body)
    }
    else { data = await MakeupModel.updateOne({_id:idEdit,user_id:req.tokenData._id},req.body)}
    if(data.modifiedCount==1)
    res.json(data);
  else res.json({msg:"this is not your product!!"})
  }
  catch(err){
    console.log(err)
    res.status(500).json({msg:"err",err})
  }
})
router.delete("/:Delid",auth, async(req,res) => {
  try{
    let data
    let idDel = req.params.Delid
    if(req.tokenData.role=="admin")
    {
      data = await MakeupModel.deleteOne({_id:idDel},req.body)
    }
    else{ data = await MakeupModel.deleteOne({_id:idDel,user_id:req.tokenData._id})}
    if(data.deletedCount==1)
    res.json(data);
  else
  res.json({msg:"this is not your product!"});
  }
  
  catch(err){
    console.log(err)
    res.status(500).json({msg:"err",err})
  }
})
router.get("/search",async(req,res) => {
  try{
    let queryS = req.query.s;
    let searchReg = new RegExp(queryS,"i")
    let data = await MakeupModel.find({name:searchReg})
    .limit(10)
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg:"there error try again later",err})
  }
})
router.get("/category/:catName",async(req,res) => {
  try{
    let perPage =  10;
    let page =req.query.page ||  1;
    let catName = req.params.catName;
    let catNameREG = new RegExp(catName,"i")
    let data = await MakeupModel.find({category:catNameREG})
    .limit(10)
    .skip((page - 1)*perPage)
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg:"there error try again later",err})
  }
})
router.get("/price",async(req,res) => {
  try{
    let perPage =  10;
    let page = req.query.page || 1;
    let max = req.query.max || 500;
    let min = req.query.min || 0;
    let data = await MakeupModel.find({})
    data=data.filter(product => product.price >= min && product.price <= max);
     data=data.slice((page - 1) * perPage, page * perPage);
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg:"there error try again later",err})
  }
})
router.get("/single/:id",async(req,res) => {
  try{
    let idSingle=req.params.id 
    let data = await MakeupModel.find({_id:idSingle})
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg:"there error try again later",err})
  }
})
module.exports = router;