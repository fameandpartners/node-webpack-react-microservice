set -e

npm install -g npm
cd app
npm install
export PUBLIC_URL=https://content.fameandgroups.com/
export CLOUDFRONT_BASE_PATH=https://d1msb7dh8kb0o9.cloudfront.net/
echo $PUBLIC_URL
npm run build
echo 'build it...and they will come'