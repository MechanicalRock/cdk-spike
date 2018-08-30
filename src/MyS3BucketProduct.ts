import cdk = require("@aws-cdk/cdk");
import { cloudformation as cfn } from "@aws-cdk/aws-servicecatalog";

export class MyS3BucketProduct extends cdk.Stack {
    constructor(parent: cdk.App, logicalName: string, props?: cdk.StackProps) {
        super(parent, logicalName, props);
    }

    create() {
        const artifactParameters: Array<cfn.CloudFormationProductResource.ProvisioningArtifactPropertiesProperty>
            = [
                {
                    name: "v1",
                    info: {
                        "LoadTemplateFromURL": "https://s3-ap-southeast-2.amazonaws.com/catalog-product-cloudformation-templates/v1/MyS3BucketStack.template.yaml"
                    }
                },
                {
                    name: "v2",
                    info: {
                        "LoadTemplateFromURL": "https://s3-ap-southeast-2.amazonaws.com/catalog-product-cloudformation-templates/v2/MyS3BucketStack.template.yaml"
                    }
                }
            ];

        const s3BucketProduct = new cfn.CloudFormationProductResource(this, "MyS3BucketProduct", {
            cloudFormationProductName: "MyS3BucketProduct",
            owner: "Joe Bloggs",
            provisioningArtifactParameters: artifactParameters
        });

        const productId = s3BucketProduct.ref.toString();
        new cdk.Output(this, "MyS3BucketProductId", {
            export: "MyS3BucketProductId",
            value: productId
        });
    }
}