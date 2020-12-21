buckets=`aws s3 ls`
bucketname=${BRANCH_NAME//[/]/-}
echo bucketname

if ! grep -q "$bucketname" <<< "$buckets"; then
 echo "Backend branch not there, new is one created"
 aws s3 mb s3://cranach-data-$bucketname
fi

aws s3 cp backend/data s3://cranach-data-$bucketname --recursive --acl public-read