webpackJsonp(["networks.module"],{

/***/ "./src/app/Components/networks/network-profiles/network-profiles.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n\t<div class=\"wnb-about flex\">\n\t\t<div class=\"wnba-skills pad-x-15\">\n\t\t\t<h2 class=\"freigl mar-b-15\">What they do</h2>\n\t\t\t<div class=\"percentage flex\" *ngFor=\"let skill of statSkills; let s_i = index\" [style.width]=\"getWidth(s_i, skill.percentage, 'skills')\">\n\t\t\t\t<li class=\"freigs\">{{ skill.name }}</li>\n\t\t\t\t<span class=\"freigs\">{{ skill.percentage }}%</span>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"wnba-location pad-x-15\">\n\t\t\t<h2 class=\"freigl mar-b-15\">Where they are</h2>\n\t\t\t<div class=\"continents\" *ngFor=\"let location of locations; let l_i = index\">\n\t\t\t\t<div class=\"countries flex cursor-pt\" (click)=\"getCountry(l_i)\">\n\t\t\t\t\t<li class=\"freigb\">{{ location.name }}</li>\n\t\t\t\t\t<span class=\"freigb\">{{ location.percentage }}%</span>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"country mar-b-15\" *ngIf=\"showCountry === l_i\">\n\t\t\t\t\t<li class=\"freigb\" *ngFor=\"let country of location.countries\"><span class=\"mar-r-10\">{{ country.name }}</span> {{ country.number }}</li>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class=\"wnb-activities flex\">\n\t\t<div class=\"wnba-recent bb pad-x-15\">\n\t\t\t<h2 class=\"freigl mar-b-15\">Recent activity</h2>\n\t\t\t<div *ngIf=\"statistics\">\n\t\t\t\t<a routerLink=\"{{ activity.url }}\" *ngFor=\"let activity of activities\">\n\t\t\t\t\t<div class=\"activity flex mar-b-10\">\n\t\t\t\t\t\t<img class=\"mar-r-10\" [src]=\"getInfo(activity.id, 'picture')\" alt=\"profile\" />\n\t\t\t\t\t\t<p class=\"freigl flex-grow pad-r-15\">{{ getInfo(activity.id, 'fullName') }} {{ activity.message }} <span class=\"freigs\">{{ activity.who }}</span> </p>\n\t\t\t\t\t\t<span class=\"min freigm\">{{ activity.timestamp }}</span>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"wnba-like bb pad-x-15\">\n\t\t\t<h2 class=\"freigl mar-b-15\">What they like</h2>\n\t\t\t<div class=\"percentage flex\" *ngFor=\"let interest of statInterests; let l_i = index\" [style.width]=\"getWidth(l_i, interest.percentage, 'interests')\">\n\t\t\t\t<li class=\"freigs\">{{ interest.name }}</li>\n\t\t\t\t<span class=\"freigs\">{{ interest.percentage }}%</span>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ "./src/app/Components/networks/network-profiles/network-profiles.component.scss":
/***/ (function(module, exports) {

module.exports = ".container {\n  padding: 15px;\n  width: 800px;\n  margin: 0 auto; }\n\nh2 {\n  font-size: 26px;\n  color: #2b2b2b; }\n\n.wnb-story {\n  text-align: center;\n  margin-bottom: 40px; }\n\n.wnb-story .wnbs-text {\n    max-height: 105px;\n    overflow: hidden;\n    margin-bottom: 20px;\n    color: #222; }\n\n.wnb-story .wnbs-text .filter-text {\n      position: absolute;\n      width: 800px;\n      height: 105px;\n      /* For Safari 5.1 to 6.0 */\n      /* For Opera 11.1 to 12.0 */\n      /* For Firefox 3.6 to 15 */\n      background: -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 0.2)), to(rgba(255, 255, 255, 0.9)));\n      background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.9));\n      /* Standard syntax (must be last) */ }\n\n.wnb-story .wnbs-text .innerHtml {\n      font-size: 18px; }\n\n.wnb-story .wnbs-arrow {\n    text-align: center; }\n\n.wnb-story .wnbs-members a {\n    padding: 10px 3px; }\n\n.wnb-story .wnbs-members img {\n    width: 32px;\n    border-radius: 50%; }\n\n.wnb-story .wnbs-more h5 {\n    color: #626363; }\n\n.wnb-about {\n  margin-bottom: 40px;\n  -webkit-box-align: baseline;\n      -ms-flex-align: baseline;\n          align-items: baseline; }\n\n.wnb-about .wnba-skills {\n    width: 50%;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box; }\n\n.wnb-about .wnba-location {\n    width: 50%;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    margin-left: 40px; }\n\n.wnb-about .wnba-skills .percentage {\n    margin-bottom: 10px;\n    padding: 4px 10px;\n    background-color: #222;\n    border-radius: 4px;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box; }\n\n.wnb-about .wnba-skills .percentage li {\n      font-size: 14px;\n      text-transform: uppercase; }\n\n.wnb-about .wnba-skills .percentage span {\n      margin-left: auto; }\n\n.wnb-about .wnba-location li, .wnb-about .wnba-location span {\n    color: #2b2b2b; }\n\n.wnb-about .wnba-location .countries {\n    margin-bottom: 5px;\n    width: 150px; }\n\n.wnb-about .wnba-location .countries span {\n      margin-left: auto; }\n\n.wnb-about .wnba-location .country {\n    padding-left: 30px; }\n\n.wnb-about .wnba-location .country li, .wnb-about .wnba-location .country span {\n      color: #999; }\n\n.wnb-activities {\n  -webkit-box-align: baseline;\n      -ms-flex-align: baseline;\n          align-items: baseline; }\n\n.wnb-activities .wnba-recent {\n    width: 50%; }\n\n.wnb-activities .wnba-recent .activity {\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n\n.wnb-activities .wnba-recent .activity img {\n        width: 32px;\n        border-radius: 50%; }\n\n.wnb-activities .wnba-recent .activity p, .wnb-activities .wnba-recent .activity span {\n        color: #2b2b2b; }\n\n.wnb-activities .wnba-recent .activity .min {\n        -ms-flex-negative: 0;\n            flex-shrink: 0;\n        color: #ccc; }\n\n.wnb-activities .wnba-like {\n    width: 50%;\n    margin-left: 40px; }\n\n.wnb-activities .wnba-like .percentage {\n      margin-bottom: 10px;\n      padding: 4px 10px;\n      background-color: #999;\n      border-radius: 4px;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box; }\n\n.wnb-activities .wnba-like .percentage li {\n        font-size: 14px;\n        text-transform: uppercase; }\n\n.wnb-activities .wnba-like .percentage span {\n        margin-left: auto; }\n"

/***/ }),

/***/ "./src/app/Components/networks/network-profiles/network-profiles.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NetworkProfilesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_Statistics_statistics_service__ = __webpack_require__("./src/app/Services/Statistics/statistics.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Interfaces_Constants_fake_constant__ = __webpack_require__("./src/app/Interfaces/Constants/fake.constant.ts");
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
var NetworkProfilesComponent = /** @class */ (function () {
    function NetworkProfilesComponent(StatisticsService, Router, route) {
        this.StatisticsService = StatisticsService;
        this.Router = Router;
        this.route = route;
    }
    NetworkProfilesComponent.prototype.ngOnInit = function () {
        this.showCountry = 0;
        this.initParams();
    };
    /* FAKE */
    NetworkProfilesComponent.prototype.initFake = function (name) {
        if (name === '42') {
            this.locations = __WEBPACK_IMPORTED_MODULE_3__Interfaces_Constants_fake_constant__["a" /* fake42 */][0].locations;
            this.statSkills = __WEBPACK_IMPORTED_MODULE_3__Interfaces_Constants_fake_constant__["a" /* fake42 */][0].skills;
            this.statInterests = __WEBPACK_IMPORTED_MODULE_3__Interfaces_Constants_fake_constant__["a" /* fake42 */][0].interests;
            this.activities = __WEBPACK_IMPORTED_MODULE_3__Interfaces_Constants_fake_constant__["a" /* fake42 */][0].activities;
        }
        else if (name === 'ESCP') {
            this.locations = __WEBPACK_IMPORTED_MODULE_3__Interfaces_Constants_fake_constant__["c" /* fakeESCP */][0].locations;
            this.statSkills = __WEBPACK_IMPORTED_MODULE_3__Interfaces_Constants_fake_constant__["c" /* fakeESCP */][0].skills;
            this.statInterests = __WEBPACK_IMPORTED_MODULE_3__Interfaces_Constants_fake_constant__["c" /* fakeESCP */][0].interests;
            this.activities = __WEBPACK_IMPORTED_MODULE_3__Interfaces_Constants_fake_constant__["c" /* fakeESCP */][0].activities;
        }
        else if (name === 'Dauphine') {
            this.locations = __WEBPACK_IMPORTED_MODULE_3__Interfaces_Constants_fake_constant__["b" /* fakeDauphine */][0].locations;
            this.statSkills = __WEBPACK_IMPORTED_MODULE_3__Interfaces_Constants_fake_constant__["b" /* fakeDauphine */][0].skills;
            this.statInterests = __WEBPACK_IMPORTED_MODULE_3__Interfaces_Constants_fake_constant__["b" /* fakeDauphine */][0].interests;
            this.activities = __WEBPACK_IMPORTED_MODULE_3__Interfaces_Constants_fake_constant__["b" /* fakeDauphine */][0].activities;
        }
        else {
            this.locations = __WEBPACK_IMPORTED_MODULE_3__Interfaces_Constants_fake_constant__["d" /* fakeRefiners */][0].locations;
            this.statSkills = __WEBPACK_IMPORTED_MODULE_3__Interfaces_Constants_fake_constant__["d" /* fakeRefiners */][0].skills;
            this.statInterests = __WEBPACK_IMPORTED_MODULE_3__Interfaces_Constants_fake_constant__["d" /* fakeRefiners */][0].interests;
            this.activities = __WEBPACK_IMPORTED_MODULE_3__Interfaces_Constants_fake_constant__["d" /* fakeRefiners */][0].activities;
        }
    };
    NetworkProfilesComponent.prototype.initParams = function () {
        var _this = this;
        this.Router.parent.params.subscribe(function (params) {
            if (params && params['name']) {
                _this.initFake(params['name']);
                _this.getNetworkProfilesStatistics(params['name']);
            }
            else
                _this.route.navigate(['/']);
        });
    };
    NetworkProfilesComponent.prototype.getCountry = function (index) {
        this.showCountry = index;
    };
    NetworkProfilesComponent.prototype.getInfo = function (id, type) {
        var length = this.statistics['profiles'].length;
        for (var i = 0; i < length; i++) {
            if (this.statistics['profiles'][i].id === id)
                return type === 'picture' ? this.statistics['profiles'][i].profile_picture
                    : this.statistics['profiles'][i].fullName;
        }
    };
    // getRandomProfile() {
    // 	let random = Math.floor((Math.random() * this.statistics['profiles'].length) + 1)
    // 	console.log(random);
    // }
    NetworkProfilesComponent.prototype.getNetworkProfilesStatistics = function (network) {
        var _this = this;
        this.StatisticsService.getNetworksProfiles(network).subscribe(function (res) {
            console.log(res);
            _this.statistics = res;
            // this.getRandomProfile();
            // this.statSkills = this.statistics.skills.slice(0, 4);
        });
    };
    NetworkProfilesComponent.prototype.getPercentage = function (number, type) {
        var percentage = 0;
        percentage = Math.round((number * 100) / this.statistics[type].length);
        return percentage;
    };
    NetworkProfilesComponent.prototype.getWidth = function (index, percentage, type) {
        if (index === 0) {
            return '100%';
        }
        else {
            if (type === 'skills')
                return ((percentage * 100) / this.statSkills[0].percentage) + '%';
            else
                return ((percentage * 100) / this.statInterests[0].percentage) + '%';
        }
    };
    NetworkProfilesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-network-profiles',
            template: __webpack_require__("./src/app/Components/networks/network-profiles/network-profiles.component.html"),
            styles: [__webpack_require__("./src/app/Components/networks/network-profiles/network-profiles.component.scss")],
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__Services_Statistics_statistics_service__["a" /* StatisticsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_Statistics_statistics_service__["a" /* StatisticsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _c || Object])
    ], NetworkProfilesComponent);
    return NetworkProfilesComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=network-profiles.component.js.map

/***/ }),

/***/ "./src/app/Components/networks/network-projects/network-projects.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"wn-projects\" *ngIf=\"statistics\">\n\n\t<div class=\"wnp-needs flex\">\n\t\t<div class=\"wnpn-about bb pad-x-15\">\n\t\t\t<h2 class=\"freigl mar-b-15\">What they are about</h2>\n\t\t\t<div class=\"percentage flex\" *ngFor=\"let about of statistics.about; let i = index\" [style.width]=\"getWidth(i)\">\n\t\t\t\t<li class=\"freigs\">{{ about.category }}</li>\n\t\t\t\t<!-- <span class=\"freigs\">{{ getPercentage(about.count, 'projects') }}%</span> -->\n\t\t\t\t<span class=\"freigs\" >{{ fakeList[i] }}</span>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"wnpn-need bb pad-x-15\">\n\t\t\t<h2 class=\"freigl mar-b-15\">What they need</h2>\n\t\t\t<ul class=\"flex\">\n\t\t\t\t<li class=\"freigl\" *ngFor=\"let need of statistics.needs\">{{ need.tag }}</li>\n\t\t\t</ul>\n\t\t</div>\n\t</div>\n\n\t<div class=\"wnp-activities flex bb pad-x-15\">\n\t\t<div class=\"wnpa-recent\">\n\t\t\t<h2 class=\"freigl mar-b-15\">Recent activity</h2>\n\t\t\t<!-- <div class=\"activity flex\">\n\t\t\t\t<img class=\"mar-r-10\" src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1457648516/tgaugxgkwjzj0ik5bhcu.jpg\" alt=\"profile\" />\n\t\t\t\t<p class=\"freigl flex-grow pad-r-15\">Sarah Pearson upvoted <span class=\"freigs\">Nimslo</span> sdfsdfdsf sdfs df sdf</p>\n\t\t\t\t<span class=\"min freigm\">21 min ago</span>\n\t\t\t</div> -->\n\t\t</div>\n\n\t\t<div class=\"wnpa-upvoted bb pad-x-15\">\n\t\t\t<h2 class=\"freigl mar-b-15\">Most upvoted</h2>\n\t\t\t<!-- <div class=\"upvoted-projects flex\">\n\t\t\t\t<img class=\"mar-r-10\" src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1457648516/tgaugxgkwjzj0ik5bhcu.jpg\" alt=\"profile\" />\n\t\t\t\t<h4 class=\"freigs flex-grow\">Wittycircle</h4>\n\t\t\t\t<span class=\"freigm\">3039 <img src=\"/public/images/Upvote_Icon.svg\" alt=\"upvote\" /></span>\n\t\t\t</div> -->\n\t\t</div>\n\t</div>\n</section>\n"

/***/ }),

/***/ "./src/app/Components/networks/network-projects/network-projects.component.scss":
/***/ (function(module, exports) {

module.exports = ".wn-projects {\n  width: 800px;\n  margin: 0 auto;\n  padding: 15px; }\n  .wn-projects h2 {\n    font-size: 26px;\n    color: #2b2b2b; }\n  .wn-projects .wnp-needs {\n    -webkit-box-align: baseline;\n        -ms-flex-align: baseline;\n            align-items: baseline; }\n  .wn-projects .wnp-needs .wnpn-about {\n      width: 50%; }\n  .wn-projects .wnp-needs .wnpn-about .percentage {\n        margin-bottom: 10px;\n        padding: 4px 10px;\n        background-color: #222;\n        border-radius: 4px;\n        -webkit-box-sizing: border-box;\n                box-sizing: border-box; }\n  .wn-projects .wnp-needs .wnpn-about .percentage li {\n          font-size: 14px;\n          text-transform: uppercase; }\n  .wn-projects .wnp-needs .wnpn-about .percentage span {\n          margin-left: auto; }\n  .wn-projects .wnp-needs .wnpn-need {\n      width: 50%;\n      margin-left: 40px; }\n  .wn-projects .wnp-needs .wnpn-need ul {\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap; }\n  .wn-projects .wnp-needs .wnpn-need li {\n        font-size: 16px;\n        color: #2b2b2b;\n        padding: 3px 10px 4px 10px;\n        border: 1px solid #2b2b2b;\n        border-radius: 10px;\n        border-radius: 20px;\n        margin: 0 5px 6px 0; }\n  .wn-projects .wnp-activities {\n    -webkit-box-align: baseline;\n        -ms-flex-align: baseline;\n            align-items: baseline; }\n  .wn-projects .wnp-activities .wnpa-recent {\n      width: 50%; }\n  .wn-projects .wnp-activities .wnpa-recent .activity {\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center; }\n  .wn-projects .wnp-activities .wnpa-recent .activity img {\n          width: 32px;\n          border-radius: 4px; }\n  .wn-projects .wnp-activities .wnpa-recent .activity p, .wn-projects .wnp-activities .wnpa-recent .activity span {\n          color: #2b2b2b; }\n  .wn-projects .wnp-activities .wnpa-recent .activity .min {\n          -ms-flex-negative: 0;\n              flex-shrink: 0;\n          color: #ccc; }\n  .wn-projects .wnp-activities .wnpa-upvoted {\n      width: 50%;\n      margin-left: 40px;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n  .wn-projects .wnp-activities .wnpa-upvoted img {\n        width: 32px;\n        border-radius: 4px; }\n  .wn-projects .wnp-activities .wnpa-upvoted h4 {\n        color: #2b2b2b; }\n  .wn-projects .wnp-activities .wnpa-upvoted span {\n        -ms-flex-negative: 0;\n            flex-shrink: 0;\n        color: #ccc; }\n  .wn-projects .wnp-activities .wnpa-upvoted span img {\n          width: 8px;\n          vertical-align: middle;\n          border-radius: 0; }\n"

/***/ }),

/***/ "./src/app/Components/networks/network-projects/network-projects.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export fakePercentage */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NetworkProjectsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_Statistics_statistics_service__ = __webpack_require__("./src/app/Services/Statistics/statistics.service.ts");
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

var fakePercentage = {
    '42': ['55%', '22%', '18%', '5%'],
    'ESCP': ['40%', '32%', '21%', '7%'],
    'Dauphine': ['39%', '27%', '21%', '13%'],
    'The_Refiners': ['60%', '27%', '9%', '5%']
};
var NetworkProjectsComponent = /** @class */ (function () {
    function NetworkProjectsComponent(StatisticsService, Router, route) {
        this.StatisticsService = StatisticsService;
        this.Router = Router;
        this.route = route;
    }
    NetworkProjectsComponent.prototype.ngOnInit = function () {
        this.initParams();
    };
    NetworkProjectsComponent.prototype.initParams = function () {
        var _this = this;
        this.Router.parent.params.subscribe(function (params) {
            if (params && params['name']) {
                _this.getNetworkProjectsStatistics(params['name']);
            }
            else
                _this.route.navigate(['/']);
        });
    };
    NetworkProjectsComponent.prototype.getNetworkProjectsStatistics = function (network) {
        var _this = this;
        this.StatisticsService.getNetworksProjects(network).subscribe(function (res) {
            _this.statistics = res;
            console.log(_this.statistics);
            _this.fakeList = fakePercentage[network];
        });
    };
    NetworkProjectsComponent.prototype.getWidth = function (index) {
        if (!index)
            return '100%';
        else if (index === 1)
            return '90%';
        else if (index === 2)
            return '80%';
        else if (index === 3)
            return '65%';
    };
    NetworkProjectsComponent.prototype.getPercentage = function (number, type) {
        var percentage = 0;
        percentage = Math.round((number * 100) / this.statistics[type].length);
        return percentage;
    };
    NetworkProjectsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-network-projects',
            template: __webpack_require__("./src/app/Components/networks/network-projects/network-projects.component.html"),
            styles: [__webpack_require__("./src/app/Components/networks/network-projects/network-projects.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__Services_Statistics_statistics_service__["a" /* StatisticsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_Statistics_statistics_service__["a" /* StatisticsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _c || Object])
    ], NetworkProjectsComponent);
    return NetworkProjectsComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=network-projects.component.js.map

/***/ }),

/***/ "./src/app/Components/networks/networks.component.html":
/***/ (function(module, exports) {

module.exports = "<section id=\"w-networks\" >\n\t<div class=\"wn-head bg-default\" *ngIf=\"network\" [ngStyle]=\"{'background-image': 'url(' + network.cover_picture + ')'}\">\n\t\t<div class=\"filter\"></div>\n\n\t\t<div class=\"wnh-presentation align-center flex flex-justify\">\n\t\t\t<img class=\"mar-r-15\" [src]=\"network.logo\">\n\t\t\t<div class=\"wnhp-title\">\n\t\t\t\t<h1 class=\"freigs\">{{ replace(network.name) }}</h1>\n\t\t\t\t<div class=\"location flex\">\n\t\t\t\t\t<img class=\"mar-r-5\" src=\"/public/images/location-picto-w.svg\">\n\t\t\t\t\t<h3 class=\"freigb\">{{ network.city }}, {{ network.country }}</h3>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"wnh-nav flex flex-justify\" *ngIf=\"profiles && projects\">\n\t\t\t<a routerLink=\"/network/{{ networkName }}/profiles\" class=\"freigb\" [routerLinkActive]=\"['active']\">{{ fake_profiles }} users</a>\n\t\t\t<a routerLink=\"/network/{{ networkName }}/projects\" class=\"freigb\" [routerLinkActive]=\"['active']\">{{ projects.projects.length }} projects</a>\n\t\t</div>\n\t</div>\n\n\t<div class=\"wn-body\">\n\t \t<div class=\"background\">\n\t\t\t<div class=\"wnb-story\">\n\t\t\t\t<div class=\"wnbs-text\" [@slide]=\"slideState\" *ngIf=\"network && network\"> <!-- TODO: Network.story AOT -->\n\t\t\t\t\t<div class=\"filter-text\" [@slideFilter]=\"slideState\" *ngIf=\"showFilterText\"></div>\n\t\t\t\t\t<div class=\"wnbst-inner\" *ngIf=\"network\" class=\"innerHtml freigl\" [innerHtml]=\"network.story\"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"wnbs-arrow cursor-pt mar-b-10\" (click)=showText() *ngIf=\"network\">\n\t\t\t\t\t<img *ngIf=\"network.story\" class=\"transition-200\" [@rotate]=\"rotateState\" src=\"/public/images/arrow-down-icon-b.svg\" alt=\"arrow\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"wnbs-members flex flex-justify mar-b-10\" *ngIf=\"profiles\">\n\t\t\t\t\t<div *ngFor=\"let profile of profiles.slice(0, 16)\">\n\t\t\t\t\t\t<a *ngIf=\"profile.picture\" [routerLink]=\"['/', profile.username]\" class=\"wnbsm-profile\">\n\t\t\t\t\t\t\t<img [src]=\"profile.picture\" [alt]=\"profile.fullName\">\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"wnbs-more\">\n\t\t\t\t\t<a [routerLink]=\"['/meet']\"><h5 class=\"freigl\">See more users from {{ replace(networkName) }}</h5></a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<router-outlet></router-outlet>\n\t</div>\n</section>\n<app-footer></app-footer>\n"

/***/ }),

/***/ "./src/app/Components/networks/networks.component.scss":
/***/ (function(module, exports) {

module.exports = "#w-networks .wn-head {\n  position: relative;\n  height: 410px; }\n  #w-networks .wn-head .wnh-presentation {\n    width: 600px;\n    margin: 0 auto;\n    left: 0;\n    right: 0; }\n  #w-networks .wn-head .wnh-presentation h1 {\n      font-size: 28px; }\n  #w-networks .wn-head .wnh-presentation img {\n      width: 70px;\n      border-radius: 4px; }\n  #w-networks .wn-head .wnh-presentation .wnhp-title .location img {\n      width: 10px; }\n  #w-networks .wn-head .wnh-presentation .wnhp-title .location h3 {\n      font-size: 18px;\n      color: #ccc; }\n  #w-networks .wn-head .wnh-nav {\n    position: absolute;\n    width: 600px;\n    margin: 0 auto;\n    bottom: 0;\n    left: 0;\n    right: 0; }\n  #w-networks .wn-head .wnh-nav a {\n      color: #999999;\n      font-size: 21px;\n      padding: 20px; }\n  #w-networks .wn-head .wnh-nav .active {\n      color: #fff; }\n  #w-networks .wn-body {\n  padding-bottom: 80px; }\n  #w-networks .wn-body h2 {\n    font-size: 26px;\n    color: #2b2b2b; }\n  #w-networks .wn-body .background {\n    background-color: #fafafa;\n    padding: 15px; }\n  #w-networks .wn-body .wnb-story {\n    width: 800px;\n    margin: 0 auto;\n    text-align: center;\n    margin-bottom: 40px; }\n  #w-networks .wn-body .wnb-story .wnbs-text {\n      text-align: left;\n      max-height: 105px;\n      overflow: hidden;\n      margin-bottom: 20px;\n      color: #222; }\n  #w-networks .wn-body .wnb-story .wnbs-text .filter-text {\n        position: absolute;\n        width: 800px;\n        height: 105px;\n        /* For Safari 5.1 to 6.0 */\n        /* For Opera 11.1 to 12.0 */\n        /* For Firefox 3.6 to 15 */\n        background: -webkit-gradient(linear, left top, left bottom, from(rgba(250, 250, 250, 0.2)), to(rgba(250, 250, 250, 0.9)));\n        background: linear-gradient(rgba(250, 250, 250, 0.2), rgba(250, 250, 250, 0.9));\n        /* Standard syntax (must be last) */ }\n  #w-networks .wn-body .wnb-story .wnbs-text .innerHtml {\n        font-size: 18px; }\n  #w-networks .wn-body .wnb-story .wnbs-text .wnbst-inner {\n        text-align: left; }\n  #w-networks .wn-body .wnb-story .wnbs-arrow {\n      text-align: center; }\n  #w-networks .wn-body .wnb-story .wnbs-members a {\n      padding: 10px 3px; }\n  #w-networks .wn-body .wnb-story .wnbs-members img {\n      width: 32px;\n      border-radius: 50%; }\n  #w-networks .wn-body .wnb-story .wnbs-more h5 {\n      display: inline-block;\n      border-bottom: 1px solid #999;\n      color: #626363; }\n  #w-networks .wn-body .wnb-about {\n    margin-bottom: 40px;\n    -webkit-box-align: baseline;\n        -ms-flex-align: baseline;\n            align-items: baseline; }\n  #w-networks .wn-body .wnb-about .wnba-skills {\n      width: 50%;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box; }\n  #w-networks .wn-body .wnb-about .wnba-location {\n      width: 50%;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      margin-left: 40px; }\n  #w-networks .wn-body .wnb-about .wnba-skills .percentage {\n      margin-bottom: 10px;\n      padding: 4px 10px;\n      background-color: #222;\n      border-radius: 4px;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box; }\n  #w-networks .wn-body .wnb-about .wnba-skills .percentage li {\n        font-size: 14px;\n        text-transform: uppercase; }\n  #w-networks .wn-body .wnb-about .wnba-skills .percentage span {\n        margin-left: auto; }\n  #w-networks .wn-body .wnb-about .wnba-location li, #w-networks .wn-body .wnb-about .wnba-location span {\n      color: #2b2b2b; }\n  #w-networks .wn-body .wnb-about .wnba-location .countries {\n      margin-bottom: 5px;\n      width: 150px; }\n  #w-networks .wn-body .wnb-about .wnba-location .countries span {\n        margin-left: auto; }\n  #w-networks .wn-body .wnb-activities {\n    -webkit-box-align: baseline;\n        -ms-flex-align: baseline;\n            align-items: baseline; }\n  #w-networks .wn-body .wnb-activities .wnba-recent {\n      width: 50%; }\n  #w-networks .wn-body .wnb-activities .wnba-recent .activity {\n        -webkit-box-align: start;\n            -ms-flex-align: start;\n                align-items: flex-start; }\n  #w-networks .wn-body .wnb-activities .wnba-recent .activity img {\n          width: 32px;\n          border-radius: 50%; }\n  #w-networks .wn-body .wnb-activities .wnba-recent .activity p, #w-networks .wn-body .wnb-activities .wnba-recent .activity span {\n          color: #2b2b2b; }\n  #w-networks .wn-body .wnb-activities .wnba-recent .activity .min {\n          -ms-flex-negative: 0;\n              flex-shrink: 0;\n          color: #ccc; }\n  #w-networks .wn-body .wnb-activities .wnba-like {\n      width: 50%;\n      margin-left: 40px; }\n  #w-networks .wn-body .wnb-activities .wnba-like .percentage {\n        margin-bottom: 10px;\n        padding: 4px 10px;\n        background-color: #222;\n        border-radius: 4px;\n        -webkit-box-sizing: border-box;\n                box-sizing: border-box; }\n  #w-networks .wn-body .wnb-activities .wnba-like .percentage li {\n          font-size: 14px;\n          text-transform: uppercase; }\n  #w-networks .wn-body .wnb-activities .wnba-like .percentage span {\n          margin-left: auto; }\n"

/***/ }),

/***/ "./src/app/Components/networks/networks.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NetworksComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_Statistics_statistics_service__ = __webpack_require__("./src/app/Services/Statistics/statistics.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Interfaces_Constants_fake_constant__ = __webpack_require__("./src/app/Interfaces/Constants/fake.constant.ts");
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

var NetworksComponent = /** @class */ (function () {
    function NetworksComponent(StatisticsService, Router, route) {
        this.StatisticsService = StatisticsService;
        this.Router = Router;
        this.route = route;
        this.showFilterText = true;
        this.slideState = 'inactive';
        this.rotateState = 'down';
        this.initParams();
    }
    NetworksComponent.prototype.ngOnInit = function () { };
    NetworksComponent.prototype.initFake = function (name) {
        if (name === '42') {
            this.fake_profiles = __WEBPACK_IMPORTED_MODULE_3__Interfaces_Constants_fake_constant__["a" /* fake42 */][0].users;
        }
        else if (name === 'ESCP') {
            this.fake_profiles = __WEBPACK_IMPORTED_MODULE_3__Interfaces_Constants_fake_constant__["c" /* fakeESCP */][0].users;
        }
        else if (name === 'Dauphine') {
            this.fake_profiles = __WEBPACK_IMPORTED_MODULE_3__Interfaces_Constants_fake_constant__["b" /* fakeDauphine */][0].users;
        }
        else {
            this.fake_profiles = 2;
        }
    };
    NetworksComponent.prototype.initServices = function () {
        this.getNetworkGroup();
        this.getNetworkProfilesStatistics();
        this.getNetworkProjectsStatistics();
    };
    NetworksComponent.prototype.initParams = function () {
        var _this = this;
        this.Router.params.subscribe(function (params) {
            if (params && params['name']) {
                _this.networkName = params['name'];
                _this.initFake(params['name']);
                _this.initServices();
            }
            else
                _this.route.navigate(['/']);
        });
    };
    NetworksComponent.prototype.getNetworkGroup = function () {
        var _this = this;
        this.StatisticsService.getNetworkGroup(this.networkName).subscribe(function (res) {
            if (res.project)
                _this.network = res.project[0].network_data[0];
        });
    };
    NetworksComponent.prototype.getNetworkProfilesStatistics = function () {
        var _this = this;
        this.StatisticsService.getNetworksProfiles(this.networkName).subscribe(function (res) {
            _this.profiles = res.profiles;
        });
    };
    NetworksComponent.prototype.getNetworkProjectsStatistics = function () {
        var _this = this;
        this.StatisticsService.getNetworksProjects(this.networkName).subscribe(function (res) {
            _this.projects = res;
        });
    };
    NetworksComponent.prototype.showText = function () {
        var _this = this;
        this.slideState = this.slideState === 'inactive' ? 'active' : 'inactive';
        this.rotateState = this.rotateState === 'down' ? 'up' : 'down';
        if (this.showFilterText) {
            this.showFilterText = false;
        }
        else {
            setTimeout(function () {
                _this.showFilterText = true;
            }, 800);
        }
    };
    NetworksComponent.prototype.replace = function (name) {
        return name.replace('_', ' ');
    };
    NetworksComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-networks',
            template: __webpack_require__("./src/app/Components/networks/networks.component.html"),
            styles: [__webpack_require__("./src/app/Components/networks/networks.component.scss")],
            // host: {
            // 	'[@slide]'	: "inactive",
            // 	'[@rotate]'	: "down"
            // },
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('slide', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('inactive', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        maxHeight: '105px', overflow: 'hidden'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('active', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        maxHeight: '10000px', overflow: 'auto'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('inactive => active', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('800ms ease-in')),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('active => inactive', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('800ms ease-out'))
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('slideFilter', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('inactive', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        maxHeight: '105px', overflow: 'hidden'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('active', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        maxHeight: '10000px', overflow: 'auto'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('inactive => active', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('800ms ease-in')),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('active => inactive', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('800ms ease-out'))
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('rotate', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('down', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        transform: 'rotate(0)'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('up', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        transform: 'rotate(180deg)'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('inactive => active', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])(200)),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('active => inactive', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])(200))
                ])
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_2__Services_Statistics_statistics_service__["a" /* StatisticsService */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__Services_Statistics_statistics_service__["a" /* StatisticsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_Statistics_statistics_service__["a" /* StatisticsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _c || Object])
    ], NetworksComponent);
    return NetworksComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=networks.component.js.map

/***/ }),

/***/ "./src/app/Components/networks/networks.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworksModule", function() { return NetworksModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__footer_footer_module__ = __webpack_require__("./src/app/Components/footer/footer.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__networks_component__ = __webpack_require__("./src/app/Components/networks/networks.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__network_projects_network_projects_component__ = __webpack_require__("./src/app/Components/networks/network-projects/network-projects.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__network_profiles_network_profiles_component__ = __webpack_require__("./src/app/Components/networks/network-profiles/network-profiles.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular2_moment__ = __webpack_require__("./node_modules/angular2-moment/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Routes_networks_routes__ = __webpack_require__("./src/app/Routes/networks.routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




/* Components */



/* Librairies */

/* Route */

var NetworksModule = /** @class */ (function () {
    function NetworksModule() {
    }
    NetworksModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_8__Routes_networks_routes__["a" /* NETWORK_ROUTES */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["f" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_7_angular2_moment__["MomentModule"],
                __WEBPACK_IMPORTED_MODULE_3__footer_footer_module__["a" /* FooterModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__networks_component__["a" /* NetworksComponent */],
                __WEBPACK_IMPORTED_MODULE_5__network_projects_network_projects_component__["a" /* NetworkProjectsComponent */],
                __WEBPACK_IMPORTED_MODULE_6__network_profiles_network_profiles_component__["a" /* NetworkProfilesComponent */]
            ]
        })
    ], NetworksModule);
    return NetworksModule;
}());

//# sourceMappingURL=networks.module.js.map

/***/ }),

/***/ "./src/app/Interfaces/Constants/fake.constant.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fake42; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return fakeESCP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return fakeDauphine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return fakeRefiners; });
var fake42 = [
    {
        users: 1558,
        projects: 2,
        skills: [
            {
                name: 'Programming',
                percentage: 64
            },
            {
                name: 'Github',
                percentage: 40
            },
            {
                name: 'Javascript',
                percentage: 38
            },
            {
                name: 'HTML',
                percentage: 29
            }
        ],
        interests: [
            {
                name: 'Technology',
                percentage: 57
            },
            {
                name: 'Science',
                percentage: 43
            },
            {
                name: 'Games',
                percentage: 35
            },
            {
                name: 'Music',
                percentage: 25
            },
        ],
        activities: [
            {
                id: 2269,
                message: 'upvote',
                who: 'Nimslo',
                url: '/project/49996/Nimslo',
                timestamp: '2 mins ago',
            },
            {
                id: 4044,
                message: 'followed',
                who: 'Sebastian Steinhauser',
                url: '/Sebastian.Steinhauser',
                timestamp: 'an hour ago',
            },
            {
                id: 4055,
                message: 'upvote',
                who: 'Refer Me Please',
                url: '/project/78445/Refer-Me-Please',
                timestamp: '2 days ago',
            },
            {
                id: 4118,
                message: 'upvote',
                who: 'Dude Challenge',
                url: '/project/39417/Dude-Challenge',
                timestamp: 'a week ago',
            },
            {
                id: 4148,
                message: 'followed',
                who: 'Antoine Marc',
                url: '/Antoine.Marc',
                timestamp: '2 months ago',
            },
        ],
        locations: [
            {
                name: 'Europe',
                percentage: 79,
                countries: [
                    { name: 'France', number: 1149 },
                    { name: 'Romania', number: 88 },
                ]
            },
            {
                name: 'North America',
                percentage: 21,
                countries: [
                    { name: 'United States', number: 321 },
                ]
            },
        ]
    },
];
var fakeESCP = [
    {
        users: 1212,
        projects: 2,
        skills: [
            {
                name: 'Entrepreneurship',
                percentage: 34
            },
            {
                name: 'Communication',
                percentage: 27
            },
            {
                name: 'Analytics',
                percentage: 26
            },
            {
                name: 'Business Development',
                percentage: 20
            }
        ],
        interests: [
            {
                name: 'Technology',
                percentage: 43
            },
            {
                name: 'Film & Video',
                percentage: 26
            },
            {
                name: 'Art',
                percentage: 15
            },
            {
                name: 'Sport',
                percentage: 15
            },
        ],
        activities: [
            {
                id: 4246,
                message: 'upvoted',
                who: 'Tenta Browser',
                url: '/project/56884/Tenta-Browser',
                timestamp: '6 mins ago',
            },
            {
                id: 4379,
                message: 'upvoted',
                who: 'ADOK',
                url: '/project/42593/ADOK',
                timestamp: '15 mins ago',
            },
            {
                id: 5084,
                message: 'upvoted',
                who: 'Prodontis',
                url: '/project/82424/Prodontis',
                timestamp: 'a day ago',
            },
            {
                id: 4278,
                message: 'followed',
                who: 'Carlos Diaz',
                url: '/Carlos.Diaz',
                timestamp: 'a day ago',
            },
            {
                id: 4795,
                message: 'followed',
                who: 'Sarah Nichols',
                url: '/Sarah',
                timestamp: '2 days ago',
            },
        ],
        locations: [
            {
                name: 'Europe',
                percentage: 65,
                countries: [
                    { name: 'France', number: 655 },
                    { name: 'Germany', number: 86 },
                    { name: 'United Kingdom', number: 32 },
                    { name: 'Spain', number: 23 },
                ]
            },
            {
                name: 'North America',
                percentage: 27,
                countries: [
                    { name: 'United States', number: 249 },
                    { name: 'Canada', number: 76 },
                ]
            },
            {
                name: 'Asia',
                percentage: 8,
                countries: [
                    { name: 'China', number: 56 },
                    { name: 'Singapore', number: 31 },
                    { name: 'South Korea', number: 4 },
                ]
            },
        ]
    },
];
var fakeDauphine = [
    {
        users: 1611,
        projects: 2,
        skills: [
            {
                name: 'Entrepreneurship',
                percentage: 27
            },
            {
                name: 'Communication',
                percentage: 19
            },
            {
                name: 'Analytics',
                percentage: 19
            },
            {
                name: 'Adobe Photoshop',
                percentage: 17
            }
        ],
        interests: [
            {
                name: 'Design',
                percentage: 41
            },
            {
                name: 'Technology',
                percentage: 20
            },
            {
                name: 'Food',
                percentage: 20
            },
            {
                name: 'Publishing',
                percentage: 19
            },
        ],
        activities: [
            {
                id: 5134,
                message: 'upvoted',
                who: 'Shelter',
                url: '/project/61750/Shelter',
                timestamp: '11 mins ago',
            },
            {
                id: 5134,
                message: 'followed',
                who: 'Emeline Barat',
                url: '/Emeline.Barat',
                timestamp: '34 mins ago',
            },
            {
                id: 5167,
                message: 'upvoted',
                who: 'Flying Tent',
                url: '/project/13067/Flying-Tent',
                timestamp: 'an hour ago',
            },
            {
                id: 5173,
                message: 'followed',
                who: 'Kim Rivera',
                url: '/Kim.Rivera',
                timestamp: '6 hours ago',
            },
            {
                id: 5199,
                message: 'upvoted',
                who: 'Dude Challenge',
                url: '/project/39417/Dude-Challenge',
                timestamp: 'a day ago',
            },
        ],
        locations: [
            {
                name: 'Europe',
                percentage: 71,
                countries: [
                    { name: 'France', number: 899 },
                    { name: 'United Kingdom', number: 245 },
                    { name: 'Norway', number: 1 },
                ]
            },
            {
                name: 'North America',
                percentage: 27,
                countries: [
                    { name: 'United States', number: 377 },
                    { name: 'Canada', number: 62 },
                ]
            },
            {
                name: 'Asia',
                percentage: 2,
                countries: [
                    { name: 'China', number: 26 },
                    { name: 'Japon', number: 1 },
                ]
            },
        ]
    },
];
var fakeRefiners = [
    {
        users: 2,
        projects: 2,
        skills: [
            {
                name: 'Entrepreneurship',
                percentage: 100
            },
            {
                name: 'Venture Capital',
                percentage: 100
            },
            {
                name: 'Communication',
                percentage: 100
            },
            {
                name: 'Business Development',
                percentage: 50
            }
        ],
        interests: [
            {
                name: 'Technology',
                percentage: 100
            },
            {
                name: 'Science',
                percentage: 100
            },
            {
                name: 'Music',
                percentage: 50
            },
            {
                name: 'Food',
                percentage: 50
            },
        ],
        activities: [],
        locations: [
            // {
            // 	name 		: 'Europe',
            // 	percentage 	: 71,
            // 	countries 	: [
            // 		{ name: 'France', number: 899 },
            // 		{ name: 'United Kingdom', number: 245 },
            // 		{ name: 'Norway', number: 1 },
            // 	]
            // },
            {
                name: 'North America',
                percentage: 100,
                countries: [
                    { name: 'United States', number: 2 },
                ]
            },
        ]
    },
];
//# sourceMappingURL=fake.constant.js.map

/***/ }),

/***/ "./src/app/Routes/networks.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NETWORK_ROUTES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Components_networks_networks_component__ = __webpack_require__("./src/app/Components/networks/networks.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Components_networks_network_projects_network_projects_component__ = __webpack_require__("./src/app/Components/networks/network-projects/network-projects.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Components_networks_network_profiles_network_profiles_component__ = __webpack_require__("./src/app/Components/networks/network-profiles/network-profiles.component.ts");

/* Components */



/* Route */
var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__Components_networks_networks_component__["a" /* NetworksComponent */],
        children: [
            { path: '', redirectTo: 'profiles', pathMatch: 'full' },
            { path: 'profiles', component: __WEBPACK_IMPORTED_MODULE_3__Components_networks_network_profiles_network_profiles_component__["a" /* NetworkProfilesComponent */] },
            { path: 'projects', component: __WEBPACK_IMPORTED_MODULE_2__Components_networks_network_projects_network_projects_component__["a" /* NetworkProjectsComponent */] }
        ]
    },
];
var NETWORK_ROUTES = __WEBPACK_IMPORTED_MODULE_0__angular_router__["f" /* RouterModule */].forChild(routes);
//# sourceMappingURL=networks.routes.js.map

/***/ })

});
//# sourceMappingURL=networks.module.chunk.js.map