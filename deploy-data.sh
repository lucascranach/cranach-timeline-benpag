branchname = env.BRANCH_NAME
echo branchname
aws s3 cp backend/data s3://cranach-data-$branchname --recursive --acl public-read