// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
	ExtensionContext
} from 'vscode';
const RULES: { title: string, rule: RegExp, examples: string[] }[] = require('../packages/www/src/RULES.js');
import useCommand from './useCommand';
import useQuickPick from './useQuickPick';

export function activate(context: ExtensionContext) {
	useCommand(context, RULES);
	useQuickPick(context, RULES);
}

export function deactivate() { }
