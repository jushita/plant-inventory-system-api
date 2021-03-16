FROM node:12 as build
RUN apt-get update && apt-get install zip
WORKDIR /usr/src/app
COPY packag*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:12-alpine

WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules

ENV TABLE plants
EXPOSE 3000
CMD ["node", "app-local.js"]
