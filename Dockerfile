FROM mhart/alpine-node

COPY src/ package.json /app/
COPY node_modules /app/node_modules

WORKDIR /app

RUN npm install

CMD ["node", "server"]