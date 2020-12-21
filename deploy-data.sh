buckets=`aws s3 ls`
bucketname=cranach-data-${BRANCH_NAME////-}

if ! grep -q "$bucketname" <<< "$buckets"; then
 echo "Data branch not there, new is one created"
 aws s3 mb s3://$bucketname
fi

aws s3 cp backend/data s3://$bucketname --recursive --acl public-read