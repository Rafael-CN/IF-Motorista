const express = require("express");
const cors = require("cors");
const db = require("./models");
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.options("*", cors());

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
});

require("./routes/main.routes")(app);

app.listen(8000, function (req, res) {
	console.log("App rodando na porta 8000");
});

db.sequelize
	.sync({ alter: true })
	.then(() => {
		console.log("Synced db.");
	})
	.catch((err) => {
		console.log("Failed to sync db: " + err.message);
	});
