# Dockerfile
FROM node:10-slim

RUN apt-get update -y && \
  apt-get install ca-certificates \
  gconf-service \
  libasound2 \
  libatk1.0-0 \
  libatk1.0-0 \
  libdbus-1-3 \
  libgconf-2-4 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxss1 \
  libxtst6 \
  fonts-liberation \
  libappindicator3-1 \
  xdg-utils \
  lsb-release \
  procps \
  wget \
  curl \
  xz-utils -y --no-install-recommends && \
  wget https://dl.google.com/linux/direct/google-chrome-unstable_current_amd64.deb && \
  dpkg -i google-chrome*.deb && \
  apt-get install -f && \
  apt-get clean autoclean && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* google-chrome-unstable_current_amd64.deb

# Workspace
ENV WORKSPACE /app
RUN mkdir -p $WORKSPACE
WORKDIR $WORKSPACE

# Create app directory
ADD package.json $WORKSPACE
ADD yarn.lock $WORKSPACE
RUN yarn install
COPY . $WORKSPACE

CMD ["yarn", "test:e2e"]