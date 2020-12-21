aws s3 website s3://cranach-frontend --index-document index.html
aws s3 cp frontend/dist s3://cranach-frontend --recursive --acl public-read