import cdk = require("@aws-cdk/cdk");
import { MyS3BucketStack } from "../MyS3BucketStack";
import fs = require("fs-extra");


const app = new cdk.App(process.argv);

// Generate cloudformation templates (the templates to be attached to catalog products)
const bucketStackTemplate = new MyS3BucketStack(app, "MyS3BucketStack").toCloudFormation();

const templateStr = JSON.stringify(bucketStackTemplate);
fs.outputFile("product-templates/s3-bucket-product/v1/MyS3BucketStack.template.yaml", templateStr).then(() => {
    console.log("MyS3BucketStack.template.yaml was written successfully");
}).catch((err) => {
    console.error(err);
});
console.log("bucketStackTemplate: " + templateStr);