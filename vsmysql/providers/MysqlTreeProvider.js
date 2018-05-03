const vscode = require('vscode');
const dao = require('./MysqlDAO');
const path = require('path');
const fs = require('fs');

class MysqlTreeProvider {
    constructor() {
        this['__onDidChangeTreeData'] = new vscode.EventEmitter();
        this.onDidChangeTreeData = this['__onDidChangeTreeData'].event;
        this.mysqlConfigsJSON = path.join(__dirname, "mysqlConfigs.json");
        this.mysqlConnArray = new Array();

        this['readMysqlConfigsJson']();
    }

    ['readMysqlConfigsJson']() {
        if (fs.existsSync(this.mysqlConfigsJSON)) {
            this.mysqlConfigs = JSON.parse(fs.readFileSync(this.mysqlConfigsJSON).toString());
        }
        else
        {
            this.mysqlConfigs = new Array();
        }
    }

    ['refreshMysqlConfigsJson']() {
        fs.writeFileSync(this.mysqlConfigsJSON, JSON.stringify(this.mysqlConfigs, null, 4));
    }

    getChildren(elemento) {
        var elementos = new Array();

        if (!elemento) {
            //Cria Conexão se possivel e Busca a disponiveis
        } else if (elemento.contextValue == "db") {
            //Busca as databases
        } else if (elemento.contextValue == "table") {
            //Busca as Tabela
        } else if (elemento.contextValue == "column") {
            //Busca as Colunas
        }

        return elementos;
    }

    getTreeItem(elemento) {
        return elemento;
    }

    addConn(user, pass, host, port, charset) {
        this.mysqlConfigs.push({
            MYSQL_User: user,
            MYSQL_Pass: pass,
            MYSQL_Host: host,
            MYSQL_Port: port,
            MYSQL_Charset: charset
        });

        //let conn = new dao.MysqlDAO(user, pass, host, port, charset);
        this['refreshMysqlConfigsJson']();
    }

    removeConn(host, port) {
        
    }

    refresh() {
        this['__onDidChangeTreeData'].fire();
    }
}

exports.MysqlTreeProvider = MysqlTreeProvider;