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
Какво прави METHOD URL -> headers | body | default respone <- Какво прави

1. Auth
   POST /api/auth/sign-up -> | fullName, email, password, passwordConfirm in body | accessToken, refreshToken, userId <- Sign-Up
   POST /api/auth/sign-in -> email, password in body | | accessToken, refreshToken, userId <- Sign-In
   POST /api/auth/generate-access-token -> | refreshToken in body | accessToken, refreshToken <- Generate-Access-Token

2. Profile
   POST /api/profile/edit-profile -> authorization header | fullName, email, password | fullName, email, emailVerified <- Edit-Profile
   DELETE /api/profile/delete-profile -> authorization header & 'young' refresh token | | deletedProfile <- Delete-Profile

3. Post
   GET /api/group-posts/:groupId/post -> authorization header | page, limit as query params (optional) | all posts (( post )) <- Get-All-Posts-From-Group
   POST /api/group-posts/:groupId/post -> authorization header | body | (( post )) <- Create-Post-In-Group
   PUT /api/group-posts/:groupId/post/:postId -> authorization header | <- Edit-Post
   PATCH /api/group-posts/edit-post -> authorization header | postId, body | (( post )) <- Like-Post
   DELETE /api/group-posts/delete-post -> authorization header | postId | <- Delete-Post

4. Group
   GET /:groupId" -> authorization header | | ((group)) <- Get-Group
   POST / -> authorization header | groupName, teachers, allowedClasses | ((group)) <- Create-Group
   PUT /:groupId -> authorization header | groupName, teachers, allowedClasses | ((group)) <- Edit-Group
   DELETE /:groupId -> authorization header | | | <- Delete-Group
