# syntax=docker/dockerfile:1

FROM node:18.12.0

WORKDIR /app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV NODE_ENV=production
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max-old-space-size=7000

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# RUN echo "fs.inotify.max_user_watches=524288" >> /etc/sysctl.conf

COPY ["package.json", "yarn.lock", "index.html",  "tsconfig.json", "tsconfig.node.json", "vite.config.ts", "./"]

RUN yarn

ENTRYPOINT ["/entrypoint.sh"]

COPY . .