const { insert, loginUser, UniqueEmail, updateUser, getAll, deleteUser, getOne, deleteUsers } = require("../services/User");
const httpStatus = require("http-status");
const fs = require("fs");
const {
  passwordToHash,
  generateAccesToken,
  generateRefreshToken,
  verifyToken
} = require("../utils/helper");
const { BAD_REQUEST } = require("http-status");

const create = async (req, res) => {
  try {
    const usermail = req.body.email;
    const existUser = await UniqueEmail(usermail);
    if (existUser) {
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
const login = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  loginUser(req.body).then((user) => {
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({
          message:
            "Account Not Found. Please check your account details Or Register.",
        });
    }

    fs.readFile(`./uploads/profiles/${user.img}`, `base64`, (err, fileData) => {
      user.img = fileData
      user = {
        ...user.toObject(),
        tokens: {
          access_token: generateAccesToken(user),
          refresh_token: generateRefreshToken(user),
        },
      };

      res.status(httpStatus.OK).send(user);
    })
  });
}

const changeImg = async (req, res) => {
  const auth = verifyToken(req.headers.authorization);
  if (auth.accessLevel > process.env.ACCESS_LEVEL_GUEST) {
    const user = await UniqueEmail(req.body.email)
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({
          message:
            "Account Not Found",
        });
    } else {
      if (!req.file) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({
            message: "No file was selected to be uploaded"
          }
          )
      } else if (req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg") {
        fs.unlink(`./uploads/profiles/${req.file.filename}`, (err) => {
          res.status(BAD_REQUEST).send({ message: `Only .png, .jpg and .jpeg format accepted` })
        })
      } else {
        const fileName = req.file.filename
        if (user.img !== '') {
          fs.unlinkSync(`./uploads/profiles/${user.img}`)
          user.img = ''
        }
        user.img = fileName
        response = await updateUser({ email: req.body.email }, user)
        fs.readFile(`./uploads/profiles/${user.img}`, `base64`, (err, fileData) => {
          res.status(httpStatus.OK).send(fileData)
        })
      }
    }
  } else {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({
        message:
          "User is not logged in",
      });
  }
}

const changePassword = async (req, res) => {
  const auth = verifyToken(req.headers.authorization)
  if (auth.accessLevel > process.env.ACCESS_LEVEL_GUEST) {
    const user = await UniqueEmail(req.body.email)
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({
          message:
            "Account Not Found",
        });
    } else if (user.password !== passwordToHash(req.body.password)) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .send({
          message:
            "Incorrect password",
        });
    } else {
      user.password = passwordToHash(req.body.newPassword)
      await updateUser({ email: req.body.email }, user)
      res.status(httpStatus.OK).send({ message: `Password changed` });
    }
  } else {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({
        message:
          "User is not logged in",
      });
  }

}

const getUserByEmail = async (req, res) =>{
  email = req.param('email')
  
  const auth = verifyToken(req.headers.authorization)
  if(auth.accessLevel > process.env.ACCESS_LEVEL_GUEST){
    const user = await UniqueEmail(email)
    console.log(user._id)
      if(!user) {
       return res
        .status(httpStatus.UNAUTHORIZED)
        .send({
          message: "Account Not Found"
        });
     }
      else{
       res.status(httpStatus.OK).send(user)
     
      }
    }

    else{
      return res
    .status(httpStatus.UNAUTHORIZED)
    .send({
      message:
        "User is not logged in",
    });
    }
  }


  const getAllUsers = async (req, res) => {
    const auth = verifyToken(req.headers.authorization)
    if (auth.accessLevel < process.env.ACCESS_LEVEL_ADMIN) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .send({
          message:
            "You don't have access to this feature.",
        });
    } else {
      users = await getAll()
      return res
        .status(httpStatus.OK)
        .send(users)
    }
  }
  
  const deleteUserById = async (req, res) => {
    const auth = verifyToken(req.headers.authorization)
    if (auth.accessLevel < process.env.ACCESS_LEVEL_ADMIN) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .send({
          message:
            "You don't have access to this feature.",
        });
    } else {
      id = req.params.id
      user = await getOne(id)
      if (user.img !== '') {
        fs.unlinkSync(`./uploads/profiles/${user.img}`)
      }
      await deleteUser(id)
      return res
        .status(httpStatus.OK)
        .send("User deleted")
    }
  }
  
  const deleteAll = async (req, res) => {
    const auth = verifyToken(req.headers.authorization)
    if (auth.accessLevel < process.env.ACCESS_LEVEL_ADMIN) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .send({
          message:
            "You don't have access to this feature.",
        });
    } else {
      let admin = await UniqueEmail(process.env.ADMIN_EMAIL)
      fs.readdir(`./uploads/profiles`, (err, files) => {
        if (err) {
          return res
            .status(httpStatus.BAD_REQUEST)
            .send("Something went wrong")
        }
        for (const file of files) {
          if (file !== admin.img) {
            fs.unlinkSync(`./uploads/profiles/${file}`)
          }
        }
      })
      await deleteUsers()
      return res
        .status(httpStatus.OK)
        .send("Users cleared")
    }
  }
  
    


  module.exports = {
    create,
    login,
    changeImg,
    changePassword,
    getAllUsers,
    deleteUserById,
    deleteAll
  }