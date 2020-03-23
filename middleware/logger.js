const moment = require("moment");

const logger = (req, res, next) => {
  console.log(
    "===================================================================="
  );
  console.log(
    `URL accessed: ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  console.log(`HTTP Method: ${req.method}`);
  console.log(`Time accessed: ${moment().format()}`);
  console.log(
    "===================================================================="
  );

  next();
};

module.exports = logger;
