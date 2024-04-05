FROM node:20-alpine

WORKDIR /srv/

COPY . .

# Get deps
RUN npm install --force

# Build client in container
RUN npm run build

# Start server and start serving!
CMD ["node", "server/server.js"]
