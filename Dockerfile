FROM node:8.16.2 as builder

COPY . /opt
WORKDIR /opt

RUN npm install yarn
RUN yarn install
RUN yarn release

FROM nginx:1.17.4-alpine

COPY --from=builder /opt/docs /usr/share/nginx/html
RUN chmod -R ugo+rw /usr/share/nginx/html
