import { cloudformation as cfn } from "@aws-cdk/aws-servicecatalog";
import cdk = require("@aws-cdk/cdk");

export class MyServiceCatalog extends cdk.Stack {
    constructor(parent: cdk.App, logicalName: string, props?: cdk.StackProps) {
        super(parent, logicalName, props);
    }

    createPortfolios() {
        const portfolio = new cfn.PortfolioResource(this, "Storage", {
            displayName: "Storage",
            providerName: "Joe Bloggs"
        });

        this.associateWithProduct("StorageAndS3BucketAssociation", portfolio.ref.toString(), new cdk.FnImportValue("MyS3BucketProductId").toString());
    }

    associateWithProduct(logicalName: string, portfolioId: string, productId: string) {
        new cfn.PortfolioProductAssociationResource(this, logicalName, {
            portfolioId: portfolioId,
            productId: productId
        });
    }
}