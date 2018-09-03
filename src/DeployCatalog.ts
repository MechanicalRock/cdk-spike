import cdkTk = require("aws-cdk");
import cdk = require("@aws-cdk/cdk");
import cxapi = require("@aws-cdk/cx-api")
import { MyServiceCatalog } from "./catalog/MyServiceCatalogStack";
import { SDK } from "aws-cdk";
const catalogStackName = "MyServiceCatalogStack";
const stackNames = [catalogStackName];
let catalogStack;
const app = new cdk.App(process.argv);
const environment = {
    account: process.env.AWS_ACCOUNT_ID,
    region: process.env.AWS_REGION
};

initStacks();
// Generate templates of all service catalog stacks
generateTemplates();
// Deploy all the service catalog cfn stacks
deployCatalog();


// Functions
function initStacks() {
    catalogStack = new MyServiceCatalog(app, catalogStackName, {
        env: environment
    });
}

function generateTemplates() {
    const catalogStackTemplate = catalogStack.toCloudFormation();
    console.log("catalogStackTemplate: " + JSON.stringify(catalogStackTemplate));
}

function deployCatalog() {
    const synthesizedStacks: cxapi.SynthesizedStack[] = app.synthesizeStacks(stackNames);
    for (var i = 0; i < synthesizedStacks.length; i++) {
        const stack = synthesizedStacks[i];
        console.log("Deploying stack: " + stack.name);

        cdkTk.deployStack(stack, new SDK("default")).then((res) => {
            console.log(res.stackArn);
        }).catch((err) => {
            console.log(err);
        });
    }
}