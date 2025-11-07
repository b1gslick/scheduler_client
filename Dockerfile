ARG NODE_VERSION=22-alpine
ARG NGINX_CONFIG_PATH=nginx.conf
FROM node:${NODE_VERSION} AS builder


WORKDIR /code
COPY package.json yarn.lock /code/

ARG NGINX_CONFIG_PATH
ARG BACKEND_ROUTE
ENV VITE_BACKEND_ROUTE=$BACKEND_ROUTE

RUN --mount=type=bind,source=src,target=/code/src \
  --mount=type=bind,source=tsconfig.json,target=/code/tsconfig.json \
  --mount=type=bind,source=vite.config.ts,target=/code/vite.config.ts \
  --mount=type=bind,source=tsconfig.json,target=/code/tsconfig.json \
  --mount=type=bind,source=tsconfig.node.json,target=/code/tsconfig.node.json \
  --mount=type=bind,source=public,target=/code/public \
  --mount=type=bind,source=index.html,target=/code/index.html \
  yarn add typescript && yarn install && yarn build && yarn cache clean


FROM nginx:1.28.0-alpine AS final

ARG NGINX_CONFIG_PATH

ARG UID=10001
RUN adduser appuser \
  --disabled-password

RUN touch /run/nginx.pid && \
    chown -R appuser:appuser /var/cache/nginx && \
    chown -R appuser:appuser /run/nginx.pid

USER appuser

WORKDIR /app

COPY --chown=appuser:appuser ${NGINX_CONFIG_PATH} /etc/nginx/conf.d/default.conf
COPY --chown=appuser:appuser --from=builder /code/dist/ /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]
