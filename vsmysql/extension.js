const vscode = require('vscode');
const provider = require('./providers/Modules')

function activate(context) {

    let _MysqlTreeProvider = new provider.MysqlTreeProvider();

    let vsMysqlNodes = vscode.window.registerTreeDataProvider('vsMysqlNodes', _MysqlTreeProvider);
    let command1 = vscode.commands.registerCommand('vsMysqlNodes.refresh', function(){
        _MysqlTreeProvider.refresh();
    });

    context.subscriptions.push(vsMysqlNodes);
    context.subscriptions.push(command1);
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;

