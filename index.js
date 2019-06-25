const Page = require('./lib/page')

const validateUrl
const scanPage = async (page) => {
    const htmlPage = { meta: [], paragraph: []}
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
    if (pTags &&
        pTags.length) {
        for (let i = 0; i < pTags.length; i++) {
            htmlPage.meta.push(await pTags[i].getAttribute('innerText'))
        }
    }
    return htmlPage
}
const runMe = async () => {
    const page = new Page()
    await page.visit('https://www.w3schools.com/')
    try {
       const htmlPage = await scanPage(page)

        console.log('htmlPage: ', htmlPage)
    } catch (e) {
        console.error(e)
    }
    await page.quit()
}

runMe()