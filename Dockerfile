FROM node:11.7.0

MAINTAINER Rodrigo Villarreal <whatsup@rodrigovillarreal.mx>

EXPOSE 5000

ENV NODE_ENV production

COPY . /var/www/html

WORKDIR /var/www/html

RUN npm i && npm install -g serve #&& npm run build

CMD serve -s build
