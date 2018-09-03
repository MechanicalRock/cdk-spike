export class BasePathBuilder {
    static bucketName = process.env.PRODUCT_TEMPLATES_S3_BUCKET_NAME;

    static build(): string {
        return "https://" + this.bucketName + ".s3.amazonaws.com/";
    }
}



