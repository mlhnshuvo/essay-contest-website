require("dotenv").config();
const express = require("express");
const app = express();
const importantDetail = require("./controllers/importantDetail");
const photoGallery = require("./controllers/photoGallery");
const contact = require("./controllers/contact");
const magazine = require("./controllers/magazine");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

app.use("/importantdate", importantDetail);
app.use("/photoGallery", photoGallery);
app.use("/magazine", magazine);
app.use("/contact", contact);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(`${process.env.MONGOURL}`, {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
