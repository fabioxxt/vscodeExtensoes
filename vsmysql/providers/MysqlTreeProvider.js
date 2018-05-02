const vscode = require('vscode');

function MysqlTreeProvider(pDAO)
{
    let __onDidChangeTreeData = new vscode.EventEmitter();
    this.onDidChangeTreeData = __onDidChangeTreeData.event;

    this.getChildren = getChildren;
    this.getTreeItem = getTreeItem;
    this.refresh = refresh;
        
    function getChildren(element)
    {
        var elementos = new Array();
            for (var i = 0; i < 5; i++)
            {
                var elemento = new vscode.TreeItem("Item "+i);
                elemento.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
                elementos.push(elemento);
            }

            return elementos;
    }

    function getTreeItem(element) {
        return element;
    }

    function refresh()
    {
        __onDidChangeTreeData.fire();
    }
}

exports.MysqlTreeProvider = MysqlTreeProvider;