set -e

npm install -g npm
cd app
npm install
set PUBLIC_URL=https://content-dev.fameandgroups.com/
echo $PUBLIC_URL
npm run build
echo 'build it...and they will come'
