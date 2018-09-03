import cdk = require("@aws-cdk/cdk");
import { cloudformation as cfn } from "@aws-cdk/aws-servicecatalog";
import { BasePathBuilder } from "../utils/BasePathBuilder";

export class MyS3BucketProduct {
    physicalId: string;
    constructor(parent: cdk.Stack) {
        this.physicalId = this.create(parent);
    }

    create(parent: cdk.Construct): string {
        const basePath = BasePathBuilder.build();

        const artifactParameters: Array<cfn.CloudFormationProductResource.ProvisioningArtifactPropertiesProperty>
            = [
                {
                    name: "v1",
                    info: {
                        "LoadTemplateFromURL": basePath + "s3-bucket-product/v1/MyS3BucketStack.template.yaml"
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