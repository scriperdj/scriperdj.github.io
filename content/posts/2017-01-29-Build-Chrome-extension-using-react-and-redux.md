---
title: "Building Chrome extension using React.js, Redux and Gulp automation"
date: "2017-01-29"
categories: ["Javascript", "Nodejs"]
---

Building extension for Google Chrome is no different from building javascript application. The official documentation page provides a [simple example](https://developer.chrome.com/extensions/getstarted) which is nothing but a popup which searches image from Google for the active tab.

The example is so old that the Google search api used in the sample is no more available. Modern javascript ecosystem is so huge and has many tools which helps in building solid javascript applications. In this post, I intend to show how make use of [React](https://github.com/facebook/react) with [Redux](http://redux.js.org/docs/introduction/) to build Chrome extension.

In real world, we often face complex usecases where simple javascript is not enough. And codes can easily grow over time as and when the requirements changes. If not structured, its difficult to maintain the application. Frameworks like React, Redux are simple to learn yet powerful to build large applications with complex logics.

##### Prerequisite

Am not gonna cover basics of React, Redux & Chrome extension API as there are number of good resources available over the Internet already and below are my choices to learn them.

* [Chrome extension basics](https://developer.chrome.com/extensions)
* [React-Redux tutorial](https://spapas.github.io/2016/03/02/react-redux-tutorial/)

##### Boilerplate

There is a [boilerplate](https://www.npmjs.com/package/react-chrome-extension-boilerplate) already present for this which uses [Webpack](https://webpack.github.io/). But I prefer [Gulp](http://gulpjs.com/), so have built separate [boilerplate](https://www.npmjs.com/package/react-gulp-chrome-extension-boilerplate-browserify) using Gulp tasks involving [Browserify](http://browserify.org/) & [Css-modulesify](https://github.com/css-modules/css-modulesify) making my first open-source contribution. This is a TodoMVC example where the states are saved in localStorage using Chrome storage API. The example has layouts for Popup, Inject-script & Context-menu.

![ToDo Chrome Extension Inject.js](/images/posts/todo-react-chrome.png)

##### Installation

* Clone the repo

```bash
$ git clone https://github.com/scriperdj/react-gulp-chrome-extension-boilerplate.git
```

* Install npm dependencies

```bash
$ npm install
```

* Build using gulp tasks

```bash
$ gulp
```

* Load the `./dev` folder to Google Chrome using [Load unpacked extensions option](https://developer.chrome.com/extensions/getstarted#unpacked).

##### Walkthrough

The react sources are present inside the ./app folder. The folder structure inside ./app should be familiar to you if you had already gone through React-Redux tutorial above. The Store uses Chrome storage API instead of redux-store.

Check out the [storage.js file](https://github.com/scriperdj/react-gulp-chrome-extension-boilerplate/blob/master/app/utils/storage.js) for implementation details.

The React render code for the Todo app is present in ./chrome/extension/todoapp.js. The states are made persistent using the Chrome storage API.

The background.js file includes the code for changing badge count each time a new todo is added, code for injecting the inject.js script into github.com's source and the code for context menu.

Have setup Gulp tasks to convert the .js sources to browser native javascript files using Browserify and build .css file extracting from the react sources using css-modulesify with default postcss plugins.

Check out the [gulpfile.js](https://github.com/scriperdj/react-gulp-chrome-extension-boilerplate/blob/master/gulpfile.js) for task configurations.

Am stopping here. Please let me know if you have any doubts or problems with the source/execution. I will try and help out.

