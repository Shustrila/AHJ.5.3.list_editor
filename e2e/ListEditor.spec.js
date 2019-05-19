import puppetteer from 'puppeteer';

jest.setTimeout(2000000);

describe('TESTS: list editor', () => {
    let browser = null;
    let page = null;
    const baseUrl = 'http://localhost:8080';
    beforeAll(async () => {
        browser = await puppetteer.launch({
            headless: false,
            slowMo: 100,
            devtools: true,
        });
        page = await browser.newPage();
    });
    afterAll(async () => {
        await browser.close();
    });


    test('1. no validate fields', async () => {
        await page.goto(baseUrl);
        const add = await page.$('[data-editor=add]');
        await add.click();
        const ok = await page.$('.form .form__button-ok');
        await ok.click();
        const name = await page.$(".form [name=name]");

        console.log(name.parent('.form__label'));

        await name.parentNode.waitForSelector('.form__error');
        const price = await page.$(".form [name=price]");
        await price.parentNode.waitForSelector('.form__error');
    });

    // test('2. add row', async () => {
    //     await page.goto(baseUrl);
    //     const add = await page.$('[data-editor=add]');
    //     await add.click();
    //     const name = await page.$('.form [name=name]');
    //     await name.type('iPhone X');
    //     const price = await page.$('.form [name=price]');
    //     await price.type('60000');
    //     const ok = await page.$('.form .form__button-ok');
    //     await ok.click();
    //     await page.waitForSelector('[data-goods-id="0"]');
    // });

    test('3. remove row id 0', async () => {
        await page.goto(baseUrl);
        const add = await page.$('[data-editor=add]');
        await add.click();
        const name = await page.$('.form [name=name]');
        await name.type('iPhone X');
        const price = await page.$('.form [name=price]');
        await price.type('60000');
        const ok = await page.$('.form .form__button-ok');
        await ok.click();
        const row = await page.$('[data-goods-id="0"]');
        const remove = await row.$('.table__remove');
        await remove.click();
        let dialogExists = false;
        await  page.on('dialog', () => dialogExists = true)
    })
});
