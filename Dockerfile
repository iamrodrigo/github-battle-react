FROM node:11.7.0

MAINTAINER Rodrigo Villarreal <whatsup@rodrigovillarreal.mx>

EXPOSE 5000

ENV NODE_ENV production

WORKDIR /var/www/html

RUN npm install -g serve

CMD ./init.sh && serve -s build
