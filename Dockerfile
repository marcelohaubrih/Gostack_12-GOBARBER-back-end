FROM node:13-alpine as build

# RUN mkdir -p /home/node/api && chown -R node:node /home/node/api

WORKDIR /home/node/api

ENV PATH /home/node/api/node_modules/.bin:$PATH

COPY package.json yarn.* ./

RUN yarn

COPY . /home/node/api

EXPOSE 3333

CMD ["yarn", "dev:server"]