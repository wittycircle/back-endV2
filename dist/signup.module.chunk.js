webpackJsonp(["signup.module"],{

/***/ "./src/app/Animations/fadeInWord.animation.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fadeInWord; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");

/* Slide Right/Left dialog */
var fadeInWord = Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('fadeInWord', [
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('fadeIn', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
        opacity: 1,
    })),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('fadeOut', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
        opacity: 0,
    })),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('fadeIn => fadeOut', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('300ms')),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('fadeOut => fadeIn', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('300ms 200ms'))
]);
//# sourceMappingURL=fadeInWord.animation.js.map

/***/ }),

/***/ "./src/app/Components/signup/signup-about/signup-about.component.html":
/***/ (function(module, exports) {

module.exports = "<section id=\"signup-about-body\" [@slideRight]=\"stateRight\" [@slideLeft]=\"stateLeft\" aboutDiv>\n\t<div class=\"signup-body-nav\">\n\t\t<ul>\n\t\t\t<li class=\"sbnba\" (click)=\"slideModals(1)\">Basics</li>\n\t\t\t<li class=\"sbnex\" (click)=\"slideModals(2)\">Experience</li>\n\t\t\t<li class=\"sbnsk\" (click)=\"slideModals(3)\">Skills</li>\n\t\t\t<li class=\"sbnin\" (click)=\"slideModals(4)\">Interests</li>\n\t\t\t<li class=\"sbnab\"><strong>About you</strong></li>\n\t\t</ul>\n\t</div>\n\n\t<div class=\"signup-about-body\">\n\t\t<div class=\"signup-about-aboutarea\">\n\t\t\t<div class=\"signup-aboutarea-text\">\n\t\t\t\t<textarea rows=\"1\" [(ngModel)]=\"about\" placeholder=\"Elon, 46, I love building 🚀\" ></textarea>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"signup-about-status\">\n\t\t\t<div class=\"signup-status-general\">\n\t\t\t\t<div class=\"signup-status-area1 ssar\">\n\t\t\t\t\t<div class=\"ssa ssa1\">\n\t\t\t\t\t\t<h1>I am looking</h1>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"signup-status-dropdown\">\n\t\t\t\t\t\t<div id=\"ssd\" class=\"ssa ssa2\">\n\t\t\t\t\t\t\t<h1>{{ status }}</h1>\n\t\t\t\t\t\t\t<img id=\"ssd-i\" src=\"/public/images/arrow-down-icon-b.svg\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div id=\"ssdbox\" class=\"ssa2-dropdown\">\n\t\t\t\t\t\t\t<li (click)=\"selectStatus('to meet smart people')\">to meet smart people</li>\n\t\t\t\t\t\t\t<li (click)=\"selectStatus('to share')\">to share what I'm working on</li>\n\t\t\t\t\t\t\t<li (click)=\"selectStatus('for a full time position')\">for a full time position</li>\n\t\t\t\t\t\t\t<li (click)=\"selectStatus('for an internship')\">for an internship</li>\n\t\t\t\t\t\t\t<li (click)=\"selectStatus('for part time collaboration')\">for part time collaboration</li>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class=\"signup-about-button freigm\">\n\t\t<span (click)=\"slideModals(4)\">Back</span>\n\t\t<button (click)=\"updateProfile()\">Done</button>\n\t</div>\n</section>\n\n<div class=\"whp-10th\" *ngIf=\"profile\" [@slideRight]=\"stateFinal\">\n\t<h1>Thanks {{ profile.first_name }} ✌🏼</h1>\n\n\t<p class=\"whp-coms-text freigb mar-b-10\">Redirecting you to your new home</p>\n\n\t<div class=\"spinner\"></div>\n</div>\n"

/***/ }),

/***/ "./src/app/Components/signup/signup-about/signup-about.component.scss":
/***/ (function(module, exports) {

module.exports = "/*** ABOUT PART ***/\n@-webkit-keyframes spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n@keyframes spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n.spinner {\n  margin: 0 auto;\n  border: 2px solid transparent;\n  border-top: 2px solid #fff;\n  border-radius: 50%;\n  width: 30px;\n  height: 30px;\n  -webkit-animation: spin 2s linear infinite;\n  animation: spin 0.5s linear infinite; }\n.whp-10th {\n  position: absolute;\n  width: 700px;\n  top: 50%;\n  -webkit-transform: perspective(1px) translateY(-50%);\n  transform: perspective(1px) translateY(-50%);\n  left: 0;\n  right: -10000px;\n  z-index: 100;\n  text-align: center;\n  margin: 0 auto; }\n.whp-10th button {\n    font-family: 'freigMed'; }\n.whp-10th h1 {\n    font-family: 'FreigSem';\n    font-size: 28px;\n    margin-bottom: 5px; }\n.whp-10th .spinner-load .spinner-item {\n    top: 45%;\n    width: 9px;\n    height: 9px; }\n.whp-10th .whp-coms-text {\n    font-size: 17px;\n    opacity: 0.7; }\n#signup-about-body {\n  position: absolute;\n  background-color: transparent;\n  margin-left: auto;\n  margin-right: auto;\n  left: 0;\n  right: -10000px;\n  max-width: 800px;\n  top: 180px;\n  border-radius: 4px;\n  -webkit-animation-duration: 0.5s;\n  -kthtml-animation-duration: 0.5s;\n  animation-duration: 0.5s; }\n#signup-about-body h4 {\n    font-family: 'FreigBook';\n    font-size: 18px;\n    color: #222222; }\n#signup-about-body .signup-body-nav {\n    background-color: #fff;\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px; }\n#signup-about-body .signup-about-body {\n    padding-bottom: 50px;\n    background-color: #fff;\n    border-bottom-left-radius: 4px;\n    border-bottom-right-radius: 4px;\n    margin-bottom: 30px; }\n#signup-about-body .signup-about-status {\n    padding: 10px 30px;\n    text-align: left; }\n#signup-about-body .signup-about-status .signup-status-general {\n      padding: 0 15px;\n      text-align: center; }\n#signup-about-body .signup-about-status .signup-status-general .ssa {\n        display: inline-block; }\n#signup-about-body .signup-about-status .signup-status-general .ssa h1 {\n          font-family: 'FreigLight';\n          font-size: 24px;\n          color: #222222; }\n#signup-about-body .signup-about-status .signup-status-general .ssa2 {\n        margin-left: 5px;\n        cursor: pointer; }\n#signup-about-body .signup-about-status .signup-status-general .ssa2 h1 {\n          display: inline-block;\n          border-bottom: 1px solid #416299;\n          color: #416299; }\n#signup-about-body .signup-about-status .signup-status-general .ssa2 img {\n          display: inline-block;\n          margin-left: 4px;\n          width: 15px;\n          height: auto;\n          -webkit-transition-duration: 0.2s;\n          -kthtml-transition-duration: 0.2s;\n          transition-duration: 0.2s; }\n#signup-about-body .signup-about-status .signup-status-general .signup-status-dropdown {\n        display: inline-block; }\n#signup-about-body .signup-about-status .signup-status-general .signup-status-dropdown .ssa2-dropdown {\n          position: absolute;\n          display: none;\n          margin-left: 10px;\n          margin-top: 4px;\n          background-color: white;\n          border-radius: 8px;\n          -webkit-box-shadow: 0px 2px 8px #e5e5e5;\n                  box-shadow: 0px 2px 8px #e5e5e5;\n          text-align: left;\n          z-index: 99999; }\n#signup-about-body .signup-about-status .signup-status-general .signup-status-dropdown .ssa2-dropdown li {\n            border-radius: 4px;\n            padding: 5px 20px;\n            font-family: 'FreigBook';\n            font-size: 18px;\n            color: #999999;\n            cursor: pointer; }\n#signup-about-body .signup-about-status .signup-status-general .signup-status-dropdown .ssa2-dropdown li:hover {\n            background-color: #f5f5f5; }\n#signup-about-body .signup-about-status .signup-status-general .signup-status-area1 {\n        margin-top: 15px; }\n#signup-about-body .signup-about-status .signup-status-general .signup-status-area2 {\n        margin-top: 10px; }\n#signup-about-body .signup-about-aboutarea {\n    text-align: left;\n    padding: 10px 100px; }\n#signup-about-body .signup-about-aboutarea h4 {\n      color: #999;\n      margin: 0 15px; }\n#signup-about-body .signup-about-aboutarea .signup-aboutarea-text {\n      padding: 0 15px; }\n#signup-about-body .signup-about-aboutarea .signup-aboutarea-text .redactor-editor {\n        padding: 10px 15px;\n        border-radius: 4px;\n        min-height: 150px !important;\n        max-height: 300px !important; }\n#signup-about-body .signup-about-aboutarea .signup-aboutarea-text .redactor-editor p {\n          font-family: 'FreigBook';\n          font-size: 16px;\n          margin-bottom: 0; }\n#signup-about-body .signup-about-aboutarea .signup-aboutarea-text .redactor-placeholder:after {\n        font-family: 'FreigBook';\n        font-size: 16px; }\n#signup-about-body .signup-about-aboutarea .signup-aboutarea-text textarea {\n        width: 100%;\n        border: 1px solid #e5e5e5;\n        border-radius: 4px;\n        padding: 10px 15px;\n        resize: none;\n        font-family: 'FreigBook';\n        font-size: 16px;\n        border: 0;\n        border-bottom: 1px solid #999;\n        border-radius: 0;\n        height: auto;\n        min-height: auto;\n        padding: 10px 5px; }\n#signup-about-body .signup-about-aboutarea .signup-aboutarea-text textarea:focus {\n        outline: none; }\n#signup-about-body .signup-about-button button {\n    display: inline-block;\n    padding: 6px 30px 8px 30px;\n    font-family: 'FreigMed'; }\n#signup-about-body .signup-about-button span {\n    margin-right: 20px;\n    font-family: 'FreigBook';\n    font-size: 18px;\n    color: #999999;\n    cursor: pointer; }\n/******************** MOBILE ****************************/\n@media only screen and (max-width: 736px) {\n  #signup-about-body {\n    top: 0; }\n    #signup-about-body .signup-about-status {\n      padding: 15px; }\n    #signup-about-body .signup-about-aboutarea {\n      padding: 10px; } }\n"

/***/ }),

/***/ "./src/app/Components/signup/signup-about/signup-about.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupAboutComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_Profiles_profiles_service__ = __webpack_require__("./src/app/Services/Profiles/profiles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_shared_service__ = __webpack_require__("./src/app/Services/shared.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Animations_animations__ = __webpack_require__("./src/app/Animations/animations.ts");
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


/* Animations */

var SignupAboutComponent = /** @class */ (function () {
    function SignupAboutComponent(ProfilesService, SharedService, route) {
        var _this = this;
        this.ProfilesService = ProfilesService;
        this.SharedService = SharedService;
        this.route = route;
        this.status = "to meet smart people";
        this.stateRight = 'out';
        this.stateFinal = 'out';
        this.subscription = SharedService.signupModal$.subscribe(function (res) {
            if (res['index'] === 5) {
                _this.stateRight = 'in';
            }
        });
    }
    SignupAboutComponent.prototype.ngOnInit = function () {
        this.about = this.profile['description'];
    };
    SignupAboutComponent.prototype.selectStatus = function (status) {
        if (status === 'to share')
            this.status = "to share what I'm working on";
        else
            this.status = status;
    };
    // getProfile() {
    // 	console.log(this.pipe.transform(this.profile['description']));
    // }
    SignupAboutComponent.prototype.updateProfile = function () {
        var _this = this;
        var body = {
            description: this.replaceNewline(this.about || ''),
            about: this.status
        };
        this.ProfilesService.updateProfile(this.profile['uid'], body).subscribe(function (res) {
            if (res.success) {
                _this.slideModals(6);
                _this.stateLeft = 'out';
                _this.stateFinal = 'in';
                setTimeout(function () {
                    _this.redirectToProfile();
                }, 2000);
            }
        });
    };
    SignupAboutComponent.prototype.redirectToProfile = function () {
        this.route.navigate(['/', 'welcome']);
    };
    SignupAboutComponent.prototype.replaceNewline = function (text) {
        return text.replace(/\r?\n/g, '<br />');
    };
    SignupAboutComponent.prototype.slideModals = function (index) {
        this.stateRight = 'out';
        this.SharedService.setSignupModalIndex(index, 5);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], SignupAboutComponent.prototype, "profile", void 0);
    SignupAboutComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-signup-about',
            template: __webpack_require__("./src/app/Components/signup/signup-about/signup-about.component.html"),
            styles: [__webpack_require__("./src/app/Components/signup/signup-about/signup-about.component.scss"), __webpack_require__("./src/public/styles/signup.scss")],
            animations: [__WEBPACK_IMPORTED_MODULE_4__Animations_animations__["o" /* slideRight */], __WEBPACK_IMPORTED_MODULE_4__Animations_animations__["n" /* slideLeft */]],
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__Services_Profiles_profiles_service__["a" /* ProfilesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_Profiles_profiles_service__["a" /* ProfilesService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__Services_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_shared_service__["a" /* SharedService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _c || Object])
    ], SignupAboutComponent);
    return SignupAboutComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=signup-about.component.js.map

/***/ }),

/***/ "./src/app/Components/signup/signup-experience/signup-experience.component.html":
/***/ (function(module, exports) {

module.exports = "<section id=\"signup-experience-body\" [@slideRight]=\"stateRight\" [@slideLeft]=\"stateLeft\">\n\t<div class=\"signup-body-nav\">\n\t\t<ul>\n\t\t\t<li class=\"sbnba\" (click)=\"slideModals(1)\">Basics</li>\n\t\t\t<li class=\"sbnex\"><strong>Experience</strong></li>\n\t\t\t<li class=\"sbnsk\" (click)=\"slideModals(3)\">Skills</li>\n\t\t\t<li class=\"sbnin\" (click)=\"slideModals(4)\">Interests</li>\n\t\t\t<li class=\"sbnab\" (click)=\"slideModals(5)\">About you</li>\n\t\t</ul>\n\t</div>\n\n\t<div class=\"signup-experience-add\">\n\t\t<div class=\"signup-experience-title mar-b-15\">\n\t\t\t<h3>Tell us about your work experience</h3>\n\t\t</div>\n\n\t\t<!-- <div class=\"signup-experience-linkedin\">\n\t\t\t<button type=\"button\" (click)=\"getLinkedinField()\">\n\t\t\t\t<img *ngIf=\"!onImport\" src=\"/public/images/social_media/linkedin-logo.svg\" />\n\t\t\t\t<span *ngIf=\"!onImport\">Import from Linkedin</span>\n\t\t\t\t<div *ngIf=\"onImport\" class=\"spinner-load\">\n\t\t\t\t<div class=\"spinner__item1 spinner-item\"></div>\n\t\t\t\t<div class=\"spinner__item2 spinner-item\"></div>\n\t\t\t\t<div class=\"spinner__item3 spinner-item\"></div>\n\t\t\t\t</div>\n\t\t\t</button>\n\t\t\t<p *ngIf=\"noCurrentPosition\" style=\"font-size: 16px; font-family: 'FreigBook'; color: red; margin-top: 5px\">You don't have any current positions from LinkedIn</p>\n\t\t</div> -->\n\n\t\t<div class=\"wpha-right\">\n\t\t\t<button (click)=\"openLinkedInApiModal()\" class=\"freigb flex\"><img class=\"mar-r-10\" src=\"/public/images/social_media/linkedin-logo.svg\">Import from LinkedIn</button>\n\t\t</div>\n\n\t\t<div class=\"signup-experience-new\" (click)=\"showExperienceModal(-1)\">\n\t\t\t<h4><i class=\"fa fa-plus\"></i> Add a new position</h4>\n\t\t\t<h5>Jobs, Interships etc...</h5>\n\t\t</div>\n\n\t\t<div *ngIf=\"experiences[0]\">\n\t\t\t<div class=\"signup-main-experience\" *ngFor=\"let experience of experiences; let i = index\">\n\t\t\t\t<div class=\"signup-exp-list\">\n\t\t\t\t\t<div class=\"signup-exp\">\n\t\t\t\t\t\t<div class=\"signup-exp-post\">\n\t\t\t\t\t\t\t<h3>{{ experience.title }}</h3>\n\t\t\t\t\t\t\t<h4>{{ experience.company }}</h4>\n\t\t\t\t\t\t\t<div class=\"signup-exp-param\">\n\t\t\t\t\t\t\t\t<img class=\"cursor-pt\" src=\"/public/images/picto_edit.svg\" (click)=\"showExperienceModal(i)\">\n\t\t\t\t\t\t\t\t<i class=\"fa fa-trash cursor-pt\" (click)=\"removeUserExperience(experience.id, i)\"></i>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"signup-exp-period\">\n\t\t\t\t\t\t\t<span class=\"exp-period\" *ngIf=\"experience.date_to === 'Present'\"><i class=\"fa fa-calendar\"></i> {{ experience.date_from | amDateFormat: 'MMMM YYYY' }} - {{ experience.date_to }}</span>\n\t\t\t\t\t\t\t<span class=\"exp-period\" *ngIf=\"experience.date_to !== 'Present'\"><i class=\"fa fa-calendar\"></i> {{ experience.date_from | amDateFormat: 'MMMM YYYY' }} - {{ experience.date_to | amDateFormat: 'MMMM YYYY' }}</span>\n\t\t\t\t\t\t\t<span *ngIf=\"experience.location\" class=\"exp-location\"><img src=\"/public/images/location-picto.svg\"> {{ experience.location }}</span>\n<!-- \t\t\t\t\t\t\t<span *ngIf=\"experience.location_state\" class=\"exp-location\"><img src=\"/public/images/location-picto.svg\"> {{ experience.location_city }}, {{ experience.location_state | uppercase }}</span>\n -->\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"signup-exp-description innerHtml\">\n\t\t\t\t\t\t\t<p [innerHtml]=\"experience.description | sanitizeHtml\"></p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class=\"signup-experience-button\">\n\t\t<span (click)=\"slideModals(1)\">Back</span>\n\t\t<button type=\"submit\" (click)=\"saveExperience()\">Next</button>\n\t</div>\n</section>\n"

/***/ }),

/***/ "./src/app/Components/signup/signup-experience/signup-experience.component.scss":
/***/ (function(module, exports) {

module.exports = "/*** EXPERIENCE PART ***/\n#signup-experience-body {\n  position: absolute;\n  background-color: transparent;\n  margin-left: auto;\n  margin-right: auto;\n  left: 0;\n  right: 0;\n  max-width: 700px;\n  top: 180px;\n  border-radius: 4px;\n  z-index: 1000;\n  -webkit-animation-duration: 0.5s;\n  -kthtml-animation-duration: 0.5s;\n  animation-duration: 0.5s; }\n#signup-experience-body .signup-body-nav {\n    background-color: #fff;\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px; }\n#signup-experience-body .signup-experience-add {\n    background-color: #fff;\n    border-bottom-left-radius: 4px;\n    border-bottom-right-radius: 4px;\n    padding-bottom: 30px;\n    /*.signup-experience-linkedin {\n\t\t\tmargin-top: 20px;\n\n\t\t\tbutton {\n\t\t\t\tbackground-color: #0077b5;\n\t\t\t\tborder: none;\n\t\t\t\tpadding: 6px 15px 10px 15px;\n\t\t\t\twidth: 248px;\n\t\t\t\theight: 41px;\n\n\t\t\t\timg {\n\t\t\t\t\tmargin-right: 8px;\n\t\t\t\t\tvertical-align: sub;\n\t\t\t\t}\n\n\t\t\t\tspan {\n\t\t\t\t\tposition: relative;\n\t\t\t\t\tfont-family: 'FreigSem';\n\t\t\t\t\ttop: 3px;\n\t\t\t\t}\n\n\t\t\t\t.spinner-load {\n\t\t\t\t\twidth: initial;\n\t\t\t\t\theight: initial;\n\t\t\t\t\tleft: 46%;\n\t\t\t\t\tmargin-top: -12px;\n\t\t\t\t\tbackground-color: transparent;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tbutton:hover {\n\t\t\t\tbackground-color: #016da3;\n\t\t\t}\n\t\t}*/ }\n#signup-experience-body .signup-experience-add .signup-experience-title {\n      display: inline-block;\n      padding: 15px 30px;\n      border-bottom: 1px solid #e5e5e5; }\n#signup-experience-body .signup-experience-add .signup-experience-title h3 {\n        font-family: 'FreigBook';\n        font-size: 18px;\n        color: #222222; }\n#signup-experience-body .signup-experience-add .wpha-right h5 {\n      margin-right: 35px; }\n#signup-experience-body .signup-experience-add .wpha-right button {\n      font-size: 14px;\n      padding: 8px 25px;\n      background-color: #0077B5;\n      border-radius: 18px;\n      border: 1px solid #0077B5;\n      margin: 0 auto; }\n#signup-experience-body .signup-experience-add .wpha-right button img {\n        width: 16px; }\n#signup-experience-body .signup-experience-add .wpha-right .wphar-follow {\n      background-color: #354c68;\n      border: 0; }\n#signup-experience-body .signup-experience-add .wpha-right .wphar-follow:hover {\n      background-color: #2d4058;\n      border: 0; }\n#signup-experience-body .signup-experience-add .wpha-right button:hover {\n      border: 1px solid #046293;\n      background-color: #046293; }\n#signup-experience-body .signup-experience-add .wpha-right .fa-plus {\n      font-size: 14px; }\n#signup-experience-body .signup-experience-add .signup-experience-new {\n      max-width: 200px;\n      margin: 20px auto 10px auto;\n      padding: 15px 0px;\n      border: 2px dashed #e5e5e5;\n      border-radius: 5px;\n      cursor: pointer;\n      -webkit-transition-duration: 0.5s;\n      -kthtml-transition-duration: 0.5s;\n      transition-duration: 0.5s; }\n#signup-experience-body .signup-experience-add .signup-experience-new h4 {\n        margin-bottom: 5px;\n        font-family: 'FreigSem';\n        font-size: 16px;\n        color: #ff4d4d; }\n#signup-experience-body .signup-experience-add .signup-experience-new .fa-plus {\n        margin-right: 5px; }\n#signup-experience-body .signup-experience-add .signup-experience-new h5 {\n        font-family: 'FreigBook';\n        font-size: 15px;\n        color: #999999; }\n#signup-experience-body .signup-experience-add .signup-experience-new:hover {\n      border: 2px dashed #999999; }\n#signup-experience-body .signup-experience-add .signup-main-experience {\n      max-width: 500px;\n      margin: 20px auto 0 auto; }\n#signup-experience-body .signup-experience-add .signup-main-experience .signup-exp-list {\n        text-align: left; }\n#signup-experience-body .signup-experience-add .signup-main-experience .signup-exp-list .signup-exp {\n          padding-bottom: 20px;\n          border-bottom: 1px solid #E5E5E5; }\n#signup-experience-body .signup-experience-add .signup-main-experience .signup-exp-list .signup-exp .signup-exp-post h3 {\n            display: inline-block;\n            font-family: 'FreigSem';\n            color: #222222;\n            font-size: 18px;\n            padding-right: 8px;\n            padding-top: 2px;\n            padding-bottom: 2px;\n            border-right: 1px solid black; }\n#signup-experience-body .signup-experience-add .signup-main-experience .signup-exp-list .signup-exp .signup-exp-post h4 {\n            display: inline-block;\n            font-family: 'FreigBook';\n            color: #222222;\n            font-size: 18px;\n            padding-left: 8px; }\n#signup-experience-body .signup-experience-add .signup-main-experience .signup-exp-list .signup-exp .signup-exp-post .signup-exp-param {\n            display: inline-block;\n            float: right; }\n#signup-experience-body .signup-experience-add .signup-main-experience .signup-exp-list .signup-exp .signup-exp-post .signup-exp-param img {\n              display: inline-block;\n              vertical-align: sub;\n              margin-right: 5px;\n              outline: 0; }\n#signup-experience-body .signup-experience-add .signup-main-experience .signup-exp-list .signup-exp .signup-exp-post .signup-exp-param i {\n              outline: 0; }\n#signup-experience-body .signup-experience-add .signup-main-experience .signup-exp-list .signup-exp .signup-exp-post .signup-exp-param .fa-trash {\n              position: relative;\n              top: 2px;\n              color: #FF6363;\n              font-size: 18px; }\n#signup-experience-body .signup-experience-add .signup-main-experience .signup-exp-list .signup-exp .signup-exp-period {\n            margin-top: 3px; }\n#signup-experience-body .signup-experience-add .signup-main-experience .signup-exp-list .signup-exp .signup-exp-period span {\n              font-family: 'FreigBook';\n              font-size: 14px;\n              color: #999999; }\n#signup-experience-body .signup-experience-add .signup-main-experience .signup-exp-list .signup-exp .signup-exp-period .exp-period {\n              margin-right: 10px; }\n#signup-experience-body .signup-experience-add .signup-main-experience .signup-exp-list .signup-exp .signup-exp-period .exp-location img {\n              vertical-align: sub;\n              position: relative;\n              bottom: 2px; }\n#signup-experience-body .signup-experience-add .signup-main-experience .signup-exp-list .signup-exp .signup-exp-description {\n            margin-top: 4px; }\n#signup-experience-body .signup-experience-add .signup-main-experience .signup-exp-list .signup-exp .signup-exp-description p {\n              font-family: 'FreigBook';\n              font-size: 15px;\n              color: #222222;\n              margin-bottom: 0; }\n#signup-experience-body .signup-experience-add .signup-main-experience .signup-exp-list .signup-exp .signup-exp-description a {\n              color: blue; }\n#signup-experience-body .signup-experience-button {\n    padding: 6px 30px 8px 30px;\n    margin-top: 20px; }\n#signup-experience-body .signup-experience-button button {\n      display: inline-block;\n      font-family: 'FreigMed';\n      padding: 6px 30px 8px 30px; }\n#signup-experience-body .signup-experience-button span {\n      margin-right: 20px;\n      font-family: 'FreigBook';\n      font-size: 18px;\n      color: #999999;\n      cursor: pointer; }\n/******************** MOBILE ****************************/\n@media only screen and (max-width: 736px) {\n  #signup-experience-body {\n    position: initial;\n    border-radius: 0;\n    height: 100%; }\n    #signup-experience-body .signup-experience-add {\n      padding: 15px; } }\n"

/***/ }),

/***/ "./src/app/Components/signup/signup-experience/signup-experience.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupExperienceComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__("./node_modules/ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_experience_modal_experience_modal_component__ = __webpack_require__("./src/app/Components/modals/experience-modal/experience-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_api_modals_linked_in_api_linked_in_api_component__ = __webpack_require__("./src/app/Components/modals/api-modals/linked-in-api/linked-in-api.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_Experiences_experiences_service__ = __webpack_require__("./src/app/Services/Experiences/experiences.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_shared_service__ = __webpack_require__("./src/app/Services/shared.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Animations_animations__ = __webpack_require__("./src/app/Animations/animations.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/* Component */


/* Services */


/* Animations */

var SignupExperienceComponent = /** @class */ (function () {
    function SignupExperienceComponent(dialogService, ExperiencesService, SharedService) {
        var _this = this;
        this.dialogService = dialogService;
        this.ExperiencesService = ExperiencesService;
        this.SharedService = SharedService;
        this.stateRight = 'out';
        this.subscription = SharedService.signupModal$.subscribe(function (res) {
            if (res['index'] === 2) {
                if (res['lastIndex'] === 1)
                    _this.stateRight = 'in';
                else
                    _this.stateLeft = 'in';
            }
            else if (res['index'] > 2) {
                _this.stateLeft = 'out';
                _this.stateRight = 'in';
            }
            else {
                _this.stateRight = 'out';
                _this.stateLeft = 'in';
            }
        });
    }
    SignupExperienceComponent.prototype.ngOnInit = function () {
        this.initModels();
        this.getUserExperiences();
    };
    SignupExperienceComponent.prototype.initModels = function () {
        this.experiences = [];
    };
    SignupExperienceComponent.prototype.getUserExperiences = function () {
        var _this = this;
        this.ExperiencesService.getUserExperiences(this.user_id).subscribe(function (res) {
            _this.experiences = res.experiences;
        });
    };
    SignupExperienceComponent.prototype.removeUserExperience = function (id, index) {
        var _this = this;
        if (this.user_id) {
            this.ExperiencesService.deleteExperience(this.user_id, { id: id })
                .subscribe(function (res) {
                if (res.success)
                    _this.experiences.splice(index, 1);
            });
        }
    };
    SignupExperienceComponent.prototype.showExperienceModal = function (index) {
        var _this = this;
        if (this.user_id) {
            var object = index < 0 ? {} : this.experiences[index];
            var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_2__modals_experience_modal_experience_modal_component__["a" /* ExperienceModalComponent */], {
                index: index,
                user_experience: object
            })
                .subscribe(function (success) {
                if (success)
                    _this.getUserExperiences();
            });
        }
    };
    SignupExperienceComponent.prototype.openLinkedInApiModal = function () {
        var _this = this;
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_3__modals_api_modals_linked_in_api_linked_in_api_component__["a" /* LinkedInApiComponent */], {
            profile: {},
            index: 0
        }).subscribe(function (success) {
            if (success)
                _this.getUserExperiences();
        });
    };
    SignupExperienceComponent.prototype.saveExperience = function () {
        var _this = this;
        setTimeout(function () {
            _this.slideModals(3);
        }, 1000);
    };
    SignupExperienceComponent.prototype.slideModals = function (index) {
        this.SharedService.setSignupModalIndex(index, 2);
        if (index === 1)
            this.stateRight = 'out';
        else
            this.stateLeft = 'out';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], SignupExperienceComponent.prototype, "user_id", void 0);
    SignupExperienceComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-signup-experience',
            template: __webpack_require__("./src/app/Components/signup/signup-experience/signup-experience.component.html"),
            styles: [__webpack_require__("./src/app/Components/signup/signup-experience/signup-experience.component.scss"), __webpack_require__("./src/public/styles/signup.scss")],
            animations: [__WEBPACK_IMPORTED_MODULE_6__Animations_animations__["n" /* slideLeft */], __WEBPACK_IMPORTED_MODULE_6__Animations_animations__["o" /* slideRight */]],
            providers: [__WEBPACK_IMPORTED_MODULE_4__Services_Experiences_experiences_service__["a" /* ExperiencesService */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__Services_Experiences_experiences_service__["a" /* ExperiencesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_Experiences_experiences_service__["a" /* ExperiencesService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__Services_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_shared_service__["a" /* SharedService */]) === "function" && _c || Object])
    ], SignupExperienceComponent);
    return SignupExperienceComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=signup-experience.component.js.map

/***/ }),

/***/ "./src/app/Components/signup/signup-interests/signup-interests.component.html":
/***/ (function(module, exports) {

module.exports = "<section id=\"signup-interest-body\" [@slideRight]=\"stateRight\" [@slideLeft]=\"stateLeft\">\n\t<div class=\"signup-body-nav\">\n\t\t<ul>\n\t\t\t<li class=\"sbnba\" (click)=\"slideModals(1)\">Basics</li>\n\t\t\t<li class=\"sbnex\" (click)=\"slideModals(2)\">Experience</li>\n\t\t\t<li class=\"sbnsk\" (click)=\"slideModals(3)\">Skills</li>\n\t\t\t<li class=\"sbnin\"><strong>Interests</strong></li>\n\t\t\t<li class=\"sbnab\" (click)=\"slideModals(5)\">About you</li>\n\t\t</ul>\n\t</div>\n\n\t<!-- <div class=\"signup-interest-search\">\n\t\t<div class=\"signup-interest-header\">\n\t\t\t<h4>Let's pick a few ones.</h4>\n\t\t</div>\n\t\t<div class=\"signup-interest-select sss\">\n\t\t\t<li *ngFor=\"let user_interest of user_interests; let i = index\">\n\t\t\t\t<h4>{{ user_interest }} <i class=\"fa fa-times\" (click)=\"removeInterest(user_interest, i)\"></i></h4>\n\t\t\t</li>\n\t\t</div>\n\t\t<div class=\"signup-interest-inSearch\">\n\t\t\t<input type=\"search\" [(ngModel)]=\"interestSearch\" placeholder=\"Search for specific interests...\">\n\t\t</div>\n\t\t<div class=\"signup-interest-list sss\" *ngIf=\"interests\">\n\t\t\t<li *ngFor=\"let interest of interests | searchPipe: 'noKey': interestSearch\" (click)=\"addInterest(interest)\">\n\t\t\t\t<h4>{{ interest }}</h4>\n\t\t\t</li>\n\t\t</div>\n\t</div> -->\n\n\t<div class=\"signup-interest-search\">\n\t\t<div class=\"signup-interest-list sss\" *ngIf=\"interests\">\n\t\t\t<li *ngFor=\"let interest of interests\" (click)=\"addRemoveInterest(interest)\" [ngClass]=\"{ 'selected': !checkInterest(interest) }\">\n\t\t\t\t{{ interest }}\n\t\t\t</li>\n\t\t</div>\n\t</div>\n\n\t<div class=\"signup-interest-button\">\n\t\t<span (click)=\"slideModals(3)\">Back</span>\n\t\t<button type=\"submit\" (click)=\"saveInterests()\">Next</button>\n\t</div>\n</section>\n"

/***/ }),

/***/ "./src/app/Components/signup/signup-interests/signup-interests.component.scss":
/***/ (function(module, exports) {

module.exports = "/*** INTEREST PART ***/\n#signup-interest-body {\n  position: absolute;\n  background-color: transparent;\n  margin-left: auto;\n  margin-right: auto;\n  left: 0;\n  right: -10000px;\n  max-width: 900px;\n  top: 180px;\n  border-radius: 4px;\n  overflow: hidden;\n  -webkit-animation-duration: 0.5s;\n  -kthtml-animation-duration: 0.5s;\n  animation-duration: 0.5s; }\n#signup-interest-body .signup-body-nav {\n    background-color: #fff;\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px; }\n#signup-interest-body .signup-interest-search {\n    padding: 40px 70px 60px 70px;\n    background-color: #fff;\n    border-bottom-left-radius: 4px;\n    border-bottom-right-radius: 4px;\n    margin-bottom: 30px;\n    /*.signup-interest-header {\n\t\t\tmargin-bottom: 20px;\n\t\t\ttext-align: left;\n\n\t\t\th4 {\n\t\t\t\tfont-family: 'FreigBook';\n\t\t\t\tfont-size: 18px;\n\t\t\t\tcolor: #222222;\n\t\t\t}\n\t\t}\n\n\t\t.signup-interest-inSearch {\n\t\t\ttext-align: left;\n\t\t\tborder-top: 1px solid #e5e5e5;\n\t\t\tpadding: 20px 0;\n\n\t\t\tinput {\n\t\t\t\twidth: 710px;\n\t\t\t\tborder: 1px solid #999999;\n\t\t\t\tmargin: 10px 0;\n\t\t\t\tborder-radius: 4px;\n\t\t\t\tfont-family: 'FreigBook';\n\t\t\t\tfont-size: 16px;\n\t\t\t\tcolor: #222222;\n\t\t\t\tpadding: 5px 45px;\n\t\t\t\tbackground-image: url('/public/images/search-icon-b.svg');\n\t\t\t\tbackground-repeat: no-repeat;\n\t\t\t\tbackground-size: 16px;\n\t\t\t\tbackground-position: 2% 50%;\n\t\t\t}\n\t\t}\n\n\t\t.signup-interest-select {\n\t\t\tpadding-bottom: 10px;\n\n\t\t\tli {\n\t\t\t\tbackground-color: #222222;\n\t\t\t}\n\n\t\t\tli:hover {\n\t\t\t\tbackground-color: #999999;\n\t\t\t}\n\n\t\t\t.fa-times {\n\t\t\t\tmargin-left: 5px;\n\t\t\t}\n\n\t\t\t.fa-times:focus {\n\t\t\t\toutline: 0;\n\t\t\t}\n\t\t}\n\n\t\t.signup-interest-list {\n\t\t\tmax-height: 200px;\n\t\t\toverflow-y: auto;\n\n\t\t\tli {\n\t\t\t\tbackground-color: white;\n\t\t\t\tborder: 1px solid #999999;\n\n\t\t\t\th4 {\n\t\t\t\t\tcolor: #999999;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tli:hover {\n\t\t\t\tbackground-color: #999999;\n\n\t\t\t\th4 {\n\t\t\t\t\tcolor: white;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t.sss {\n\t\t\ttext-align: left;\n\t\t\t-webkit-transition-duration: 0.3s;\n\t\t\t-o-transition-duration: 0.3s;\n\t\t\t-moz-transition-duration: 0.3s;\n\t\t\t-ms-transition-duration: 0.3s;\n\t\t\t-kthtml-transition-duration: 0.3s;\n\t\t\ttransition-duration: 0.3s;\n\n\t\t\tli {\n\t\t\t\tdisplay: inline-block;\n\t\t\t\tpadding: 4px 10px;\n\t\t\t\tmargin-right: 10px;\n\t\t\t\tmargin-bottom: 10px;\n\t\t\t\tborder-radius: 4px;\n\t\t\t\ttext-transform: uppercase;\n\t\t\t\tcursor: pointer;\n\t\t\t\t-webkit-transition-duration: 0.3s;\n\t\t\t\t-o-transition-duration: 0.3s;\n\t\t\t\t-moz-transition-duration: 0.3s;\n\t\t\t\t-ms-transition-duration: 0.3s;\n\t\t\t\t-kthtml-transition-duration: 0.3s;\n\t\t\t\ttransition-duration: 0.3s;\n\n\t\t\t\th4 {\n\t\t\t\t\tfont-family: 'FreigSem';\n\t\t\t\t\tfont-size: 12px;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t.signup-interest-button {\n\t\t\tpadding: 20px 30px 10px 30px;\n\n\t\t\tbutton {\n\t\t\t\tfont-family: 'FreigMed';\n\t\t\t\tpadding: 6px 30px 8px 30px;\n\t\t\t}\n\n\t\t\tspan {\n\t\t\t\tmargin-right: 20px;\n\t\t\t\tfont-family: 'FreigBook';\n\t\t\t\tfont-size: 18px;\n\t\t\t\tcolor: #999999;\n\t\t\t\tcursor: pointer;\n\t\t\t}\n\t\t}*/ }\n#signup-interest-body .signup-interest-search .signup-interest-list {\n      height: 350px;\n      overflow: auto; }\n#signup-interest-body .signup-interest-search .signup-interest-list li {\n        display: inline-block;\n        padding: 4px 10px;\n        margin-right: 10px;\n        margin-bottom: 10px;\n        border-radius: 4px;\n        text-transform: uppercase;\n        cursor: pointer;\n        font-family: 'FreigSem';\n        font-size: 12px;\n        background-color: transparent;\n        color: #999;\n        border: 1px solid #999;\n        border-radius: 0; }\n#signup-interest-body .signup-interest-search .signup-interest-list li:hover {\n        background-color: #999;\n        color: white; }\n#signup-interest-body .signup-interest-search .signup-interest-list .selected {\n        background-color: #999;\n        color: white; }\n#signup-interest-body .signup-interest-button button {\n    font-family: 'FreigMed';\n    padding: 6px 30px 8px 30px; }\n#signup-interest-body .signup-interest-button span {\n    margin-right: 20px;\n    font-family: 'FreigBook';\n    font-size: 18px;\n    color: #999999;\n    cursor: pointer; }\n/******************** MOBILE ****************************/\n@media only screen and (max-width: 736px) {\n  #signup-interest-body {\n    width: 100%;\n    top: 0; }\n    #signup-interest-body .signup-interest-search {\n      padding: 15px; }\n      #signup-interest-body .signup-interest-search .signup-interest-inSearch input {\n        width: 100%;\n        margin: 10px 0; } }\n"

/***/ }),

/***/ "./src/app/Components/signup/signup-interests/signup-interests.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupInterestsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_Interests_interests_service__ = __webpack_require__("./src/app/Services/Interests/interests.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_shared_service__ = __webpack_require__("./src/app/Services/shared.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Animations_animations__ = __webpack_require__("./src/app/Animations/animations.ts");
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


/* Animations */

var SignupInterestsComponent = /** @class */ (function () {
    function SignupInterestsComponent(InterestsService, SharedService) {
        var _this = this;
        this.InterestsService = InterestsService;
        this.SharedService = SharedService;
        this.user_interests = [];
        this.stateRight = 'out';
        this.subscription = SharedService.signupModal$.subscribe(function (res) {
            if (res['index'] === 4) {
                if (res['lastIndex'] < 4)
                    _this.stateRight = 'in';
                else
                    _this.stateLeft = 'in';
            }
            else if (res['index'] > 4) {
                _this.stateLeft = 'out';
                _this.stateRight = 'in';
            }
            else {
                _this.stateRight = 'out';
                _this.stateLeft = 'in';
            }
        });
    }
    SignupInterestsComponent.prototype.ngOnInit = function () {
        this.initService();
    };
    SignupInterestsComponent.prototype.initService = function () {
        this.getInterests();
    };
    SignupInterestsComponent.prototype.getInterests = function () {
        var _this = this;
        this.InterestsService.getInterests().subscribe(function (res) {
            _this.interests = res.interests;
        });
    };
    SignupInterestsComponent.prototype.addRemoveInterest = function (interest) {
        var _this = this;
        if (this.checkInterest(interest)) {
            this.InterestsService.addUserInterests(this.user_id, { name: interest }).subscribe(function (res) {
                if (res.interests)
                    _this.user_interests.push(interest);
            });
        }
        else {
            this.removeInterest(interest);
        }
    };
    SignupInterestsComponent.prototype.removeInterest = function (interest) {
        var _this = this;
        this.InterestsService.deleteUserInterests(this.user_id, { name: interest }).subscribe(function (res) {
            if (res.interests)
                _this.user_interests.splice(_this.user_interests.indexOf(interest), 1);
        });
    };
    SignupInterestsComponent.prototype.checkInterest = function (interest) {
        if (this.user_interests.indexOf(interest) >= 0)
            return false;
        else
            return true;
    };
    SignupInterestsComponent.prototype.saveInterests = function () {
        var _this = this;
        setTimeout(function () {
            _this.slideModals(5);
        }, 500);
    };
    SignupInterestsComponent.prototype.slideModals = function (index) {
        this.SharedService.setSignupModalIndex(index, 4);
        if (index < 4)
            this.stateRight = 'out';
        else
            this.stateLeft = 'out';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], SignupInterestsComponent.prototype, "user_id", void 0);
    SignupInterestsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-signup-interests',
            template: __webpack_require__("./src/app/Components/signup/signup-interests/signup-interests.component.html"),
            styles: [__webpack_require__("./src/app/Components/signup/signup-interests/signup-interests.component.scss"), __webpack_require__("./src/public/styles/signup.scss")],
            animations: [__WEBPACK_IMPORTED_MODULE_3__Animations_animations__["n" /* slideLeft */], __WEBPACK_IMPORTED_MODULE_3__Animations_animations__["o" /* slideRight */]],
            providers: [__WEBPACK_IMPORTED_MODULE_1__Services_Interests_interests_service__["a" /* InterestsService */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_Interests_interests_service__["a" /* InterestsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_Interests_interests_service__["a" /* InterestsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__Services_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_shared_service__["a" /* SharedService */]) === "function" && _b || Object])
    ], SignupInterestsComponent);
    return SignupInterestsComponent;
    var _a, _b;
}());

//# sourceMappingURL=signup-interests.component.js.map

/***/ }),

/***/ "./src/app/Components/signup/signup-skills/signup-skills.component.html":
/***/ (function(module, exports) {

module.exports = "<section id=\"signup-skill-body\" [@slideRight]=\"stateRight\" [@slideLeft]=\"stateLeft\">\n\t<div class=\"signup-body-nav\">\n\t\t<ul>\n\t\t\t<li class=\"sbnba\" (click)=slideModals(1)>Basics</li>\n\t\t\t<li class=\"sbnsk\" (click)=slideModals(2)>Experience</li>\n\t\t\t<li class=\"sbnex\"><strong>Skills</strong></li>\n\t\t\t<li class=\"sbnin\" (click)=slideModals(4)>Interests</li>\n\t\t\t<li class=\"sbnab\" (click)=slideModals(5)>About you</li>\n\t\t</ul>\n\t</div>\n\n\t<!-- <div class=\"signup-skill-search\">\n\t\t<div class=\"signup-skill-header\">\n\t\t\t<h4>What are you skilled in? <span style=\"color: #999999; font-size: 16px;\">Don't miss this step: your skills & interests allow people to connect with you</span></h4>\n\t\t</div>\n\t\t<div class=\"signup-skill-select sss\">\n\t\t\t<li *ngFor=\"let user_skill of user_skills; let i = index\">\n\t\t\t\t<h4>{{ user_skill.name }} <i class=\"fa fa-times\" (click)=\"removeSkill(i, user_skill.id)\"></i></h4>\n\t\t\t</li>\n\t\t</div>\n\t\t<div class=\"signup-skill-inSearch\">\n\t\t\t<input type=\"search\" [(ngModel)]=\"skillSearch\" placeholder=\"Search for a specific skill...\">\n\t\t</div>\n\t\t<div class=\"signup-skill-list sss\" *ngIf=\"skills\">\n\t\t\t<li *ngFor=\"let skill of skills | searchPipe: 'name': skillSearch\" (click)=\"addSkill(skill)\">\n\t\t\t\t<h4>{{skill.name}}</h4>\n\t\t\t</li>\n\t\t</div>\n\t\t<div class=\"signup-skill-button\">\n\t\t\t<span (click)=\"slideModals(2)\">Back</span>\n\t\t\t<button type=\"submit\" (click)=\"saveSkills()\">{{ buttonText }}</button>\n\t\t</div>\n\t</div> -->\n\n\t<div class=\"signup-skill-search flex\">\n\t\t<div class=\"sss-categories\">\n\t\t\t<h3 class=\"freigm\">Pick a category</h3>\n\t\t\t<li class=\"freigl cursor-pt\" *ngFor=\"let category of categories\" (click)=\"getSkillsByCategories(category)\" [ngClass]=\"{'li-active': currentCategory === category.name}\">{{ category.name }}</li>\n\t\t</div>\n\n\t\t<div class=\"sss-skills\">\n\t\t\t<div class=\"ssss-elements sss0 mar-b-10\" *ngIf=\"user_skills[0]\">\n\t\t\t\t<li *ngFor=\"let user_skill of user_skills; let i = index\">{{ user_skill.name }} <i class=\"fa fa-times mar-l-5 cursor-pt\" (click)=\"removeSkill(i, user_skill.id)\"></i></li>\n\t\t\t</div>\n\n\t\t\t<input class=\"mar-b-10\" type=\"search\" name=\"search-skill\" placeholder=\" Search for a specific skill...\" [(ngModel)]=\"skillSearch\" />\n\n\t\t\t<div class=\"ssss-elements sss\" *ngIf=\"skills\">\n\t\t\t\t<li class=\"cursor-pt\" *ngFor=\"let skill of skills | searchPipe: 'name': skillSearch\" (click)=\"addSkill(skill)\">{{ skill.name }}</li>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class=\"signup-skill-button\">\n\t\t<span (click)=\"slideModals(2)\">Back</span>\n\t\t<button type=\"submit\" (click)=\"saveSkills()\">Next</button>\n\t</div>\n</section>\n"

/***/ }),

/***/ "./src/app/Components/signup/signup-skills/signup-skills.component.scss":
/***/ (function(module, exports) {

module.exports = "/*** SKILL PART ***/\n#signup-skill-body {\n  position: absolute;\n  background-color: transparent;\n  margin-left: auto;\n  margin-right: auto;\n  left: 0;\n  right: -10000px;\n  max-width: 900px;\n  top: 180px;\n  border-radius: 4px;\n  overflow: hidden;\n  -webkit-animation-duration: 0.5s;\n  -kthtml-animation-duration: 0.5s;\n  animation-duration: 0.5s; }\n#signup-skill-body .signup-body-nav {\n    background-color: #fff;\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px; }\n#signup-skill-body .signup-skill-button {\n    /*\t\tpadding: 20px 30px 10px 30px;\n*/ }\n#signup-skill-body .signup-skill-button span {\n      margin-right: 20px;\n      font-family: 'FreigBook';\n      font-size: 18px;\n      color: #999999;\n      cursor: pointer; }\n#signup-skill-body .signup-skill-button button {\n      font-family: 'FreigMed';\n      padding: 6px 30px 8px 30px; }\n#signup-skill-body .signup-skill-search {\n    -webkit-box-align: baseline;\n        -ms-flex-align: baseline;\n            align-items: baseline;\n    padding: 20px 100px 20px 100px;\n    background-color: #fff;\n    border-bottom-left-radius: 4px;\n    border-bottom-right-radius: 4px;\n    margin-bottom: 30px;\n    /*.signup-skill-header {\n\t\t\tmargin-bottom: 20px;\n\t\t\ttext-align: left;\n\n\t\t\th4 {\n\t\t\t\tfont-family: 'FreigBook';\n\t\t\t\tfont-size: 18px;\n\t\t\t\tcolor: #222222;\n\t\t\t}\n\t\t}\n\n\t\t.signup-skill-inSearch {\n\t\t\ttext-align: left;\n\t\t\tborder-top: 1px solid #e5e5e5;\n\t\t\tpadding: 20px 0;\n\n\t\t\tinput {\n\t\t\t\twidth: 710px;\n\t\t\t\tmargin: 10px 0;\n\t\t\t\tborder: 1px solid #999999;\n\t\t\t\tborder-radius: 4px;\n\t\t\t\tfont-family: 'FreigBook';\n\t\t\t\tfont-size: 16px;\n\t\t\t\tcolor: #222222;\n\t\t\t\tpadding: 5px 45px;\n\t\t\t\tbackground-image: url('/public/images/search-icon-b.svg');\n\t\t\t\tbackground-repeat: no-repeat;\n\t\t\t\tbackground-size: 16px;\n\t\t\t\tbackground-position: 2% 50%;\n\t\t\t}\n\t\t}\n\n\t\t.signup-skill-select {\n\t\t\tpadding-bottom: 10px;\n\n\t\t\tli {\n\t\t\t\tbackground-color: #222222;\n\t\t\t}\n\n\t\t\tli:hover {\n\t\t\t\tbackground-color: #999999;\n\t\t\t}\n\n\t\t\t.fa-times {\n\t\t\t\tmargin-left: 5px;\n\t\t\t}\n\n\t\t\t.fa-times:focus {\n\t\t\t\toutline: 0;\n\t\t\t}\n\t\t}\n\n\t\t.signup-skill-list {\n\t\t\tmax-height: 200px;\n\t\t\toverflow-y: auto;\n\n\t\t\tli {\n\t\t\t\tbackground-color: #999999;\n\t\t\t}\n\n\t\t\tli:hover {\n\t\t\t\tbackground-color: #222222;\n\t\t\t}\n\t\t}\n\n\t\t.sss {\n\t\t\ttext-align: left;\n\t\t\t-webkit-transition-duration: 0.3s;\n\t\t\t-o-transition-duration: 0.3s;\n\t\t\t-moz-transition-duration: 0.3s;\n\t\t\t-ms-transition-duration: 0.3s;\n\t\t\t-kthtml-transition-duration: 0.3s;\n\t\t\ttransition-duration: 0.3s;\n\n\t\t\tli {\n\t\t\t\tdisplay: inline-block;\n\t\t\t\tpadding: 4px 10px;\n\t\t\t\tmargin-right: 10px;\n\t\t\t\tmargin-bottom: 10px;\n\t\t\t\tborder-radius: 4px;\n\t\t\t\ttext-transform: uppercase;\n\t\t\t\tcursor: pointer;\n\t\t\t\t-webkit-transition-duration: 0.3s;\n\t\t\t\t-o-transition-duration: 0.3s;\n\t\t\t\t-moz-transition-duration: 0.3s;\n\t\t\t\t-ms-transition-duration: 0.3s;\n\t\t\t\t-kthtml-transition-duration: 0.3s;\n\t\t\t\ttransition-duration: 0.3s;\n\n\t\t\t\th4 {\n\t\t\t\t\tfont-family: 'FreigSem';\n\t\t\t\t\tfont-size: 12px;\n\t\t\t\t\tcolor: white;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t.signup-skill-button {\n\t\t\tpadding: 20px 30px 10px 30px;\n\n\t\t\tspan {\n\t\t\t\tmargin-right: 20px;\n\t\t\t\tfont-family: 'FreigBook';\n\t\t\t\tfont-size: 18px;\n\t\t\t\tcolor: #999999;\n\t\t\t\tcursor: pointer;\n\t\t\t}\n\t\t}*/ }\n#signup-skill-body .signup-skill-search .sss-categories {\n      text-align: left;\n      margin-right: 50px; }\n#signup-skill-body .signup-skill-search .sss-categories h3 {\n        padding-left: 5px;\n        font-size: 18px;\n        color: #494949;\n        white-space: nowrap;\n        margin-bottom: 10px; }\n#signup-skill-body .signup-skill-search .sss-categories li {\n        padding-left: 5px;\n        white-space: nowrap;\n        color: #494949;\n        margin-bottom: 5px;\n        border-left: 2px solid transparent; }\n#signup-skill-body .signup-skill-search .sss-categories .li-active {\n        border-left: 2px solid rgba(65, 98, 153, 0.8);\n        text-shadow: 0px 0px 1px #7c7c7c; }\n#signup-skill-body .signup-skill-search .sss-categories li:hover {\n        border-left: 2px solid rgba(65, 98, 153, 0.8);\n        text-shadow: 0px 0px 1px #7c7c7c; }\n#signup-skill-body .signup-skill-search .sss-skills {\n      -webkit-box-flex: 1;\n          -ms-flex-positive: 1;\n              flex-grow: 1;\n      height: 430px;\n      overflow: auto; }\n#signup-skill-body .signup-skill-search .sss-skills input {\n        margin: 0;\n        padding: 0;\n        border: 0;\n        border-radius: 0;\n        border-bottom: 1px solid #999;\n        padding-bottom: 5px;\n        width: 100%;\n        font-size: 18px;\n        margin-bottom: 10px; }\n#signup-skill-body .signup-skill-search .sss-skills .sss, #signup-skill-body .signup-skill-search .sss-skills .sss0 {\n        text-align: left; }\n#signup-skill-body .signup-skill-search .sss-skills .sss li, #signup-skill-body .signup-skill-search .sss-skills .sss0 li {\n          display: inline-block;\n          padding: 4px 10px;\n          margin-right: 5px;\n          margin-bottom: 10px;\n          border-radius: 4px;\n          text-transform: uppercase;\n          font-family: 'FreigSem';\n          font-size: 12px;\n          color: white;\n          background-color: #747b89; }\n#signup-skill-body .signup-skill-search .sss-skills .sss0 li {\n        background-color: #505459; }\n#signup-skill-body .signup-skill-search .sss-skills .ssss-elements {\n        max-height: 370px;\n        overflow: auto; }\n/******************** MOBILE ****************************/\n@media only screen and (max-width: 736px) {\n  #signup-skill-body {\n    width: 100%;\n    top: 0; }\n    #signup-skill-body .signup-skill-search {\n      padding: 15px; }\n      #signup-skill-body .signup-skill-search .signup-skill-inSearch input {\n        width: 100%;\n        margin: 10px 0; } }\n"

/***/ }),

/***/ "./src/app/Components/signup/signup-skills/signup-skills.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupSkillsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_Skills_skills_service__ = __webpack_require__("./src/app/Services/Skills/skills.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_shared_service__ = __webpack_require__("./src/app/Services/shared.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_Invitation_invitation_service__ = __webpack_require__("./src/app/Services/Invitation/invitation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Animations_animations__ = __webpack_require__("./src/app/Animations/animations.ts");
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



/* Animations */

var SignupSkillsComponent = /** @class */ (function () {
    function SignupSkillsComponent(SkillsService, SharedService, InvitationService) {
        var _this = this;
        this.SkillsService = SkillsService;
        this.SharedService = SharedService;
        this.InvitationService = InvitationService;
        this.user_skills = [];
        this.stateRight = 'out';
        this.subscription = SharedService.signupModal$.subscribe(function (res) {
            if (res['index'] === 3) {
                _this.sendInvitationToGoogleContacts();
                _this.getUserSkills();
                if (res['lastIndex'] < 3)
                    _this.stateRight = 'in';
                else
                    _this.stateLeft = 'in';
            }
            else if (res['index'] > 3) {
                _this.stateLeft = 'out';
                _this.stateRight = 'in';
            }
            else {
                _this.stateRight = 'out';
                _this.stateLeft = 'in';
            }
        });
    }
    SignupSkillsComponent.prototype.ngOnInit = function () {
        this.initServices();
    };
    SignupSkillsComponent.prototype.sendInvitationToGoogleContacts = function () {
        this.InvitationService.sendGoogleAuthInvitation().subscribe(function (res) {
            console.log(res);
        });
    };
    SignupSkillsComponent.prototype.initServices = function () {
        this.getSkills();
        this.getSkillCategories();
    };
    SignupSkillsComponent.prototype.getSkills = function () {
        var _this = this;
        this.SkillsService.getSkills().subscribe(function (res) {
            _this.skills = res.skills;
        });
    };
    SignupSkillsComponent.prototype.getSkillCategories = function () {
        var _this = this;
        this.SkillsService.getSkillCategories().subscribe(function (res) {
            _this.categories = res.categories;
        });
    };
    SignupSkillsComponent.prototype.getSkillsByCategories = function (category) {
        var _this = this;
        this.currentCategory = category.name;
        this.SkillsService.getSkillsByCategories({ id: category.id }).subscribe(function (res) {
            _this.skills = res.skills;
        });
    };
    SignupSkillsComponent.prototype.getUserSkills = function () {
        var _this = this;
        this.SkillsService.getUserSkills(this.user_id).subscribe(function (res) {
            _this.user_skills = res.skills;
        });
    };
    SignupSkillsComponent.prototype.addSkill = function (skill) {
        var _this = this;
        if (this.checkSkill(skill)) {
            this.SkillsService.addUserSkills(this.user_id, { skill_id: skill.id }).subscribe(function (res) {
                if (res.skills) {
                    _this.user_skills = res.skills;
                }
            });
        }
    };
    SignupSkillsComponent.prototype.removeSkill = function (index, id) {
        var _this = this;
        this.SkillsService.deleteUserSkills(this.user_id, { skill_id: id }).subscribe(function (res) {
            if (res.success)
                _this.user_skills.splice(index, 1);
        });
    };
    SignupSkillsComponent.prototype.checkSkill = function (skill) {
        if (this.user_skills.indexOf(skill) >= 0)
            return false;
        else
            return true;
    };
    SignupSkillsComponent.prototype.saveSkills = function () {
        var _this = this;
        setTimeout(function () {
            _this.slideModals(4);
        }, 500);
    };
    SignupSkillsComponent.prototype.slideModals = function (index) {
        this.SharedService.setSignupModalIndex(index, 3);
        if (index < 3)
            this.stateRight = 'out';
        else
            this.stateLeft = 'out';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], SignupSkillsComponent.prototype, "user_id", void 0);
    SignupSkillsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-signup-skills',
            template: __webpack_require__("./src/app/Components/signup/signup-skills/signup-skills.component.html"),
            styles: [__webpack_require__("./src/app/Components/signup/signup-skills/signup-skills.component.scss"), __webpack_require__("./src/public/styles/signup.scss")],
            animations: [__WEBPACK_IMPORTED_MODULE_4__Animations_animations__["n" /* slideLeft */], __WEBPACK_IMPORTED_MODULE_4__Animations_animations__["o" /* slideRight */]],
            providers: [__WEBPACK_IMPORTED_MODULE_1__Services_Skills_skills_service__["a" /* SkillsService */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_Skills_skills_service__["a" /* SkillsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_Skills_skills_service__["a" /* SkillsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__Services_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_shared_service__["a" /* SharedService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__Services_Invitation_invitation_service__["a" /* InvitationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_Invitation_invitation_service__["a" /* InvitationService */]) === "function" && _c || Object])
    ], SignupSkillsComponent);
    return SignupSkillsComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=signup-skills.component.js.map

/***/ }),

/***/ "./src/app/Components/signup/signup.component.html":
/***/ (function(module, exports) {

module.exports = "<section id=\"signup-page\" signupDiv>\n\n\t<div class=\"filter-signup\"></div>\n\t<section class=\"signup-title\" *ngIf=\"profile\">\n\t\t<div class=\"st-1 st-container\" [@fadeInWord]=\"fadeInState[0]\">\n\t\t\t<h1 class=\"freigl\">Hello <span class=\"freigs\">{{ profile.first_name }}</span></h1>\n\t\t\t<p class=\"freigb\">Fill your profile so we can connect you to all the ideas, projects and startups you could work with</p>\n\t\t</div>\n\t\t<div class=\"st-2 st-container\" [@fadeInWord]=\"fadeInState[1]\">\n\t\t\t<h1 class=\"freigl\">Add your <span class=\"freigs\">work experiences</span></h1>\n\t\t\t<p class=\"freigb\">or import them from LinkedIn (shh... don't tell them)</p>\n\t\t</div>\n\t\t<div class=\"st-3 st-container\" [@fadeInWord]=\"fadeInState[2]\">\n\t\t\t<h1 class=\"freigl\">Add your <span class=\"freigs\">skills</span></h1>\n\t\t\t<p class=\"freigb\">Knowing your skill set helps us to find you new opportunities</p>\n\t\t</div>\n\t\t<div class=\"st-4 st-container\" [@fadeInWord]=\"fadeInState[3]\">\n\t\t\t<h1>Pick your 5 favorite <span class=\"freigs\">topics</span></h1>\n\t\t\t<p class=\"freigb\">Always useful if you want to be connected to like minded peole... </p>\n\t\t</div>\n\t\t<div class=\"st-5 st-container\" [@fadeInWord]=\"fadeInState[4]\">\n\t\t\t<h1 class=\"freigl\">One final <span class=\"freigs\">step</span>... </h1>\n\t\t\t<p class=\"freigb\">Tell us a few words about you and why you're here</p>\n\t\t</div>\n\n\t</section>\n\n\t<section id=\"signup-basic-body\" [@slideLeft]=\"stateLeft\">\n\t\t<div class=\"signup-body-nav\">\n\t\t\t<ul>\n\t\t\t\t<li class=\"sbnba\"><strong>Basics</strong></li>\n\t\t\t\t<li class=\"sbnex\" (click)=\"slideModals(2)\">Experience</li>\n\t\t\t\t<li class=\"sbnsk\" (click)=\"slideModals(3)\">Skills</li>\n\t\t\t\t<li class=\"sbnin\" (click)=\"slideModals(4)\">Interests</li>\n\t\t\t\t<li class=\"sbnab\" (click)=\"slideModals(5)\">About you</li>\n\t\t\t</ul>\n\t\t</div>\n\n\t\t<div class=\"signup-body-info flex\">\n\t\t\t<div class=\"signup-info-picture bb\">\n\t\t\t\t<h1 *ngIf=\"profile\">{{ profile.fullName }}</h1>\n\t\t\t\t<input class=\"input-file\" id=\"file\" type=\"file\" name=\"imageFile\" ng2FileSelect [uploader]=\"uploader\">\n\t\t\t\t<label for=\"file\">\n\t\t\t\t\t<div class=\"animated fadeIn cursor-pt\" [ngClass]=\"{'signup-dd-picture': profile_picture, 'signup-dd-picture-2': !profile_picture}\">\n\t\t\t\t\t\t<div *ngIf=\"uploading\" class=\"spinner-load\">\n\t\t\t\t\t\t\t<div class=\"spinner__item1 spinner-item\"></div>\n\t\t\t\t\t\t\t<div class=\"spinner__item2 spinner-item\"></div>\n\t\t\t\t\t\t\t<div class=\"spinner__item3 spinner-item\"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<img *ngIf=\"profile_picture\" [src]=\"profile_picture\" alt=\"profile_picture\" />\n\t\t\t\t\t</div>\n\t\t\t\t</label>\n\t\t\t\t<div class=\"signup-dd-text\">\n\t\t\t\t\t<label for=\"file\"><h4>Upload a picture</h4></label>\n\t\t\t\t\t<p>Click the link above or drag and drop a picture here.</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"signup-info-info bb\">\n\t\t\t\t<div class=\"signup-info-gender\">\n\t\t\t\t\t<label>Your gender</label><br />\n\t\t\t\t\t<div class=\"signup-radio-male\">\n\t\t\t\t\t\t<div class=\"signup-radio\" (click)=\"getSexe('Male')\"><i *ngIf=\"sexe === 'Male'\" class=\"fa fa-check\"></i></div>\n\t\t\t\t\t\t<h5>Male</h5>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"signup-radio-female\">\n\t\t\t\t\t\t<div class=\"signup-radio\" (click)=\"getSexe('Female')\"><i *ngIf=\"sexe !== 'Male'\" class=\"fa fa-check\"></i></div>\n\t\t\t\t\t\t<h5>Female</h5>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"signup-info-location\">\n\t\t\t\t\t<label>Your location</label><br />\n\t\t\t\t\t<input type=\"text\" [(ngModel)]=\"location\" placeholder=\"Search your city\" (setAddress)=\"getAddress($event)\" googlePlace />\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"signup-info-network\">\n\t\t\t\t\t<label>Your network</label><br />\n\t\t\t\t\t<i class=\"fa fa-globe\"></i>\n\t\t\t\t\t<input id=\"sin-i\" [disabled]=\"loadNetwork\" [ngClass]=\"{ 'disabled-input' : loadNetwork }\" type=\"text\" [(ngModel)]=\"searchNetwork\" (ngModelChange)=\"onNetworkChange($event)\" placeholder=\"Berkeley, HEC, Station F...\" />\n\t\t\t\t\t<div id=\"sin-b\" class=\"signup-info-network-list\" *ngIf=\"networks\">\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li class=\"cursor-pt\" *ngFor=\"let network of (networks | searchPipe: 'network': searchNetwork).slice(0, 5)\" (click)=\"selectNetwork(network.network, network.website)\">{{ network.network }}</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t\t<p class=\"signup-info-network-text\">Networks help us to connect you to more people you may know</p>\n\t\t\t\t\t<p *ngIf=\"verification2\">You'll be notified by email when we've checked you're part of this network</p>\n\t\t\t\t\t<label *ngIf=\"verification\">Network verification</label>\n\t\t\t\t\t<div *ngIf=\"verification\" class=\"signup-info-network-university\">\n\t\t\t\t\t\t<input class=\"signup-info-network-mail\" type=\"email\" [(ngModel)]=\"email\" placeholder=\"{{ emailNetwork }}\" />\n\t\t\t\t\t\t<p class=\"signup-info-network-text\">We'll send you a verification email to add you to the {{profileNetwork}} network</p>\n\t\t\t\t\t\t<!-- <button class=\"signup-info-network-button\" ng-click=\"saveUniversityNetwork(emailNetwork)\">\n\t\t\t\t\t\t\t<span ng-if=\"!loadAddUniversity\">Send</span>\n\t\t\t\t\t\t\t<div ng-if=\"loadAddUniversity\" class=\"spinner-load\">\n\t\t\t\t\t\t\t<div class=\"spinner__item1 spinner-item\"></div>\n\t\t\t\t\t\t\t<div class=\"spinner__item2 spinner-item\"></div>\n\t\t\t\t\t\t\t<div class=\"spinner__item3 spinner-item\"></div>\n\t\t\t\t\t\t</button> -->\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"signup-info-button\">\n\t\t\t<button (click)=\"updateBasic()\" [ngClass]=\"{ 'disabled-button' : !check }\">Next</button>\n\t\t</div>\n\t</section>\n\n\t<app-signup-experience *ngIf=\"my_id\" [user_id]=\"my_id.id\"></app-signup-experience>\n\t<app-signup-skills *ngIf=\"my_id\" [user_id]=\"my_id.id\"></app-signup-skills>\n\t<app-signup-interests *ngIf=\"my_id\" [user_id]=\"my_id.id\"></app-signup-interests>\n\t<app-signup-about *ngIf=\"profile\" [(profile)]=\"profile\"></app-signup-about>\n</section>\n<app-footer *ngIf=\"!mobile\"></app-footer>\n"

/***/ }),

/***/ "./src/app/Components/signup/signup.component.scss":
/***/ (function(module, exports) {

module.exports = ".signup-title {\n  position: relative;\n  top: 80px; }\n  .signup-title h1 {\n    font-size: 28px; }\n  .signup-title h1 span {\n      font-size: 28px; }\n  .signup-title p {\n    font-size: 20px; }\n  .signup-title .st-container {\n    position: absolute;\n    left: 0;\n    right: 0; }\n  .signup-title .st-1, .signup-title .st-2, .signup-title .st-3, .signup-title .st-4, .signup-title .st-5 {\n    opacity: 0; }\n  #signup-basic-body {\n  position: absolute;\n  background-color: transparent;\n  margin-left: auto;\n  margin-right: auto;\n  left: 0;\n  right: 0;\n  max-width: 900px;\n  top: 180px;\n  border-radius: 4px;\n  -webkit-animation-duration: 0.5s;\n  -kthtml-animation-duration: 0.5s;\n  animation-duration: 0.5s; }\n  #signup-basic-body .signup-body-nav {\n    background-color: #fff;\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px; }\n  #signup-basic-body .signup-body-info {\n    padding: 25px 30px;\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    background-color: #fff;\n    border-bottom-left-radius: 4px;\n    border-bottom-right-radius: 4px;\n    margin-bottom: 30px; }\n  #signup-basic-body .signup-body-info .signup-info-picture {\n      position: relative;\n      width: 50%;\n      padding: 0 20px 0 0; }\n  #signup-basic-body .signup-body-info .signup-info-picture h1 {\n        font-family: 'FreigSem';\n        color: #222222; }\n  #signup-basic-body .signup-body-info .signup-info-picture .spinner-load {\n        width: 200px;\n        height: 200px;\n        border-radius: 50%;\n        background-color: rgba(0, 0, 0, 0.1); }\n  #signup-basic-body .signup-body-info .signup-info-picture .spinner-load .spinner-item {\n          width: 10px;\n          height: 10px; }\n  #signup-basic-body .signup-body-info .signup-info-picture .signup-dd-picture {\n        margin: 30px auto;\n        border-radius: 50%;\n        border: 2px dashed white;\n        height: 150px;\n        width: 150px;\n        overflow: hidden;\n        -webkit-transition-duration: 0.2s;\n        -kthtml-transition-duration: 0.2s;\n        transition-duration: 0.2s; }\n  #signup-basic-body .signup-body-info .signup-info-picture .signup-dd-picture img {\n          width: auto;\n          height: 150px; }\n  #signup-basic-body .signup-body-info .signup-info-picture .signup-dd-picture:hover {\n        border: 2px dashed #808080; }\n  #signup-basic-body .signup-body-info .signup-info-picture .signup-dd-picture-2 {\n        margin: 30px auto;\n        border: 2px dashed #999999;\n        border-radius: 50%;\n        height: 200px;\n        width: 200px;\n        overflow: hidden;\n        background-image: url(\"/public/images/default-picture.svg\");\n        background-repeat: no-repeat;\n        background-position: center bottom;\n        background-size: 145px;\n        cursor: pointer;\n        -webkit-transition-duration: 0.2s;\n        -kthtml-transition-duration: 0.2s;\n        transition-duration: 0.2s; }\n  #signup-basic-body .signup-body-info .signup-info-picture .signup-dd-picture-2 img {\n          width: auto;\n          height: 200px; }\n  #signup-basic-body .signup-body-info .signup-info-picture .signup-dd-picture-2:hover {\n        border: 2px dashed #222222; }\n  #signup-basic-body .signup-body-info .signup-info-picture .signup-dd-text h4,\n      #signup-basic-body .signup-body-info .signup-info-picture .signup-dd-text-mobile h4 {\n        font-family: 'FreigSem';\n        font-size: 17px;\n        color: #ff4d4d;\n        cursor: pointer; }\n  #signup-basic-body .signup-body-info .signup-info-picture .signup-dd-text h4:hover,\n      #signup-basic-body .signup-body-info .signup-info-picture .signup-dd-text-mobile h4:hover {\n        color: #D94242; }\n  #signup-basic-body .signup-body-info .signup-info-picture .signup-dd-text p,\n      #signup-basic-body .signup-body-info .signup-info-picture .signup-dd-text-mobile p {\n        font-family: 'FreigBook';\n        font-size: 16px;\n        color: #999999; }\n  #signup-basic-body .signup-body-info .signup-info-info {\n      width: 50%;\n      padding: 20px 15px 20px 25px;\n      text-align: left;\n      border-left: 1px solid #e5e5e5; }\n  #signup-basic-body .signup-body-info .signup-info-info label {\n        font-family: 'FreigSem';\n        font-size: 16px;\n        color: #222222;\n        margin-bottom: 5px; }\n  #signup-basic-body .signup-body-info .signup-info-info .signup-info-gender {\n        margin-bottom: 30px;\n        height: 52px; }\n  #signup-basic-body .signup-body-info .signup-info-info .signup-info-gender h5 {\n          display: inline-block;\n          font-family: 'FreigBook';\n          font-size: 16px;\n          color: #999999;\n          float: right;\n          position: relative;\n          top: 2px; }\n  #signup-basic-body .signup-body-info .signup-info-info .signup-info-gender .signup-radio-male {\n          float: left;\n          display: inline-block;\n          margin-right: 20px;\n          font-family: 'FreigBook';\n          font-size: 17px;\n          color: #999999; }\n  #signup-basic-body .signup-body-info .signup-info-info .signup-info-gender .signup-radio-female {\n          display: inline-block;\n          font-family: 'FreigBook';\n          font-size: 17px;\n          color: #999999; }\n  #signup-basic-body .signup-body-info .signup-info-info .signup-info-gender .signup-radio {\n          display: inline-block;\n          text-align: center;\n          border-radius: 50%;\n          border: 1px solid #e5e5e5;\n          height: 22px;\n          width: 23px;\n          margin-right: 5px;\n          cursor: pointer; }\n  #signup-basic-body .signup-body-info .signup-info-info .signup-info-gender .signup-radio .fa-check {\n            font-weight: lighter;\n            position: relative;\n            bottom: 1px;\n            color: #ff4d4d; }\n  #signup-basic-body .signup-body-info .signup-info-info .signup-info-gender p {\n          font-family: 'FreigBook';\n          font-size: 16px;\n          color: #999999;\n          margin-top: 5px; }\n  #signup-basic-body .signup-body-info .signup-info-bd {\n      margin-bottom: 25px; }\n  #signup-basic-body .signup-body-info .signup-info-bd .signup-bd-box {\n        display: inline-block; }\n  #signup-basic-body .signup-body-info .signup-info-bd .signup-bd-box .bd-box {\n          padding: 10px 15px;\n          border: 1px solid #e5e5e5;\n          border-radius: 4px;\n          background-image: url(\"/public/images/arrow-down-icon-b.svg\");\n          background-repeat: no-repeat;\n          background-position: 92% 51%;\n          cursor: pointer; }\n  #signup-basic-body .signup-body-info .signup-info-bd .signup-bd-box .bd-box h4 {\n            font-family: 'FreigBook';\n            font-size: 17px;\n            color: #999999; }\n  #signup-basic-body .signup-body-info .signup-info-bd .signup-bd-box .signup-bd-day {\n          width: 100px;\n          margin-right: 5px; }\n  #signup-basic-body .signup-body-info .signup-info-bd .signup-bd-box .signup-bd-dropdown {\n          display: none;\n          position: absolute;\n          background-color: white;\n          border: 1px solid #e5e5e5;\n          border-radius: 4px;\n          width: 100px;\n          height: 172px;\n          z-index: 100;\n          overflow-y: scroll;\n          overflow-x: hidden;\n          text-align: center; }\n  #signup-basic-body .signup-body-info .signup-info-bd .signup-bd-box .signup-bd-dropdown li {\n            font-family: 'FreigBook';\n            font-size: 17px;\n            color: #999999;\n            padding: 5px 20px;\n            cursor: pointer; }\n  #signup-basic-body .signup-body-info .signup-info-bd .signup-bd-box .signup-bd-dropdown li:hover {\n            background-color: #f5f5f5; }\n  #signup-basic-body .signup-body-info .signup-info-bd .signup-bd-box .signup-bd-dropdownM {\n          display: none;\n          position: absolute;\n          background-color: white;\n          border: 1px solid #e5e5e5;\n          border-radius: 4px;\n          width: 153px;\n          height: 172px;\n          z-index: 100;\n          overflow: scroll;\n          text-align: center; }\n  #signup-basic-body .signup-body-info .signup-info-bd .signup-bd-box .signup-bd-dropdownM li {\n            font-family: 'FreigBook';\n            font-size: 17px;\n            color: #999999;\n            padding: 5px 20px;\n            cursor: pointer; }\n  #signup-basic-body .signup-body-info .signup-info-bd .signup-bd-box .signup-bd-dropdownM li:hover {\n            background-color: #f5f5f5; }\n  #signup-basic-body .signup-body-info .signup-info-bd .signup-bd-box .signup-bd-month {\n          width: 153px;\n          margin-right: 5px; }\n  #signup-basic-body .signup-body-info .signup-info-bd .signup-bd-box .signup-bd-year {\n          width: 100px; }\n  #signup-basic-body .signup-body-info .signup-info-network {\n      margin-bottom: 30px; }\n  #signup-basic-body .signup-body-info .signup-info-network i {\n        position: absolute;\n        margin-top: 21px;\n        margin-left: 14px;\n        font-size: 18px;\n        color: #999999; }\n  #signup-basic-body .signup-body-info .signup-info-network input {\n        width: 100%;\n        padding: 8px 15px 8px 40px;\n        border: 1px solid #e5e5e5;\n        border-radius: 4px;\n        font-family: 'FreigBook';\n        font-size: 16px;\n        color: #222222; }\n  #signup-basic-body .signup-body-info .signup-info-network .disabled-input {\n        opacity: 0.5;\n        cursor: default;\n        pointer-events: none; }\n  #signup-basic-body .signup-body-info .signup-info-network .signup-info-network-list {\n        position: absolute;\n        display: none;\n        background-color: white;\n        padding: 10px 0px 10px 0px;\n        border: 1px solid #e5e5e5;\n        border-radius: 4px;\n        z-index: 100;\n        width: 240px;\n        /*\t\t\t\t\tmin-height: 40px;\n*/ }\n  #signup-basic-body .signup-body-info .signup-info-network .signup-info-network-list li {\n          display: block;\n          font-family: 'FreigBook';\n          padding: 5px 15px;\n          font-size: 16px;\n          /*\t\t\t\t\t\tbackground-color: #999999;\n*/\n          /*margin-right: 8px;*/\n          margin-bottom: 4px;\n          margin-top: 4px;\n          color: black;\n          -webkit-transition-duration: 0.3s;\n          -kthtml-transition-duration: 0.3s;\n          transition-duration: 0.3s; }\n  #signup-basic-body .signup-body-info .signup-info-network .signup-info-network-list li:hover {\n          background-color: #e5e5e5; }\n  #signup-basic-body .signup-body-info .signup-info-network .signup-info-network-mail {\n        display: inline-block;\n        width: 70%;\n        padding-left: 15px; }\n  #signup-basic-body .signup-body-info .signup-info-network .signup-info-network-button {\n        position: relative;\n        bottom: 1px;\n        padding: 5px 12px 7px 12px;\n        margin-left: 5px; }\n  #signup-basic-body .signup-body-info .signup-info-network .signup-info-network-button .spinner-load {\n          position: relative;\n          background-color: transparent; }\n  #signup-basic-body .signup-body-info .signup-info-network p {\n        font-family: 'FreigBook';\n        font-size: 16px;\n        color: #999999;\n        padding-left: 2px; }\n  #signup-basic-body .signup-body-info .signup-info-network .signup-info-network-text {\n        font-family: 'FreigMed';\n        font-size: 14px;\n        margin-bottom: 15px; }\n  #signup-basic-body .signup-body-info .signup-info-location {\n      margin-bottom: 20px; }\n  #signup-basic-body .signup-body-info .signup-info-location input {\n        padding: 10px 40px;\n        width: 100%;\n        border: 1px solid #e5e5e5;\n        border-radius: 4px;\n        background-image: url(\"/public/images/location-picto.svg\");\n        background-repeat: no-repeat;\n        background-position: 15px 50%;\n        font-family: 'FreigBook';\n        font-size: 17px;\n        color: #222222; }\n  #signup-basic-body .signup-body-info .signup-info-button {\n      text-align: center; }\n  #signup-basic-body .signup-body-info .signup-info-button button {\n        padding: 6px 30px 8px 30px; }\n  /******************** MOBILE ****************************/\n  @media only screen and (max-width: 736px) {\n  #signup-page {\n    height: 100% !important; }\n    #signup-page .filter-signup {\n      display: none !important; }\n    #signup-page #signup-basic-body {\n      top: 0;\n      border-radius: 0; }\n      #signup-page #signup-basic-body .signup-body-info {\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap; }\n        #signup-page #signup-basic-body .signup-body-info .signup-info-picture {\n          width: 100%;\n          padding: 0;\n          margin-bottom: 30px; }\n        #signup-page #signup-basic-body .signup-body-info .signup-info-info {\n          width: 100%;\n          padding: 0;\n          border: 0; } }\n"

/***/ }),

/***/ "./src/app/Components/signup/signup.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export fadeInObject */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cloudinary__ = __webpack_require__("./node_modules/ng2-cloudinary/dist/esm/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_Profiles_profiles_service__ = __webpack_require__("./src/app/Services/Profiles/profiles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_shared_service__ = __webpack_require__("./src/app/Services/shared.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Services_Networks_networks_service__ = __webpack_require__("./src/app/Services/Networks/networks.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Services_Pictures_pictures_service__ = __webpack_require__("./src/app/Services/Pictures/pictures.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Services_Backoffice_backoffice_service__ = __webpack_require__("./src/app/Services/Backoffice/backoffice.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Interfaces_Constants_networks_constant__ = __webpack_require__("./src/app/Interfaces/Constants/networks-constant.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Animations_animations__ = __webpack_require__("./src/app/Animations/animations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Animations_fadeInWord_animation__ = __webpack_require__("./src/app/Animations/fadeInWord.animation.ts");
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






/* Interfaces */

/* Animations */


var fadeInObject = [
    'fadeOut',
    'fadeOut',
    'fadeOut',
    'fadeOut',
    'fadeOut'
];
var SignupComponent = /** @class */ (function () {
    function SignupComponent(TokenService, SharedService, ProfilesService, NetworksService, PicturesService, route, router, BackofficeService) {
        var _this = this;
        this.TokenService = TokenService;
        this.SharedService = SharedService;
        this.ProfilesService = ProfilesService;
        this.NetworksService = NetworksService;
        this.PicturesService = PicturesService;
        this.route = route;
        this.router = router;
        this.BackofficeService = BackofficeService;
        this.sexe = 'Male';
        this.loadNetwork = false;
        this.check = false;
        this.uploading = false;
        this.showNetwork = false;
        this.verification = false;
        this.verification2 = false;
        this.mobile = false;
        this.reloadChildren = false;
        this.startupNetwork = __WEBPACK_IMPORTED_MODULE_9__Interfaces_Constants_networks_constant__["a" /* networks */];
        this.fadeInState = fadeInObject;
        this.uploader = new __WEBPACK_IMPORTED_MODULE_2_ng2_cloudinary__["b" /* CloudinaryUploader */](new __WEBPACK_IMPORTED_MODULE_2_ng2_cloudinary__["a" /* CloudinaryOptions */]({ cloudName: 'dqpkpmrgk', uploadPreset: 'z7rzegb5', autoUpload: true }));
        this.route.queryParams.subscribe(function (params) {
            if (params['id'])
                _this.initConstructor();
            else
                _this.router.navigate(['/login']);
        });
        this.imageUpload();
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.initWindow();
        this.initCookie();
        this.getNetworks();
        this.fadeInState[0] = 'fadeIn';
    };
    SignupComponent.prototype.initConstructor = function () {
        var _this = this;
        this.getToken();
        this.stateLeft = 'in';
        this.subscription = this.SharedService.signupModal$.subscribe(function (res) {
            var fadeIndex = _this.fadeInState.indexOf('fadeIn');
            _this.fadeInState[fadeIndex] = 'fadeOut';
            _this.fadeInState[res['index'] - 1] = 'fadeIn';
            if (res['index'] === 1) {
                _this.stateLeft = 'in';
            }
        });
    };
    SignupComponent.prototype.initWindow = function () {
        window.scrollTo(0, 0);
        if ((window.screen.width) < 736)
            this.mobile = true;
    };
    SignupComponent.prototype.initCookie = function () {
        if (localStorage.getItem('network')) {
            this.searchNetwork = localStorage.getItem('network');
            this.loadNetwork = true;
            this.updateProfileNetwork(this.searchNetwork);
        }
        if (localStorage.getItem('project')) {
            var project_token = localStorage.getItem('project');
            this.BackofficeService.updateProjectCreator(project_token, {}).subscribe(function (res) {
                console.log(res);
            });
        }
    };
    SignupComponent.prototype.imageUpload = function () {
        var _this = this;
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            _this.uploading = false;
            _this.profile_picture = JSON.parse(response)['secure_url'];
        };
        this.uploader.onAfterAddingFile = function (fileItem) {
            _this.uploading = true;
            _this.uploader.uploadAll();
        };
    };
    SignupComponent.prototype.setDefaultPicture = function (index, id) {
        var _this = this;
        this.PicturesService.setDefaultProfilePicture(index, id).subscribe(function (res) {
            _this.reloadHeader();
        });
    };
    SignupComponent.prototype.getToken = function () {
        if (this.TokenService.getToken()) {
            this.my_id = this.TokenService.getToken().user;
            this.getProfile(this.my_id['id']);
        }
        // } else
        // 	this.router.navigate(['/login']);
    };
    SignupComponent.prototype.getNetworks = function () {
        var _this = this;
        this.NetworksService.getNetworks('university').subscribe(function (res) {
            _this.networks = res.university;
        });
    };
    SignupComponent.prototype.getProfile = function (id) {
        var _this = this;
        this.ProfilesService.getProfile(id).subscribe(function (res) {
            _this.profile = res.profile;
            if (!_this.profile['picture']) {
                _this.setDefaultPicture(0, id);
            }
            else {
                _this.setDefaultPicture(1, id);
                _this.profile_picture = _this.profile['picture'];
            }
        });
    };
    SignupComponent.prototype.getSexe = function (sexe) {
        this.sexe = sexe;
    };
    SignupComponent.prototype.getAddress = function (place) {
        var address = place['formatted_address'].replace('USA', 'United States');
        this.location = address.split(', ');
        this.long = place['geometry'].location.lat();
        this.lat = place['geometry'].location.lng();
        this.check = true;
    };
    SignupComponent.prototype.checkEmail = function (email) {
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(email);
    };
    SignupComponent.prototype.updateProfileNetwork = function (network) {
        var body = {
            network: network
        };
        this.ProfilesService.updateProfile(this.my_id['id'], body).subscribe(function (res) {
            console.log(res);
        });
    };
    SignupComponent.prototype.updateBasic = function () {
        var _this = this;
        if (this.location && this.location[0]) {
            var body = {
                genre: this.sexe,
                picture: this.profile_picture,
                location: {
                    city: this.location[0],
                    state: this.location[1],
                    country: this.location[this.location.length - 1],
                    lng: this.long,
                    lat: this.lat
                }
            };
            if (!this.loadNetwork && this.checkEmail(this.email) && this.searchNetwork) {
                this.NetworksService.joinNetwork({ email: this.email, network: this.searchNetwork })
                    .subscribe(function (res) {
                    if (res.success) {
                        _this.email = '';
                        _this.searchNetwork = '';
                    }
                });
            }
            this.ProfilesService.updateProfile(this.my_id['id'], body).subscribe(function (res) {
                if (res.success) {
                    _this.reloadHeader();
                    setTimeout(function () {
                        _this.slideModals(2);
                    }, 500);
                }
            });
        }
    };
    SignupComponent.prototype.onFocus = function (event) {
        this.showNetwork = this.showNetwork ? false : true;
    };
    SignupComponent.prototype.onNetworkChange = function (event) {
        if (!event)
            this.verification = this.verification2 = false;
    };
    SignupComponent.prototype.networkVerification = function (name, website) {
        this.verification = this.verification2 = false;
        if (this.startupNetwork.indexOf(name) >= 0)
            this.verification2 = true;
        else {
            this.getEmailNetwork(website);
            this.verification = true;
        }
    };
    SignupComponent.prototype.getEmailNetwork = function (website) {
        var position1 = website.indexOf('.') + 1;
        var position2 = website.lastIndexOf('.');
        this.emailNetwork = 'email@' + website.slice(position1, position2) + '.edu';
    };
    SignupComponent.prototype.selectNetwork = function (name, website) {
        this.searchNetwork = name;
        this.networkVerification(name, website);
    };
    SignupComponent.prototype.slideModals = function (index) {
        if (this.check) {
            this.stateLeft = 'out';
            this.SharedService.setSignupModalIndex(index, 1);
        }
    };
    SignupComponent.prototype.reloadHeader = function () {
        this.SharedService.reloadHeader(true);
    };
    SignupComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-signup',
            template: __webpack_require__("./src/app/Components/signup/signup.component.html"),
            styles: [__webpack_require__("./src/app/Components/signup/signup.component.scss"), __webpack_require__("./src/public/styles/signup.scss")],
            animations: [__WEBPACK_IMPORTED_MODULE_10__Animations_animations__["n" /* slideLeft */], __WEBPACK_IMPORTED_MODULE_11__Animations_fadeInWord_animation__["a" /* fadeInWord */]],
            providers: [__WEBPACK_IMPORTED_MODULE_4__Services_Profiles_profiles_service__["a" /* ProfilesService */], __WEBPACK_IMPORTED_MODULE_6__Services_Networks_networks_service__["a" /* NetworksService */], __WEBPACK_IMPORTED_MODULE_8__Services_Backoffice_backoffice_service__["a" /* BackofficeService */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__Services_Authentication_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_Authentication_token_service__["a" /* TokenService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__Services_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_shared_service__["a" /* SharedService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__Services_Profiles_profiles_service__["a" /* ProfilesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_Profiles_profiles_service__["a" /* ProfilesService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__Services_Networks_networks_service__["a" /* NetworksService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__Services_Networks_networks_service__["a" /* NetworksService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_7__Services_Pictures_pictures_service__["a" /* PicturesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__Services_Pictures_pictures_service__["a" /* PicturesService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_8__Services_Backoffice_backoffice_service__["a" /* BackofficeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__Services_Backoffice_backoffice_service__["a" /* BackofficeService */]) === "function" && _h || Object])
    ], SignupComponent);
    return SignupComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());

//# sourceMappingURL=signup.component.js.map

/***/ }),

/***/ "./src/app/Components/signup/signup.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupModule", function() { return SignupModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__ = __webpack_require__("./src/app/Pipes/pipe.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__footer_footer_module__ = __webpack_require__("./src/app/Components/footer/footer.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modals_modal_module__ = __webpack_require__("./src/app/Components/modals/modal.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__signup_component__ = __webpack_require__("./src/app/Components/signup/signup.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__signup_experience_signup_experience_component__ = __webpack_require__("./src/app/Components/signup/signup-experience/signup-experience.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__signup_about_signup_about_component__ = __webpack_require__("./src/app/Components/signup/signup-about/signup-about.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__signup_skills_signup_skills_component__ = __webpack_require__("./src/app/Components/signup/signup-skills/signup-skills.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__signup_interests_signup_interests_component__ = __webpack_require__("./src/app/Components/signup/signup-interests/signup-interests.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Services_Invitation_invitation_service__ = __webpack_require__("./src/app/Services/Invitation/invitation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Directives_directives_module__ = __webpack_require__("./src/app/Directives/directives.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angular2_moment__ = __webpack_require__("./node_modules/angular2-moment/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ng2_cloudinary__ = __webpack_require__("./node_modules/ng2-cloudinary/dist/esm/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ng2_file_upload__ = __webpack_require__("./node_modules/ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__Routes_signup_routes__ = __webpack_require__("./src/app/Routes/signup.routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







/* Components */





/* Services */

/* Directives */

/* Librairies */



/* Routes */

var SignupModule = /** @class */ (function () {
    function SignupModule() {
    }
    SignupModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_17__Routes_signup_routes__["a" /* SIGNUP_ROUTES */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["f" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__["a" /* PipeModule */],
                __WEBPACK_IMPORTED_MODULE_5__footer_footer_module__["a" /* FooterModule */],
                __WEBPACK_IMPORTED_MODULE_6__modals_modal_module__["a" /* ModalModule */],
                __WEBPACK_IMPORTED_MODULE_13__Directives_directives_module__["a" /* DirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_14_angular2_moment__["MomentModule"],
                __WEBPACK_IMPORTED_MODULE_15_ng2_cloudinary__["c" /* Ng2CloudinaryModule */],
                __WEBPACK_IMPORTED_MODULE_16_ng2_file_upload__["FileUploadModule"]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__signup_component__["a" /* SignupComponent */],
                __WEBPACK_IMPORTED_MODULE_8__signup_experience_signup_experience_component__["a" /* SignupExperienceComponent */],
                __WEBPACK_IMPORTED_MODULE_9__signup_about_signup_about_component__["a" /* SignupAboutComponent */],
                __WEBPACK_IMPORTED_MODULE_10__signup_skills_signup_skills_component__["a" /* SignupSkillsComponent */],
                __WEBPACK_IMPORTED_MODULE_11__signup_interests_signup_interests_component__["a" /* SignupInterestsComponent */],
            ],
            entryComponents: [],
            providers: [__WEBPACK_IMPORTED_MODULE_12__Services_Invitation_invitation_service__["a" /* InvitationService */]]
        })
    ], SignupModule);
    return SignupModule;
}());

//# sourceMappingURL=signup.module.js.map

/***/ }),

/***/ "./src/app/Routes/signup.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SIGNUP_ROUTES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Components_signup_signup_component__ = __webpack_require__("./src/app/Components/signup/signup.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_Authentication_authentication_service__ = __webpack_require__("./src/app/Services/Authentication/authentication.service.ts");

/* Components */

/* Services */

/* Librairies */
var routes = [
    { path: '', canActivate: [__WEBPACK_IMPORTED_MODULE_2__Services_Authentication_authentication_service__["a" /* AuthenticationService */]], component: __WEBPACK_IMPORTED_MODULE_1__Components_signup_signup_component__["a" /* SignupComponent */] },
];
var SIGNUP_ROUTES = __WEBPACK_IMPORTED_MODULE_0__angular_router__["f" /* RouterModule */].forChild(routes);
//# sourceMappingURL=signup.routes.js.map

/***/ }),

/***/ "./src/public/styles/signup.scss":
/***/ (function(module, exports) {

module.exports = "#signup-page {\n  position: relative;\n  z-index: 499;\n  height: 795px;\n  background-image: url(\"/public/images/poster/poster_home_signup.jpg\");\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: cover;\n  text-align: center; }\n  #signup-page .filter-signup {\n    position: absolute;\n    height: 795px;\n    width: 100%;\n    background-color: rgba(0, 0, 0, 0.5); }\n  #signup-page h1 {\n    font-family: 'FreigLight';\n    color: white; }\n  #signup-page #signup-page-header {\n    position: relative;\n    padding: 0 20px;\n    top: 100px; }\n  #signup-page button {\n    font-family: 'FreigMed';\n    font-size: 17px;\n    background-color: #ff4d4d;\n    border: 1px solid #ff4d4d;\n    border-radius: 4px;\n    padding: 6px 30px 8px 30px;\n    color: white; }\n  #signup-page button:hover {\n    border: 1px solid #d94242;\n    background-color: #d94242; }\n  #signup-page .disabled-button {\n    opacity: 0.3;\n    cursor: default; }\n  #signup-page .disabled-input {\n    opacity: 0.5;\n    cursor: default;\n    pointer-events: none; }\n  .signup-body-nav {\n  border-bottom: 1px solid #e5e5e5; }\n  .signup-body-nav li {\n    display: inline-block;\n    font-family: 'FreigBook';\n    font-size: 16px;\n    padding: 15px 20px;\n    color: #999999;\n    cursor: pointer; }\n  .signup-body-nav li:hover {\n    background-color: #fafafa; }\n"

/***/ })

});
//# sourceMappingURL=signup.module.chunk.js.map