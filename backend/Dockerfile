FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY server.js ./
# Pasta onde o backend guarda os emails enviados (o volume herda este dono)
RUN mkdir -p /app/storage && chown node:node /app/storage
ENV NODE_ENV=production
EXPOSE 3000
USER node
CMD ["node", "server.js"]
