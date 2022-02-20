# Prospect Server

## Инсталиране на нужното

Инсталиране на nvm (Node Version Manager) за Windows`https://dev.to/skaytech/how-to-install-node-version-manager-nvm-for-windows-10-4nbi`

```bash
nvm install 14.18.0
nvm use 14.18.0
```

```bash
npm install npm@8.0.0 -g
```

Всеки editor става, но препоръчвам Visual Studio Code

Може и някакъв Git GUI, от сорта на GitHub Desktop или Sourcetree

### Тестване на node и npm версиите

```bash
node -v
```

Трябва да върне 14.18.0

```bash
npm -v
```

Трябва да ви върне 8.0.0

## Подкарване на сървъра

Създавате файл наиме .env и копирате в него съдържанието на един файл, който ще съм пратил в it-channel

След това

```bash
npm install
npm run devStart
```

Вече би трябвало да ви се е пуснал nodemon-a и да виждате "Server running on port 8888"

## Описание на Route-ове -> техните нужни данни и каква информация връщат (в response при success = true)

METHOD URL -> headers | body | default respone

1. Auth
   POST /sign-up -> | fullName, email, password, passwordConfirm in body | accessToken, refreshToken, userId
   POST /sign-in -> email, password in body | | accessToken, refreshToken, userId
   POST /validate-token -> authorization header | userId |
   POST /generate-access-token -> | refreshToken in body | accessToken, refreshToken

2. Profile
   POST /edit-profile -> authorization header | fullName, email, profilePic, password, interests, workPlace, cv, role in body | fullName, email, profilePic, password, interests, workPlace, cv, role, emailVerified
   DELETE /delete-profile -> authorization header & 'young' refresh token | | deletedProfile
