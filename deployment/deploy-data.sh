buckets=`aws s3 ls`
branchname=${BRANCH_NAME////-}
bucketname=data-${branchname,,}

if ! grep -q "$bucketname" <<< "$buckets"; then
 echo "Data bucket not there, new is one created"
 aws s3 mb s3://$bucketname
 aws s3api put-bucket-cors --bucket $bucketname --cors-configuration '{"CORSRules": [{ "AllowedOrigins": ["*"], "AllowedMethods": ["GET"]}]}'
fi

aws s3 cp backend/data s3://$bucketname --recursive --acl public-read --cache-control no-cache
