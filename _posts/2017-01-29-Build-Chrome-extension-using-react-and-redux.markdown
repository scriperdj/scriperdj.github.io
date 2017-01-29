---
layout: post
title:  "Building Chrome extension using React.js, Redux and Gulp automation"
date:   2017-01-29
categories: [Javascript, Nodejs]
tags: [react,gulp,google-chrome]
comments: true
---
   Building extension for Google Chrome is no different from building javascript application. The official documentation page provides a [simple example][chrome-example]{:target="_blank"} which is nothing but a popup which searches image from Google for the active tab.

The example is so old that the Google search api used in the sample is no more available. Modern javascript ecosystem is so huge and has many tools which helps in building solid javascript applications. In this post, I intend to show how make use of [React][react-link]{:target="_blank"} with [Redux][redux-link]{:target="_blank"} to build Chrome extension.

In real world, we often face complex usecases where simple javascript is not enough. And codes can easily grow over time as and when the requirements changes. If not structured, its difficult to maintain the application. Frameworks like React, Redux are simple to learn yet powerful to build large applications with complex logics.

##### Prerequisite

Am not gonna cover basics of React, Redux & Chrome extension API as there are number of good resources available over the Internet already and below are my choices to learn them.

* [Chrome extension basics](https://developer.chrome.com/extensions){:target="_blank"}
* [React-Redux tutorial](https://spapas.github.io/2016/03/02/react-redux-tutorial/){:target="_blank"}

##### Boilerplate

There is a [boilerplate](https://www.npmjs.com/package/react-chrome-extension-boilerplate){:target="_blank"} already present for this which uses [Webpack](https://webpack.github.io/). But I prefer [Gulp](http://gulpjs.com/){:target="_blank"}, so have built separate [boilerplate](https://www.npmjs.com/package/react-gulp-chrome-extension-boilerplate-browserify){:target="_blank"} using Gulp tasks involving [Browserify](http://browserify.org/){:target="_blank"} & [Css-modulesify](https://github.com/css-modules/css-modulesify){:target="_blank"} making my first open-source contribution. This is a TodoMVC example where the states are saved in localStorage using Chrome storage API. The example has layouts for Popup, Inject-script & Context-menu.

![ToDo Chrome Extension Inject.js]({{ site.baseurl }}/images/posts/todo-react-chrome.png){:height="36px" width="400px"}


##### Installation

* Clone the repo

    {% highlight bash %}
    $ git clone https://github.com/scriperdj/react-gulp-chrome-extension-boilerplate.git
    {% endhighlight %}

* Install npm dependencies

    {% highlight bash %}

    $ npm install
    {% endhighlight %}

* Build using gulp tasks

    {% highlight bash %}

    $ gulp
    {% endhighlight %}

* Load the `./dev` folder to Google Chrome using [Load unpacked extensions option](https://developer.chrome.com/extensions/getstarted#unpacked).

##### Walkthrough

The react sources are present inside the ./app folder. The folder structure inside ./app should be familiar to you if you had already gone through React-Redux tutorial above. The Store uses Chrome storage API instead of redux-store.

<script src="http://gist-it.appspot.com/https://github.com/scriperdj/react-gulp-chrome-extension-boilerplate/blob/master/app/utils/storage.js?slice=0:3"></script>

The React render code for the Todo app is present in ./chrome/extension/todoapp.js. The states are made persistent by below code.

<script src="http://gist-it.appspot.com/https://github.com/scriperdj/react-gulp-chrome-extension-boilerplate/blob/master/chrome/extension/todoapp.js?slice=4:16"></script>

The background.js file includes the code for changing badge count each time a new todo is added, code for injecting the inject.js script into github.com's source and the code for context menu.

Have setup Gulp tasks to convert the .js sources to browser native javascript files using Browserify and build .css file extracting from the react sources using css-modulesify with default postcss plugins.

<script src="http://gist-it.appspot.com/https://github.com/scriperdj/react-gulp-chrome-extension-boilerplate/blob/master/gulpfile.js?slice=73:91"></script>

Am stopping here. Please let me know if you have any doubts or problems with the source/execution. I will try and help out.

[chrome-example]: https://developer.chrome.com/extensions/getstarted
[react-link]: https://github.com/facebook/react
[redux-link]: http://redux.js.org/docs/introduction/
