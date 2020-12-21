buckets=`aws s3 ls`
#element=`aws s3 ls s3://test`
echo $buckets
#echo $element

case $BRANCH_NAME in

  *"$buckets"*)
    echo -n "It's there."
    ;;
esac

#aws s3 cp backend/data s3://cranach-data-$BRANCH_NAME --recursive --acl public-read