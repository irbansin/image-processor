const sharp = require('sharp');
const s3 = require('../lib/s3');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validateImage } = require('../utils/imageValidator');

exports.uploadImageHandler = async (req, res) => {
    try {
        const file = req.file;
        const buffer = await sharp(file.buffer).toFormat('jpeg').toBuffer();

        const validationResult = await validateImage(buffer);
        if (!validationResult.ok) return res.status(400).json({ error: validationResult.reason });

        const s3res = await s3.upload({
            Bucket: process.env.S3_BUCKET,
            Key: `${Date.now()}-${file.originalname}`,
            Body: buffer,
            ContentType: 'image/jpeg',
        }).promise();

        const image = await prisma.image.create({
            data: { filename: file.originalname, url: s3res.Location }
        });

        res.status(201).json(image);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
