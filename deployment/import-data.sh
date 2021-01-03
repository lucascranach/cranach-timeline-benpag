branchname=${BRANCH_NAME////-}
bucketname=cranach-data-${branchname,,}
sevendaysago=`date --date="$1 day ago" +%s`
buckets=`aws s3 ls`

cd backend
npm install

if ! grep -q "$bucketname" <<< "$buckets";
 then npm run import
elif aws s3api head-object --bucket $bucketname --key paintings_en.json --if-unmodified-since $sevendaysago
  then npm run import
fi
