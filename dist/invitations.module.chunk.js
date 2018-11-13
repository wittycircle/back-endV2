webpackJsonp(["invitations.module"],{

/***/ "./src/app/Components/invitations/invitation-profile/invitation-profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"main-signup-page-bg\">\n<div class=\"fake-page\" style=\"position: absolute; width: 100vw; height: 1200px; top: 0; background-image: url('https://res.cloudinary.com/dqpkpmrgk/image/upload/c_scale,q_39,w_1440/v1491777466/hy4wgahtpy3oxmlwgnl0.png'); background-position: center center; background-size: cover\">\n    <div style=\"width: inherit; height: inherit; background-color: rgba(0, 0, 0, 0.6)\" >\n\n    </div>\n</div>\n\n\n<!-- *** Invite by people with invite link *** -->\n<section class=\"invitation-profile-text\" *ngIf=\"invite1 && profile\">\n    <h2 class=\"freigs\" >Lucky you.</h2>\n\n    <h3 class=\"freigs\">An invitation to join {{ profile.first_name }}'s network is waiting for you</h3>\n</section>\n\n\n\n<!-- *** Invite by network with token *** -->\n<section class=\"invitation-network\" *ngIf=\"invite2\">\n    <h1 class=\"freigm\">#welcome{{ network }}</h1>\n    <h3 class=\"freigb\">We give exposure to all the ideas, projects and startups from around the world <br />and connect them to the people they need, instantly.</h3>\n</section>\n\n\n\n<!-- *** Invite by Witty *** -->\n<section class=\"invitation-marketing\" *ngIf=\"invite3\">\n    <h2 class=\"freigs\">Lucky you.</h2>\n\n    <h3 class=\"freigs\">38 of your contacts recently joined Witty.</h3>\n</section>\n\n\n\n<section id=\"main-signup-page\" style=\"position: relative; z-index: 100; padding-bottom: 0; overflow: none\" *ngIf=\"invite1 || invite2 || invite3\">\n    <div class=\"signup-modal-social signup-login-social\" style=\"padding: 0\" [style.marginTop]=\"getMargin()\">\n\n        <!-- *** Invite by people with invite link *** -->\n        <div *ngIf=\"invite1 && profile\" style=\"padding: 0px 0 15px 0; position: relative; bottom: 30px;\">\n        \t<img src=\"{{ profile.picture }}\" style=\"width: 55px; border-radius: 50%; margin: 0 auto\">\n            <h1 class=\"freigs\" >#hi</h1>\n        \t<h4 style=\"font-size: 16px; font-family: 'FreigBook'; color: black; margin-top: 0; color: #999; \">Your invitation will get <span class=\"freigs\" style=\"color: #999\">you</span> a <span class=\"freigs\" style=\"color: #999\">free lifetime premium</span> account 🎉</h4>\n            <span class=\"freigb textspan\" *ngIf=\"!myLink && !expired\" >expires in {{ this.hours }}h {{ this.minutes }}m {{this.seconds}}s</span>\n            <span class=\"freigb textspan\" *ngIf=\"!myLink && expired\" >This invitation has expired :(</span>\n        </div>\n\n\n        <!-- *** Invite by Witty *** -->\n        <div class=\"invitation-signup-invite3\" *ngIf=\"invite3\">\n            <div class=\"isi-pictures flex\">\n            \t<figure>\n            \t\t<img src=\"http://res.cloudinary.com/dqpkpmrgk/image/upload/v1510755129/Witty-icon/User%20Status/5_people_from_network_H73JCH7WF34-01.png\" alt='user-pictures' />\n            \t</figure>\n                <!-- <figure>\n                    <img src=\"/public/images/YourNetwork_User3.png\">\n                </figure>\n                <figure class=\"lap-image1\">\n                    <img src=\"/public/images/YourNetwork_User2.png\">\n                </figure>\n                <figure class=\"lap-image2\">\n                    <img src=\"/public/images/YourNetwork_User5.png\">\n                </figure>\n                <figure class=\"lap-image3\">\n                    <img src=\"/public/images/YourNetwork_User4.png\">\n                </figure>\n                <figure class=\"lap-image4\">\n                    <img src=\"/public/images/YourNetwork_User1.png\">\n                </figure> -->\n            </div>\n\n            <h1 class=\"freigs\" >#hi</h1>\n            <h4 class=\"freigb\" style=\"font-size: 16px; font-family: 'FreigBook'; color: black; margin-top: 0; color: #999; \">Your invitation will get <span class=\"freigs\" style=\"color: #999\">you</span> a <span class=\"freigs\" style=\"color: #999\">free lifetime premium</span> account 🎉</h4>\n            <span class=\"freigb textspan\" *ngIf=\"!myLink && !expired\" >expires in {{ this.hours }}h {{ this.minutes }}m {{this.seconds}}s</span>\n            <span class=\"freigb textspan\" *ngIf=\"!myLink && expired\" >This invitation has expired :(</span>\n        </div>\n\n\n        <div class=\"fb-login\">\n            <a href=\"api/auth/facebook\" target=\"_self\">\n                <button><i class=\"fa fa-facebook\" style=\"color: white\"></i>Log in with Facebook</button>\n            </a>\n        </div>\n        <div class=\"go-login\">\n            <a href=\"/api/auth/google\" target=\"_self\">\n                <button class=\"go-login\"><img src=\"/public/images/social_media/newgoogle-logo.svg\">Log in with Google</button>\n            </a>\n        </div>\n    </div>\n    <div class=\"signup-modal-old signup-login-old\">\n        <div class=\"old-dash\"></div>\n        <h4>Let's get you started</h4>\n        <div class=\"old-dash\"></div>\n    </div>\n    <div class=\"signup-modal-field\">\n        <p *ngIf=\"eat\">Email is already taken</p>\n    \t<div class=\"signup-firstname-field firstname-input\">\n    \t\t<input type=\"text\" [(ngModel)]=\"form.first_name\" placeholder=\"First name\" />\n            <p *ngIf=\"fn_err\">This is a required field</p>\n    \t</div>\n    \t<div class=\"signup-lastname-field lastname-input\">\n    \t\t<input type=\"text\" [(ngModel)]=\"form.last_name\" placeholder=\"Last name\"/>\n            <p *ngIf=\"ln_err\">This is a required field</p>\n    \t</div>\n    \t<div class=\"signup-email-field email-input\">\n    \t\t<input type=\"email\" [(ngModel)]=\"form.email\" placeholder=\"Email address\"/>\n            <p *ngIf=\"email_err\">Address must be valid</p>\n    \t</div>\n    \t<div class=\"signup-password-field password-input\">\n    \t\t<input type=\"password\" [(ngModel)]=\"form.password\" placeholder=\"Password (minimum 8 characters)\"/>\n            <p *ngIf=\"pw_err\">This is a required field</p>\n            <span [ngClass]=\"form.password | passwordMeter:'class'\">{{form.password | passwordMeter:'text'}}</span>\n    \t</div>\n    </div>\n    <div class=\"sign-modal-policy\">\n        <p>By creating an account, I accept Wittycircle's <br /> <a href=\"/terms\" target=\"_blank\"><strong><u>Terms of Service</u></strong></a>,\n        and <a href=\"/privacy\" target=\"_blank\"><strong><u>Privacy Policy</u></strong></a>.\n        </p>\n    </div>\n    <div class=\"signup-modal-button\">\n        <button type=\"submit\" (click)=\"signUp()\" *ngIf=\"invite1 || invite3\">Join</button>\n        <button type=\"submit\" (click)=\"signUp()\" *ngIf=\"invite2\">Claim your {{ network }} account</button>\n    </div>\n\n    <div class=\"signup-modal-footer\">\n        <h4>Already have an account? <strong><u><a href=\"/login\">Sign in</a></u></strong></h4>\n    </div>\n</section>\n</div>\n<app-footer></app-footer>\n\n"

/***/ }),

/***/ "./src/app/Components/invitations/invitation-profile/invitation-profile.component.scss":
/***/ (function(module, exports) {

module.exports = ".main-signup-page-bg {\n  background-color: #e5e5e5;\n  padding: 98px 0 88px 0; }\n  .main-signup-page-bg .invitation-network {\n    position: relative;\n    text-align: center;\n    width: 600px;\n    margin: 0 auto;\n    margin-bottom: 25px; }\n  .main-signup-page-bg .invitation-network h1 {\n      font-size: 38px; }\n  .main-signup-page-bg .invitation-network span {\n      font-size: 38px; }\n  .main-signup-page-bg .invitation-network h3 {\n      text-align: left;\n      font-size: 18px; }\n  .main-signup-page-bg .invitation-profile-text, .main-signup-page-bg .invitation-marketing {\n    position: relative;\n    text-align: center;\n    margin-bottom: 65px; }\n  .main-signup-page-bg .invitation-profile-text h2, .main-signup-page-bg .invitation-marketing h2 {\n      font-size: 32px; }\n  .main-signup-page-bg .invitation-profile-text h3, .main-signup-page-bg .invitation-marketing h3 {\n      margin-top: 15px;\n      font-size: 18px; }\n  .main-signup-page-bg #main-signup-page {\n    max-width: 600px;\n    margin: 0 auto;\n    padding: 5px 0 15px 0;\n    background-color: white;\n    border-radius: 4px;\n    border: 1px solid #e5e5e5; }\n  .main-signup-page-bg #main-signup-page .signup-modal-social {\n      padding: 0 55px 25px 60px; }\n  .main-signup-page-bg #main-signup-page .signup-modal-social h1 {\n        color: #222;\n        font-size: 38px; }\n  .main-signup-page-bg #main-signup-page .signup-modal-social .invitation-signup-invite3 {\n        padding: 0px 0 15px 0;\n        position: relative;\n        bottom: 30px; }\n  .main-signup-page-bg #main-signup-page .signup-modal-social .invitation-signup-invite3 h4 {\n          color: black;\n          margin-top: 0; }\n  .main-signup-page-bg #main-signup-page .signup-modal-social .invitation-signup-invite3 .isi-pictures {\n          /*justify-content: center;\n\t\t\t\t\tpadding-left: 75px;\n\n\t\t\t\t\tfigure {\n\t\t\t\t\t\tborder-radius: 50%;\n\t\t\t\t\t\tborder: 3px solid white;\n\t\t\t\t\t\toverflow: hidden;\n\n\t\t\t\t\t\timg {\n\t\t\t\t\t\t\twidth: 55px;\n\t\t\t\t\t\t\tborder-radius: 50%;\n\t\t\t\t\t\t\tmargin:\t-7px;\n\t\t\t\t\t\t\tpadding: 5px;\n\t\t\t\t\t\t\t-webkit-filter: blur(2px);\n\t\t\t\t\t\t\t-moz-filter: blur(2px);\n\t\t\t\t\t\t\t-o-filter: blur(2px);\n\t\t\t\t\t\t\t-ms-filter: blur(2px);\n\t\t\t\t\t\t\tfilter: blur(2px);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\t.lap-image1, .lap-image2, .lap-image3, .lap-image4 {\n\t\t\t\t\t\tposition: relative;\n\t\t\t\t\t}\n\n\t\t\t\t\t.lap-image1 {\n\t\t\t\t\t\tright: 15px;\n\t\t\t\t\t}\n\n\t\t\t\t\t.lap-image2 {\n\t\t\t\t\t\tright: 35px;\n\t\t\t\t\t}\n\n\t\t\t\t\t.lap-image3 {\n\t\t\t\t\t\tright: 55px;\n\t\t\t\t\t}\n\n\t\t\t\t\t.lap-image4 {\n\t\t\t\t\t\tright: 75px;\n\t\t\t\t\t}\n*/ }\n  .main-signup-page-bg #main-signup-page .signup-modal-social .invitation-signup-invite3 .isi-pictures figure {\n            margin: 0 auto; }\n  .main-signup-page-bg #main-signup-page .signup-modal-social .invitation-signup-invite3 .isi-pictures figure img {\n              height: 45px; }\n  .main-signup-page-bg #main-signup-page .signup-modal-social .fb-login, .main-signup-page-bg #main-signup-page .signup-modal-social .fb-share {\n        display: inline-block;\n        margin-right: 20px; }\n  .main-signup-page-bg #main-signup-page .signup-modal-social .fb-login button, .main-signup-page-bg #main-signup-page .signup-modal-social .fb-share button {\n          padding: 10px 20px 10px 10px; }\n  .main-signup-page-bg #main-signup-page .signup-modal-social .go-login {\n        display: inline-block;\n        border: 1px solid #e5e5e5;\n        border-radius: 4px; }\n  .main-signup-page-bg #main-signup-page .signup-modal-social .go-login button {\n          padding: 10px 35px 10px 13px; }\n  .main-signup-page-bg #main-signup-page .signup-modal-social .textspan {\n        font-size: 14px;\n        color: #999; }\n  .main-signup-page-bg #main-signup-page .signup-login-social h4 {\n      padding-top: 10px;\n      padding-bottom: 0; }\n  .main-signup-page-bg #main-signup-page .signup-modal-old {\n      text-align: center;\n      padding: 0 30px; }\n  .main-signup-page-bg #main-signup-page .signup-modal-old .old-dash {\n        width: 30%; }\n  .main-signup-page-bg #main-signup-page .signup-modal-field {\n      text-align: center;\n      padding: 20px 55px; }\n  .main-signup-page-bg #main-signup-page .signup-modal-field p {\n        font-family: 'FreigBook';\n        font-size: 16px;\n        margin-top: 3px;\n        margin-bottom: 0;\n        color: #ff4d4d; }\n  .main-signup-page-bg #main-signup-page .signup-modal-field .signup-firstname-field,\n      .main-signup-page-bg #main-signup-page .signup-modal-field .signup-lastname-field {\n        display: inline-block;\n        margin-top: 10px;\n        text-align: left; }\n  .main-signup-page-bg #main-signup-page .signup-modal-field .signup-firstname-field input,\n        .main-signup-page-bg #main-signup-page .signup-modal-field .signup-lastname-field input {\n          width: 232px;\n          margin: 0; }\n  .main-signup-page-bg #main-signup-page .signup-modal-field .signup-firstname-field p,\n        .main-signup-page-bg #main-signup-page .signup-modal-field .signup-lastname-field p {\n          font-family: 'FreigBook';\n          font-size: 16px;\n          margin-top: 3px;\n          margin-bottom: 0;\n          color: #ff4d4d; }\n  .main-signup-page-bg #main-signup-page .signup-modal-field .signup-firstname-field {\n        float: left;\n        margin-right: 20px; }\n  .main-signup-page-bg #main-signup-page .signup-modal-field input {\n        display: block;\n        width: 100%;\n        margin: 15px auto 3px auto;\n        font-family: 'FreigBook';\n        font-size: 16px;\n        color: #999999;\n        padding: 10px 20px 10px 40px;\n        border: 1px solid #bebebe;\n        border-radius: 4px; }\n  .main-signup-page-bg #main-signup-page .signup-modal-field .signup-email-field,\n      .main-signup-page-bg #main-signup-page .signup-modal-field .signup-password-field {\n        text-align: left; }\n  .main-signup-page-bg #main-signup-page .signup-modal-field .signup-email-field p,\n        .main-signup-page-bg #main-signup-page .signup-modal-field .signup-password-field p {\n          display: inline-block;\n          font-family: 'FreigBook';\n          font-size: 16px;\n          margin-top: 3px;\n          margin-bottom: 0;\n          color: #ff4d4d; }\n  .main-signup-page-bg #main-signup-page .signup-modal-field .signup-email-field .pw-week,\n        .main-signup-page-bg #main-signup-page .signup-modal-field .signup-password-field .pw-week {\n          position: absolute;\n          right: 0;\n          margin-right: 60px;\n          font-family: 'FreigSem';\n          font-size: 16px;\n          color: red; }\n  .main-signup-page-bg #main-signup-page .signup-modal-field .signup-email-field .pw-okey,\n        .main-signup-page-bg #main-signup-page .signup-modal-field .signup-password-field .pw-okey {\n          position: absolute;\n          right: 0;\n          margin-right: 60px;\n          font-family: 'FreigSem';\n          font-size: 16px;\n          color: #FF9933; }\n  .main-signup-page-bg #main-signup-page .signup-modal-field .signup-email-field .pw-strong,\n        .main-signup-page-bg #main-signup-page .signup-modal-field .signup-password-field .pw-strong {\n          position: absolute;\n          right: 0;\n          margin-right: 60px;\n          font-family: 'FreigSem';\n          font-size: 16px;\n          color: #00FF00; }\n  .main-signup-page-bg #main-signup-page .sign-modal-policy {\n      text-align: center;\n      padding: 0 60px; }\n  .main-signup-page-bg #main-signup-page .sign-modal-policy p {\n        font-family: 'FreigBook';\n        font-size: 14px;\n        color: #999999; }\n  .main-signup-page-bg #main-signup-page .sign-modal-policy p strong {\n          color: #808080;\n          cursor: pointer; }\n  .main-signup-page-bg #main-signup-page .signup-modal-button {\n      text-align: center;\n      padding: 10px 55px; }\n  .main-signup-page-bg #main-signup-page .signup-modal-button button {\n        background-color: #ff4d4d;\n        width: auto;\n        font-family: 'FreigSem';\n        font-size: 18px;\n        color: white;\n        padding: 8px 15px 10px 15px;\n        border-radius: 4px;\n        border: none;\n        margin-top: 10px; }\n  .main-signup-page-bg #main-signup-page .signup-modal-footer {\n      text-align: center;\n      padding: 20px 60px; }\n  .main-signup-page-bg #main-signup-page .signup-modal-footer h4 {\n        border-top: 1px solid #e5e5e5;\n        font-family: 'FreigBook';\n        font-size: 16px;\n        color: #999999;\n        padding: 20px 15px 0 15px; }\n  .main-signup-page-bg #main-signup-page .signup-modal-footer h4 u {\n          cursor: pointer; }\n  .main-signup-page-bg #main-signup-page .signup-modal-footer h4 u a {\n            color: #999999; }\n  /******************** MOBILE ****************************/\n  @media only screen and (max-width: 736px) {\n  .main-signup-page-bg {\n    padding-bottom: 0; }\n    .main-signup-page-bg .invitation-network {\n      width: auto;\n      padding: 20px; }\n      .main-signup-page-bg .invitation-network h1 {\n        margin-bottom: 10px; }\n    .main-signup-page-bg #main-signup-page {\n      border-radius: 0; }\n      .main-signup-page-bg #main-signup-page .signup-modal-social .fb-login {\n        margin-right: 0; }\n      .main-signup-page-bg #main-signup-page .signup-modal-old .old-dash {\n        width: auto; }\n      .main-signup-page-bg #main-signup-page .signup-modal-field {\n        padding: 15px; }\n        .main-signup-page-bg #main-signup-page .signup-modal-field .signup-firstname-field, .main-signup-page-bg #main-signup-page .signup-modal-field .signup-lastname-field {\n          width: 100%; }\n          .main-signup-page-bg #main-signup-page .signup-modal-field .signup-firstname-field input, .main-signup-page-bg #main-signup-page .signup-modal-field .signup-lastname-field input {\n            width: 100%; } }\n"

/***/ }),

/***/ "./src/app/Components/invitations/invitation-profile/invitation-profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvitationProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_shared_service__ = __webpack_require__("./src/app/Services/shared.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_account_service__ = __webpack_require__("./src/app/Services/account.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_Authentication_auth_index__ = __webpack_require__("./src/app/Services/Authentication/auth-index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_Invitation_invitation_service__ = __webpack_require__("./src/app/Services/Invitation/invitation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Services_Networks_networks_service__ = __webpack_require__("./src/app/Services/Networks/networks.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Services_Trackings_tracking_service__ = __webpack_require__("./src/app/Services/Trackings/tracking.service.ts");
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
var InvitationProfileComponent = /** @class */ (function () {
    function InvitationProfileComponent(SharedService, AccountService, AuthenticationService, route, router, InvitationService, NetworksService, TokenService, TrackingService) {
        this.SharedService = SharedService;
        this.AccountService = AccountService;
        this.AuthenticationService = AuthenticationService;
        this.route = route;
        this.router = router;
        this.InvitationService = InvitationService;
        this.NetworksService = NetworksService;
        this.TokenService = TokenService;
        this.TrackingService = TrackingService;
        this.form = {};
        this.fn_err = false;
        this.ln_err = false;
        this.email_err = false;
        this.pw_err = false;
        this.visible = true;
        this.invite1 = false;
        this.invite2 = false;
        this.invite3 = false;
        this.myLink = false;
        this.expired = false;
        this.initParams();
    }
    InvitationProfileComponent.prototype.validateForm = function (form) {
        this.fn_err = this.ln_err = this.email_err = this.pw_err = true;
        if (form.first_name)
            this.fn_err = false;
        if (form.last_name)
            this.ln_err = false;
        if (form.email) {
            var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            this.email_err = !reg.test(form.email);
        }
        if (form.password)
            this.pw_err = form.password.length >= 8 ? false : true;
        return (this.fn_err && this.ln_err && this.email_err && this.pw_err);
    };
    InvitationProfileComponent.prototype.ngOnInit = function () {
        this.form = {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        };
    };
    InvitationProfileComponent.prototype.trackViewPage = function (page_id) {
        var token = this.TokenService.getToken();
        this.TrackingService.viewActivities({}, token, page_id).subscribe(function (r) { });
    };
    InvitationProfileComponent.prototype.initCookie = function (name) {
        localStorage.setItem('network', name);
    };
    InvitationProfileComponent.prototype.initParams = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params['invite_id'] !== 's5fZnFqodHSDS8SOPHfWZxUf2ssFbEnP') {
                _this.invite1 = true;
                _this.invite_id = params['invite_id'];
                _this.getUserByInviteId(_this.invite_id);
                _this.trackViewPage(2);
            }
            else if (params['invite_id'] === 's5fZnFqodHSDS8SOPHfWZxUf2ssFbEnP') {
                _this.invite3 = true;
                _this.setDeadlineTime();
                _this.trackViewPage(1);
            }
            else {
                _this.network = params['network'];
                _this.getNetworkInfo(params['token']);
                _this.trackViewPage(3);
            }
        });
    };
    InvitationProfileComponent.prototype.setDeadlineTime = function () {
        var token = this.TokenService.getToken();
        var d = new Date();
        if (token && this.profile && token.user.id === this.profile['uid'])
            this.myLink = true;
        if (!this.myLink) {
            if (!localStorage.getItem('invite-counter')) {
                localStorage.setItem('invite-counter', d.getTime().toString());
                this.counterFromTimestamp(d.getTime());
            }
            else {
                this.counterFromTimestamp(parseInt(localStorage.getItem('invite-counter')));
            }
        }
    };
    InvitationProfileComponent.prototype.counterFromTimestamp = function (timestamp) {
        var _this = this;
        var d = new Date();
        var timeLimit = 1000 * 60 * 60 * 13 - 830046;
        var timeSpend = d.getTime() - timestamp;
        var timeRemain = (timeLimit - timeSpend) / 1000;
        if (timeRemain > 0) {
            setInterval(function () {
                timeRemain--; // decrement timestamp with one second each second
                _this.hours = _this.component(timeRemain, 60 * 60) % 24, // hours
                    _this.minutes = _this.component(timeRemain, 60) % 60, // minutes
                    _this.seconds = _this.component(timeRemain, 1) % 60; // seconds
                if (timeRemain < 0)
                    _this.expired = true;
            }, 1000); // interval each second = 1000 ms
        }
        else
            this.expired = true;
    };
    InvitationProfileComponent.prototype.component = function (x, v) {
        return Math.floor(x / v);
    };
    InvitationProfileComponent.prototype.getNetworkInfo = function (token) {
        var _this = this;
        this.NetworksService.getNetworkInvitation(token).subscribe(function (res) {
            if (res.informations[0]) {
                _this.invite2 = true;
                _this.initCookie(res.informations[0]['name']);
            }
            else
                _this.router.navigate(['/']);
        });
    };
    InvitationProfileComponent.prototype.getUserByInviteId = function (id) {
        var _this = this;
        this.InvitationService.getUserByInviteId(id).subscribe(function (res) {
            _this.profile = res.informations[0];
            _this.setDeadlineTime();
        });
    };
    InvitationProfileComponent.prototype.switchL = function () {
        var _this = this;
        setTimeout(function () { return _this.SharedService.setSwitch('Signup'); }, 300);
        this.visible = false;
    };
    InvitationProfileComponent.prototype.closeSignUpModal = function () {
        var _this = this;
        setTimeout(function () { return _this.SharedService.setSignUpStatus(false); }, 300);
        this.visible = false;
    };
    InvitationProfileComponent.prototype.signUp = function () {
        var _this = this;
        if (!this.validateForm(this.form)) {
            var body = { account: this.form };
            var login_1 = { email: this.form.email, password: this.form.password };
            this.AccountService.createProfile(body).subscribe(function (res) {
                if (res.success) {
                    _this.closeSignUpModal();
                    _this.AuthenticationService.localLogIn(login_1).subscribe(function (res) {
                        _this.router.navigate(['/signup'], { queryParams: { id: true } });
                    });
                }
            });
        }
    };
    InvitationProfileComponent.prototype.registerInvitation = function () {
        this.InvitationService.registerInvitation(this.invite_id, { email: 'hello@witty.com' }).subscribe(function (res) {
        });
    };
    InvitationProfileComponent.prototype.getMargin = function () {
        return this.invite2 ? '35px' : 0;
    };
    InvitationProfileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-invitation-profile',
            template: __webpack_require__("./src/app/Components/invitations/invitation-profile/invitation-profile.component.html"),
            styles: [__webpack_require__("./src/app/Components/invitations/invitation-profile/invitation-profile.component.scss"), __webpack_require__("./src/public/styles/login-signup-modal.scss")],
            providers: [__WEBPACK_IMPORTED_MODULE_3__Services_account_service__["a" /* AccountService */], __WEBPACK_IMPORTED_MODULE_4__Services_Authentication_auth_index__["a" /* AuthenticationService */], __WEBPACK_IMPORTED_MODULE_5__Services_Invitation_invitation_service__["a" /* InvitationService */], __WEBPACK_IMPORTED_MODULE_6__Services_Networks_networks_service__["a" /* NetworksService */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__Services_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_shared_service__["a" /* SharedService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__Services_account_service__["a" /* AccountService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_account_service__["a" /* AccountService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__Services_Authentication_auth_index__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_Authentication_auth_index__["a" /* AuthenticationService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__Services_Invitation_invitation_service__["a" /* InvitationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_Invitation_invitation_service__["a" /* InvitationService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_6__Services_Networks_networks_service__["a" /* NetworksService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__Services_Networks_networks_service__["a" /* NetworksService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_7__Services_Authentication_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__Services_Authentication_token_service__["a" /* TokenService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_8__Services_Trackings_tracking_service__["a" /* TrackingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__Services_Trackings_tracking_service__["a" /* TrackingService */]) === "function" && _j || Object])
    ], InvitationProfileComponent);
    return InvitationProfileComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
}());

//# sourceMappingURL=invitation-profile.component.js.map

/***/ }),

/***/ "./src/app/Components/invitations/invitation-projects/invitation-projects.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvitationProjectsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_account_service__ = __webpack_require__("./src/app/Services/account.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_Authentication_auth_index__ = __webpack_require__("./src/app/Services/Authentication/auth-index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var InvitationProjectsComponent = /** @class */ (function () {
    function InvitationProjectsComponent(AccountService, AuthenticationService, route, router) {
        this.AccountService = AccountService;
        this.AuthenticationService = AuthenticationService;
        this.route = route;
        this.router = router;
        this.form = {};
        this.fn_err = false;
        this.ln_err = false;
        this.email_err = false;
        this.pw_err = false;
        this.visible = true;
        this.invite1 = false;
        this.invite2 = false;
        this.invite3 = false;
    }
    InvitationProjectsComponent.prototype.validateForm = function (form) {
        this.fn_err = this.ln_err = this.email_err = this.pw_err = true;
        if (form.first_name)
            this.fn_err = false;
        if (form.last_name)
            this.ln_err = false;
        if (form.email) {
            var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            this.email_err = !reg.test(form.email);
        }
        if (form.password)
            this.pw_err = form.password.length >= 8 ? false : true;
        return (this.fn_err && this.ln_err && this.email_err && this.pw_err);
    };
    InvitationProjectsComponent.prototype.ngOnInit = function () {
        this.initParams();
    };
    InvitationProjectsComponent.prototype.initParams = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params['project_token']) {
                _this.initCookie(params['project_token']);
            }
        });
    };
    InvitationProjectsComponent.prototype.initCookie = function (token) {
        localStorage.setItem('project', token);
    };
    InvitationProjectsComponent.prototype.signUp = function () {
        var _this = this;
        if (!this.validateForm(this.form)) {
            var body = { account: this.form };
            var login_1 = { email: this.form.email, password: this.form.password };
            this.AccountService.createProfile(body).subscribe(function (res) {
                if (res.success) {
                    _this.AuthenticationService.localLogIn(login_1).subscribe(function (res) {
                        _this.router.navigate(['/signup'], { queryParams: { id: true } });
                    });
                }
            });
        }
    };
    InvitationProjectsComponent.prototype.getMargin = function () {
        return '45px';
    };
    InvitationProjectsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-invitation-projects',
            template: __webpack_require__("./src/app/Components/invitations/invitation-profile/invitation-profile.component.html"),
            styles: [__webpack_require__("./src/app/Components/invitations/invitation-profile/invitation-profile.component.scss"), __webpack_require__("./src/public/styles/login-signup-modal.scss")],
            providers: [__WEBPACK_IMPORTED_MODULE_2__Services_account_service__["a" /* AccountService */], __WEBPACK_IMPORTED_MODULE_3__Services_Authentication_auth_index__["a" /* AuthenticationService */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__Services_account_service__["a" /* AccountService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_account_service__["a" /* AccountService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__Services_Authentication_auth_index__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_Authentication_auth_index__["a" /* AuthenticationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _d || Object])
    ], InvitationProjectsComponent);
    return InvitationProjectsComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=invitation-projects.component.js.map

/***/ }),

/***/ "./src/app/Components/invitations/invitations.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvitationsModule", function() { return InvitationsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__ = __webpack_require__("./src/app/Pipes/pipe.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__footer_footer_module__ = __webpack_require__("./src/app/Components/footer/footer.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__invitations_invitations_component__ = __webpack_require__("./src/app/Components/invitations/invitations/invitations.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__invitation_profile_invitation_profile_component__ = __webpack_require__("./src/app/Components/invitations/invitation-profile/invitation-profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__invitation_projects_invitation_projects_component__ = __webpack_require__("./src/app/Components/invitations/invitation-projects/invitation-projects.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Routes_invitations_routes__ = __webpack_require__("./src/app/Routes/invitations.routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






/* Components */



/* Directives */
/* Libraries */
/* Route */

var InvitationsModule = /** @class */ (function () {
    function InvitationsModule() {
    }
    InvitationsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_9__Routes_invitations_routes__["a" /* INVITE_ROUTES */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["f" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__["a" /* PipeModule */],
                __WEBPACK_IMPORTED_MODULE_5__footer_footer_module__["a" /* FooterModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__invitations_invitations_component__["a" /* InvitationsComponent */],
                __WEBPACK_IMPORTED_MODULE_7__invitation_profile_invitation_profile_component__["a" /* InvitationProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_8__invitation_projects_invitation_projects_component__["a" /* InvitationProjectsComponent */],
            ],
            exports: []
        })
    ], InvitationsModule);
    return InvitationsModule;
}());

//# sourceMappingURL=invitations.module.js.map

/***/ }),

/***/ "./src/app/Components/invitations/invitations/invitations.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/Components/invitations/invitations/invitations.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/Components/invitations/invitations/invitations.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvitationsComponent; });
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

var InvitationsComponent = /** @class */ (function () {
    function InvitationsComponent() {
    }
    InvitationsComponent.prototype.ngOnInit = function () {
    };
    InvitationsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-invitations',
            template: __webpack_require__("./src/app/Components/invitations/invitations/invitations.component.html"),
            styles: [__webpack_require__("./src/app/Components/invitations/invitations/invitations.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], InvitationsComponent);
    return InvitationsComponent;
}());

//# sourceMappingURL=invitations.component.js.map

/***/ }),

/***/ "./src/app/Routes/invitations.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return INVITE_ROUTES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Components_invitations_invitations_invitations_component__ = __webpack_require__("./src/app/Components/invitations/invitations/invitations.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Components_invitations_invitation_profile_invitation_profile_component__ = __webpack_require__("./src/app/Components/invitations/invitation-profile/invitation-profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Components_invitations_invitation_projects_invitation_projects_component__ = __webpack_require__("./src/app/Components/invitations/invitation-projects/invitation-projects.component.ts");

/* Components */



/* Librairies */
var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__Components_invitations_invitations_invitations_component__["a" /* InvitationsComponent */],
        children: [
            { path: '', redirectTo: ':invite_id', pathMatch: 'full' },
            { path: ':invite_id', component: __WEBPACK_IMPORTED_MODULE_2__Components_invitations_invitation_profile_invitation_profile_component__["a" /* InvitationProfileComponent */] },
            { path: 'welcome/:network/:token', component: __WEBPACK_IMPORTED_MODULE_2__Components_invitations_invitation_profile_invitation_profile_component__["a" /* InvitationProfileComponent */] },
            { path: 'projects/:project_token', component: __WEBPACK_IMPORTED_MODULE_3__Components_invitations_invitation_projects_invitation_projects_component__["a" /* InvitationProjectsComponent */] }
        ]
    },
];
var INVITE_ROUTES = __WEBPACK_IMPORTED_MODULE_0__angular_router__["f" /* RouterModule */].forChild(routes);
//# sourceMappingURL=invitations.routes.js.map

/***/ })

});
//# sourceMappingURL=invitations.module.chunk.js.map