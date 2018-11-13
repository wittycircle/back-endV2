webpackJsonp(["reset-password.module"],{

/***/ "./src/app/Components/reset-password/reset-password.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"main-body-page\" class=\"termprivacy\">\n\t<div class=\"body-page\">\n\t\t<div id=\"hvbg\" class=\"header_reset\">\n\t\t\t<img src=\"public/images/cover_terms.jpg\" />\n\t\t</div>\n\n\t\t<section class=\"header-reset-text\">\n\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"main-title-market\">\n\t\t\t\t\t\t<h1 class=\"freigb\">Set a new password</h1>\n\t\t\t\t\t</div>\n\t\t\t</div>\n\t\t</section>\n\n\t</div>\n\t<section id=\"main-body-content\">\n\t\t<div class=\"main-body-container\">\n\t\t\t\t<div class=\"input-area-reset\">\n\t\t\t\t\t\t<h2 class=\"title-page freigb\">Please enter a password that is at least 8 characters long.</h2>\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t<div class=\"col-md-2\">\n\t\t\t\t\t\t\t\t\t\t<h2 class=\"title-input freigm\">New password</h2>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"col-md-10\">\n\t\t\t\t\t\t\t\t\t\t<input class=\"freigb\" type=\"password\" [(ngModel)]=\"form.newPassword\" placeholder=\"Minimum 8 characters\" />\n\t\t\t\t\t\t\t\t\t\t<h5 class=\"freigb\" style=\"color: #e92f2f;\" *ngIf=\"new_pw_err\">Please enter a valid password</h5>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t<div class=\"col-md-2\">\n\t\t\t\t\t\t\t\t\t\t<h2 class=\"title-input freigm\">Confirm your password</h2>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"col-md-10\">\n\t\t\t\t\t\t\t\t\t\t<input class=\"freigb\" type=\"password\" [(ngModel)]=\"form.confirmPassword\" placeholder=\"Must match your new password\" />\n\t\t\t\t\t<h5 class=\"freigb\" style=\"color: #e92f2f;\" *ngIf=\"confirm_err\" >Your passwords does not match</h5>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<p *ngIf=\"expired\" class=\"freigb\" style=\"color: #e92f2f;\">{{ token_err_m }}</p>\n\t\t\t\t\t\t<div class=\"col-md-12 text-center\" style=\"text-align: right;\">\n\t\t\t\t\t\t\t\t<button style=\"margin-top: 10px\" type=\"submit\" (click)=\"resetPassword()\">{{ buttonText }} <i *ngIf=\"buttonText === 'Saved'\" class=\"fa fa-check\"></i></button>\n\t\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t</div>\n\t</section>\n</div>\n"

/***/ }),

/***/ "./src/app/Components/reset-password/reset-password.component.scss":
/***/ (function(module, exports) {

module.exports = ".input-area-reset {\n  padding: 50px; }\n  .input-area-reset .title-page {\n    font-size: 15px;\n    color: #222;\n    margin-bottom: 40px; }\n  .input-area-reset h1 {\n    color: #222;\n    font-size: 24px; }\n  .input-area-reset .title-input {\n    font-size: 15px;\n    color: #222;\n    margin-top: 20px; }\n  .input-area-reset input {\n    display: block;\n    width: 100%;\n    margin: 15px auto 3px auto;\n    font-family: 'FreigBook';\n    font-size: 16px;\n    color: #999999;\n    padding: 10px 20px 10px 10px;\n    border: 1px solid #bebebe;\n    border-radius: 4px; }\n  .input-area-reset .buttonsave {\n    margin-top: 35px;\n    font-family: 'FreigSem';\n    font-size: 18px;\n    background-color: #ff4d4d;\n    border: 1px solid #ff4d4d;\n    border-radius: 4px;\n    padding: 6px 15px 8px 15px;\n    color: white;\n    width: 100px; }\n  .input-area-reset .p-error {\n    color: #ff4d4d; }\n  .header_reset {\n  width: 100%;\n  height: 220px;\n  overflow: hidden;\n  background-color: black;\n  -webkit-filter: brightness(0.4); }\n  .header-reset-text {\n  position: absolute;\n  margin-left: 15%;\n  margin-right: 15%;\n  width: 70%;\n  z-index: 90;\n  text-align: center;\n  top: 110px; }\n  .header-reset-text h1 {\n    font-size: 28px; }\n  #main-body-page #main-body-content .main-body-container {\n  max-width: 600px;\n  margin: 0 auto; }\n"

/***/ }),

/***/ "./src/app/Components/reset-password/reset-password.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPasswordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_account_service__ = __webpack_require__("./src/app/Services/account.service.ts");
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

var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(AccountService, route, router) {
        this.AccountService = AccountService;
        this.route = route;
        this.router = router;
        this.form = {};
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        this.form = {
            newPassword: '',
            confirmPassword: ''
        };
        this.buttonText = 'Save new password';
        this.initParams();
    };
    ResetPasswordComponent.prototype.initParams = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.token = params['token'];
        });
    };
    ResetPasswordComponent.prototype.validatePassword = function (form) {
        this.new_pw_err = this.pw_err = this.confirm_err = true;
        if (form.newPassword) {
            this.new_pw_err = form.newPassword.length >= 8 ? false : true;
            this.confirm_err = form.newPassword === form.confirmPassword ? false : true;
        }
        return (this.pw_err && this.confirm_err);
    };
    ResetPasswordComponent.prototype.resetPassword = function () {
        var _this = this;
        if (!this.validatePassword(this.form) && this.token) {
            this.AccountService.resetPassword(this.token, { password: this.form.newPassword }).subscribe(function (res) {
                if (res.success)
                    _this.buttonText = 'Saved';
            }, function (error) {
                _this.expired = true;
                if (JSON.parse(error._body).error = "bad token")
                    _this.token_err_m = 'The security token included in the request is expired';
                else
                    _this.token_err_m = 'The security token is not valid';
                setTimeout(function () {
                    _this.router.navigate(['/']);
                }, 2000);
            });
        }
    };
    ResetPasswordComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-reset-password',
            template: __webpack_require__("./src/app/Components/reset-password/reset-password.component.html"),
            styles: [__webpack_require__("./src/app/Components/reset-password/reset-password.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__Services_account_service__["a" /* AccountService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_account_service__["a" /* AccountService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _c || Object])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=reset-password.component.js.map

/***/ }),

/***/ "./src/app/Components/reset-password/reset-password.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetPasswordModule", function() { return ResetPasswordModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reset_password_component__ = __webpack_require__("./src/app/Components/reset-password/reset-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_account_service__ = __webpack_require__("./src/app/Services/account.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Routes_reset_password_routes__ = __webpack_require__("./src/app/Routes/reset-password.routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



/* Components */

/* Services */

/* Route */

var ResetPasswordModule = /** @class */ (function () {
    function ResetPasswordModule() {
    }
    ResetPasswordModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_5__Routes_reset_password_routes__["a" /* RESET_PASSWORD_ROUTES */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__reset_password_component__["a" /* ResetPasswordComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__Services_account_service__["a" /* AccountService */]
            ]
        })
    ], ResetPasswordModule);
    return ResetPasswordModule;
}());

//# sourceMappingURL=reset-password.module.js.map

/***/ }),

/***/ "./src/app/Routes/reset-password.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RESET_PASSWORD_ROUTES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Components_reset_password_reset_password_component__ = __webpack_require__("./src/app/Components/reset-password/reset-password.component.ts");

/* Components */

/* Librairies */
var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__Components_reset_password_reset_password_component__["a" /* ResetPasswordComponent */] },
];
var RESET_PASSWORD_ROUTES = __WEBPACK_IMPORTED_MODULE_0__angular_router__["f" /* RouterModule */].forChild(routes);
//# sourceMappingURL=reset-password.routes.js.map

/***/ })

});
//# sourceMappingURL=reset-password.module.chunk.js.map