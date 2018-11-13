webpackJsonp(["profiles.module"],{

/***/ "./src/app/Components/profiles/profile-info/profile-info.component.html":
/***/ (function(module, exports) {

module.exports = "<section id=\"w-profile-info\" class=\"flex\" [ngClass]=\"{'w-profile-hover': my_id}\">\n\t<section class=\"wpi-left flex-grow bb\">\n\t\t<div class=\"wpil-skills cursor-pt\" (click)=showSkillModal()>\n\t\t\t<h1 class=\"freigl mar-b-10\">Skills<span class=\"transition-200 picto-edit\"><img src=\"/public/images/picto-edit-b.svg\"></span></h1>\n\t\t\t<ul class=\"flex flex-wrap\">\n\t\t\t\t<li *ngFor=\"let skill of skills\">{{ skill }}</li>\n\t\t\t</ul>\n\t\t</div>\n\n\t\t<div class=\"wpil-interests cursor-pt\" (click)=\"showInterestModal()\">\n\t\t\t<h1 class=\"freigl mar-b-10\">Interests<span class=\"transition-200 picto-edit\"><img src=\"/public/images/picto-edit-b.svg\"></span></h1>\n\t\t\t<ul class=\"flex flex-wrap\">\n\t\t\t\t<li *ngFor=\"let interest of interests\">{{ interest }}</li>\n\t\t\t</ul>\n\t\t</div>\n\t</section>\n\n\t<section class=\"wpi-center flex-grow bb\">\n\t\t<div class=\"wpic-about mar-b-15 cursor-pt\" (click)=\"showAboutModal()\">\n\t\t\t<h1 class=\"freigl mar-b-10\">About <span class=\"transition-200 picto-edit\"><img src=\"/public/images/picto-edit-b.svg\"></span></h1>\n\t\t\t<div>\n\t\t\t\t<p *ngIf=\"description\" class=\"freigl innerHtml\" [innerHtml]=\"description\"></p>\n<!-- \t\t\t\t<p class=\"\">No story to show yet</p>\n -->\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"wpic-experiences\">\n\t\t\t<h1 class=\"freigl mar-b-5 cursor-pt\" (click)=\"showExperienceModal(-1)\">Experiences <span class=\"transition-200 picto-edit\"><i class=\"fa fa-plus\"></i></span></h1>\n\n\t\t\t<div class=\"wpice-experience profiles-experience pad-y-10\" *ngFor=\"let experience of experiences; let i = index\">\n\t\t\t\t<div class=\"wpice-experience-1 pe-titles flex\">\n\t\t\t\t\t<h3 class=\"pet-title freigs\">{{ experience.title }}</h3>\n\t\t\t\t\t<h4 class=\"pet-company freigb\">{{ experience.company }}</h4>\n\t\t\t\t\t<div class=\"pet-options flex\">\n\t\t\t\t\t\t<img (click)=\"showExperienceModal(i)\" class=\"mar-r-5\" src=\"/public/images/picto-edit-b.svg\">\n\t\t\t\t\t\t<i class=\"fa fa-trash\" (click)=\"removeUserExperience(experience.id, i)\"></i>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"wpice-experience-2 pe-periode\">\n\t\t\t\t\t<span class=\"freigb mar-r-10\" *ngIf=\"experience.date_to === 'Present'\"><i class=\"fa fa-calendar\"></i> {{ experience.date_from | amDateFormat: 'MMMM YYYY' }} - {{ experience.date_to }}</span>\n\t\t\t\t\t<span class=\"freigb mar-r-10\" *ngIf=\"experience.date_to !== 'Present'\"><i class=\"fa fa-calendar\"></i> {{ experience.date_from | amDateFormat: 'MMMM YYYY' }} - {{ experience.date_to | amDateFormat: 'MMMM YYYY'}}</span>\n\t\t\t\t\t<span class=\"freigb mar-r-10\"><img src=\"/public/images/location-picto.svg\" alt=\"location\"> {{ experience.city }}, {{ experience.country }}</span>\n\t\t\t\t\t<!-- <span class=\"freigb mar-r-10\" *ngIf=\"!experience.location_state\"><img src=\"/public/images/location-picto.svg\" alt=\"location\"> {{ experience.location_city }}, {{ experience.location_country }}</span> -->\n\t\t\t\t</div>\n\t\t\t\t<div class=\"wpice-experience-3 pe-description\">\n\t\t\t\t\t<p class=\"freigb\" [innerHtml]=\"experience.description | sanitizeHtml\"></p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</section>\n\n\t<section class=\"wpi-right flex-grow bb\" *ngIf=\"!mobile\">\n\t\t<div class=\"wpir-similar\">\n\t\t\t<h2 class=\"freigl flex mar-b-10\">Similar profiles</h2>\n\t\t\t<a [routerLink]=\"['', similarProfile.username]\" *ngFor=\"let similarProfile of similarProfiles\">\n\t\t\t\t<div class=\"wpirs-profile flex mar-b-10\">\n\t\t\t\t\t<img class=\"wpirsp-img mar-r-10\" [src]=\"similarProfile.picture\">\n\t\t\t\t\t<div class=\"wpirsp-info\">\n\t\t\t\t\t\t<h2 class=\"freigl\">{{ similarProfile.fullName }}</h2>\n\t\t\t\t\t\t<span class=\"freigm mar-r-5\" *ngIf=\"!similarProfile.state\">{{ similarProfile.city }}, {{ similarProfile.country }}</span>\n\t\t\t\t\t\t<span class=\"freigm mar-r-5\" *ngIf=\"similarProfile.state\">{{ similarProfile.city }}, {{ similarProfile.state }}</span>\n\t\t\t\t\t\t<span class=\"freigm\">#{{ similarProfile.rank }}</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</a>\n\t\t</div>\n\t</section>\n</section>\n"

/***/ }),

/***/ "./src/app/Components/profiles/profile-info/profile-info.component.scss":
/***/ (function(module, exports) {

module.exports = ".w-profile-hover {\n  cursor: pointer; }\n  .w-profile-hover .wpil-skills:hover {\n    background-color: #fafafa; }\n  .w-profile-hover .wpil-skills:hover .picto-edit {\n      display: block !important; }\n  .w-profile-hover .wpil-interests:hover {\n    background-color: #fafafa; }\n  .w-profile-hover .wpil-interests:hover .picto-edit {\n      display: block !important; }\n  .w-profile-hover .wpic-about:hover {\n    background-color: #fafafa; }\n  .w-profile-hover .wpic-about:hover .picto-edit {\n      display: block !important; }\n  .w-profile-hover .wpic-experiences h1:hover {\n    background-color: #fafafa; }\n  .w-profile-hover .wpic-experiences h1:hover .picto-edit {\n      display: block !important; }\n  .w-profile-hover .wpice-experience:hover {\n    background-color: #fafafa; }\n  .w-profile-hover .wpice-experience:hover .wpice-experience-1 .pet-options {\n      display: -webkit-box !important;\n      display: -ms-flexbox !important;\n      display: flex !important; }\n  .w-profile-hover .profiles-experience:hover {\n    background-color: #fafafa; }\n  #w-profile-info {\n  width: 1000px;\n  margin: 0 auto;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  padding: 40px 0;\n  position: relative;\n  z-index: 101;\n  background-color: #fff; }\n  #w-profile-info .picto-edit {\n    display: none;\n    float: right; }\n  #w-profile-info h1 {\n    font-size: 26px;\n    color: #2b2b2b; }\n  #w-profile-info h2 {\n    font-size: 19px;\n    color: #7c7c7c; }\n  #w-profile-info li {\n    font-family: FreigSem;\n    font-size: 13px;\n    text-transform: uppercase;\n    padding: 2px 4px;\n    border-radius: 4px;\n    margin-bottom: 5px;\n    margin-right: 4px; }\n  #w-profile-info .wpic-about, #w-profile-info .wpil-skills {\n    margin-bottom: 25px; }\n  #w-profile-info .wpi-left, #w-profile-info .wpi-center, #w-profile-info .wpi-right {\n    padding: 0 10px; }\n  #w-profile-info .wpi-left {\n    width: 30%; }\n  #w-profile-info .wpi-left .wpil-skills {\n      padding: 10px 10px 10px 20px;\n      border-radius: 4px; }\n  #w-profile-info .wpi-left .wpil-skills li {\n        color: #fff;\n        cursor: pointer;\n        background-color: #222; }\n  #w-profile-info .wpi-left .wpil-interests {\n      padding: 10px 10px 10px 20px;\n      border-radius: 4px; }\n  #w-profile-info .wpi-left .wpil-interests li {\n        background-color: #999;\n        color: #fff; }\n  #w-profile-info .wpi-center {\n    width: 50%; }\n  #w-profile-info .wpi-center .wpic-about {\n      padding: 12px 20px;\n      border-radius: 4px; }\n  #w-profile-info .wpi-center .wpic-about p {\n        color: #2b2b2b; }\n  #w-profile-info .wpi-center .wpic-experiences {\n      /*\t\t\tborder-bottom: 1px solid #e5e5e5;\n*/ }\n  #w-profile-info .wpi-center .wpic-experiences h1 {\n        padding: 10px 20px;\n        border-radius: 4px; }\n  #w-profile-info .wpi-center .wpic-experiences h1 .fa-plus {\n          font-size: 14px;\n          color: #999999; }\n  #w-profile-info .wpi-center .wpic-experiences .profiles-experience {\n        padding: 10px 20px;\n        border-radius: 4px; }\n  #w-profile-info .wpi-center .wpic-experiences .profiles-experience .pe-titles {\n          -ms-flex-wrap: wrap;\n              flex-wrap: wrap; }\n  #w-profile-info .wpi-center .wpic-experiences .profiles-experience .pe-titles h3, #w-profile-info .wpi-center .wpic-experiences .profiles-experience .pe-titles h4 {\n            color: #222;\n            font-size: 18px; }\n  #w-profile-info .wpi-center .wpic-experiences .profiles-experience .pe-titles h3 {\n            color: #2b2b2b;\n            padding-right: 10px;\n            border-right: 1px solid #222;\n            margin-right: 10px; }\n  #w-profile-info .wpi-center .wpic-experiences .profiles-experience .pe-titles .pet-options {\n            display: none;\n            margin-left: auto;\n            -webkit-box-align: initial;\n                -ms-flex-align: initial;\n                    align-items: initial; }\n  #w-profile-info .wpi-center .wpic-experiences .profiles-experience .pe-titles .pet-options img {\n              width: 16px; }\n  #w-profile-info .wpi-center .wpic-experiences .profiles-experience .pe-titles .pet-options .fa-trash {\n              color: #999999;\n              font-size: 16px; }\n  #w-profile-info .wpi-center .wpic-experiences .profiles-experience .pe-periode span {\n          font-size: 14px;\n          color: #999; }\n  #w-profile-info .wpi-center .wpic-experiences .profiles-experience .pe-periode img {\n          position: relative;\n          top: 2px;\n          width: 11px; }\n  #w-profile-info .wpi-center .wpic-experiences .profiles-experience .pe-description p {\n          color: #222; }\n  #w-profile-info .wpi-right {\n    width: 20%;\n    padding: 15px 10px; }\n  #w-profile-info .wpi-right .wpir-similar .wpirs-profile img {\n      width: 35px;\n      border-radius: 50%; }\n  #w-profile-info .wpi-right .wpir-similar .wpirs-profile .wpirsp-info h2 {\n      color: #2b2b2b;\n      font-size: 16px; }\n  #w-profile-info .wpi-right .wpir-similar .wpirs-profile .wpirsp-info span {\n      position: relative;\n      bottom: 2px;\n      font-size: 12px;\n      color: #ccc; }\n  /******************** MOBILE ****************************/\n  @media only screen and (max-width: 736px) {\n  #w-profile-info {\n    width: auto;\n    -ms-flex-wrap: wrap-reverse;\n        flex-wrap: wrap-reverse;\n    padding: 25px 0; }\n    #w-profile-info .wpi-left, #w-profile-info .wpi-center {\n      width: auto;\n      padding-left: 0;\n      padding-right: 0;\n      margin-bottom: 15px; } }\n"

/***/ }),

/***/ "./src/app/Components/profiles/profile-info/profile-info.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileInfoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__("./node_modules/ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_modals_profile_skill_profile_skill_component__ = __webpack_require__("./src/app/Components/profiles/profile-modals/profile-skill/profile-skill.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_modals_profile_interest_profile_interest_component__ = __webpack_require__("./src/app/Components/profiles/profile-modals/profile-interest/profile-interest.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profile_modals_profile_about_profile_about_component__ = __webpack_require__("./src/app/Components/profiles/profile-modals/profile-about/profile-about.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modals_experience_modal_experience_modal_component__ = __webpack_require__("./src/app/Components/modals/experience-modal/experience-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Services_Skills_skills_service__ = __webpack_require__("./src/app/Services/Skills/skills.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Services_Interests_interests_service__ = __webpack_require__("./src/app/Services/Interests/interests.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Services_Experiences_experiences_service__ = __webpack_require__("./src/app/Services/Experiences/experiences.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Services_Profiles_profiles_service__ = __webpack_require__("./src/app/Services/Profiles/profiles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Interfaces_Constants_search_profile_constant__ = __webpack_require__("./src/app/Interfaces/Constants/search-profile.constant.ts");
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





var ProfileInfoComponent = /** @class */ (function () {
    function ProfileInfoComponent(SkillsService, InterestsService, ExperiencesService, dialogService, ProfilesService) {
        this.SkillsService = SkillsService;
        this.InterestsService = InterestsService;
        this.ExperiencesService = ExperiencesService;
        this.dialogService = dialogService;
        this.ProfilesService = ProfilesService;
        this.searchBody = __WEBPACK_IMPORTED_MODULE_10__Interfaces_Constants_search_profile_constant__["c" /* searchProfile3 */];
    }
    ProfileInfoComponent.prototype.ngOnInit = function () {
        this.initServices();
    };
    ProfileInfoComponent.prototype.ngOnChanges = function (changes) {
        this.initServices();
    };
    ProfileInfoComponent.prototype.initServices = function () {
        this.getUserSkills();
        this.getUserInterests();
        this.getUserExperiences();
        this.searchSimilarProfiles();
    };
    ProfileInfoComponent.prototype.getUserSkills = function () {
        this.skills = this.about['skills'].split(',');
    };
    ProfileInfoComponent.prototype.getUserInterests = function () {
        var _this = this;
        this.InterestsService.getUserInterests(this.uid).subscribe(function (res) {
            _this.interests = res.interests;
        });
    };
    ProfileInfoComponent.prototype.getUserExperiences = function () {
        var _this = this;
        this.ExperiencesService.getUserExperiences(this.uid).subscribe(function (res) {
            _this.experiences = res.experiences;
        });
    };
    ProfileInfoComponent.prototype.removeUserExperience = function (id, index) {
        var _this = this;
        if (this.my_id) {
            this.ExperiencesService.deleteExperience(this.uid, { id: id })
                .subscribe(function (res) {
                if (res.success)
                    _this.experiences.splice(index, 1);
            });
        }
    };
    ProfileInfoComponent.prototype.searchSimilarProfiles = function () {
        var _this = this;
        this.searchBody.query.members[0].value = this.skills.slice(0, 3);
        this.searchBody.query.members[1].value = this.about['about'];
        if (this.about['city']) {
            var location = this.about['city'] + ', ' + (this.about['state'] || ' ') + ', ' + this.about['country'];
            this.searchBody.query.members[2].value = location;
        }
        if (this.about['name'])
            this.searchBody.query.members[3].value = this.about['name'];
        this.searchBody.paginate.limit = 5;
        this.searchBody.query.priority = 'skills';
        this.ProfilesService.searchProfiles(this.searchBody).subscribe(function (res) {
            _this.similarProfiles = res.profiles;
        });
    };
    /* SHOW MODAL */
    ProfileInfoComponent.prototype.showSkillModal = function () {
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_2__profile_modals_profile_skill_profile_skill_component__["a" /* ProfileSkillComponent */], {
            user_id: this.about['uid']
        }).subscribe(function (skills) {
            console.log(skills);
        });
    };
    ProfileInfoComponent.prototype.showInterestModal = function () {
        if (this.my_id) {
            var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_3__profile_modals_profile_interest_profile_interest_component__["a" /* ProfileInterestComponent */], {
                user_interests: this.interests
            });
        }
    };
    ProfileInfoComponent.prototype.showAboutModal = function () {
        var _this = this;
        if (this.my_id) {
            var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_4__profile_modals_profile_about_profile_about_component__["a" /* ProfileAboutComponent */], {
                profile_id: this.id,
                profile_about: this.description,
                profile_status: this.about['about']
            }).subscribe(function (about) {
                if (about) {
                    _this.about['about'] = about['status'];
                    _this.description = about['description'];
                }
            });
        }
    };
    ProfileInfoComponent.prototype.showExperienceModal = function (index) {
        var _this = this;
        if (this.my_id) {
            var object = index < 0 ? {} : this.experiences[index];
            var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_5__modals_experience_modal_experience_modal_component__["a" /* ExperienceModalComponent */], {
                index: index,
                user_experience: object
            })
                .subscribe(function (success) {
                if (success)
                    _this.getUserExperiences();
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], ProfileInfoComponent.prototype, "mobile", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], ProfileInfoComponent.prototype, "about", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], ProfileInfoComponent.prototype, "description", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], ProfileInfoComponent.prototype, "id", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], ProfileInfoComponent.prototype, "my_id", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], ProfileInfoComponent.prototype, "uid", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], ProfileInfoComponent.prototype, "reloadChild", void 0);
    ProfileInfoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-profile-info',
            template: __webpack_require__("./src/app/Components/profiles/profile-info/profile-info.component.html"),
            styles: [__webpack_require__("./src/app/Components/profiles/profile-info/profile-info.component.scss")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
            providers: [__WEBPACK_IMPORTED_MODULE_6__Services_Skills_skills_service__["a" /* SkillsService */], __WEBPACK_IMPORTED_MODULE_7__Services_Interests_interests_service__["a" /* InterestsService */], __WEBPACK_IMPORTED_MODULE_8__Services_Experiences_experiences_service__["a" /* ExperiencesService */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_6__Services_Skills_skills_service__["a" /* SkillsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__Services_Skills_skills_service__["a" /* SkillsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_7__Services_Interests_interests_service__["a" /* InterestsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__Services_Interests_interests_service__["a" /* InterestsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_8__Services_Experiences_experiences_service__["a" /* ExperiencesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__Services_Experiences_experiences_service__["a" /* ExperiencesService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_9__Services_Profiles_profiles_service__["a" /* ProfilesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__Services_Profiles_profiles_service__["a" /* ProfilesService */]) === "function" && _e || Object])
    ], ProfileInfoComponent);
    return ProfileInfoComponent;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=profile-info.component.js.map

/***/ }),

/***/ "./src/app/Components/profiles/profiles.component.html":
/***/ (function(module, exports) {

module.exports = "<section id=\"w-profile\" *ngIf=\"profile\">\n\t<div *ngIf=\"profile.cover_picture\" class=\"wp-head bg-default\" [ngStyle]=\"{'background-image': 'url(' + profile.cover_picture + ')'}\">\n\t\t<div class=\"filter\"></div>\n\t\t<div *ngIf=\"uploadingCP\" class=\"spinner-load\">\n\t\t\t<div class=\"spinner__item1 spinner-item\"></div>\n\t\t\t<div class=\"spinner__item2 spinner-item\"></div>\n\t\t\t<div class=\"spinner__item3 spinner-item\"></div>\n\t\t</div>\n\t\t<label *ngIf=\"my_id && !mobile\" for=\"file\" class=\"cursor-pt\" (click)=\"setPictureType('cover')\">\n\t\t\t<div *ngIf=\"!uploadingCP\" class=\"wp-cover-upload flex animated fadeIn\">\n\t\t\t\t<i class=\"fa fa-camera mar-r-10\"></i>\n\t\t\t\t<h5 class=\"freigb\">Update cover picture</h5>\n\t\t\t</div>\n\t\t</label>\n\t\t<div class=\"wph-presentation align-center\" *ngIf=\"profile.picture\">\n\t\t\t<div class=\"wphp-picture\">\n\t\t\t\t<div *ngIf=\"uploadingPP\" class=\"spinner-load\">\n\t\t\t\t\t<div class=\"spinner__item1 spinner-item\"></div>\n\t\t\t\t\t<div class=\"spinner__item2 spinner-item\"></div>\n\t\t\t\t\t<div class=\"spinner__item3 spinner-item\"></div>\n\t\t\t\t</div>\n\t\t\t\t<input *ngIf=\"my_id\" id=\"file\" class=\"input-file\" type=\"file\" name=\"profile_picture\" ng2FileSelect [uploader]=\"uploader\" />\n\t\t\t\t<label *ngIf=\"my_id && !uploadingPP\" for=\"file\" (click)=\"setPictureType('profile')\">\n\t\t\t\t\t<div class=\"wphpp-upload cursor-pt\"><i class=\"fa fa-camera animated bounceIn align-center\"></i></div>\n\t\t\t\t</label>\n\t\t\t\t<img [src]=\"transformImage(profile.picture, 100, 100, 'fill')\" alt=\"profile_picture\" />\n\t\t\t\t<span class='freigl' *ngIf=\"top && !profile.ambassador\">#{{ top }}</span>\n\t\t\t\t<span class=\"freigb flex ambassador\" *ngIf=\"profile.ambassador\" ><div class=\"network-emoji\">🎓</div> Ambassador</span>\n\t\t\t</div>\n\t\t\t<h1 class=\"freigs\" >{{ profile.fullName }}</h1>\n\t\t\t<div class=\"wphp-location flex-inline mar-b-10\">\n\t\t\t\t<h3 class=\"freigb mar-r-10 flex\" *ngIf=\"profile.name && profile.name !== 'Unknown'\"><img class=\"network-image mar-r-5\" src=\"/public/images/network-icon-w.svg\" alt=\"network-icon\"> <h3 class=\"network-name\">{{ profile.name }}</h3> </h3>\n\t\t\t\t<img *ngIf=\"profile.city\" class=\"mar-r-5\" src=\"/public/images/location-picto-w.svg\">\n\t\t\t\t<input *ngIf=\"modifLocation\" type=\"text\" [(ngModel)]=\"location\" placeholder=\"add location\" (setAddress)=\"getAddress($event)\" googlePlace />\n\t\t\t\t<div class=\"location-display\" *ngIf=\"!modifLocation\">\n\t\t\t\t\t<h4 class=\"freigb mar-r-10\" *ngIf=\"profile.city && profile.state\">{{ profile.city }}, {{ profile.state }}</h4>\n\t\t\t\t\t<h4 class=\"freigb mar-r-10\" *ngIf=\"profile.city && !profile.state\">{{ profile.city }}, {{ profile.country }}</h4>\n\t\t\t\t</div>\n\t\t\t\t<span *ngIf=\"my_id\" (click)=\"editLocation()\" class=\"picto-edit mar-r-10 cursor-pt\"><img src=\"/public/images/picto-edit-w.svg\"></span>\n\t\t\t\t<div class=\"wphp-rank flex-inline\" *ngIf=\"profile.rank\">\n\t\t\t\t\t<h5 class=\"freigm\">#{{ profile.rank }}</h5>\n\t\t\t\t\t<img src=\"/public/images/Upvote_Icon.svg\">\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<!-- MOBILE -->\n\t\t\t<div class=\"wph-activities-mobile flex\" *ngIf=\"mobile && follows.Count\">\n\t\t\t\t<div class=\"wphal-upvote-mobile pad-x-5\">\n\t\t\t\t\t<h2 class=\"freigm\">{{ follows.Count.project_upvoted }}</h2>\n\t\t\t\t\t<h6 class=\"freigb\">Upvoted<br />projects</h6>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"wphal-following-mobile pad-x-5\">\n\t\t\t\t\t<h2 class=\"freigm\">{{ follows.Count.following_count }}</h2>\n\t\t\t\t\t<h6 class=\"freigb\">Following</h6>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"wphal-follower-mobile pad-x-5\">\n\t\t\t\t\t<h2 class=\"freigm\">{{ follows.Count.followers_count }}</h2>\n\t\t\t\t\t<h6 class=\"freigb\">Followers</h6>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"wph-actions-mobile flex\" *ngIf=\"mobile && !my_id\">\n\t\t\t\t<button class=\"contact-button\">Contact</button>\n\t\t\t\t<button class=\"follow-button\" (click)=\"followProfile(profile.uid)\">\n\t\t\t\t\t<i *ngIf=\"!profile.hasLiked\" class=\"fa fa-plus\"></i>\n\t\t\t\t\t<i *ngIf=\"profile.hasLiked\" class=\"fa fa-check\"></i>\n\t\t\t\t\t<span *ngIf=\"!profile.hasLiked\">Follow</span>\n\t\t\t\t\t<span *ngIf=\"profile.hasLiked\">Following</span>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"wph-picture-mobile\" *ngIf=\"mobile\">\n\t\t\t<button class=\"freigm mar-b-5\" *ngIf=\"my_id && hello\"><i class=\"fa fa-camera mar-r-10\"></i> Update picture</button>\n\t\t\t<div class=\"wphp-involved-mobile flex\" *ngIf=\"projects[0]\" (click)=\"toggleProjects()\">\n\t\t\t\t<p class=\"freigb\">Involved in <span>{{ projects.length }} project</span> </p>\n\t\t\t\t\t<div class=\"picture flex\">\n\t\t\t\t\t\t<div *ngFor=\"let project of projects\">\n\t\t\t\t\t\t\t<img class=\"mar-r-10\" [src]=\"transformImage(project.picture, 40, 40, 'fill')\" alt=\"project-picture\" />\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<img class=\"arrow\" src=\"/public/images/arrow-down-icon-w.svg\" alt=\"arrow\" />\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"wph-activities flex-inline\" *ngIf=\"!mobile\">\n\t\t\t<div class=\"wpha-left flex-inline flex-grow\" *ngIf=\"follows.Count\">\n\t\t\t\t<div class=\"wphal-upvote\">\n\t\t\t\t\t<h2 class=\"freigm\">{{ follows.Count.project_upvoted }}</h2>\n\t\t\t\t\t<h6 class=\"freigb\">Upvoted<br />projects</h6>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"wphal-following\">\n\t\t\t\t\t<h2 class=\"freigm\">{{ follows.Count.following_count }}</h2>\n\t\t\t\t\t<h6 class=\"freigb\">Following</h6>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"wphal-follower\">\n\t\t\t\t\t<h2 class=\"freigm\">{{ follows.Count.followers_count }}</h2>\n\t\t\t\t\t<h6 class=\"freigb\">Followers</h6>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"wpha-center flex-inline cursor-pt\" *ngIf=\"projects[0]\" (click)=\"toggleProjects()\">\n\t\t\t\t<h5 class=\"freigb\">Invoved in <span class=\"freigs\">{{ projects.length }} <span *ngIf=\"projects.length === 1\">project</span><span *ngIf=\"projects.length > 1\">projects</span></span></h5>\n\t\t\t\t<div class=\"wphalc-projects flex\">\n\t\t\t\t\t<figure *ngFor=\"let project of projects\">\n\t\t\t\t\t\t<img *ngIf=\"project.picture\" [src]=\"transformImage(project.picture, 40, 40, 'fill')\" alt=\"project-picture\">\n\t\t\t\t\t</figure>\n\t\t\t\t</div>\n\t\t\t\t<img [@rotate]=\"animateRotate\" class=\"wphalc-img transition-150\" src=\"/public/images/arrow-down-icon-w.svg\" alt=\"arrow\" />\n\t\t\t</div>\n\t\t\t<div *ngIf=\"!my_id\" class=\"wpha-right flex-inline flex-grow flex-justify-right\">\n\t<!-- \t\t\t\t<h5 class=\"freigb\">Ask for help</h5>\n\t-->\t\t\t\t<h5 class=\"freigb cursor-pt\" (click)=\"showSearchUserModal(1)\">Message</h5>\n\t\t\t\t<button (click)=\"followProfile(profile.uid)\" class=\"freigs wphar-follow\">\n\t\t\t\t\t<i *ngIf=\"!profile.hasLiked\" class=\"fa fa-plus mar-r-10\"></i>\n\t\t\t\t\t<i *ngIf=\"profile.hasLiked\" class=\"fa fa-check mar-r-10\"></i>\n\t\t\t\t\t<span *ngIf=\"!profile.hasLiked\">Follow</span>\n\t\t\t\t\t<span *ngIf=\"profile.hasLiked\">Following</span>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t\t<div *ngIf=\"my_id\" class=\"wpha-right\">\n\t\t\t\t<button (click)=\"openLinkedInApiModal()\" class=\"freigb flex\"><img class=\"mar-r-10\" src=\"/public/images/social_media/linkedin-logo.svg\">Import from LinkedIn</button>\n\t\t\t</div>\n\t\t</div>\n\n\t</div>\n\t<div class=\"wp-projects\" [@slide]=\"animationState\" *ngIf=\"projects[0]\">\n\t\t<div class=\"wpp-card\">\n\t\t\t<div class=\"project-card\" *ngFor=\"let project of projects\">\n\t\t\t\t<a [routerLink]=\"['/discover']\" [queryParams]=\"{ 'category': project.category }\" class=\"card-tag\">\n\t\t\t\t\t<div class=\"card-tag-content\">\n\t\t\t\t\t\t<div class=\"card-tag-bg\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<img src=\"public/images/tag-icon.png\">\n\t\t\t\t\t\t<h5>{{ project.category }}</h5>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\n<!-- \t\t\t\t<div class=\"card-vote\" (click)=\"followProject(project.id, i, project.follow)\">\n\t\t\t\t\t<div class=\"card-vote-bg\"></div>\n\t\t\t\t\t<img *ngIf=\"!project.follow\" src=\"public/images/Upvote_Icon_w.svg\">\n\t\t\t\t\t<img *ngIf=\"project.follow\" src=\"public/images/Upvote_Icon.svg\">\n\t\t\t\t\t<span>{{ project.followers }}</span>\n\t\t\t\t</div> -->\n\t\t\t\t<a [routerLink]=\"['/project', project.public_id, transformUrl(project.title)]\" class=\"card-project-page\" >\n\t\t\t\t\t<div class=\"card-picture\" [style.background-image]=\"'url(' + transformImage(project.picture, 300, 180, 'fill') + ')'\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-info\">\n\t\t\t\t\t\t<div class=\"card-title-space\">\n\t\t\t\t\t\t\t<h4>{{ project.title }}</h4>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-status\">\n\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Company'\" src=\"public/images/live-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Idea'\" src=\"public/images/idea-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Prototype'\" src=\"public/images/drafted-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Beta product'\" src=\"public/images/beta-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t{{ project.status }}\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-location\">\n\t\t\t\t\t\t\t<span *ngIf=\"project.state\"><img src=\"public/images/location-picto.svg\" alt=\"location-picture\" />{{ project.city }}, {{ project.state }}</span>\n\t\t\t\t\t\t\t<span *ngIf=\"!project.state\"><img src=\"public/images/location-picto.svg\" alt=\"location-picture\" />{{ project.city }}, {{ project.country }}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-description-text\">\n\t\t\t\t\t\t\t<p>{{ project.description }}</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-info-by\">\n\t\t\t\t\t\t\t<figure class=\"card-info-by-picture\">\n\t\t\t\t\t\t\t\t<img [src]=\"project.creator_picture\" alt=\"card-foot-picture\">\n\t\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t\t<h6>{{ project.creator_name }} <span class=\"inline\" *ngIf=\"project.members\">& {{ project.members }} more</span></h6>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"wpp-close cursor-pt\" (click)=\"toggleProjects()\">\n\t\t\t<p class=\"freigs pad-y-15\">Close</p>\n\t\t</div>\n\t</div>\n\n\t<app-profile-info *ngIf=\"profile.cover_picture\" [about]=\"profile\" [description]=\"profile.description\" [id]=\"profile.id\" [uid]=\"profile.uid\" [my_id]=\"my_id\" [mobile]=\"mobile\" [reloadChild]=\"reloadChild\"></app-profile-info>\n</section>\n<app-footer></app-footer>\n\n"

/***/ }),

/***/ "./src/app/Components/profiles/profiles.component.scss":
/***/ (function(module, exports) {

module.exports = "#w-profile .wp-head:hover .wp-cover-upload {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\n#w-profile .wp-head {\n  position: relative;\n  height: 410px; }\n\n#w-profile .wp-head .wp-cover-upload {\n    display: none;\n    position: absolute;\n    right: 0;\n    top: 25%;\n    right: 15%;\n    background-color: rgba(0, 0, 0, 0.5);\n    padding: 6px 15px 7px 15px;\n    border-radius: 20px;\n    z-index: 1000; }\n\n#w-profile .wp-head .wph-presentation {\n    width: 100%;\n    text-align: center; }\n\n#w-profile .wp-head .wph-presentation .wphp-picture {\n      display: inline-block;\n      position: relative;\n      height: 100px; }\n\n#w-profile .wp-head .wph-presentation .wphp-picture .spinner-load {\n        border-radius: 50%; }\n\n#w-profile .wp-head .wph-presentation .wphp-picture .wphpp-upload {\n        display: none;\n        width: 100%;\n        height: 100px;\n        position: absolute;\n        border-radius: 50%;\n        background-color: rgba(0, 0, 0, 0.6); }\n\n#w-profile .wp-head .wph-presentation .wphp-picture .wphpp-upload i {\n          position: relative; }\n\n#w-profile .wp-head .wph-presentation .wphp-picture span {\n        position: absolute;\n        bottom: 0;\n        color: #2b2b2b;\n        padding: 0 10px 2px 10px;\n        background-color: #fff;\n        border-radius: 10px;\n        margin-left: 10px;\n        left: 50%;\n        font-size: 14px; }\n\n#w-profile .wp-head .wph-presentation .wphp-picture .ambassador {\n        padding: 2px 8px 3px 8px;\n        border-radius: 1em;\n        /*\t\t\t\t\timg {\n\t\t\t\t\t\twidth: 15px;\n\t\t\t\t\t\tmargin-top: 2px;\n\t\t\t\t\t\tmargin-right: 4px;\n\t\t\t\t\t}*/ }\n\n#w-profile .wp-head .wph-presentation .wphp-picture .ambassador .network-emoji {\n          margin-right: 7px; }\n\n#w-profile .wp-head .wph-presentation .wphp-picture:hover .wphpp-upload {\n      display: block; }\n\n#w-profile .wp-head .wph-presentation img {\n      width: 100px;\n      border-radius: 50%; }\n\n#w-profile .wp-head .wph-presentation h1 {\n      font-size: 28px; }\n\n#w-profile .wp-head .wph-presentation .wphp-location img {\n      width: 9px;\n      border-radius: 0;\n      position: relative;\n      top: 1px; }\n\n#w-profile .wp-head .wph-presentation .wphp-location .network-image {\n      width: 17px;\n      position: relative;\n      top: 1px; }\n\n#w-profile .wp-head .wph-presentation .wphp-location .network-name {\n      font-size: 16px;\n      /*position: relative;\n\t\t\t\t\tbottom: 2px;*/ }\n\n#w-profile .wp-head .wph-presentation .wphp-location input {\n      width: 150px;\n      color: #fff;\n      padding: 0;\n      margin: 0;\n      background-color: transparent;\n      border: 0;\n      border-bottom: 1px solid;\n      border-radius: 0;\n      padding-left: 5px;\n      margin-right: 10px; }\n\n#w-profile .wp-head .wph-presentation .wphp-location .picto-edit img {\n      width: 14px;\n      position: relative;\n      top: 2px; }\n\n#w-profile .wp-head .wph-presentation .wphp-location .wphp-rank img {\n      position: relative;\n      width: 8px;\n      top: 2px; }\n\n#w-profile .wp-head .wph-presentation .wphp-location .wphp-rank h5 {\n      margin-right: 2px; }\n\n#w-profile .wp-head .wph-activities {\n    width: 1000px;\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    margin: 0 auto;\n    padding: 10px 30px;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box; }\n\n#w-profile .wp-head .wph-activities .wpha-left .wphal-upvote, #w-profile .wp-head .wph-activities .wpha-left .wphal-following, #w-profile .wp-head .wph-activities .wpha-left .wphal-follower {\n      text-align: center;\n      margin: 0 10px; }\n\n#w-profile .wp-head .wph-activities .wpha-left .wphal-upvote h2, #w-profile .wp-head .wph-activities .wpha-left .wphal-following h2, #w-profile .wp-head .wph-activities .wpha-left .wphal-follower h2 {\n        font-family: 'FreigSem'; }\n\n#w-profile .wp-head .wph-activities .wpha-left .wphal-upvote h6, #w-profile .wp-head .wph-activities .wpha-left .wphal-following h6, #w-profile .wp-head .wph-activities .wpha-left .wphal-follower h6 {\n        line-height: 16px;\n        font-size: 14px; }\n\n#w-profile .wp-head .wph-activities .wpha-left .wphal-following, #w-profile .wp-head .wph-activities .wpha-left .wphal-follower {\n      -ms-flex-item-align: baseline;\n          align-self: baseline; }\n\n#w-profile .wp-head .wph-activities .wpha-center {\n      -webkit-box-flex: 2;\n          -ms-flex-positive: 2;\n              flex-grow: 2;\n      -webkit-box-pack: left;\n          -ms-flex-pack: left;\n              justify-content: left; }\n\n#w-profile .wp-head .wph-activities .wpha-center .wphalc-projects {\n        margin: 0 10px 0 15px; }\n\n#w-profile .wp-head .wph-activities .wpha-center .wphalc-projects img {\n          width: 40px;\n          border-radius: 4px;\n          margin-right: 5px; }\n\n#w-profile .wp-head .wph-activities .wpha-center .wphalc-img {\n        margin-right: 30px; }\n\n#w-profile .wp-head .wph-activities .wpha-center .wphalc-img img {\n          width: 15px; }\n\n#w-profile .wp-head .wph-activities .wpha-right h5 {\n      margin-right: 35px; }\n\n#w-profile .wp-head .wph-activities .wpha-right button {\n      font-size: 14px;\n      padding: 8px 25px;\n      background-color: #0077B5;\n      border-radius: 18px;\n      border: 1px solid #0077B5; }\n\n#w-profile .wp-head .wph-activities .wpha-right button img {\n        width: 16px; }\n\n#w-profile .wp-head .wph-activities .wpha-right .wphar-follow {\n      background-color: #354c68;\n      border: 0; }\n\n#w-profile .wp-head .wph-activities .wpha-right .wphar-follow:hover {\n      background-color: #2d4058;\n      border: 0; }\n\n#w-profile .wp-head .wph-activities .wpha-right button:hover {\n      border: 1px solid #046293;\n      background-color: #046293; }\n\n#w-profile .wp-head .wph-activities .wpha-right .fa-plus {\n      font-size: 14px; }\n\n#w-profile .wph-head::after {\n  background: rgba(127, 128, 128, 0.25); }\n\n#w-profile .wp-projects {\n  overflow-y: hidden;\n  max-height: 2000px;\n  /*\ttransition-property: all;\n\ttransition-duration: .5s;\n\ttransition-timing-function: cubic-bezier(0, 1, 0.5, 1);\n*/ }\n\n#w-profile .wp-projects .wpp-card {\n    text-align: center;\n    max-width: 1000px;\n    padding: 70px 15px 0;\n    margin: 0 auto; }\n\n#w-profile .wp-projects .wpp-close {\n    text-align: center;\n    margin-top: 30px;\n    border-top: 1px solid #e5e5e5;\n    border-bottom: 2px solid #e5e5e5;\n    background-color: #FAFAFA;\n    cursor: pointer; }\n\n#w-profile .wp-projects .wpp-close p {\n      font-size: 18px;\n      color: #222; }\n\n/******************** MOBILE ****************************/\n\n@media only screen and (max-width: 736px) {\n  #w-profile .wp-head {\n    height: 450px; }\n  #w-profile .wph-presentation {\n    margin-top: 5px; }\n  #w-profile h3 {\n    margin-bottom: 10px; }\n  #w-profile .wph-activities-mobile {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n    #w-profile .wph-activities-mobile .wphal-upvote-mobile, #w-profile .wph-activities-mobile .wphal-following-mobile, #w-profile .wph-activities-mobile .wphal-follower-mobile {\n      text-align: center; }\n      #w-profile .wph-activities-mobile .wphal-upvote-mobile h2, #w-profile .wph-activities-mobile .wphal-following-mobile h2, #w-profile .wph-activities-mobile .wphal-follower-mobile h2 {\n        font-family: 'FreigSem'; }\n      #w-profile .wph-activities-mobile .wphal-upvote-mobile h6, #w-profile .wph-activities-mobile .wphal-following-mobile h6, #w-profile .wph-activities-mobile .wphal-follower-mobile h6 {\n        line-height: 16px;\n        font-size: 14px; }\n    #w-profile .wph-activities-mobile .wphal-following-mobile, #w-profile .wph-activities-mobile .wphal-follower-mobile {\n      -ms-flex-item-align: baseline;\n          align-self: baseline; }\n  #w-profile .wph-actions-mobile {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n    #w-profile .wph-actions-mobile button {\n      margin: 5px 10px; }\n    #w-profile .wph-actions-mobile .contact-button {\n      font-size: 16px;\n      border: 1px solid;\n      background-color: transparent; }\n    #w-profile .wph-actions-mobile .follow-button {\n      background-color: #354c68;\n      border: 1px solid #354c68; }\n      #w-profile .wph-actions-mobile .follow-button span {\n        font-size: 16px; }\n    #w-profile .wph-actions-mobile .fa-plus {\n      position: relative;\n      top: 1px; }\n  #w-profile .wph-picture-mobile {\n    position: absolute;\n    bottom: 0;\n    width: 100%;\n    text-align: center; }\n    #w-profile .wph-picture-mobile button {\n      background-color: transparent;\n      border: 1px solid white;\n      font-size: 16px; }\n    #w-profile .wph-picture-mobile .wphp-involved-mobile {\n      padding: 0 15px 10px 15px; }\n      #w-profile .wph-picture-mobile .wphp-involved-mobile .picture {\n        margin-left: auto; }\n        #w-profile .wph-picture-mobile .wphp-involved-mobile .picture img {\n          width: 40px;\n          border-radius: 4px; }\n        #w-profile .wph-picture-mobile .wphp-involved-mobile .picture .arrow {\n          width: 12px; } }\n"

/***/ }),

/***/ "./src/app/Components/profiles/profiles.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__ = __webpack_require__("./node_modules/ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_cloudinary__ = __webpack_require__("./node_modules/ng2-cloudinary/dist/esm/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modals_message_modal_message_modal_component__ = __webpack_require__("./src/app/Components/modals/message-modal/message-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modals_popover_login_popover_login_component__ = __webpack_require__("./src/app/Components/modals/popover-login/popover-login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modals_api_modals_linked_in_api_linked_in_api_component__ = __webpack_require__("./src/app/Components/modals/api-modals/linked-in-api/linked-in-api.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Services_Profiles_profiles_service__ = __webpack_require__("./src/app/Services/Profiles/profiles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Services_Projects_projects_service__ = __webpack_require__("./src/app/Services/Projects/projects.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Services_Follows_follow_service__ = __webpack_require__("./src/app/Services/Follows/follow.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Services_Pictures_pictures_service__ = __webpack_require__("./src/app/Services/Pictures/pictures.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Services_shared_service__ = __webpack_require__("./src/app/Services/shared.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Services_Social_social_service__ = __webpack_require__("./src/app/Services/Social/social.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__Services_meta_service__ = __webpack_require__("./src/app/Services/meta.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__Services_account_service__ = __webpack_require__("./src/app/Services/account.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__Animations_animations__ = __webpack_require__("./src/app/Animations/animations.ts");
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


// import { GoogleContactModalComponent } from '../modals/google-contact-modal/google-contact-modal.component';

/* Services */









/* Animations */

var ProfilesComponent = /** @class */ (function () {
    function ProfilesComponent(TokenService, ProfilesService, FollowService, ProjectsService, route, router, dialogService, PicturesService, SharedService, SocialService, AccountService, ref, Title, MetaService) {
        this.TokenService = TokenService;
        this.ProfilesService = ProfilesService;
        this.FollowService = FollowService;
        this.ProjectsService = ProjectsService;
        this.route = route;
        this.router = router;
        this.dialogService = dialogService;
        this.PicturesService = PicturesService;
        this.SharedService = SharedService;
        this.SocialService = SocialService;
        this.AccountService = AccountService;
        this.ref = ref;
        this.Title = Title;
        this.MetaService = MetaService;
        this.my_id = false;
        this.projects = [];
        this.uploadingPP = false;
        this.uploadingCP = false;
        this.mobile = false;
        this.modifLocation = false;
        this.reloadChild = false;
        this.ambassador = false;
        this.uploader = new __WEBPACK_IMPORTED_MODULE_3_ng2_cloudinary__["b" /* CloudinaryUploader */](new __WEBPACK_IMPORTED_MODULE_3_ng2_cloudinary__["a" /* CloudinaryOptions */]({ cloudName: 'dqpkpmrgk', uploadPreset: 'z7rzegb5', autoUpload: true }));
        this.initWindow();
        this.imageUpload();
    }
    ProfilesComponent.prototype.ngOnInit = function () {
        this.animationState = 'inactive';
        this.animateRotate = 'down';
        this.initParamsRoute();
    };
    ProfilesComponent.prototype.initWindow = function () {
        window.scrollTo(0, 0);
        if ((window.screen.width) < 736)
            this.mobile = true;
    };
    // initSEO() {
    // 	this.meta.setTitle(`${this.profile['fullName']} | Wittycircle`);
    // 	this.meta.setTag('og:image', this.profile['cover_picture']);
    // 	this.meta.setTag('og:url', 'https://www.wittycircle.com/' + this.profile['username']);
    // }
    ProfilesComponent.prototype.setMetaData = function () {
        this.Title.setTitle(this.profile['fullName'] + " | Witty");
        this.MetaService.setMeta('description', "View " + this.profile['fullName'] + "'s profile on Witty, the professional network for the entrepreneurial age. We connect millions of people to what's being built around them.");
        this.MetaService.setMeta('og:title', this.profile['fullName'] + "'s profile on Witty");
        this.MetaService.setMeta('og:description', "View " + this.profile['fullName'] + "'s profile on Witty, the professional network for the entrepreneurial age. We connect millions of people to what's being built around them.");
        this.MetaService.setMeta('og:url', 'https://www.wittycircle.com/' + this.profile['username']);
        this.MetaService.setMeta('og:image', this.transformImage(this.profile['picture'], 200, 200, 'fill'));
    };
    ProfilesComponent.prototype.imageUpload = function () {
        var _this = this;
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            _this.cloudinaryImage = JSON.parse(response);
            _this.updateProfileImage(_this.cloudinaryImage.secure_url);
        };
        this.uploader.onAfterAddingFile = function (fileItem) {
            if (_this.pictureType === 'cover')
                _this.uploadingCP = true;
            else
                _this.uploadingPP = true;
            _this.uploader.uploadAll();
        };
    };
    ProfilesComponent.prototype.initParamsRoute = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params['username'])
                _this.ProfilesService.getIdByUsername(params['username']).subscribe(function (res) {
                    _this.my_ids = res;
                    _this.profile = {};
                    _this.follows = {};
                    _this.initServices();
                    if (_this.TokenService.getToken())
                        _this.my_id = _this.TokenService.getToken().user.id == _this.my_ids['id'] ? true : false;
                });
            else
                _this.router.navigate(['/']);
        });
    };
    ProfilesComponent.prototype.initServices = function () {
        this.getProfile();
        this.getUserFollows();
        this.getUserProjects();
    };
    ProfilesComponent.prototype.getProfile = function () {
        var _this = this;
        this.ProfilesService.getProfile(this.my_ids['id']).subscribe(function (res) {
            _this.profile = res.profile;
            _this.top = _this.getTopRank(_this.profile['rank']);
            _this.setMetaData();
            _this.ref.detectChanges();
        });
    };
    ProfilesComponent.prototype.getTopRank = function (rank) {
        if (rank >= 1 && rank <= 10)
            return 10;
        else if (rank >= 11 && rank <= 50)
            return 50;
        else if (rank >= 51 && rank <= 100)
            return 100;
        else if (rank >= 101 && rank <= 500)
            return 500;
    };
    ProfilesComponent.prototype.getUserFollows = function () {
        var _this = this;
        this.FollowService.getFollows(this.my_ids['id']).subscribe(function (res) {
            _this.follows = res;
        });
    };
    ProfilesComponent.prototype.getUserProjects = function () {
        var _this = this;
        this.ProjectsService.getUserProjects(this.my_ids['id']).subscribe(function (res) {
            if (_this.my_ids['id'] === 1 || _this.my_ids['id'] === 9)
                _this.projects.push(res.projects[0]);
            else
                _this.projects = res.projects;
        });
    };
    //** Modify location **//
    ProfilesComponent.prototype.getAddress = function (place) {
        var address = place['formatted_address'].replace('USA', 'United States');
        var location = address.split(', ');
        var body = {
            location: {
                city: location[0],
                state: location[1],
                country: location[location.length - 1],
                lng: place['geometry'].location.lat(),
                lat: place['geometry'].location.lng()
            }
        };
        this.updateLocation(body);
    };
    ProfilesComponent.prototype.followProfile = function (id) {
        var _this = this;
        if (!this.TokenService.getToken())
            return this.showLoginPopOver();
        this.ProfilesService.followProfile(id, {}).subscribe(function (res) {
            if (!_this.profile['hasLiked']) {
                _this.profile['follower'] += 1;
                _this.profile['hasLiked'] = true;
            }
            else {
                _this.profile['follower'] -= 1;
                _this.profile['hasLiked'] = false;
            }
        });
    };
    ProfilesComponent.prototype.setPictureType = function (type) {
        this.pictureType = type;
    };
    ProfilesComponent.prototype.getPictureBody = function (new_picture) {
        if (this.pictureType === 'cover') {
            var body = { cover_picture: new_picture };
            return body;
        }
        else {
            var body = { picture: new_picture };
            return body;
        }
    };
    ProfilesComponent.prototype.updateProfileImage = function (new_picture) {
        var _this = this;
        if (this.my_id) {
            this.uploadingCP = this.uploadingPP = false;
            this.ProfilesService.updateProfile(this.profile['id'], this.getPictureBody(new_picture))
                .subscribe(function (res) {
                if (res.success) {
                    if (_this.pictureType === 'cover')
                        _this.profile['cover_picture'] = new_picture;
                    else {
                        _this.reloadHeader();
                        _this.profile['picture'] = new_picture;
                    }
                }
            });
        }
    };
    /** Update Location **/
    ProfilesComponent.prototype.updateLocation = function (body) {
        var _this = this;
        this.ProfilesService.updateProfile(this.my_ids['id'], body).subscribe(function (res) {
            if (res.success) {
                _this.editLocation();
                _this.getProfile();
            }
        });
    };
    ProfilesComponent.prototype.toggleProjects = function () {
        this.animationState = this.animationState === 'active' ? 'inactive' : 'active';
        this.animateRotate = this.animateRotate === 'down' ? 'up' : 'down';
    };
    ProfilesComponent.prototype.reloadHeader = function () {
        this.SharedService.reloadHeader(true);
    };
    ProfilesComponent.prototype.editLocation = function () {
        this.modifLocation = this.modifLocation ? false : true;
        this.ref.detectChanges();
    };
    /* TRANSFORM */
    ProfilesComponent.prototype.transformUrl = function (url) {
        url = url.replace(/ /g, '-');
        return url;
    };
    ProfilesComponent.prototype.transformImage = function (url, width, height, crop) {
        return this.PicturesService.transformImage(url, width, height, crop);
    };
    /* SHOW MODAL */
    ProfilesComponent.prototype.showSearchUserModal = function (id) {
        var _this = this;
        if (!this.TokenService.getToken())
            return this.showLoginPopOver();
        else {
            var my_id_1 = this.TokenService.getToken().user.id;
            this.AccountService.getSocialInvite(my_id_1).subscribe(function (check) {
                _this.ProfilesService.getProfile(my_id_1).subscribe(function (res) {
                    // if (res.profile.rank <= 2500 || check.invite_google) {
                    var disposable = _this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_5__modals_message_modal_message_modal_component__["a" /* MessageModalComponent */], {
                        profile: _this.profile
                    });
                    // } else {
                    // 	this.openModalForSocial(1);
                    // }
                });
            });
        }
    };
    ProfilesComponent.prototype.openLinkedInApiModal = function () {
        var _this = this;
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_7__modals_api_modals_linked_in_api_linked_in_api_component__["a" /* LinkedInApiComponent */], {
            profile: this.profile,
            index: 0
        }).subscribe(function (success) {
            _this.reloadChild = success;
            _this.getProfile();
        });
    };
    ProfilesComponent.prototype.showLoginPopOver = function () {
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_6__modals_popover_login_popover_login_component__["a" /* PopoverLoginComponent */], {});
    };
    ProfilesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-profiles',
            template: __webpack_require__("./src/app/Components/profiles/profiles.component.html"),
            styles: [__webpack_require__("./src/app/Components/profiles/profiles.component.scss"), __webpack_require__("./src/public/styles/project-card.scss")],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__Services_Profiles_profiles_service__["a" /* ProfilesService */],
                __WEBPACK_IMPORTED_MODULE_11__Services_Follows_follow_service__["a" /* FollowService */],
                __WEBPACK_IMPORTED_MODULE_10__Services_Projects_projects_service__["a" /* ProjectsService */]
            ],
            animations: [__WEBPACK_IMPORTED_MODULE_17__Animations_animations__["h" /* profileAnime1 */], __WEBPACK_IMPORTED_MODULE_17__Animations_animations__["i" /* profileAnime2 */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_8__Services_Authentication_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__Services_Authentication_token_service__["a" /* TokenService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_9__Services_Profiles_profiles_service__["a" /* ProfilesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__Services_Profiles_profiles_service__["a" /* ProfilesService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_11__Services_Follows_follow_service__["a" /* FollowService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__Services_Follows_follow_service__["a" /* FollowService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_10__Services_Projects_projects_service__["a" /* ProjectsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__Services_Projects_projects_service__["a" /* ProjectsService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__["DialogService"]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_12__Services_Pictures_pictures_service__["a" /* PicturesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12__Services_Pictures_pictures_service__["a" /* PicturesService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_13__Services_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_13__Services_shared_service__["a" /* SharedService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_14__Services_Social_social_service__["a" /* SocialService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_14__Services_Social_social_service__["a" /* SocialService */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_16__Services_account_service__["a" /* AccountService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_16__Services_account_service__["a" /* AccountService */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["Title"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["Title"]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_15__Services_meta_service__["a" /* MetaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_15__Services_meta_service__["a" /* MetaService */]) === "function" && _p || Object])
    ], ProfilesComponent);
    return ProfilesComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
}());

//# sourceMappingURL=profiles.component.js.map

/***/ }),

/***/ "./src/app/Components/profiles/profiles.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilesModule", function() { return ProfilesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__ = __webpack_require__("./src/app/Pipes/pipe.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__footer_footer_module__ = __webpack_require__("./src/app/Components/footer/footer.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__profiles_component__ = __webpack_require__("./src/app/Components/profiles/profiles.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__profile_info_profile_info_component__ = __webpack_require__("./src/app/Components/profiles/profile-info/profile-info.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Services_Authentication_authentication_service__ = __webpack_require__("./src/app/Services/Authentication/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Services_Social_social_service__ = __webpack_require__("./src/app/Services/Social/social.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Services_account_service__ = __webpack_require__("./src/app/Services/account.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Directives_Modals_experience_modal_directive__ = __webpack_require__("./src/app/Directives/Modals/experience.modal.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Directives_directives_module__ = __webpack_require__("./src/app/Directives/directives.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angular2_moment__ = __webpack_require__("./node_modules/angular2-moment/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ng2_cloudinary__ = __webpack_require__("./node_modules/ng2-cloudinary/dist/esm/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ng2_file_upload__ = __webpack_require__("./node_modules/ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__Routes_profiles_routes__ = __webpack_require__("./src/app/Routes/profiles.routes.ts");
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



/* Route */

var ProfilesModule = /** @class */ (function () {
    function ProfilesModule() {
    }
    ProfilesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_17__Routes_profiles_routes__["a" /* PROFILE_ROUTES */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["f" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_14_angular2_moment__["MomentModule"],
                __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__["a" /* PipeModule */],
                __WEBPACK_IMPORTED_MODULE_5__footer_footer_module__["a" /* FooterModule */],
                __WEBPACK_IMPORTED_MODULE_13__Directives_directives_module__["a" /* DirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_15_ng2_cloudinary__["c" /* Ng2CloudinaryModule */],
                __WEBPACK_IMPORTED_MODULE_16_ng2_file_upload__["FileUploadModule"]
            ],
            exports: [],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__profiles_component__["a" /* ProfilesComponent */],
                __WEBPACK_IMPORTED_MODULE_7__profile_info_profile_info_component__["a" /* ProfileInfoComponent */],
                __WEBPACK_IMPORTED_MODULE_12__Directives_Modals_experience_modal_directive__["a" /* ExperienceModalDirective */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__Services_Authentication_authentication_service__["a" /* AuthenticationService */],
                __WEBPACK_IMPORTED_MODULE_9__Services_Authentication_token_service__["a" /* TokenService */],
                __WEBPACK_IMPORTED_MODULE_10__Services_Social_social_service__["a" /* SocialService */],
                __WEBPACK_IMPORTED_MODULE_11__Services_account_service__["a" /* AccountService */]
            ]
        })
    ], ProfilesModule);
    return ProfilesModule;
}());

//# sourceMappingURL=profiles.module.js.map

/***/ }),

/***/ "./src/app/Directives/Modals/experience.modal.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExperienceModalDirective; });
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

var ExperienceModalDirective = /** @class */ (function () {
    function ExperienceModalDirective(el) {
        this.el = el;
        this.nativeElement = el.nativeElement;
    }
    ExperienceModalDirective.prototype.onClick = function (event) {
        console.log(event);
    };
    ExperienceModalDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[expModalDiv]',
            host: {
                '(document:click)': 'onClick($event)',
            },
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
    ], ExperienceModalDirective);
    return ExperienceModalDirective;
    var _a;
}());

//# sourceMappingURL=experience.modal.directive.js.map

/***/ }),

/***/ "./src/app/Routes/profiles.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PROFILE_ROUTES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Components_profiles_profiles_component__ = __webpack_require__("./src/app/Components/profiles/profiles.component.ts");

/* Components */

/* Librairies */
var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__Components_profiles_profiles_component__["a" /* ProfilesComponent */] },
];
var PROFILE_ROUTES = __WEBPACK_IMPORTED_MODULE_0__angular_router__["f" /* RouterModule */].forChild(routes);
//# sourceMappingURL=profiles.routes.js.map

/***/ }),

/***/ "./src/app/Services/Follows/follow.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FollowService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("./node_modules/rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_bearer__ = __webpack_require__("./node_modules/ng2-bearer/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_bearer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_bearer__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FollowService = /** @class */ (function () {
    function FollowService(http, AuthHttp) {
        this.http = http;
        this.AuthHttp = AuthHttp;
    }
    FollowService.prototype.getFollows = function (id) {
        var url = 'http://localhost:3000/api/profiles/' + id + '/follow';
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    FollowService.prototype.followProfile = function (id, body) {
        var url = 'http://localhost:3000/api/profiles/' + id + '/follow';
        return this.http.post(url, body)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    FollowService.prototype.unfollowProfile = function (id, body) {
        var url = 'http://localhost:3000/api/profiles/' + id + '/follow';
        return this.http.delete(url, body)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    FollowService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_bearer__["AuthHttp"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng2_bearer__["AuthHttp"]) === "function" && _b || Object])
    ], FollowService);
    return FollowService;
    var _a, _b;
}());

//# sourceMappingURL=follow.service.js.map

/***/ })

});
//# sourceMappingURL=profiles.module.chunk.js.map