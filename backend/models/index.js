const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
	config.DB,
	config.USER,
	config.PASSWORD,
	config
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.motorista = require("./Motorista.js")(sequelize, Sequelize);

module.exports = db;
