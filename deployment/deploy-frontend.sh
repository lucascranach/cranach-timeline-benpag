buckets=`aws s3 ls`
branchname=${BRANCH_NAME////-}
branchname=${branchname//[#\$\+\*\!\\\(\)\[\]\{\}\?\"\']/}
bucketname=cranach-${branchname,,}

echo $buckets

if ! grep -q "$bucketname" <<< "$buckets"; then
 echo "Frontend bucket not there, new is one created"
 aws s3 mb s3://$bucketname
fi

aws s3 website s3://$bucketname --index-document index.html
aws s3 cp frontend/dist s3://$bucketname --recursive --acl public-read --cache-control no-cache
