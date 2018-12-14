### STAGE 1: Build Environment ###

# Base image as "builder"
FROM node:10-alpine as builder

# install chrome for protractor tests
#RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
#RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
#RUN apt-get update && apt-get install -yq google-chrome-stable

# Working directory
RUN mkdir /ng-app
WORKDIR /ng-app

# add /ng-app/node_modules/.bin to $PATH
ENV PATH /ng-app/node_modules/.bin:$PATH

# App dependencies
COPY package.json /ng-app/package.json
RUN npm install
RUN npm install -g @angular/cli@7.0.5 --unsafe

# Add application
COPY . /ng-app

# Run tests
#RUN ng test --watch=false

# Generate build
# RUN npm run build
RUN $(npm bin)/ng build --prod --build-optimizer

#COPY package*.json ./

#RUN npm set progress=false && npm config set depth 0 && npm cache clean --force
#RUN npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
#RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

#WORKDIR /ng-app

#COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
#RUN $(npm bin)/ng build --prod --build-optimizer


### STAGE 2: Production ###

FROM nginx:1.13.3-alpine

## Copy our default nginx config
#COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## Copy artifcat build from the build environment
COPY --from=builder /ng-app/dist/customer /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
