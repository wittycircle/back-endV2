webpackJsonp(["landing.module"],{

/***/ "./src/app/Animations/rotate-word.animation.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return wordRotate; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");

/* Slide Right/Left dialog */
var wordRotate = Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('wRotate', [
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('initial', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
        position: 'absolute', opacity: 1, top: '0px'
    })),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('outDown', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
        position: 'absolute', opacity: 0, top: '15px'
    })),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('inLine', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
        position: 'absolute', opacity: 0, top: '0px'
    })),
    // state('inLeft', style({
    // 	opacity: 1, left: '0px', right: '0px'
    // })),
    // state('outRight', style({
    // 	opacity: 0, right: '-180px', left: '0px',
    // })),
    // state('inRight', style({
    // 	opacity: 1, right: '0px', left: '0px',
    // })),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('initial => outDown', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('150ms')),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('outDown => inLine', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('0ms')),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('inLine => initial', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('400ms')),
]);
//# sourceMappingURL=rotate-word.animation.js.map

/***/ }),

/***/ "./src/app/Components/landing/landing-people/landing-people.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"background\">\n<section class=\"wh-profiles-around\">\n\t<h2 class=\"freigl\">top <span>ranked</span> this week</h2>\n\t<p class=\"freigb\">They are engineers, designers, entrepreneurs, product enthusiasts, students and way more...</p>\n\n\t<div class=\"container\" *ngIf=\"!mobile\">\n\t\t<div class=\"profile-card\" *ngFor=\"let profile of profiles; let i = index\">\n\t\t\t<a [routerLink]=\"['', profile.username]\">\n\t\t\t\t<div class=\"card-click-zone\">\n\t\t\t\t\t<div class=\"card-rank\" *ngIf=\"profile.rank\">\n\t\t\t\t\t\t<span>#{{ profile.rank }}</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-picture\" [style.background-image]=\"'url(' + transformImage(profile.cover_picture, 207, 40, 'fill') + ')'\">\n\t\t\t\t\t\t<div class=\"card-profile-picture\" [style.background-image]=\"'url(' + transformImage(profile.picture, 64, 64, 'fill') + ')'\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-info bb\">\n\t\t\t\t\t\t<h4>{{ profile.fullName }}</h4>\n\t\t\t\t\t\t<div class=\"card-location\">\n\t\t\t\t\t\t\t<h6 *ngIf=\"profile.state\">{{ profile.city }}, {{ profile.state }}</h6>\n\t\t\t\t\t\t\t<h6 *ngIf=\"!profile.state\">{{ profile.city }}, {{ profile.country }}</h6>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-description\">\n\t\t\t\t\t\t\t<p [innerHtml]=\"profile.description | cut:true:56:' ...'\"></p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-profile-skills\">\n\t\t                    <ul>\n\t\t                        <li *ngFor=\"let skill of profile.skills\">{{ skill | cut:true:20:' ...' }}</li>\n\t\t                    </ul>\n\t\t                </div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</a>\n\n\t\t\t<div class=\"card-status flex\">\n\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530771/Witty-icon/User%20Status/Meet_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'to meet smart people'\">\n\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530771/Witty-icon/User%20Status/Share_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'to share what I\\'m working on'\">\n\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Hiring_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'for a full time position'\">\n\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Internship_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'for an internship'\">\n\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Collaboration_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'for part time collaboration'\">\n\t\t\t\t<p class='freigb'>{{ transformCardStatus(profile.about) }}</p>\n\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'to meet smart people'\">{{ profile.first_name }} is looking to network and meet new interesting people</div>\n\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'to share what I\\'m working on'\">{{ profile.first_name }} is looking to share their work to the world</div>\n\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'for a full time position'\">{{ profile.first_name }} is looking for a full time position</div>\n\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'for an internship'\">{{ profile.first_name }} is looking for an internship</div>\n\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'for part time collaboration'\">{{ profile.first_name }} is looking to do some part time collaboration</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<ngx-siema *ngIf=\"mobile && profiles\" class=\"profile-cards\" [options]=\"options2\">\n\t\t<ngx-siema-slide class=\"profile-card\" *ngFor=\"let profile of profiles; let i = index\">\n\t\t\t<a [routerLink]=\"['', profile.username]\">\n\t\t\t\t<div class=\"card-click-zone\">\n\t\t\t\t\t<div class=\"card-rank\" *ngIf=\"profile.rank\">\n\t\t\t\t\t\t<span>#{{ profile.rank }}</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-picture\" [style.background-image]=\"'url(' + transformImage(profile.cover_picture, 207, 40, 'fill') + ')'\">\n\t\t\t\t\t\t<div class=\"card-profile-picture\" [style.background-image]=\"'url(' + transformImage(profile.picture, 64, 64, 'fill') + ')'\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-info bb\">\n\t\t\t\t\t\t<h4>{{ profile.fullName }}</h4>\n\t\t\t\t\t\t<div class=\"card-location\">\n\t\t\t\t\t\t\t<h6 *ngIf=\"profile.state\">{{ profile.city }}, {{ profile.state }}</h6>\n\t\t\t\t\t\t\t<h6 *ngIf=\"!profile.state\">{{ profile.city }}, {{ profile.country }}</h6>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-description\">\n\t\t\t\t\t\t\t<p [innerHtml]=\"profile.description | cut:true:56:' ...'\"></p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-profile-skills\">\n\t\t                    <ul>\n\t\t                        <li *ngFor=\"let skill of profile.skills\">{{ skill | cut:true:20:' ...' }}</li>\n\t\t                    </ul>\n\t\t                </div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-status flex\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530771/Witty-icon/User%20Status/Meet_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'to meet smart people'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530771/Witty-icon/User%20Status/Share_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'to share what I\\'m working on'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Hiring_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'for a full time position'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Internship_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'for an internship'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Collaboration_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'for part time collaboration'\">\n\t\t\t\t\t<p class='freigb'>{{ transformCardStatus(profile.about) }}</p>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'to meet smart people'\">{{ profile.first_name }} is looking to network and meet new interesting people</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'to share what I\\'m working on'\">{{ profile.first_name }} is looking to share their work to the world</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'for a full time position'\">{{ profile.first_name }} is looking for a full time position</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'for an internship'\">{{ profile.first_name }} is looking for an internship</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'for part time collaboration'\">{{ profile.first_name }} is looking to do some part time collaboration</div>\n\t\t\t\t</div>\n\t\t\t</a>\n\t\t</ngx-siema-slide>\n\t</ngx-siema>\n\n\t<a routerLink=\"/meet\"><button class=\"freigl\">Meet more inspiring people</button></a>\n</section>\n\n<!-- <section class=\"wh-profiles-work\" *ngIf=\"profilesWork\">\n\t<h2 class=\"freigl\"><span>people</span> who could <span>work</span> with you</h2>\n\t<p class=\"freigb\">They are engineers, designers, entrepreneurs, product enthusiasts, students and way more...</p>\n\n\t<div class=\"container\" *ngIf=\"!mobile\">\n\t\t<div class=\"profile-card\" *ngFor=\"let profile of profilesWork; let i = index\">\n\t\t\t<a [routerLink]=\"['', profile.username]\">\n\t\t\t\t<div class=\"card-click-zone\">\n\t\t\t\t\t<div class=\"card-rank\" *ngIf=\"profile.rank\">\n\t\t\t\t\t\t<span>#{{ profile.rank }}</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-picture\" [style.background-image]=\"'url(' + transformImage(profile.cover_picture, 207, 40, 'fill') + ')'\">\n\t\t\t\t\t\t<div class=\"card-profile-picture\" [style.background-image]=\"'url(' + transformImage(profile.picture, 64, 64, 'fill') + ')'\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-info bb\">\n\t\t\t\t\t\t<h4>{{ profile.fullName }}</h4>\n\t\t\t\t\t\t<div class=\"card-location\">\n\t\t\t\t\t\t\t<h6 *ngIf=\"profile.state\">{{ profile.city }}, {{ profile.state }}</h6>\n\t\t\t\t\t\t\t<h6 *ngIf=\"!profile.state\">{{ profile.city }}, {{ profile.country }}</h6>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-description\">\n\t\t\t\t\t\t\t<p [innerHtml]=\"profile.description | cut:true:56:' ...'\"></p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-profile-skills\">\n\t\t                    <ul>\n\t\t                        <li *ngFor=\"let skill of profile.skills\">{{ skill | cut:true:20:' ...' }}</li>\n\t\t                    </ul>\n\t\t                </div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</a>\n\n\t\t\t<div class=\"card-status flex\">\n\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530771/Witty-icon/User%20Status/Meet_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'to meet smart people'\">\n\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530771/Witty-icon/User%20Status/Share_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'to share what I\\'m working on'\">\n\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Hiring_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'for a full time position'\">\n\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Internship_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'for an internship'\">\n\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Collaboration_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'for part time collaboration'\">\n\t\t\t\t<p class='freigb'>{{ transformCardStatus(profile.about) }}</p>\n\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'to meet smart people'\">{{ profile.first_name }} is looking to network and meet new interesting people</div>\n\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'to share what I\\'m working on'\">{{ profile.first_name }} is looking to share their work to the world</div>\n\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'for a full time position'\">{{ profile.first_name }} is looking for a full time position</div>\n\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'for an internship'\">{{ profile.first_name }} is looking for an internship</div>\n\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'for part time collaboration'\">{{ profile.first_name }} is looking to do some part time collaboration</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<ngx-siema *ngIf=\"mobile && profilesWork\" class=\"profile-cards\" [options]=\"options2\">\n\t\t<ngx-siema-slide class=\"profile-card\" *ngFor=\"let profile of profilesWork; let i = index\">\n\t\t\t<a [routerLink]=\"['', profile.username]\">\n\t\t\t\t<div class=\"card-click-zone\">\n\t\t\t\t\t<div class=\"card-rank\" *ngIf=\"profile.rank\">\n\t\t\t\t\t\t<span>#{{ profile.rank }}</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-picture\" [style.background-image]=\"'url(' + transformImage(profile.cover_picture, 207, 40, 'fill') + ')'\">\n\t\t\t\t\t\t<div class=\"card-profile-picture\" [style.background-image]=\"'url(' + transformImage(profile.picture, 64, 64, 'fill') + ')'\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-info bb\">\n\t\t\t\t\t\t<h4>{{ profile.fullName }}</h4>\n\t\t\t\t\t\t<div class=\"card-location\">\n\t\t\t\t\t\t\t<h6 *ngIf=\"profile.state\">{{ profile.city }}, {{ profile.state }}</h6>\n\t\t\t\t\t\t\t<h6 *ngIf=\"!profile.state\">{{ profile.city }}, {{ profile.country }}</h6>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-description\">\n\t\t\t\t\t\t\t<p [innerHtml]=\"profile.description | cut:true:56:' ...'\"></p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-profile-skills\">\n\t\t                    <ul>\n\t\t                        <li *ngFor=\"let skill of profile.skills\">{{ skill | cut:true:20:' ...' }}</li>\n\t\t                    </ul>\n\t\t                </div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-status flex\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530771/Witty-icon/User%20Status/Meet_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'to meet smart people'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530771/Witty-icon/User%20Status/Share_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'to share what I\\'m working on'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Hiring_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'for a full time position'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Internship_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'for an internship'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Collaboration_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'for part time collaboration'\">\n\t\t\t\t\t<p class='freigb'>{{ transformCardStatus(profile.about) }}</p>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'to meet smart people'\">{{ profile.first_name }} is looking to network and meet new interesting people</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'to share what I\\'m working on'\">{{ profile.first_name }} is looking to share their work to the world</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'for a full time position'\">{{ profile.first_name }} is looking for a full time position</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'for an internship'\">{{ profile.first_name }} is looking for an internship</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'for part time collaboration'\">{{ profile.first_name }} is looking to do some part time collaboration</div>\n\t\t\t\t</div>\n\t\t\t</a>\n\t\t</ngx-siema-slide>\n\t</ngx-siema>\n\n\t<a routerLink=\"/meet\"><button class=\"freigl\">Meet more brilliant people</button></a>\n</section> -->\n</section>\n\n<app-landing-testimonials [runNumber]=\"runNumber\" [mobile]=\"mobile\" ></app-landing-testimonials>\n\n<section class=\"background-2\">\n\t<section class=\"wh-how\">\n\t\t<h2 class=\"whh-title freigl\">how it works</h2>\n\t\t<div class=\"whh-block flex\">\n\t\t\t<div class=\"whhb-1\">\n\t\t\t\t<h2 class=\"freigl\"><span>post</span> your project 🤘🏼</h2>\n\t\t\t\t<p class=\"freigb\">No matter if you have an idea on a post-it, or are working on a growing startup, you will always need skilled people to work with you. Post your project on Witty and they'll find you.</p>\n\t\t\t</div>\n\t\t\t<div class=\"whhb-2\">\n\t\t\t\t<h2 class=\"freigl\">connect with <span>brilliant</span> people 🤞🏼</h2>\n\t\t\t\t<p class=\"freigb\">Witty is a network of thousands of skilled people looking for their next opportunity. It might be what youre working on. We take no fee, we just connect you for free.</p>\n\t\t\t</div>\n\t\t\t<div class=\"whhb-3\">\n\t\t\t\t<h2 class=\"freigl\">decide what's <span>next</span> 👌🏼</h2>\n\t\t\t\t<p class=\"freigb\">What you do next is none of our business. People find here their cofounders, interns, employees, users, customers and of course, their early fans.</p>\n\t\t\t</div>\n\t\t</div>\n\t</section>\n</section>\n\n<section class=\"wh-join bg-default\">\n\t<div class=\"filter\"></div>\n\t<div class=\"whj-container align-center flex\">\n\t\t<div class=\"whjc-block1\">\n\t\t\t<h1 class=\"freigs mar-b-10\">#JoinWitty</h1>\n\t\t\t<p class=\"freigb\">Discover thousands of projects that<br/>need your skills. Join the most<br /><span>exciting</span> community on the internet.</p>\n\t\t</div>\n\t\t<div class=\"whjc-block2\">\n\t\t\t<div class=\"login-modal-social signup-login-social\">\n\t\t        <div class=\"fb-login\">\n\t\t            <a href=\"/api/auth/facebook\" target=\"_self\">\n\t\t                <button><i class=\"fa fa-facebook\" style=\"color: white\"></i>Login with Facebook</button>\n\t\t            </a>\n\t\t        </div>\n\t\t        <div class=\"go-login\">\n\t\t            <a href=\"/api/auth/google\" target=\"_self\">\n\t\t                <button class=\"go-login\"><img src=\"/public/images/social_media/newgoogle-logo.svg\">Login with Google</button>\n\t\t            </a>\n\t\t        </div>\n\t\t    </div>\n\n\t\t    <a class=\"freigb sign-up cursor-pt\" (click)=\"switchToSignUp()\">Sign up with email</a>\n\t\t</div>\n\t</div>\n</section>\n"

/***/ }),

/***/ "./src/app/Components/landing/landing-people/landing-people.component.scss":
/***/ (function(module, exports) {

module.exports = ".background {\n  padding: 20px 100px 100px 100px;\n  background-color: #fff; }\n\n.background-2 {\n  padding-top: 25px;\n  padding-bottom: 50px;\n  background-color: #fafafa; }\n\n.wh-profiles-around, .wh-profiles-work {\n  margin-bottom: 10px; }\n\n.wh-profiles-around .profile-card .card-follow p, .wh-profiles-work .profile-card .card-follow p {\n    margin-bottom: 0; }\n\n.wh-profiles-work {\n  margin-top: 60px; }\n\n.wh-profiles-work h2 {\n    margin-bottom: 20px; }\n\n.wh-how {\n  margin: 30px auto 10px auto; }\n\n.wh-how .whh-title {\n    margin-bottom: 20px; }\n\n.wh-how .whh-block {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n\n.wh-how .whhb-1, .wh-how .whhb-2, .wh-how .whhb-3 {\n    padding: 0 5px;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box; }\n\n.wh-how .whhb-1 h2, .wh-how .whhb-2 h2, .wh-how .whhb-3 h2 {\n      margin-bottom: 10px; }\n\n.wh-how .whhb-1 p, .wh-how .whhb-2 p, .wh-how .whhb-3 p {\n      width: 300px;\n      font-size: 16px; }\n\n.wh-join {\n  position: relative;\n  width: 100%;\n  height: 200px;\n  background-color: #999;\n  background-image: url(\"/public/images/backgrounds/bg-landing-signup.jpg\"); }\n\n.wh-join .filter {\n    background: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0.7)));\n    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)); }\n\n.wh-join .whj-container {\n    width: inherit;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: baseline;\n        -ms-flex-align: baseline;\n            align-items: baseline; }\n\n.wh-join .whj-container .whjc-block1 {\n      padding: 0 20px; }\n\n.wh-join .whj-container .whjc-block1 h1 {\n        font-size: 32px; }\n\n.wh-join .whj-container .whjc-block1 p span {\n        font-family: 'freigSem'; }\n\n.wh-join .whj-container .whjc-block2 {\n      text-align: center;\n      padding: 0 20px; }\n\n.wh-join .whj-container .whjc-block2 .signup-login-social {\n        text-align: left; }\n\n.wh-join .whj-container .whjc-block2 .go-login .fa-facebook, .wh-join .whj-container .whjc-block2 .fb-login .fa-facebook {\n        padding: 0 10px; }\n\n.wh-join .whj-container .whjc-block2 .go-login button, .wh-join .whj-container .whjc-block2 .fb-login button {\n        padding: 8px 25px 8px 10px;\n        font-size: 14px; }\n\n.wh-join .whj-container .whjc-block2 .fb-login {\n        margin-bottom: 10px; }\n\n.wh-join .whj-container .whjc-block2 .fb-login button {\n          padding: 8px 17px 8px 12px; }\n\n.wh-join .whj-container .whjc-block2 .go-login {\n        margin-bottom: 2px; }\n\n.wh-join .whj-container .whjc-block2 .go-login img {\n          width: 12px; }\n\n.wh-join .whj-container .whjc-block2 .sign-up {\n        font-size: 16px; }\n\n/******************** MOBILE ****************************/\n\n@media only screen and (max-width: 736px) {\n  .background {\n    padding: 50px 10px; }\n  .wh-profiles-around, .wh-how {\n    width: auto; }\n    .wh-profiles-around .profile-cards .siema2, .wh-how .profile-cards .siema2 {\n      padding: 30px 10px 50px 10px; }\n  .wh-how {\n    margin: 0;\n    padding: 0 15px; }\n    .wh-how .whhb-1, .wh-how .whhb-2, .wh-how .whhb-3 {\n      padding: 0; }\n      .wh-how .whhb-1 h2, .wh-how .whhb-2 h2, .wh-how .whhb-3 h2 {\n        font-size: 21px; }\n        .wh-how .whhb-1 h2 span, .wh-how .whhb-2 h2 span, .wh-how .whhb-3 h2 span {\n          font-size: 21px; }\n    .wh-how .whh-block {\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap; }\n  .wh-join {\n    height: 340px; }\n    .wh-join .whj-container {\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap; }\n      .wh-join .whj-container .whjc-block1 {\n        margin-bottom: 30px;\n        text-align: center; }\n        .wh-join .whj-container .whjc-block1 p {\n          text-align: left; } }\n"

/***/ }),

/***/ "./src/app/Components/landing/landing-people/landing-people.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LandingPeopleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__("./node_modules/ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_popover_login_popover_login_component__ = __webpack_require__("./src/app/Components/modals/popover-login/popover-login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_Profiles_profiles_service__ = __webpack_require__("./src/app/Services/Profiles/profiles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_Pictures_pictures_service__ = __webpack_require__("./src/app/Services/Pictures/pictures.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Services_shared_service__ = __webpack_require__("./src/app/Services/shared.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Services_Backoffice_backoffice_service__ = __webpack_require__("./src/app/Services/Backoffice/backoffice.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/* Components */

/* Services */





var LandingPeopleComponent = /** @class */ (function () {
    function LandingPeopleComponent(ProfilesService, PicturesService, TokenService, dialogService, SharedService, BackofficeService) {
        this.ProfilesService = ProfilesService;
        this.PicturesService = PicturesService;
        this.TokenService = TokenService;
        this.dialogService = dialogService;
        this.SharedService = SharedService;
        this.BackofficeService = BackofficeService;
        // profilesWork 	: ProfileModels[]
        // projectStatus 	: Array<string> = ["to share what I'm working on", "for part time collaboration"]
        this.body_profile = {
            "query": {
                "sort": {
                    "field": "rank",
                    "reverse": false
                },
                "members": []
            },
            "paginate": {
                "limit": 4,
                "offset": 0
            }
        };
        this.body_profile2 = {
            "query": {
                "sort": {
                    "field": "rank",
                    "reverse": false
                },
                "members": []
            },
            "paginate": {
                "limit": 4,
                "offset": 0
            }
        };
        this.options2 = {
            selector: '.siema2',
            duration: 200,
            easing: 'ease-out',
            perPage: 1,
            startIndex: 0,
            draggable: true,
            threshold: 20,
            loop: false,
            onInit: function () {
                // runs immediately after first initialization
            },
            onChange: function () {
                // runs after slide change
            },
        };
        this.body_profile.paginate.offset = Math.floor((Math.random() * 200) + 1);
        this.body_profile2.paginate.offset = Math.floor((Math.random() * 30) + 1);
    }
    LandingPeopleComponent.prototype.ngOnInit = function () {
        this.getProfiles();
        // this.getLocation();
    };
    // getLocation() {
    // 	this.ProfilesService.getIP().subscribe(res => {
    // 		let city, state, country;
    // 		city 	= res.city + ', '
    // 		country = res.country_name;
    // 		if (res.region_code)
    // 			state = res.region_code + ', '
    // 		else
    // 			state = "' ', "
    // 		this.getProfilesWork((city + state + country));
    // 	});
    // }
    LandingPeopleComponent.prototype.getProfiles = function () {
        // let body;
        var _this = this;
        // if (!index)
        // 	body = this.body_profile
        // else
        // 	body = this.body_profile2
        // this.ProfilesService.searchProfiles(body).subscribe( res => {
        // 	if (!index)
        // 		this.profiles = res.profiles
        // 	else
        // 		this.profilesWork = res.profiles
        // });
        this.BackofficeService.getSelectedProjectsProfiles('top_ranked_people').subscribe(function (res) {
            _this.profiles = res.results;
        });
    };
    // getProfilesWork(location: string) {
    // 	const rand = Math.floor(Math.random());
    // 	this.body_profile2['query']['members'].push({ "field": "about", "value": this.projectStatus[rand] });
    // 	this.body_profile2['query']['members'].push({ "field": "location", "value": location });
    // 	this.getProfiles(1);
    // }
    // followProfile(id, index) {
    // 	if (!this.TokenService.getToken())
    // 		return this.showLoginPopOver();
    // 	this.ProfilesService.followProfile(id, {}).subscribe(res => {
    // 		if (!this.profiles[index]['hasLiked']){
    // 			this.profiles[index]['follower'] += 1
    // 			this.profiles[index]['hasLiked'] = true
    // 		} else {
    // 			this.profiles[index]['follower'] -= 1
    // 			this.profiles[index]['hasLiked'] = false
    // 		}
    // 	});
    // }
    LandingPeopleComponent.prototype.switchToSignUp = function () {
        this.SharedService.setSignUpStatus(true);
    };
    /* SHOW MODAL */
    LandingPeopleComponent.prototype.showLoginPopOver = function () {
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_2__modals_popover_login_popover_login_component__["a" /* PopoverLoginComponent */], {});
    };
    /* TRANSFORM */
    LandingPeopleComponent.prototype.transformUrl = function (url) {
        url = url.replace(/ /g, '-');
        return url;
    };
    LandingPeopleComponent.prototype.transformImage = function (url, width, height, crop) {
        return this.PicturesService.transformImage(url, width, height, crop);
    };
    LandingPeopleComponent.prototype.transformCardStatus = function (status) {
        if (status === 'to meet smart people')
            return 'Meet smart people';
        else if (status === 'for a full time position')
            return 'Full time position';
        else if (status === 'for an internship')
            return 'Internship';
        else if (status === 'for part time collaboration')
            return 'Collaboration';
        else if (status === "to share what I'm working on")
            return 'Share work';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], LandingPeopleComponent.prototype, "mobile", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], LandingPeopleComponent.prototype, "runNumber", void 0);
    LandingPeopleComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-landing-people',
            template: __webpack_require__("./src/app/Components/landing/landing-people/landing-people.component.html"),
            styles: [__webpack_require__("./src/app/Components/landing/landing-projects/landing-projects.component.scss"), __webpack_require__("./src/public/styles/profile-card.scss"), __webpack_require__("./src/public/styles/project-card.scss"), __webpack_require__("./src/public/styles/tooltip.scss"), __webpack_require__("./src/app/Components/landing/landing-people/landing-people.component.scss"), __webpack_require__("./src/public/styles/login-signup-modal.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__Services_Profiles_profiles_service__["a" /* ProfilesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_Profiles_profiles_service__["a" /* ProfilesService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__Services_Pictures_pictures_service__["a" /* PicturesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_Pictures_pictures_service__["a" /* PicturesService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__Services_Authentication_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_Authentication_token_service__["a" /* TokenService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__Services_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__Services_shared_service__["a" /* SharedService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__Services_Backoffice_backoffice_service__["a" /* BackofficeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__Services_Backoffice_backoffice_service__["a" /* BackofficeService */]) === "function" && _f || Object])
    ], LandingPeopleComponent);
    return LandingPeopleComponent;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=landing-people.component.js.map

/***/ }),

/***/ "./src/app/Components/landing/landing-post/landing-post.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wl-post\">\n\t<div class=\"filter-blur\"></div>\n\t<img class=\"wlp-paralayer layer-1\" src=\"/public/images/med-parallax.png\" [style.top]=\"topPixelStr\">\n\t<img class=\"wlp-paralayer layer-2\" src=\"/public/images/big-parallax.png\" [style.top]=\"topPixelStr2\">\n\n\t<div class=\"wlp-text align-center\">\n\t\t<div class=\"wlpt-1 flex\">\n\t\t\t<h2 class=\"pad-l-10 btlr-4 bblr-4\">Share your</h2>\n\t\t\t<div class=\"wlpt1-words flex\">\n\t\t\t\t<h2 class=\"unvisibleWord\">{{ hideWord }}</h2>\n\t\t\t\t<h2 class=\"visibleWord\" [@wRotate]=\"state1\">idea</h2>\n\t\t\t\t<h2 class=\"visibleWord2\" [@wRotate]=\"state2\">project</h2>\n\t\t\t\t<h2 class=\"visibleWord3\" [@wRotate]=\"state3\">startup</h2>\n\t\t\t\t<h2 class=\"visibleWord3\" [@wRotate]=\"state4\">product</h2>\n \t\t\t</div>\n\t\t\t<h2 class=\"pad-r-5 btrr-4\">and</h2>\n\t\t\t<h2 class=\"freigl\">connect to the</h2>\n\t\t\t<div class=\"wlpt1-words flex\">\n\t\t\t\t<h2 class=\"unvisibleWord\">{{ hideWord2 }}</h2>\n\t\t\t\t<h2 class=\"visibleWord\" [@wRotate]=\"state2_1\">cofounder</h2>\n\t\t\t\t<h2 class=\"visibleWord2\" [@wRotate]=\"state2_2\">early adopters</h2>\n\t\t\t\t<h2 class=\"visibleWord3\" [@wRotate]=\"state2_3\">teammate</h2>\n\t\t\t\t<h2 class=\"visibleWord3\" [@wRotate]=\"state2_4\">coworkers</h2>\n \t\t\t</div>\n\t\t\t<h2 class=\"freigl pad-r-5 btrr-4 bbrr-4\">you need</h2>\n\t\t</div>\n\n\t\t<div class=\"wlpt-3\">\n\t\t\t<span class=\"freigb bbrr-4 bblr-4\">We take no fee, you just pay for the coffee</span>\n\t\t</div>\n\t\t<button *ngIf=\"!mobile\" class=\"freigm\" (click)=\"showLoginPopOver()\">Post your project</button>\n\t</div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/Components/landing/landing-post/landing-post.component.scss":
/***/ (function(module, exports) {

module.exports = ".wl-post {\n  position: relative;\n  width: 100%;\n  height: 220px;\n  background-color: transparent;\n  overflow: hidden; }\n  .wl-post .wlp-paralayer {\n    position: absolute;\n    width: 100%;\n    z-index: -1;\n    top: 0;\n    left: 0;\n    right: 0; }\n  .wl-post .layer-2 {\n    -webkit-transform: scale(1.3, 1.3);\n            transform: scale(1.3, 1.3); }\n  .wl-post .wlp-text {\n    position: absolute;\n    width: 800px;\n    left: 0;\n    right: 0;\n    margin: 0 auto;\n    text-align: center; }\n  .wl-post .wlp-text h2 {\n      font-family: 'freigLight';\n      font-size: 26px;\n      color: #333;\n      padding-bottom: 3px; }\n  .wl-post .wlp-text button {\n      padding: 8px 25px;\n      border-radius: 40px; }\n  .wl-post .wlp-text button:hover {\n      background-color: #ff3333; }\n  .wl-post .wlp-text .btlr-4 {\n      border-top-left-radius: 4px; }\n  .wl-post .wlp-text .btrr-4 {\n      border-top-right-radius: 4px; }\n  .wl-post .wlp-text .bblr-4 {\n      border-bottom-left-radius: 4px; }\n  .wl-post .wlp-text .bbrr-4 {\n      border-bottom-right-radius: 4px; }\n  .wl-post .wlp-text .wlpt-1 {\n      -webkit-box-align: start;\n          -ms-flex-align: start;\n              align-items: flex-start;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      /*\t\t\theight: 26px;\n*/ }\n  .wl-post .wlp-text .wlpt-1 h2 {\n        background-color: #fff; }\n  .wl-post .wlp-text .wlpt-1 .wlpt1-words {\n        position: relative;\n        padding: 0 5px;\n        background-color: #fff;\n        overflow: hidden; }\n  .wl-post .wlp-text .wlpt-1 .unvisibleWord {\n        opacity: 0;\n        font-family: 'FreigSem'; }\n  .wl-post .wlp-text .wlpt-1 .visibleWord, .wl-post .wlp-text .wlpt-1 .visibleWord2, .wl-post .wlp-text .wlpt-1 .visibleWord3 {\n        position: absolute;\n        top: 0;\n        opacity: 1;\n        font-family: 'FreigSem';\n        left: 0;\n        margin-left: 5px; }\n  .wl-post .wlp-text .wlpt-1 .visibleWord2 {\n        opacity: 0; }\n  .wl-post .wlp-text .wlpt-1 .visibleWord3 {\n        opacity: 0; }\n  .wl-post .wlp-text .wlpt-1 .bold-world {\n        font-family: 'freigSem';\n        background-color: #fff;\n        padding: 0 5px; }\n  .wl-post .wlp-text .wlpt-2 {\n      -webkit-box-align: start;\n          -ms-flex-align: start;\n              align-items: flex-start;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center; }\n  .wl-post .wlp-text .wlpt-2 h2 {\n        background-color: #fff; }\n  .wl-post .wlp-text .wlpt-2 .hello {\n        font-family: 'freigMed';\n        background-color: #fff;\n        padding: 0 5px; }\n  .wl-post .wlp-text .wlpt-3 {\n      margin-bottom: 10px; }\n  .wl-post .wlp-text .wlpt-3 span {\n        display: inline-block;\n        background-color: #fff;\n        color: #999;\n        font-size: 16px;\n        padding: 5px 5px 5px 5px;\n        position: relative;\n        bottom: 4px; }\n  /******************** MOBILE ****************************/\n  @media only screen and (max-width: 736px) {\n  .wl-post {\n    height: 210px; }\n    .wl-post .layer-1 {\n      -webkit-transform: scale(2, 2);\n              transform: scale(2, 2); }\n    .wl-post .layer-2 {\n      -webkit-transform: scale(3, 3);\n              transform: scale(3, 3); }\n    .wl-post .wlp-text {\n      width: 100vw; }\n      .wl-post .wlp-text .wlpt-1 {\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n        line-height: 28px;\n        padding: 0 10px; } }\n"

/***/ }),

/***/ "./src/app/Components/landing/landing-post/landing-post.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export states */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LandingPostComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__ = __webpack_require__("./node_modules/ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_popover_login_popover_login_component__ = __webpack_require__("./src/app/Components/modals/popover-login/popover-login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_account_service__ = __webpack_require__("./src/app/Services/account.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Animations_rotate_word_animation__ = __webpack_require__("./src/app/Animations/rotate-word.animation.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



/* Components */

/* Services */

/* Animation */

var states = ['initial', 'inline', 'outDown'];
var LandingPostComponent = /** @class */ (function () {
    function LandingPostComponent(AccountService, dialogService, document) {
        this.AccountService = AccountService;
        this.dialogService = dialogService;
        this.document = document;
        this.state1 = 'initial';
        this.state2 = 'inLine';
        this.state3 = 'inLine';
        this.state4 = 'inLine';
        this.state2_1 = 'initial';
        this.state2_2 = 'inLine';
        this.state2_3 = 'inLine';
        this.state2_4 = 'inLine';
        this.count = 0;
        this.count2 = 0;
        this.topCount = 0;
        this.topCount2 = 0;
        this.startY = 0;
        this.initScroll = 0;
        this.wordChange();
        // setTimeout(() => {
        // this.wordChange2();
        // }, 2000)
    }
    LandingPostComponent.prototype.ngOnInit = function () {
        this.getState(0);
        this.getState2(0);
    };
    LandingPostComponent.prototype.ngOnDestroy = function () {
    };
    LandingPostComponent.prototype.onWindowScroll = function () {
        if (this.initScroll === 0) {
            this.initScroll = 1;
            this.startY = window.pageYOffset;
        }
        if (this.startY <= window.pageYOffset) {
            this.topPixelStr = this.topCount-- + 'px';
            this.topPixelStr2 = (this.topCount2 -= 2) + 'px';
            this.startY = window.pageYOffset;
        }
        else {
            this.topPixelStr = this.topCount++ + 'px';
            this.topPixelStr2 = (this.topCount2 += 2) + 'px';
            this.startY = window.pageYOffset;
        }
    };
    LandingPostComponent.prototype.wordChange = function () {
        var _this = this;
        this.interval = setInterval(function () {
            _this.count++;
            _this.count2++;
            if (_this.count === 4)
                _this.count = 0;
            if (_this.count2 === 4)
                _this.count2 = 0;
            _this.getState(_this.count);
            setTimeout(function () {
                _this.getState2(_this.count2);
            }, 2000);
        }, 4000);
    };
    LandingPostComponent.prototype.getState = function (count) {
        if (!count) {
            this.state1 = states[0]; // Initial
            this.state2 = states[1]; // Inline
            this.state3 = states[1]; // Inline
            this.state4 = states[2]; // OutDown
            this.timeOut(1, 'idea');
        }
        else if (count === 1) {
            this.state1 = states[2]; // OutDown
            this.state2 = states[0]; // Initial
            this.state3 = states[1]; // Inline
            this.state4 = states[1]; // Inline
            this.timeOut(1, 'project');
        }
        else if (count === 2) {
            this.state1 = states[1]; // Inline
            this.state2 = states[2]; // OutDown
            this.state3 = states[0]; // Initial
            this.state4 = states[1]; // Inline
            this.timeOut(1, 'startup');
        }
        else if (count === 3) {
            this.state1 = states[1]; // Inline
            this.state2 = states[1]; // Inline
            this.state3 = states[2]; // OutDown
            this.state4 = states[0]; // Initial
            this.timeOut(1, 'product');
        }
    };
    LandingPostComponent.prototype.getState2 = function (count) {
        if (!count) {
            this.state2_1 = states[0]; // Initial
            this.state2_2 = states[1]; // Inline
            this.state2_3 = states[1]; // Inline
            this.state2_4 = states[2]; // OutDown
            this.timeOut(2, 'cofounder');
        }
        else if (count === 1) {
            this.state2_1 = states[2]; // OutDown
            this.state2_2 = states[0]; // Initial
            this.state2_3 = states[1]; // Inline
            this.state2_4 = states[1]; // Inline
            this.timeOut(2, 'early adopters');
        }
        else if (count === 2) {
            // this.state2_1 	= states[1]; // Inline
            this.state2_2 = states[2]; // OutDown
            this.state2_3 = states[0]; // Initial
            this.state2_4 = states[1]; // Inline
            this.timeOut(2, 'teammate');
        }
        else if (count === 3) {
            this.state2_1 = states[1]; // Inline
            this.state2_2 = states[1]; // Inline
            this.state2_3 = states[2]; // OutDown
            this.state2_4 = states[0]; // Initial
            this.timeOut(2, 'coworkers');
        }
    };
    LandingPostComponent.prototype.timeOut = function (index, word) {
        if (index === 1)
            this.hideWord = word;
        else
            this.hideWord2 = word;
    };
    /* SHOW MODAL */
    LandingPostComponent.prototype.showLoginPopOver = function () {
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_3__modals_popover_login_popover_login_component__["a" /* PopoverLoginComponent */], {});
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], LandingPostComponent.prototype, "mobile", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])("window:scroll", []),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LandingPostComponent.prototype, "onWindowScroll", null);
    LandingPostComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-landing-post',
            template: __webpack_require__("./src/app/Components/landing/landing-post/landing-post.component.html"),
            styles: [__webpack_require__("./src/app/Components/landing/landing-post/landing-post.component.scss")],
            animations: [__WEBPACK_IMPORTED_MODULE_5__Animations_rotate_word_animation__["a" /* wordRotate */]]
        }),
        __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["DOCUMENT"])),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__Services_account_service__["a" /* AccountService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_account_service__["a" /* AccountService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__["DialogService"]) === "function" && _b || Object, Object])
    ], LandingPostComponent);
    return LandingPostComponent;
    var _a, _b;
}());

//# sourceMappingURL=landing-post.component.js.map

/***/ }),

/***/ "./src/app/Components/landing/landing-projects/landing-projects.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"background\">\n<section class=\"wh-projects-around\" *ngIf=\"featuredProjects\">\n\t<h2 class=\"freigl\">featured <span>projects</span></h2>\n\t<p class=\"freigb\">A selection of great ideas posted by people who might need you</p>\n\n\t<div class=\"project-cards\" *ngIf=\"!mobile\">\n\t\t<div class=\"project-card\" *ngFor=\"let project of featuredProjects; let i = index\">\n\t\t\t<a [routerLink]=\"['/discover']\" [queryParams]=\"{ 'category': project.category_name }\" class=\"card-tag\">\n\t\t\t\t<div class=\"card-tag-content\">\n\t\t\t\t\t<div class=\"card-tag-bg\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<img src=\"public/images/tag-icon.png\">\n\t\t\t\t\t<h5>{{ project.category_name }}</h5>\n\t\t\t\t</div>\n\t\t\t</a>\n\n\t\t\t<!-- <div class=\"card-vote\" (click)=\"followProject(project.id, i)\">\n\t\t\t\t<div class=\"card-vote-bg\"></div>\n\t\t\t\t<img *ngIf=\"!project.follow\" src=\"public/images/Upvote_Icon_w.svg\">\n\t\t\t\t<img *ngIf=\"project.follow\" src=\"public/images/Upvote_Icon.svg\">\n\t\t\t\t<span>{{ project.followers }}</span>\n\t\t\t</div> -->\n\t\t\t<a [routerLink]=\"['/project', project.public_id, transformUrl(project.title)]\" class=\"card-project-page\">\n\t\t\t\t<div class=\"card-picture\" [style.background-image]=\"'url(' + transformImage(project.picture, 300, 180, 'fill') + ')'\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-info\">\n\t\t\t\t\t<div class=\"card-title-space\">\n\t\t\t\t\t\t<h4>{{ project.title }}</h4>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-status\">\n\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Company'\" src=\"public/images/live-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Idea'\" src=\"public/images/idea-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Prototype'\" src=\"public/images/drafted-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Beta product'\" src=\"public/images/beta-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t{{ project.status }}\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-location\">\n\t\t\t\t\t\t<span *ngIf=\"project.state\"><img src=\"public/images/location-picto.svg\" alt=\"location-picture\" />{{ project.city }}, {{ project.state }}</span>\n\t\t\t\t\t\t<span *ngIf=\"!project.state\"><img src=\"public/images/location-picto.svg\" alt=\"location-picture\" />{{ project.city }}, {{ project.country }}</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-description-text\">\n\t\t\t\t\t\t<p>{{ project.description | cut:true:70:' ...' }}</p>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"card-need flex\">\n\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530708/Witty-icon/Project%20Needs/Collaboration_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'for help'\">\n\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530708/Witty-icon/Project%20Needs/Feedback_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'for feedback'\">\n\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Hiring_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'to hire someone'\">\n\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Internship_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'to hire an intern'\">\n\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530708/Witty-icon/Project%20Needs/Cofounder_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'for a cofounder'\">\n\t\t\t\t\t\t<p class=\"freigb flex\">{{ transformNeedStatus(project.openingStat) }}<span *ngIf=\"project.numberOpenings > 1\">, +{{ project.numberOpenings - 1 }}</span></p>\n\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'for help'\">{{ project.title }} is looking for help</div>\n\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'for feedback'\">{{ project.title }} is looking for feedback</div>\n\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'to hire someone'\">{{ project.title }} is currently hiring</div>\n\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'to hire an intern'\">{{ project.title }}  is currently hiring interns</div>\n\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'for a cofounder'\">{{ project.title }} is looking for a cofounder</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"card-info-by\" *ngIf=\"project.username != 'Quentin Verriere' && project.username != 'Olivier Hamelin'\">\n\t\t\t\t\t\t<figure class=\"card-info-by-picture\">\n\t\t\t\t\t\t\t<img [src]=\"transformImage(project.profile_picture, 30, 30, 'fill')\" alt=\"card-foot-picture\">\n\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t<h6>{{ project.username }} <span class=\"inline\" *ngIf=\"project.members\">& {{ project.members }} more</span></h6>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</a>\n\t\t</div>\n\t</div>\n\n\t<ngx-siema class=\"project-cards\" [options]=\"options2\" *ngIf=\"mobile && featuredProjects\">\n\t\t<ngx-siema-slide class=\"project-card container\" *ngFor=\"let project of featuredProjects; let i = index\">\n\t\t\t<div class=\"card-tag\">\n\t\t\t\t<div class=\"card-tag-content\">\n\t\t\t\t\t<div class=\"card-tag-bg\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<img src=\"public/images/tag-icon.png\">\n\t\t\t\t\t<h5>{{ project.category_name }}</h5>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<!-- <div class=\"card-vote\" (click)=\"followProject(project.id, i)\">\n\t\t\t\t<div class=\"card-vote-bg\"></div>\n\t\t\t\t<img *ngIf=\"!project.follow\" src=\"public/images/Upvote_Icon_w.svg\">\n\t\t\t\t<img *ngIf=\"project.follow\" src=\"public/images/Upvote_Icon.svg\">\n\t\t\t\t<span>{{ project.followers }}</span>\n\t\t\t</div> -->\n\t\t\t<a [routerLink]=\"['/project', project.public_id, transformUrl(project.title)]\" class=\"card-project-page\">\n\t\t\t\t<div class=\"card-picture\" [style.background-image]=\"'url(' + transformImage(project.picture, 300, 180, 'fill') + ')'\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-info\">\n\t\t\t\t\t<div class=\"card-title-space\">\n\t\t\t\t\t\t<h4>{{ project.title }}</h4>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-status\">\n\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Company'\" src=\"public/images/live-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Idea'\" src=\"public/images/idea-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Prototype'\" src=\"public/images/drafted-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Beta product'\" src=\"public/images/beta-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t{{ project.status }}\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-location\">\n\t\t\t\t\t\t<span *ngIf=\"project.state\"><img src=\"public/images/location-picto.svg\" alt=\"location-picture\" />{{ project.city }}, {{ project.state }}</span>\n\t\t\t\t\t\t<span *ngIf=\"!project.state\"><img src=\"public/images/location-picto.svg\" alt=\"location-picture\" />{{ project.city }}, {{ project.country }}</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-description-text\">\n\t\t\t\t\t\t<p>{{ project.description }}</p>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"card-need flex\">\n\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530708/Witty-icon/Project%20Needs/Collaboration_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'for help'\">\n\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530708/Witty-icon/Project%20Needs/Feedback_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'for feedback'\">\n\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Hiring_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'to hire someone'\">\n\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Internship_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'to hire an intern'\">\n\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530708/Witty-icon/Project%20Needs/Cofounder_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'for a cofounder'\">\n\t\t\t\t\t\t<p class=\"freigb\">{{ transformNeedStatus(project.openingStat) }}</p>\n\t\t\t\t\t\t<!-- <div class=\"tooltipw\" *ngIf=\"project.openingStat === 'for help'\">{{ project.title }} is looking to network and meet new interesting people</div>\n\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'for feedback'\">{{ project.title }} is looking to share their work to the world</div>\n\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'to hire someone'\">{{ project.title }} is looking for a full time position</div>\n\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'to hire an intern'\">{{ project.title }} is looking for an internship</div>\n\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'for a cofounder'\">{{ project.title }} is looking to do some part time collaboration</div> -->\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"card-info-by\" *ngIf=\"project.username != 'Quentin Verriere' && project.username != 'Olivier Hamelin'\">\n\t\t\t\t\t\t<figure class=\"card-info-by-picture\">\n\t\t\t\t\t\t\t<img [src]=\"transformImage(project.profile_picture, 30, 30, 'fill')\" alt=\"card-foot-picture\">\n\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t<h6>{{ project.username }} <span class=\"inline\" *ngIf=\"project.members\">& {{ project.members }} more</span></h6>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</a>\n\t\t</ngx-siema-slide>\n\t</ngx-siema>\n\n\t<a routerLink=\"/discover\"><button class=\"freigl\">Explore projects that need you</button></a>\n</section>\n\n<section class=\"wh-trending-projects\" *ngIf=\"recentProjects\">\n\t<h2 class=\"freigl\">recently <span>posted</span></h2>\n\t<p class=\"freigb\">The latest products, ideas and companies posted by our community</p>\n\n\t<div class=\"project-cards\" *ngIf=\"!mobile\">\n\t\t<div class=\"project-card\" *ngFor=\"let project of recentProjects; let i = index\">\n\t\t\t<a [routerLink]=\"['/discover']\" [queryParams]=\"{ 'category': project.category_name }\" class=\"card-tag\">\n\t\t\t\t<div class=\"card-tag-content\">\n\t\t\t\t\t<div class=\"card-tag-bg\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<img src=\"public/images/tag-icon.png\">\n\t\t\t\t\t<h5>{{ project.category_name }}</h5>\n\t\t\t\t</div>\n\t\t\t</a>\n\n\t\t\t<!-- <div class=\"card-vote\" (click)=\"followProject(project.id, i)\">\n\t\t\t\t<div class=\"card-vote-bg\"></div>\n\t\t\t\t<img *ngIf=\"!project.follow\" src=\"public/images/Upvote_Icon_w.svg\">\n\t\t\t\t<img *ngIf=\"project.follow\" src=\"public/images/Upvote_Icon.svg\">\n\t\t\t\t<span>{{ project.followers }}</span>\n\t\t\t</div> -->\n\t\t\t<a [routerLink]=\"['/project', project.public_id, transformUrl(project.title)]\" class=\"card-project-page\">\n\t\t\t\t<div class=\"card-picture\" [style.background-image]=\"'url(' + transformImage(project.picture, 300, 180, 'fill') + ')'\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-info\">\n\t\t\t\t\t<div class=\"card-title-space\">\n\t\t\t\t\t\t<h4>{{ project.title }}</h4>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-status\">\n\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Company'\" src=\"public/images/live-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Idea'\" src=\"public/images/idea-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Prototype'\" src=\"public/images/drafted-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Beta product'\" src=\"public/images/beta-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t{{ project.status }}\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-location\">\n\t\t\t\t\t\t<span *ngIf=\"project.state\"><img src=\"public/images/location-picto.svg\" alt=\"location-picture\" />{{ project.city }}, {{ project.state }}</span>\n\t\t\t\t\t\t<span *ngIf=\"!project.state\"><img src=\"public/images/location-picto.svg\" alt=\"location-picture\" />{{ project.city }}, {{ project.country }}</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-description-text\">\n\t\t\t\t\t\t<p>{{ project.description | cut:true:70:' ...' }}</p>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"card-need flex\">\n\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530708/Witty-icon/Project%20Needs/Collaboration_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'for help'\">\n\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530708/Witty-icon/Project%20Needs/Feedback_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'for feedback'\">\n\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Hiring_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'to hire someone'\">\n\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Internship_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'to hire an intern'\">\n\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530708/Witty-icon/Project%20Needs/Cofounder_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'for a cofounder'\">\n\t\t\t\t\t\t<p class=\"freigb\">{{ transformNeedStatus(project.openingStat) }}</p>\n\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'for help'\">{{ project.title }} is looking for help</div>\n\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'for feedback'\">{{ project.title }} is looking for feedback</div>\n\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'to hire someone'\">{{ project.title }} is currently hiring</div>\n\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'to hire an intern'\">{{ project.title }}  is currently hiring interns</div>\n\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'for a cofounder'\">{{ project.title }} is looking for a cofounder</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"card-info-by\" *ngIf=\"project.username != 'Quentin Verriere' && project.username != 'Olivier Hamelin'\">\n\t\t\t\t\t\t<figure class=\"card-info-by-picture\">\n\t\t\t\t\t\t\t<img [src]=\"transformImage(project.profile_picture, 30, 30, 'fill')\" alt=\"card-foot-picture\">\n\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t<h6>{{ project.username }} <span class=\"inline\" *ngIf=\"project.members\">& {{ project.members }} more</span></h6>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</a>\n\t\t</div>\n\t</div>\n\n\t<ngx-siema class=\"project-cards\" [options]=\"options\" *ngIf=\"mobile && recentProjects\">\n\t\t<ngx-siema-slide class=\"project-card container\" *ngFor=\"let project of recentProjects; let i = index\">\n\t\t\t<div class=\"card-tag\">\n\t\t\t\t<div class=\"card-tag-content\">\n\t\t\t\t\t<div class=\"card-tag-bg\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<img src=\"public/images/tag-icon.png\">\n\t\t\t\t\t<h5>{{ project.category_name }}</h5>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<!-- <div class=\"card-vote\" (click)=\"followProject(project.id, i)\">\n\t\t\t\t<div class=\"card-vote-bg\"></div>\n\t\t\t\t<img *ngIf=\"!project.follow\" src=\"public/images/Upvote_Icon_w.svg\">\n\t\t\t\t<img *ngIf=\"project.follow\" src=\"public/images/Upvote_Icon.svg\">\n\t\t\t\t<span>{{ project.followers }}</span>\n\t\t\t</div> -->\n\t\t\t<a [routerLink]=\"['/project', project.public_id, transformUrl(project.title)]\" class=\"card-project-page\">\n\t\t\t\t<div class=\"card-picture\" [style.background-image]=\"'url(' + transformImage(project.picture, 300, 180, 'fill') + ')'\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-info\">\n\t\t\t\t\t<div class=\"card-title-space\">\n\t\t\t\t\t\t<h4>{{ project.title }}</h4>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-status\">\n\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Company'\" src=\"public/images/live-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Idea'\" src=\"public/images/idea-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Prototype'\" src=\"public/images/drafted-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Beta product'\" src=\"public/images/beta-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t{{ project.status }}\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-location\">\n\t\t\t\t\t\t<span *ngIf=\"project.state\"><img src=\"public/images/location-picto.svg\" alt=\"location-picture\" />{{ project.city }}, {{ project.state }}</span>\n\t\t\t\t\t\t<span *ngIf=\"!project.state\"><img src=\"public/images/location-picto.svg\" alt=\"location-picture\" />{{ project.city }}, {{ project.country }}</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-description-text\">\n\t\t\t\t\t\t<p>{{ project.description }}</p>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"card-need flex\">\n\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530708/Witty-icon/Project%20Needs/Collaboration_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'for help'\">\n\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530708/Witty-icon/Project%20Needs/Feedback_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'for feedback'\">\n\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Hiring_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'to hire someone'\">\n\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Internship_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'to hire an intern'\">\n\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530708/Witty-icon/Project%20Needs/Cofounder_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'for a cofounder'\">\n\t\t\t\t\t\t<p class=\"freigb\">{{ transformNeedStatus(project.openingStat) }}</p>\n\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'for help'\">{{ project.title }} is looking to network and meet new interesting people</div>\n\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'for feedback'\">{{ project.title }} is looking to share their work to the world</div>\n\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'to hire someone'\">{{ project.title }} is looking for a full time position</div>\n\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'to hire an intern'\">{{ project.title }} is looking for an internship</div>\n\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'for a cofounder'\">{{ project.title }} is looking to do some part time collaboration</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"card-info-by\" *ngIf=\"project.username != 'Quentin Verriere' && project.username != 'Olivier Hamelin'\">\n\t\t\t\t\t\t<figure class=\"card-info-by-picture\">\n\t\t\t\t\t\t\t<img [src]=\"transformImage(project.profile_picture, 30, 30, 'fill')\" alt=\"card-foot-picture\">\n\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t<h6>{{ project.username }} <span class=\"inline\" *ngIf=\"project.members\">& {{ project.members }} more</span></h6>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</a>\n\t\t</ngx-siema-slide>\n\t</ngx-siema>\n\n\t<a routerLink=\"/discover\"><button class=\"freigl\">Discover more projects</button></a>\n</section>\n</section>\n"

/***/ }),

/***/ "./src/app/Components/landing/landing-projects/landing-projects.component.scss":
/***/ (function(module, exports) {

module.exports = ".background {\n  background-color: #fff;\n  padding: 70px 0 50px 0; }\n\n.wh-profiles-around, .wh-projects-around, .wh-trending-projects, .wh-profiles-work, .wh-how {\n  width: 1000px;\n  margin: 0 auto;\n  text-align: center;\n  /*\tbutton:hover {\n\t\tbackground-color: black;\n\t\tcolor: white;\n\t}*/ }\n\n.wh-profiles-around h2, .wh-projects-around h2, .wh-trending-projects h2, .wh-profiles-work h2, .wh-how h2 {\n    font-size: 26px;\n    color: #2b2b2b;\n    line-height: 36px; }\n\n.wh-profiles-around h2 span, .wh-projects-around h2 span, .wh-trending-projects h2 span, .wh-profiles-work h2 span, .wh-how h2 span {\n      font-family: 'freigSem';\n      color: #333;\n      font-size: 26px; }\n\n.wh-profiles-around p, .wh-projects-around p, .wh-trending-projects p, .wh-profiles-work p, .wh-how p {\n    color: #999;\n    font-size: 16px;\n    margin-bottom: 30px; }\n\n.wh-profiles-around button, .wh-projects-around button, .wh-trending-projects button, .wh-profiles-work button, .wh-how button {\n    padding: 10px 15px;\n    font-family: 'freigMed';\n    font-size: 16px;\n    position: relative;\n    bottom: 1px;\n    background-color: #497faa; }\n\n.wh-profiles-around button:hover, .wh-projects-around button:hover, .wh-trending-projects button:hover, .wh-profiles-work button:hover, .wh-how button:hover {\n    background-color: #3d6a8f; }\n\n.wh-projects-around {\n  padding: 40px 30px 60px 30px; }\n\n/******************** MOBILE ****************************/\n\n@media only screen and (max-width: 736px) {\n  .background {\n    background-color: #fff;\n    padding: 40px 0 20px 0; }\n  .wh-projects-around, .wh-trending-projects {\n    width: 100vw;\n    padding: 0; }\n    .wh-projects-around p, .wh-trending-projects p {\n      padding: 0 10px; }\n    .wh-projects-around .container, .wh-trending-projects .container {\n      text-align: center; }\n  .wh-trending-projects {\n    margin-top: 40px; } }\n"

/***/ }),

/***/ "./src/app/Components/landing/landing-projects/landing-projects.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LandingProjectsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__("./node_modules/ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_popover_login_popover_login_component__ = __webpack_require__("./src/app/Components/modals/popover-login/popover-login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_Projects_projects_service__ = __webpack_require__("./src/app/Services/Projects/projects.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_Profiles_profiles_service__ = __webpack_require__("./src/app/Services/Profiles/profiles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_Pictures_pictures_service__ = __webpack_require__("./src/app/Services/Pictures/pictures.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Services_Backoffice_backoffice_service__ = __webpack_require__("./src/app/Services/Backoffice/backoffice.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/* Components */

/* Services */





var LandingProjectsComponent = /** @class */ (function () {
    function LandingProjectsComponent(ProjectsService, PicturesService, TokenService, dialogService, ProfilesService, BackofficeService) {
        this.ProjectsService = ProjectsService;
        this.PicturesService = PicturesService;
        this.TokenService = TokenService;
        this.dialogService = dialogService;
        this.ProfilesService = ProfilesService;
        this.BackofficeService = BackofficeService;
        this.body_project = {
            "query": {
                "sort": {
                    "field": "followers",
                    "reverse": true
                },
                "members": [
                    {
                        "field": "opening",
                        "value": "for anything"
                    },
                ]
            },
            "paginate": {
                "limit": 3,
                "offset": 0
            }
        };
        this.options = {
            selector: '.siema',
            duration: 200,
            easing: 'ease-out',
            perPage: 1,
            startIndex: 0,
            draggable: true,
            threshold: 20,
            loop: false,
            onInit: function () {
                // runs immediately after first initialization
            },
            onChange: function () {
                // runs after slide change
            },
        };
        this.options2 = {
            selector: '.siema',
            duration: 200,
            easing: 'ease-out',
            perPage: 1,
            startIndex: 0,
            draggable: true,
            threshold: 20,
            loop: false,
            onInit: function () {
                // runs immediately after first initialization
            },
            onChange: function () {
                // runs after slide change
            },
        };
        this.x = 0;
        this.y = 0;
        this.startX = 0;
        this.startY = 0;
        this.body_project.paginate.offset = Math.floor((Math.random() * 20) + 1);
    }
    LandingProjectsComponent.prototype.ngOnInit = function () {
        this.getProjects();
        // this.getLocation();
    };
    // getLocation() {
    // 	if (navigator.geolocation) {
    // 		navigator.geolocation.getCurrentPosition((position) => {
    // 			const lat = position.coords.latitude,
    // 				long = position.coords.longitude;
    // 			this.getPosition(lat, long);
    // 		});
    // 	} else {
    // 		console.log("Geolocation is not supported by this browser.");
    // 	}
    // }
    // getPosition(lat, long) {
    // 	this.ProfilesService.getIP(lat, long).subscribe( res => {
    // 		let city = res.results[1].address_components[0].long_name + ', ',
    // 			state = '',
    // 			country = res.results[1].address_components[3].long_name;
    // 		if (country === 'United States')
    // 			state = res.results[1].address_components[2].short_name + ', '
    // 		this.getTrendingProjects((city + state + country));
    // 	});
    // }
    LandingProjectsComponent.prototype.getProjects = function () {
        // this.ProjectsService.searchProject(this.body_project).subscribe( res => {
        // 	this.projects = res.projects
        // });
        var _this = this;
        this.BackofficeService.getSelectedProjectsProfiles('featured_projects').subscribe(function (r) {
            _this.featuredProjects = r.results;
        });
        this.BackofficeService.getSelectedProjectsProfiles('recently_projects').subscribe(function (r) {
            _this.recentProjects = r.results;
        });
    };
    // getTrendingProjects(location: string) {
    // 	this.body_project['query']['sort']['field'] = 'last_upvoted'
    // 	this.body_project['query']['members'].push({ "field": "location", "value": location })
    // 	this.getProjects();
    // }
    // followProject(id, index) {
    // 	if (!this.TokenService.getToken())
    // 		return this.showLoginPopOver();
    // 	this.ProjectsService.followProject(id, {}).subscribe( res => {
    // 		this.projects[index]['follow'] = res.success
    // 		if (res.success)
    // 			this.projects[index]['followers'] += 1
    // 		else
    // 			this.projects[index]['followers'] -= 1
    // 	});
    // }
    LandingProjectsComponent.prototype.transformNeedStatus = function (status) {
        if (status === 'for help')
            return 'any help';
        else if (status === 'for feedback')
            return 'feedback';
        else if (status === 'to hire someone')
            return 'hiring';
        else if (status === 'to hire an intern')
            return 'hiring interns';
        else if (status === 'for a cofounder')
            return 'cofounder';
    };
    /* SLIDES EVENT */
    /* SHOW MODAL */
    LandingProjectsComponent.prototype.showLoginPopOver = function () {
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_2__modals_popover_login_popover_login_component__["a" /* PopoverLoginComponent */], {});
    };
    /* TRANSFORM */
    LandingProjectsComponent.prototype.transformUrl = function (url) {
        url = url.replace(/ /g, '-');
        return url;
    };
    LandingProjectsComponent.prototype.transformImage = function (url, width, height, crop) {
        return this.PicturesService.transformImage(url, width, height, crop);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], LandingProjectsComponent.prototype, "mobile", void 0);
    LandingProjectsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-landing-projects',
            template: __webpack_require__("./src/app/Components/landing/landing-projects/landing-projects.component.html"),
            styles: [__webpack_require__("./src/public/styles/profile-card.scss"), __webpack_require__("./src/public/styles/project-card.scss"), __webpack_require__("./src/public/styles/tooltip.scss"), __webpack_require__("./src/app/Components/landing/landing-projects/landing-projects.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__Services_Projects_projects_service__["a" /* ProjectsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_Projects_projects_service__["a" /* ProjectsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__Services_Pictures_pictures_service__["a" /* PicturesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_Pictures_pictures_service__["a" /* PicturesService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__Services_Authentication_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__Services_Authentication_token_service__["a" /* TokenService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__Services_Profiles_profiles_service__["a" /* ProfilesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_Profiles_profiles_service__["a" /* ProfilesService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__Services_Backoffice_backoffice_service__["a" /* BackofficeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__Services_Backoffice_backoffice_service__["a" /* BackofficeService */]) === "function" && _f || Object])
    ], LandingProjectsComponent);
    return LandingProjectsComponent;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=landing-projects.component.js.map

/***/ }),

/***/ "./src/app/Components/landing/landing-subscribe/landing-subscribe.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wl-subscribe\">\n\t<div class=\"filter-blur\"></div>\n\t<div class=\"wls-text align-center\">\n\t\t<div class=\"wlst-1 flex\">\n\t\t\t<h2 class=\"freigl pad-l-10 btlr-4 bblr-4\">get new ideas and</h2>\n\t\t\t<h2 class=\"bold-world\">project</h2>\n\t\t\t<h2 class=\"freigl pad-r-10 btrr-4 bbrr-4\">in your box</h2>\n\t\t</div>\n\t\t<div class=\"wlst-2\">\n\t\t\t<span class=\"freigb bbrr-4 bblr-4\">We will send you weekly updates on what our community is posting</span>\n\t\t</div>\n\n\t\t<div class=\"wlst-3 flex\">\n\t\t\t<input type=\"text\" name=\"email\" placeholder=\"your email\" />\n\t\t\t<button>Subscribe</button>\n\t\t</div>\n\t</div>\n\n</div>\n\n"

/***/ }),

/***/ "./src/app/Components/landing/landing-subscribe/landing-subscribe.component.scss":
/***/ (function(module, exports) {

module.exports = ".wl-subscribe {\n  position: relative;\n  width: 100%;\n  height: 200px;\n  background-color: transparent; }\n  .wl-subscribe .wls-text {\n    position: absolute;\n    width: 600px;\n    left: 0;\n    right: 0;\n    margin: 0 auto;\n    text-align: center; }\n  .wl-subscribe .wls-text h2 {\n      font-family: 'freigLight';\n      font-size: 26px;\n      color: #222; }\n  .wl-subscribe .wls-text .btlr-4 {\n      border-top-left-radius: 4px; }\n  .wl-subscribe .wls-text .btrr-4 {\n      border-top-right-radius: 4px; }\n  .wl-subscribe .wls-text .bblr-4 {\n      border-bottom-left-radius: 4px; }\n  .wl-subscribe .wls-text .bbrr-4 {\n      border-bottom-right-radius: 4px; }\n  .wl-subscribe .wls-text .wlst-1 {\n      -webkit-box-align: start;\n          -ms-flex-align: start;\n              align-items: flex-start;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center; }\n  .wl-subscribe .wls-text .wlst-1 .bold-world {\n        font-family: 'freigSem';\n        background-color: #fff;\n        padding: 0 5px;\n        color: #333; }\n  .wl-subscribe .wls-text .wlst-1 h2 {\n        background-color: #fff; }\n  .wl-subscribe .wls-text .wlst-2 {\n      margin-bottom: 10px; }\n  .wl-subscribe .wls-text .wlst-2 span {\n        display: inline-block;\n        background-color: #fff;\n        color: #999;\n        font-size: 14px;\n        padding: 5px 5px 0px 5px;\n        position: relative;\n        bottom: 1px; }\n  .wl-subscribe .wls-text .wlst-3 {\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center; }\n  .wl-subscribe .wls-text .wlst-3 input {\n        width: 200px;\n        margin: 0;\n        border-radius: 0;\n        padding: 10px 10px 10px 15px; }\n  .wl-subscribe .wls-text .wlst-3 button {\n        border-radius: 0;\n        border-top-right-radius: 4px;\n        border-bottom-right-radius: 4px;\n        padding: 10px 15px;\n        font-family: freigMed;\n        font-size: 16px;\n        position: relative;\n        bottom: 1px; }\n"

/***/ }),

/***/ "./src/app/Components/landing/landing-subscribe/landing-subscribe.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LandingSubscribeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LandingSubscribeComponent = /** @class */ (function () {
    function LandingSubscribeComponent() {
    }
    LandingSubscribeComponent.prototype.ngOnInit = function () {
    };
    LandingSubscribeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-landing-subscribe',
            template: __webpack_require__("./src/app/Components/landing/landing-subscribe/landing-subscribe.component.html"),
            styles: [__webpack_require__("./src/app/Components/landing/landing-subscribe/landing-subscribe.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], LandingSubscribeComponent);
    return LandingSubscribeComponent;
}());

//# sourceMappingURL=landing-subscribe.component.js.map

/***/ }),

/***/ "./src/app/Components/landing/landing-testimonials/landing-testimonials.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"home-testimonials\">\n\t<div class=\"ht-reviews wh-slides swiper-container\" [swiper]=\"config2\">\n\n\t\t<div class=\"swiper-wrapper\">\n\t\t\t<div class=\"htr-1 whs-slide swiper-slide\">\n\t\t\t\t<div class=\"htr1-profile flex\">\n\t\t\t\t\t<img class=\"mar-r-10\" src=\"https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAq5AAAAJGUwODExNDllLTM0MDUtNDk4Ni1hZjZmLTMxZjEzMjk0MjIyOA.jpg\" alt=\"profile-picture\" />\n\t\t\t\t\t<div class=\"htr1p-info\">\n\t\t\t\t\t\t<h2 class=\"freigm\">Ben Orthlieb</h2>\n\t\t\t\t\t\t<p class=\"freigb mar-b-5\">Founding partner, OTG Ventures</p>\n\t\t\t\t\t\t<div class=\"location flex\">\n\t\t\t\t\t\t\t<img class=\"img-location mar-r-5\" src=\"public/images/location-picto.svg\" alt=\"location\">\n\t\t\t\t\t\t\t<span class=\"freigb\">San Francisco, CA</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<p class=\"htr1-text freigb\" *ngIf=\"!mobile\">\"Nearly all the companies I have invested in are using Witty to connect<br  /> with the talents they need on a daily basis. No matter who they're<br /> looking for, they'll find them. That's a game changer\"</p>\n\n\t\t\t\t<p class=\"htr1-text freigb\" *ngIf=\"mobile\">\"Nearly all the companies I have invested in are using Witty to connect with the talents they need on a daily basis. No matter who they're looking for, they'll find them. That's a game changer\"</p>\n\t\t\t</div>\n\n\t\t\t<div class=\"htr-2 flex whs-slide swiper-slide\">\n\t\t\t\t<div class=\"htr1-profile flex\">\n\t\t\t\t\t<img class=\"mar-r-10\" src=\"https://lh4.googleusercontent.com/-7QxOfAgREHQ/AAAAAAAAAAI/AAAAAAAAAqs/Hl52igTF2os/photo.jpgsz=200\" />\n\t\t\t\t\t<div class=\"htr1p-info\">\n\t\t\t\t\t\t<h2 class=\"freigm\">Hugo de Gentile</h2>\n\t\t\t\t\t\t<p class=\"freigb mar-b-5\">Co-founder & CEO, Prodontis</p>\n\t\t\t\t\t\t<div class=\"location flex\">\n\t\t\t\t\t\t\t<img class=\"img-location mar-r-5\" src=\"public/images/location-picto.svg\" alt=\"location\">\n\t\t\t\t\t\t\t<span class=\"freigb\">New York City, NY</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<p class=\"htr1-text freigb\" *ngIf=\"!mobile\" >\"It took me 48h to meet and hire my product designer<br /> using Witty. Before that, I had spent 6 months and tons<br /> of money using traditional recruitement platforms\"</p>\n\n\t\t\t\t<p class=\"htr1-text freigb\" *ngIf=\"mobile\">\"It took me 48h to meet and hire my product designer using Witty. Before that, I had spent 6 months and tons of money using traditional recruitement platforms\"</p>\n\t\t\t</div>\n\n\t\t\t<div class=\"htr-3 flex whs-slide swiper-slide\">\n\t\t\t\t<div class=\"htr1-profile flex\">\n\t\t\t\t\t<img class=\"mar-r-10\" src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/w_100,h_100,c_fill,g_face/v1488798888/adejisd2nrc3rtwhzdng.jpg\" alt=\"profile-picture\" />\n\t\t\t\t\t<div class=\"htr1p-info\">\n\t\t\t\t\t\t<h2 class=\"freigm\">Ana Bauer</h2>\n\t\t\t\t\t\t<p class=\"freigb mar-b-5\">Student - Humboldt University</p>\n\t\t\t\t\t\t<div class=\"location flex\">\n\t\t\t\t\t\t\t<img class=\"img-location mar-r-5\" src=\"public/images/location-picto.svg\" alt=\"location\">\n\t\t\t\t\t\t\t<span class=\"freigb\">Berlin, Germany</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<p class=\"htr1-text freigb\" *ngIf=\"!mobile\">\"I just joined a Green tech project that was recently posted<br /> here. If you're building something or think about connecting<br /> with great entrepreneurs, you found the right place\"</p>\n\n\t\t\t\t<p class=\"htr1-text freigb\" *ngIf=\"mobile\">\"I just joined a Green tech project that was recently posted here. If you're building something or think about connecting with great entrepreneurs, you found the right place\"</p>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div id=\"swiper-2\" class=\"swiper-pagination\"></div>\n\n\t</div>\n\n\t<div class=\"ht-statistics\">\n\t\t<div class=\"hts-numbers\">\n\t\t\t<div class=\"htsn-number\">\n\t\t\t\t<h2 class=\"freigs\">22363</h2>\n\t\t\t\t<!-- <h2 class=\"freigs\" counto [step]=\"15\" [countFrom]=\"countFrom\" [countTo]=\"countTo\" [duration]=\"2\" (countoChange)=\"counto = $event\">{{ counto | decimal }}</h2> -->\n\t\t\t\t<p class=\"freigb\">shared coffees</p>\n\t\t\t</div>\n\n\t\t\t<div class=\"htsn-number\">\n\t\t\t\t<h2 class=\"freigs\">56473</h2>\n\t\t\t\t<!-- <h2 class=\"freigs\" counto [step]=\"35\" [countFrom]=\"countFrom\" [countTo]=\"countTo2\" [duration]=\"2\" (countoChange)=\"counto2 = $event\">{{ counto2 | decimal }}</h2> -->\n\t\t\t\t<p class=\"freigb\">messages sent</p>\n\t\t\t</div>\n\n\t\t\t<div class=\"htsn-number\">\n\t\t\t\t<h2 class=\"freigs\">1303</h2>\n\t\t\t\t<!-- <h2 class=\"freigs\" counto [step]=\"20\" [countFrom]=\"countFrom\" [countTo]=\"countTo3\" [duration]=\"2\" (countoChange)=\"counto3 = $event\">{{ counto3 | decimal }}</h2> -->\n\t\t\t\t<p class=\"freigb\">offers posted</p>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</section>\n"

/***/ }),

/***/ "./src/app/Components/landing/landing-testimonials/landing-testimonials.component.scss":
/***/ (function(module, exports) {

module.exports = ".home-testimonials .ht-reviews {\n  width: 1000px;\n  padding: 50px; }\n  .home-testimonials .ht-reviews .htr-1, .home-testimonials .ht-reviews .htr-2, .home-testimonials .ht-reviews .htr-3 {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n  .home-testimonials .ht-reviews .htr-1 .htr1-profile, .home-testimonials .ht-reviews .htr-2 .htr1-profile, .home-testimonials .ht-reviews .htr-3 .htr1-profile {\n      margin-right: 40px; }\n  .home-testimonials .ht-reviews .htr-1 .htr1-profile img, .home-testimonials .ht-reviews .htr-2 .htr1-profile img, .home-testimonials .ht-reviews .htr-3 .htr1-profile img {\n        width: 70px;\n        height: auto;\n        border-radius: 50%; }\n  .home-testimonials .ht-reviews .htr-1 .htr1-profile .htr1p-info h2, .home-testimonials .ht-reviews .htr-2 .htr1-profile .htr1p-info h2, .home-testimonials .ht-reviews .htr-3 .htr1-profile .htr1p-info h2 {\n        font-size: 18px;\n        color: #333; }\n  .home-testimonials .ht-reviews .htr-1 .htr1-profile .htr1p-info p, .home-testimonials .ht-reviews .htr-2 .htr1-profile .htr1p-info p, .home-testimonials .ht-reviews .htr-3 .htr1-profile .htr1p-info p {\n        font-size: 14px;\n        color: #444; }\n  .home-testimonials .ht-reviews .htr-1 .htr1-profile .htr1p-info span, .home-testimonials .ht-reviews .htr-2 .htr1-profile .htr1p-info span, .home-testimonials .ht-reviews .htr-3 .htr1-profile .htr1p-info span {\n        font-size: 14px;\n        color: #999; }\n  .home-testimonials .ht-reviews .htr-1 .htr1-profile .htr1p-info .location .img-location, .home-testimonials .ht-reviews .htr-2 .htr1-profile .htr1p-info .location .img-location, .home-testimonials .ht-reviews .htr-3 .htr1-profile .htr1p-info .location .img-location {\n        width: 10px; }\n  .home-testimonials .ht-reviews .htr-1 .htr1-text, .home-testimonials .ht-reviews .htr-2 .htr1-text, .home-testimonials .ht-reviews .htr-3 .htr1-text {\n      font-size: 18px;\n      color: #444; }\n  .home-testimonials .ht-statistics .hts-numbers {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 40px 30px 100px 30px; }\n  .home-testimonials .ht-statistics .hts-numbers .htsn-number {\n    margin: 0 35px;\n    text-align: center; }\n  .home-testimonials .ht-statistics .hts-numbers .htsn-number h2 {\n      font-size: 36px;\n      color: #222;\n      margin-bottom: 10px; }\n  .home-testimonials .ht-statistics .hts-numbers .htsn-number p {\n      color: #555; }\n  @media only screen and (max-width: 736px) {\n  .home-testimonials .ht-reviews {\n    width: 100vw;\n    padding: 30px 0; }\n    .home-testimonials .ht-reviews .htr-1, .home-testimonials .ht-reviews .htr-2, .home-testimonials .ht-reviews .htr-3 {\n      display: block;\n      padding: 10px 10px 10px 20px;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center; }\n      .home-testimonials .ht-reviews .htr-1 .htr1-profile, .home-testimonials .ht-reviews .htr-2 .htr1-profile, .home-testimonials .ht-reviews .htr-3 .htr1-profile {\n        margin-right: 0;\n        margin-bottom: 15px; }\n        .home-testimonials .ht-reviews .htr-1 .htr1-profile img, .home-testimonials .ht-reviews .htr-2 .htr1-profile img, .home-testimonials .ht-reviews .htr-3 .htr1-profile img {\n          margin-right: 20px;\n          margin-left: 10px; }\n        .home-testimonials .ht-reviews .htr-1 .htr1-profile .htr1p-info .location .img-location, .home-testimonials .ht-reviews .htr-2 .htr1-profile .htr1p-info .location .img-location, .home-testimonials .ht-reviews .htr-3 .htr1-profile .htr1p-info .location .img-location {\n          width: 10px;\n          margin-right: 5px;\n          margin-left: 0; }\n        .home-testimonials .ht-reviews .htr-1 .htr1-profile .htr1p-info p, .home-testimonials .ht-reviews .htr-2 .htr1-profile .htr1p-info p, .home-testimonials .ht-reviews .htr-3 .htr1-profile .htr1p-info p {\n          margin-bottom: 5px; }\n      .home-testimonials .ht-reviews .htr-1 p, .home-testimonials .ht-reviews .htr-2 p, .home-testimonials .ht-reviews .htr-3 p {\n        margin-bottom: 25px; }\n  .home-testimonials .ht-statistics .hts-numbers {\n    display: block;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    padding: 40px 10px 40px 10px; }\n    .home-testimonials .ht-statistics .hts-numbers .htsn-number {\n      margin: 0 0 40px 0;\n      text-align: center; }\n      .home-testimonials .ht-statistics .hts-numbers .htsn-number h2 {\n        font-size: 48px;\n        color: #222;\n        margin-bottom: 10px; }\n      .home-testimonials .ht-statistics .hts-numbers .htsn-number p {\n        color: #555;\n        font-size: 28px; } }\n"

/***/ }),

/***/ "./src/app/Components/landing/landing-testimonials/landing-testimonials.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LandingTestimonialsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LandingTestimonialsComponent = /** @class */ (function () {
    function LandingTestimonialsComponent() {
        this.config2 = {
            direction: 'horizontal',
            speed: 400,
            autoplay: 8000,
            spaceBetween: 0,
            loop: true,
            pagination: '.swiper-pagination',
            paginationClickable: true,
            paginationHide: false,
        };
        this.countTo = 0;
        this.countTo2 = 0;
        this.countTo3 = 0;
    }
    LandingTestimonialsComponent.prototype.ngOnInit = function () {
        this.countTo = 10894;
        this.countTo2 = 93078;
        this.countTo3 = 34293;
    };
    // ngOnChanges(changes: SimpleChanges) {
    // 	if (changes.runNumber.currentValue) {
    // 		this.countFrom = 0;
    // 	}
    // }
    LandingTestimonialsComponent.prototype.numberWithComma = function (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], LandingTestimonialsComponent.prototype, "runNumber", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], LandingTestimonialsComponent.prototype, "mobile", void 0);
    LandingTestimonialsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-landing-testimonials',
            template: __webpack_require__("./src/app/Components/landing/landing-testimonials/landing-testimonials.component.html"),
            styles: [__webpack_require__("./src/app/Components/landing/landing-testimonials/landing-testimonials.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], LandingTestimonialsComponent);
    return LandingTestimonialsComponent;
}());

//# sourceMappingURL=landing-testimonials.component.js.map

/***/ }),

/***/ "./src/app/Components/landing/landing.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"w-landing\" *ngIf=\"check\" (scroll)=\"onWindowScroll()\">\n\t<div class=\"wl-container bg-default\">\n\t\t<img class=\"arrow-how\" src=\"/public/images/arrow-down-icon-w.svg\" alt=\"arrow-down\" />\n\t\t<div class=\"filter\"></div>\n\n\t\t<div id=\"hvbg\" class=\"whc-videobg\" *ngIf=\"!mobile\">\n\t\t\t<video poster=\"/public/images/background-home.jpg\" loop muted autoplay>\n\t\t\t\t<source src=\"public/videos/Home.mp4\" type=\"video/mp4\" />\n\t\t\t</video>\n\t\t</div>\n\n\t\t<div class=\"wl-slides align-center bb\">\n\t\t\t<div class=\"wls-slide\">\n\t\t\t\t<div class=\"wls-text\">\n\t\t\t\t\t<h1 class=\"freigl mar-b-15\"><span class=\"freigs\">So long Linked*In</span></h1>\n\t\t\t\t\t<p *ngIf=\"!mobile\" class=\"freigb\">We showcase all\n\t\t\t\t\tthe ideas, projects and startups<br />from around the world and connect them\n\t\t\t\t\tto millions <br /> of people who could work with them, including you.</p>\n\t\t\t\t\t<p *ngIf=\"mobile\" class=\"freigb\">Nobody can build great things alone. We showcase all the ideas, projects and startups from around the world and connect them to all the people they need, instantly.</p>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"wls-login\">\n\t\t\t\t\t<!-- <div class=\"login-modal-social signup-login-social\">\n\t\t\t\t        <div class=\"fb-login\">\n\t\t\t\t            <a href=\"/api/auth/facebook\" target=\"_self\">\n\t\t\t\t                <button><i class=\"fa fa-facebook\" style=\"color: white\"></i>Login with Facebook</button>\n\t\t\t\t            </a>\n\t\t\t\t        </div>\n\t\t\t\t        <div class=\"go-login\">\n\t\t\t\t            <a href=\"/api/auth/google\" target=\"_self\">\n\t\t\t\t                <button class=\"go-login\"><img src=\"/public/images/social_media/newgoogle-logo.svg\">Login with Google</button>\n\t\t\t\t            </a>\n\t\t\t\t        </div>\n\t\t\t\t    </div>\n\n\t\t\t\t    <a class=\"freigb cursor-pt\" (click)=\"switchToSignUp()\">Sign up with email</a> -->\n\t\t\t\t    <button (click)=\"signIn()\">Claim your account</button>\n\t\t\t\t</div>\n\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<!-- <div class=\"wl-container bg-default\" *ngIf=\"mobile\">\n\t\t<div class=\"filter\"></div>\n\t\t<img class=\"arrow-how\" src=\"/public/images/arrow-down-icon-w.svg\" alt=\"arrow-down\" />\n\n\t\t<div class=\"whcm-slides\">\n\t\t\t<div class=\"whcm-text\">\n\t\t\t\t<h1 class=\"freigl mar-b-10\"><span class=\"freigs\">Scaling</span> the <span class=\"freigs\">entrepreneurial</span> ecosystem</h1>\n\t\t\t\t<p class=\"freigb mar-b-10\">We give exposure to all the ideas, projects and startups from around the world and connect them to all the people they need, instantly</p>\n\n\t\t\t\t<div class=\"whcm-buttons\">\n\t\t\t\t\t<a [routerLink]=\"['/meet']\"><button class=\"button-meet mar-b-15 freigm\">Find the people you need</button></a>\n\t\t\t\t\t<a [routerLink]=\"['/discover']\"><button class=\"button-discover freigm\">Discover projects to help</button></a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div> -->\n\n\t<app-landing-post [mobile]=\"mobile\"></app-landing-post>\n\t<app-landing-projects [mobile]=\"mobile\"></app-landing-projects>\n<!-- \t<app-landing-subscribe></app-landing-subscribe>\n -->\n \t<app-landing-people [mobile]=\"mobile\"></app-landing-people>\n\t<app-footer></app-footer>\n</div>\n"

/***/ }),

/***/ "./src/app/Components/landing/landing.component.scss":
/***/ (function(module, exports) {

module.exports = "@-webkit-keyframes bounceMe {\n  0%, 20%, 53%, 80%, 100% {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0); }\n  40%, 43% {\n    -webkit-transform: translate3d(0, -30px, 0);\n    transform: translate3d(0, -10px, 0); }\n  40%, 43%, 70% {\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06); }\n  70% {\n    -webkit-transform: translate3d(0, -15px, 0);\n    transform: translate3d(0, -15px, 0); }\n  90% {\n    -webkit-transform: translate3d(0, -4px, 0);\n    transform: translate3d(0, -4px, 0); } }\n\n@keyframes bounceMe {\n  0%, 20%, 53%, 80%, 100% {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0); }\n  40%, 43% {\n    -webkit-transform: translate3d(0, -30px, 0);\n    transform: translate3d(0, -10px, 0); }\n  40%, 43%, 70% {\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06); }\n  70% {\n    -webkit-transform: translate3d(0, -15px, 0);\n    transform: translate3d(0, -15px, 0); }\n  90% {\n    -webkit-transform: translate3d(0, -4px, 0);\n    transform: translate3d(0, -4px, 0); } }\n\n#w-landing {\n  position: relative;\n  /*\tperspective: 1px;\n*/\n  /*height: 100vh;*/\n  /*\toverflow-x: hidden;\n\toverflow-y: auto;*/\n  /*\tperspective-origin-x: 100%;\n*/\n  /*.parallax__layer {\n    \tposition: absolute;\n\t\ttop: 450px;\n\t\tright: 0;\n\t\tbottom: 0;\n\t\tleft: 0;\n    \ttransform-origin-x: 100%;\n    }\n\n    .parallax__group {\n\t\tposition: absolute;\n\t\theight: 100vh;\n\t\ttransform-style: preserve-3d;\n\t\tz-index: -1\n\t}\n\n    .parallax__layer--base {\n    \topacity: 0;\n    \twidth: 100vw;\n\t\ttransform: translateZ(0);\n\t}\n\n\t.parallax__layer--fore {\n\t\twidth: 100vw;\n\t\ttransform: translateZ(0.2px);\n\t}\n\n\t.parallax__layer--back {\n\t\twidth: 100vw;\n\t\ttransform: translateZ(0.1px);\n\t}*/\n  /*\t.base {\n\t\topacity: 0;\n\t\ttransform: translateZ(0);\n\t\twidth: 100vw;\n\t\tz-index: -1;\n\t}*/ }\n\n#w-landing .wl-container {\n    position: relative;\n    background: rgba(0, 0, 0, 0.5);\n    /* For Safari 5.1 to 6.0 */\n    /* For Opera 11.1 to 12.0 */\n    /* For Firefox 3.6 to 15 */\n    background: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0.9)));\n    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9));\n    /* Standard syntax (must be last) */\n    overflow-x: hidden; }\n\n#w-landing .wl-container .arrow-how {\n      position: absolute;\n      bottom: 0;\n      z-index: 499;\n      width: 20px;\n      left: 0;\n      right: 0;\n      margin: 0 auto;\n      margin-bottom: 20px;\n      -webkit-animation: bounceMe 2s infinite;\n      /* Safari 4+ */\n      /* Fx 5+ */\n      /* Opera 12+ */\n      animation: bounceMe 2s infinite;\n      /* IE 10+, Fx 29+ */ }\n\n#w-landing .wl-container .whc-videobg {\n      height: 100vh;\n      -webkit-filter: brightness(0.25);\n      -moz-filter: brightness(0.25);\n      -o-filter: brightness(0.25);\n      -ms-filter: brightness(0.25);\n      filter: brightness(0.25); }\n\n#w-landing .wl-container .wl-slides {\n      position: absolute;\n      width: 900px;\n      top: 50%;\n      right: 0;\n      left: 0;\n      margin: 0 auto;\n      padding: 80px 30px 80px 60px; }\n\n#w-landing .wl-container .wl-slides .wls-slide {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex; }\n\n#w-landing .wl-container .wl-slides .wls-slide .wls-text h1 {\n          font-size: 32px;\n          line-height: 40px; }\n\n#w-landing .wl-container .wl-slides .wls-slide .wls-text span {\n          font-size: 32px; }\n\n#w-landing .wl-container .wl-slides .wls-slide .wls-text p {\n          font-size: 20px;\n          line-height: 24px; }\n\n#w-landing .wl-container .wl-slides .wls-slide .wls-login {\n          position: relative;\n          top: 63px;\n          margin-left: 150px;\n          text-align: center;\n          -ms-flex-item-align: center;\n              -ms-grid-row-align: center;\n              align-self: center; }\n\n#w-landing .wl-container .wl-slides .wls-slide .wls-login h4 {\n            font-size: 18;\n            line-height: 20px;\n            color: #7c7c7c; }\n\n#w-landing .wl-container .wl-slides .wls-slide .wls-login .signup-login-social {\n            text-align: left; }\n\n#w-landing .wl-container .wl-slides .wls-slide .wls-login .go-login .fa-facebook, #w-landing .wl-container .wl-slides .wls-slide .wls-login .fb-login .fa-facebook {\n            padding: 0 10px; }\n\n#w-landing .wl-container .wl-slides .wls-slide .wls-login .go-login button, #w-landing .wl-container .wl-slides .wls-slide .wls-login .fb-login button {\n            padding: 8px 25px 8px 10px;\n            font-size: 14px; }\n\n#w-landing .wl-container .wl-slides .wls-slide .wls-login .fb-login {\n            margin-bottom: 10px; }\n\n#w-landing .wl-container .wl-slides .wls-slide .wls-login .fb-login button {\n              padding: 8px 17px 8px 12px; }\n\n#w-landing .wl-container .wl-slides .wls-slide .wls-login .go-login {\n            margin-bottom: 5px; }\n\n#w-landing .wl-container .wl-slides .wls-slide .wls-login .go-login img {\n              width: 12px; }\n\n#w-landing .wl-container .wl-slides .wls-slide .wls-login button {\n            font-size: 16px;\n            padding: 6px 45px 8px 45px;\n            font-family: 'FreigMed'; }\n\n#w-landing .wl-container .wl-slides .wls-slide .wls-login button:hover {\n            background-color: #fd373c; }\n\n/******************** MOBILE ****************************/\n\n@media only screen and (max-width: 736px) {\n  #w-landing .wl-container {\n    height: 100vh;\n    background: none;\n    background-image: url(\"/public/images/bg_mobile/bg_home_mobile.jpg\"); }\n    #w-landing .wl-container .filter {\n      height: inherit;\n      background: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.6)), to(rgba(0, 0, 0, 0.7)));\n      background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)); }\n    #w-landing .wl-container .arrow-how {\n      margin-bottom: 70px; }\n    #w-landing .wl-container .wl-slides {\n      width: 100vw;\n      padding: 80px 25px 80px 25px; }\n      #w-landing .wl-container .wl-slides .wls-slide {\n        display: block; }\n        #w-landing .wl-container .wl-slides .wls-slide .wls-text {\n          margin-bottom: 30px; }\n          #w-landing .wl-container .wl-slides .wls-slide .wls-text h1 {\n            font-size: 28px;\n            line-height: 28px; }\n            #w-landing .wl-container .wl-slides .wls-slide .wls-text h1 span {\n              font-size: 24px; }\n          #w-landing .wl-container .wl-slides .wls-slide .wls-text p {\n            font-size: 18px; }\n        #w-landing .wl-container .wl-slides .wls-slide .wls-login {\n          margin-left: 0; }\n          #w-landing .wl-container .wl-slides .wls-slide .wls-login .login-modal-social {\n            text-align: center; }\n            #w-landing .wl-container .wl-slides .wls-slide .wls-login .login-modal-social .fb-login, #w-landing .wl-container .wl-slides .wls-slide .wls-login .login-modal-social .go-login {\n              text-align: center; } }\n\n@media only screen and (max-width: 320px) {\n  #w-landing .wl-container .wl-slides {\n    width: 100vw;\n    padding: 80px 15px 80px 15px; } }\n"

/***/ }),

/***/ "./src/app/Components/landing/landing.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LandingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_shared_service__ = __webpack_require__("./src/app/Services/shared.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_meta_service__ = __webpack_require__("./src/app/Services/meta.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Services_Trackings_tracking_service__ = __webpack_require__("./src/app/Services/Trackings/tracking.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/* Services */




var LandingComponent = /** @class */ (function () {
    function LandingComponent(route, router, TokenService, SharedService, MetaService, Title, TrackingService) {
        this.route = route;
        this.router = router;
        this.TokenService = TokenService;
        this.SharedService = SharedService;
        this.MetaService = MetaService;
        this.Title = Title;
        this.TrackingService = TrackingService;
        this.check = false;
        this.check2 = false;
        this.runNumber = false;
        this.mobile = false;
        this.checkLogin();
        if ((window.innerWidth) < 736)
            this.mobile = true;
    }
    LandingComponent.prototype.ngOnInit = function () {
        this.setMetaData();
        this.trackViewPage();
    };
    LandingComponent.prototype.trackViewPage = function () {
        var token = this.TokenService.getToken();
        this.TrackingService.viewActivities({}, token, 4).subscribe(function (r) { });
    };
    LandingComponent.prototype.setMetaData = function () {
        this.Title.setTitle("Witty | Networking for the entrepreneurial age");
        this.MetaService.setMeta('description', "We showcase all the ideas, products, initiatives and startups from around the world and connect them to all the people they need, including you.");
        this.MetaService.setMeta('og:title', "Witty - Networking for the entrepreneurial age");
        this.MetaService.setMeta('og:description', "We showcase all the ideas, products, initiatives and startups from around the world and connect them to all the people they need, including you.");
        this.MetaService.setMeta('og:url', 'https://www.wittycircle.com');
        this.MetaService.setMeta('og:image', 'http://res.cloudinary.com/dqpkpmrgk/image/upload/v1508448660/Share_Link_Cards_Facebook/Folger_Coffee_Company_Building__San_Francisco_2.jpg');
    };
    LandingComponent.prototype.signIn = function () {
        this.SharedService.setSignUpStatus(true);
    };
    // switchToSignUp() {
    // 	this.SharedService.setSignUpStatus(true);
    // }
    LandingComponent.prototype.checkLogin = function () {
        if (this.TokenService.getToken())
            this.router.navigate(['/welcome']);
        else
            this.check = true;
    };
    LandingComponent.prototype.onWindowScroll = function () {
        var number = document.documentElement.scrollTop;
        if (number >= 1100 && number < 1700 && !this.check2) {
            this.runNumber = this.check2 = true;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])("window:scroll", []),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LandingComponent.prototype, "onWindowScroll", null);
    LandingComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-landing',
            template: __webpack_require__("./src/app/Components/landing/landing.component.html"),
            styles: [__webpack_require__("./src/app/Components/landing/landing.component.scss"), __webpack_require__("./src/public/styles/login-signup-modal.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__Services_Authentication_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_Authentication_token_service__["a" /* TokenService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__Services_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_shared_service__["a" /* SharedService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__Services_meta_service__["a" /* MetaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_meta_service__["a" /* MetaService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["Title"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["Title"]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_6__Services_Trackings_tracking_service__["a" /* TrackingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__Services_Trackings_tracking_service__["a" /* TrackingService */]) === "function" && _g || Object])
    ], LandingComponent);
    return LandingComponent;
    var _a, _b, _c, _d, _e, _f, _g;
}());

//# sourceMappingURL=landing.component.js.map

/***/ }),

/***/ "./src/app/Components/landing/landing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LandingModule", function() { return LandingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__ = __webpack_require__("./src/app/Pipes/pipe.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__footer_footer_module__ = __webpack_require__("./src/app/Components/footer/footer.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Services_account_service__ = __webpack_require__("./src/app/Services/account.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Services_Pictures_pictures_service__ = __webpack_require__("./src/app/Services/Pictures/pictures.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Services_Projects_projects_service__ = __webpack_require__("./src/app/Services/Projects/projects.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Services_Profiles_profiles_service__ = __webpack_require__("./src/app/Services/Profiles/profiles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ngx_siema__ = __webpack_require__("./node_modules/ngx-siema/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ngx_swiper_wrapper__ = __webpack_require__("./node_modules/ngx-swiper-wrapper/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ngx_swiper_wrapper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_ngx_swiper_wrapper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Routes_landing_routes__ = __webpack_require__("./src/app/Routes/landing.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__landing_component__ = __webpack_require__("./src/app/Components/landing/landing.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__landing_post_landing_post_component__ = __webpack_require__("./src/app/Components/landing/landing-post/landing-post.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__landing_projects_landing_projects_component__ = __webpack_require__("./src/app/Components/landing/landing-projects/landing-projects.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__landing_people_landing_people_component__ = __webpack_require__("./src/app/Components/landing/landing-people/landing-people.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__landing_subscribe_landing_subscribe_component__ = __webpack_require__("./src/app/Components/landing/landing-subscribe/landing-subscribe.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__landing_testimonials_landing_testimonials_component__ = __webpack_require__("./src/app/Components/landing/landing-testimonials/landing-testimonials.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__Services_Backoffice_backoffice_service__ = __webpack_require__("./src/app/Services/Backoffice/backoffice.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






/* Components */
/* Directives */
/* Services */




/* Library */


// import { CountoModule }  from 'angular2-counto';
/* Route */








var SWIPER_CONFIG = {
    direction: 'horizontal',
    slidesPerView: 'auto',
    keyboardControl: true,
    speed: 300,
};
var LandingModule = /** @class */ (function () {
    function LandingModule() {
    }
    LandingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_12__Routes_landing_routes__["a" /* LANDING_ROUTES */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["f" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_5__footer_footer_module__["a" /* FooterModule */],
                __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__["a" /* PipeModule */],
                __WEBPACK_IMPORTED_MODULE_10_ngx_siema__["a" /* NgxSiemaModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_11_ngx_swiper_wrapper__["SwiperModule"].forRoot(SWIPER_CONFIG),
            ],
            exports: [],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_13__landing_component__["a" /* LandingComponent */],
                __WEBPACK_IMPORTED_MODULE_14__landing_post_landing_post_component__["a" /* LandingPostComponent */],
                __WEBPACK_IMPORTED_MODULE_15__landing_projects_landing_projects_component__["a" /* LandingProjectsComponent */],
                __WEBPACK_IMPORTED_MODULE_16__landing_people_landing_people_component__["a" /* LandingPeopleComponent */],
                __WEBPACK_IMPORTED_MODULE_17__landing_subscribe_landing_subscribe_component__["a" /* LandingSubscribeComponent */],
                __WEBPACK_IMPORTED_MODULE_18__landing_testimonials_landing_testimonials_component__["a" /* LandingTestimonialsComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__Services_account_service__["a" /* AccountService */],
                __WEBPACK_IMPORTED_MODULE_7__Services_Pictures_pictures_service__["a" /* PicturesService */],
                __WEBPACK_IMPORTED_MODULE_8__Services_Projects_projects_service__["a" /* ProjectsService */],
                __WEBPACK_IMPORTED_MODULE_9__Services_Profiles_profiles_service__["a" /* ProfilesService */],
                __WEBPACK_IMPORTED_MODULE_19__Services_Backoffice_backoffice_service__["a" /* BackofficeService */]
            ]
        })
    ], LandingModule);
    return LandingModule;
}());

//# sourceMappingURL=landing.module.js.map

/***/ }),

/***/ "./src/app/Routes/landing.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LANDING_ROUTES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Components_landing_landing_component__ = __webpack_require__("./src/app/Components/landing/landing.component.ts");

/* Components */

/* Librairies */
// import { MetaGuard } from '@ngx-meta/core';
var routes = [
    { path: '', canActivate: [], component: __WEBPACK_IMPORTED_MODULE_1__Components_landing_landing_component__["a" /* LandingComponent */],
    }
];
var LANDING_ROUTES = __WEBPACK_IMPORTED_MODULE_0__angular_router__["f" /* RouterModule */].forChild(routes);
//# sourceMappingURL=landing.routes.js.map

/***/ })

});
//# sourceMappingURL=landing.module.chunk.js.map