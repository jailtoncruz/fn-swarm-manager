FROM node:18-alpine as build-stage
WORKDIR /function
COPY .npmrc .
COPY package.json .
RUN npm install --omit-dev
RUN rm .npmrc

FROM node:18-alpine
WORKDIR /function
COPY package.json .
COPY --from=build-stage /function/node_modules/ /function/node_modules/
ADD dist/ .
COPY .oci /home/node/.oci
ENTRYPOINT node fn-entrypoint.js