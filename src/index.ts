import cdk = require("@aws-cdk/cdk");
import { MyS3BucketProduct } from "./MyS3BucketProduct";
import { MyServiceCatalog } from "./MyServiceCatalogStack";

const app = new cdk.App(process.argv);

// This is here temporarily, to deploy the bucket stack. Uncomment, if you want to deploy it
// new MyS3BucketStack(app, "MyS3BucketStack").createBucket("MyS3Bucket");

new MyS3BucketProduct(app, "MyS3BucketProductStack").create();
new MyServiceCatalog(app, "MyServiceCatalogStack").createPortfolios();



process.stdout.write(app.run())