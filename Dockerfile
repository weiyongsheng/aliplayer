FROM node:12-slim

RUN apt-get update && \
apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget && \
wget https://github.com/Yelp/dumb-init/releases/download/v1.2.1/dumb-init_1.2.1_amd64.deb && \
dpkg -i dumb-init_*.deb && rm -f dumb-init_*.deb && \
apt-get clean && apt-get autoremove -y && rm -rf /var/lib/apt/lists/*

RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser

# Set language to UTF8
ENV LANG="C.UTF-8"

WORKDIR /app

COPY . .

# Add user so we don't need --no-sandbox.
RUN npm i \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

# Run everything after as non-privileged user.
USER pptruser

# --cap-add=SYS_ADMIN
# https://docs.docker.com/engine/reference/run/#additional-groups

ENTRYPOINT ["dumb-init", "--"]

EXPOSE 3000

# CMD ["/usr/local/share/.config/yarn/global/node_modules/puppeteer/.local-chromium/linux-526987/chrome-linux/chrome"]

CMD ["npm", "start"]