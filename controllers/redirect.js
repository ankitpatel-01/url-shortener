const Url = require('../models/url');

exports.redirect = async (req, res) => {
    const url = await Url.findOne({
        urlCode: req.params.urlCode
    });

    if (url) {
        return res.redirect(url.longUrl);
    } else {
        return res.status(404).json({
            'statusCode': 404,
            'message': 'URL not found or Invalid URL.',
            'result': null
        });
    }
}