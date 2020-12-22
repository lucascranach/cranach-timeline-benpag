cd backend
#npm install
sevendaysago=`date --date="$1 day ago" +%s`

if aws s3api head-object --bucket data-feature-continuous-integration --key historyEvents_en.json --if-unmodified-since $sevendaysago
  then npm run import
fi