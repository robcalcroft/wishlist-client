FROM node:4
WORKDIR /wishlist
RUN npm i -g yarn
COPY package*.json ./
RUN yarn
COPY . .
CMD ["yarn", "start-prod"]
EXPOSE 8001
