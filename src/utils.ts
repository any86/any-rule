import { IRule } from './interface';
// import { convertToPinyin } from 'tiny-pinyin';
import { slugify } from 'transliteration';

function preprocessText(START_IDENTIFIER: string, text: string): string[] | null {
    const start = text.indexOf(START_IDENTIFIER);
    if (start === -1) {
        return null;
    }
    const pathString = text.substring(start, text.length);
    const pathArray = pathString.split('.');
    return pathArray;
}

/**
 * 根据特定的字符串解析出当前可以用的规则列表
 * @param text 待解析的字符串
 */
export function getRulesByText(START_IDENTIFIER: string, rules: IRule[], text: string): IRule[] {
    const pathArray = preprocessText(START_IDENTIFIER, text);
    if (!pathArray) {
        return [];
    }
    let currentRules: IRule[] = [];
    let targetRules = rules;

    for (const path of pathArray) {
        if (path === START_IDENTIFIER) {
            currentRules = rules;
        } else if (path === '') {
            console.log('path');
            break;
        } else {
            const searchRule = targetRules.find(rule => rule.title === path);

            if (!searchRule) {
                return [];
            }

            if (searchRule.regex) {
                return [];
            }

            currentRules = searchRule.rules || [];
            targetRules = currentRules;
        }
    }

    return currentRules;
}

export function getRuleByText(START_IDENTIFIER: string, rules: IRule[], text: string): IRule | null {
    const pathArray = preprocessText(START_IDENTIFIER, text);
    if (!pathArray) {
        return null;
    }
    let targetRules = rules;
    let searchRule: IRule | undefined;
    for (const path of pathArray) {
        if (path === START_IDENTIFIER) {
            continue;
        }

        searchRule = targetRules.find(rule => rule.title === path);
        if (!searchRule) {
            return null;
        }
        if (searchRule.regex) {
            break;
        } else {
            targetRules = searchRule.rules || [];
        }
    }

    return searchRule || null;
}

export function generateFilterString(rule: IRule) {
    let filterString = '';
    filterString += rule.title;
    const pinyin = slugify(rule.title).split('-');
    if (/.*[\u4e00-\u9fa5]+.*$/.test(rule.title)) {
        filterString += ' ' + pinyin.join('');
        filterString += ' ' + pinyin.map(item => item.length ? item[0] : '');
    }

    if (rule.keywords) {
        filterString += ' ' + rule.keywords.join(' ');
    }

    return filterString;
}
