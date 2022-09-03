FROM node:17-alpine

RUN mkdir -p /home/app

COPY ./app /home/app

WORKDIR /home/app/src

RUN npm i

CMD ["node","index.js"]