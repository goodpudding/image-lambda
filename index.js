import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({ region: "us-west-2" });

export const handler = async (event) => {
  const bucketName = event.Records[0].s3.bucket.name;
  const fileName = event.Records[0].s3.object.key;
  const fileSize = event.Records[0].s3.object.size;

  console.log("BUCKET NAME" + bucketName);
  console.log("FILE NAME" + fileName);
  console.log("FILE SIZE" + fileSize);

  const getImageManifest = {
    Bucket: bucketName,
    Key: "image.json",
  };

  try {
    const headObjectResult = await s3Client.send(
      new HeadObjectCommand({
        Bucket: bucketName,
        Key: fileName,
      })
    );
    const contentType = headObjectResult.ContentType;

    const manifestObject = await s3Client.send(
      new GetObjectCommand(getImageManifest)
    );
    const manifestBody = await new Promise((resolve, reject) => {
      const chunks = [];
      manifestObject.Body.on("data", (chunk) => chunks.push(chunk));
      manifestObject.Body.on("error", reject);
      manifestObject.Body.on("end", () => resolve(Buffer.concat(chunks)));
    });

    const manifestJson = JSON.parse(manifestBody.toString());
    manifestJson.push({
      fileName: fileName,
      fileSize: fileSize,
      type: contentType,
    });

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: "image.json",
        Body: JSON.stringify(manifestJson),
      })
    );
  } catch (e) {
    console.log(e);
    if (e.name === "NoSuchKey") {
      console.log("Creating a new Manifest");
      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: "image.json",
          Body: JSON.stringify([
            {
              fileName: fileName,
              fileSize: fileSize,
            },
          ]),
        })
      );
    }
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!"),
  };
  return response;
};
