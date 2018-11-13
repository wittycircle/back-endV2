webpackJsonp(["authentications.module"],{

/***/ "./src/app/Components/authentications/auth-login/auth-login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"main-login-page-bg\">\n\t<section id=\"main-login-page\" class=\"align-center\">\n\t    <div class=\"login-modal-social signup-login-social\">\n\t        <h4>Log in with a social network:</h4>\n\t        <div class=\"fb-login\">\n\t            <a href=\"/api/auth/facebook\" target=\"_self\">\n\t                <button><i class=\"fa fa-facebook\" style=\"color: white\"></i>Log in with Facebook</button>\n\t            </a>\n\t        </div>\n\t        <div class=\"go-login\">\n\t            <a href=\"/api/auth/google\" target=\"_self\">\n\t                <button class=\"go-login\"><img src=\"public/images/social_media/newgoogle-logo.svg\">Log in with Google</button>\n\t            </a>\n\t        </div>\n\t    </div>\n\t    <div class=\"login-modal-old signup-login-old\">\n\t        <div class=\"old-dash\"></div>\n\t        <h4>Or the old-fashioned way:</h4>\n\t        <div class=\"old-dash\"></div>\n\t    </div>\n\t    <form>\n\t        <div class=\"login-modal-email\">\n\t            <p *ngIf=\"log_err\">Incorrect password/email</p>\n\t            <div class=\"email-input\">\n\t                <input [disabled]=\"showReset\" type=\"email\" [(ngModel)]=\"form.email\" name=\"email\" class=\"modal-input\" placeholder=\"E-mail address\" />\n\t                <p *ngIf=\"email_err\">This is a required field</p>\n\t            </div>\n\t            <div class=\"password-input\">\n\t                <input [disabled]=\"showReset\" type='password' [(ngModel)]=\"form.password\" name=\"password\" class=\"modal-input\" placeholder=\"Password\" />\n\t                <p *ngIf=\"pw_err\">This is a required field</p>\n\t            </div>\n\t            <div class=\"forgot-password\">\n\t                <p class=\"cursor-pt\" (click)=\"showResetPassword()\">{{ resetText }}</p>\n\t            </div>\n\t            <div class=\"email-input\" *ngIf=\"showReset\">\n\t                <input type=\"email\" [(ngModel)]=\"form.rMail\" name=\"rMail\" placeholder=\"Email used for your account\"/>\n\t            </div>\n\t            <div *ngIf=\"textValidateReset\">\n\t                <span class=\"validate-p freigb\">{{ textValidateReset }}</span>\n\t            </div>\n\t        </div>\n\t        <div class=\"login-modal-footer\">\n\t            <button (click)=\"process(form)\">{{ textButton }} <i class=\"fa fa-check\" *ngIf=\"textButton === 'Sent'\"></i></button>\n<!--            \t\t<h4>Don't have an account yet? <strong><u><a href=\"/register\">Sign up</a></u></strong></h4>\n -->\t        </div>\n\t    </form>\n\t</section>\n</div>"

/***/ }),

/***/ "./src/app/Components/authentications/auth-login/auth-login.component.scss":
/***/ (function(module, exports) {

module.exports = "/*********************** Main Login Page *************************/\n.main-login-page-bg {\n  background-color: #e5e5e5;\n  /*\tpadding: 152px 0 158px 0;\n*/\n  width: 100vw;\n  height: 100vh; }\n.main-login-page-bg .align-center {\n    top: 45%; }\n.main-login-page-bg #main-login-page {\n    width: 400px;\n    margin: 0 auto;\n    padding: 30px 0 70px 0;\n    background-color: white;\n    border-radius: 4px;\n    margin: 0 auto;\n    left: 0;\n    right: 0; }\n.main-login-page-bg #main-login-page .signup-login-social {\n      margin-bottom: 20px; }\n.main-login-page-bg #main-login-page .signup-login-social h4 {\n        margin-top: 0; }\n.main-login-page-bg #main-login-page .login-modal-old {\n      margin-bottom: 30px; }\n.main-login-page-bg #main-login-page .fb-login {\n      margin-bottom: 15px; }\n.main-login-page-bg #main-login-page .fb-login button {\n        background-color: #46629E;\n        font-family: 'FreigSem';\n        font-size: 18px;\n        color: white;\n        padding: 10px 20px 10px 15px;\n        border: 1px solid #46629E;\n        border-radius: 4px; }\n.main-login-page-bg #main-login-page .fb-login button i {\n          padding: 0 15px 0 10px; }\n.main-login-page-bg #main-login-page .fb-login button:hover {\n        background-color: #344e7a;\n        border: 1px solid #344e7a; }\n.main-login-page-bg #main-login-page .go-login {\n      margin-bottom: 15px;\n      margin-left: 0;\n      /*\timg {\n\t\t\t\tpadding: 0 15px 0 10px;\n\t\t\t\twidth: 40px;\n\t\t\t}*/ }\n.main-login-page-bg #main-login-page .go-login button {\n        text-align: left;\n        background-color: white;\n        font-family: 'FreigSem';\n        font-size: 18px;\n        color: #757575;\n        padding: 10px 38px 10px 13px;\n        border: 1px solid #999999;\n        border-radius: 4px;\n        margin: 0; }\n.main-login-page-bg #main-login-page .go-login button:hover {\n        background-color: #e9e9e9; }\n.main-login-page-bg #main-login-page .login-modal-email {\n      text-align: center;\n      max-width: 300px;\n      margin: 0 auto;\n      margin-bottom: 20px; }\n.main-login-page-bg #main-login-page .login-modal-email input {\n        display: block;\n        width: 300px;\n        margin: 10px auto;\n        font-family: 'FreigBook';\n        font-size: 16px;\n        color: #999999;\n        padding: 10px 20px 10px 40px;\n        border: 1px solid #bebebe;\n        border-radius: 4px; }\n.main-login-page-bg #main-login-page .login-modal-email p {\n        font-family: 'FreigBook';\n        font-size: 16px;\n        margin-bottom: 3px;\n        color: #ff4d4d; }\n.main-login-page-bg #main-login-page .login-modal-email span .validate-p {\n        color: #222 !important; }\n.main-login-page-bg #main-login-page .login-modal-email .email-input,\n      .main-login-page-bg #main-login-page .login-modal-email .password-input {\n        text-align: left; }\n.main-login-page-bg #main-login-page .login-modal-email .email-input p,\n        .main-login-page-bg #main-login-page .login-modal-email .password-input p {\n          position: relative;\n          bottom: 8px;\n          font-family: 'FreigBook';\n          font-size: 16px;\n          margin-bottom: 0;\n          color: #ff4d4d; }\n.main-login-page-bg #main-login-page .login-modal-email .forgot-password {\n        text-align: right; }\n.main-login-page-bg #main-login-page .login-modal-email .forgot-password p {\n          font-family: 'FreigBook';\n          font-size: 14px;\n          color: black;\n          text-decoration: underline;\n          outline: none; }\n.main-login-page-bg #main-login-page .login-modal-footer {\n      text-align: center; }\n.main-login-page-bg #main-login-page .login-modal-footer button {\n        background-color: #ff4d4d;\n        width: 234px;\n        font-family: 'FreigSem';\n        font-size: 18px;\n        color: white;\n        padding: 6px 20px 10px 15px;\n        border-radius: 4px;\n        border: none;\n        margin-top: 10px; }\n.main-login-page-bg #main-login-page .login-modal-footer h4 {\n        font-family: 'FreigBook';\n        font-size: 16px;\n        color: #999999;\n        padding: 10px 15px;\n        margin: 10px 0; }\n.main-login-page-bg #main-login-page .login-modal-footer h4 u {\n          cursor: pointer; }\n.main-login-page-bg #main-login-page .login-modal-footer h4 u a {\n            color: #999999; }\n/******************** MOBILE ****************************/\n@media only screen and (max-width: 736px) {\n  .main-login-page-bg {\n    background-color: #e5e5e5;\n    width: 100vw;\n    height: 100vh; }\n    .main-login-page-bg .align-center {\n      top: 45%; }\n    .main-login-page-bg #main-login-page {\n      width: inherit;\n      height: inherit;\n      margin: 0 auto;\n      padding: 30px 0 70px 0;\n      background-color: white;\n      border-radius: 4px;\n      margin: 0 auto;\n      left: 0;\n      right: 0;\n      top: 0;\n      -webkit-transform: none;\n      transform: none;\n      z-index: 10000; } }\n"

/***/ }),

/***/ "./src/app/Components/authentications/auth-login/auth-login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthLoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_shared_service__ = __webpack_require__("./src/app/Services/shared.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_Authentication_auth_index__ = __webpack_require__("./src/app/Services/Authentication/auth-index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_account_service__ = __webpack_require__("./src/app/Services/account.service.ts");
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
var AuthLoginComponent = /** @class */ (function () {
    function AuthLoginComponent(SharedService, AuthService, AccountService, TokenService, router) {
        this.SharedService = SharedService;
        this.AuthService = AuthService;
        this.AccountService = AccountService;
        this.TokenService = TokenService;
        this.router = router;
        this.form = {};
        this.log_err = false;
        this.showReset = false;
        this.email_err = false;
        this.pw_err = false;
        this.visible = true;
        this.textValidateReset = '';
        if ((window.screen.width) < 736) {
        }
    }
    AuthLoginComponent.prototype.validateForm = function (form) {
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.showReset) {
            this.textValidateReset = !reg.test(form.rMail) ? "Address must be valid" : "";
            return ({ case: 1, email_err: this.email_err, pw_err: this.pw_err, rMail_err: this.textValidateReset });
        }
        else {
            this.email_err = this.pw_err = true;
            if (form.email)
                this.email_err = !reg.test(form.email);
            if (form.password)
                this.pw_err = form.password.length >= 8 ? false : true;
            return ({ case: 2, email_err: this.email_err, pw_err: this.pw_err, rMail_err: this.textValidateReset });
        }
    };
    AuthLoginComponent.prototype.getToken = function () {
        if (this.TokenService.getToken())
            this.router.navigate(['/welcome']);
    };
    AuthLoginComponent.prototype.ngOnInit = function () {
        this.resetText = "Forgot Password?";
        this.textButton = "Log In";
        this.form = {
            email: '',
            password: '',
            rMail: ''
        };
    };
    AuthLoginComponent.prototype.switchS = function () {
        var _this = this;
        setTimeout(function () { return _this.SharedService.setSwitch('Login'); }, 300);
        this.visible = false;
    };
    AuthLoginComponent.prototype.showResetPassword = function () {
        this.textButton = this.textButton === "Log In" ? "Reset Password" : "Log In";
        this.resetText = this.resetText === "Cancel" ? "Forgot Password?" : "Cancel";
        this.showReset = this.showReset === true ? false : true;
        this.form.email = null;
        this.form.password = null;
        this.email_err = false;
        this.pw_err = false;
        this.log_err = false;
    };
    AuthLoginComponent.prototype.process = function (form) {
        var _this = this;
        this.log_err = false;
        var result = this.validateForm(form);
        if (result.case === 1 && !result.rMail_err) {
            var body = { email: form.rMail };
            this.AccountService.passwordRecoveryEmail(body).subscribe(function (res) {
                if (res.success)
                    _this.resetPasswordSent();
            }, function (error) {
                if (JSON.parse(error._body).error === 'Invalid email')
                    _this.textValidateReset = 'Email address not found';
            });
        }
        else if (result.case === 2 && !result.email_err && !result.pw_err) {
            delete form.rMail;
            this.AuthService.localLogIn(form).subscribe(function (res) {
                _this.refresh();
            }, function (err) {
                _this.log_err = true;
            });
        }
    };
    AuthLoginComponent.prototype.resetPasswordSent = function () {
        this.textButton = 'Sent';
        this.form.rMail = '';
        setTimeout(function () {
        }, 1000);
    };
    AuthLoginComponent.prototype.refresh = function () {
        this.router.navigate(['/welcome']);
    };
    AuthLoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-auth-login',
            template: __webpack_require__("./src/app/Components/authentications/auth-login/auth-login.component.html"),
            styles: [__webpack_require__("./src/app/Components/authentications/auth-login/auth-login.component.scss"), __webpack_require__("./src/public/styles/login-signup-modal.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__Services_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_shared_service__["a" /* SharedService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__Services_Authentication_auth_index__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_Authentication_auth_index__["a" /* AuthenticationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__Services_account_service__["a" /* AccountService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_account_service__["a" /* AccountService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__Services_Authentication_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_Authentication_token_service__["a" /* TokenService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _e || Object])
    ], AuthLoginComponent);
    return AuthLoginComponent;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=auth-login.component.js.map

/***/ }),

/***/ "./src/app/Components/authentications/auth-register/auth-register.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  auth-register works!\n</p>\n"

/***/ }),

/***/ "./src/app/Components/authentications/auth-register/auth-register.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/Components/authentications/auth-register/auth-register.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthRegisterComponent; });
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

var AuthRegisterComponent = /** @class */ (function () {
    function AuthRegisterComponent() {
    }
    AuthRegisterComponent.prototype.ngOnInit = function () {
    };
    AuthRegisterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-auth-register',
            template: __webpack_require__("./src/app/Components/authentications/auth-register/auth-register.component.html"),
            styles: [__webpack_require__("./src/app/Components/authentications/auth-register/auth-register.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], AuthRegisterComponent);
    return AuthRegisterComponent;
}());

//# sourceMappingURL=auth-register.component.js.map

/***/ }),

/***/ "./src/app/Components/authentications/authentications.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationsModule", function() { return AuthenticationsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__footer_footer_module__ = __webpack_require__("./src/app/Components/footer/footer.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_login_auth_login_component__ = __webpack_require__("./src/app/Components/authentications/auth-login/auth-login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__auth_register_auth_register_component__ = __webpack_require__("./src/app/Components/authentications/auth-register/auth-register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Services_shared_service__ = __webpack_require__("./src/app/Services/shared.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Services_Authentication_auth_index__ = __webpack_require__("./src/app/Services/Authentication/auth-index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Services_account_service__ = __webpack_require__("./src/app/Services/account.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Routes_auth_routes__ = __webpack_require__("./src/app/Routes/auth.routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





/* Components */


/* Services */



/* Librairies
// import { MomentModule } from 'angular2-moment';

/* Route */

var AuthenticationsModule = /** @class */ (function () {
    function AuthenticationsModule() {
    }
    AuthenticationsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_10__Routes_auth_routes__["a" /* AUTH_ROUTES */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["f" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__footer_footer_module__["a" /* FooterModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__auth_register_auth_register_component__["a" /* AuthRegisterComponent */],
                __WEBPACK_IMPORTED_MODULE_5__auth_login_auth_login_component__["a" /* AuthLoginComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__Services_shared_service__["a" /* SharedService */],
                __WEBPACK_IMPORTED_MODULE_8__Services_Authentication_auth_index__["a" /* AuthenticationService */],
                __WEBPACK_IMPORTED_MODULE_9__Services_account_service__["a" /* AccountService */]
            ]
        })
    ], AuthenticationsModule);
    return AuthenticationsModule;
}());

//# sourceMappingURL=authentications.module.js.map

/***/ }),

/***/ "./src/app/Routes/auth.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AUTH_ROUTES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Components_authentications_auth_login_auth_login_component__ = __webpack_require__("./src/app/Components/authentications/auth-login/auth-login.component.ts");

/* Components */

/* Librairies */
var routes = [
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_1__Components_authentications_auth_login_auth_login_component__["a" /* AuthLoginComponent */] },
];
var AUTH_ROUTES = __WEBPACK_IMPORTED_MODULE_0__angular_router__["f" /* RouterModule */].forChild(routes);
//# sourceMappingURL=auth.routes.js.map

/***/ })

});
//# sourceMappingURL=authentications.module.chunk.js.map