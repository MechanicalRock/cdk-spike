# Archived Repository
This repository has been archived and should be considered for reference purposes only.
The project is not maintained and may contain known security vulnerabilities.

# CDK flow: 
#NB: These are steps you'd execute to set up/ deploy a new CDK project. They're not applicable to this project anymore
#For project specific steps, pls refer to Build & Deployment flow below.
- Create a typescript project
- Create an App (extends cdk.App)
- Create one or more stacks(children of App in CDK terms)
- Each stack can have multiple resources like S3 bucket etc.
- To get a list of stacks:
    - `cdk ls -l`
- To generate CFN template, use CDK toolkit command
    - `cdk synth --o=templates`
        - You’ll see the templates in the templates folder
- To create an environment for deployment:
    - `cdk bookstrap`
        - This creates an S3 bucket where templates will be uploaded when you run `cdk deploy`
- To deploy your CDK app:
    - `cdk deploy`
        - This command invokes calls to Cloud formation service and creates/updates stacks using the access key id and secret access key id exported as env vars or default credentials & region in your machine
- To assume a role from the Sandbox account:
    - We need to set some AWS environment variables to force CDK to use these env vars instead of the default profile from `~/.aws/credentials` or `~/.aws/config`
    - Execute the following:
        - `export AWS_ACCOUNT_ID=<AWS_ACCOUNT_ID>` , account id of the account to which the role to be assumed belongs
        - `./export-vars.sh`
            - You'll get 5 environment variables exported
    - Now, all cdk commands would use the temporary credentials exported as env vars
    - Execute cdk commands as you would normally.


# Build & Deployment flow:
- Run: `source ./export-vars.sh`
    - This would export temporary credentials for admin-role in sandbox account
    - These credentials will be used to interact with AWS services
    - It would also export the name of the bucket the templates will be uploaded to
- Build: `npm run build`
- Generate product templates: `npm run synth:products`
    - This generates the cfn templates of all the products and stores them in this folder `product-templates` under root
- Upload the generated templates to s3 bucket: `./upload-to-s3.sh`
- Deploy service catalog portfolios and products: `npm run deploy:catalog`
