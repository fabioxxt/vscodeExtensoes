const vscode = require('vscode');
const provider = require('./providers/Modules');

function activate(context) {

    let __MysqlTreeProvider = new provider.MysqlTreeProvider();

    let vsMysqlNodes = vscode.window.registerTreeDataProvider('vsMysqlNodes', __MysqlTreeProvider);

    let command_vsMysqlNodesAddConn = vscode.commands.registerCommand('vsMysqlNodes.addConn', function () {
        let mysqlUser = null;
        let mysqlPass = null;
        let mysqlHost = null;
        let mysqlPort = "3306";
        let mysqlCharset = null;

        vscode.window.showInputBox({
            placeHolder: "MYSQL User [ Campo obrigatório ]",
            value: mysqlUser
        }).then((value) => {
            if (!value) {
                vscode.window.showErrorMessage("MYSQL User é obrigatório!");
            } else {
                mysqlUser = value ? value : null;
                vscode.window.showInputBox({
                    placeHolder: "MYSQL Password [ Campo opcional ]",
                    password: true,
                    value: mysqlPass
                }).then((value) => {
                    mysqlPass = value ? value : null;
                    vscode.window.showInputBox({
                        placeHolder: "MYSQL Host [ Campo obrigatório ]",
                        value: mysqlHost
                    }).then((value) => {
                        if (!value) {
                            vscode.window.showErrorMessage("MYSQL Host é obrigatório!");
                        } else {
                            mysqlHost = value ? value : null;
                            vscode.window.showInputBox({
                                placeHolder: "MYSQL Port [ Campo obrigatório ]",
                                value: mysqlPort
                            }).then((value) => {
                                if (!value) {
                                    vscode.window.showErrorMessage("MYSQL Port é obrigatório!");
                                } else {
                                    mysqlPort = value ? value : null;
                                    vscode.window.showInputBox({
                                        placeHolder: "MYSQL Charset [ Campo opcional ]",
                                        value: mysqlCharset
                                    }).then((value) => {
                                        mysqlCharset = value ? value : null;
                                    });
                                }
                            });
                        }
                    });
                });
            }
        });
    });

    let command_vsMysqlNodesRefresh = vscode.commands.registerCommand('vsMysqlNodes.refresh', function () {
        __MysqlTreeProvider.refresh();
    });

    context.subscriptions.push(vsMysqlNodes);
    context.subscriptions.push(command_vsMysqlNodesAddConn);
    context.subscriptions.push(command_vsMysqlNodesRefresh);
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;