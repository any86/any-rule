import axios from 'axios';
import { IRule } from './interface';
import { writeFileSync, readFileSync } from 'fs';
import { join as pathJoin } from 'path';

async function loadRulesFromFile(path: string): Promise<IRule[] | null> {
    try {
        const json = readFileSync(path);
        return JSON.parse(json.toString()) as IRule[];
    } catch(e) {
        return null;
    }
}

async function loadRulesFromWeb(): Promise<IRule[]> {
    const dataSources = [
        'https://raw.githubusercontent.com/any86/any-rule/feature/vscode-refactor/rules.json'
    ];
    let rules: IRule[] = [];
    for (const source of dataSources) {
        try {
            const response = await axios.get(source);
            const body = response.data;
            rules = body as IRule[];
        } catch(e) {
            console.log(e);
            continue;
        }
    }

    return rules;
}

export async function loadRules (extensionPath: string, force: boolean = false): Promise<IRule[]> {
    const rulePath = pathJoin(extensionPath, 'rules.json');
    let rules: IRule[] | null = null;
    if (!force) {
        rules = await loadRulesFromFile(rulePath);
    }
    if (!rules) {
        rules = await loadRulesFromWeb();
        writeFileSync(rulePath, Buffer.from(JSON.stringify(rules)));
    }
    return rules;
}
