const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
  const bucketName = process.env.BUCKET_NAME;
  const { imageKey } = JSON.parse(event.body);

  const params = {
    Bucket: bucketName,
    Key: imageKey,
  };

  try {
    await s3.deleteObject(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Image deleted successfully!' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
