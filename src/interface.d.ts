export interface IRule {
    title: string;
    keywords?: string[];
    regex?: RegExp | string;
    rules?: IRule[];
    examples?: string[];
}