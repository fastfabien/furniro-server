const express = require("express");
const { connectDb } = require("./config/db.connect.js");
const dotenv = require("dotenv");
const { errorHandler } = require("./middleware/errorMiddleware.js");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 4000;

connectDb();

app.use("/api/products", require("./routes/product.routes.js"));
app.use("/api/users", require("./routes/user.routes.js"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
