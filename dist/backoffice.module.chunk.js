webpackJsonp(["backoffice.module"],{

/***/ "./src/app/Components/backoffice/articles/articles.component.html":
/***/ (function(module, exports) {

module.exports = "<section id=\"w-backoffice-articles\">\n\t<div class=\"wba-title\">\n\t\t<h1 class=\"freigm\">Articles</h1>\n\t</div>\n\n\t<div class=\"wba-list backoffice-box\">\n\t\t<h2 class=\"freigm pad-b-10\">Posted Articles</h2>\n\t\t<div class=\"wabl-articles mar-b-15 flex\" *ngFor=\"let article of articles; let i = index\">\n\t\t\t<h3 class=\"freigb\">{{ article.title }}</h3>\n\t\t\t<div class=\"buttons\">\n\t\t\t\t<a [routerLink]=\"['/learn/articles', article.id, transformTitle(article.title)]\"><button class=\"freigm mar-r-10\"><i class=\"fa fa-eye\"></i> Visualize</button></a>\n\t\t\t\t<button class=\"freigm mar-r-10\" (click)=\"editArticle(i)\"><i class=\"fa fa-pencil\"></i> Edit</button>\n\t\t\t\t<button class=\"freigm\" (click)=\"deleteArticle(i, article.id)\"><i class=\"fa fa-trash-o\"></i> Delete</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class=\"wba-form backoffice-box\">\n\t\t<h2 class=\"freigm pad-b-10\">Create/Edit Article</h2>\n\t\t<div class=\"wbaf-fields flex\">\n\t\t\t<div class=\"wbaff-left\">\n\t\t\t\t<div class=\"wbaffl-input\">\n\t\t\t\t\t<div class=\"flex mar-b-15\">\n\t\t\t\t\t\t<label>Add Tags</label>\n\t\t\t\t\t\t<input type=\"text\" name=\"tag\" placeholder=\"one by one...\" [(ngModel)]=\"tag\" />\n\t\t\t\t\t</div>\n\t\t\t\t\t<button class=\"freigm\" (click)=\"createTags()\">Create new tag</button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"wbaffl-input flex\">\n\t\t\t\t\t<label>Title</label>\n\t\t\t\t\t<input type=\"text\" name=\"title\" placeholder=\"Add title...\" [(ngModel)]=\"article.title\" />\n\t\t\t\t</div>\n\t\t\t\t<div class=\"wbaffl-input flex\">\n\t\t\t\t\t<label>Picture</label>\n\t\t\t\t\t<input type=\"file\" name=\"picture\" ng2FileSelect [uploader]=\"uploader\" />\n\t\t\t\t</div>\n\t\t\t\t<div class=\"wbaffl-input flex\">\n\t\t\t\t\t<label>Author</label>\n\t\t\t\t\t<input type=\"text\" name=\"author\" placeholder=\"Add author...\" [(ngModel)]=\"article.author\" (click)=\"showSearchUserModal(1)\" />\n\t\t\t\t</div>\n\t\t\t\t<div class=\"wbaffl-input flex\">\n\t\t\t\t\t<label>Tags</label>\n\t\t\t\t\t<input type=\"text\" name=\"tags\" placeholder=\"Add tags\" [(ngModel)]=\"article.tags\" (click)=\"getTags()\"/>\n\t\t\t\t\t<ul *ngIf=\"showTags\">\n\t\t\t\t\t\t<li class=\"freigb cursor-pt\" *ngFor=\"let tagg of tags\" (click)=\"selectTags(tagg.name)\">{{ tagg.name }}</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"wbaffl-input flex\">\n\t\t\t\t\t<label>Time to read</label>\n\t\t\t\t\t<select [(ngModel)]=\"article.read_time\" name=\"time\">\n\t\t\t\t\t\t<option value=\"\">Select time</option>\n\t\t\t\t\t\t<option *ngFor=\"let time of times\"> {{ time }}</option>\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\n\t\t\t</div>\n\n\t\t\t<div class=\"wbaff-right\">\n\t\t\t\t<div class=\"froalaText froala-custom\" [froalaEditor]='options' [(ngModel)]=\"article.text\" name=\"text\"></div>\n\t\t\t\t<div class=\"publish-button\">\n\t\t\t\t\t<button class=\"freigm\" (click)=\"createArticle()\">Publish article</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</section>\n\n\n<!-- <section id=\"learn-new-page\">\n\t<div class=\"learn-new-head\">\n\t\t<h2>New article</h2>\n\t</div>\n\n\t<div class=\"learn-new-field\" *ngIf=\"article\">\n\t\t<label>Create Tags</label>\n\t\t<input type=\"text\" name=\"tag\" [(ngModel)]=\"tag\" />\n\t\t<button (click)=\"createTags()\">Create tag</button>\n\t\t<form>\n\t\t\t<div class=\"learn-new-field-title lnfm flex\">\n\t\t\t\t<label>Title</label>\n\t\t\t\t<input type=\"text\" id=\"ntitle\" [(ngModel)]=\"article.title\" name=\"title\"/>\n\t\t\t</div>\n\n\t\t\t<div class=\"learn-new-field-picture lnfm\">\n\t\t\t\t<label>Article Picture</label>\n\t\t\t\t<input id=\"file\" class=\"input-file\" type=\"file\" name=\"picture\" ng2FileSelect [uploader]=\"uploader\" />\n\t\t\t\t<div class=\"learn-nf-picture-add\">\n\t\t\t\t\t<label for=\"file\">\n\t\t\t\t\t\t<button>Add picture</button>\n\t\t\t\t\t</label>\n\t\t\t\t</div>\n\t\t\t\t<figure class=\"learn-imgDisplay\">\n\t\t\t\t\t<img *ngIf=\"article.picture\" [src]=\"article.picture\" />\n\t\t\t\t</figure>\n\t\t\t</div>\n\n\t\t\t<div class=\"learn-new-field-author\" style=\"margin-bottom: 15px;\">\n\t\t\t\t<label>Author</label>\n\t\t\t\t<input id=\"lnfainput\" type=\"text\" [(ngModel)]=\"article.author\" name=\"author\" (click)=\"showSearchUserModal(1)\"/>\n\t\t\t</div>\n\n\t\t\t<div class=\"learn-new-field-tag lnfm\">\n\t\t\t\t<label>Tag</label>\n\t\t\t\t<input type=\"text\" [(ngModel)]=\"article.tags\" name=\"tags\" (click)=\"getTags()\" />\n\t\t\t\t<ul *ngIf=\"tags\">\n\t\t\t\t\t<li class=\"cursor-pt\" *ngFor=\"let tagg of tags\" (click)=\"selectTags(tagg.name)\">{{ tagg.name }}</li>\n\t\t\t\t</ul>\n\t\t\t\t<span> Multiple tag separated by comma</span>\n\t\t\t</div>\n\n\t\t\t<div class=\"learn-new-field-time lnfm\">\n\t\t\t\t<label>Time to read</label>\n\t\t\t\t<select [(ngModel)]=\"article.read_time\" name=\"time\">\n\t\t\t\t\t<option value=\"\">Select time</option>\n\t\t\t\t\t<option *ngFor=\"let time of times\"> {{ time }}</option>\n\t\t\t\t</select>\n\t\t\t</div>\n\n\t\t\t<div class=\"learn-new-field-text lnfm\">\n\t\t\t\t<div class=\"froalaText froala-custom\" [froalaEditor]='options' [(ngModel)]=\"article.text\" name=\"text\"></div>\n\t\t\t</div>\n\n\t\t\t<div class=\"learn-new-field-button lnfm\">\n\t\t\t\t<button (click)=\"createArticle()\">Publish article</button>\n\t\t\t</div>\n\n\t\t\t<div class=\"learn-new-field-button-remove\" >\n\t\t\t\t<button (click)=\"removeArticle(article_id)\">Remove article</button>\n\t\t\t</div>\n\t\t</form>\n\t</div>\n</section>\n -->\n"

/***/ }),

/***/ "./src/app/Components/backoffice/articles/articles.component.scss":
/***/ (function(module, exports) {

module.exports = "#w-backoffice-articles {\n  background-color: #EDEDED;\n  padding-bottom: 50px; }\n  #w-backoffice-articles .backoffice-box {\n    margin: 30px;\n    padding: 30px;\n    background-color: #fff; }\n  #w-backoffice-articles .backoffice-box h2 {\n      margin-bottom: 25px;\n      color: #999;\n      border-bottom: 2px solid #e5e5e5;\n      text-transform: uppercase; }\n  #w-backoffice-articles .wba-title {\n    padding: 10px 15px;\n    border-bottom: 1px solid #e5e5e5; }\n  #w-backoffice-articles .wba-title h1 {\n      color: #222;\n      font-size: 28px; }\n  #w-backoffice-articles .wba-list .wabl-articles h3 {\n    width: 50%;\n    font-size: 21px;\n    color: #222; }\n  #w-backoffice-articles .wba-list .wabl-articles .buttons {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    text-align: center;\n    padding-left: 50px; }\n  #w-backoffice-articles .wba-list .wabl-articles .buttons button {\n      font-size: 16px;\n      background-color: #999; }\n  #w-backoffice-articles .wba-form .wbaf-fields {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start; }\n  #w-backoffice-articles .wba-form .wbaf-fields .wbaff-left {\n      padding-left: 25px;\n      margin-right: 35px; }\n  #w-backoffice-articles .wba-form .wbaf-fields .wbaff-left .wbaffl-input {\n        margin-bottom: 35px;\n        position: relative; }\n  #w-backoffice-articles .wba-form .wbaf-fields .wbaff-left .wbaffl-input label {\n          width: 120px;\n          font-family: 'FreigBook';\n          color: #222; }\n  #w-backoffice-articles .wba-form .wbaf-fields .wbaff-left .wbaffl-input ul {\n          position: absolute;\n          top: 0;\n          background-color: #fff;\n          border: 1px solid #e5e5e5;\n          z-index: 100;\n          padding: 5px 10px;\n          margin-left: 120px;\n          margin-top: 35px;\n          border-radius: 4px; }\n  #w-backoffice-articles .wba-form .wbaf-fields .wbaff-left .wbaffl-input ul li {\n            color: #222;\n            padding: 5px 10px; }\n  #w-backoffice-articles .wba-form .wbaf-fields .wbaff-left .wbaffl-input input {\n          width: 200px;\n          color: #222;\n          margin: 0;\n          padding: 5px 10px; }\n  #w-backoffice-articles .wba-form .wbaf-fields .wbaff-left .wbaffl-input button {\n          font-size: 16px; }\n  #w-backoffice-articles .wba-form .wbaf-fields .wbaff-right .publish-button {\n      margin-top: 30px;\n      text-align: right; }\n"

/***/ }),

/***/ "./src/app/Components/backoffice/articles/articles.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticlesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_cloudinary__ = __webpack_require__("./node_modules/ng2-cloudinary/dist/esm/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__ = __webpack_require__("./node_modules/ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_search_modal_user_search_modal_user_component__ = __webpack_require__("./src/app/Components/modals/search-modal-user/search-modal-user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_Articles_articles_service__ = __webpack_require__("./src/app/Services/Articles/articles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Services_Articles_article_tags_service__ = __webpack_require__("./src/app/Services/Articles/article-tags.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Interfaces_article_models__ = __webpack_require__("./src/app/Interfaces/article-models.ts");
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


/* Interfaces */

var ArticlesComponent = /** @class */ (function () {
    function ArticlesComponent(ArticlesService, dialogService, ArticleTagsService, Router) {
        this.ArticlesService = ArticlesService;
        this.dialogService = dialogService;
        this.ArticleTagsService = ArticleTagsService;
        this.Router = Router;
        this.article = {};
        this.times = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.showTags = false;
        this.edit = false;
        this.options = {
            placeholderText: 'Edit Your Content Here!',
            events: {
                'froalaEditor.focus': function (e, editor) {
                }
            }
        };
        this.uploader = new __WEBPACK_IMPORTED_MODULE_1_ng2_cloudinary__["b" /* CloudinaryUploader */](new __WEBPACK_IMPORTED_MODULE_1_ng2_cloudinary__["a" /* CloudinaryOptions */]({ cloudName: 'dqpkpmrgk', uploadPreset: 'z7rzegb5', autoUpload: true }));
        this.imageUpload();
    }
    ArticlesComponent.prototype.ngOnInit = function () {
        this.article = __WEBPACK_IMPORTED_MODULE_7__Interfaces_article_models__["a" /* Article */];
        this.getArticles();
    };
    /* RETRIEVE/GET */
    ArticlesComponent.prototype.getArticles = function () {
        var _this = this;
        this.ArticlesService.getArticles().subscribe(function (res) {
            _this.articles = res.articles;
        });
    };
    ArticlesComponent.prototype.getTags = function () {
        var _this = this;
        if (!this.tags) {
            this.ArticleTagsService.getTags().subscribe(function (res) {
                _this.tags = res.tags;
                _this.showTags = true;
            });
        }
        else {
            this.showTags = this.showTags ? false : true;
        }
    };
    ArticlesComponent.prototype.redirectToArticle = function (id, title) {
        this.Router.navigate(['/learn/articles', id, this.transformTitle(title)]);
    };
    /* CREATE/POST */
    ArticlesComponent.prototype.imageUpload = function () {
        var _this = this;
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            _this.cloudinaryImage = JSON.parse(response);
            _this.article.picture = _this.cloudinaryImage.secure_url;
        };
        this.uploader.onAfterAddingFile = function (fileItem) {
            _this.uploader.uploadAll();
        };
    };
    ArticlesComponent.prototype.createArticle = function () {
        var _this = this;
        if (typeof this.article.tags === 'string')
            this.article.tags = this.article.tags.split(',');
        this.article.read_time = parseInt(this.article.read_time);
        this.article.tags.splice(this.article.tags.length - 1, 1);
        if (this.edit) {
            this.updateArticle(this.article.id);
        }
        else {
            this.ArticlesService.createArticle(this.article).subscribe(function (res) {
                if (res.success) {
                    _this.article = {};
                    _this.getArticles();
                }
            });
        }
    };
    ArticlesComponent.prototype.createTags = function () {
        var _this = this;
        this.ArticleTagsService.createTag({ tag: this.tag }).subscribe(function (res) {
            if (res)
                _this.tag = '';
        });
    };
    /* UPDATE/PUT */
    ArticlesComponent.prototype.editArticle = function (index) {
        this.article = {
            id: this.articles[index]['id'],
            title: this.articles[index]['title'],
            picture: this.articles[index]['picture'],
            tags: this.articles[index]['tags'] + ',' || '',
            author: this.articles[index]['author_id'],
            read_time: this.articles[index]['read_time'],
            text: this.articles[index]['text']
        };
        this.edit = true;
    };
    ArticlesComponent.prototype.updateArticle = function (id) {
        var _this = this;
        delete this.article.id;
        this.ArticlesService.updateArticle(id, this.article).subscribe(function (res) {
            if (res.success)
                _this.article = __WEBPACK_IMPORTED_MODULE_7__Interfaces_article_models__["a" /* Article */];
        });
    };
    ArticlesComponent.prototype.resetArticle = function () {
        this.edit = false;
        this.article = __WEBPACK_IMPORTED_MODULE_7__Interfaces_article_models__["a" /* Article */];
    };
    /* REMOVE/DELETE */
    ArticlesComponent.prototype.deleteArticle = function (index, id) {
        var _this = this;
        this.ArticlesService.deleteArticle(id, {}).subscribe(function (res) {
            if (res.success)
                _this.articles.splice(index, 1);
        });
    };
    /* SELECT/CHOSE */
    ArticlesComponent.prototype.selectTags = function (name) {
        this.article.tags += name + ',';
    };
    /* TRANSFORM */
    ArticlesComponent.prototype.transformTitle = function (title) {
        return title.replace(/ /g, '-');
        ;
    };
    /* SHOW MODAL */
    ArticlesComponent.prototype.showSearchUserModal = function (id) {
        var _this = this;
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_4__modals_search_modal_user_search_modal_user_component__["a" /* SearchModalUserComponent */], {
            called_id: id
        }).subscribe(function (profile) {
            if (profile)
                _this.article.author = profile['uid'];
        });
    };
    ArticlesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-articles',
            template: __webpack_require__("./src/app/Components/backoffice/articles/articles.component.html"),
            styles: [__webpack_require__("./src/app/Components/backoffice/articles/articles.component.scss")],
            providers: [__WEBPACK_IMPORTED_MODULE_5__Services_Articles_articles_service__["a" /* ArticlesService */], __WEBPACK_IMPORTED_MODULE_6__Services_Articles_article_tags_service__["a" /* ArticleTagsService */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__Services_Articles_articles_service__["a" /* ArticlesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_Articles_articles_service__["a" /* ArticlesService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__["DialogService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__Services_Articles_article_tags_service__["a" /* ArticleTagsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__Services_Articles_article_tags_service__["a" /* ArticleTagsService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["e" /* Router */]) === "function" && _d || Object])
    ], ArticlesComponent);
    return ArticlesComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=articles.component.js.map

/***/ }),

/***/ "./src/app/Components/backoffice/backoffice.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BackofficeModule", function() { return BackofficeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__ = __webpack_require__("./src/app/Pipes/pipe.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dashboard_dashboard_component__ = __webpack_require__("./src/app/Components/backoffice/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__projects_projects_component__ = __webpack_require__("./src/app/Components/backoffice/projects/projects.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__networks_networks_component__ = __webpack_require__("./src/app/Components/backoffice/networks/networks.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__articles_articles_component__ = __webpack_require__("./src/app/Components/backoffice/articles/articles.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Services_Backoffice_backoffice_service__ = __webpack_require__("./src/app/Services/Backoffice/backoffice.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Services_Profiles_profiles_service__ = __webpack_require__("./src/app/Services/Profiles/profiles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Directives_Backoffice_backoffice_directive__ = __webpack_require__("./src/app/Directives/Backoffice/backoffice.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_cloudinary__ = __webpack_require__("./node_modules/ng2-cloudinary/dist/esm/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ng2_file_upload__ = __webpack_require__("./node_modules/ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angular2_froala_wysiwyg__ = __webpack_require__("./node_modules/angular2-froala-wysiwyg/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angular2_moment__ = __webpack_require__("./node_modules/angular2-moment/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__Routes_backoffice_routes__ = __webpack_require__("./src/app/Routes/backoffice.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__university_campaign_university_campaign_component__ = __webpack_require__("./src/app/Components/backoffice/university-campaign/university-campaign.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__statistics_statistics_component__ = __webpack_require__("./src/app/Components/backoffice/statistics/statistics.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





/* Components */




/* Services */


/* Directives */

/* Libraries */




/* Route */



var BackofficeModule = /** @class */ (function () {
    function BackofficeModule() {
    }
    BackofficeModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_16__Routes_backoffice_routes__["a" /* ADMIN_ROUTES */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["f" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__["a" /* PipeModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_12_ng2_cloudinary__["c" /* Ng2CloudinaryModule */],
                __WEBPACK_IMPORTED_MODULE_13_ng2_file_upload__["FileUploadModule"],
                __WEBPACK_IMPORTED_MODULE_14_angular2_froala_wysiwyg__["a" /* FroalaEditorModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_14_angular2_froala_wysiwyg__["b" /* FroalaViewModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_15_angular2_moment__["MomentModule"]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__networks_networks_component__["a" /* NetworksComponent */],
                __WEBPACK_IMPORTED_MODULE_11__Directives_Backoffice_backoffice_directive__["a" /* BackofficeDirective */],
                __WEBPACK_IMPORTED_MODULE_5__dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_6__projects_projects_component__["a" /* ProjectsComponent */],
                __WEBPACK_IMPORTED_MODULE_8__articles_articles_component__["a" /* ArticlesComponent */],
                __WEBPACK_IMPORTED_MODULE_17__university_campaign_university_campaign_component__["a" /* UniversityCampaignComponent */],
                __WEBPACK_IMPORTED_MODULE_18__statistics_statistics_component__["a" /* StatisticsComponent */]
            ],
            exports: [],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__Services_Backoffice_backoffice_service__["a" /* BackofficeService */],
                __WEBPACK_IMPORTED_MODULE_10__Services_Profiles_profiles_service__["a" /* ProfilesService */]
            ]
        })
    ], BackofficeModule);
    return BackofficeModule;
}());

//# sourceMappingURL=backoffice.module.js.map

/***/ }),

/***/ "./src/app/Components/backoffice/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<section id=\"w-backoffice\" class=\"flex\">\n\t<nav class=\"wb-nav\">\n\t\t<ul>\n\t\t\t<a [routerLink]=\"['/admin/panel']\"><li><i class=\"fa fa-tachometer\"></i> Dashboard</li></a>\n\t\t\t<a [routerLink]=\"['/']\"><li><i class=\"fa fa-envelope\"></i> Mail/Campaign</li></a>\n\t\t\t<a [routerLink]=\"['/']\"><li><i class=\"fa fa-lightbulb-o\"></i> Suggestion campaign</li></a>\n\t\t\t<a [routerLink]=\"['/admin/panel/university-campaign']\"><li><i class=\"fa fa-university\"></i> University campaign</li></a>\n\t\t\t<a [routerLink]=\"['/']\"><li><i class=\"fa fa-users\"></i> Users</li></a>\n\t\t\t<a [routerLink]=\"['/admin/panel/statistics']\"><li><i class=\"fa fa-line-chart\"></i> Statistics</li></a>\n\t\t\t<a [routerLink]=\"['/admin/panel/projects']\"><li><i class=\"fa fa-building-o\"></i> Projects</li></a>\n\t\t\t<a [routerLink]=\"['/admin/panel/networks']\"><li><i class=\"fa fa-globe\"></i> Networks</li></a>\n\t\t\t<a [routerLink]=\"['/admin/panel/articles']\"><li><i class=\"fa fa-newspaper-o\"></i> Articles</li></a>\n\t\t</ul>\n\t</nav>\n\n\t<div class=\"wb-main-body\">\n\t\t<router-outlet></router-outlet>\n\t</div>\n</section>\n"

/***/ }),

/***/ "./src/app/Components/backoffice/dashboard/dashboard.component.scss":
/***/ (function(module, exports) {

module.exports = "#w-backoffice {\n  padding-top: 71px;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start; }\n  #w-backoffice .wb-nav {\n    position: fixed;\n    background-color: #292C33;\n    height: 100vh; }\n  #w-backoffice .wb-nav i {\n      width: 40px;\n      text-align: center; }\n  #w-backoffice .wb-nav ul li {\n      white-space: nowrap;\n      font-family: 'FreigMed';\n      color: white;\n      padding: 10px 30px;\n      text-transform: uppercase;\n      cursor: pointer; }\n  #w-backoffice .wb-nav ul li:hover {\n      background-color: #3E4147; }\n  #w-backoffice .wb-main-body {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    height: 100vh;\n    background-color: #F7F7F7;\n    padding-left: 275px; }\n"

/***/ }),

/***/ "./src/app/Components/backoffice/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
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

var DashboardComponent = /** @class */ (function () {
    function DashboardComponent() {
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__("./src/app/Components/backoffice/dashboard/dashboard.component.html"),
            styles: [__webpack_require__("./src/app/Components/backoffice/dashboard/dashboard.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], DashboardComponent);
    return DashboardComponent;
}());

//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "./src/app/Components/backoffice/networks/networks.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"w-backoffice-network\" backDiv>\n\t<div id=\"wbn-1\" class=\"wbn-networks\">\n\t\t<input id=\"wbn-1-i\" type=\"text\" placeholder=\"Select university...\" [(ngModel)]=\"searchNetwork\" />\n\t\t<ul id=\"wbn-1-b\" *ngIf=\"networks\">\n\t\t\t<li class=\"cursor-pt\" *ngFor=\"let network of networks | searchPipe: 'network': searchNetwork\" (click)=\"selectNetwork(network.network)\">{{ network.network }}</li>\n\t\t</ul>\n\t</div>\n\t<input type=\"text\" placeholder=\"Custom name...\" [(ngModel)]=\"custom_name\" />\n\t<button (click)=\"createNetworkInvitation()\">Get Token</button>\n\n\t<h2 style=\"color: #222\">{{ invite_link }}</h2>\n</div>\n"

/***/ }),

/***/ "./src/app/Components/backoffice/networks/networks.component.scss":
/***/ (function(module, exports) {

module.exports = ".w-backoffice-network {\n  padding: 100px 50px; }\n  .w-backoffice-network input {\n    margin: 0; }\n  .w-backoffice-network .wbn-networks ul {\n    position: absolute;\n    display: none;\n    border: 1px solid #e5e5e5;\n    border-radius: 4px;\n    background-color: #fff;\n    height: 300px;\n    overflow: scroll; }\n  .w-backoffice-network .wbn-networks li {\n    color: #222; }\n"

/***/ }),

/***/ "./src/app/Components/backoffice/networks/networks.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NetworksComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_Networks_networks_service__ = __webpack_require__("./src/app/Services/Networks/networks.service.ts");
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

var NetworksComponent = /** @class */ (function () {
    function NetworksComponent(NetworksService) {
        this.NetworksService = NetworksService;
    }
    NetworksComponent.prototype.ngOnInit = function () {
        this.getNetworks();
    };
    NetworksComponent.prototype.getNetworks = function () {
        var _this = this;
        this.NetworksService.getNetworks('university').subscribe(function (res) {
            _this.networks = res.university;
        });
    };
    NetworksComponent.prototype.selectNetwork = function (network) {
        this.searchNetwork = network;
    };
    // getNetworkInfo() {
    // 	this.NetworksService.getNetworkInvitation(token).subscribe( res => {
    // 		console.log(res);
    // 	});
    // }
    NetworksComponent.prototype.createNetworkInvitation = function () {
        var _this = this;
        if (this.searchNetwork && this.custom_name) {
            var body = { name: this.searchNetwork, url_name: this.custom_name, type: 'University' };
            this.NetworksService.createNetworkInvitation(body).subscribe(function (res) {
                _this.invite_link = 'https://www.wittycircle.com/invite/welcome/' + _this.custom_name + '/' + res.token;
            });
        }
    };
    NetworksComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-networks',
            template: __webpack_require__("./src/app/Components/backoffice/networks/networks.component.html"),
            styles: [__webpack_require__("./src/app/Components/backoffice/networks/networks.component.scss")],
            providers: [__WEBPACK_IMPORTED_MODULE_1__Services_Networks_networks_service__["a" /* NetworksService */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_Networks_networks_service__["a" /* NetworksService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_Networks_networks_service__["a" /* NetworksService */]) === "function" && _a || Object])
    ], NetworksComponent);
    return NetworksComponent;
    var _a;
}());

//# sourceMappingURL=networks.component.js.map

/***/ }),

/***/ "./src/app/Components/backoffice/projects/projects.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wbmb-projects\">\n\t<h1 class=\"freigm\">Projects</h1>\n\n\t<div class=\"wbmbp-invite\">\n\t\t<h2 class=\"freigm mar-b-15\">Recommandation</h2>\n\n\t\t<h3>All types</h3>\n\t\t<ul>\n\t\t\t<li *ngFor=\"let type of types\">{{ type }}</li>\n\t\t</ul>\n\n\t\t<label>Type *Mandatory</label>\n\t\t\t<input type=\"text\" name=\"type\" [(ngModel)]=\"type\" />\n\t\t\t<p *ngIf=\"errors && errors.error1\">{{ errors.error1 }}</p>\n\t\t<label>Add Project *public_id* (one by one)</label> \n\t\t\t<input type=\"text\" name=\"addProject\" [(ngModel)]=\"public_id\" />\n\n\t\t<label>Add Profile *username* (one by one)</label>\n\t\t\t<input type=\"text\" name=\"addUser\" [(ngModel)]=\"username\" />\n\n\t\t<button (click)=\"addProjects()\">Add (Always *type + public_id* or *Type + username*)</button> <button style=\"background-color: #999\" (click)=\"removeSelectedPP()\">Remove (Always *type + public_id* or *Type + username*)</button>\n\t\t<p *ngIf=\"errors && errors.error2\">{{ errors.error2 }}</p>\n\t\t<p *ngIf=\"errors && errors.error3\">{{ errors.error3 }}</p>\n\t\t<p *ngIf=\"success\">{{ success }}</p>\n\t\t<!-- <div class=\"wbmbp-body flex\" *ngFor=\"let project of projects; let i = index\">\n\t\t\t<div class=\"wbmbp-list flex-grow\">\n\t\t\t\t<div class=\"wbmbpl-element\">\n\t\t\t\t\t<div class=\"wbmbple-info flex mar-b-15\">\n\t\t\t\t\t\t<img class=\"mar-r-10\" [src]=\"project.picture\" alt=\"project-picture\" />\n\t\t\t\t\t\t<div class=\"info\">\n\t\t\t\t\t\t\t<h3 class=\"freigs\">{{ project.title }}</h3>\n\t\t\t\t\t\t\t<span class=\"freigb\">{{ project.location }}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"wbmbple-description\">\n\t\t\t\t\t\t<p class=\"freigb\">{{ project.description }}</p>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"wbmbple-status\">\n\t\t\t\t\t\t<p class=\"freigm\" *ngIf=\"sent\">Already recommanded <i class=\"fa fa-check\"></i></p>\n \t\t\t\t\t\t<p class=\"freigm\" *ngIf=\"!sent\"><i>Pending...</i></p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<a class=\"freigm project-link\" [routerLink]=\"['/project/', project.public_id, transformUrl(project.title)]\">Link to project</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"wbmbp-form flex-grow\">\n\t\t\t\t<label class=\"freigs\">Creator name</label>\n\t\t\t\t<input type=\"text\" name=\"creator_name\" placeholder=\"Enter a name...\" [(ngModel)]=\"name\"/>\n\t\t\t\t<label class=\"freigs\">Creator email</label>\n\t\t\t\t<input type=\"email\" name=\"creator_email\" placeholder=\"Enter an email...\" [(ngModel)]=\"email\"/>\n\t\t\t\t<button (click)=\"sendProjectInvitation(i)\">Send recommandation</button>\n\t\t\t</div>\n\t\t</div> -->\n\n\t\t<div></div>\n\t</div>\n</div>\n"

/***/ }),

/***/ "./src/app/Components/backoffice/projects/projects.component.scss":
/***/ (function(module, exports) {

module.exports = ".wbmb-projects h1 {\n  font-size: 28px;\n  color: #222;\n  padding: 10px 15px;\n  background-color: #EDEDED;\n  border-bottom: 1px solid #e5e5e5; }\n\n.wbmb-projects h3, .wbmb-projects li, .wbmb-projects label, .wbmb-projects p {\n  color: #222; }\n\n.wbmb-projects ul {\n  margin-bottom: 30px; }\n\n.wbmb-projects input {\n  margin: 0;\n  padding-left: 10px; }\n\n.wbmb-projects .wbmbp-invite {\n  margin: 30px;\n  border: 1px solid #e5e5e5;\n  padding: 10px 15px;\n  background-color: #fff;\n  /*.wbmbp-body {\n\t\t\talign-items: flex-start;\n\t\t\tpadding-bottom: 30px;\n\t\t\tborder-bottom: 1px solid #e5e5e5;\n\t\t\tpadding-top: 15px;\n\n\t\t\t.wbmbp-list {\n\t\t\t\twidth: 50%;\n\t\t\t\tpadding-right: 15px;\n\n\t\t\t\t.wbmbple-info {\n\t\t\t\t\talign-items: flex-start;\n\n\t\t\t\t\th3 {\n\t\t\t\t\t\tcolor: #222;\n\t\t\t\t\t\tfont-size: 18px;\n\t\t\t\t\t}\n\n\t\t\t\t\tspan {\n\t\t\t\t\t\tcolor: #999;\n\t\t\t\t\t\tfont-size: 14px;\n\t\t\t\t\t}\n\n\t\t\t\t\timg {\n\t\t\t\t\t\twidth: 50px;\n\t\t\t\t\t\theight: 50px;\n\t\t\t\t\t\tborder-radius: 4px;\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t.wbmbple-description {\n\t\t\t\t\tmargin-bottom: 20px;\n\t\t\t\t\tp {\n\t\t\t\t\t\tcolor: #222;\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t.wbmbple-status {\n\t\t\t\t\tp {\n\t\t\t\t\t\tcolor: #999;\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t.project-link {\n\t\t\t\t\tcolor: hotpink;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t.wbmbp-form {\n\t\t\t\twidth: 50%;\n\t\t\t\tpadding-left: 35px;\n\t\t\t\tborder-left: 2px solid #e5e5e5;\n\n\t\t\t\tlabel {\n\t\t\t\t\tcolor: #222;\n\t\t\t\t}\n\n\t\t\t\tinput {\n\t\t\t\t\tmargin: 0;\n\t\t\t\t    padding: 0;\n\t\t\t\t    padding: 5px 10px;\n\t\t\t\t    border-radius: 2px;\n\t\t\t\t    margin-bottom: 10px;\n\t\t\t\t}\n\n\t\t\t\tbutton {\n\t\t\t\t\tfont-family: 'freigmed';\n\t\t\t\t    text-transform: uppercase;\n\t\t\t\t    font-size: 16px;\n\t\t\t\t}\n\t\t\t}\n\t\t}*/ }\n\n.wbmb-projects .wbmbp-invite h2 {\n    font-size: 18px;\n    text-transform: uppercase;\n    color: #999;\n    padding-bottom: 5px;\n    border-bottom: 2px solid #e5e5e5; }\n"

/***/ }),

/***/ "./src/app/Components/backoffice/projects/projects.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_Backoffice_backoffice_service__ = __webpack_require__("./src/app/Services/Backoffice/backoffice.service.ts");
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

var ProjectsComponent = /** @class */ (function () {
    function ProjectsComponent(BackofficeService) {
        this.BackofficeService = BackofficeService;
        this.types = ['new_projects', 'recently_projects', 'featured_projects', 'top_ranked_people', 'great_people'];
        this.errors = { error1: null, error2: null, error3: null };
        this.success = null;
    }
    ProjectsComponent.prototype.ngOnInit = function () {
        // this.getRecommandedProject();
    };
    ProjectsComponent.prototype.addProjects = function () {
        var _this = this;
        var body = {
            username: this.username || null,
            public_id: parseInt(this.public_id) || null,
        };
        if (this.username && this.public_id)
            return this.errors['error3'] = 'only username or public id !!!!!';
        if (this.types.indexOf(this.type) < 0)
            return this.errors['error1'] = 'Wrong type';
        this.BackofficeService.addSelectedProjectsProfiles(this.type, body).subscribe(function (r) {
            if (r.success)
                _this.success = 'Adding done!';
            else
                _this.errors['error2'] = 'Adding fail, something went wrong ! My bad';
            _this.removeError();
        });
    };
    ProjectsComponent.prototype.removeSelectedPP = function () {
        var _this = this;
        var body = {
            username: this.username || null,
            public_id: this.public_id || null,
        };
        if (this.types.indexOf(this.type) < 0)
            return this.errors['error1'] = 'Wrong type';
        console.log(body);
        this.BackofficeService.removeSelectedProjectsProfiles(this.type, body).subscribe(function (r) {
            if (r.success)
                _this.success = 'Removing done!';
            else
                _this.errors['error2'] = 'Removing fail, something went wrong ! My bad';
            _this.removeError();
        });
    };
    ProjectsComponent.prototype.removeError = function () {
        this.errors = { error1: null, error2: null, error3: null };
        this.type = null;
        this.username = null;
        this.public_id = null;
    };
    // getRecommandedProject() {
    // 	this.BackofficeService.getSelfPostProjects().subscribe( res => {
    // 		console.log(res);
    // 		this.projects = res.project_list
    // 	});
    // }
    // sendProjectInvitation(index) {
    // 	console.log(this.projects[index]);
    // 	const body = {
    // 		name 	: this.name,
    // 		id 		: this.projects[index]['id'],
    // 		email 	: this.email
    // 	}
    // 	this.BackofficeService.sendProjectInvitation(body).subscribe( res => {
    // 		console.log(res);
    // 	});
    // }
    ProjectsComponent.prototype.transformUrl = function (url) {
        url = url.replace(/ /g, '-');
        return url;
    };
    ProjectsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-projects',
            template: __webpack_require__("./src/app/Components/backoffice/projects/projects.component.html"),
            styles: [__webpack_require__("./src/app/Components/backoffice/projects/projects.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_Backoffice_backoffice_service__["a" /* BackofficeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_Backoffice_backoffice_service__["a" /* BackofficeService */]) === "function" && _a || Object])
    ], ProjectsComponent);
    return ProjectsComponent;
    var _a;
}());

//# sourceMappingURL=projects.component.js.map

/***/ }),

/***/ "./src/app/Components/backoffice/statistics/statistics.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"projects-table\">\n\t<h1>Projects</h1>\n\n\t<table *ngIf=\"projects\">\n\t\t<tr>\n\t\t\t<th>Title</th>\n\t\t\t<th>Date of creation</th>\n\t\t\t<th>Link</th>\n\t\t</tr>\n\t\t<tr *ngFor=\"let project of projects\">\n\t\t\t<td>{{ project.title }}</td>\n\t\t\t<td>{{ project.creation_date | amDateFormat:'LL' }}</td>\n\t\t\t<td><a routerLink=\"/project/{{ project.public_id }}/{{ project.title }}\"> /project/{{ project.public_id }}/{{ project.title }} </a></td>\n\t\t</tr>\n\t</table>\n</div>\n\n<div class=\"users-table\">\n\t<h1>Users</h1>\n\t<table *ngIf=\"users\">\n\t\t<tr>\n\t\t\t<th>First Name</th>\n\t\t\t<th>Last Name</th>\n\t\t\t<th>Date of creation</th>\n\t\t\t<th>Link</th>\n\t\t</tr>\n\t\t<tr *ngFor=\"let user of users\">\n\t\t\t<td>{{ user.first_name }}</td>\n\t\t\t<td>{{ user.last_name }}</td>\n\t\t\t<td>{{ user.creation_date | amDateFormat:'LL' }}</td>\n\t\t\t<td><a routerLink=\"/{{ user.username }}\"> /{{ user.username }} </a></td>\n\t\t</tr>\n\t</table>\n</div>\n\n<section class=\"stats\" *ngIf=\"stats\">\n\n\t<h1>Users Stats</h1>\n\t<div class=\"stats-users flex\">\n\t\t<div class=\"users-stats-table\" *ngIf=\"stats.users as us\">\n\t\t\t<h1>Users Stats all time</h1><br />\n\t\t\t<table>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Total</th>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>{{ us.allTime[0].users }}</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</div>\n\n\t\t<div class=\"users-stats-table\" *ngIf=\"stats.users as us\">\n\t\t\t<h1>Users Stats by day</h1><br />\n\t\t\t<table>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Date</th>\n\t\t\t\t\t<th>Number</th>\n\t\t\t\t</tr>\n\t\t\t\t<tr *ngFor=\"let day of us.lastDay\">\n\t\t\t\t\t<td>{{ day.date | amDateFormat:'LL' }}</td>\n\t\t\t\t\t<td>{{ day.number }}</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</div>\n\n\t\t<div class=\"users-stats-table\" *ngIf=\"stats.users as us\">\n\t\t\t<h1>Users Stats by month</h1><br />\n\t\t\t<table>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Month</th>\n\t\t\t\t\t<th>Number</th>\n\t\t\t\t</tr>\n\t\t\t\t<tr *ngFor=\"let day of us.lastMonth\">\n\t\t\t\t\t<td>{{ day.month }}</td>\n\t\t\t\t\t<td>{{ day.number }}</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</div>\n\n\t\t<div class=\"users-stats-table\" *ngIf=\"stats.users as us\">\n\t\t\t<h1>Users Stats by about</h1><br />\n\t\t\t<table>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Date</th>\n\t\t\t\t\t<th>About</th>\n\t\t\t\t\t<th>Number</th>\n\t\t\t\t</tr>\n\t\t\t\t<tr *ngFor=\"let day of us.byAbout\">\n\t\t\t\t\t<td>{{ day.date | amDateFormat:'LL' }}</td>\n\t\t\t\t\t<td>{{ day.about }}</td>\n\t\t\t\t\t<td>{{ day.number }}</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</div>\n\t</div>\n\t<hr>\n\n\t<h1>Projects Stats</h1>\n\t<div class=\"stats-projects flex\" *ngIf=\"stats.projects as ps\">\n\t\t<div class=\"users-stats-table\">\n\t\t\t<h1>Projects stats all time</h1><br />\n\t\t\t<table>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Total</th>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>{{ ps.allTime[0].projects }}</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</div>\n\n\t\t<div class=\"users-stats-table\">\n\t\t\t<h1>Projects stats by day</h1><br />\n\t\t\t<table>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Date</th>\n\t\t\t\t\t<th>Number</th>\n\t\t\t\t</tr>\n\t\t\t\t<tr *ngFor=\"let day of ps.lastDay\">\n\t\t\t\t\t<td>{{ day.date | amDateFormat:'LL' }}</td>\n\t\t\t\t\t<td>{{ day.number }}</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</div>\n\n\t\t<div class=\"users-stats-table\">\n\t\t\t<h1>Projects stats by month</h1><br />\n\t\t\t<table>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Month</th>\n\t\t\t\t\t<th>Number</th>\n\t\t\t\t</tr>\n\t\t\t\t<tr *ngFor=\"let day of ps.lastMonth\">\n\t\t\t\t\t<td>{{ day.month }}</td>\n\t\t\t\t\t<td>{{ day.number }}</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</div>\n\n\t\t<div class=\"users-stats-table\">\n\t\t\t<h1>Projects stats by status</h1><br />\n\t\t\t<table>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Date</th>\n\t\t\t\t\t<th>Status</th>\n\t\t\t\t\t<th>Number</th>\n\t\t\t\t</tr>\n\t\t\t\t<tr *ngFor=\"let day of ps.byStatus\">\n\t\t\t\t\t<td>{{ day.date | amDateFormat:'LL' }}</td>\n\t\t\t\t\t<td>{{ day.status }}</td>\n\t\t\t\t\t<td>{{ day.number }}</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</div>\n\n\t\t<div class=\"users-stats-table\">\n\t\t\t<h1>Projects stats with need</h1><br />\n\t\t\t<table>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Number</th>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>{{ ps.withNeed[0].number }}</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</div>\n\t</div>\n\t<hr>\n\n\t<h1>Needs Stats</h1>\n\t<div class=\"stats-needs flex\" *ngIf=\"stats.needs as ns\">\n\t\t<div class=\"users-stats-table\">\n\t\t\t<h1>Needs stats all time</h1><br />\n\t\t\t<table>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Total</th>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>{{ ns.allTime[0].needs }}</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</div>\n\n\t\t<div class=\"users-stats-table\">\n\t\t\t<h1>Needs stats by status</h1><br />\n\t\t\t<table>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Date</th>\n\t\t\t\t\t<th>Status</th>\n\t\t\t\t\t<th>Number</th>\n\t\t\t\t</tr>\n\t\t\t\t<tr *ngFor=\"let day of ns.byStatus\">\n\t\t\t\t\t<td>{{ day.date | amDateFormat:'LL' }}</td>\n\t\t\t\t\t<td>{{ day.status }}</td>\n\t\t\t\t\t<td>{{ day.number }}</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</div>\n\t</div>\n\t<hr>\n\n\t<h1>Messages Stats</h1>\n\t<div class=\"stats-messages flex\" *ngIf=\"stats.messages as ms\">\n\t\t<div class=\"users-stats-table\">\n\t\t\t<h1>Messages stats all time</h1><br />\n\t\t\t<table>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Total</th>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>{{ ms.allTimeM[0].messages }}</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</div>\n\n\t\t<div class=\"users-stats-table\">\n\t\t\t<h1>Messages stats by day</h1><br />\n\t\t\t<table>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Date</th>\n\t\t\t\t\t<th>Number</th>\n\t\t\t\t</tr>\n\t\t\t\t<tr *ngFor=\"let day of ms.byDayM\">\n\t\t\t\t\t<td>{{ day.date | amDateFormat:'LL' }}</td>\n\t\t\t\t\t<td>{{ day.number }}</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</div>\n\n\t\t<div class=\"users-stats-table\">\n\t\t\t<h1>Messages stats by month</h1><br />\n\t\t\t<table>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Date</th>\n\t\t\t\t\t<th>Number</th>\n\t\t\t\t</tr>\n\t\t\t\t<tr *ngFor=\"let day of ms.byMonthM\">\n\t\t\t\t\t<td>{{ day.date | amDateFormat:'LL' }}</td>\n\t\t\t\t\t<td>{{ day.number }}</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</div>\n\n\t\t<div class=\"users-stats-table\">\n\t\t\t<h1>Conversations stats all time</h1><br />\n\t\t\t<table>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Total</th>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>{{ ms.allTimeC[0].rooms }}</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</div>\n\n\t\t<div class=\"users-stats-table\">\n\t\t\t<h1>Messages stats by day</h1><br />\n\t\t\t<table>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Date</th>\n\t\t\t\t\t<th>Number</th>\n\t\t\t\t</tr>\n\t\t\t\t<tr *ngFor=\"let day of ms.byDayC\">\n\t\t\t\t\t<td>{{ day.date | amDateFormat:'LL' }}</td>\n\t\t\t\t\t<td>{{ day.number }}</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</div>\n\n\t\t<div class=\"users-stats-table\">\n\t\t\t<h1>Messages stats by month</h1><br />\n\t\t\t<table>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Date</th>\n\t\t\t\t\t<th>Number</th>\n\t\t\t\t</tr>\n\t\t\t\t<tr *ngFor=\"let day of ms.byMonthC\">\n\t\t\t\t\t<td>{{ day.date | amDateFormat:'LL' }}</td>\n\t\t\t\t\t<td>{{ day.number }}</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</div>\n\t</div>\n</section>\n"

/***/ }),

/***/ "./src/app/Components/backoffice/statistics/statistics.component.scss":
/***/ (function(module, exports) {

module.exports = ".projects-table, .users-table, .users-stats-table {\n  width: 100%;\n  height: 400px;\n  overflow: scroll;\n  padding: 30px 25px 0 25px;\n  background-color: #fff;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin-bottom: 30px; }\n  .projects-table h1, .users-table h1, .users-stats-table h1 {\n    font-family: 'FreigSem';\n    color: #222; }\n  .projects-table th, .users-table th, .users-stats-table th {\n    font-family: 'FreigMed';\n    color: #222; }\n  .projects-table td, .users-table td, .users-stats-table td {\n    font-family: 'FreigBook';\n    color: #333; }\n  .projects-table a, .users-table a, .users-stats-table a {\n    color: #4361F6; }\n  .projects-table table, .projects-table th, .projects-table td, .users-table table, .users-table th, .users-table td, .users-stats-table table, .users-stats-table th, .users-stats-table td {\n    border: 1px solid black; }\n  .stats h1 {\n  font-family: 'FreigSem';\n  color: #222;\n  font-size: 32px; }\n  .users-stats-table td {\n  text-align: center; }\n  .users-stats-table h1 {\n  font-size: 21px; }\n"

/***/ }),

/***/ "./src/app/Components/backoffice/statistics/statistics.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatisticsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_Backoffice_backoffice_service__ = __webpack_require__("./src/app/Services/Backoffice/backoffice.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// Services

var StatisticsComponent = /** @class */ (function () {
    function StatisticsComponent(BackofficeService) {
        this.BackofficeService = BackofficeService;
    }
    StatisticsComponent.prototype.ngOnInit = function () {
        this.getUsers();
        this.getProjects();
        this.getStats();
    };
    StatisticsComponent.prototype.getUsers = function () {
        var _this = this;
        this.BackofficeService.getUsers().subscribe(function (res) {
            if (res)
                _this.users = res.users;
        });
    };
    StatisticsComponent.prototype.getProjects = function () {
        var _this = this;
        this.BackofficeService.getProjects().subscribe(function (res) {
            if (res)
                _this.projects = res.projects;
        });
    };
    StatisticsComponent.prototype.getStats = function () {
        var _this = this;
        this.BackofficeService.getStatsAnalytic().subscribe(function (res) {
            _this.stats = res.stats;
            console.log(_this.stats);
        });
    };
    StatisticsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-stastics',
            template: __webpack_require__("./src/app/Components/backoffice/statistics/statistics.component.html"),
            styles: [__webpack_require__("./src/app/Components/backoffice/statistics/statistics.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_Backoffice_backoffice_service__["a" /* BackofficeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_Backoffice_backoffice_service__["a" /* BackofficeService */]) === "function" && _a || Object])
    ], StatisticsComponent);
    return StatisticsComponent;
    var _a;
}());

//# sourceMappingURL=statistics.component.js.map

/***/ }),

/***/ "./src/app/Components/backoffice/university-campaign/university-campaign.component.html":
/***/ (function(module, exports) {

module.exports = "<section id=\"w-backoffice-uc\">\n\t<div class=\"wbuc-title\">\n\t\t<h1 class=\"freigm\">University Campaign</h1>\n\t</div>\n\n\t<div class=\"wbuc-box backoffice-box\">\n\t\t<h2 class=\"freigm pad-b-10\">Add ambassadors</h2>\n\n\t\t<div class=\"wbucb-contents flex\">\n\t\t\t<div class=\"wbucbc-search\">\n\t\t\t\t<input type=\"text\" name=\"searchUsers\" [(ngModel)]=\"searchName\" placeholder=\"Search a user\" />\n\n\t\t\t\t<ul>\n\t\t\t\t\t<li class=\"flex\" *ngFor=\"let profile of (profiles | searchPipe: 'fullName': searchName).slice(0, 5)\" (click)=\"setAmbassador(profile.uid)\">\n\t\t\t\t\t\t<img class=\"mar-r-15\" [src]=\"profile.picture\" alt=\"profile-picture\" />\n\t\t\t\t\t\t<div class=\"profile-info\">\n\t\t\t\t\t\t\t<h4 class=\"freigb\">{{ profile.fullName }}</h4>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\n\t\t\t<div class=\"wbucbc-ambassadors\">\n\t\t\t\t<h3 class=\"freigb\">List of ambassadors</h3>\n\n\t\t\t\t<ul>\n\t\t\t\t\t<li class=\"flex\" *ngFor=\"let ambassador of ambassadors\" >\n\t\t\t\t\t\t<img class=\"profile-picture mar-r-15\" [src]=\"ambassador.picture\" alt=\"profile-picture\" />\n\t\t\t\t\t\t<div class=\"profile-info\">\n\t\t\t\t\t\t\t<h4 class=\"freigb\">{{ ambassador.fullName }}</h4>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<img class=\"cross-icon\" (click)=\"removeAmbassador(ambassador.id)\" src=\"/public/images/cross-icon.svg\" alt=\"cross-icon\">\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</section>\n"

/***/ }),

/***/ "./src/app/Components/backoffice/university-campaign/university-campaign.component.scss":
/***/ (function(module, exports) {

module.exports = "#w-backoffice-uc {\n  background-color: #EDEDED;\n  padding-bottom: 50px;\n  height: 100vh; }\n  #w-backoffice-uc .wbuc-title {\n    padding: 10px 15px;\n    border-bottom: 1px solid #e5e5e5; }\n  #w-backoffice-uc .wbuc-title h1 {\n      color: #222;\n      font-size: 28px; }\n  #w-backoffice-uc .backoffice-box {\n    margin: 30px;\n    padding: 30px;\n    background-color: #fff; }\n  #w-backoffice-uc .backoffice-box h2 {\n      margin-bottom: 25px;\n      color: #999;\n      border-bottom: 2px solid #e5e5e5;\n      text-transform: uppercase; }\n  #w-backoffice-uc .wbuc-box .wbucb-contents .wbucbc-search {\n    width: 50%;\n    padding: 10px 29px 10px 30px;\n    border-right: 1px solid #e5e5e5; }\n  #w-backoffice-uc .wbuc-box .wbucb-contents .wbucbc-search input {\n      background-image: url(/public/images/search-icon-b.svg);\n      background-repeat: no-repeat;\n      background-position: 0% 50%;\n      width: 100%;\n      border: 0;\n      border-bottom: 1px solid;\n      border-radius: 0;\n      margin-right: 0 20px 20px 0;\n      padding: 8px 5px 10px 30px; }\n  #w-backoffice-uc .wbuc-box .wbucb-contents .wbucbc-search ul li {\n      padding: 8px 15px;\n      cursor: pointer; }\n  #w-backoffice-uc .wbuc-box .wbucb-contents .wbucbc-search ul li img {\n        width: 35px;\n        border-radius: 50%; }\n  #w-backoffice-uc .wbuc-box .wbucb-contents .wbucbc-search ul li .profile-info h4 {\n        color: #222; }\n  #w-backoffice-uc .wbuc-box .wbucb-contents .wbucbc-search ul li:hover {\n      border-radius: 4px;\n      background-color: #fafafa; }\n  #w-backoffice-uc .wbuc-box .wbucb-contents .wbucbc-ambassadors {\n    -ms-flex-item-align: start;\n        align-self: flex-start;\n    padding: 10px 20px;\n    width: 50%; }\n  #w-backoffice-uc .wbuc-box .wbucb-contents .wbucbc-ambassadors h3 {\n      color: #222;\n      border-bottom: 1px solid #999;\n      /* display: inline; */\n      margin-bottom: 15px; }\n  #w-backoffice-uc .wbuc-box .wbucb-contents .wbucbc-ambassadors ul li {\n      padding: 8px 15px; }\n  #w-backoffice-uc .wbuc-box .wbucb-contents .wbucbc-ambassadors ul li .profile-picture {\n        width: 40px;\n        border-radius: 50%; }\n  #w-backoffice-uc .wbuc-box .wbucb-contents .wbucbc-ambassadors ul li .profile-info h4 {\n        color: #222; }\n  #w-backoffice-uc .wbuc-box .wbucb-contents .wbucbc-ambassadors ul li .cross-icon {\n        width: 16px;\n        margin-left: auto;\n        cursor: pointer; }\n"

/***/ }),

/***/ "./src/app/Components/backoffice/university-campaign/university-campaign.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UniversityCampaignComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_Profiles_profiles_service__ = __webpack_require__("./src/app/Services/Profiles/profiles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_Backoffice_backoffice_service__ = __webpack_require__("./src/app/Services/Backoffice/backoffice.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UniversityCampaignComponent = /** @class */ (function () {
    function UniversityCampaignComponent(ProfilesService, BackofficeService) {
        this.ProfilesService = ProfilesService;
        this.BackofficeService = BackofficeService;
        this.profiles = [];
        this.ambassadors = [];
    }
    UniversityCampaignComponent.prototype.ngOnInit = function () {
        this.getProfiles();
        this.getAmbassadors();
    };
    UniversityCampaignComponent.prototype.getProfiles = function () {
        var _this = this;
        this.ProfilesService.getProfiles().subscribe(function (res) {
            _this.profiles = res.profiles;
        });
    };
    UniversityCampaignComponent.prototype.getAmbassadors = function () {
        var _this = this;
        this.BackofficeService.getAmbassadors().subscribe(function (res) {
            _this.ambassadors = res.profiles;
        });
    };
    UniversityCampaignComponent.prototype.setAmbassador = function (uid) {
        var _this = this;
        this.BackofficeService.setAmbassador({ id: uid }).subscribe(function (res) {
            if (res)
                _this.getAmbassadors();
        });
    };
    UniversityCampaignComponent.prototype.removeAmbassador = function (uid) {
        var _this = this;
        this.BackofficeService.removeAmbassador({ id: uid }).subscribe(function (res) {
            if (res)
                _this.getAmbassadors();
        });
    };
    UniversityCampaignComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-university-campaign',
            template: __webpack_require__("./src/app/Components/backoffice/university-campaign/university-campaign.component.html"),
            styles: [__webpack_require__("./src/app/Components/backoffice/university-campaign/university-campaign.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_Profiles_profiles_service__["a" /* ProfilesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_Profiles_profiles_service__["a" /* ProfilesService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__Services_Backoffice_backoffice_service__["a" /* BackofficeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_Backoffice_backoffice_service__["a" /* BackofficeService */]) === "function" && _b || Object])
    ], UniversityCampaignComponent);
    return UniversityCampaignComponent;
    var _a, _b;
}());

//# sourceMappingURL=university-campaign.component.js.map

/***/ }),

/***/ "./src/app/Directives/Backoffice/backoffice.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackofficeDirective; });
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

var BackofficeDirective = /** @class */ (function () {
    function BackofficeDirective(el) {
        this.el = el;
        this.nativeElement = el.nativeElement;
    }
    BackofficeDirective.prototype.showNetworks = function () {
        if (this.nativeElement.querySelector('#wbn-1-b').style.display !== 'block')
            this.nativeElement.querySelector('#wbn-1-b').style.display = 'block';
        else
            this.hideNetworks();
    };
    BackofficeDirective.prototype.hideNetworks = function () {
        if (this.nativeElement.querySelector('#wbn-1-b'))
            this.nativeElement.querySelector('#wbn-1-b').style.display = 'none';
    };
    BackofficeDirective.prototype.onClick = function (event) {
        if (this.nativeElement.querySelector('#wbn-1-i') && this.nativeElement.querySelector('#wbn-1-i').contains(event.target)) {
            this.showNetworks();
        }
        else {
            this.hideNetworks();
        }
    };
    BackofficeDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[backDiv]',
            host: {
                '(document:click)': 'onClick($event)',
            },
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
    ], BackofficeDirective);
    return BackofficeDirective;
    var _a;
}());

//# sourceMappingURL=backoffice.directive.js.map

/***/ }),

/***/ "./src/app/Interfaces/article-models.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Article; });
/* Article Models */
var Article = {
    title: '',
    picture: '',
    author: '',
    tags: [],
    read_time: 0,
    text: ''
};
//# sourceMappingURL=article-models.js.map

/***/ }),

/***/ "./src/app/Routes/backoffice.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ADMIN_ROUTES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Components_backoffice_dashboard_dashboard_component__ = __webpack_require__("./src/app/Components/backoffice/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Components_backoffice_projects_projects_component__ = __webpack_require__("./src/app/Components/backoffice/projects/projects.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Components_backoffice_networks_networks_component__ = __webpack_require__("./src/app/Components/backoffice/networks/networks.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Components_backoffice_articles_articles_component__ = __webpack_require__("./src/app/Components/backoffice/articles/articles.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Components_backoffice_university_campaign_university_campaign_component__ = __webpack_require__("./src/app/Components/backoffice/university-campaign/university-campaign.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Components_backoffice_statistics_statistics_component__ = __webpack_require__("./src/app/Components/backoffice/statistics/statistics.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Services_Authentication_authentication_service__ = __webpack_require__("./src/app/Services/Authentication/authentication.service.ts");

/* Components */






/* Services */

/* Librairies */
var routes = [
    { path: '', canActivate: [__WEBPACK_IMPORTED_MODULE_7__Services_Authentication_authentication_service__["a" /* AuthenticationService */]], component: __WEBPACK_IMPORTED_MODULE_1__Components_backoffice_dashboard_dashboard_component__["a" /* DashboardComponent */],
        children: [
            { path: 'projects', component: __WEBPACK_IMPORTED_MODULE_2__Components_backoffice_projects_projects_component__["a" /* ProjectsComponent */] },
            { path: 'networks', component: __WEBPACK_IMPORTED_MODULE_3__Components_backoffice_networks_networks_component__["a" /* NetworksComponent */] },
            { path: 'articles', component: __WEBPACK_IMPORTED_MODULE_4__Components_backoffice_articles_articles_component__["a" /* ArticlesComponent */] },
            { path: 'university-campaign', component: __WEBPACK_IMPORTED_MODULE_5__Components_backoffice_university_campaign_university_campaign_component__["a" /* UniversityCampaignComponent */] },
            { path: 'statistics', component: __WEBPACK_IMPORTED_MODULE_6__Components_backoffice_statistics_statistics_component__["a" /* StatisticsComponent */] }
        ]
    }
];
var ADMIN_ROUTES = __WEBPACK_IMPORTED_MODULE_0__angular_router__["f" /* RouterModule */].forChild(routes);
//# sourceMappingURL=backoffice.routes.js.map

/***/ }),

/***/ "./src/app/Services/Articles/article-tags.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticleTagsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__("./node_modules/rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_bearer__ = __webpack_require__("./node_modules/ng2-bearer/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_bearer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_bearer__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ArticleTagsService = /** @class */ (function () {
    function ArticleTagsService(AuthHttp) {
        this.AuthHttp = AuthHttp;
    }
    // Get all tags
    ArticleTagsService.prototype.getTags = function () {
        var url = 'http://localhost:3000/api/article_tags';
        return this.AuthHttp.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    // Create new tag
    ArticleTagsService.prototype.createTag = function (body) {
        var url = 'http://localhost:3000/api/article_tags';
        return this.AuthHttp.post(url, body)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    // Update tag
    ArticleTagsService.prototype.updateTag = function (body, tags_id) {
        var url = 'http://localhost:3000/api/article_tags' + tags_id;
        return this.AuthHttp.put(url, body) // TODO: Only property 'name' in body or also tags_id ?
            .map(function (res) { console.log(res); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    // Remove tag
    ArticleTagsService.prototype.deleteTag = function (tags_id) {
        var url = 'http://localhost:3000/api/article_tags/' + tags_id;
        return this.AuthHttp.delete(url)
            .map(function (res) { console.log(res); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    ArticleTagsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_bearer__["AuthHttp"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng2_bearer__["AuthHttp"]) === "function" && _a || Object])
    ], ArticleTagsService);
    return ArticleTagsService;
    var _a;
}());

//# sourceMappingURL=article-tags.service.js.map

/***/ })

});
//# sourceMappingURL=backoffice.module.chunk.js.map