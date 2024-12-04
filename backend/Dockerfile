ARG BASE_IMAGE=node:20

FROM ${BASE_IMAGE} AS installer

WORKDIR /app
RUN corepack enable yarn
RUN yarn set version berry

COPY ./yarn.lock .
COPY ./.yarnrc.yml .
COPY ./package.json .
RUN yarn install

# Build the project and its dependencies
COPY . .
RUN yarn build 

FROM ${BASE_IMAGE} AS runner
WORKDIR /app
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable 
RUN yarn set version berry
RUN corepack prepare yarn@4.5.3 --activate

ENV NODE_ENV=production

# Don't run production as root
RUN addgroup --system --gid 1001 medusa
RUN adduser --system --uid 1001 --home /home/medusa medusa
USER medusa
COPY --from=installer --chown=medusa:medusa /app .

EXPOSE 9000

CMD ["scripts/prod.sh"]
