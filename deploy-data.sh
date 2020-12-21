buckets=`aws s3 ls`
#element=`aws s3 ls s3://test`
echo $buckets
#echo $element
if [[ $buckets == *$BRANCH_NAME* ]]; then
    echo "ja"
fi

#aws s3 cp backend/data s3://cranach-data-$BRANCH_NAME --recursive --acl public-read