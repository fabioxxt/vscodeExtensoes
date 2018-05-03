const vscode = require('vscode');
const dao = require('./MysqlDAO');
const fs = require('fs');

class MysqlTreeProvider {
    constructor() {
        this['__onDidChangeTreeData'] = new vscode.EventEmitter();
        this.onDidChangeTreeData = this['__onDidChangeTreeData'].event;
        
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

    addConn(user, pass, host, port, charset)
    {
        let conn = new dao.MysqlDAO(user, pass, host, port, charset);
        
    }

    removeConn()
    {

    }

    refresh() {
        this['__onDidChangeTreeData'].fire();
    }
}

exports.MysqlTreeProvider = MysqlTreeProvider;