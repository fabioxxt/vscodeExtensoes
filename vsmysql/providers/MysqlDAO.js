const mysql = require('mysql');

class MysqlDAO {
    constructor(pUser, pPassword, pHost, pPort, pCharset) {
        this['conn'] = mysql.createConnection({
            host: pHost,
            user: pUser,
            password: pPassword,
            charset: pCharset
        });

        this.host = pHost;
        this.port = pPort;
        this.connected = false;
    }

    connect(actionOnComplete) {
        this['conn'].connect(function (err) {
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

    executeQuery(query, actionOnComplete) {
        if (!this.connected)
            return;

        this['conn'].query(query, function (err, results, fields) {
            if (actionOnComplete != null) {
                actionOnComplete(err, results, fields);
            }
        })
    }

    close()
    {
        this['conn'].destroy()
        this.connected = false;
        this['conn'] = null;
    }
}

exports.MysqlDAO = MysqlDAO;