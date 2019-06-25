const analyzer = require('./service/')
const runMe = async () => {
    const res = await analyzer('https://www.protractortest.org/#/infrastructure')
    console.log('res: ', res)
}

runMe()