const express = require("express");
const app = express();
const PORT = process.env.PORT || 3333;
const db = require("./models");
const routes = require("./routes");
const Cors = require("cors");

db.sequelize.sync({ force: false }).then(() => {
  console.log("Sync db");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Cors());

app.use("/v1/api", routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
