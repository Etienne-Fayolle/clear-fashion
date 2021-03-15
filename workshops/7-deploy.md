# 🚀 Step 7 - Deploy your Web application

> How to give access to anyone

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [🎯 Objective](#-objective)
- [🏗 Prerequisites](#%F0%9F%8F%97-prerequisites)
- [👩‍💻 Just tell me what to do](#%E2%80%8D-just-tell-me-what-to-do)
- [🚀 How to deploy with Vercel](#-how-to-deploy-with-vercel)
  - [The API](#the-api)
    - [Create a vercel.json file to configure the api deployment](#create-a-verceljson-file-to-configure-the-api-deployment)
    - [Deploy with the cli](#deploy-with-the-cli)
  - [The client](#the-client)
- [📦 Suggested node modules](#-suggested-node-modules)
- [🛣️ Related Theme and courses](#-related-theme-and-courses)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## 🎯 Objective

**Deploy your server and client application in Production with [Vercel](https://vercel.com/)...**

## 🏗 Prerequisites

1. Be sure **to have a clean working copy**.

This means that you should not have any uncommitted local changes.

```sh
❯ cd /path/to/workspace/clear-fashion
❯ git status
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean
```

2. **Pull** the `master` branch to update your local with the new remote changes

```sh
❯ git remote add upstream git@github.com:92bondstreet/clear-fashion.git
## or ❯ git remote add upstream https://github.com/92bondstreet/clear-fashion
❯ git fetch upstream
❯ git pull upstream master
```

## 👩‍💻 Just tell me what to do

1. **Create a free [Vercel](https://vercel.com) account**

2. **Deploy your API** with Vercel

For instance the [server/api.js](../server/api.js) is deployed to [https://server-ashy.vercel.app](https://server-ashy.vercel.app)

3. **Update your [client](../client) codebase to fetch products from your API**

```js
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://server-ashy.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    ....
  } catch (error) {
    ...
  }
};
```

**You probably need to update your codebase.**

4. **Deploy your [client](../client) application** with Vercel

For instance the [client](../client) is deployed to [https://client-blush-iota.vercel.app/](https://client-blush-iota.vercel.app/)

5.  **Commit your modification**

```sh
❯ cd /path/to/workspace/clear-fashion
❯ git add -A && git commit -m "feat(get-product): get a specific product"
```

([why following a commit message convention?](https://dev.to/chrissiemhrk/git-commit-message-5e21)

6. Complete the spreadsheet file with your API and client application url

7. **Commit early, commit often**
8. Don't forget **to push before the end of the workshop**

```sh
❯ git push origin master
```

**Note**: if you catch an error about authentication, [add your ssh to your github profile](https://help.github.com/articles/connecting-to-github-with-ssh/).

If you need some helps on git commands, read [git - the simple guide](http://rogerdudler.github.io/git-guide/)

## 🚀 How to deploy with Vercel

### The API

#### Create a [vercel.json](../server/vercel.json) file to configure the api deployment

```json
{
  "version": 2,
  "builds": [{"src": "*.js", "use": "@now/node"}],
  "routes": [{"src": "/", "dest": "api.js"}]
}
```

More details with

* [Using Express.js with Vercel](https://vercel.com/guides/using-express-with-vercel)
* [different ways of configuring your Vercel projects and Vercel CLI](https://vercel.com/docs/configuration)

#### Deploy with the cli

```sh
❯ cd /path/to/workspace/clear-fashion/server
❯ vercel --prod
```

<img src="./img/7-vercel-cli.png"/>

You could check your deployment with Insomnia.

<img src="./img/7-vercel-insomnia.png"/>


### The client

```sh
❯ cd /path/to/workspace/clear-fashion/client
❯ vercel --prod
```

<img src="./img/7-vercel-client-cli.png"/>


## 📦 Suggested node modules

- [paginate-info](https://www.npmjs.com/package/paginate-info) - A simple module to paginate your arrays and calculate limit and offset

## 🛣️ Related Theme and courses

* 📡 [Theme 3 - About Serverless](https://github.com/92bondstreet/javascript-empire/blob/master/themes/3.md#about-serverless)
