const segments = require('../controller/segments')
const segmentsVolumes = require('../controller/segmentsVolumes')

const routes = (app) => {
    // Segments Routes
    app.get('/segments', segments)
    app.get('/segments/volumes', segmentsVolumes)
}

module.exports = routes
