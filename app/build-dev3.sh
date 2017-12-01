set -e

npm install -g npm
cd app
npm install
export PUBLIC_URL=https://content-dev3.fameandgroups.com/
echo $PUBLIC_URL
npm run build
echo 'build it...and they will come'