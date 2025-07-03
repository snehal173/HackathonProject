const express=require('express');
const {Router}=express;
const router=Router();
const {signup,login}=require('../controllers/OrgController');

router.post('/signup',signup);
router.post('/login',login);

module.exports=router;