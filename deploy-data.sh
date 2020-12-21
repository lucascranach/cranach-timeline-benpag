buckets=`aws s3 ls`
name='cranach-data'
#element=`aws s3 ls s3://test`
echo $buckets
echo $name
#echo $element

#case $BRANCH_NAME in
case $name in

  *"$buckets"*)
    echo -n "It's there."
    ;;
esac

#aws s3 cp backend/data s3://cranach-data-$BRANCH_NAME --recursive --acl public-read