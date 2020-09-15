FROM node:12
RUN mkdir -p /user/src/app
WORKDIR /user/src/app
COPY ./package.json ./
COPY . .
RUN npm install --quiet
# RUN npm run build
EXPOSE 3000

# ENTRYPOINT ["serve", "-s", "build", "-p", "5000"]
CMD ["npm", "start"]
