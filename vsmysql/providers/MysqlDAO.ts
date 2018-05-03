import mysql from 'mysql';

class MysqlDAO {
    public user: string = null;
    public password: string = null;
    public host: string = null;
    public port: number = null;
    public charset: string = null;
    public status: string = "disconected";

    private __conn: mysql.Connection = null;

    constructor(pUser: string, pPassword: string, pHost: string, pPort: number, pCharset: string) {
        this.__conn = mysql.createConnection({
            user: pUser,
            password: pPassword,
            host: pHost,
            charset: pCharset
        });

        this.user = pUser
        this.password = pPassword;
        this.host = pHost;
        this.port = pPort;
        this.charset = pCharset;
        this.status = "disconected";
    }

    public connect() {
        var task = new Promise<boolean>(resolve => {
            if (this.status != "disconected") {
                resolve(false);
                return;
            }

            this.status = "connecting";
            this['conn'].connect(function (err) {
                if (err != null) {
                    this.status = "disconected";
                    resolve(false);
                } else {
                    this.status = "conected";
                    resolve(true);
                }
            });
        });

        return task;
    }

    executeQuery(query: string) {
        var task = new Promise(resolve => {
            if (this.status != "connected") {
                resolve(null);
                return;
            }

            this['conn'].query(query, function (pErr, pResults, pFields) {
                var values = {
                    err: pErr,
                    results: pResults,
                    fields: pFields
                }

                resolve(values);
            });
        });

        return task;
    }

    close() {
        this['conn'].destroy()
        this.status = "disconected";
        this['conn'] = null;
    }
}

module.exports.MysqlDAO = MysqlDAO;