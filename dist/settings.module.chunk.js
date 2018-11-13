webpackJsonp(["settings.module"],{

/***/ "./src/app/Components/settings/setting-general/setting-general.component.html":
/***/ (function(module, exports) {

module.exports = "<section id=\"setting-body\" settingDiv>\n\t<div class=\"setting-general setting-box\">\n\t\t<div class=\"setting-general-firstname sg-field flex\">\n\t\t\t<label>First name</label>\n\t\t\t<input type=\"text\" [(ngModel)]=\"form.first_name\" />\n\t\t\t<p *ngIf=\"fn_err\">This is a required field</p>\n\t\t</div>\n\t\t<div class=\"setting-general-lastname sg-field flex\">\n\t\t\t<label>Last name</label>\n\t\t\t<input type=\"text\" [(ngModel)]=\"form.last_name\" />\n\t\t\t<p *ngIf=\"ln_err\">This is a required field</p>\n\t\t</div>\n\t\t<div class=\"setting-general-username sg-field flex\">\n\t\t\t<label>Username</label>\n\t\t\t<input type=\"email\" [(ngModel)]=\"form.username\"/>\n\t\t\t<span><h6>Your custom URL:</h6>\n\t\t\t<h5 *ngIf=\"form.username\"><strong>wittycircle.com/{{form.username}}</strong></h5></span>\n<!-- \t\t\t<p ng-if=\"!checkUsername\" > Please enter a valid username</p>\n -->\t\t\t<!-- <p ng-if=\"checkExistU\" > Username already in use</p> -->\n\t\t</div>\n\t\t<div class=\"setting-general-email sg-field flex\">\n\t\t\t<label>Email</label>\n\t\t\t<input type=\"email\" [(ngModel)]=\"form.email\" />\n\t\t\t<p *ngIf=\"email_err\">Address must be valid</p>\n\t\t\t<p *ngIf=\"email_err\"> Email already in use</p>\n\t\t</div>\n\n\t\t<div class=\"setting-general-network flex\">\n\t\t\t<label>Network</label><br />\n\t\t\t<div class=\"setting-general-input\">\n\t\t\t\t<input id=\"sin-i\" [(ngModel)]=\"searchNetwork\" (ngModelChange)=\"onNetworkChange($event)\" placeholder=\"Berkeley, HEC, Station F...\" />\n\t\t\t\t<div id=\"sin-b\" class=\"setting-general-network-list\" *ngIf=\"networks\">\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li class=\"cursor-pt\" *ngFor=\"let network of (networks | searchPipe: 'network': searchNetwork).slice(0, 5)\" (click)=\"selectNetwork(network.network, network.website)\">{{ network.network }}</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t\t<p class=\"setting-general-network-text\">Networks help us to connect you to more people you may know</p>\n\t\t\t\t<p class=\"text-2\" *ngIf=\"verification2\">You'll be notified by email when we've checked you're part of this network</p>\n\n\t\t\t\t<label *ngIf=\"verification1\">Network verification</label>\n\t\t\t\t<div *ngIf=\"verification1\" class=\"setting-general-network-university\">\n\t\t\t\t\t<input class=\"setting-general-network-mail\" type=\"email\" [(ngModel)]=\"email\" placeholder=\"{{ emailNetwork }}\" />\n\t\t\t\t\t<p class=\"setting-general-network-text\">We'll send you a verification email to add you to the {{profileNetwork}} network</p>\n\t\t\t\t\t<!-- <button class=\"setting-general-network-button\" ng-click=\"saveUniversityNetwork(emailNetwork)\">\n\t\t\t\t\t\t<span ng-if=\"!loadAddUniversity\">Send</span>\n\t\t\t\t\t\t<div ng-if=\"loadAddUniversity\" class=\"spinner-load\">\n\t\t\t\t\t\t<div class=\"spinner__item1 spinner-item\"></div>\n\t\t\t\t\t\t<div class=\"spinner__item2 spinner-item\"></div>\n\t\t\t\t\t\t<div class=\"spinner__item3 spinner-item\"></div>\n\t\t\t\t\t</button> -->\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<button type=\"submit\" (click)=\"updateAccount()\">{{ buttonText }} <i *ngIf=\"buttonText === 'Saved'\" class=\"fa fa-check\"></i></button>\n\t</div>\n\n</section>"

/***/ }),

/***/ "./src/app/Components/settings/setting-general/setting-general.component.scss":
/***/ (function(module, exports) {

module.exports = "/**** General body *****/\n.setting-general span {\n  display: block;\n  position: absolute;\n  margin-top: 30px; }\n.setting-general h5 {\n  display: inline-block;\n  font-family: 'FreigSem';\n  font-size: 14px;\n  color: #999999; }\n.setting-general h6 {\n  display: inline-block;\n  font-family: 'FreigBook';\n  font-size: 14px;\n  color: #999999; }\n.setting-general .setting-general-firstname p,\n.setting-general .setting-general-lastname p,\n.setting-general .setting-general-email p,\n.setting-general .setting-general-username p {\n  position: relative;\n  left: 155px;\n  font-family: 'FreigBook';\n  color: red;\n  margin-bottom: 0; }\n.setting-general .setting-general-network {\n  margin-bottom: 30px;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -webkit-box-align: baseline;\n      -ms-flex-align: baseline;\n          align-items: baseline; }\n.setting-general .setting-general-network label {\n    text-align: left; }\n.setting-general .setting-general-network i {\n    position: absolute;\n    margin-top: 21px;\n    margin-left: 14px;\n    font-size: 18px;\n    color: #999999; }\n.setting-general .setting-general-network p {\n    font-family: 'FreigBook';\n    font-size: 16px;\n    color: #999999;\n    padding-left: 2px; }\n.setting-general .setting-general-network .setting-general-input {\n    text-align: left; }\n.setting-general .setting-general-network .setting-general-input label {\n      margin-left: 25px; }\n.setting-general .setting-general-network .setting-general-input input {\n      width: 100%;\n      padding: 8px 15px 8px 40px;\n      border: 1px solid #e5e5e5 !important;\n      border-radius: 4px;\n      font-family: 'FreigBook';\n      font-size: 16px;\n      color: #222222;\n      margin-left: 25px; }\n.setting-general .setting-general-network .setting-general-input .text-2 {\n      margin-left: 25px; }\n.setting-general .setting-general-network .setting-general-input .setting-general-network-text {\n      font-family: 'FreigMed';\n      font-size: 14px;\n      margin-bottom: 15px;\n      margin-left: 25px; }\n.setting-general .setting-general-network .setting-general-input .setting-general-network-list {\n      position: absolute;\n      display: none;\n      background-color: white;\n      padding: 10px 0px 10px 0px;\n      border: 1px solid #e5e5e5;\n      border-radius: 4px;\n      z-index: 100;\n      width: 240px;\n      margin-left: 25px;\n      /*\t\t\t\t\tmin-height: 40px;\n\t*/ }\n.setting-general .setting-general-network .setting-general-input .setting-general-network-list li {\n        display: block;\n        font-family: 'FreigBook';\n        padding: 5px 15px;\n        font-size: 16px;\n        /*\t\t\t\t\t\tbackground-color: #999999;\n\t*/\n        /*margin-right: 8px;*/\n        margin-bottom: 4px;\n        margin-top: 4px;\n        color: black;\n        -webkit-transition-duration: 0.3s;\n        -kthtml-transition-duration: 0.3s;\n        transition-duration: 0.3s; }\n.setting-general .setting-general-network .setting-general-input .setting-general-network-list li:hover {\n        background-color: #e5e5e5; }\n.setting-general .setting-general-network .setting-general-network-mail {\n    display: inline-block;\n    width: 70%;\n    padding-left: 15px; }\n.setting-general .setting-general-network .setting-general-network-button {\n    position: relative;\n    bottom: 1px;\n    padding: 5px 12px 7px 12px;\n    margin-left: 5px; }\n.setting-general .setting-general-network .setting-general-network-button .spinner-load {\n      position: relative;\n      background-color: transparent; }\n"

/***/ }),

/***/ "./src/app/Components/settings/setting-general/setting-general.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingGeneralComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__("./node_modules/rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_Profiles_profiles_service__ = __webpack_require__("./src/app/Services/Profiles/profiles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_account_service__ = __webpack_require__("./src/app/Services/account.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_Networks_networks_service__ = __webpack_require__("./src/app/Services/Networks/networks.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Interfaces_Constants_networks_constant__ = __webpack_require__("./src/app/Interfaces/Constants/networks-constant.ts");
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

var SettingGeneralComponent = /** @class */ (function () {
    function SettingGeneralComponent(TokenService, ProfilesService, AccountService, NetworksService) {
        this.TokenService = TokenService;
        this.ProfilesService = ProfilesService;
        this.AccountService = AccountService;
        this.NetworksService = NetworksService;
        this.form = {};
        this.fn_err = false;
        this.ln_err = false;
        this.email_err = false;
        this.verification1 = false;
        this.verification2 = false;
        this.startupNetwork = __WEBPACK_IMPORTED_MODULE_6__Interfaces_Constants_networks_constant__["a" /* networks */];
        this.user = this.TokenService.getToken().user;
    }
    SettingGeneralComponent.prototype.ngOnInit = function () {
        this.form = {
            first_name: '',
            last_name: '',
            username: '',
            email: ''
        };
        this.buttonText = 'Save Changes';
        this.getProfile();
        this.getNetworks();
    };
    SettingGeneralComponent.prototype.getProfile = function () {
        var _this = this;
        this.ProfilesService.getProfile(this.user.id).subscribe(function (res) {
            _this.form = {
                first_name: res.profile.first_name,
                last_name: res.profile.last_name,
                username: res.profile.username,
                email: _this.user.email
            };
            _this.searchNetwork = res.profile.name;
        });
    };
    SettingGeneralComponent.prototype.getNetworks = function () {
        var _this = this;
        this.NetworksService.getNetworks('university').subscribe(function (res) {
            _this.networks = res.university;
        });
    };
    SettingGeneralComponent.prototype.selectNetwork = function (name, website) {
        this.searchNetwork = name;
        this.networkVerification(name, website);
    };
    SettingGeneralComponent.prototype.networkVerification = function (name, website) {
        this.verification1 = this.verification2 = false;
        if (this.startupNetwork.indexOf(name) >= 0)
            this.verification2 = true;
        else {
            this.getEmailNetwork(website);
            this.verification1 = true;
        }
    };
    SettingGeneralComponent.prototype.getEmailNetwork = function (website) {
        var position1 = website.indexOf('.') + 1;
        var position2 = website.lastIndexOf('.');
        this.emailNetwork = 'email@' + website.slice(position1, position2) + '.edu';
    };
    SettingGeneralComponent.prototype.onNetworkChange = function (event) {
        if (!event)
            this.verification1 = this.verification2 = false;
    };
    SettingGeneralComponent.prototype.validateForm = function (form) {
        this.fn_err = this.ln_err = this.email_err = true;
        if (form.first_name)
            this.fn_err = false;
        if (form.last_name)
            this.ln_err = false;
        if (form.email) {
            var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            this.email_err = !reg.test(form.email);
        }
        return (this.fn_err && this.ln_err && this.email_err);
    };
    SettingGeneralComponent.prototype.updateAccount = function () {
        var _this = this;
        if (!this.validateForm(this.form)) {
            var body_profile = {
                first_name: this.form.first_name,
                last_name: this.form.last_name
            };
            var body_account = {
                username: this.form.username,
                email: this.form.email
            };
            __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["a" /* Observable */].forkJoin([
                this.AccountService.updateAccountInfo(body_account),
                this.ProfilesService.updateProfile(this.user.id, body_profile),
                this.NetworksService.joinNetwork({ email: this.email, network: this.searchNetwork || '' }),
            ]).subscribe(function (res) {
                if (res[0].success && res[1].success) {
                    _this.buttonText = 'Saved';
                    _this.email = '';
                    _this.searchNetwork = '';
                    setTimeout(function () {
                        _this.buttonText = 'Save Changes';
                    }, 2000);
                }
                else
                    console.log(res);
            });
        }
    };
    SettingGeneralComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-setting-general',
            template: __webpack_require__("./src/app/Components/settings/setting-general/setting-general.component.html"),
            styles: [__webpack_require__("./src/app/Components/settings/settings.component.scss"), __webpack_require__("./src/app/Components/settings/setting-general/setting-general.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__Services_Authentication_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_Authentication_token_service__["a" /* TokenService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__Services_Profiles_profiles_service__["a" /* ProfilesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_Profiles_profiles_service__["a" /* ProfilesService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__Services_account_service__["a" /* AccountService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_account_service__["a" /* AccountService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__Services_Networks_networks_service__["a" /* NetworksService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_Networks_networks_service__["a" /* NetworksService */]) === "function" && _d || Object])
    ], SettingGeneralComponent);
    return SettingGeneralComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=setting-general.component.js.map

/***/ }),

/***/ "./src/app/Components/settings/setting-invitation/setting-invitation.component.html":
/***/ (function(module, exports) {

module.exports = "<div ng-if=\"invitPermission\" class=\"setting-invitation setting-box\" style=\"display: none\">\n\t<h4>Enter your invitation email list here</h4>\n\t<textarea>Enter email list</textarea>\n\t<button> <i class=\"fa fa-check\"></i></button>\n</div>\n"

/***/ }),

/***/ "./src/app/Components/settings/setting-invitation/setting-invitation.component.scss":
/***/ (function(module, exports) {

module.exports = "/******** Invitation body **********/\n.setting-invitation {\n  text-align: left; }\n.setting-invitation textarea {\n    width: 600px;\n    height: 200px;\n    resize: none;\n    outline: 0;\n    border: 1px solid #999999;\n    border-radius: 4px; }\n.setting-invitation button {\n    display: block; }\n.setting-invitation h4 {\n    margin-bottom: 15px;\n    font-family: 'FreigMed';\n    font-size: 16px;\n    color: #999999; }\n.setting-invite-modal {\n  position: fixed;\n  max-width: 1000px;\n  margin: 0 auto;\n  top: 12%;\n  right: 0;\n  left: 0;\n  text-align: center; }\n.setting-invite-modal .setting-invite-modal-block {\n    display: inline-block;\n    min-width: 400px;\n    background-color: white;\n    border: 1px solid #e5e5e5;\n    border-radius: 4px; }\n.setting-invite-modal .setting-invite-modal-block .setting-invite-modal-head {\n      background-color: #fafafa; }\n.setting-invite-modal .setting-invite-modal-block .setting-invite-modal-head h4 {\n        font-family: 'FreigMed';\n        font-size: 16px;\n        color: black;\n        padding: 10px 0;\n        border-bottom: 1px solid #e5e5e5; }\n.setting-invite-modal .setting-invite-modal-block .setting-invite-modal-body {\n      padding: 25px 20px; }\n.setting-invite-modal .setting-invite-modal-block .setting-invite-modal-body input {\n        width: 100%;\n        padding: 6px 10px;\n        border-radius: 4px;\n        border: 1px solid #e5e5e5;\n        font-family: 'FreigBook';\n        font-size: 16px; }\n.setting-invite-modal .setting-invite-modal-block .setting-invite-modal-body p {\n        font-family: 'FreigBook';\n        color: red;\n        font-size: 15px;\n        margin-top: 10px;\n        margin-bottom: 0; }\n.setting-invite-modal .setting-invite-modal-block .setting-invite-modal-body .simbpress {\n        font-style: italic;\n        color: #999999; }\n.setting-invite-modal .setting-invite-modal-block .setting-invite-modal-list {\n      padding: 25px 0px 0px 0px;\n      margin: 0 20px;\n      border-top: 1px solid #e5e5e5;\n      text-align: center;\n      max-height: 300px;\n      overflow-y: scroll; }\n.setting-invite-modal .setting-invite-modal-block .setting-invite-modal-list .setting-invite-modal-list-email {\n        text-align: left; }\n.setting-invite-modal .setting-invite-modal-block .setting-invite-modal-list .setting-invite-modal-list-email li {\n          font-family: 'FreigBook';\n          font-size: 16px;\n          padding: 5px 5px 5px 5px;\n          margin-bottom: 10px;\n          background-color: #f7f7f7;\n          border-radius: 4px; }\n.setting-invite-modal .setting-invite-modal-block .setting-invite-modal-list .setting-invite-modal-list-email li img {\n            float: right;\n            position: relative;\n            top: 5px;\n            margin-right: 5px;\n            width: 12px; }\n.setting-invite-modal .setting-invite-modal-block button {\n      margin-top: 15px;\n      margin-bottom: 30px;\n      font-size: 15px;\n      padding: 5px 12px 6px 12px; }\n"

/***/ }),

/***/ "./src/app/Components/settings/setting-invitation/setting-invitation.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingInvitationComponent; });
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

var SettingInvitationComponent = /** @class */ (function () {
    function SettingInvitationComponent() {
    }
    SettingInvitationComponent.prototype.ngOnInit = function () {
    };
    SettingInvitationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-setting-invitation',
            template: __webpack_require__("./src/app/Components/settings/setting-invitation/setting-invitation.component.html"),
            styles: [__webpack_require__("./src/app/Components/settings/setting-invitation/setting-invitation.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], SettingInvitationComponent);
    return SettingInvitationComponent;
}());

//# sourceMappingURL=setting-invitation.component.js.map

/***/ }),

/***/ "./src/app/Components/settings/setting-notification/setting-notification.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"setting-notification\" style=\"display: none;\">\n\n\t<div class=\"setting-notification-center\">\n\t\t<div class=\"setting-notification-body\">\n\t\t\t<ul>\n\t\t\t\t<li class=\"li-top\">Get notified about...</li>\n\t\t\t\t<li class=\"li-body\">\n\t\t\t\t\t<p>Who visited your profile</p>\n\t\t\t\t\t<div class=\"checkbox-notif\" ng-click=\"selectBox(1)\"><i class=\"fa fa-check\" ng-if=\"notif_1\"></i></div>\n\t\t\t\t\t<span>By Email</span>\n\t\t\t\t</li>\n\t\t\t\t<li class=\"li-body\">\n\t\t\t\t\t<p>Who started following you</p>\n\t\t\t\t\t<div class=\"checkbox-notif\" ng-click=\"selectBox(2)\"><i class=\"fa fa-check\" ng-if=\"notif_2\"></i></div>\n\t\t\t\t\t<span>By Email</span>\n\t\t\t\t</li>\n\t\t\t\t<li class=\"li-body\">\n\t\t\t\t\t<p>Who started following your project</p>\n\t\t\t\t\t<div class=\"checkbox-notif\" ng-click=\"selectBox(3)\"><i class=\"fa fa-check\" ng-if=\"notif_3\"></i></div>\n\t\t\t\t\t<span>By Email</span>\n\t\t\t\t</li>\n\t\t\t\t<li class=\"li-body\">\n\t\t\t\t\t<p>Feedback from projects you follow</p>\n\t\t\t\t\t<div class=\"checkbox-notif\" ng-click=\"selectBox(4)\"><i class=\"fa fa-check\" ng-if=\"notif_4\"></i></div>\n\t\t\t\t\t<span>By Email</span>\n\t\t\t\t</li>\n\t\t\t\t<li class=\"li-body\">\n\t\t\t\t\t<p>Questions from projects you follow</p>\n\t\t\t\t\t<div class=\"checkbox-notif\" ng-click=\"selectBox(5)\"><i class=\"fa fa-check\" ng-if=\"notif_5\"></i></div>\n\t\t\t\t\t<span>By Email</span>\n\t\t\t\t</li>\n\t\t\t\t<li class=\"li-body\">\n\t\t\t\t\t<p>Comments from projects you follow</p>\n\t\t\t\t\t<div class=\"checkbox-notif\" ng-click=\"selectBox(6)\"><i class=\"fa fa-check\" ng-if=\"notif_6\"></i></div>\n\t\t\t\t\t<span>By Email</span>\n\t\t\t\t</li>\n\t\t\t\t<li class=\"li-body\">\n\t\t\t\t\t<p>New message</p>\n\t\t\t\t\t<div class=\"checkbox-notif\" ng-click=\"selectBox(7)\"><i class=\"fa fa-check\" ng-if=\"notif_7\"></i></div>\n\t\t\t\t\t<span>By Email</span>\n\t\t\t\t</li>\n\t\t\t\t<!-- <li class=\"li-body\">\n\t\t\t\t\t<p>People text you</p>\n\t\t\t\t\t<div class=\"checkbox-notif\"><i class=\"fa fa-check\"></i></div>\n\t\t\t\t\t<span>By Email</span>\n\t\t\t\t</li> -->\n\t\t\t</ul>\n\t\t</div>\n\t</div>\n</div>"

/***/ }),

/***/ "./src/app/Components/settings/setting-notification/setting-notification.component.scss":
/***/ (function(module, exports) {

module.exports = "/***** Notification body *****/\n.setting-notification {\n  background-color: white; }\n.setting-notification .setting-notification-center {\n    background-color: white;\n    padding-top: 30px;\n    border-top: 1px solid #e5e5e5; }\n.setting-notification .setting-notification-center .setting-notification-body {\n      max-width: 1000px;\n      margin: 0 auto;\n      padding: 0px 20px 90px 20px; }\n.setting-notification .setting-notification-center .setting-notification-body li {\n        padding: 15px 0; }\n.setting-notification .setting-notification-center .setting-notification-body .li-top {\n        font-family: 'FreigMed';\n        font-size: 16px;\n        color: #999999; }\n.setting-notification .setting-notification-center .setting-notification-body .li-body {\n        font-family: 'FreigSem';\n        font-size: 16px;\n        color: black; }\n.setting-notification .setting-notification-center .setting-notification-body .li-body span {\n          font-family: 'FreigBook';\n          margin-left: 10px; }\n.setting-notification .setting-notification-center .setting-notification-body .li-body p {\n          display: inline-block;\n          min-width: 350px;\n          padding-right: 15px; }\n.setting-notification .setting-notification-center .setting-notification-body .li-body .checkbox-notif {\n          position: relative;\n          top: 3px;\n          display: inline-block;\n          vertical-align: top;\n          height: 18px;\n          width: 18px;\n          border: 1px solid black;\n          border-radius: 4px;\n          cursor: pointer; }\n.setting-notification .setting-notification-center .setting-notification-body .li-body .checkbox-notif .fa-check {\n            position: relative;\n            bottom: 2px; }\n"

/***/ }),

/***/ "./src/app/Components/settings/setting-notification/setting-notification.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingNotificationComponent; });
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

var SettingNotificationComponent = /** @class */ (function () {
    function SettingNotificationComponent() {
    }
    SettingNotificationComponent.prototype.ngOnInit = function () {
    };
    SettingNotificationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-setting-notification',
            template: __webpack_require__("./src/app/Components/settings/setting-notification/setting-notification.component.html"),
            styles: [__webpack_require__("./src/app/Components/settings/setting-notification/setting-notification.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], SettingNotificationComponent);
    return SettingNotificationComponent;
}());

//# sourceMappingURL=setting-notification.component.js.map

/***/ }),

/***/ "./src/app/Components/settings/setting-password/setting-password.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"setting-body\">\n\t<div class=\"setting-password setting-box\">\n\t\t<div class=\"setting-password-current sg-field flex\">\n\t\t\t<label>Current password</label>\n\t\t\t<input type=\"password\" [(ngModel)]=\"form.currentPassword\" name=\"current password\" placeholder=\"current password\" />\n\t<!-- \t\t<h5 *ngIf=\"checkCurrentPass\" >Invalid password</h5>\n\t -->\t</div>\n\t\t<div class=\"setting-password-new sg-field flex\">\n\t\t\t<label>New password</label>\n\t\t\t<input type=\"password\" [(ngModel)]=\"form.newPassword\" placeholder=\"Minimum 8 characters\" />\n\t\t\t<h5 *ngIf=\"new_pw_err\">Please enter a valid password</h5>\n\t\t</div>\n\t\t<div class=\"setting-password-confirm sg-field flex\">\n\t\t\t<label>Confirm new password</label>\n\t\t\t<input type=\"password\" [(ngModel)]=\"form.confirmPassword\" placeholder=\"Must match your new password\" />\n\t\t\t<h5 *ngIf=\"confirm_err\" >Your passwords does not match</h5>\n\t\t</div>\n\n\t\t<button type=\"submit\" (click)=\"updatePassword()\">{{ buttonText }} <i *ngIf=\"buttonText === 'Saved'\" class=\"fa fa-check\"></i></button>\n\t</div>\n</div>\n"

/***/ }),

/***/ "./src/app/Components/settings/setting-password/setting-password.component.scss":
/***/ (function(module, exports) {

module.exports = "/**** Password body *****/\n.setting-password label {\n  width: 200px; }\n.setting-password input {\n  width: 75%; }\n.setting-password .setting-password-current h5,\n.setting-password .setting-password-new h5,\n.setting-password .setting-password-confirm h5 {\n  position: relative;\n  left: 205px;\n  font-family: 'FreigBook';\n  color: red; }\n"

/***/ }),

/***/ "./src/app/Components/settings/setting-password/setting-password.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingPasswordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_account_service__ = __webpack_require__("./src/app/Services/account.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/* Service */

var SettingPasswordComponent = /** @class */ (function () {
    function SettingPasswordComponent(AccountService) {
        this.AccountService = AccountService;
        this.form = {};
    }
    SettingPasswordComponent.prototype.ngOnInit = function () {
        this.form = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        };
        this.buttonText = 'Save new password';
    };
    SettingPasswordComponent.prototype.validatePassword = function (form) {
        this.new_pw_err = this.pw_err = this.confirm_err = true;
        if (form.newPassword) {
            this.new_pw_err = form.newPassword.length >= 8 ? false : true;
            this.confirm_err = form.newPassword === form.confirmPassword ? false : true;
        }
        return (this.pw_err && this.confirm_err);
    };
    SettingPasswordComponent.prototype.updatePassword = function () {
        var _this = this;
        if (!this.validatePassword(this.form)) {
            this.AccountService.updatePassword({ password: this.form.newPassword }).subscribe(function (res) {
                if (res.success) {
                    _this.buttonText = 'Saved';
                    setTimeout(function () {
                        _this.buttonText = 'Save new password';
                    }, 2000);
                }
            });
        }
    };
    SettingPasswordComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-setting-password',
            template: __webpack_require__("./src/app/Components/settings/setting-password/setting-password.component.html"),
            styles: [__webpack_require__("./src/app/Components/settings/setting-password/setting-password.component.scss"), __webpack_require__("./src/app/Components/settings/settings.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_account_service__["a" /* AccountService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_account_service__["a" /* AccountService */]) === "function" && _a || Object])
    ], SettingPasswordComponent);
    return SettingPasswordComponent;
    var _a;
}());

//# sourceMappingURL=setting-password.component.js.map

/***/ }),

/***/ "./src/app/Components/settings/settings.component.html":
/***/ (function(module, exports) {

module.exports = "<section id=\"setting-page\">\n\n<div *ngIf=\"profile\">\n\t<header id=\"setting-header\" [ngStyle]=\"{'background-image': 'url(' + profile.cover_picture + ')'}\">\n\t\t<div class=\"filter\"></div>\n\t\t<div class=\"setting-header-title\">\n\t\t\t<h1>Settings</h1>\n\t\t</div>\n\t\t<div class=\"setting-navbar\">\n\t\t\t<div class=\"setting-navbar-list\">\n\t\t\t\t<ul>\n\t\t\t\t\t<li routerLink=\"general\" class=\"setting-navbar-general\">General</li>\n\t\t\t\t\t<li routerLink=\"password\" class=\"setting-navbar-password\">Password</li>\n \t\t\t\t</ul>\n\t\t\t</div>\n\t\t</div>\n\t</header>\n</div>\n\t<router-outlet></router-outlet>\n\n</section>\n<app-footer></app-footer>\n"

/***/ }),

/***/ "./src/app/Components/settings/settings.component.scss":
/***/ (function(module, exports) {

module.exports = "#setting-body {\n  /*background-color: #f5f5f5;*/ }\n  #setting-body label {\n    font-family: 'FreigMed';\n    font-size: 16px;\n    color: #222222;\n    width: 150px; }\n  #setting-body input {\n    width: 80%;\n    border: 1px solid #E5e5e5;\n    border-radius: 5px;\n    font-family: 'FreigBook';\n    font-size: 17px;\n    padding: 6px 0 6px 15px;\n    color: #222; }\n  #setting-body .setting-box {\n    max-width: 1000px;\n    margin: 0 auto;\n    padding: 50px 20px 90px 20px;\n    text-align: center; }\n  #setting-body .sg-field {\n    text-align: left;\n    padding: 10px 0px; }\n  #setting-page {\n  /**** Header body *****/ }\n  #setting-page button {\n    margin-top: 35px;\n    font-family: 'FreigSem';\n    font-size: 18px;\n    background-color: #ff4d4d;\n    border: 1px solid #ff4d4d;\n    border-radius: 4px;\n    padding: 6px 15px 8px 15px;\n    color: white; }\n  #setting-page button i {\n      font-size: 16px; }\n  #setting-page button:hover {\n    border: 1px solid #d94242;\n    background-color: #d94242; }\n  #setting-page .statistics-suggestion-new .suggestion-box {\n    position: absolute;\n    padding: 5px 15px;\n    z-index: 5000;\n    text-align: center;\n    background-color: rgba(0, 0, 0, 0.9);\n    margin-top: 60px;\n    border-radius: 4px; }\n  #setting-page .statistics-suggestion-new .suggestion-box .fa-question-circle {\n      color: white; }\n  #setting-page .statistics-suggestion-new .suggestion-box .fa {\n      background-color: black !important; }\n  #setting-page .statistics-suggestion-new .suggestion-box span {\n      font-family: 'FreigBook';\n      font-size: 14px;\n      color: white; }\n  #setting-page .statistics-suggestion-new .suggestion-about-profile {\n    right: 0;\n    margin-right: 15px;\n    max-width: 160px;\n    -webkit-animation-delay: 12s;\n    animation-delay: 12s; }\n  #setting-page .statistics-suggestion-new .suggestion-discover-meet {\n    margin-left: 50px;\n    max-width: 190px;\n    -webkit-animation-delay: 2s;\n    animation-delay: 2s; }\n  #setting-page .statistics-suggestion-new .suggestion-post-project {\n    margin-left: 270px;\n    max-width: 240px;\n    -webkit-animation-delay: 7s;\n    animation-delay: 7s; }\n  #setting-page .statistics-suggestion-new .suggestion-post-project-nodelay {\n    margin-left: 270px;\n    max-width: 240px;\n    -webkit-animation-delay: 2s;\n    animation-delay: 2s; }\n  #setting-page .statistics-suggestion-new .suggestion-about-profile-nodelay {\n    right: 0;\n    margin-right: 15px;\n    max-width: 160px;\n    -webkit-animation-delay: 2s;\n    animation-delay: 2s; }\n  #setting-page .setting-filter {\n    position: absolute;\n    width: 100%;\n    height: 220px;\n    background-color: rgba(0, 0, 0, 0.5); }\n  #setting-page #setting-header {\n    background-size: cover;\n    background-position: center center;\n    background-repeat: no-repeat;\n    height: 220px; }\n  #setting-page #setting-header .setting-header-title {\n      position: relative;\n      max-width: 500px;\n      margin: 0 auto;\n      text-align: center;\n      padding: 70px 60px 40px 60px; }\n  #setting-page #setting-header .setting-header-title h1 {\n        font-family: 'FreigSem';\n        font-size: 32px;\n        color: white; }\n  #setting-page #setting-header .setting-header-title h5 {\n        font-family: 'FreigBook';\n        font-size: 16px;\n        color: white;\n        margin: 7px 0; }\n  #setting-page #setting-header .setting-navbar .setting-navbar-list {\n      max-width: 1000px;\n      margin: 0 auto; }\n  #setting-page #setting-header .setting-navbar .setting-navbar-list li {\n        position: relative;\n        display: inline-block;\n        font-family: 'FreigSem';\n        font-size: 17px;\n        padding: 17px 20px;\n        color: #999999;\n        z-index: 100; }\n  #setting-page #setting-header .setting-navbar .setting-navbar-list li sup {\n          font-family: 'FreigLight'; }\n  #setting-page #setting-header .setting-navbar .setting-navbar-list .setting-navbar-general {\n        color: white;\n        cursor: pointer; }\n  #setting-page #setting-header .setting-navbar .setting-navbar-list li:hover {\n        color: white;\n        cursor: pointer; }\n  #setting-page #setting-delete {\n    background-color: #f5f5f5;\n    border-top: 1px solid #e5e5e5; }\n  #setting-page #setting-delete .setting-delete-box {\n      max-width: 1000px;\n      margin: 0 auto;\n      text-align: center;\n      padding: 60px 20px; }\n  #setting-page #setting-delete .setting-delete-box h5 {\n        font-family: 'FreigBook';\n        font-size: 14px;\n        color: #999999;\n        margin-bottom: 4px; }\n  #setting-page #setting-delete .setting-delete-box h4 {\n        font-family: 'FreigSem';\n        font-size: 14px;\n        color: #999999;\n        margin-bottom: 4px; }\n  #setting-page #setting-delete .setting-delete-box button {\n        margin: 15px 10px 17px 10px;\n        background-color: #999999;\n        border: 1px solid #999999; }\n  #setting-page #setting-delete .setting-delete-box button:hover {\n        background-color: #999999;\n        border: 1px solid #999999; }\n  /**** General body *****/\n  .general_body_setting {\n  text-align: center; }\n  .general_body_setting form {\n  margin-top: 60px;\n  margin-bottom: 60px;\n  margin-left: auto;\n  margin-right: auto; }\n  .general_body_setting label {\n  padding: 15px 40px 15px 15px; }\n  .general_body_setting input {\n  padding: 8px 10px 8px 10px;\n  margin-left: 30px;\n  border: 1px solid #DBDBDB;\n  border-radius: 5px;\n  margin-bottom: 20px; }\n  .general_body_setting input:focus {\n  outline: 0; }\n  .setting_email {\n  margin-right: 31px; }\n  .general_body_setting .setting_url {\n  position: relative;\n  text-align: left;\n  left: 355px;\n  bottom: 10px;\n  width: 823px; }\n  /**** Password body *****/\n  .password-body-setting form {\n  margin-top: 60px;\n  margin-bottom: 60px; }\n  .password-body-setting label {\n  padding: 15px 10px 15px 15px; }\n  .password-body-setting input {\n  padding: 7px 10px 7px 10px;\n  margin-top: 5px;\n  border: 1px solid #DBDBDB;\n  border-radius: 5px; }\n  .password-body-setting .password-button {\n  text-align: center; }\n  /**** Ranking body *****/\n  .setting-ranking hr {\n  margin-top: 50px; }\n  .setting-ranking h3 {\n  font-family: 'FreigBook';\n  font-size: 18px;\n  color: black;\n  margin-bottom: 50px; }\n  .setting-ranking .srpsi-text {\n  width: 170px;\n  display: inline-block;\n  font-family: 'FreigLight';\n  font-size: 18px; }\n  .setting-ranking .srpsi-number {\n  display: inline-block;\n  font-family: 'FreigBook';\n  font-weight: bold;\n  font-size: 18px; }\n  .setting-ranking .srpsi-number .srpsi-number-est {\n    display: inline-block;\n    font-family: 'FreigBook';\n    font-weight: normal; }\n  .setting-ranking .setting-ranking-up {\n  text-align: left;\n  padding-left: 80px;\n  padding-right: 80px;\n  margin-bottom: 50px; }\n  .setting-ranking .setting-ranking-up .setting-ranking-graph-mobile {\n    display: none; }\n  .setting-ranking .setting-ranking-up .setting-ranking-psi {\n    display: inline-block;\n    width: 45%;\n    margin-bottom: 20px; }\n  .setting-ranking .setting-ranking-up .setting-ranking-psi .tooltipw {\n      display: block;\n      background: black;\n      /*\t\t\t\t\tbottom: 38px;\n\t\t\t\tleft: -7.5px;*/\n      font-family: 'FreigSem';\n      font-size: 13px;\n      color: #fff;\n      opacity: 0;\n      /*\t\t\t\t\twidth: 80px;\n*/\n      padding: 3px 5px;\n      border-radius: 4px;\n      pointer-events: none;\n      position: absolute;\n      z-index: 1000000;\n      /*\t\t\t\tmargin-top: -25px;\n*/\n      -webkit-transform: translateY(10px);\n      transform: translateY(10px);\n      -webkit-transition: all .25s ease-out;\n      transition: all .25s ease-out;\n      /*-webkit-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);\n\t\t\t\t-moz-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);\n\t\t\t\t-ms-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);\n\t\t\t\t-o-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);\n\t\t\t\tbox-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);*/ }\n  .setting-ranking .setting-ranking-up .setting-ranking-psi .tooltipw:before {\n      bottom: -20px;\n      content: \" \";\n      display: block;\n      height: 20px;\n      left: 0;\n      position: absolute; }\n  .setting-ranking .setting-ranking-up .setting-ranking-psi .tooltipw:after {\n      border-left: solid transparent 6px;\n      border-right: solid transparent 6px;\n      border-bottom: solid black 6px;\n      bottom: 24px;\n      content: \" \";\n      height: 0;\n      left: 50%;\n      margin-left: -7px;\n      position: absolute; }\n  .setting-ranking .setting-ranking-up .setting-ranking-psi .setting-ranking-profile:hover .tooltipw {\n      opacity: 1;\n      pointer-events: auto;\n      -webkit-transform: translateY(30px);\n      transform: translateY(30px); }\n  .setting-ranking .setting-ranking-up .setting-ranking-psi .setting-ranking-share {\n      margin-bottom: 35px; }\n  .setting-ranking .setting-ranking-up .setting-ranking-psi .setting-ranking-share .fb-share {\n        display: inline-block;\n        margin-bottom: 15px;\n        margin-right: 15px; }\n  .setting-ranking .setting-ranking-up .setting-ranking-psi .setting-ranking-share .fb-share button {\n          margin-top: 15px !important;\n          background-color: #46629E !important;\n          font-family: 'FreigSem' !important;\n          font-size: 14px !important;\n          color: white !important;\n          padding: 10px 10px 10px 5px !important;\n          border: 1px solid #46629E !important;\n          border-radius: 4px !important; }\n  .setting-ranking .setting-ranking-up .setting-ranking-psi .setting-ranking-share .fb-share button i {\n            padding: 0 10px 0 5px !important; }\n  .setting-ranking .setting-ranking-up .setting-ranking-psi .setting-ranking-share .fb-share button:hover {\n          background-color: #344e7a !important;\n          border: 1px solid #344e7a !important; }\n  .setting-ranking .setting-ranking-up .setting-ranking-psi .setting-ranking-share .tw-share {\n        display: inline-block;\n        margin-bottom: 15px; }\n  .setting-ranking .setting-ranking-up .setting-ranking-psi .setting-ranking-share .tw-share button {\n          margin-top: 15px !important;\n          text-align: left  !important;\n          background-color: #4099FF  !important;\n          font-family: 'FreigSem'  !important;\n          font-size: 14px  !important;\n          color: white;\n          padding: 10px 20px 10px 13px  !important;\n          border: 1px solid #4099FF  !important;\n          border-radius: 4px  !important;\n          margin: 0  !important; }\n  .setting-ranking .setting-ranking-up .setting-ranking-psi .setting-ranking-share .tw-share i {\n          margin-right: 5px  !important;\n          margin-left: 0px  !important; }\n  .setting-ranking .setting-ranking-up .setting-ranking-psi .setting-ranking-share .tw-share button:hover {\n          background-color: #0077FF  !important;\n          border: 1px solid #0077FF  !important; }\n  .setting-ranking .setting-ranking-up .setting-ranking-psi .setting-ranking-social:hover .tooltipw {\n      opacity: 1;\n      pointer-events: auto;\n      -webkit-transform: translateY(30px);\n      transform: translateY(30px); }\n  .setting-ranking .setting-ranking-up .setting-ranking-invitation .sri-title {\n    margin-bottom: 15px; }\n  .setting-ranking .setting-ranking-up .setting-ranking-invitation .sri-title:hover .tooltipw {\n    opacity: 1;\n    pointer-events: auto;\n    -webkit-transform: translateY(30px);\n    transform: translateY(30px); }\n  .setting-ranking .setting-ranking-up .setting-ranking-invitation .sri-box .sri-box-illustre-img {\n    display: inline-block;\n    margin-right: 25px;\n    width: 144px; }\n  .setting-ranking .setting-ranking-up .setting-ranking-invitation .sri-box .sri-box-illustre-img img {\n      border-radius: 50%;\n      height: 34px;\n      width: 34px; }\n  .setting-ranking .setting-ranking-up .setting-ranking-invitation .sri-box .srpsi-button {\n    display: inline-block;\n    vertical-align: top;\n    padding: 8px 15px;\n    border: 1px solid black;\n    border-radius: 4px;\n    font-family: 'FreigMed';\n    font-size: 16px;\n    color: black;\n    cursor: pointer;\n    webkit-transition: all 200ms linear;\n    -kthtml-transition: all 200ms linear;\n    -webkit-transition: all 200ms linear;\n    transition: all 200ms linear; }\n  .setting-ranking .setting-ranking-up .setting-ranking-invitation .sri-box .srpsi-button img {\n      position: relative;\n      bottom: 1px;\n      margin-right: 10px;\n      webkit-transition: all 200ms linear;\n      -kthtml-transition: all 200ms linear;\n      -webkit-transition: all 200ms linear;\n      transition: all 200ms linear; }\n  .setting-ranking .setting-ranking-up .setting-ranking-invitation .sri-box .srpsi-button:hover {\n    background-color: black;\n    border: 1px solid white;\n    color: white; }\n  .setting-ranking .setting-ranking-up .setting-ranking-graph {\n    display: inline-block;\n    width: 50%;\n    text-align: center;\n    margin-left: 30px; }\n  .setting-ranking .setting-ranking-up .setting-ranking-graph #myCanvas {\n      position: relative;\n      right: 10px;\n      margin-left: 30px; }\n  .setting-ranking .setting-ranking-up .setting-ranking-graph h2 {\n      position: relative;\n      top: 10px;\n      font-family: 'FreigLight';\n      font-size: 28px;\n      color: black; }\n  .setting-ranking .setting-ranking-up .setting-ranking-graph h2 .srg-myrank {\n        font-family: 'FreigSem';\n        font-size: 32px; }\n  .setting-ranking .setting-ranking-up .setting-ranking-graph h2 .srg-compare {\n        position: relative;\n        font-family: 'FreigLight';\n        font-size: 21px;\n        bottom: 2px; }\n  .setting-ranking .setting-ranking-up .setting-ranking-graph h5 {\n      font-family: 'FreigBook';\n      color: #999999;\n      margin-top: 10px; }\n  .setting-ranking .setting-ranking-down {\n  text-align: center;\n  padding-left: 30px;\n  margin-bottom: 30px; }\n  .setting-ranking .setting-ranking-down h4 {\n    font-family: 'FreigBook';\n    font-size: 18px;\n    color: black;\n    margin-bottom: 30px; }\n  .setting-ranking .setting-ranking-down .srd-ul {\n    display: inline-block;\n    padding-right: 30px; }\n  .setting-ranking .setting-ranking-down ul {\n    text-align: left; }\n  .setting-ranking .setting-ranking-down ul li {\n      margin-bottom: 2px; }\n  .setting-ranking .setting-ranking-down ul li .tooltipw {\n        display: block;\n        background: black;\n        /*\t\t\t\t\tbottom: 38px;\n\t\t\t\t\tleft: -7.5px;*/\n        font-family: 'FreigSem';\n        font-size: 13px;\n        color: #fff;\n        opacity: 0;\n        /*\t\t\t\t\twidth: 80px;\n*/\n        padding: 3px 5px;\n        border-radius: 4px;\n        pointer-events: none;\n        position: absolute;\n        -webkit-transform: translateY(10px);\n        transform: translateY(10px);\n        -webkit-transition: all .25s ease-out;\n        transition: all .25s ease-out;\n        /*-webkit-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);\n\t\t\t\t\t-moz-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);\n\t\t\t\t\t-ms-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);\n\t\t\t\t\t-o-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);\n\t\t\t\t\tbox-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);*/ }\n  .setting-ranking .setting-ranking-down ul li .tooltipw:before {\n        bottom: -20px;\n        content: \" \";\n        display: block;\n        height: 20px;\n        left: 0;\n        position: absolute; }\n  .setting-ranking .setting-ranking-down ul li .tooltipw:after {\n        border-left: solid transparent 6px;\n        border-right: solid transparent 6px;\n        border-bottom: solid black 6px;\n        bottom: 24px;\n        content: \" \";\n        height: 0;\n        left: 50%;\n        margin-left: -7px;\n        position: absolute; }\n  .setting-ranking .setting-ranking-down ul li:hover .tooltipw {\n      opacity: 1;\n      pointer-events: auto;\n      -webkit-transform: translateY(30px);\n      transform: translateY(30px); }\n  .setting-ranking .setting-ranking-down ul span {\n      margin-right: 20px; }\n"

/***/ }),

/***/ "./src/app/Components/settings/settings.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_Profiles_profiles_service__ = __webpack_require__("./src/app/Services/Profiles/profiles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_account_service__ = __webpack_require__("./src/app/Services/account.service.ts");
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



var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(TokenService, ProfilesService) {
        this.TokenService = TokenService;
        this.ProfilesService = ProfilesService;
    }
    SettingsComponent.prototype.ngOnInit = function () {
        this.getUserProfile();
    };
    SettingsComponent.prototype.getUserProfile = function () {
        var _this = this;
        this.ProfilesService.getProfile(this.TokenService.getToken().user.id)
            .subscribe(function (res) {
            _this.profile = res.profile;
        });
    };
    SettingsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-settings',
            template: __webpack_require__("./src/app/Components/settings/settings.component.html"),
            styles: [__webpack_require__("./src/app/Components/settings/settings.component.scss")],
            providers: [__WEBPACK_IMPORTED_MODULE_2__Services_Profiles_profiles_service__["a" /* ProfilesService */], __WEBPACK_IMPORTED_MODULE_3__Services_account_service__["a" /* AccountService */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_Authentication_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_Authentication_token_service__["a" /* TokenService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__Services_Profiles_profiles_service__["a" /* ProfilesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_Profiles_profiles_service__["a" /* ProfilesService */]) === "function" && _b || Object])
    ], SettingsComponent);
    return SettingsComponent;
    var _a, _b;
}());

//# sourceMappingURL=settings.component.js.map

/***/ }),

/***/ "./src/app/Components/settings/settings.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsModule", function() { return SettingsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__ = __webpack_require__("./src/app/Pipes/pipe.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__footer_footer_module__ = __webpack_require__("./src/app/Components/footer/footer.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__settings_component__ = __webpack_require__("./src/app/Components/settings/settings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__setting_password_setting_password_component__ = __webpack_require__("./src/app/Components/settings/setting-password/setting-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__setting_notification_setting_notification_component__ = __webpack_require__("./src/app/Components/settings/setting-notification/setting-notification.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__setting_invitation_setting_invitation_component__ = __webpack_require__("./src/app/Components/settings/setting-invitation/setting-invitation.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__setting_general_setting_general_component__ = __webpack_require__("./src/app/Components/settings/setting-general/setting-general.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Services_Authentication_authentication_service__ = __webpack_require__("./src/app/Services/Authentication/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Services_Networks_networks_service__ = __webpack_require__("./src/app/Services/Networks/networks.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Directives_directives_module__ = __webpack_require__("./src/app/Directives/directives.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Routes_settings_routes__ = __webpack_require__("./src/app/Routes/settings.routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






/* Components */





/* Services */


/* Directives */

/* Library */
/* Route */

var SettingsModule = /** @class */ (function () {
    function SettingsModule() {
    }
    SettingsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_14__Routes_settings_routes__["a" /* SETTINGS_ROUTES */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["f" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__["a" /* PipeModule */],
                __WEBPACK_IMPORTED_MODULE_5__footer_footer_module__["a" /* FooterModule */],
                __WEBPACK_IMPORTED_MODULE_13__Directives_directives_module__["a" /* DirectivesModule */]
            ],
            exports: [],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__settings_component__["a" /* SettingsComponent */],
                __WEBPACK_IMPORTED_MODULE_7__setting_password_setting_password_component__["a" /* SettingPasswordComponent */],
                __WEBPACK_IMPORTED_MODULE_8__setting_notification_setting_notification_component__["a" /* SettingNotificationComponent */],
                __WEBPACK_IMPORTED_MODULE_9__setting_invitation_setting_invitation_component__["a" /* SettingInvitationComponent */],
                __WEBPACK_IMPORTED_MODULE_10__setting_general_setting_general_component__["a" /* SettingGeneralComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_11__Services_Authentication_authentication_service__["a" /* AuthenticationService */],
                __WEBPACK_IMPORTED_MODULE_12__Services_Networks_networks_service__["a" /* NetworksService */]
            ]
        })
    ], SettingsModule);
    return SettingsModule;
}());

//# sourceMappingURL=settings.module.js.map

/***/ }),

/***/ "./src/app/Routes/settings.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SETTINGS_ROUTES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Components_settings_settings_component__ = __webpack_require__("./src/app/Components/settings/settings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Components_settings_setting_password_setting_password_component__ = __webpack_require__("./src/app/Components/settings/setting-password/setting-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Components_settings_setting_general_setting_general_component__ = __webpack_require__("./src/app/Components/settings/setting-general/setting-general.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_Authentication_authentication_service__ = __webpack_require__("./src/app/Services/Authentication/authentication.service.ts");

/* Components */



/* Services */

/* Librairies */
var routes = [
    { path: '', canActivate: [__WEBPACK_IMPORTED_MODULE_4__Services_Authentication_authentication_service__["a" /* AuthenticationService */]], component: __WEBPACK_IMPORTED_MODULE_1__Components_settings_settings_component__["a" /* SettingsComponent */],
        children: [
            { path: '', redirectTo: 'general', pathMatch: 'full' },
            { path: 'general', component: __WEBPACK_IMPORTED_MODULE_3__Components_settings_setting_general_setting_general_component__["a" /* SettingGeneralComponent */] },
            { path: 'password', component: __WEBPACK_IMPORTED_MODULE_2__Components_settings_setting_password_setting_password_component__["a" /* SettingPasswordComponent */] },
        ]
    }
];
var SETTINGS_ROUTES = __WEBPACK_IMPORTED_MODULE_0__angular_router__["f" /* RouterModule */].forChild(routes);
//# sourceMappingURL=settings.routes.js.map

/***/ })

});
//# sourceMappingURL=settings.module.chunk.js.map