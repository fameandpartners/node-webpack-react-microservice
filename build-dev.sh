set -e

npm install -g npm
cd app
npm install
npm run build
echo 'build it...and they will come'
