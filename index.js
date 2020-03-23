const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");

const app = express();

// Initialize middleware
app.use(logger);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set a static folder
// public/index.html will be served by default
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
