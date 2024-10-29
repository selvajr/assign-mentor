const mongoose = require("mongoose");
const app = require("./app");
const { MONGODB_URI, PORT } = require("./utils/config");

console.log(`Connecting to MongoDB...`);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    
    app.listen(PORT, () => {
      console.log(`Server is running on http://127.0.0.1:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });


  