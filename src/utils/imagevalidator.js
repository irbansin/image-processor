const sharp = require('sharp');
const imageHash = require('image-hash');

exports.validateImage = async (buffer) => {
    const metadata = await sharp(buffer).metadata();

    if (metadata.width < 300 || metadata.height < 300)
        return { ok: false, reason: 'Image resolution too small' };

    // TODO: Add duplicate detection (using perceptual hash)
    // TODO: Add blurry detection (via Laplacian Variance)
    // TODO: Add face detection (OpenCV/AWS Rekognition)

    return { ok: true };
};
