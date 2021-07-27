
# Stage 1

FROM node:12.19.0 as build-step

RUN mkdir -p /app
# set working directory

WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install and cache app dependencies

COPY package.json /app

RUN npm install
# add app

COPY . /app


# run on prod mode 
RUN npm run build --prod

 

# Stage 2
FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist /usr/share/nginx/html