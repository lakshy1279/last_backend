const express = require("express");
require('dotenv').config();
const port = process.env.PORT;
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const handleErrors = (err, req, res, next) => {
    console.error(err.stack);
  
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
      error: {
        message: err.message,
      },
    });
};
app.use("/", require("./routes"));
app.use(handleErrors);

app.listen(port, function (err) {
  if (err) {
    console.log(`error in running the server:${err}`);
  }
  console.log(`server is running on the port:${port}`);
});