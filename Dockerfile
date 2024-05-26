ARG NODE_VERSION=21-alpine
FROM node:${NODE_VERSION} as builder

WORKDIR /code
COPY package.json /code/
COPY yarn.lock /code/

RUN --mount=type=bind,source=src,target=/code/src \
  --mount=type=bind,source=tsconfig.json,target=/code/tsconfig.json \
  --mount=type=bind,source=vite.config.ts,target=/code/vite.config.ts \
  --mount=type=bind,source=tsconfig.json,target=/code/tsconfig.json \
  --mount=type=bind,source=tsconfig.node.json,target=/code/tsconfig.node.json \
  --mount=type=bind,source=public,target=/code/public \
  --mount=type=bind,source=index.html,target=/code/index.html \
  yarn add typescript && yarn install && yarn build && yarn cache clean

FROM node:${NODE_VERSION} as final

# create simple user
ARG UID=10001
RUN adduser \
  --disabled-password \
  --gecos "" \
  --home "/nonexistent" \
  --shell "/sbin/nologin" \
  --no-create-home \
  --uid "${UID}" \
  appuser
USER appuser

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
# copy binaries
COPY --chown=appuser:appuser --from=builder /dist/* /app
# expose port
EXPOSE 3000

CMD ["yarn", "preview", "-p 3000"]





