console.log("iShop E-Commerce Backend");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const menuApi = require("./routes/menu-api");
const adminApi = require("./routes/admin-api");

const app = express();
const PORT = 8080;
const MONGODB_CONNECTION_STRING =
  "mongodb+srv://blackbatjargalkhongorzul:DYZCelY7XuzRbqjM@khongoroo.shpcxi9.mongodb.net/ishop";

app.use(cors());
app.use(express.json());
app.use("/menu", menuApi);
app.use("/admin", adminApi);

app.listen(PORT, () => {
  mongoose
    .connect(MONGODB_CONNECTION_STRING)
    .then(console.log("Database is successfully connected"))
    .catch((error) => console.error(error));
  console.log(
    `iShop E-Commerce application is running on http://localhost:${PORT}`
  );
});
