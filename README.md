# AWS Lambda Function for Updating Image Manifest

## Deployed Link of Manifest

https://js401d52-assets-trey.s3.us-west-2.amazonaws.com/image.json

This AWS Lambda function is triggered by an S3 event when a new image is uploaded to the specified S3 bucket. The function updates the `image.json` file in the bucket to maintain a manifest of all uploaded images, including their file names, file sizes, and content types.

## Table of Contents

- [Function Description](#function-description)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Function Description

The Lambda function performs the following tasks:

1. Fetches the existing `image.json` file from the S3 bucket and parses its content as a JSON array.
2. Gets the content type of the uploaded file.
3. Adds an object containing the file name, file size, and content type to the JSON array.
4. Writes the updated JSON array back to the `image.json` file in the S3 bucket.

## Technologies

- [AWS Lambda](https://aws.amazon.com/lambda/)
- [AWS S3](https://aws.amazon.com/s3/)
- [AWS SDK for JavaScript](https://aws.amazon.com/sdk-for-node-js/)

## Getting Started

1. Clone this repository.
2. Install the AWS SDK for JavaScript by running `npm install @aws-sdk/client-s3`.
3. Modify the `handler` function in the `index.js` file as needed.

## Deployment

1. Zip the contents of your project folder.
2. Upload the zip file to your AWS Lambda function using the AWS Management Console or the AWS CLI.

## Testing

To test the Lambda function:

1. Set up an S3 event notification to trigger the Lambda function when a new object is uploaded to the S3 bucket.
2. Upload a new image to the S3 bucket.
3. Wait a few seconds for the Lambda function to process the new file.
4. Check the `image.json` file in the S3 bucket to ensure that it has been updated with the new image's information.

## Contributing

1. Fork this repository.
2. Create a new branch with your feature or bugfix.
3. Commit your changes and push to your forked repository.
4. Create a pull request with a description of your changes.

## License

This project is licensed under the [MIT License](LICENSE).
