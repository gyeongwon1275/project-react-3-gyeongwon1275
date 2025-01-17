const path = require('path');

const express = require('express');
const router = express.Router();

const multer = require('multer');
const multerS3 = require('multer-s3');

const AWS = require('aws-sdk');

const { Post, Image } = require('../models');

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read-write',
    bucket: 'animalphy-image-bucket',
    key(request, file, callback) {
      callback(
        null,
        `image/${Date.now()}_${request.hostname}_${path.basename(
          file.originalname,
        )}`,
      );
    },
  }),
  limits: { fileSize: 15 * 1024 * 1024 },
});

router.post('/image', upload.array('image'), (request, response) => {
  response.status(201).json({ url: request.files[0].location });
});

router.post('/', async (request, response, next) => {
  const { text, url } = request.body;

  try {
    const { id } = await Post.create({
      content: text,
    });

    await Image.create({
      url: url,
      postId: id,
    });

    response.status(201).send('ok');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
