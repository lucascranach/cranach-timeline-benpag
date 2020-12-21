
buckets=`aws s3 ls`
name='cranach-data'
#element=`aws s3 ls s3://test`
echo $buckets
echo $name
#echo $element

if grep -q "$name" <<< "$buckets"; then
 echo "It's there"
fi

#aws s3 cp backend/data s3://cranach-data-$BRANCH_NAME --recursive --acl public-read