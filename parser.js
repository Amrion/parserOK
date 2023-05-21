export const parse = async (browser, login, password, url) => {
    const page = await browser.newPage();

    console.log('ВХОД В ОДНОКЛАССНИКИ')

    if (login === '' || password === '') {
        return ({
            logs: 'Войдите в одноклассники',
        })
    }

    await page.goto(url)

    await page.click('.h-mod.al')

    await page.waitForSelector('.input__prt1l.__size-m__prt1l')
    await page.type('.input__prt1l.__size-m__prt1l', login);
    await page.type('.input__prt1l.__size-m__prt1l.input__whol7', password);

    await page.click('.button__pe9qo.button-core-container__0ej09.js-submit.__wide__pe9qo')

    return await new Promise((resolve) => {
        setTimeout(async () => {
            console.log('ЗАПУСК ПАРСЕРА')

            let result = [];

            for (let i = 0; i < 5; i++) {
                result = [...result, ...await autoScroll(page)]

                try {
                    await page.waitForSelector('.js-show-more.link-show-more')
                    await page.click('.js-show-more.link-show-more')
                } catch (e) {
                    if (e !== '') {
                        break;
                    }
                }
            }

            resolve({
                logs: 'ПАРСЕР ЗАВЕРШЕН',
                length: result.length,
                array: result,
            })
        }, 2000)
    })
}

const autoScroll = async (page) => {
    return await page.evaluate(async () => {
        return await new Promise((resolve) => {
            let totalHeight = 0;
            let distance = 1000;

            const timer = setInterval(() => {
                let scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight) {
                    const arrNotesElem = document.querySelectorAll('.media-text_cnt_tx.emoji-tx.textWrap');

                    const tempArr = Array.from(arrNotesElem).map((item) => {
                        return item.textContent
                    })

                    clearInterval(timer);
                    resolve(tempArr)
                }
            }, 100);
        })
    });
}