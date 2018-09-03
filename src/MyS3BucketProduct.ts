import cdk = require("@aws-cdk/cdk");
import { cloudformation as cfn } from "@aws-cdk/aws-servicecatalog";

export class MyS3BucketProduct {
    physicalId: string;
    constructor(parent: cdk.Stack) {
        this.physicalId = this.create(parent);
    }

    create(parent: cdk.Construct): string {
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

        const s3BucketProduct = new cfn.CloudFormationProductResource(parent, "MyS3BucketProduct", {
            cloudFormationProductName: "MyS3BucketProduct",
            owner: "Joe Bloggs",
            provisioningArtifactParameters: artifactParameters
        });

        return s3BucketProduct.ref.toString();
    }

    getPhysicalId() {
        return this.physicalId;
    }
}