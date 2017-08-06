var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");

var port = process.env.PORT || 3000;

var app = express();

var db = require("./models");

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(methodOverride("_method"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


require("./routes/api-routes.js")(app);


db.sequelize.sync({ force: false }).then(function() {
	app.listen(port, function() {
		console.log("App listening on PORT " + port);
	});
});
