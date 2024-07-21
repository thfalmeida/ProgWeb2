const exp = require("constants");
const express = require("express");
const path = require("path")

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello world! ");
});

app.listen(port, () => {
    console.log(`Server running at hhtp://localhost:${port}/`);
});

app.use(express.static(path.join(__dirname, 'public')))