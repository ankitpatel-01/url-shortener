const express = require('express')
const Url = require('../db/url')

const isValidUrl = (url) => {
    // Regular expression to validate URL
    var urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(url);
}

// Generate a random short URL
const generateShortUrl = () => {
    return Math.random().toString(36).substring(2, 6);
}

const BASE_URL = 'http://localhost:3000'

exports.shorten = async (req, res) => {
    const { longUrl } = req.body

    if (!isValidUrl(longUrl)) {
        return res.status(401).json({
            'statusCode': 401,
            'message': 'Invalid URL.',
            'result': null
        })
    }

    const urlCode = generateShortUrl();

    let url = await Url.findOne({ longUrl })

    if (url) {
        return res.status(200).json({
            'statusCode': 200,
            'message': 'URL shortened.',
            'result': url.shortUrl
        })
    } else {
        const shortUrl = BASE_URL + '/' + urlCode

        url = new Url({
            urlCode, longUrl, shortUrl, date: new Date()
        })

        await url.save()

        return res.status(200).json({
            'statusCode': 200,
            'message': 'Url shortened.',
            'result': url.shortUrl
        })
    }

}
