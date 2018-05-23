---
layout: post
title: "Angular.js 学习笔记"
date: 2013-11-20 21:08
---

> When in Rome, do as the Romans do.

最近用 [Angular][0] “完整”做了一个服务的管理后台，完整的意思是整个 WebApp 都用 Angular [MVW][16] (Model-View-Whatever) 的思路去想去做。留一个 Angular 学习笔记。

#### Think in Angular

Angular 是个 **框架(Framework)**，不像 jQuery、Underscore.js 是个库(Library)，库的使用一般是在某个地方调用库所提供的方法完成想要的功能，而框架往往是控制应用整个 runtime 周期。所以 Angular 相对正确的使用方式是从应用全局开始，都用 Angular 提供的双向绑定、DI、Directive、Services 等，把应用数据逻辑层和页面 DOM 操作分离。用 Angular 首先就要认同接受并实践这种思路，`Think in Angular`。

不错的 Angular 学习资料:

1. 官方文档 [AngularJS API Docs][1]。
1. [angular-phonecat][2]，官方提供的入门教程，非常好的 `Think in Angular` 实践，建议把代码 clone 本地完整学习一遍。
1. [Angular FAQ][3].
1. [AngularUI][4]，官方(?) UI 库，很多 directive 可用，比如 `ui.bootstrap`, `ui.router`, `ui.grid`.
1. [AngularJS Fundamentals In 60-ish Minutes][5] 视频教程，官方 [Youtube 频道][6] 也有不少东西，不过看视频效率较低。
1. [AngularJS-Learning][7]，收集了非常多文章，涵盖各个方面，实用参考。
1. [egghead.io][8] Angular 视频教学。
1. [A Better Way to Learn AngularJS][9].

----

#### jQuery

[How do I “think in AngularJS” if I have a jQuery background?][10] 很详细的介绍了如果有 jQuery 开发背景在做 Angular 需要注意的地方，以下几点：

1. 忘掉 jQuery，用 Angular 的方式解决。
1. 知名的 jQuery plugin 一般都已经有 Angular directive 封装，首先尝试这些，真不能满足的话再用 jQuery 方式解决。
1. 不要直接操作 DOM，试试 directive: ng-model, ng-class, ng-show, ng-hide, ng-disabled, ng-click.

----

#### Services

把常用的数据层访问封装成 Services 在 controller 之间共享访问。`$resource` 构造服务时要注意返回内容必须为单个对象或对象数组，如果服务端返回格式不符合可以用 `$http` 构造 service:

```js
//make angular service with $http.
angular.module('APP.services', []).factory('AppsList', function($http){
  var AppsList = {
    list: function(){
      var promise = $http.get('/url').then(function(resp){
        return resp.data;
      });
      return promise;

      //or
      //return $http.get('/url');
      //because $http returns a promise.
    },
  };

  return AppsList;
});

//use
function AppCtrl(AppsList) {
  AppsList.list().then(function(data){
    console.log(data);
  });
}
```

#### $rootScope

通过 `$rootScope` 可以在所有 controller 之间共享方法:

```js
angular.module('APP', []).run(function($rootScope){
  $rootScope.format_appinfo = function(data){
    //...
  };
});

//use in controller with $scope.
function AppCtrl($scope) {
  $scope.format_appinfo();
}
```

#### $routeParams

可以通过 `$routeParams` 获取 url 指定参数，比如

```js
// route 设置 url 格式
$routeProvider.when('/app/:appid/:title', {controller:'AppCtrl'});

//use
function AppCtrl($routeParams) {
  var appid = $routeParams.appid;
  var title = $routeParams.title;
}

```

#### Filter

Angular 自带了很多 filters，比如 currency，date，json，lowercase/uppercase，其中 json 可以直接在页面上格式化展示对象信息，很方便检查调试:

```
<pre>
{.{ app | json }.} // Octopress/Jekyll 会把两个大括号格式化掉，所以中间加一点
</pre>
```

----

代码目录组织形式，参考 [angular-seed][11]。也可以用 Yeoman 进行管理。

```
├──css
│  └──app.css
├──img
├──index.html
├──js
│  ├──app.js                      //配置用到的所有 module，包括自定义。
│  ├──controllers                 //每个 controller 独立一个文件，以 Ctrl 结尾命名。
│  │  ├──app_info_ctrl.js
│  │  └──...
│  ├──directives.js
│  ├──filters.js
│  └──services.js
├──lib                            //CDN 没有的第三方库。
│  ├──ngProgress
└──partials                       //页面模版，文件名和 controller 相对应。
   ├──app_info.html
   └──...
```

----

更多参考:

1. [ng-newsletter][15] 每周 Angular 最新技术周报，内容相当好。
1. [8 Tips for Angular.js Beginners][12]
1. [Migration guide for jQuery Developers][13]
1. [Building Huuuuuge Apps with AngularJS][14]

[0]:http://angularjs.org/
[1]:http://docs.angularjs.org/api/
[2]:https://github.com/angular/angular-phonecat
[3]:https://github.com/angular/angular.js/wiki/FAQ
[4]:http://angular-ui.github.io/
[5]:http://www.youtube.com/watch?v=i9MHigUZKEM
[6]:http://www.youtube.com/user/angularjs
[7]:https://github.com/jmcunningham/AngularJS-Learning
[8]:http://egghead.io/
[9]:http://www.thinkster.io/pick/51d287681e4b9c9098000013/a-better-way-to-learn-angularjs
[10]:http://stackoverflow.com/questions/14994391/how-do-i-think-in-angularjs-if-i-have-a-jquery-background
[11]:https://github.com/angular/angular-seed
[12]:http://vxtindia.com/blog/8-tips-for-angular-js-beginners/
[13]:http://amitgharat.wordpress.com/2013/06/22/migration-guide-for-jquery-developers/
[14]:http://briantford.com/blog/huuuuuge-angular-apps.html
[15]:http://www.ng-newsletter.com/
[16]:https://plus.google.com/+AngularJS/posts/aZNVhj355G2

