import cdk = require("@aws-cdk/cdk");
import { MyS3BucketStack } from "./product_definitions/MyS3BucketStack";
import fs = require("fs-extra");
const PRODUCT_DEFINITION_VERSION_FILE_NAME = "product-definition-versions.json";

const app = new cdk.App(process.argv);

synth();


// Functions
function synth() {
    const version = getVersion("MyS3BucketStack");
    const template = generateCfnTemplates();
    writeToFile(version, template);
}

function writeToFile(version: string, template: string) {
    fs.outputFile("product-templates/s3-bucket-product/" + version + "/MyS3BucketStack.template.yaml", template).then(() => {
        console.log("MyS3BucketStack.template.yaml was written successfully");
    }).catch((err) => {
        console.error(err);
    });
}

// Generate cloudformation templates (the templates to be attached to catalog products)
function generateCfnTemplates(): string {
    const bucketStackTemplate = new MyS3BucketStack(app, "MyS3BucketStack").toCloudFormation();
    return JSON.stringify(bucketStackTemplate);
}

function getVersion(stackName: string): string {
    let version;
    let property = stackName;

    const result = fs.readJsonSync(PRODUCT_DEFINITION_VERSION_FILE_NAME);
    const jsonString = JSON.stringify(result);
    version = JSON.parse(jsonString)[property].version;
    return version;
}