const sharp = require('sharp');
const imghash = require('imghash');

exports.validateImage = async (buffer) => {
    const metadata = await sharp(buffer).metadata();

    if (metadata.width < 300 || metadata.height < 300)
        return { ok: false, reason: 'Image resolution too small' };

    // TODO: Add duplicate detection (using perceptual hash)
    const hash = await imghash.hashRaw(buffer, 16, 'hex');

    // TODO: Add blurry detection (via Laplacian Variance)
    // TODO: Add face detection (OpenCV/AWS Rekognition)

    return { ok: true, hash };
};
