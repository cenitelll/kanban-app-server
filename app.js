const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", require("./src/v1/routes"));

async function start() {
    console.log(process.env.MONGODB_URL);
    try {
        await mongoose.connect(process.env.MONGODB_URL, {});

        app.listen(process.env.PORT, () => {
            console.log(`Server started on port ${process.env.PORT}...`);
        });
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

start();
