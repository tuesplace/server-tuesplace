# tuesplace Server

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

Трябва да върне 8.0.0

## Подкарване на сървъра

Създаваш файл наиме .env и копираш в него съдържанието на един файл, кой трябва да ти пратя

След това

```bash
npm install
npm run devStart
```

Вече би трябвало да се е пуснал nodemon-a и да виждаш "Server running on port 8888"

## Описание на Route-ове -> техните нужни данни и каква информация връщат (в response при success = true)

(( post )) = (( authorId, body, likes, createdAt ))
METHOD URL -> headers | body | default respone

1. Auth
   POST /api/auth/sign-up -> | fullName, email, password, passwordConfirm in body | accessToken, refreshToken, userId
   POST /api/auth/sign-in -> email, password in body | | accessToken, refreshToken, userId
   POST /api/auth/generate-access-token -> | refreshToken in body | accessToken, refreshToken

2. Profile
   POST /api/profile/edit-profile -> authorization header | fullName, email, password | fullName, email, emailVerified
   DELETE /api/profile/delete-profile -> authorization header & 'young' refresh token | | deletedProfile

3. Post
   GET /api/post/get-posts -> | | all posts (( post ))  
   POST /api/post/create-post -> authorization header | body | post (( post ))  
   PATCH /api/post/edit-post -> authorization header | postId, body | post (( post ))
   DELETE /api/post/delete-post -> authorization header | postId |
