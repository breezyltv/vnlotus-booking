FROM node:14-alpine3.10

LABEL version="1.0"
LABEL description="Production image for the Library MERN API"

WORKDIR /app

COPY ["package.json","package-lock.json*","npm-shrinkwrap.json*", "./"]

# argon2-ffi dependencie require python to work
RUN apk add --update python3 make g++\
    && rm -rf /var/cache/apk/*

RUN yarn install

COPY . .

CMD [ "npm", "run", "start" ]