var mysql = require("mysql");

function ROUTER(router, pool) {
    var self = this;
    self.handleRoutes(router, pool);
}

ROUTER.prototype.handleRoutes = function(router, pool) {
    var self = this;

    router.get("/users", function(req, res) {
        var query = "SELECT * FROM ??";
        var vars = ["users"];
        query = mysql.format(query, vars);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if(err) {
                    res.status(400).send({"error": true, "details": err});
                } else {
                    res.status(200).send({"error": false,  "users" : rows});
                }
            });
        });
    });

    router.get("/users/:id", function(req, res) {
        var query = "SELECT * FROM ?? WHERE ??=?";
        var vars = ["users"
          , "id"
          , req.params.id
        ];
        query = mysql.format(query,vars);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if(err) {
                    res.status(400).send({"error": true, "details": err});
                } else {
                    res.status(200).send({"error": false,  "users" : rows});
                }
            });
        });
    });

    router.post("/users", function(req, res) {
        var query = "INSERT INTO ?? (??,??,??) VALUES (?,?,?)";
        var vars = ["users"
          , "email"
          , "name"
          , "password"
          , req.body.email
          , req.body.name
          //, md5(req.body.password)
          , req.body.password
        ];
        query = mysql.format(query, vars);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if(err) {
                    res.status(400).send({"error": true, "details": err});
                } else {
                    res.status(200).send({"error": false, "details": rows});
                }
            });
        });
    });

    router.put("/users/:id", function(req, res) {
        var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
        var vars = ["users"
          , "email", req.body.email
          , "name", req.body.name
          , "password", md5(req.body.password)

          , "id", req.params.id
        ];
        query = mysql.format(query, vars);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if(err) {
                    res.status(400).send({"error": true, "details": err});
                } else {
                    res.status(200).send({"error": false, "details": rows});
                }
            });
        });
    });

    router.delete("/users/:id", function(req, res) {
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["users",
          "id"
          , req.params.id
        ];
        query = mysql.format(query,table);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if(err) {
                    res.status(400).send({"error": true, "details": err});
                } else {
                    res.status(200).send({"error": false, "details": rows});
                }
            });
        });
    });
}

module.exports = ROUTER;
