const Url = require('../models/url');
const shortid = require('shortid');

const BASE_URL = process.env.BASE_URL;

const isValidUrl = (url) => {
    // Regular expression to validate URL
    var urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(url);
}

// Generate a random short URL
const generateShortUrl = () => {
    return Math.random().toString(36).substring(2, 6);
}

const saveUrl = async (longUrl) => {
    const urlCode = shortid.generate();
    const shortUrl = BASE_URL + '/' + urlCode;

    return new Url({
        urlCode, longUrl, shortUrl, date: new Date()
    }).save();
}

exports.getShortUrl = saveUrl;


exports.shorten = async (req, res) => {
    const { longUrl } = req.body;

    if (!isValidUrl(longUrl)) {
        return res.status(401).json({
            'statusCode': 401,
            'message': 'Invalid URL.',
            'result': null
        });
    }

    // const urlCode = generateShortUrl();

    let url = await Url.findOne({ longUrl });

    if (url) {
        return res.status(200).json({
            'statusCode': 200,
            'message': 'URL shortened.',
            'result': url.shortUrl
        });
    } else {

        url = await saveUrl(longUrl);

        return res.status(200).json({
            'statusCode': 200,
            'message': 'Url shortened.',
            'result': url.shortUrl
        });
    }

}
