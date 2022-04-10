const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    password : {
      type: String,
      required:true
    },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Invalid email."],
    },
    accessLevel: {
      type: Number,
      default: parseInt(process.env.ACCESS_LEVEL_NORMAL_USER),
    },
    img: {
      type: String,
      default: ''
    },
    oldOrders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Order",
        autopopulate: { maxDepth: 3 },
      },
    ],
    address: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
