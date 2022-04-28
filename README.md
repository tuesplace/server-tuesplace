# tuesplace Server

[![wakatime](https://wakatime.com/badge/github/tuesplace/server-tuesplace.svg)](https://wakatime.com/badge/github/tuesplace/server-tuesplace)

## Инсталиране на нужното

Инсталиране на nvm (Node Version Manager) за Windows`https://dev.to/skaytech/how-to-install-node-version-manager-nvm-for-windows-10-4nbi`

```bash
nvm install 18.0.0
nvm use 18.0.0
```

```bash
npm install npm@8.6.0 -g
```

Всеки editor става, но препоръчвам Visual Studio Code

Може и някакъв Git GUI, от сорта на GitHub Desktop или Sourcetree

### Тестване на node и npm версиите

```bash
node -v
```

Трябва да върне 18.0.0

```bash
npm -v
```

Трябва да върне 8.6.0

## Подкарване на сървъра

Създаваш файл наиме .env и копираш в него съдържанието на един файл, кой трябва да ти пратя

След това

```bash
npm install
npm run start:dev
```
