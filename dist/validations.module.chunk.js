webpackJsonp(["validations.module"],{

/***/ "./src/app/Components/validations/account-validation/account-validation.component.html":
/***/ (function(module, exports) {

module.exports = "<section>\n\t<div class=\"verifyProjectNetwork\" style=\"position: relative; background-color: #fff; margin: 0 auto; padding: 300px 0px; text-align: center; background-color: white; z-index: 1000000000\">\n\t\t<h3 *ngIf=\"valid\" style=\"color: #999999; margin-bottom: 10px; font-family: 'FreigSem'\">Your account has been validated</h3>\n\t\t<p *ngIf=\"valid\" style=\"font-family: 'FreigBook'; color: #999999\">Redirecting in {{ count }}s...</p>\n\t</div>\n</section>\n"

/***/ }),

/***/ "./src/app/Components/validations/account-validation/account-validation.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/Components/validations/account-validation/account-validation.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountValidationComponent; });
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


/* Service */

var AccountValidationComponent = /** @class */ (function () {
    function AccountValidationComponent(AccountService, route, router) {
        this.AccountService = AccountService;
        this.route = route;
        this.router = router;
        this.valid = false;
        this.count = 3;
    }
    AccountValidationComponent.prototype.ngOnInit = function () {
        this.initParams();
    };
    AccountValidationComponent.prototype.initParams = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.validateAccount(params['token']);
        });
    };
    AccountValidationComponent.prototype.validateAccount = function (token) {
        var _this = this;
        this.AccountService.accountValidation(token).subscribe(function (res) {
            _this.valid = true;
            _this.timer();
        }, function (error) {
            _this.router.navigate(['/']);
        });
    };
    AccountValidationComponent.prototype.timer = function () {
        var _this = this;
        setInterval(function () {
            _this.count -= 1;
            if (!_this.count)
                _this.router.navigate(['/']);
        }, 1000);
    };
    AccountValidationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-account-validation',
            template: __webpack_require__("./src/app/Components/validations/account-validation/account-validation.component.html"),
            styles: [__webpack_require__("./src/app/Components/validations/account-validation/account-validation.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__Services_account_service__["a" /* AccountService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_account_service__["a" /* AccountService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _c || Object])
    ], AccountValidationComponent);
    return AccountValidationComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=account-validation.component.js.map

/***/ }),

/***/ "./src/app/Components/validations/network-validation/network-validation.component.html":
/***/ (function(module, exports) {

module.exports = "<section>\n\n<!-- <div class=\"verifyProjectNetwork\" style=\"background-corlo: #FFFFFF; width: 800px; margin: 0 auto; padding: 300px 0px; text-align: center; \">\n\t<h3 style=\"color: #999999; margin-bottom: 10px; font-family: 'FreigSem'\">hello account verified</h3>\n\t<p style=\"font-family: 'FreigBook'; color: #999999\">Redirecting in 3s...</p>\n</div> -->\n<div class=\"verifyProjectNetwork\" style=\"position: relative; background-corlo: #FFFFFF; margin: 0 auto; padding: 300px 0px; text-align: center; background-color: white; z-index: 1000000000\">\n\t<h3 *ngIf=\"valid\" style=\"color: #999999; margin-bottom: 10px; font-family: 'FreigSem'\">Verifying network...</h3>\n\t<p *ngIf=\"valid\" style=\"font-family: 'FreigBook'; color: #999999\">Redirecting in {{ count }}s...</p>\n</div>\n</section>"

/***/ }),

/***/ "./src/app/Components/validations/network-validation/network-validation.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/Components/validations/network-validation/network-validation.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NetworkValidationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_Networks_networks_service__ = __webpack_require__("./src/app/Services/Networks/networks.service.ts");
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

var NetworkValidationComponent = /** @class */ (function () {
    function NetworkValidationComponent(NetworksService, router, route) {
        this.NetworksService = NetworksService;
        this.router = router;
        this.route = route;
        this.count = 3;
        this.valid = false;
    }
    NetworkValidationComponent.prototype.ngOnInit = function () {
        this.initParams();
    };
    NetworkValidationComponent.prototype.initParams = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            console.log(params['token']);
            if (params['token']) {
                _this.validationProfileNetwork(params['token']);
            }
            else
                _this.router.navigate(['/']);
        });
    };
    NetworkValidationComponent.prototype.validationProfileNetwork = function (token) {
        var _this = this;
        this.NetworksService.validationNetwork(token).subscribe(function (res) {
            if (res.success) {
                _this.valid = true;
                _this.timer();
            }
        }, function (err) {
            if (err)
                _this.router.navigate(['/']);
        });
    };
    NetworkValidationComponent.prototype.timer = function () {
        var _this = this;
        setInterval(function () {
            _this.count -= 1;
            if (!_this.count)
                _this.router.navigate(['/']);
        }, 1000);
    };
    NetworkValidationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-validation',
            template: __webpack_require__("./src/app/Components/validations/network-validation/network-validation.component.html"),
            styles: [__webpack_require__("./src/app/Components/validations/network-validation/network-validation.component.scss")],
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__Services_Networks_networks_service__["a" /* NetworksService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_Networks_networks_service__["a" /* NetworksService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object])
    ], NetworkValidationComponent);
    return NetworkValidationComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=network-validation.component.js.map

/***/ }),

/***/ "./src/app/Components/validations/validations.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationModule", function() { return ValidationModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__ = __webpack_require__("./src/app/Pipes/pipe.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__footer_footer_module__ = __webpack_require__("./src/app/Components/footer/footer.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__network_validation_network_validation_component__ = __webpack_require__("./src/app/Components/validations/network-validation/network-validation.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__account_validation_account_validation_component__ = __webpack_require__("./src/app/Components/validations/account-validation/account-validation.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Services_account_service__ = __webpack_require__("./src/app/Services/account.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Services_Networks_networks_service__ = __webpack_require__("./src/app/Services/Networks/networks.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Routes_validation_routes__ = __webpack_require__("./src/app/Routes/validation.routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






/* Components */


/* Services */


/* Libraries */
/* Route */

var ValidationModule = /** @class */ (function () {
    function ValidationModule() {
    }
    ValidationModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_10__Routes_validation_routes__["a" /* VALIDATION_ROUTES */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["f" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__["a" /* PipeModule */],
                __WEBPACK_IMPORTED_MODULE_5__footer_footer_module__["a" /* FooterModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__network_validation_network_validation_component__["a" /* NetworkValidationComponent */],
                __WEBPACK_IMPORTED_MODULE_7__account_validation_account_validation_component__["a" /* AccountValidationComponent */]
            ],
            exports: [],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__Services_account_service__["a" /* AccountService */],
                __WEBPACK_IMPORTED_MODULE_9__Services_Networks_networks_service__["a" /* NetworksService */]
            ]
        })
    ], ValidationModule);
    return ValidationModule;
}());

//# sourceMappingURL=validations.module.js.map

/***/ }),

/***/ "./src/app/Routes/validation.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VALIDATION_ROUTES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Components_validations_account_validation_account_validation_component__ = __webpack_require__("./src/app/Components/validations/account-validation/account-validation.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Components_validations_network_validation_network_validation_component__ = __webpack_require__("./src/app/Components/validations/network-validation/network-validation.component.ts");

/* Components */


/* Librairies */
var routes = [
    { path: 'account/:token', component: __WEBPACK_IMPORTED_MODULE_1__Components_validations_account_validation_account_validation_component__["a" /* AccountValidationComponent */] },
    { path: 'network/:token', component: __WEBPACK_IMPORTED_MODULE_2__Components_validations_network_validation_network_validation_component__["a" /* NetworkValidationComponent */] }
];
var VALIDATION_ROUTES = __WEBPACK_IMPORTED_MODULE_0__angular_router__["f" /* RouterModule */].forChild(routes);
//# sourceMappingURL=validation.routes.js.map

/***/ })

});
//# sourceMappingURL=validations.module.chunk.js.map