import { cloudformation as cfn } from "@aws-cdk/aws-servicecatalog";
import cdk = require("@aws-cdk/cdk");
import { MyS3BucketProduct } from "./MyS3BucketProduct";
export class MyServiceCatalog extends cdk.Stack {

    constructor(parent: cdk.App, logicalName: string, props?: cdk.StackProps) {
        super(parent, logicalName, props);
        const productId = new MyS3BucketProduct(this).getPhysicalId();
        this.createPortfolios(productId);
    }

    createPortfolios(productId: string) {
        const portfolio = new cfn.PortfolioResource(this, "Storage", {
            displayName: "Storage",
            providerName: "Joe Bloggs"
        });

        this.associateWithProduct("StorageAndS3BucketAssociation", portfolio.ref.toString(), productId);
    }

    associateWithProduct(logicalName: string, portfolioId: string, productId: string) {
        new cfn.PortfolioProductAssociationResource(this, logicalName, {
            portfolioId: portfolioId,
            productId: productId
        });
    }
}