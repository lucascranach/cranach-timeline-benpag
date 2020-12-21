buckets=`aws s3 ls`

if ! grep -q "$BRANCH_NAME" <<< "$buckets"; then
 echo "Backend branch not there, new is one created"
 aws s3 mb s3://cranach-data-$BRANCH_NAME
fi

aws s3 cp backend/data s3://cranach-data-$BRANCH_NAME --recursive --acl public-read