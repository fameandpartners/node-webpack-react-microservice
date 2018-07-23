FROM node:8.11 as build-env
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build
RUN npm install --production


# build runtime image
FROM node:8.11-alpine
WORKDIR /app

ARG CIRCLE_SHA1
ENV CIRCLE_SHA1 $CIRCLE_SHA1
ARG CIRCLE_BRANCH
ENV CIRCLE_BRANCH $CIRCLE_BRANCH
ARG CIRCLE_BUILD_NUM
ENV CIRCLE_BUILD_NUM $CIRCLE_BUILD_NUM

EXPOSE 8001
COPY --from=build-env /app/ .
ENTRYPOINT ["node", "server.js"]
