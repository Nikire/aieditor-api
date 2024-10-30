FROM node:18

ARG API_PORT

ENV API_PORT=${API_PORT}

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE ${API_PORT}

CMD ["yarn", "start"]