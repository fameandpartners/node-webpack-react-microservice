## Fame and Partners Frontend Microservice

### Getting Started
To start developing run `npm dev`. This should open a local server on port 3000 and generate the application. Since we are using webpack, we have CSS/JS hot reloading. Changes should be pushed to the browser.

To test a production build run `npm run production`. This will create a build (minified, uglified) and start a simple Node.js server. POST requests with `data` to `:8001/pdp` will be converted into JSON props. The request should return static markup with external CSS and JS Build files reflecting the passed props.

#### How to get the Microservice running
_Note: Fame website and the Frontend Microservice are run side by side._

1. In your `.env` file from the Fame website repo _(not this repo)_ add this line `NODE_CONTENT_URL='http://localhost:8001'` and save it;
1. Clone this repo locally _(but not inside your Fame website repo folder)_;
1. In your terminal go to the microservice repo and enter the `app` folder;
1. Run `npm install` to get all dependencies;
1. Run `npm run dev` to start it.

### Dev Guides

- [CSS](/dev_guides/css_styleguide.md)
