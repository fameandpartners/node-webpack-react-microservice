set -e

npm install -g npm
cd app
npm install
cd src
cd shopping-spree
npm install
export PUBLIC_URL=https://content-dev.fameandgroups.com/
export CLOUDFRONT_BASE_PATH=https://dekbm9314em3c.cloudfront.net/
echo $PUBLIC_URL
cd ../..
npm run build
echo 'build it...and they will come'
