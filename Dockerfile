# Base layer
# ===============================
FROM node:16 AS node

ARG NPM_TOKEN=""
ARG INIT_SRC=/usr/local/bin/dumb-init
ARG INIT_REPO=https://github.com/Yelp/dumb-init

ENV NPM_TOKEN="$NPM_TOKEN"

RUN wget -O $INIT_SRC "$INIT_REPO/releases/download/v1.2.2/dumb-init_1.2.2_amd64" && \
    chmod +x $INIT_SRC && \
    mkdir /app && chown node:node /app

WORKDIR /app
USER node
EXPOSE 9001

# Manifest Cache Layer
# ===============================
FROM node AS cache
COPY --chown=node:node . /tmp

# save yarn.lock and package.json files in the cache layer
RUN mkdir /tmp/cache && \
    find /tmp -type f \
      \( -name "yarn.lock" -o -name "package.json" \) \
      -exec cp --parents "{}" /tmp/cache \;

# Build Layer
# ===============================
FROM cache AS build
COPY --chown=node:node --from=cache /tmp/cache/* .
COPY .npmrc .npmrc
RUN yarn
RUN rm -rf .npmrc
COPY --chown=node:node . .

# Development Image
# ===============================
FROM build AS development

ENTRYPOINT ["./node_modules/.bin/nodemon"]
CMD ["index.js"]

# Test Image
# ===============================
FROM build AS test

RUN yarn run lint && \
    yarn run test

# Final production image
# ===============================
FROM test AS production

RUN rm -fr node_modules && \
    yarn install --production --frozen-lockfile

ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]
CMD ["node", "index.js"]
