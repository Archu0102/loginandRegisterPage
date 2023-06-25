const bcrypt = require("bcrypt");
const User=require('../model/usermodal')

module.exports.userRegister =async (req,res,next)=>{
    // console.log("register controller")
//   res.send("register controller");
try {
  const { username, email, password } = req.body;
  const usernameCheck = await User.findOne({ username });
  if (usernameCheck)
  return res.json({ msg: "Username already used", status: false });
  const emailCheck = await User.findOne({ email });
  if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
      const hashedPassword = await bcrypt.hash(password, 10);//salt value 10 type of encryption
      const user = await User.create({
        email,
      username,
      // password,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
  
};

module.exports.userLogin = async(req,res,next)=>{
  //   console.log("login controller")
  // res.send("login controller");
  // console.log("i am at line 27")
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
    return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
module.exports.getUsers = async(req,res,next)=>{
  
  try {
    const user = await User.find();
    if (!user)
     return res.json({ msg: "No any users in database", status: false });
    return res.json({ status: true,msg:'mil gya re user',user });
    // return res.status(200).json(user)
    // return res.status(200).json({'user':user})
  } catch (ex) {
    next(ex);
  }
};