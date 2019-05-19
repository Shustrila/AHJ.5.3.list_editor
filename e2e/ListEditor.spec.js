import puppetteer from 'puppeteer';

jest.setTimeout(20000);

describe('TESTS: list editor', () => {
    let browser = null;
    let page = null;
    const baseUrl = 'https://shustrila.github.io/AHJ.5.3.list_editor/';

    beforeAll(async () => {
        browser = await puppetteer.launch({
            headless: false,
            slowMo: 100,
            devtools: true,
        });
        page = await browser.newPage();
    });

    test('1. no validate fields', async () => {
        await page.goto(baseUrl);
        await page.click('[data-editor=add]');
        await page.click('.form .form__button-ok');

        await page.$(".form form__label", async item => {
            await item.waitForSelector('.form__error');
        });
    });

    test('2. add row', async () => {
        await page.goto(baseUrl);
        await page.click('[data-editor=add]');
        const name = await page.$('.form [name=name]');
        await name.type('iPhone X');
        const price = await page.$('.form [name=price]');
        await price.type('60000');
        await page.click('.form .form__button-ok');
        await page.waitForSelector('[data-goods-id="0"]');
    });

    test('3. remove row id 0', async () => {
        await page.goto(baseUrl);
        await page.click('[data-editor=add]');
        const name = await page.$('.form [name=name]');
        await name.type('iPhone X');
        const price = await page.$('.form [name=price]');
        await price.type('60000');
        await page.click('.form .form__button-ok');
        page.on('dialog', async dialog => {
            await dialog.accept();
        });
        await page.click('[data-goods-id="0"] .table__remove');

    });

    test('4. edit row', async () => {
        await page.goto(baseUrl);
        await page.click('[data-editor=add]');
        const name = await page.$('.form [name=name]');
        await name.type('iPhone X');
        const price = await page.$('.form [name=price]');
        await price.type('9000');
        await page.click('.form .form__button-ok');
        await page.click('[data-goods-id="0"] .table__edit');
        const priceEdit = await page.$('.form [name=price]');
        await priceEdit.type('0');
        await page.click('.form .form__button-ok');

        const result = await page.evaluate(() => {
            return document.querySelector('[data-goods-id="0"] [data-editor-row=price]').innerText;
        });

        expect(result).toBe('90000');
    });

    afterAll(async () => {
        await browser.close();
    });
});
