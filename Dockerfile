FROM node:16.13.0 as build

WORKDIR /usr/src/app

COPY . .

RUN yarn install
RUN yarn build

RUN npm prune --production

EXPOSE 3000

CMD ["yarn", "dev"]