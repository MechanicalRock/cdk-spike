#! /bin/bash
# The product templates are stored in folder named: 'product-templates'
aws s3 sync product-templates s3://$PRODUCT_TEMPLATES_S3_BUCKET_NAME --delete