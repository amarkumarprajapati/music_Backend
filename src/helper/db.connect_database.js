let mongoose = require("mongoose");

let mongodbconnect = () => {
  mongoose
    .connect("mongodb://localhost:27017")
    .then((connection) => {
      console.log(`Connected to MongoDB: ${connection.connection.host}`);
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB: ", error);
    });
};

module.exports = mongodbconnect;
