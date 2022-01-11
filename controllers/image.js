const Clarifai = require('clarifai');
const { json } = require('express/lib/response');


const app = new Clarifai.App({
    apiKey: '24ec20f56cf146dbab8d8cae04e3d81b'
})


const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'))

}



const handleImage = (req, res, knex) => {
    const { id } = req.body;
    knex('users')
    .where('id' , '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('unable to get entries'))
}


module.exports = {
    handleImage,
    handleApiCall
}