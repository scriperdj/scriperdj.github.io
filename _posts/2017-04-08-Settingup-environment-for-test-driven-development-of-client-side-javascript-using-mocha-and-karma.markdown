---
layout: post
title:  "Settingup environment for test driven development(TDD) of client side javascript using Mocha, Karma and Watchify"
date:   2017-04-08
categories: [Javascript]
tags: [javascript,testing,tdd,karma,mocha,gulp]
comments: true
crosspost_to_medium: true
---
   Developing Javascript application is a breeze. It has no strict type checks (loose typing), vast libraries to use from, no need of setting up development environment, can run anywhere, and more and more. But things could get messy pretty soon if you are constantly deveolping it adding logics day by day.   

Very soon, the application grows ugly and maintaining it becomes painful task. Here is a great tutorial on [setting up client side javascript project using gulp](https://fluxusfrequency.github.io/blog/2015/02/04/setting-up-a-client-side-javascript-project-with-gulp-and-browserify/){:target="_blank"}.

##### Javascript Unit testing

There are multiple testing frameworks out there and I prefer [Mocha](http://mochajs.org/){:target="_blank"} and [Chai](http://chaijs.com){:target="_blank"} as I feel its more expressive.

Below is a simple function to generate object with query string of given url,

<script src="http://gist-it.appspot.com/https://github.com/scriperdj/Javascript-automated-unit-testing-with-browsers/blob/master/src/helpers.js?slice=69:86"></script>

And a simple test case for it,

<script src="http://gist-it.appspot.com/https://github.com/scriperdj/Javascript-automated-unit-testing-with-browsers/blob/master/test/helpers.test.js?slice=26:45"></script>

You can run this test with Mocha with below command,
{% highlight bash %}
$ mocha --compilers js:babel-core/register
{% endhighlight %}

But client side javascript involves Dom. You could very well install [jsdom-global](https://github.com/rstacruz/jsdom-global){:target="_blank"} to solve document dependencies in your functions and test them. Thats ok, but what if we want to test using real browsers & multiple devices?

##### Real browser testing using karma

[Karma](http://karma-runner.github.io/1.0/index.html){:target="_blank"} is a test runner which runs the test cases in real browsers and across devices. Sounds awesome doesn't it? Setting it up is also straight forward which is very well explained in their main website.

After installing & configuring, you can install the [browser launchers](http://karma-runner.github.io/1.0/config/browsers.html){:target="_blank"} you need and update the config file.

Now run the command to start karma, It will open the configured browsers and execute the test cases in all.
{% highlight bash %}
$ ./node_modules/.bin/karma start karma.conf.js --log-level debug --single-run
{% endhighlight %}

##### Connect multiple devices & auto execute test cases when code changes

The cool part about Karma is that, you could start it and add any device to it and the test cases gets autmatically executed for that device. You can see below, I added my Android phone to the running test just by opening the url in my mobile browser.

![Read JioMags]({{ site.baseurl }}/images/posts/karma-testing.gif)

Set *autoWatch: true* in ***karma.config.js*** file to allow test cases execution whenever the files change. Also, you could debug the code by adding a line ***debugger*** to four function & open Developer tools in your browser to start debugger. Exciting right? Go ahead & try for yourself.
