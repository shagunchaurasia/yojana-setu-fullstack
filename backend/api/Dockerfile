FROM node:12
RUN mkdir -p /user/src/app
WORKDIR /user/src/app
COPY ./package.json ./
COPY . ./
RUN npm install --quiet
# RUN npm run build:prod
EXPOSE 2000
# ENTRYPOINT ["node", "build/index.js"]
CMD ["npm", "run","dev"]

