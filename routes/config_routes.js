const indexR = require("./index");
const usersR = require("./users");
const makeupProdsR = require("./makeupProducts");

exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
  app.use("/makeupprods",makeupProdsR)
}