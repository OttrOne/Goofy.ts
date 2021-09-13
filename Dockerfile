FROM node:alpine AS BUILD_IMAGE

# install node-prune
RUN apk update && apk add curl bash && rm -rf /var/cache/apk/* && curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /usr/src/lexbot

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

# remove dev dependencies
RUN npm prune --production

# run node-prune
RUN /usr/local/bin/node-prune

FROM node:alpine

WORKDIR /usr/src/lexbot

RUN apk update && apk add ffmpeg && rm -rf /var/cache/apk/*

COPY package.json ./
RUN npm install --production
COPY --from=BUILD_IMAGE /usr/src/lexbot/dist ./dist

CMD [ "node", "dist/index.js" ]
