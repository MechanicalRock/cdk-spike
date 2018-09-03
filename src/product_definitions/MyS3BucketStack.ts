import s3 = require("@aws-cdk/aws-s3");
import cdk = require("@aws-cdk/cdk");

export class MyS3BucketStack extends cdk.Stack {
    constructor(parent: cdk.App, logicalName: string, props?: cdk.StackProps) {
        super(parent, logicalName, props);
        this.createBucket("MyS3Bucket");
    }

    createBucket(logicalName: string) {
        const name = "my-s3-bucket" + "-" + new cdk.AwsAccountId();

        new s3.Bucket(this, logicalName, {
            versioned: true,
            bucketName: name,
            encryption: s3.BucketEncryption.KmsManaged
        });
    }
}

