const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { fileName, contentType } = body;

    const s3Client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
      },
    });

    const command = new PutObjectCommand({
      Bucket: "serverless-image-gallery",
      Key: fileName,
      contentType: contentType,
    });

    const preSignUrl = await getSignedUrl(s3Client, command);

    return {
      statusCode: 200,
      body: JSON.stringify({ url: preSignUrl }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
