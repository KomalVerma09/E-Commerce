const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,

  cart: [{
      id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      quantity: Number
    }],
  orders: [{
      products: [],
      quantity: Number,
      totalPrice: Number,
      date: {
        type: Date,
        default: Date.now
      }
    }]
});

module.exports = mongoose.model("users", userSchema);

let users = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "john123",
    cart: [],
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    password: "bob123",
    cart: [],
  },
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    password: "alice123",
  },
];
