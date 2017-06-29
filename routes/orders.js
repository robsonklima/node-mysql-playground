var mysql = require("mysql");

function ROUTER(router, pool) {
    var self = this;
    self.handleRoutes(router, pool);
}

ROUTER.prototype.handleRoutes = function(router, pool) {
    var self = this;

    router.get("/orders", function(req, res) {
        var query = "SELECT * FROM ??";
        var vars = ["orders"];
        query = mysql.format(query, vars);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, orders) {
                connection.release();
                if(err) {
                    res.status(400).send({"error": true, "details": err});
                } else {
                    res.status(200).send({"error": false,  orders});
                }
            });
        });
    });

    router.get("/orders/:id", function(req, res) {
        var query = "SELECT * FROM ?? WHERE ??=?";
        var vars = ["orders", "id", req.params.id];
        query = mysql.format(query,vars);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, order) {
                connection.release();
                if(err) {
                    res.status(400).send({"error": true, "details": err});
                } else {
                    res.status(200).send({"error": false,  order});
                }
            });
        });
    });

    router.post("/orders", function(req, res) {
        var query = "INSERT INTO ?? (??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?)";
        var vars = ["orders"
          , "order"
          , "local"
          , "os"
          , "address"
          , "marker_color"
          , "sla_limite"
          , "sla_status"
          , "intervencao"
          , "reincidencia"
          , req.body.order
          , req.body.local
          , req.body.os
          , req.body.address
          , req.body.marker_color
          , req.body.sla_limite
          , req.body.sla_status
          , req.body.intervencao
          , req.body.reincidencia
        ];
        query = mysql.format(query, vars);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, details) {
                connection.release();
                if(err) {
                    res.status(400).send({"error": true, "details": err});
                } else {
                    res.status(200).send({"error": false, details, "order": req.body});
                }
            });
        });
    });

    router.delete("/orders/:id", function(req, res) {
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["orders", "id", req.params.id
        ];
        query = mysql.format(query,table);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, details) {
                connection.release();
                if(err) {
                    res.status(400).send({"error": true, "details": err});
                } else if (details.affectedRows == 0) {
                    res.status(404).send({"error": false, details });
                } else {
                    res.status(200).send({"error": false, details });
                }
            });
        });
    });

}

module.exports = ROUTER;
