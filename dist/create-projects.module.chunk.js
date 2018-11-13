webpackJsonp(["create-projects.module"],{

/***/ "./src/app/Components/create-projects/create-community/create-community.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  create-community works!\n</p>\n"

/***/ }),

/***/ "./src/app/Components/create-projects/create-community/create-community.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/Components/create-projects/create-community/create-community.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateCommunityComponent; });
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

var CreateCommunityComponent = /** @class */ (function () {
    function CreateCommunityComponent() {
    }
    CreateCommunityComponent.prototype.ngOnInit = function () {
    };
    CreateCommunityComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-create-community',
            template: __webpack_require__("./src/app/Components/create-projects/create-community/create-community.component.html"),
            styles: [__webpack_require__("./src/app/Components/create-projects/create-community/create-community.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], CreateCommunityComponent);
    return CreateCommunityComponent;
}());

//# sourceMappingURL=create-community.component.js.map

/***/ }),

/***/ "./src/app/Components/create-projects/create-need/create-need.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"wcp-needs\">\n\t<div class=\"wcpn-title\">\n\t\t<h3 class=\"freigs\">Ask for help and advices</h3>\n\t\t<h4 class=\"freigb\">Post ads about what you need and ask our community for help. Your ads will be displayed in the <span class=\"freigm\">get involved</span> tab of your project page.</h4>\n\t</div>\n\n\t<div class=\"wcpn-cards flex\">\n\t\t<div class=\"needs-card\" *ngFor=\"let opening of openings; let i = index\">\n\t\t\t<div class=\"nc-header bg-default\" [ngStyle]=\"{'background-image': 'url(' + project.picture + ')'}\">\n\t\t\t\t<div class=\"filter-need\"></div>\n\t\t\t\t<h3 class=\"freigs align-center\"><span *ngIf=\"opening && opening.status !== 'Any help' \">A</span> {{ opening.status }} <span class=\"freigb\">in</span> <br /> {{ transformTags(opening.tags)[0] }}</h3>\n\t\t\t</div>\n\n\t\t\t<div class=\"nc-body\">\n\t\t\t\t<p class=\"freigb mar-b-15\">{{ opening.description }}</p>\n\n\t\t\t\t<ul class=\"flex\">\n\t\t\t\t\t<div *ngFor=\"let tag of transformTags(opening.tags); let i = index\">\n\t\t\t\t\t\t<li class=\"freigs\" *ngIf=\"i > 0\">{{ tag }}</li>\n\t\t\t\t\t</div>\n\t\t\t\t</ul>\n\t\t\t</div>\n\n<!-- \t\t\t<div class=\"nc-footer flex\">\n\t\t\t\t<img class=\"mar-r-5\" src=\"/public/images/mailbox-icon-b-2.svg\">\n\t\t\t\t<h4 class=\"freigs\">Contact the team</h4>\n\t\t\t</div> -->\n\n\t\t\t<div class=\"nc-footer flex\">\n\t\t\t\t<i class=\"fa fa-pencil-square-o cursor-pt\" (click)=\"showCreateNeedModal(opening, i)\"></i>\n\t\t\t\t<i class=\"fa fa-trash-o cursor-pt\" (click)=\"deleteOpening(opening.id, i)\"></i>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"add-card cursor-pt transition-200\" (click)=\"showCreateNeedModal(0, 0)\">\n\t\t\t<img class=\"mar-b-10\" src=\"/public/images/needs-icon.png\" alt=\"need\" />\n\t\t\t<div class=\"plus-add\">\n\t\t\t\t<i class=\"fa fa-plus\"></i>\n\t\t\t\t<span class=\"freigs\">Add a need</span>\n\t\t\t</div>\n\t\t\t<p class=\"freigm\">Our fancy algorithm will<br /> do the rest.</p>\n\t\t</div>\n\t</div>\n\n</section>\n"

/***/ }),

/***/ "./src/app/Components/create-projects/create-need/create-need.component.scss":
/***/ (function(module, exports) {

module.exports = ".wcp-needs {\n  width: 900px;\n  padding: 40px 0;\n  margin: 0 auto; }\n  .wcp-needs .wcpn-title {\n    margin-bottom: 50px; }\n  .wcp-needs .wcpn-title h3 {\n      color: #222; }\n  .wcp-needs .wcpn-title h4 {\n      color: #999; }\n  .wcp-needs .wcpn-title span {\n      color: #999; }\n  .wcp-needs .wcpn-cards {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap; }\n  .wcp-needs .wcpn-cards .needs-card {\n      margin-left: 0; }\n"

/***/ }),

/***/ "./src/app/Components/create-projects/create-need/create-need.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateNeedComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__("./node_modules/ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_need_modal_need_modal_component__ = __webpack_require__("./src/app/Components/modals/need-modal/need-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_Projects_projects_service__ = __webpack_require__("./src/app/Services/Projects/projects.service.ts");
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


var CreateNeedComponent = /** @class */ (function () {
    function CreateNeedComponent(dialogService, ProjectsService) {
        this.dialogService = dialogService;
        this.ProjectsService = ProjectsService;
        this.openings = [];
        this.showOpenings = false;
    }
    CreateNeedComponent.prototype.ngOnInit = function () {
        this.openings = this.project['openings'];
    };
    CreateNeedComponent.prototype.transformTags = function (tags) {
        if (tags)
            return tags.split(',');
        else
            return [];
    };
    CreateNeedComponent.prototype.deleteOpening = function (id, index) {
        var _this = this;
        this.ProjectsService.deleteProjectOpening(id, {}).subscribe(function (res) {
            _this.openings.splice(index, 1);
        });
    };
    /* ShowSearchModal */
    CreateNeedComponent.prototype.showCreateNeedModal = function (opening, index) {
        var _this = this;
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_2__modals_need_modal_need_modal_component__["a" /* NeedModalComponent */], {
            project_id: this.project['id'],
            opening: opening
        }).subscribe(function (need) {
            if (need) {
                if (opening) {
                    _this.openings[index] = need;
                }
                else {
                    _this.openings.push(need);
                }
                console.log(_this.openings);
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], CreateNeedComponent.prototype, "project", void 0);
    CreateNeedComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-create-need',
            template: __webpack_require__("./src/app/Components/create-projects/create-need/create-need.component.html"),
            styles: [__webpack_require__("./src/app/Components/create-projects/create-need/create-need.component.scss"), __webpack_require__("./src/public/styles/need-card.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__Services_Projects_projects_service__["a" /* ProjectsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_Projects_projects_service__["a" /* ProjectsService */]) === "function" && _b || Object])
    ], CreateNeedComponent);
    return CreateNeedComponent;
    var _a, _b;
}());

//# sourceMappingURL=create-need.component.js.map

/***/ }),

/***/ "./src/app/Components/create-projects/create-people/create-people.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"wcp-teammate\">\n\t<h3 class=\"freigs\">Invite your teammates</h3>\n\t<h4 class=\"freigb\">Inviting users to your team and allow them to edit your project.</h4>\n\n\n\t<div class=\"wcpt-invitation flex\">\n\t\t<div class=\"wcpti-container\">\n\t\t\t<div class=\"wcpti-invite cursor-pt transition-200\" (click)=\"showSearchModalUser()\">\n\t\t\t\t<img src=\"/public/images/users.png\" alt=\"user-icon\"/>\n\t\t\t\t<div class=\"wcptii-search flex\">\n\t\t\t\t\t<img class=\"mar-r-10\" src=\"/public/images/search-icon-r.svg\" alt=\"search-icon\">\n\t\t\t\t\t<span class=\"freigs\">Search for Wittycircle users</span>\n\t\t\t\t</div>\n\t\t\t\t<p class=\"freigs\">They will be added to your team</p>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"wcpti-members\">\n\t\t\t<h3 class=\"freigm mar-b-15\">Already part of your team</h3>\n\n\t\t\t<div class=\"wcptim-info mar-b-15 flex\" *ngFor=\"let invite of invites; let i = index\">\n\t\t\t\t<img class=\"mar-r-10\" [src]=\"transformImage(invite.profile_picture, 50, 50, 'fill')\" alt=\"invite_picture\" />\n\t\t\t\t<div class=\"info\">\n\t\t\t\t\t<h4 class=\"freigs\">{{ invite.fullName }}</h4>\n\t\t\t\t\t<h5 *ngIf=\"invite.n_accept\" class=\"freigm\"><i>Member</i></h5>\n\t\t\t\t\t<h5 *ngIf=\"!invite.n_accept\" class=\"freigm\"><i>Pending...</i></h5>\n\t\t\t\t</div>\n\t\t\t\t<img (click)=\"deleteInviteToProject(invite.id, i)\" class=\"cross-icon cursor-pt\" src=\"/public/images/cross-icon.svg\" alt=\"cross-icon\" />\n\t\t\t</div>\n\t\t</div>\n\n\t</div>\n</section>\n"

/***/ }),

/***/ "./src/app/Components/create-projects/create-people/create-people.component.scss":
/***/ (function(module, exports) {

module.exports = ".wcp-teammate {\n  width: 900px;\n  padding: 40px 0;\n  margin: 0 auto; }\n  .wcp-teammate h3, .wcp-teammate h4 {\n    color: #222; }\n  .wcp-teammate h3 {\n    font-size: 18px; }\n  .wcp-teammate h4 {\n    font-size: 16px; }\n  .wcp-teammate .wcpt-invitation {\n    padding: 50px 0;\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start; }\n  .wcp-teammate .wcpt-invitation .wcpti-container {\n      width: 50%;\n      border-right: 1px solid #e5e5e5; }\n  .wcp-teammate .wcpt-invitation .wcpti-invite {\n      width: 50%;\n      padding: 20px 80px 30px 80px;\n      text-align: center;\n      border: 2px dashed #e5e5e5;\n      border-radius: 6px; }\n  .wcp-teammate .wcpt-invitation .wcpti-invite img {\n        width: 50px; }\n  .wcp-teammate .wcpt-invitation .wcpti-invite .wcptii-search {\n        -webkit-box-pack: center;\n            -ms-flex-pack: center;\n                justify-content: center; }\n  .wcp-teammate .wcpt-invitation .wcpti-invite .wcptii-search img {\n          width: 18px; }\n  .wcp-teammate .wcpt-invitation .wcpti-invite .wcptii-search span {\n          color: #FF4D4D; }\n  .wcp-teammate .wcpt-invitation .wcpti-invite p {\n        text-align: center;\n        color: #999999; }\n  .wcp-teammate .wcpt-invitation .wcpti-invite:hover {\n      border: 2px dashed #999; }\n  .wcp-teammate .wcpt-invitation .wcpti-members {\n      padding-left: 50px;\n      width: 30%; }\n  .wcp-teammate .wcpt-invitation .wcpti-members h3 {\n        color: #999; }\n  .wcp-teammate .wcpt-invitation .wcpti-members .wcptim-info img {\n        width: 50px;\n        height: auto;\n        border-radius: 50%; }\n  .wcp-teammate .wcpt-invitation .wcpti-members .wcptim-info h5 {\n        color: #999; }\n  .wcp-teammate .wcpt-invitation .wcpti-members .wcptim-info .cross-icon {\n        width: 12px;\n        margin-left: auto; }\n"

/***/ }),

/***/ "./src/app/Components/create-projects/create-people/create-people.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreatePeopleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__("./node_modules/ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_search_modal_user_search_modal_user_component__ = __webpack_require__("./src/app/Components/modals/search-modal-user/search-modal-user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_Projects_projects_service__ = __webpack_require__("./src/app/Services/Projects/projects.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_Pictures_pictures_service__ = __webpack_require__("./src/app/Services/Pictures/pictures.service.ts");
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



var CreatePeopleComponent = /** @class */ (function () {
    function CreatePeopleComponent(dialogService, ProjectsService, PicturesService) {
        this.dialogService = dialogService;
        this.ProjectsService = ProjectsService;
        this.PicturesService = PicturesService;
    }
    CreatePeopleComponent.prototype.ngOnInit = function () {
        this.getInviteToProject();
    };
    CreatePeopleComponent.prototype.getInviteToProject = function () {
        var _this = this;
        this.ProjectsService.getInviteToProject(this.project_id).subscribe(function (res) {
            _this.invites = res.invitations;
        });
    };
    CreatePeopleComponent.prototype.deleteInviteToProject = function (id, index) {
        var _this = this;
        this.ProjectsService.deleteInviteToProject(id, { id: id }).subscribe(function (res) {
            if (res.success)
                _this.invites.splice(index, 1);
        });
    };
    /* ShowSearchModal */
    CreatePeopleComponent.prototype.showSearchModalUser = function () {
        var _this = this;
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_2__modals_search_modal_user_search_modal_user_component__["a" /* SearchModalUserComponent */], {
            called_id: 0,
            project_id: this.project_id
        }).subscribe(function (success) {
            if (success)
                _this.getInviteToProject();
        });
    };
    /* Transform picture */
    CreatePeopleComponent.prototype.transformImage = function (url, width, height, crop) {
        return this.PicturesService.transformImage(url, width, height, crop);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], CreatePeopleComponent.prototype, "project_id", void 0);
    CreatePeopleComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-create-people',
            template: __webpack_require__("./src/app/Components/create-projects/create-people/create-people.component.html"),
            styles: [__webpack_require__("./src/app/Components/create-projects/create-people/create-people.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__Services_Projects_projects_service__["a" /* ProjectsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_Projects_projects_service__["a" /* ProjectsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__Services_Pictures_pictures_service__["a" /* PicturesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_Pictures_pictures_service__["a" /* PicturesService */]) === "function" && _c || Object])
    ], CreatePeopleComponent);
    return CreatePeopleComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=create-people.component.js.map

/***/ }),

/***/ "./src/app/Components/create-projects/create-projects.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <div id=\"page-wrap\" [@background] (click)=\"hideModal()\"></div>\n<section id=\"confirm-delete-modal\" [@dialog] class=\"align-center\">\n\t<div class=\"nm-title\">\n\t\t<h3>Confirmation</h3>\n\t\t<img src=\"/public/images/cross-icon.svg\" (click)=\"hideModal()\">\n\t</div>\n\t<p class=\"freigs\">Do you want to remove this project?</p>\n\t<div class=\"confirm-button\">\n\t\t<button>Delete project</button>\n\t</div>\n</section> -->\n\n<section id=\"w-create-project\" *ngIf=\"project && project.pictures\" cpDiv>\n\t<div class=\"wcp-head bg-default\" [ngStyle]=\"{'background-image': 'url(' + project.pictures[0] + ')'}\">\n\t\t<div class=\"filter\"></div>\n\n\t\t<div class=\"wcph-presentation align-center\">\n\t\t\t<h1 class=\"freigs\">Basics</h1>\n\t\t\t<h2 class=\"freigm\">The main informations about your project</h2>\n\t\t</div>\n\n\t\t<div class=\"wcph-navbar flex\">\n\t\t\t<div class=\"wcphn-nav flex\">\n\t\t\t\t<div class=\"nav1 flex cursor-pt\" (click)=showCreateProjectSection(1)>\n\t\t\t\t\t<span [ngClass]=\"{'nav-active': show1}\">1</span>\n\t\t\t\t\t<h4>Basics</h4>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"nav2 flex cursor-pt\" (click)=showCreateProjectSection(2)>\n\t\t\t\t\t<span [ngClass]=\"{'nav-active': show2}\">2</span>\n\t\t\t\t\t<h4>Story</h4>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"nav3 flex cursor-pt\" (click)=showCreateProjectSection(3)>\n\t\t\t\t\t<span [ngClass]=\"{'nav-active': show3}\">3</span>\n\t\t\t\t\t<h4>People</h4>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"nav4 flex cursor-pt\" (click)=showCreateProjectSection(4)>\n\t\t\t\t\t<span [ngClass]=\"{'nav-active': show4}\">4</span>\n\t\t\t\t\t<h4>Needs</h4>\n\t\t\t\t</div>\n<!-- \t\t\t\t<div class=\"nav5 flex cursor-pt\" (click)=showCreateProjectSection(5)>\n\t\t\t\t\t<span [ngClass]=\"{'nav-active': show5}\">5</span>\n\t\t\t\t\t<h4>Community</h4>\n\t\t\t\t</div> -->\n\t\t\t</div>\n\n\t\t\t<div class=\"wcphn-save flex\">\n\t\t\t\t<span class=\"freigb cursor-pt\" (click)=\"backToProject()\">Leave edit mode</span>\n\t\t\t\t<button class=\"freigm\" (click)=updateProject()>{{ buttonText }} <i class=\"fa fa-check\" *ngIf=\"buttonText === 'Saved'\"></i></button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class=\"wcp-body\">\n\n\t\t<div class=\"wcp-basics transition-200\" *ngIf=\"show1 && project\">\n\t\t\t<div class=\"wcpb-1 flex\">\n\t\t\t\t<div class=\"wcpb-info\">\n\t\t\t\t\t<div class=\"wcpbi-title flex mar-b-15\">\n\t\t\t\t\t\t<label>Project title</label>\n\t\t\t\t\t\t<input type=\"text\" name=\"title\" [(ngModel)]=\"project.title\"/>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"wcpbi-category flex mar-b-15\">\n\t\t\t\t\t\t<label>Category</label>\n\t\t\t\t\t\t<div class=\"wcpbic-box\">\n\t\t\t\t\t\t\t<input id=\"wcpbicb-i\" class=\"cursor-pt\" type=\"text\" name=\"category\" [ngModel]=\"project.category\" disabled/>\n\t\t\t\t\t\t\t<ul id=\"wcpbicb-box\" class=\"dropdown\">\n\t\t\t\t\t\t\t\t<li class=\"freigb cursor-pt\" *ngFor=\"let category of categories\" (click)=\"selectCategory(category)\">{{ category.name }}</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"wcpbi-location flex mar-b-15\">\n\t\t\t\t\t\t<label>Location</label>\n\t\t\t\t\t\t<input type=\"text\" name=\"location\" [(ngModel)]=\"displayLocation\" (setAddress)=\"getAddress($event)\" googlePlace/>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"wcpbi-description flex mar-b-15\">\n\t\t\t\t\t\t<label (click)=\"upload()\">Short Description</label>\n\t\t\t\t\t\t<textarea type=\"text\" [(ngModel)]=\"project.description\"></textarea>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"wcpb-logo flex\">\n\t\t\t\t\t<input class=\"input-file\" id=\"file\" type=\"file\" name=\"fileUpload\" ng2FileSelect [uploader]=\"uploader\" placeholder=\"\">\n\t\t\t\t\t<div *ngIf=\"uploadingLP\" class=\"spinner-load\">\n\t\t\t\t\t\t<div class=\"spinner__item1 spinner-item\"></div>\n\t\t\t\t\t\t<div class=\"spinner__item2 spinner-item\"></div>\n\t\t\t\t\t\t<div class=\"spinner__item3 spinner-item\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<label for=\"file\" ng2FileDrop [uploader]=\"uploader\" (click)=\"setPictureType('logo')\">\n\t\t\t\t\t\t<div class=\"wcpbl-preview bg-default transition-150 cursor-pt\" [ngStyle]=\"{'background-image': 'url(' + (project.logo ? 'none' : '/public/images/img-upload-grey.png') + ')'}\">\n\t\t\t\t\t\t\t<img *ngIf=\"project.logo\" [src]=\"project.logo\" alt=\"logo\" />\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</label>\n\t\t\t\t\t<div class=\"wcpbc-text\">\n\t\t\t\t\t\t<h4 class=\"freigs\">Add a logo</h4>\n\t\t\t\t\t\t<h5 class=\"freigm\">Only if you have one</h5>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<!-- <div class=\"wcpb-picture\">\n\t\t\t\t\t<div *ngIf=\"uploadingCP\" class=\"spinner-load\">\n\t\t\t\t\t\t<div class=\"spinner__item1 spinner-item\"></div>\n\t\t\t\t\t\t<div class=\"spinner__item2 spinner-item\"></div>\n\t\t\t\t\t\t<div class=\"spinner__item3 spinner-item\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<input class=\"input-file\" id=\"file\" type=\"file\" name=\"fileUpload\" ng2FileSelect [uploader]=\"uploader\" placeholder=\"\">\n\t\t\t\t\t<label for=\"file\" ng2FileDrop [uploader]=\"uploader\" (click)=\"setPictureType('cover')\">\n\t\t\t\t\t\t<div class=\"wcpbp-preview bg-default mar-b-15 cursor-pt transition-150\" [ngStyle]=\"{'background-image': 'url(' + (project.picture ? project.picture : 'public/images/img-upload-grey.png') + ')', 'background-size': project.picture ? 'cover' : '50px'}\"></div>\n\t\t\t\t\t</label>\n\t\t\t\t\t<div class=\"wcpbp-upload\">\n\t\t\t\t\t\t<label for=\"file\">\n\t\t\t\t\t\t\t<span class=\"freigb mar-b-10 cursor-pt\"><i class=\"fa fa-cloud-upload\"></i> Upload a cover picture</span>\n\t\t\t\t\t\t</label>\n\t\t\t\t\t\t<p class=\"freigm mar-t-10\">Choose a high quality picture that illustrates your project. 10Mb max</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div> -->\n\t\t\t</div>\n\n\t\t\t<div class=\"wcbp-privacy flex\">\n\t\t\t\t<p class=\"freigm\">Your project is now <strong *ngIf=\"visibility\">public</strong> <strong *ngIf=\"!visibility\">private</strong>, switch to the private mode if you want to hide it temporarly.</p>\n\t\t\t\t<ui-switch class=\"switch-button\" [(ngModel)]=\"visibility\"></ui-switch>\n\t\t\t</div>\n\n\t\t\t<div class=\"wcpb-2 flex\">\n\t\t\t\t<div class=\"wcpb-website\">\n\t\t\t\t\t<div class=\"wcpbw-link flex mar-b-15\">\n\t\t\t\t\t\t<label>Website link</label>\n\t\t\t\t\t\t<input type=\"text\" name=\"website\" placeholder=\"http://\" [(ngModel)]=\"project.link\"/>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"wcbpw-app flex mar-b-15\">\n\t\t\t\t\t\t<label>App download link</label>\n\t\t\t\t\t\t<input type=\"text\" name=\"app\" placeholder=\"App store, Google play..\" [(ngModel)]=\"project.app\"/>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<!-- <div class=\"wcpb-logo flex\">\n\t\t\t\t\t<div *ngIf=\"uploadingLP\" class=\"spinner-load\">\n\t\t\t\t\t\t<div class=\"spinner__item1 spinner-item\"></div>\n\t\t\t\t\t\t<div class=\"spinner__item2 spinner-item\"></div>\n\t\t\t\t\t\t<div class=\"spinner__item3 spinner-item\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<label for=\"file\" ng2FileDrop [uploader]=\"uploader\" (click)=\"setPictureType('logo')\">\n\t\t\t\t\t\t<div class=\"wcpbl-preview bg-default transition-150 cursor-pt\" [ngStyle]=\"{'background-image': 'url(' + (project.logo ? project.logo : 'public/images/img-upload-grey.png') + ')', 'background-size': project.logo ? 'cover' : '30px'}\"></div>\n\t\t\t\t\t</label>\n\t\t\t\t\t<div class=\"wcpbc-text\">\n\t\t\t\t\t\t<h4 class=\"freigs\">Add a logo</h4>\n\t\t\t\t\t\t<h5 class=\"freigm\">Only if you have one</h5>\n\t\t\t\t\t</div>\n\t\t\t\t</div> -->\n\t\t\t</div>\n\n\t\t\t<div class=\"wcpb-3 flex\">\n\t\t\t\t<button class=\"freigm\" (click)=\"removeProject()\">Delete this project</button>\n\t\t\t</div>\n\t\t</div>\n\t\t<app-create-story *ngIf=\"show2\" class=\"transition-200\" [project]=\"project\" (story)=\"storyChange($event)\" [admin]=\"admin\"></app-create-story>\n\n \t\t<app-create-people *ngIf=\"show3\" [project_id]=\"project.id\" ></app-create-people>\n \t\t<app-create-need *ngIf=\"show4\" [project]=\"project\"></app-create-need>\n \t</div>\n</section>\n<app-footer></app-footer>\n"

/***/ }),

/***/ "./src/app/Components/create-projects/create-projects.component.scss":
/***/ (function(module, exports) {

module.exports = "#confirm-delete-modal {\n  position: fixed;\n  top: 50%;\n  left: 0;\n  right: 0;\n  margin: 0 auto;\n  z-index: 500;\n  width: 300px;\n  border: 1px solid #e5e5e5;\n  background-color: white;\n  border-radius: 4px; }\n  #confirm-delete-modal .nm-title {\n    background-color: #fafafa;\n    text-align: left;\n    padding: 15px 20px;\n    border-bottom: 1px solid #e5e5e5;\n    border-radius: 4px; }\n  #confirm-delete-modal .nm-title h3 {\n      display: inline-block;\n      font-family: \"FreigSem\";\n      font-size: 16px;\n      color: #999; }\n  #confirm-delete-modal .nm-title img {\n      display: inline-block;\n      width: 14px;\n      float: right;\n      margin-top: 4px;\n      cursor: pointer;\n      outline: 0; }\n  #confirm-delete-modal p {\n    color: #999; }\n  #w-create-project .wcp-head {\n  position: relative;\n  height: 300px; }\n  #w-create-project .wcp-head .wcph-presentation {\n    width: 600px;\n    left: 0;\n    right: 0;\n    margin: 0 auto;\n    text-align: center; }\n  #w-create-project .wcp-head .wcph-presentation h1 {\n      font-size: 32px; }\n  #w-create-project .wcp-head .wcph-presentation h2 {\n      font-size: 21px; }\n  #w-create-project .wcp-head .wcph-navbar {\n    position: absolute;\n    bottom: 0;\n    width: 900px;\n    margin: 0 auto;\n    left: 0;\n    right: 0; }\n  #w-create-project .wcp-head .wcph-navbar .wcphn-nav .flex {\n      padding: 20px 15px; }\n  #w-create-project .wcp-head .wcph-navbar .wcphn-nav h4, #w-create-project .wcp-head .wcph-navbar .wcphn-nav span {\n      font-family: 'FreigSem';\n      font-size: 16px; }\n  #w-create-project .wcp-head .wcph-navbar .wcphn-nav span {\n      margin-right: 5px;\n      padding: 0 9px 2px 9px;\n      background-color: black;\n      border-radius: 50%; }\n  #w-create-project .wcp-head .wcph-navbar .wcphn-nav .nav-active {\n      background-color: white;\n      color: #222; }\n  #w-create-project .wcp-head .wcph-navbar .wcphn-nav .nav1:hover span {\n      background-color: white;\n      color: #222; }\n  #w-create-project .wcp-head .wcph-navbar .wcphn-nav .nav2:hover span {\n      background-color: white;\n      color: #222; }\n  #w-create-project .wcp-head .wcph-navbar .wcphn-nav .nav3:hover span {\n      background-color: white;\n      color: #222; }\n  #w-create-project .wcp-head .wcph-navbar .wcphn-nav .nav4:hover span {\n      background-color: white;\n      color: #222; }\n  #w-create-project .wcp-head .wcph-navbar .wcphn-nav .nav5:hover span {\n      background-color: white;\n      color: #222; }\n  #w-create-project .wcp-head .wcph-navbar .wcphn-save {\n      margin-left: auto; }\n  #w-create-project .wcp-head .wcph-navbar .wcphn-save span {\n        margin-right: 20px; }\n  #w-create-project .wcp-head .wcph-navbar .wcphn-save button {\n        font-size: 16px;\n        padding: 5px 20px 6px 20px; }\n  #w-create-project .wcp-body label {\n  font-family: 'FreigSem';\n  font-size: 16px;\n  color: #999999;\n  width: 150px; }\n  #w-create-project .wcp-body input {\n  padding: 8px 10px;\n  color: #222;\n  margin: 0;\n  border: 1px solid #e5e5e5;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1; }\n  #w-create-project .wcp-body textarea {\n  border-radius: 4px;\n  width: inherit;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1; }\n  #w-create-project .wcp-body .wcp-basics {\n  width: 900px;\n  margin: 0 auto;\n  padding: 60px 0; }\n  #w-create-project .wcp-body .wcp-basics .wcpb-1 {\n    margin-bottom: 50px;\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    /*.wcpb-picture {\n\t\t\t\t\t.wcpbp-preview {\n\t\t\t\t\t\theight: 180px;\n\t\t\t\t\t    width: 300px;\n\t\t\t\t\t    margin-left: auto;\n\t\t\t\t\t    background-size: 50px;\n\t\t\t\t\t    border: 2px dashed #e5e5e5;\n\t\t\t\t\t    border-radius: 2px;\n\t\t\t\t\t}\n\n\t\t\t\t\t.wcpbp-preview:hover {\n\t\t\t\t\t\tborder: 2px dashed #999999;\n\t\t\t\t\t}\n\n\t\t\t\t\t.wcpbp-upload {\n\t\t\t\t\t\ttext-align: center;\n\n\t\t\t\t\t\tp {\n\t\t\t\t\t\t\tfont-size: 14px;\n\t\t\t\t\t\t\tcolor: #999999;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tspan {\n\t\t\t\t\t\t\tcolor: #FF4D4D;\n\n\t\t\t\t\t\t\t.fa-cloud-upload {\n\t\t\t\t\t\t\t\tcolor: #FF4D4D;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}*/ }\n  #w-create-project .wcp-body .wcp-basics .wcpb-1 .wcpb-logo .wcpbl-preview {\n      height: 80px;\n      width: 80px;\n      margin-left: 20px;\n      background-size: 30px;\n      border: 2px dashed #e5e5e5;\n      border-radius: 2px;\n      margin-right: 30px;\n      border-radius: 4px;\n      background-image: url(\"/public/images/img-upload-grey.png\");\n      background-size: 30px; }\n  #w-create-project .wcp-body .wcp-basics .wcpb-1 .wcpb-logo .wcpbl-preview img {\n        width: inherit;\n        height: inherit;\n        border-radius: 4px; }\n  #w-create-project .wcp-body .wcp-basics .wcpb-1 .wcpb-logo .wcpbl-preview:hover {\n      border: 2px dashed #999999; }\n  #w-create-project .wcp-body .wcp-basics .wcpb-1 .wcpb-logo .wcpbc-text h4, #w-create-project .wcp-body .wcp-basics .wcpb-1 .wcpb-logo .wcpbc-text h5 {\n      color: #999999; }\n  #w-create-project .wcp-body .wcp-basics .wcpb-1 .wcpb-logo .wcpbc-text h5 {\n      font-size: 14px; }\n  #w-create-project .wcp-body .wcp-basics .wcbp-privacy {\n    margin-bottom: 40px; }\n  #w-create-project .wcp-body .wcp-basics .wcbp-privacy p {\n      color: #999; }\n  #w-create-project .wcp-body .wcp-basics .wcbp-privacy .switch-button {\n      position: relative;\n      margin-left: 40px;\n      top: 2px; }\n  #w-create-project .wcp-body .wcp-basics .wcpb-2 {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    /*.wcpb-logo {\n\t\t\t\t\t.wcpbl-preview {\n\t\t\t\t\t\theight: 80px;\n\t\t\t\t\t    width: 80px;\n\t\t\t\t\t    margin-left: 20px;\n\t\t\t\t\t    background-size: 30px;\n\t\t\t\t\t    border: 2px dashed #e5e5e5;\n\t\t\t\t\t    border-radius: 2px;\n\t\t\t\t\t    margin-right: 30px;\n\t\t\t\t\t}\n\n\t\t\t\t\t.wcpbl-preview:hover {\n\t\t\t\t\t\tborder: 2px dashed #999999;\n\t\t\t\t\t}\n\n\t\t\t\t\t.wcpbc-text {\n\t\t\t\t\t\th4, h5 {\n\t\t\t\t\t\t\tcolor: #999999;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\th5 {\n\t\t\t\t\t\t\tfont-size: 14px;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}*/ }\n  #w-create-project .wcp-body .wcp-basics .wcpb-3 {\n    padding: 100px 30px 20px 30px;\n    text-align: center; }\n  #w-create-project .wcp-body .wcp-basics .wcpb-3 button {\n      display: block;\n      margin: 0 auto;\n      background-color: #e5e5e5; }\n  #w-create-project .wcp-body .wcp-basics .wcpb-3 button:hover {\n      background-color: #999999; }\n  #w-create-project .wcp-body .wcp-basics .wcpb-info, #w-create-project .wcp-body .wcp-basics .wcpb-website {\n    width: 65%;\n    padding-right: 30px; }\n  #w-create-project .wcp-body .wcp-basics .wcpb-info .wcpbi-location input, #w-create-project .wcp-body .wcp-basics .wcpb-website .wcpbi-location input {\n      background: url(\"/public/images/location-picto.svg\") 3% 50% no-repeat #fff;\n      padding-left: 33px; }\n  #w-create-project .wcp-body .wcp-basics .wcpb-info .wcpbi-category, #w-create-project .wcp-body .wcp-basics .wcpb-website .wcpbi-category {\n      position: relative; }\n  #w-create-project .wcp-body .wcp-basics .wcpb-info .wcpbi-category .wcpbic-box, #w-create-project .wcp-body .wcp-basics .wcpb-website .wcpbi-category .wcpbic-box {\n        -webkit-box-flex: 2;\n            -ms-flex-positive: 2;\n                flex-grow: 2; }\n  #w-create-project .wcp-body .wcp-basics .wcpb-info .wcpbi-category .wcpbic-box input, #w-create-project .wcp-body .wcp-basics .wcpb-website .wcpbi-category .wcpbic-box input {\n          width: 100%;\n          background-image: url(\"/public/images/arrow-down-icon-b.svg\");\n          background-repeat: no-repeat;\n          background-position: 95%; }\n  #w-create-project .wcp-body .wcp-basics .wcpb-info .wcpbi-category .wcpbic-box .dropdown, #w-create-project .wcp-body .wcp-basics .wcpb-website .wcpbi-category .wcpbic-box .dropdown {\n          padding: 5px;\n          border: 1px solid #e5e5e5;\n          border-radius: 8px;\n          position: absolute;\n          background-color: #fff;\n          -webkit-column-count: 3;\n                  column-count: 3;\n          display: none; }\n  #w-create-project .wcp-body .wcp-basics .wcpb-info .wcpbi-category .wcpbic-box .dropdown li, #w-create-project .wcp-body .wcp-basics .wcpb-website .wcpbi-category .wcpbic-box .dropdown li {\n            color: #222;\n            padding: 5px 15px; }\n  #w-create-project .wcp-body .wcp-basics .wcpb-info .wcpbi-category .wcpbic-box .dropdown li:hover, #w-create-project .wcp-body .wcp-basics .wcpb-website .wcpbi-category .wcpbic-box .dropdown li:hover {\n            border-radius: 2px;\n            background-color: #e5e5e5; }\n  #w-create-project .wcp-body .wcp-basics .wcpb-picture, #w-create-project .wcp-body .wcp-basics .wcpb-logo {\n    width: 35%; }\n  #w-create-project .wcp-body .wcp-basics .wcpb-picture .spinner-load {\n    height: 185px;\n    width: 305px; }\n  #w-create-project .wcp-body .wcp-basics .wcpb-logo .spinner-load {\n    width: 85px;\n    height: 84px;\n    margin-left: 20px; }\n"

/***/ }),

/***/ "./src/app/Components/create-projects/create-projects.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateProjectsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cloudinary__ = __webpack_require__("./node_modules/ng2-cloudinary/dist/esm/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_Projects_projects_service__ = __webpack_require__("./src/app/Services/Projects/projects.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_Pictures_pictures_service__ = __webpack_require__("./src/app/Services/Pictures/pictures.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Interfaces_Constants_categories_constant__ = __webpack_require__("./src/app/Interfaces/Constants/categories-constant.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Animations_animations__ = __webpack_require__("./src/app/Animations/animations.ts");
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



// import { UploadService } from '../../Services/Upload/upload.service';
/* Interface */

/* Animations */

var CreateProjectsComponent = /** @class */ (function () {
    function CreateProjectsComponent(ProjectsService, TokenService, route, router, PicturesService) {
        var _this = this;
        this.ProjectsService = ProjectsService;
        this.TokenService = TokenService;
        this.route = route;
        this.router = router;
        this.PicturesService = PicturesService;
        this.admin = false;
        this.show1 = true;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;
        this.uploadingCP = false;
        this.uploadingLP = false;
        this.project = {};
        this.buttonText = 'Save';
        this.visibility = true;
        this.categories = __WEBPACK_IMPORTED_MODULE_6__Interfaces_Constants_categories_constant__["a" /* categories */];
        this.start = 0;
        this.uploader = new __WEBPACK_IMPORTED_MODULE_2_ng2_cloudinary__["b" /* CloudinaryUploader */](new __WEBPACK_IMPORTED_MODULE_2_ng2_cloudinary__["a" /* CloudinaryOptions */]({ cloudName: 'dqpkpmrgk', uploadPreset: 'z7rzegb5', autoUpload: true }));
        this.route.queryParams.subscribe(function (params) {
            if (params['id']) {
                if (params['start'] == 1)
                    _this.buttonText = 'Next';
                _this.initProject(params['id']);
            }
            else
                _this.router.navigate(['/']);
        });
        this.imageUpload();
    }
    CreateProjectsComponent.prototype.ngOnInit = function () {
    };
    /* INIT PROJECT */
    CreateProjectsComponent.prototype.initProject = function (public_id) {
        var _this = this;
        this.ProjectsService.getProject(public_id).subscribe(function (res) {
            if (!res.project)
                return _this.router.navigate(['/']);
            _this.project = res.project;
            _this.visibility = _this.project.project_visibility;
            if (_this.project.state)
                _this.displayLocation = _this.project.city + ', ' + _this.project.state + ', ' + _this.project.country;
            else
                _this.displayLocation = _this.project.city + ', ' + _this.project.country;
            if (_this.TokenService.getToken()) {
                var token = _this.TokenService.getToken();
                _this.admin = token.user.moderator ? true : false;
                if (token.user.id !== _this.project['profile_id'] && !_this.admin)
                    _this.router.navigate(['/']);
            }
            else
                _this.router.navigate(['/']);
        });
    };
    /* UPLOAD */
    CreateProjectsComponent.prototype.imageUpload = function () {
        var _this = this;
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            _this.cloudinaryImage = JSON.parse(response);
            if (_this.pictureType === 'cover')
                _this.project.picture = _this.cloudinaryImage.secure_url;
            else {
                _this.PicturesService.uploadPicture('project', 'logo', { url: _this.cloudinaryImage.secure_url })
                    .subscribe(function (res) {
                    if (res.picture)
                        _this.project.logo = res.picture;
                });
            }
            _this.uploadingCP = _this.uploadingLP = false;
        };
        this.uploader.onAfterAddingFile = function (fileItem) {
            if (_this.pictureType === 'cover')
                _this.uploadingCP = true;
            else
                _this.uploadingLP = true;
            _this.uploader.uploadAll();
        };
        this.uploader.onProgressItem = function (fileItem, progress) {
            console.log(progress);
        };
    };
    CreateProjectsComponent.prototype.setPictureType = function (type) {
        this.pictureType = type;
    };
    CreateProjectsComponent.prototype.storyChange = function (event) {
        this.project['1st_description'] = event.resume_1;
        this.project['2nd_description'] = event.resume_2;
        this.project.video = event.video;
        this.project.pictures = event.pictures;
    };
    CreateProjectsComponent.prototype.getAddress = function (place) {
        this.long = place['geometry'].location.lat();
        this.lat = place['geometry'].location.lng();
        this.location = place['formatted_address'].replace('USA', 'United States');
    };
    CreateProjectsComponent.prototype.selectCategory = function (category) {
        this.project.category = category.name;
    };
    CreateProjectsComponent.prototype.getCategoryIndex = function (category) {
        if (category) {
            var length = __WEBPACK_IMPORTED_MODULE_6__Interfaces_Constants_categories_constant__["a" /* categories */].length;
            for (var i = 0; i < length; i++) {
                if (__WEBPACK_IMPORTED_MODULE_6__Interfaces_Constants_categories_constant__["a" /* categories */][i].name === category)
                    return __WEBPACK_IMPORTED_MODULE_6__Interfaces_Constants_categories_constant__["a" /* categories */][i].id;
            }
            return 0;
        }
        else
            return 0;
    };
    /* UPDATE PROJECT */
    CreateProjectsComponent.prototype.updateProject = function () {
        var _this = this;
        this.ProjectsService.updateProject(this.project['id'], this.checkBody()).subscribe(function (res) {
            if (res.success) {
                if (_this.buttonText === 'Save') {
                    _this.buttonText = 'Saved';
                    setTimeout(function () {
                        _this.buttonText = 'Save';
                    }, 2000);
                }
                else
                    _this.showNextSection(_this.start);
            }
        });
    };
    CreateProjectsComponent.prototype.removeProject = function () {
        var _this = this;
        this.ProjectsService.deleteProject(this.project['id'], {}).subscribe(function (res) {
            if (res.success)
                return _this.router.navigate(['/']);
        });
    };
    CreateProjectsComponent.prototype.checkBody = function () {
        var locationArray = this.checkLocation(this.displayLocation) || [];
        var body = {
            title: this.project.title || '',
            category_id: this.getCategoryIndex(this.project.category),
            desc_1: this.replaceNewline(this.project['1st_description']) || 'd',
            desc_2: this.replaceNewline(this.project['2nd_description']) || 'd',
            picture: this.project.pictures[0],
            pictures: this.project.pictures || [],
            description: this.project.description || '',
            about: this.project.about,
            video: this.project.video,
            project_visibility: this.visibility = this.visibility ? true : false,
            link: this.project.link || '',
            app: this.project.app || '',
            logo: this.project.logo,
            location: {
                city: locationArray[0],
                state: locationArray[1],
                country: locationArray[locationArray.length - 1],
                lng: this.long,
                lat: this.lat
            }
        };
        this.location = '';
        return body;
    };
    CreateProjectsComponent.prototype.checkLocation = function (location) {
        if (this.location)
            return this.location.split(', ');
        else
            return location.split(', ');
    };
    CreateProjectsComponent.prototype.replaceNewline = function (text) {
        return text.replace(/\r?\n/g, '<br />');
    };
    /* ROUTING */
    CreateProjectsComponent.prototype.backToProject = function () {
        this.router.navigate(['/project', this.project['public_id'], this.project['title'].replace(/ /g, '-')]);
    };
    CreateProjectsComponent.prototype.hideAllShow = function () {
        this.show1 = this.show2 = this.show3 = this.show4 = this.show5 = false;
    };
    /* SHOW SECTION */
    CreateProjectsComponent.prototype.showCreateProjectSection = function (index) {
        this.hideAllShow();
        if (index === 1) {
            this.show1 = true;
        }
        else if (index === 2) {
            this.show2 = true;
        }
        else if (index === 3) {
            this.show3 = true;
        }
        else if (index === 4) {
            this.show4 = true;
            this.buttonText = 'Publish';
        }
    };
    CreateProjectsComponent.prototype.showNextSection = function (index) {
        if (this.show1) {
            this.show1 = false;
            this.show2 = true;
        }
        else if (this.show2) {
            this.show2 = false;
            this.show3 = true;
        }
        else if (this.show3) {
            this.show3 = false;
            this.show4 = true;
            this.buttonText = 'Publish';
        }
        else {
            this.router.navigate([
                '/project', this.project.public_id, this.project.title.replace(/ /g, '-')
            ]);
        }
    };
    CreateProjectsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-create-projects',
            template: __webpack_require__("./src/app/Components/create-projects/create-projects.component.html"),
            styles: [__webpack_require__("./src/app/Components/create-projects/create-projects.component.scss")],
            animations: [__WEBPACK_IMPORTED_MODULE_7__Animations_animations__["d" /* dialog */], __WEBPACK_IMPORTED_MODULE_7__Animations_animations__["a" /* background */]],
            providers: [__WEBPACK_IMPORTED_MODULE_3__Services_Projects_projects_service__["a" /* ProjectsService */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__Services_Projects_projects_service__["a" /* ProjectsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_Projects_projects_service__["a" /* ProjectsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__Services_Authentication_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_Authentication_token_service__["a" /* TokenService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__Services_Pictures_pictures_service__["a" /* PicturesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_Pictures_pictures_service__["a" /* PicturesService */]) === "function" && _e || Object])
    ], CreateProjectsComponent);
    return CreateProjectsComponent;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=create-projects.component.js.map

/***/ }),

/***/ "./src/app/Components/create-projects/create-projects.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateProjectsModule", function() { return CreateProjectsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__ = __webpack_require__("./src/app/Pipes/pipe.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__footer_footer_module__ = __webpack_require__("./src/app/Components/footer/footer.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modals_modal_module__ = __webpack_require__("./src/app/Components/modals/modal.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Directives_directives_module__ = __webpack_require__("./src/app/Directives/directives.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__create_projects_component__ = __webpack_require__("./src/app/Components/create-projects/create-projects.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__create_story_create_story_component__ = __webpack_require__("./src/app/Components/create-projects/create-story/create-story.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__create_people_create_people_component__ = __webpack_require__("./src/app/Components/create-projects/create-people/create-people.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__create_need_create_need_component__ = __webpack_require__("./src/app/Components/create-projects/create-need/create-need.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__create_community_create_community_component__ = __webpack_require__("./src/app/Components/create-projects/create-community/create-community.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__modals_search_modal_user_search_modal_user_component__ = __webpack_require__("./src/app/Components/modals/search-modal-user/search-modal-user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__modals_need_modal_need_modal_component__ = __webpack_require__("./src/app/Components/modals/need-modal/need-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angular2_froala_wysiwyg__ = __webpack_require__("./node_modules/angular2-froala-wysiwyg/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ng2_cloudinary__ = __webpack_require__("./node_modules/ng2-cloudinary/dist/esm/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_ng2_file_upload__ = __webpack_require__("./node_modules/ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angular2_ui_switch__ = __webpack_require__("./node_modules/angular2-ui-switch/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__Routes_create_project_routes__ = __webpack_require__("./src/app/Routes/create-project.routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




/* Custom Modules */




/* Components */







/* Libraries */




/* Route */

var cloudinaryConfiguration = {
    cloud_name: 'dqpkpmrgk',
    upload_preset: 'z7rzegb5'
};
var CreateProjectsModule = /** @class */ (function () {
    function CreateProjectsModule() {
    }
    CreateProjectsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_19__Routes_create_project_routes__["a" /* CREATE_PROJECT_ROUTES */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["f" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__["a" /* PipeModule */],
                __WEBPACK_IMPORTED_MODULE_5__footer_footer_module__["a" /* FooterModule */],
                __WEBPACK_IMPORTED_MODULE_6__modals_modal_module__["a" /* ModalModule */],
                __WEBPACK_IMPORTED_MODULE_7__Directives_directives_module__["a" /* DirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_17_ng2_file_upload__["FileUploadModule"],
                __WEBPACK_IMPORTED_MODULE_16_ng2_cloudinary__["c" /* Ng2CloudinaryModule */],
                __WEBPACK_IMPORTED_MODULE_18_angular2_ui_switch__["a" /* UiSwitchModule */],
                __WEBPACK_IMPORTED_MODULE_15_angular2_froala_wysiwyg__["a" /* FroalaEditorModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_15_angular2_froala_wysiwyg__["b" /* FroalaViewModule */].forRoot(),
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__create_projects_component__["a" /* CreateProjectsComponent */],
                __WEBPACK_IMPORTED_MODULE_9__create_story_create_story_component__["a" /* CreateStoryComponent */],
                __WEBPACK_IMPORTED_MODULE_10__create_people_create_people_component__["a" /* CreatePeopleComponent */],
                __WEBPACK_IMPORTED_MODULE_11__create_need_create_need_component__["a" /* CreateNeedComponent */],
                __WEBPACK_IMPORTED_MODULE_12__create_community_create_community_component__["a" /* CreateCommunityComponent */]
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_13__modals_search_modal_user_search_modal_user_component__["a" /* SearchModalUserComponent */],
                __WEBPACK_IMPORTED_MODULE_14__modals_need_modal_need_modal_component__["a" /* NeedModalComponent */]
            ],
            providers: []
        })
    ], CreateProjectsModule);
    return CreateProjectsModule;
}());

//# sourceMappingURL=create-projects.module.js.map

/***/ }),

/***/ "./src/app/Components/create-projects/create-story/create-story.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <section class=\"wcp-video\">\n\t<div class=\"wcps-size\">\n\t\t<div class=\"wcps-video flex\">\n\t\t\t<div class=\"wcpsv-text\">\n\t\t\t\t<h2 class=\"freigs\">Project video</h2>\n\t\t\t\t<h3 class=\"freigm\">Projects with video get a lot more<br /> attention.<br />\n\t\t\t\tOptional, but highly<br /> recommended.</h3>\n\t\t\t</div>\n\n\t\t\t<div class=\"wcpsv-upload\">\n\t\t\t\t<video *ngIf=\"currentVideo\" class=\"wpjbc-video\" width=\"560\" controls>\n\t\t\t\t\t<source [src]=\"currentVideo\" type=\"video/mp4\">\n\t\t\t\t</video>\n\t\t\t\t<div *ngIf=\"currentVideo\" class=\"delete-video\">\n\t\t\t\t\t<p class=\"freigm cursor-pt\" (click)=\"removeVideo()\">Delete video <i class=\"fa fa-trash\"></i></p>\n\t\t\t\t</div>\n\t\t\t\t<input id=\"video\" class=\"input-file\" type=\"file\" name=\"video-file\" ng2FileSelect [uploader]=\"uploader\" [disabled]=\"uploading\"/>\n\t\t\t\t<label *ngIf=\"!currentVideo\" for=\"video\">\n\t\t\t\t\t<div class=\"upload-video bg-default transition-200 cursor-pt\">\n\t\t\t\t\t\t<div class=\"upload-video-text align-center\">\n\t\t\t\t\t\t\t<img src=\"/public/images/video-upload-big.png\">\n\t\t\t\t\t\t\t<h4 class=\"freigs\"><i class=\"fa fa-cloud-upload\"></i> Upload a video</h4>\n\t\t\t\t\t\t\t<h5 class=\"freigs\">100Mb max, AVI, MPEG or MP4 format</h5>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"spinner-load\" *ngIf=\"uploading\">\n\t\t\t\t\t\t\t<div class=\"spinner__item1 spinner-item\"></div>\n\t\t\t\t\t\t\t<div class=\"spinner__item2 spinner-item\"></div>\n\t\t\t\t\t\t\t<div class=\"spinner__item3 spinner-item\"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</label>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</section>\n -->\n\n<section class=\"stories flex\">\n\n\t<section class=\"wcp-story\">\n\t\t<div class=\"wcps-1 mar-b-15\">\n\t\t\t<h3 class=\"freigs\">How do you describe your project?</h3>\n\t\t\t<p class=\"freigb mar-b-5\">Give us some details about what you're doing. Think about a way to explain it to your mother</p>\n\t\t\t<textarea [(ngModel)]=\"resume_1\" (ngModelChange)=\"onChange('resume_1', $event)\"></textarea>\n\t\t</div>\n\n\t\t<div class=\"wcps-2 mar-b-15\">\n\t\t\t<h3 class=\"freigs\">Why are you doing that?</h3>\n\t\t\t<p class=\"freigb mar-b-5\">Tell us why that you're building is worth sharing. Is there a need? a pain? is that your dream? (500 characters max).</p>\n\t\t\t<textarea [(ngModel)]=\"resume_2\" (ngModelChange)=\"onChange('resume_2', $event)\"></textarea>\n\t\t</div>\n\n\t\t<div class=\"wcps-3\">\n\t\t\t<h3 class=\"freigs\">Project video</h3>\n\t\t\t<p class=\"freigb mar-b-5\">Projects with video get a lot more attention. Optional, but highly recommanded</p>\n\t\t\t<div class=\"wcps-3-media wcps-3-video cursor-pt\">\n\t\t\t\t<div class=\"filter-block transition-150\" *ngIf=\"!video\">\n\t\t\t\t\t<input class=\"input-file\" id=\"file\" type=\"file\" name=\"fileUpload\" ng2FileSelect [uploader]=\"uploader\" placeholder=\"\">\n\t\t\t\t\t<div class=\"media-filter transition-150\"></div>\n\t\t\t\t\t<img class=\"icon-image align-center\" src=\"/public/images/icon-media-video-b.svg\" alt=\"media-play\">\n\t\t\t\t\t<label class=\"label-media cursor-pt\" for=\"file\" ng2FileDrop (click)=\"setMediaType('video')\"></label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"filter-remove-block\" *ngIf=\"video\" (click)=\"removeVideo()\">\n\t\t\t\t\t<img class=\"align-center play-button\" src=\"/public/images/play-button.svg\" alt=\"play-button\" />\n\t\t\t\t\t<div class=\"media-filter-remove transition-150\"></div>\n\t\t\t\t\t<span class=\"align-center freigs transition-150\">Remove</span>\n\t\t\t\t\t<video muted *ngIf=\"video\">\n\t\t\t\t\t\t<source [src]=\"video\" type=\"video/mp4\" />\n\t\t\t\t\t</video>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"wcps-4\">\n\t\t\t<h3 class=\"freigs\">Pictures</h3>\n\t\t\t<p class=\"freigb mar-b-5\">Post the pictures that best illustrates the project you're working on</p>\n\t\t\t<div class=\"wcps-3-picture cursor-pt flex\">\n\t\t\t\t<div class=\"wcps-3-media-picture mar-r-15\" *ngFor=\"let picture of pictures; let i = index\">\n\t\t\t\t\t<img [src]=\"transformImage(picture, 150, 100, 'fill')\" alt=\"project_picture\" />\n\t\t\t\t\t<div class=\"filter-remove-block\" (click)=\"removePictures(i)\">\n\t\t\t\t\t\t<div class=\"media-filter-remove transition-150\"></div>\n\t\t\t\t\t\t<span class=\"align-center freigs transition-150\">Remove</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"filter-block-picture transition-150\">\n\t\t\t\t\t<input class=\"input-file\" id=\"file2\" type=\"file\" name=\"fileUpload\" ng2FileSelect [uploader]=\"uploader\" placeholder=\"\">\n\t\t\t\t\t<div class=\"media-filter transition-150\"></div>\n\t\t\t\t\t<img class=\"icon-image align-center transition-150\" src=\"/public/images/icon-media-picture-b.svg\" alt=\"media-play\">\n\t\t\t\t\t<label class=\"label-media cursor-pt\" for=\"file2\" ng2FileDrop (click)=\"setMediaType('pictures')\"></label>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</section>\n\n\t<section class=\"wcp-story2\" *ngIf=\"admin\">\n\t\t<div class=\"wcps-text\">\n\t\t\t<div class=\"wcpst-text\">\n\t\t\t\t<h2 class=\"freigs\">Story</h2>\n\t\t\t\t<h3 class=\"freigm\">You will find here a suggestion of structure but feel free to adapt it to your project.</h3>\n\t\t\t</div>\n\n\t\t\t<div class=\"wcpst-editor flex\">\n\t\t\t\t<div class=\"wcpste-area\">\n\t\t\t\t\t<div class=\"froalaText froala-custom\" [froalaEditor]='options' [(ngModel)]=\"editorContent\" (ngModelChange)=\"onChange($event)\"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</section>\n</section>\n"

/***/ }),

/***/ "./src/app/Components/create-projects/create-story/create-story.component.scss":
/***/ (function(module, exports) {

module.exports = ".stories {\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start; }\n\n.wcp-story {\n  width: 900px;\n  margin: 0 auto;\n  padding: 40px 30px 80px 30px; }\n\n.wcp-story h3 {\n    color: #222;\n    font-size: 18px; }\n\n.wcp-story p {\n    color: #999; }\n\n.wcp-story textarea {\n    border-radius: 4px;\n    width: 700px;\n    padding: 10px 25px;\n    min-height: 120px;\n    line-height: 23px; }\n\n.wcp-story video {\n    position: absolute;\n    width: inherit;\n    top: 0;\n    right: 0;\n    left: 0; }\n\n.wcp-story label {\n    position: absolute;\n    width: inherit;\n    height: inherit;\n    top: 0;\n    left: 0; }\n\n.wcp-story .wcps-3, .wcp-story .wcps-4 {\n    margin-bottom: 30px; }\n\n.wcp-story .wcps-3 p, .wcp-story .wcps-4 p {\n      margin-bottom: 25px; }\n\n.wcp-story .wcps-3-media-picture, .wcp-story .filter-block-picture {\n    width: 150px;\n    height: 100px;\n    position: relative;\n    border: 1px solid #e5e5e5;\n    border-radius: 4px; }\n\n.wcp-story .filter-block-picture image, .wcp-story .filter-block image {\n    width: 40px; }\n\n.wcp-story .filter-block-picture:hover img, .wcp-story .filter-block:hover img {\n    width: 38px; }\n\n.wcp-story .wcps-3-media-picture img {\n    width: inherit;\n    height: inherit;\n    border-radius: inherit; }\n\n.wcp-story .filter-block, .wcp-story .filter-remove-block {\n    position: absolute;\n    width: inherit;\n    height: inherit;\n    top: 0;\n    border-radius: inherit;\n    text-align: center;\n    z-index: 100; }\n\n.wcp-story .filter-block .play-button, .wcp-story .filter-remove-block .play-button {\n      width: 15px;\n      margin: 0 auto;\n      top: 50%;\n      z-index: 1; }\n\n.wcp-story .filter-block span, .wcp-story .filter-remove-block span {\n      left: 0;\n      width: 100%;\n      opacity: 0;\n      z-index: 100; }\n\n.wcp-story .media-filter, .wcp-story .media-filter-remove {\n    background-color: #fff;\n    opacity: 0.2;\n    width: inherit;\n    height: inherit;\n    border-radius: inherit; }\n\n.wcp-story .media-filter-remove {\n    position: absolute;\n    background-color: #222;\n    opacity: 0;\n    z-index: 100; }\n\n.wcp-story .wcps-3-media {\n    position: relative;\n    width: 150px;\n    height: 100px;\n    border: 1px solid #e5e5e5;\n    border-radius: 4px;\n    overflow: hidden; }\n\n.wcp-story .icon-image {\n    display: block;\n    left: 0;\n    right: 0;\n    margin: 0 auto; }\n\n.wcp-story .filter-remove-block:hover .media-filter-remove {\n    opacity: 0.5; }\n\n.wcp-story .filter-remove-block:hover span {\n    opacity: 1; }\n\n.wcp-story .wcps-3-media-picture:hover .media-filter-remove {\n    opacity: 0.5; }\n\n.wcp-story .wcps-3-media-picture:hover span {\n    opacity: 1; }\n\n/*h2 {\n\tfont-size: 18px;\n\tcolor: #222;\n}\n\nh3 {\n\tfont-size: 16px;\n\tcolor: #999999;\n}\n\n.wcp-video {\n\tbackground-color: #fafafa;\n\tborder-bottom: 1px solid #e5e5e5;\n\n\t.wcps-size {\n\t\twidth: 900px;\n\t\tmargin: 0 auto;\n\t\tpadding: 40px 0;\n\n\t\t.wcps-video {\n\t\t\talign-items: flex-start;\n\n\t\t\t.wcpsv-text {\n\t\t\t\twidth: 30%;\n\t\t\t}\n\n\t\t\t.wcpsv-upload {\n\t\t\t\twidth: 70%;\n\n\t\t\t\t.delete-video {\n\t\t\t\t\ttext-align: center;\n\n\t\t\t\t\tp {\n\t\t\t\t\t\tcolor: #999;\n\t\t\t\t\t}\n\n\t\t\t\t\tp:hover {\n\t\t\t\t\t\tcolor: #FF4D4D;\n\t\t\t\t\t}\n\t\t\t\t}\n\n\n\t\t\t\t.upload-video:hover {\n\t\t\t\t\tborder: 2px dashed #999;\n\t\t\t\t}\n\n\t\t\t\t.upload-video {\n\t\t\t\t\tposition: relative;\n\t\t\t\t\theight: 140px;\n\t\t\t\t\tborder: 2px dashed #e5e5e5;\n\t\t\t\t    border-radius: 4px;\n\n\t\t\t\t    .upload-video-text {\n\t\t\t\t    \tposition: absolute;\n\t\t\t\t    \twidth: 400px;\n\t\t\t\t    \tleft: 0;\n\t\t\t\t    \tright: 0;\n\t\t\t\t    \tmargin: 0 auto;\n\t\t\t\t    \ttext-align: center;\n\n\t\t\t\t    \timg {\n\t\t\t\t    \t\twidth: 30px;\n\t\t\t\t    \t}\n\n\t\t\t\t    \th4 {\n\t\t\t\t    \t\tcolor: #FF4D4D;\n\t\t\t\t    \t}\n\n\t\t\t\t    \th5 {\n\t\t\t\t    \t\tcolor: #999999;\n\t\t\t\t    \t}\n\t\t\t\t    }\n\n\t\t\t\t    .spinner-load {\n\t\t\t\t    \tbackground-color: rgba(0, 0, 0, 0.2);\n\t\t\t\t    }\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n*/\n\n.wcp-story2 {\n  width: 900px;\n  margin: 0 auto;\n  padding: 40px 0; }\n\n.wcp-story2 .wcps-text .wcpst-text {\n    margin-bottom: 20px; }\n\n.wcp-story2 .wcps-text .wcpst-editor {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    /*\t.wcpste-simple {\n\t\t\t\twidth: 40%;\n\n\t\t\t\th1 {\n\t\t\t\t\tfont-size: 18px;\n\t\t\t\t}\n\n\t\t\t\th1, p {\n\t\t\t\t\tcolor: #999;\n\t\t\t\t}\n\t\t\t}*/ }\n\n.wcp-story2 .wcps-text .wcpst-editor h1, .wcp-story2 .wcps-text .wcpst-editor p {\n      color: #222; }\n\n.wcp-story2 .wcps-text .wcpst-editor h1 {\n      font-size: 28px; }\n\n.wcp-story2 .wcps-text .wcpst-editor .wcpste-area {\n      width: 100%;\n      padding-right: 30px; }\n\n.wcp-story2 .wcps-text .wcpst-editor .wcpste-area textarea {\n        height: 360px;\n        border-radius: 4px; }\n"

/***/ }),

/***/ "./src/app/Components/create-projects/create-story/create-story.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateStoryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_cloudinary__ = __webpack_require__("./node_modules/ng2-cloudinary/dist/esm/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_Pictures_pictures_service__ = __webpack_require__("./src/app/Services/Pictures/pictures.service.ts");
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

var CreateStoryComponent = /** @class */ (function () {
    function CreateStoryComponent(PicturesService) {
        this.PicturesService = PicturesService;
        this.story = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.pictures = [];
        this.options = {
            placeholderText: 'Edit Your Content Here!',
            events: {
                'froalaEditor.focus': function (e, editor) {
                }
            }
        };
        this.uploader = new __WEBPACK_IMPORTED_MODULE_1_ng2_cloudinary__["b" /* CloudinaryUploader */](new __WEBPACK_IMPORTED_MODULE_1_ng2_cloudinary__["a" /* CloudinaryOptions */]({ cloudName: 'dqpkpmrgk', uploadPreset: 'z7rzegb5', autoUpload: true }));
        this.uploadMedia();
    }
    CreateStoryComponent.prototype.ngOnInit = function () {
        this.initVariable();
    };
    CreateStoryComponent.prototype.initVariable = function () {
        this.resume_1 = this.project['1st_description'];
        this.resume_2 = this.project['2nd_description'];
        this.video = this.project['video'];
        this.pictures = this.project['pictures'];
        this.editorContent = this.project['about'];
    };
    CreateStoryComponent.prototype.uploadMedia = function () {
        var _this = this;
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            _this.cloudinaryMedia = JSON.parse(response);
            if (_this.type === 'video')
                _this.video = _this.cloudinaryMedia.secure_url;
            else
                _this.pictures.push(_this.cloudinaryMedia.secure_url);
            _this.emitChange();
        };
        this.uploader.onAfterAddingFile = function (fileItem) {
            _this.uploader.uploadAll();
        };
    };
    CreateStoryComponent.prototype.setMediaType = function (type) {
        this.type = type;
    };
    CreateStoryComponent.prototype.removeVideo = function () {
        this.video = '';
        this.emitChange();
    };
    CreateStoryComponent.prototype.removePictures = function (index) {
        this.pictures.splice(index, 1);
        this.emitChange();
    };
    CreateStoryComponent.prototype.onChange = function (type, newValue) {
        if (type === 'resume_1')
            this.resume_1 = newValue;
        else
            this.resume_2 = newValue;
        this.emitChange();
    };
    CreateStoryComponent.prototype.emitChange = function () {
        this.story.emit({
            resume_1: this.resume_1,
            resume_2: this.resume_2,
            video: this.video,
            pictures: this.pictures,
        });
    };
    CreateStoryComponent.prototype.transformImage = function (url, width, height, crop) {
        return this.PicturesService.transformImage(url, width, height, crop);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], CreateStoryComponent.prototype, "project", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], CreateStoryComponent.prototype, "admin", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
    ], CreateStoryComponent.prototype, "story", void 0);
    CreateStoryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-create-story',
            template: __webpack_require__("./src/app/Components/create-projects/create-story/create-story.component.html"),
            styles: [__webpack_require__("./src/app/Components/create-projects/create-story/create-story.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__Services_Pictures_pictures_service__["a" /* PicturesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_Pictures_pictures_service__["a" /* PicturesService */]) === "function" && _b || Object])
    ], CreateStoryComponent);
    return CreateStoryComponent;
    var _a, _b;
}());

//# sourceMappingURL=create-story.component.js.map

/***/ }),

/***/ "./src/app/Routes/create-project.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CREATE_PROJECT_ROUTES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Components_create_projects_create_projects_component__ = __webpack_require__("./src/app/Components/create-projects/create-projects.component.ts");

/* Components */

/* Librairies */
var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__Components_create_projects_create_projects_component__["a" /* CreateProjectsComponent */] },
];
var CREATE_PROJECT_ROUTES = __WEBPACK_IMPORTED_MODULE_0__angular_router__["f" /* RouterModule */].forChild(routes);
//# sourceMappingURL=create-project.routes.js.map

/***/ })

});
//# sourceMappingURL=create-projects.module.chunk.js.map