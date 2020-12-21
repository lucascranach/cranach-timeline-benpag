if [ aws s3 ls == *$BRANCH_NAME* ]
then
echo "ja"

fi

#aws s3 cp backend/data s3://cranach-data-$BRANCH_NAME --recursive --acl public-read