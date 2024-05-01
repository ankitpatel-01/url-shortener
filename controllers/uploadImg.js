const cloudinary = require('cloudinary').v2;
const { getShortUrl } = require('./saveUrl');

exports.uploadImg = async (req, res) => {
    try {
        // Check if the uploaded file is an image
        if (!req.file || !req.file.mimetype.startsWith('image')) {
            return res.status(400).send('Please upload an image file');
        }
        // Upload the file to Cloudinary using a stream
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream((error, uploadResult) => {
                if (error) {
                    reject(error); // Reject the promise if there's an error during upload
                } else {
                    resolve(uploadResult); // Resolve the promise with upload result
                }
            });

            // End the upload stream by passing the byte array buffer
            uploadStream.end(req.file.buffer);
        });

        const url = await getShortUrl(result.secure_url);

        return res.status(200).json({
            'statusCode': 200,
            'message': 'Url shortened.',
            'result': url.shortUrl
        })

    } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        return res.status(500).send('Error uploading file');
    }
}