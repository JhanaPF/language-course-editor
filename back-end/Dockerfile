FROM node:14

RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . /opt/app/
RUN npm install -g node-pre-gyp
RUN npm ci
COPY . .
CMD ["npm", "start"]
EXPOSE 3001

