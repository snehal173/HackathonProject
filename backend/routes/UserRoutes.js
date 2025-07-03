const express=require('express');
const {Router}=express;
const router=Router();
const {signup,login}=require('../controllers/UserController');

router.post('/signup',signup);
router.post('/login',login);

module.exports=router;