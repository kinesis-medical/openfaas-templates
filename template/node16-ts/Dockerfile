FROM --platform=${TARGETPLATFORM:-linux/amd64} ghcr.io/openfaas/of-watchdog:0.9.2 as watchdog

##
# stage: BASE
##
FROM --platform=${TARGETPLATFORM:-linux/amd64} node:16-alpine as base

ARG TARGETPLATFORM
ARG BUILDPLATFORM

COPY --from=watchdog /fwatchdog /usr/bin/fwatchdog
RUN chmod +x /usr/bin/fwatchdog

RUN apk --no-cache add curl ca-certificates \
    && addgroup -S app && adduser -S -g app app

# Turn down the verbosity to default level.
ENV NPM_CONFIG_LOGLEVEL warn

RUN chmod 777 /tmp

RUN mkdir -p /home/app/function && chown app:app /home/app/function
USER app

WORKDIR /home/app

##
# stage: BUILD
##
FROM base as dependencies
WORKDIR /home/app/function
COPY function/package*.json ./
RUN npm ci --only=production
# side copy the production node_modules folder for release use
RUN cp -R node_modules prod_node_modules
# now also install the devDependencies
RUN npm ci



##
# stage: BUILD
##
FROM base as build
WORKDIR /home/app/function
# COPY function files and folders
COPY function/ ./
COPY --from=dependencies /home/app/function/node_modules ./node_modules
RUN npm run build



##
# stage: RELEASE
##
FROM base as release

# Wrapper/boot-strapper

# This ordering means the npm installation is cached for the outer function handler.
# RUN npm i

# Copy outer function handler
COPY index.js ./

# COPY function node packages and install, adding this as a separate
# entry allows caching of npm install

WORKDIR /home/app
COPY function/package*.json ./
COPY function/tsconfig.json ./
COPY --from=build /home/app/function/dist/function ./
COPY --from=dependencies /home/app/function/prod_node_modules ./node_modules

# Run any tests that may be available
# RUN npm test

# Set correct permissions to use non root user
WORKDIR /home/app/

ENV cgi_headers="true"
ENV fprocess="npm start"
ENV mode="http"
ENV upstream_url="http://127.0.0.1:3000"

ENV exec_timeout="10s"
ENV write_timeout="15s"
ENV read_timeout="15s"

ENV prefix_logs="false"

HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1

CMD ["fwatchdog"]
