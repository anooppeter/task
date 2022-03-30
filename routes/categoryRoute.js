const express = require("express");
const router = express.Router();
const {addCategory , getCategories } = require('../controller/categoryController')
//const Category = require("../model/category");
router.get('/category',(req, res)=>{
    res.render('index')
})
router.post("/category/createcategory",addCategory);

router.get("/category/list", getCategories);


//router.get("/category/getmaincategory", getMainCategory);

module.exports = router;
