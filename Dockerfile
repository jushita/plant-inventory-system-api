FROM node:12
RUN apt-get update && apt-get install zip
WORKDIR /usr/src/app
COPY packag*.json ./
RUN npm install
COPY . .

RUN npm run build
ENV TABLE plants
EXPOSE 3000
CMD ["node", "dist/app-local"]
