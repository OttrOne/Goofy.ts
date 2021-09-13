FROM node:alpine AS BUILD_IMAGE

# install node-prune
RUN apk update && apk add curl bash && rm -rf /var/cache/apk/* && curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /usr/src/lexbot

COPY package.json ./

RUN npm install

COPY . .

# remove dev dependencies
RUN npm prune --production

# run node-prune
RUN /usr/local/bin/node-prune

FROM node:latest

WORKDIR /usr/src/lexbot

RUN apt update && apt install python ffmpeg -y

COPY --from=BUILD_IMAGE /usr/src/lexbot .

CMD [ "node", "index.js" ]
