const analyzer = require('./service/')
const asyncAnalyze = (url) => {
    return new Promise(async (resolve, reject) => {
        analyzer(url)
            .then((result) => {
                resolve(result)
            })
    })
}
const runMe = async () => {

    const listOfPromises = []
    const listOfURL= ['https://www.protractortest.org/#/infrastructure']
    listOfURL.map(e => {
        listOfPromises.push(asyncAnalyze(e))
    })
    const res = await Promise.all(listOfPromises)
    console.log('res: ', JSON.stringify(res))
}

runMe()