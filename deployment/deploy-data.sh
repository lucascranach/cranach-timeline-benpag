buckets=`aws s3 ls`
bucketname=data-${BRANCH_NAME////-}

if ! grep -q "$bucketname" <<< "$buckets"; then
 echo "Data bucket not there, new is one created"
 aws s3 mb s3://$bucketname
 aws s3api put-bucket-cors --bucket $bucketname --cors-configuration '{"CORSRules": [{ "AllowedOrigins": ["*"], "AllowedMethods": ["GET"]}]}'
fi
aws s3 ls --summarize
aws s3 cp backend/data s3://$bucketname --recursive --acl public-read