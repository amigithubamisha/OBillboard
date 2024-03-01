const express = require("express");
const app = express();
// const port = 5000
const port = process.env.port || 5000;
const mongoose = require("mongoose");
const { mongoUrl } = require("./keys");
const cors = require("cors");
const contactRoutes = require("./models/contactModel");
const path = require("path")

// Enable CORS middleware
app.use(cors());

require('./models/model')
require('./models/post')
app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/createPost"))
app.use(require("./routes/contactRoutes"));
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

mongoose.connection.on("connected", () => {
    console.log("Successfully connected to MongoDB");
});

mongoose.connection.on("error", () => {
    console.log("Not connected to MongoDB");
});

// serving the frontend 
app.use(express.static(path.join(__dirname, "./client/build")))

app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
        function(err){
            res.status(500).send(err)
        }
    )
})

app.listen(port, () => {
    console.log("Server is running on port " + port);
});