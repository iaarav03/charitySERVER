const express=require('express')
const app=express()
const router=express.Router()
const {register, login,getuser,verifyuser,updateuser,getotp,verifyotp, donation, getdonation}=require('./function')
const bcrypt=require('bcrypt')
const localvariable=require('./localvariable')
const Auth=require('./middleAuth')
const {registermail}=require('./nodemailer')


router.route('/register').post(register)
router.route('/login').post(verifyuser,login)
router.route('/registermail').post(registermail)
router.route('/donation').post(donation)

router.route('/user/:username').get(getuser)
router.route('/getotp').get(verifyuser,localvariable,getotp)
router.route('/verifyotp').get(verifyotp)
router.route('/getdonation').get(getdonation)

router.route('/update').put(Auth,updateuser)


module.exports=router