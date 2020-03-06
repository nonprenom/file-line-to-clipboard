// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.fileLineToClipboard', () => {
		// The code you place here will be executed every time your command is executed
		const activeEditor = vscode.window.activeTextEditor;
		let file_line = "Error";
		if (activeEditor) {
			let file_path = activeEditor.document.uri.fsPath.toString();
			if (vscode.workspace.workspaceFolders !== undefined) {
				let workspace_path = vscode.workspace.workspaceFolders[0].uri.fsPath.toString();
				file_line = file_path.substr(workspace_path.length);
			}
			else {
				console.log("no workspace selected");
				file_line = file_path;
			}
			let line = activeEditor.selection.active.line + 1;
			file_line += "@" + line;
			console.log(file_line);
			vscode.env.clipboard.writeText(file_line);
		}
		// Display a message box to the user
		vscode.window.showInformationMessage("[" + file_line + "] copied to clipboard");
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
