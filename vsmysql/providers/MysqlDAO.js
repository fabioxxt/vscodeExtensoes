const mysql = require('mysql');

function MysqlDAO(pHost, pUser, pPassword, pDatabase, pCharset) {
    var conn = mysql.createConnection({
        host: pHost,
        user: pUser,
        password: pPassword,
        database: pDatabase,
        charset: pCharset
    });

    this.connected = false;

    this.connect = function Connect(actionOnComplete) {
        conn.connect(function (err) {
            if (err != null) {
                this.Connected = false;
            } else {
                this.Connected = true;
            }

            if (actionOnComplete != null) {
                actionOnComplete(err);
            }
        });
    }

    this.executeQuery = function(query, actionOnComplete){
        if (!this.connected)
            return;

        conn.query(query, function(err, results, fields){
            if (actionOnComplete != null)
            {
                actionOnComplete(err, results, fields);
            }
        })
    }
}

exports.MysqlDAO = MysqlDAO;