set -e

npm install -g npm
cd app
npm install
export PUBLIC_URL=https://content-dev3.fameandgroups.com/
export CLOUDFRONT_BASE_PATH=https://dekbm9314em3c.cloudfront.net/
echo $PUBLIC_URL
npm run build
echo 'build it...and they will come'
