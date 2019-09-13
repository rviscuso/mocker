FROM mhart/alpine-node

COPY src/ package.json /app/

WORKDIR /app

RUN npm install

CMD ["node", "server"]