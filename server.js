const mongoose = require("mongoose");
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/test";

console.log('connecting to mongoDB')
mongoose
  .connect(mongoUri)
  .then(() => {
    const app = require("./src");
    const port = process.env.PORT || 3000;
    console.log("successfully connected to mongoDB at " + mongoUri);
    app.listen(port, () => console.log(`server is listening to port ${port}`));
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
