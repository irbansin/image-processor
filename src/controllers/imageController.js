const sharp = require('sharp');
const s3 = require('../lib/s3');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validateImage } = require('../utils/imageValidator');

exports.uploadImageHandler = async (req, res) => {
    try {
        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }
        const results = [];
        for (const file of files) {
            try {
                const buffer = await sharp(file.buffer).toFormat('jpeg').toBuffer();
                const validationResult = await validateImage(buffer);
                if (!validationResult.ok) {
                    results.push({
                        filename: file.originalname,
                        status: 'Rejected',
                        reason: validationResult.reason
                    });
                    continue;
                }
                const s3res = await s3.upload({
                    Bucket: process.env.S3_BUCKET,
                    Key: `${Date.now()}-${file.originalname}`,
                    Body: buffer,
                    ContentType: 'image/jpeg',
                }).promise();
                const image = await prisma.image.create({
                    data: { 
                        filename: file.originalname, 
                        url: s3res.Location,
                        status: 'Accepted'
                    }
                });
                results.push({
                    filename: file.originalname,
                    status: 'Accepted',
                    url: s3res.Location
                });
            } catch (err) {
                results.push({
                    filename: file.originalname,
                    status: 'Rejected',
                    reason: err.message || 'Processing or upload error'
                });
            }
        }
        res.status(207).json({ results }); // 207 Multi-Status for batch responses
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
