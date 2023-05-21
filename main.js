import {openBrowser, closeBrowser} from "./browserWork.js";
import {parse} from "./parser.js";

const URL = 'https://ok.ru/profile208491525/statuses';
const LOGIN = '';
const PASS = '';

const browser = await openBrowser();
const result = await parse( browser, LOGIN, PASS, URL);

console.log(result.logs)
if (result.length !== undefined) {
    console.log(result.length)
// Вывод массив заметок - console.log(result.array)
}

await closeBrowser(browser);