var mysql = require("mysql");

function ROUTER(router, pool) {
    var self = this;
    self.handleRoutes(router, pool);
}

ROUTER.prototype.handleRoutes = function(router, pool) {
    var self = this;

    router.get("/geolocations", function(req, res) {
        var query = "SELECT * FROM ??";
        var vars = ["geolocations"];
        query = mysql.format(query, vars);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, geolocations) {
                connection.release();
                if(err) {
                    res.status(400).send({"error": true, "details": err});
                } else {
                    res.status(200).send({"error": false,  geolocations});
                }
            });
        });
    });

    router.post("/geolocations", function(req, res) {
        var query = "INSERT INTO ?? (??,??,??) VALUES (?,?,?)";
        var vars = ["geolocations"
          , "latitude", "longitude", "date_add"
          , req.body.latitude, req.body.longitude, req.body.date_add
        ];
        query = mysql.format(query, vars);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, details) {
                connection.release();
                if(err) {
                    res.status(400).send({"error": true, "details": err});
                } else {
                    res.status(200).send({"error": false, details, "geolocation": req.body});
                }
            });
        });
    });

}

module.exports = ROUTER;
