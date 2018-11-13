webpackJsonp(["statistics.module"],{

/***/ "./src/app/Components/statistics/statistics.component.html":
/***/ (function(module, exports) {

module.exports = "<section id=\"w-statistics\" *ngIf=\"profile && statistics\">\n\t<div class=\"ws-head bg-default\" [ngStyle]=\"{'background-image': 'url(' + profile.cover_picture + ')'}\" >\n\t\t<div class=\"filter\"></div>\n\t\t<div class=\"wsh-title align-center\">\n\t\t\t<h1 class=\"freigs\">Statistics</h1>\n\t\t</div>\n\t</div>\n\n\t<div class=\"ws-body\">\n\t\t<div class=\"wsb-title mar-b-15\">\n\t\t\t<h3 class=\"freigl\">The <span class=\"freigs\">higher</span> you rank, the <span class=\"freigs\">more</span> we connect you to the people you might need</h3>\n\t\t</div>\n\n\t\t<div class=\"wsb-social flex\">\n\t\t\t<div class=\"wsbs-invite\">\n\t\t\t\t<h2 class=\"freigl\">Social</h2>\n\t\t\t\t<h6 class=\"freigm mar-b-15\">Increase your ranking by <strong>687%</strong> and get <strong>42</strong> more exposure by<br /> connecting to the people you already know</h6>\n\t\t\t\t<div class=\"wsbsi-linkedin flex cursor-pt\">\n\t\t\t\t\t<img src=\"https://static.licdn.com/scds/common/u/images/logos/favicons/v1/favicon.ico\">\n\t\t\t\t\t<h4 class=\"freigm\">LinkedIn</h4>\n\t\t\t\t\t<button class=\"freigs\" (click)=\"showInvitationModal()\">Soon*</button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"wsbsi-slack flex cursor-pt\">\n\t\t\t\t\t<img src=\"/public/images/social_media/slack-1.svg\">\n\t\t\t\t\t<h4 class=\"freigm\">Slack</h4>\n\t\t\t\t\t<button class=\"freigs\">Soon*</button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"wsbsi-google flex cursor-pt\">\n\t\t\t\t\t<img src=\"https://www.google.com/images/icons/product/googlemail-128.png\">\n\t\t\t\t\t<h4 class=\"freigm\">Google</h4>\n\t\t\t\t\t<button class=\"freigs\" (click)=\"showSocialModal(3)\">Connect</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"wsbs-rank\">\n\t\t\t\t<div class=\"rank flex\">\n\t\t\t\t\t<h2 class=\"freigm\">#{{ statistics.rank }}</h2>\n\t\t\t\t\t<img src=\"/public/images/Upvote_Icon.svg\" alt=\"up\" />\n\t\t\t\t</div>\n\t\t\t\t<aside class=\"setting-ranking-graph\">\n\t\t\t\t\t<img src=\"/public/images/stat-graph.svg\" alt=\"graph\" />\n\t\t\t\t</aside>\n\t\t\t\t<p class=\"freigs\">Your live ranking will be soon available</p>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"wsb-invitation\">\n\t\t\t<h5 class=\"freigm\">.or share your own invite link</h5>\n\t\t\t<div class=\"wsbi-link flex mar-b-10\" *ngIf=\"profile.invite_link\">\n\t\t\t\t<img *ngIf=\"profile\" [src]=\"profile.picture\">\n\t\t\t\t<a class=\"freigs\" [routerLink]=\"['/invite', profile.invite_link]\">wittycircle.com/invite/{{ profile.invite_link }}</a>\n\t\t\t\t<i class=\"fa fa-facebook-official\"></i>\n\t\t\t\t<i class=\"fa fa-twitter-square\"></i>\n\t\t\t</div>\n\t\t\t<div class=\"wsbi-invite flex\">\n\t\t\t\t<textarea type=\"text\" name=\"invite\" placeholder=\"Email addresses, seperated by comma\" [(ngModel)]=\"emailsEntrance\"></textarea>\n\t\t\t\t<button class=\"mar-l-15 freigm\" (click)=\"sendInvitations()\"> {{ buttonText }} <i class=\"fa fa-check\" *ngIf=\"buttonText === 'Sent'\"></i></button>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"wsb-activity\">\n\t\t\t<h2 class=\"freigl\">Activity</h2>\n\t\t\t<h5 class=\"freigm mar-b-15\">Each time something happens, your ranking goes up by 2 to 10%</h5>\n\n\t\t\t<div class=\"wsba-points flex\">\n\t\t\t\t<div class=\"wsbap-1\">\n\t\t\t\t\t<li>Started projects <span class=\"freigl\">(+{{ statistics.started_projects * 200 }}) </span> <span>{{ statistics.started_projects }}</span></li>\n\t\t\t\t\t<li>Project feedback <span class=\"freigl\">(+{{ statistics.project_feedback * 15 }})</span> <span>{{ statistics.project_feedback }}</span></li>\n\t\t\t\t\t<li>Project contributions<span class=\"freigl\">(+{{ statistics.project_contribution * 100 }})</span> <span>{{ statistics.project_contribution }}</span></li>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"wsbap-2\">\n\t\t\t\t\t<li>Following <span class=\"freigl\">(+{{ statistics.following * 1 }})</span> <span>{{ statistics.following }}</span></li>\n\t\t\t\t\t<li>Followers <span class=\"freigl\">(+{{ statistics.followers * 2 }})</span> <span>{{ statistics.followers }}</span></li>\n\t\t\t\t\t<li>Upvoted projects <span>(+{{ statistics.upvoted_projects * 15 }})</span> <span>{{ statistics.upvoted_projects }}</span></li>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"wsbap-3\">\n\t\t\t\t\t<li>Messages received <span class=\"freigl\">(+{{ statistics.messages * 2 }})</span> <span>{{ statistics.messages }}</span></li>\n\t\t\t\t\t<li>Profile views <span class=\"freigl\">(+{{ statistics.views * 0.5 }})</span> <span>{{ statistics.views }}</span></li>\n\t\t\t\t\t<li>Recurring sessions <span> 1</span></li>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</section>\n<app-footer></app-footer>\n"

/***/ }),

/***/ "./src/app/Components/statistics/statistics.component.scss":
/***/ (function(module, exports) {

module.exports = "#w-statistics .ws-head {\n  position: relative;\n  height: 180px;\n  left: 0;\n  right: 0;\n  margin: 0 auto; }\n  #w-statistics .ws-head .wsh-title {\n    width: 600px;\n    margin: 0 auto;\n    left: 0;\n    right: 0;\n    text-align: center; }\n  #w-statistics .ws-head .wsh-title h1 {\n      font-size: 32px; }\n  #w-statistics .ws-body {\n  width: 800px;\n  margin: 0 auto;\n  padding: 30px 0; }\n  #w-statistics .ws-body h2 {\n    font-size: 26px;\n    color: #2b2b2b; }\n  #w-statistics .ws-body .wsb-title {\n    text-align: center;\n    padding: 15px 10px; }\n  #w-statistics .ws-body .wsb-title h3, #w-statistics .ws-body .wsb-title span {\n      font-size: 18px;\n      color: #2b2b2b; }\n  #w-statistics .ws-body .wsb-social .wsbs-invite {\n    width: 50%;\n    margin-bottom: 50px; }\n  #w-statistics .ws-body .wsb-social .wsbs-invite h6 {\n      font-size: 14px;\n      color: #999; }\n  #w-statistics .ws-body .wsb-social .wsbs-invite .wsbsi-linkedin, #w-statistics .ws-body .wsb-social .wsbs-invite .wsbsi-slack, #w-statistics .ws-body .wsb-social .wsbs-invite .wsbsi-google {\n      border-radius: 4px;\n      border: none; }\n  #w-statistics .ws-body .wsb-social .wsbs-invite .wsbsi-linkedin img, #w-statistics .ws-body .wsb-social .wsbs-invite .wsbsi-slack img, #w-statistics .ws-body .wsb-social .wsbs-invite .wsbsi-google img {\n        width: 32px;\n        height: 32px;\n        margin: 5px 15px 5px 5px; }\n  #w-statistics .ws-body .wsb-social .wsbs-invite .wsbsi-linkedin h4, #w-statistics .ws-body .wsb-social .wsbs-invite .wsbsi-slack h4, #w-statistics .ws-body .wsb-social .wsbs-invite .wsbsi-google h4 {\n        font-size: 14px;\n        color: #2b2b2b; }\n  #w-statistics .ws-body .wsb-social .wsbs-invite .wsbsi-linkedin button, #w-statistics .ws-body .wsb-social .wsbs-invite .wsbsi-slack button, #w-statistics .ws-body .wsb-social .wsbs-invite .wsbsi-google button {\n        margin-left: auto;\n        margin-right: 5px;\n        font-size: 14px;\n        background-color: #354c68; }\n  #w-statistics .ws-body .wsb-social .wsbs-invite .wsbsi-linkedin:hover {\n      background-color: #fafafa; }\n  #w-statistics .ws-body .wsb-social .wsbs-invite .wsbsi-slack:hover {\n      background-color: #fafafa; }\n  #w-statistics .ws-body .wsb-social .wsbs-invite .wsbsi-google:hover {\n      background-color: #fafafa; }\n  #w-statistics .ws-body .wsb-social .wsbs-rank {\n    margin-left: 60px; }\n  #w-statistics .ws-body .wsb-social .wsbs-rank .rank {\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center; }\n  #w-statistics .ws-body .wsb-social .wsbs-rank .rank img {\n        width: 9px; }\n  #w-statistics .ws-body .wsb-social .wsbs-rank h2, #w-statistics .ws-body .wsb-social .wsbs-rank p {\n      color: #999;\n      text-align: center;\n      font-size: 14px; }\n  #w-statistics .ws-body .wsb-social .wsbs-rank h2 {\n      font-size: 26px;\n      color: #222; }\n  #w-statistics .ws-body .wsb-invitation {\n    margin-bottom: 50px; }\n  #w-statistics .ws-body .wsb-invitation h5 {\n      font-size: 14px;\n      color: #999; }\n  #w-statistics .ws-body .wsb-invitation .wsbi-link {\n      padding-left: 10px; }\n  #w-statistics .ws-body .wsb-invitation .wsbi-link img {\n        width: 26px;\n        border-radius: 50%;\n        margin-right: 10px; }\n  #w-statistics .ws-body .wsb-invitation .wsbi-link a {\n        font-size: 14px;\n        color: #353535; }\n  #w-statistics .ws-body .wsb-invitation .wsbi-link .fa-facebook-official, #w-statistics .ws-body .wsb-invitation .wsbi-link .fa-twitter-square {\n        background-color: white;\n        color: #222;\n        margin: 0 3px; }\n  #w-statistics .ws-body .wsb-invitation .wsbi-invite {\n      background-color: #e5e5e5;\n      padding: 0 15px;\n      border-radius: 4px; }\n  #w-statistics .ws-body .wsb-invitation .wsbi-invite textarea {\n        font-size: 14px;\n        color: #222;\n        min-height: 50px;\n        padding: 5px 10px;\n        width: 450px;\n        border-radius: 4px; }\n  #w-statistics .ws-body .wsb-invitation .wsbi-invite button {\n        font-size: 16px; }\n  #w-statistics .ws-body .wsb-activity h5 {\n    font-size: 14px;\n    color: #999; }\n  #w-statistics .ws-body .wsb-activity .wsba-points li, #w-statistics .ws-body .wsb-activity .wsba-points span {\n    font-size: 18px;\n    font-family: 'FreigLight';\n    color: #2b2b2b; }\n  #w-statistics .ws-body .wsb-activity .wsba-points span {\n    font-family: 'FreigMed';\n    float: right; }\n  #w-statistics .ws-body .wsb-activity .wsba-points .wsbap-1, #w-statistics .ws-body .wsb-activity .wsba-points .wsbap-2, #w-statistics .ws-body .wsb-activity .wsba-points .wsbap-3 {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    padding-right: 60px; }\n"

/***/ }),

/***/ "./src/app/Components/statistics/statistics.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatisticsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__("./node_modules/ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_google_contact_modal_google_contact_modal_component__ = __webpack_require__("./src/app/Components/modals/google-contact-modal/google-contact-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_invitation_social_invitation_social_component__ = __webpack_require__("./src/app/Components/modals/invitation-social/invitation-social.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_Statistics_statistics_service__ = __webpack_require__("./src/app/Services/Statistics/statistics.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_Profiles_profiles_service__ = __webpack_require__("./src/app/Services/Profiles/profiles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Services_account_service__ = __webpack_require__("./src/app/Services/account.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Services_Invitation_invitation_service__ = __webpack_require__("./src/app/Services/Invitation/invitation.service.ts");
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





var StatisticsComponent = /** @class */ (function () {
    function StatisticsComponent(StatisticsService, TokenService, ProfilesService, AccountService, InvitationService, dialogService) {
        this.StatisticsService = StatisticsService;
        this.TokenService = TokenService;
        this.ProfilesService = ProfilesService;
        this.AccountService = AccountService;
        this.InvitationService = InvitationService;
        this.dialogService = dialogService;
        // inviteId 		: string
        this.email_err = false;
        this.buttonText = 'Send Invitation';
        this.account = this.TokenService.getToken().user;
    }
    StatisticsComponent.prototype.ngOnInit = function () {
        this.getUserProfile();
        // this.getUserInviteId();
        this.getUserStatistics();
    };
    StatisticsComponent.prototype.getUserProfile = function () {
        var _this = this;
        this.ProfilesService.getProfile(this.account['id']).subscribe(function (res) {
            _this.profile = res.profile;
        });
    };
    // getUserInviteId() {
    // 	this.AccountService.getUserInviteId(this.account['id']).subscribe( res => {
    // 		this.inviteId = res.invites[0];
    // 	});
    // }
    StatisticsComponent.prototype.showSocialModal = function (index) {
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_2__modals_google_contact_modal_google_contact_modal_component__["a" /* GoogleContactModalComponent */], {
            profile: {},
            index: index
        }).subscribe(function (success) {
            console.log(success);
        });
    };
    StatisticsComponent.prototype.showInvitationModal = function () {
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_3__modals_invitation_social_invitation_social_component__["a" /* InvitationSocialComponent */], {
            check: true
        }).subscribe(function (success) {
        });
    };
    StatisticsComponent.prototype.getUserStatistics = function () {
        var _this = this;
        this.StatisticsService.getUserStatistics(this.account['id']).subscribe(function (res) {
            _this.statistics = res.profile;
        });
    };
    StatisticsComponent.prototype.parsingEmails = function () {
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var emails = this.emailsEntrance.replace(/\s+/g, '').split(',');
        var length = emails.length;
        var newMails = [];
        for (var i = 0; i < length; i++) {
            if (reg.test(emails[i])) {
                newMails.push(emails[i]);
            }
        }
        return newMails;
    };
    StatisticsComponent.prototype.resetButton = function () {
        var _this = this;
        this.buttonText = 'Sent';
        this.emailsEntrance = '';
        setTimeout(function () {
            _this.buttonText = 'Send invites';
        }, 2000);
    };
    StatisticsComponent.prototype.sendInvitations = function () {
        var _this = this;
        console.log(this.parsingEmails());
        if (this.emailsEntrance) {
            this.InvitationService.sendInvitation({ mail: this.parsingEmails() }).subscribe(function (res) {
                console.log(res);
                if (res.success) {
                    _this.resetButton();
                }
            });
        }
    };
    StatisticsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-statistics',
            template: __webpack_require__("./src/app/Components/statistics/statistics.component.html"),
            styles: [__webpack_require__("./src/app/Components/statistics/statistics.component.scss")],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__Services_Statistics_statistics_service__["a" /* StatisticsService */],
                __WEBPACK_IMPORTED_MODULE_5__Services_Profiles_profiles_service__["a" /* ProfilesService */],
                __WEBPACK_IMPORTED_MODULE_7__Services_account_service__["a" /* AccountService */],
                __WEBPACK_IMPORTED_MODULE_8__Services_Invitation_invitation_service__["a" /* InvitationService */]
            ]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__Services_Statistics_statistics_service__["a" /* StatisticsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_Statistics_statistics_service__["a" /* StatisticsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6__Services_Authentication_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__Services_Authentication_token_service__["a" /* TokenService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__Services_Profiles_profiles_service__["a" /* ProfilesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_Profiles_profiles_service__["a" /* ProfilesService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__Services_account_service__["a" /* AccountService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__Services_account_service__["a" /* AccountService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_8__Services_Invitation_invitation_service__["a" /* InvitationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__Services_Invitation_invitation_service__["a" /* InvitationService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _f || Object])
    ], StatisticsComponent);
    return StatisticsComponent;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=statistics.component.js.map

/***/ }),

/***/ "./src/app/Components/statistics/statistics.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatisticsModule", function() { return StatisticsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__footer_footer_module__ = __webpack_require__("./src/app/Components/footer/footer.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__statistics_component__ = __webpack_require__("./src/app/Components/statistics/statistics.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Routes_statistics_routes__ = __webpack_require__("./src/app/Routes/statistics.routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




/* Components */

/* Services */
/* Route */

var StatisticsModule = /** @class */ (function () {
    function StatisticsModule() {
    }
    StatisticsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_5__Routes_statistics_routes__["a" /* STATISTICS_ROUTES */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__footer_footer_module__["a" /* FooterModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__statistics_component__["a" /* StatisticsComponent */]
            ]
        })
    ], StatisticsModule);
    return StatisticsModule;
}());

//# sourceMappingURL=statistics.module.js.map

/***/ }),

/***/ "./src/app/Routes/statistics.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return STATISTICS_ROUTES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Components_statistics_statistics_component__ = __webpack_require__("./src/app/Components/statistics/statistics.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_Authentication_authentication_service__ = __webpack_require__("./src/app/Services/Authentication/authentication.service.ts");

/* Components */

/* Services */

/* Librairies */
var routes = [
    { path: '', canActivate: [__WEBPACK_IMPORTED_MODULE_2__Services_Authentication_authentication_service__["a" /* AuthenticationService */]], component: __WEBPACK_IMPORTED_MODULE_1__Components_statistics_statistics_component__["a" /* StatisticsComponent */] },
];
var STATISTICS_ROUTES = __WEBPACK_IMPORTED_MODULE_0__angular_router__["f" /* RouterModule */].forChild(routes);
//# sourceMappingURL=statistics.routes.js.map

/***/ })

});
//# sourceMappingURL=statistics.module.chunk.js.map