const Page = require('./lib/page')

const scanPage = async (page) => {
    const htmlPage = { meta: [], text: []}
    const metaTags = await page.findByTagName('meta')
    if (metaTags &&
        metaTags.length) {
        for (let i = 0; i < metaTags.length; i++) {
            // console.log(`metaTag[${i}]: `, await metaTags[i].getAttribute('content'))
            const name = await metaTags[i].getAttribute('name')
            const content = await metaTags[i].getAttribute('content')
            if (content.length) {
                htmlPage.meta.push({name, content})
            }
        }
    }
    const pTags = await page.findByTagName('p')
    const divTags = await page.findByTagName('div')
    const spanTags = await page.findByTagName('span')
    const contentTextTags = [].concat(pTags, divTags, spanTags)
    if (contentTextTags &&
        contentTextTags.length) {
        for (let i = 0; i < contentTextTags.length; i++) {
            try {
                const text = await contentTextTags[i].getAttribute('innerText')
                if (text.length > 0) {

                    htmlPage.text.push(text)
                }
            } catch (e) {
                console.error(e)
            }
        }
    }
    return htmlPage
}
const runMe = async () => {
    const page = new Page()
    const url = 'https://www.protractortest.org/#/infrastructure'
    await page.visit(url)
    await page.removeAllScript()
    try {
       const htmlPage = await scanPage(page)
        htmlPage.url = url
        const screenShot = await page.takeScreenShot()
        htmlPage.screenShot = screenShot
        console.log('htmlPage: ', JSON.stringify([htmlPage]))
    } catch (e) {
        console.error(e)
    }
    await page.quit()
}

runMe()