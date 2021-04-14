FROM node:12-alpine

RUN npm install -g nodemon

# Create app directory
RUN mkdir -p /app
WORKDIR /app

COPY app/package*.json ./

# Bundle app source
COPY app/ .

RUN npm install

# Exports
EXPOSE 3000
CMD [ "nodemon" ]