ARG NODE_VERSION=21-alpine
FROM node:${NODE_VERSION} as builder

WORKDIR /code
COPY package.json yarn.lock /code/

RUN --mount=type=bind,source=src,target=/code/src \
  --mount=type=bind,source=tsconfig.json,target=/code/tsconfig.json \
  --mount=type=bind,source=vite.config.ts,target=/code/vite.config.ts \
  --mount=type=bind,source=tsconfig.json,target=/code/tsconfig.json \
  --mount=type=bind,source=tsconfig.node.json,target=/code/tsconfig.node.json \
  --mount=type=bind,source=public,target=/code/public \
  --mount=type=bind,source=index.html,target=/code/index.html \
  yarn add typescript && yarn install && yarn build && yarn cache clean

FROM node:${NODE_VERSION} as final

RUN npm install --global serve@14

ARG UID=10001
RUN adduser appuser \
  --disabled-password

USER appuser

WORKDIR /app

# copy binaries
COPY --chown=appuser:appuser --from=builder /code/dist/ /app/


# expose port
EXPOSE 80

CMD ["serve", "/app", "-l", "80"]





