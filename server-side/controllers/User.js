const {insert , list , loginUser , UniqueEmail} = require("../services/User");
const httpStatus = require("http-status");
const { passwordToHash } = require("../utils/helper");

const create = async (req,res) =>
{
  try {
    const usermail = req.body.email;
    const existUser = await UniqueEmail(usermail);
    console.log(existUser);
    if(existUser) {
      throw new Error("User with that email already exists.")
    }
    req.body.password = passwordToHash(req.body.password);
    response = await insert(req.body);
    res.status(httpStatus.CREATED).send(response);
  } catch (error) {
      console.log(error)
    res.status(httpStatus.BAD_REQUEST).send(error.message)
  }
       
}
 
    


module.exports = {
    create,
}