buckets=`aws s3 ls`
bucketname=frontend-${BRANCH_NAME////-}

if ! grep -q "$bucketname" <<< "$buckets"; then
 echo "Frontend branch not there, new is one created"
 aws s3 mb s3://$bucketname
fi

aws s3 website s3://$bucketname --index-document index.html
aws s3 cp frontend/dist s3://$bucketname --recursive --acl public-read