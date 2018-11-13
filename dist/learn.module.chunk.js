webpackJsonp(["learn.module"],{

/***/ "./src/app/Components/learn/article/article.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"w-article\">\n\t<div class=\"wa-story\">\n\t\t<div class=\"was-header flex\">\n\t\t\t<div class=\"wash-back flex\">\n\t\t\t\t<img class=\"mar-r-10\" src=\"/public/images/arrow-back-01.svg\" alt=\"arrow-left\" />\n\t\t\t\t<a [routerLink]=\"['/learn/articles']\"><h2 class=\"freigb\">Back to all stories</h2></a>\n\t\t\t</div>\n\t\t\t<div class=\"wash-social\">\n\t\t\t\t<i class=\"fa fa-twitter mar-r-10 cursor-pt\"></i>\n\t\t\t\t<i class=\"fa fa-facebook cursor-pt\" (click)=\"shareFacebook()\"></i>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"was-content\">\n\t\t\t<div class=\"learn-corp-article\" *ngIf=\"article\">\n\t\t\t\t<div class=\"learn-corp-articles cursor-pt\">\n\t\t\t\t\t<div class=\"learn-corp-article-head flex\">\n\t\t\t\t\t\t<div class=\"lcah-left flex\">\n\t\t\t\t\t\t\t<img class=\"mar-r-10 img-36-b-50\" [src]=\"article.profile_picture\" alt=\"profil-img\" />\n\t\t\t\t\t\t\t<div class=\"lcahl-name\">\n\t\t\t\t\t\t\t\t<h5 class=\"freigm\">{{ article.fullName }}</h5>\n\t\t\t\t\t\t\t\t<div class=\"lcahl-time\">\n\t\t\t\t\t\t\t\t\t<span class=\"freigb\" >{{ article.creation_date | amTimeAgo }}</span>\n\t\t\t\t\t\t\t\t\t<span class=\"freigb\" *ngIf=\"article.read_time < 1\">{{ article.read_time }} min read</span>\n\t\t\t\t\t\t\t\t\t<span class=\"freigb\" *ngIf=\"article.read_time > 1\">{{ article.read_time }} mins read</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class=\"lcah-right\">\n\t\t\t\t\t\t\t<div class=\"lcahr-tags\">\n\t\t\t\t\t\t\t\t<ul class=\"inline\" *ngIf=\"article.tags\">\n\t\t\t\t\t\t\t\t\t<li class=\"freigb\" *ngFor=\"let tag of transformTags(article.tags)\">#{{ tag }}</li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t<span class=\"freigb\" (click)=\"likeArticle()\"><i [ngStyle]=\"{'color' : article.hasLiked ? '#FF4D4D' : '#999' }\" class=\"fa fa-heart\" aria-hidden=\"true\"></i> {{ article.likes }}</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<a href=\"/\" class=\"freigb\" *ngIf=\"article.messages < 1\">{{ article.messages }} comment</a>\n\t\t\t\t\t\t\t<a href=\"/\" class=\"freigb\" *ngIf=\"article.messages > 1\">{{ article.messages }} comments</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<article class=\"learn-corp-article-body\">\n\t\t\t\t\t\t<h1 class=\"freigs mar-b-15 title\">{{ article.title }}</h1>\n\t\t\t\t\t\t<img class=\"mar-b-10\" [src]=\"article.picture\" atl=\"article-img\" />\n\t\t\t\t\t\t<div class=\"lcab-text mar-b-15 innerHtml\" [innerHtml]=\"article.text | sanitizeHtml\"></div>\n\t\t\t\t\t</article>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"was-comments\">\n\t\t\t<div class=\"wasc-header flex\">\n\t\t\t\t<h4 class=\"freigb\">Comments <span *ngIf=\"comments\">({{comments.length}})</span></h4>\n\t\t\t\t<div class=\"wash-back flex\">\n\t\t\t\t\t<img class=\"mar-r-10\" src=\"/public/images/arrow-back-01.svg\" alt=\"arrow-left\" />\n\t\t\t\t\t<a [routerLink]=\"['/learn/articles']\"><h2 class=\"freigb\">Back to all stories</h2></a>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"wasc-list\">\n\t\t\t\t<div class=\"wascl-element flex\" *ngFor=\"let comment of comments\">\n\t\t\t\t\t<img class=\"mar-r-15\" [src]=\"comment.picture\" alt=\"profile_picture\" />\n\t\t\t\t\t<div class=\"wascle-content\">\n\t\t\t\t\t\t<div class=\"info flex mar-b-5\">\n\t\t\t\t\t\t\t<a [routerLink]=\"['/', comment.username]\"> <h5 class=\"freigb mar-r-10\"><u>{{ comment.username }}</u></h5> </a>\n\t\t\t\t\t\t\t<span class=\"freigb\">{{ comment.creation_date | amTimeAgo }}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<p class=\"freigb innerHtml\" [innerHtml]=\"comment.message | sanitizeHtml\"></p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"wasc-textarea flex mar-b-15\" *ngIf=\"my_id\">\n\t\t\t\t<!-- <img class=\"mar-r-15\" src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1478860620/urhbeyiu9hmrdwixnhlr.jpg\" alt=\"profile_picture\" /> -->\n\t\t\t\t<textarea placeholder=\"Write a comment...\" [(ngModel)]=\"message\"></textarea>\n\t\t\t</div>\n\t\t\t<div class=\"wasc-button\" *ngIf=\"my_id\">\n\t\t\t\t<button class=\"freigm\" (click)=\"createArticleComment()\">Post comment</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class=\"wa-trending\">\n\n\t</div>\n</section>\n"

/***/ }),

/***/ "./src/app/Components/learn/article/article.component.scss":
/***/ (function(module, exports) {

module.exports = ".w-article {\n  width: 1000px;\n  padding: 35px 0;\n  margin: 0 auto; }\n  .w-article .wash-back h2 {\n    color: #222;\n    font-size: 26px; }\n  .w-article .wa-story {\n    width: 60%; }\n  .w-article .wa-story .was-header {\n      margin-bottom: 35px; }\n  .w-article .wa-story .was-header .wash-social {\n        margin-left: auto; }\n  .w-article .wa-story .was-header .wash-social .fa-facebook {\n          background-color: #3b5998;\n          padding: 8px 12px;\n          border-radius: 50%;\n          font-size: 16px; }\n  .w-article .wa-story .was-header .wash-social .fa-twitter {\n          background-color: #1dcaff;\n          padding: 8px 9px;\n          border-radius: 50%;\n          font-size: 16px; }\n  .w-article .wa-story .was-content h1, .w-article .wa-story .was-content h2, .w-article .wa-story .was-content h3, .w-article .wa-story .was-content h4, .w-article .wa-story .was-content h5, .w-article .wa-story .was-content h6, .w-article .wa-story .was-content span, .w-article .wa-story .was-content li, .w-article .wa-story .was-content a {\n      color: #222; }\n  .w-article .wa-story .was-content ul {\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap; }\n  .w-article .wa-story .was-content ul li {\n        display: inline-block;\n        color: #999999;\n        margin-right: 5px;\n        font-size: 14px; }\n  .w-article .wa-story .was-content .learn-corp-article {\n      display: initial;\n      width: 100%;\n      padding: 0; }\n  .w-article .wa-story .was-content .learn-corp-article .lcab-text {\n        height: auto;\n        overflow: auto; }\n  .w-article .wa-story .was-content .learn-corp-article .learn-corp-articles:hover .learn-corp-article-body h1 {\n        text-decoration: none; }\n  .w-article .wa-story .was-content .learn-corp-article .learn-corp-articles:hover .learn-corp-article-body .lcab-text h1 {\n        text-decoration: none; }\n  .w-article .wa-story .was-comments .wasc-header {\n      margin-bottom: 35px; }\n  .w-article .wa-story .was-comments .wasc-header h4, .w-article .wa-story .was-comments .wasc-header span {\n        font-size: 18px;\n        color: #999; }\n  .w-article .wa-story .was-comments .wasc-header .wash-back {\n        margin-left: auto; }\n  .w-article .wa-story .was-comments .wasc-list {\n      margin-bottom: 30px; }\n  .w-article .wa-story .was-comments .wasc-list h5, .w-article .wa-story .was-comments .wasc-list span {\n        color: #999; }\n  .w-article .wa-story .was-comments .wasc-list span {\n        font-size: 14px; }\n  .w-article .wa-story .was-comments .wasc-list p {\n        color: #222; }\n  .w-article .wa-story .was-comments .wasc-list .wascl-element {\n        margin-bottom: 25px;\n        -webkit-box-align: start;\n            -ms-flex-align: start;\n                align-items: flex-start; }\n  .w-article .wa-story .was-comments .wasc-list .wascl-element img {\n          width: 35px;\n          border-radius: 50%; }\n  .w-article .wa-story .was-comments .wasc-textarea {\n      -webkit-box-align: start;\n          -ms-flex-align: start;\n              align-items: flex-start; }\n  .w-article .wa-story .was-comments .wasc-textarea img {\n        width: 35px;\n        border-radius: 40px; }\n  .w-article .wa-story .was-comments .wasc-textarea textarea {\n        border-radius: 4px;\n        margin: 0; }\n  .w-article .wa-story .was-comments .wasc-button {\n      text-align: right; }\n  /******************** MOBILE ****************************/\n  @media only screen and (max-width: 736px) {\n  .w-article {\n    width: 100%;\n    padding: 15px 10px;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box; }\n    .w-article .wa-story {\n      width: 100%; } }\n"

/***/ }),

/***/ "./src/app/Components/learn/article/article.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_Articles_articles_service__ = __webpack_require__("./src/app/Services/Articles/articles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_Articles_article_like_service__ = __webpack_require__("./src/app/Services/Articles/article-like.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_facebook__ = __webpack_require__("./node_modules/ngx-facebook/dist/esm/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Services_Pictures_pictures_service__ = __webpack_require__("./src/app/Services/Pictures/pictures.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Services_meta_service__ = __webpack_require__("./src/app/Services/meta.service.ts");
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






var ArticleComponent = /** @class */ (function () {
    function ArticleComponent(ArticlesService, ArticleLikeService, Router, ActivatedRoute, TokenService, FB, PicturesService, Title, MetaService) {
        this.ArticlesService = ArticlesService;
        this.ArticleLikeService = ArticleLikeService;
        this.Router = Router;
        this.ActivatedRoute = ActivatedRoute;
        this.TokenService = TokenService;
        this.FB = FB;
        this.PicturesService = PicturesService;
        this.Title = Title;
        this.MetaService = MetaService;
        this.mobile = false;
    }
    ArticleComponent.prototype.ngOnInit = function () {
        this.initWindow();
        this.initSession();
        this.initParams();
    };
    ArticleComponent.prototype.initWindow = function () {
        window.scrollTo(0, 0);
        if ((window.screen.width) < 736)
            this.mobile = true;
    };
    /* INIT SESSION */
    ArticleComponent.prototype.initSession = function () {
        if (this.TokenService.getToken())
            this.my_id = this.TokenService.getToken().user.id;
    };
    /* INIT ARTICLES */
    ArticleComponent.prototype.initParams = function () {
        var _this = this;
        this.ActivatedRoute.params.subscribe(function (params) {
            if (params['id']) {
                _this.getArticles(params['id']);
            }
            else
                _this.Router.navigate(['/learn/articles']);
        });
    };
    ArticleComponent.prototype.setMetaData = function () {
        var url = 'https://www.wittycircle.com' + this.Router.url;
        this.Title.setTitle(this.article['title'] + " | Witty");
        this.MetaService.setMeta('description', 'Discover one great article everyday on Witty, the professional network for the entrepreneurial age.');
        this.MetaService.setMeta('og:title', "" + this.article['title']);
        this.MetaService.setMeta('og:description', 'Discover one great article everyday on Witty, the professional network for the entrepreneurial age.');
        this.MetaService.setMeta('og:url', url);
        this.MetaService.setMeta('og:image', this.article['picture']);
    };
    ArticleComponent.prototype.getArticles = function (param_id) {
        var _this = this;
        this.ArticlesService.getArticles().subscribe(function (res) {
            _this.selectArticlesBasedOnParams(param_id, res.articles);
        });
    };
    ArticleComponent.prototype.selectArticlesBasedOnParams = function (param_id, articles) {
        var length = articles.length;
        for (var i = 0; i < length; i++) {
            if (articles[i].id == param_id) {
                this.article = articles[i];
                this.setMetaData();
                this.getArticleComments(this.article.id);
                break;
            }
        }
    };
    ArticleComponent.prototype.getArticleComments = function (id) {
        var _this = this;
        this.ArticlesService.getArticleComments(id).subscribe(function (res) {
            _this.comments = res.comments;
        });
    };
    ArticleComponent.prototype.createArticleComment = function () {
        var _this = this;
        if (this.message) {
            this.ArticlesService.createArticleComments(this.article.id, { message: this.message }).subscribe(function (res) {
                if (res.success) {
                    _this.message = '';
                    _this.getArticleComments(_this.article.id);
                }
            });
        }
    };
    ArticleComponent.prototype.likeArticle = function () {
        var _this = this;
        this.ArticleLikeService.likeArticle(this.article.id, {}).subscribe(function (res) {
            if (!_this.article['hasLiked']) {
                _this.article['hasLiked'] = 1;
                _this.article['likes'] += 1;
            }
            else {
                _this.article['hasLiked'] = null;
                _this.article['likes'] -= 1;
            }
        });
    };
    ArticleComponent.prototype.shareFacebook = function () {
        var params = {
            method: 'feed',
            name: this.article.title,
            link: 'https://www.wittycircle.com/learn/articles' + this.article.id + '/' + this.transformTitle(this.article.title),
            picture: this.article.picture,
            caption: 'Wittycircle.com',
            description: ''
        };
        this.FB.ui(params)
            .then(function (res) { return console.log(res); })
            .catch(function (e) { return console.error(e); });
    };
    ArticleComponent.prototype.transformTags = function (tags) {
        return tags.split(',');
    };
    ArticleComponent.prototype.transformTitle = function (title) {
        return title.replace(/ /g, '-');
        ;
    };
    ArticleComponent.prototype.transformImage = function (url, width, height, crop) {
        return this.PicturesService.transformImage(url, width, height, crop);
    };
    ArticleComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-article',
            template: __webpack_require__("./src/app/Components/learn/article/article.component.html"),
            styles: [__webpack_require__("./src/app/Components/learn/article/article.component.scss"), __webpack_require__("./src/app/Components/learn/articles/articles.component.scss")],
            providers: [],
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__Services_Articles_articles_service__["a" /* ArticlesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_Articles_articles_service__["a" /* ArticlesService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__Services_Articles_article_like_service__["a" /* ArticleLikeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_Articles_article_like_service__["a" /* ArticleLikeService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["e" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__Services_Authentication_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_Authentication_token_service__["a" /* TokenService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6_ngx_facebook__["b" /* FacebookService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_ngx_facebook__["b" /* FacebookService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7__Services_Pictures_pictures_service__["a" /* PicturesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__Services_Pictures_pictures_service__["a" /* PicturesService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["Title"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["Title"]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_8__Services_meta_service__["a" /* MetaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__Services_meta_service__["a" /* MetaService */]) === "function" && _j || Object])
    ], ArticleComponent);
    return ArticleComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
}());

//# sourceMappingURL=article.component.js.map

/***/ }),

/***/ "./src/app/Components/learn/articles/articles.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"learn-corp\">\n\t<div class=\"learn-corp-fix flex\">\n\t\t<div class=\"learn-corp-fix-left flex-inline bb\">\n\t\t\t<h2 class=\"freigl\">All Stories</h2>\n\t\t\t<div class=\"lcfl-most flex-inline\">\n\t\t\t\t<h4 class=\"freigb pad-r-5\">most recent</h4>\n\t\t\t\t<img src=\"/public/images/arrow-down-icon-b.svg\">\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"learn-corp-fix-right bb\" *ngIf=\"!mobile\">\n\t\t\t<h2 class=\"freigl\">#trending</h2>\n\n\t\t\t<div class=\"learn-corp-similiar flex-inline mar-b-15 cursor-pt\">\n\t\t\t\t<img class=\"mar-r-10 img-36-b-50\" src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/w_36,h_36,c_fill/v1479200600/ko6qkavmspfh5dlkb2wi.jpg\" alt=\"profil-img\" />\n\t\t\t\t<div class=\"learn-corp-similiar-info\">\n\t\t\t\t\t<h5 class=\"freigs mar-b-5\">Expanding our community to more than 250 Colleges and </h5>\n\t\t\t\t\t<div class=\"lcsi-nl mar-b-5\">\n\t\t\t\t\t\t<span class=\"freigb mar-r-15\">Sarah Nichols</span>\n\t\t\t\t\t\t<span class=\"freigb\"><i class=\"fa fa-heart\" aria-hidden=\"true\"></i> 16</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<ul class=\"flex-inline\">\n\t\t\t\t\t\t<li class=\"freigb\">#news</li>\n\t\t\t\t\t\t<li class=\"freigb\">#witty</li>\n\t\t\t\t\t\t<li class=\"freigb\">#networks</li>\n\t\t\t\t\t\t<li class=\"freigb\">#colleges</li>\n\t\t\t\t\t\t<li class=\"freigb\">#incubators</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t</div>\n\t</div>\n\n\t<div class=\"learn-corp-article\">\n\t\t<div class=\"learn-corp-articles cursor-pt\" *ngFor=\"let article of articles; let i = index\">\n\t\t\t\t<div class=\"learn-corp-article-head flex\">\n\t\t\t\t\t<div class=\"lcah-left flex\">\n\t\t\t\t\t\t<img class=\"mar-r-10 img-36-b-50\" [src]=\"transformImage(article.profile_picture, 36, 36, 'fill')\" alt=\"profil-img\" />\n\t\t\t\t\t\t<div class=\"lcahl-name\">\n\t\t\t\t\t\t\t<h5 class=\"freigm\">{{ article.fullName }}</h5>\n\t\t\t\t\t\t\t<div class=\"lcahl-time\">\n\t\t\t\t\t\t\t\t<span class=\"freigb\" >{{ article.creation_date | amTimeAgo }}</span>\n\t\t\t\t\t\t\t\t<span class=\"freigb\" *ngIf=\"article.read_time < 1\">{{ article.read_time }} min read</span>\n\t\t\t\t\t\t\t\t<span class=\"freigb\" *ngIf=\"article.read_time > 1\">{{ article.read_time }} mins read</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"lcah-right\">\n\t\t\t\t\t\t<div class=\"lcahr-tags\">\n\t\t\t\t\t\t\t<ul class=\"inline\" *ngIf=\"article.tags\">\n\t\t\t\t\t\t\t\t<li class=\"freigb\" *ngFor=\"let tag of article.tags\">#{{ tag }}</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t<span class=\"freigb\" (click)=\"likeArticle(i)\"><i [ngStyle]=\"{'color' : article.hasLiked ? '#FF4D4D' : '#999' }\" class=\"fa fa-heart\" aria-hidden=\"true\"></i> {{ article.likes }}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<a href=\"/\" class=\"freigb\" *ngIf=\"article.messages < 1\">{{ article.messages }} comment</a>\n\t\t\t\t\t\t<a href=\"/\" class=\"freigb\" *ngIf=\"article.messages > 1\">{{ article.messages }} comments</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<a [routerLink]=\"['/learn/articles', article.id, transformTitle(article.title)]\">\n\t\t\t\t\t<article class=\"learn-corp-article-body\">\n\t\t\t\t\t\t<h1 class=\"freigs mar-b-15 title\">{{ article.title }}</h1>\n\t\t\t\t\t\t<img class=\"mar-b-10\" [src]=\"transformImage(article.picture, 600, 400, 'fill')\" atl=\"article-img\" />\n\t\t\t\t\t\t<div class=\"article-about\">\n\t\t\t\t\t\t\t<div class=\"filter-text\"></div>\n\t\t\t\t\t\t\t<div class=\"lcab-text mar-b-15\" [innerHtml]=\"article.text | sanitizeHtml\"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<a [routerLink]=\"['/learn/articles', article.id, transformTitle(article.title)]\" class=\"freigm\">Read more...</a>\n\t\t\t\t\t</article>\n\t\t\t\t</a>\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ "./src/app/Components/learn/articles/articles.component.scss":
/***/ (function(module, exports) {

module.exports = "/****** LEARN *******/\n#learn-body-page {\n  height: auto;\n  width: 100%; }\n#learn-body-page .whc-videobg {\n    height: 250px;\n    /*\t\tbackground-image: url('/public/images/backgrounds/background-learn.jpg');\n*/ }\n#learn-body-page .whc-videobg video {\n      position: relative;\n      top: -100px;\n      background-image: url(\"/public/images/backgrounds/background-learn.jpg\"); }\n#learn-body-page .learn-header-title-video {\n    position: absolute;\n    left: 0;\n    right: 0;\n    width: 500px;\n    text-align: center;\n    margin: 0 auto;\n    top: 80px;\n    z-index: 100000000; }\n#learn-body-page .learn-header-title-video h1 {\n      font-family: 'FreigSem';\n      color: white;\n      font-size: 42px; }\n#learn-body-page .learn-header-title-video h3 {\n      font-family: 'FreigMed';\n      color: white;\n      font-size: 21px;\n      line-height: 28px; }\n#learn-body-page .learn-corp {\n    width: 1000px;\n    padding: 35px 0;\n    margin: 0 auto; }\n#learn-body-page .learn-corp h1, #learn-body-page .learn-corp h2, #learn-body-page .learn-corp h3, #learn-body-page .learn-corp h4, #learn-body-page .learn-corp h5, #learn-body-page .learn-corp h6, #learn-body-page .learn-corp span, #learn-body-page .learn-corp li, #learn-body-page .learn-corp a {\n      color: #222; }\n#learn-body-page .learn-corp ul {\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap; }\n#learn-body-page .learn-corp ul li {\n        display: inline-block;\n        color: #999999;\n        margin-right: 5px;\n        font-size: 14px; }\n#learn-body-page .learn-corp .learn-corp-fix {\n      width: 1000px;\n      position: absolute;\n      z-index: -1; }\n#learn-body-page .learn-corp .learn-corp-fix h2 {\n        font-size: 26px; }\n#learn-body-page .learn-corp .learn-corp-fix .learn-corp-fix-left {\n        width: 60%;\n        padding: 10px 0px;\n        -ms-flex-item-align: baseline;\n            align-self: baseline;\n        background-color: white; }\n#learn-body-page .learn-corp .learn-corp-fix .learn-corp-fix-left h2 {\n          -webkit-box-flex: 1;\n              -ms-flex-positive: 1;\n                  flex-grow: 1; }\n#learn-body-page .learn-corp .learn-corp-fix .learn-corp-fix-left .lcfl-most h4 {\n          font-size: 18px; }\n#learn-body-page .learn-corp .learn-corp-fix .learn-corp-fix-right {\n        width: 40%;\n        padding: 10px 0 10px 70px;\n        background-color: white; }\n#learn-body-page .learn-corp .learn-corp-fix .learn-corp-fix-right h2 {\n          margin-bottom: 45px; }\n#learn-body-page .learn-corp .learn-corp-fix .learn-corp-fix-right .learn-corp-similiar img {\n          -ms-flex-item-align: baseline;\n              align-self: baseline; }\n#learn-body-page .learn-corp .learn-corp-fix .learn-corp-fix-right .learn-corp-similiar:hover h5 {\n          text-decoration: underline; }\n#learn-body-page .learn-corp .learn-corp-fix .learn-corp-fix-right .learn-corp-similiar-info {\n          width: 210px; }\n#learn-body-page .learn-corp .learn-corp-fix .learn-corp-fix-right .learn-corp-similiar-info h5, #learn-body-page .learn-corp .learn-corp-fix .learn-corp-fix-right .learn-corp-similiar-info span {\n            font-size: 14px; }\n#learn-body-page .learn-corp .learn-corp-fix .learn-corp-fix-right .learn-corp-similiar-info .lcsi-nl .fa-heart {\n            color: #999; }\n.learn-corp-article {\n  display: inline-block;\n  width: 60%;\n  padding: 90px 0px 25px 0px; }\n.learn-corp-article .learn-corp-articles {\n    margin-bottom: 35px;\n    /*.learn-corp-article-body:hover {\n\t\t\th1 {\n\t\t\t\ttext-decoration: underline;\n\t\t\t}\n\n\t\t\t.lcab-text {\n\t\t\t\th1 {\n\t\t\t\t\ttext-decoration: none;\n\t\t\t\t}\n\t\t\t}\n\t\t}*/ }\n.learn-corp-article .learn-corp-articles .learn-corp-article-head {\n      margin-bottom: 25px; }\n.learn-corp-article .learn-corp-articles .learn-corp-article-head .lcah-left .lcahl-time span {\n        font-size: 14px; }\n.learn-corp-article .learn-corp-articles .learn-corp-article-head .lcah-right {\n        -ms-flex-item-align: baseline;\n            align-self: baseline;\n        -webkit-box-flex: 1;\n            -ms-flex-positive: 1;\n                flex-grow: 1;\n        text-align: right; }\n.learn-corp-article .learn-corp-articles .learn-corp-article-head .lcah-right .fa-heart {\n          color: #999; }\n.learn-corp-article .learn-corp-articles .learn-corp-article-head .lcah-right a {\n          font-size: 14px; }\n.learn-corp-article .learn-corp-articles .learn-corp-article-head .lcah-right ul {\n          vertical-align: top; }\n.learn-corp-article .learn-corp-articles .learn-corp-article-body .title {\n      font-size: 28px;\n      line-height: 29px; }\n.learn-corp-article .learn-corp-articles .learn-corp-article-body img {\n      width: 600px;\n      height: auto; }\n.learn-corp-article .learn-corp-articles .learn-corp-article-body a {\n      color: gray; }\n.learn-corp-article .learn-corp-articles .learn-corp-article-body a:hover {\n      color: black; }\n.learn-corp-article .learn-corp-articles .learn-corp-article-body .lcab-text {\n      height: 195px;\n      overflow-y: hidden; }\n.learn-corp-article .learn-corp-articles .learn-corp-article-body .lcab-text h1, .learn-corp-article .learn-corp-articles .learn-corp-article-body .lcab-text h2, .learn-corp-article .learn-corp-articles .learn-corp-article-body .lcab-text h3, .learn-corp-article .learn-corp-articles .learn-corp-article-body .lcab-text h4, .learn-corp-article .learn-corp-articles .learn-corp-article-body .lcab-text h5, .learn-corp-article .learn-corp-articles .learn-corp-article-body .lcab-text h6, .learn-corp-article .learn-corp-articles .learn-corp-article-body .lcab-text em, .learn-corp-article .learn-corp-articles .learn-corp-article-body .lcab-text span, .learn-corp-article .learn-corp-articles .learn-corp-article-body .lcab-text p, .learn-corp-article .learn-corp-articles .learn-corp-article-body .lcab-text blockquote {\n        color: #222;\n        line-height: 1.5; }\n.learn-corp-article .learn-corp-articles .learn-corp-article-body .lcab-text span {\n        line-height: 1.5; }\n/******************** MOBILE ****************************/\n@media only screen and (max-width: 736px) {\n  .learn-corp {\n    width: 100vw !important;\n    padding: 15px 10px !important;\n    -webkit-box-sizing: border-box !important;\n            box-sizing: border-box !important; }\n    .learn-corp .learn-corp-fix {\n      position: initial !important;\n      width: initial !important; }\n      .learn-corp .learn-corp-fix .learn-corp-fix-left {\n        width: 100% !important; }\n        .learn-corp .learn-corp-fix .learn-corp-fix-left h2, .learn-corp .learn-corp-fix .learn-corp-fix-left .lcfl-most {\n          white-space: nowrap; }\n        .learn-corp .learn-corp-fix .learn-corp-fix-left .lcfl-most {\n          margin-left: auto; }\n  .learn-corp-article {\n    width: 100% !important;\n    padding: 20px 0 !important; }\n    .learn-corp-article .learn-corp-articles .learn-corp-article-body img {\n      width: 100% !important; } }\n"

/***/ }),

/***/ "./src/app/Components/learn/articles/articles.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticlesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_Articles_articles_service__ = __webpack_require__("./src/app/Services/Articles/articles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_Articles_article_like_service__ = __webpack_require__("./src/app/Services/Articles/article-like.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_Pictures_pictures_service__ = __webpack_require__("./src/app/Services/Pictures/pictures.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_Trackings_tracking_service__ = __webpack_require__("./src/app/Services/Trackings/tracking.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
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





var ArticlesComponent = /** @class */ (function () {
    function ArticlesComponent(ArticlesService, ArticleLikeService, PicturesService, TrackingService, TokenService) {
        this.ArticlesService = ArticlesService;
        this.ArticleLikeService = ArticleLikeService;
        this.PicturesService = PicturesService;
        this.TrackingService = TrackingService;
        this.TokenService = TokenService;
        this.mobile = false;
    }
    ArticlesComponent.prototype.ngOnInit = function () {
        this.initWindow();
        this.getArticles();
    };
    ArticlesComponent.prototype.trackViewPage = function () {
        var token = this.TokenService.getToken();
        this.TrackingService.viewActivities({}, token, 8).subscribe(function (r) { });
    };
    ArticlesComponent.prototype.initWindow = function () {
        window.scrollTo(0, 0);
        if ((window.screen.width) < 736)
            this.mobile = true;
    };
    ArticlesComponent.prototype.getArticles = function () {
        var _this = this;
        this.ArticlesService.getArticles().subscribe(function (res) {
            _this.articles = _this.transformTags(res.articles);
        });
    };
    ArticlesComponent.prototype.likeArticle = function (index) {
        var _this = this;
        this.ArticleLikeService.likeArticle(this.articles[index].id, {}).subscribe(function (res) {
            if (!_this.articles[index]['hasLiked']) {
                _this.articles[index]['hasLiked'] = 1;
                _this.articles[index]['likes'] += 1;
            }
            else {
                _this.articles[index]['hasLiked'] = null;
                _this.articles[index]['likes'] -= 1;
            }
        });
    };
    ArticlesComponent.prototype.transformTags = function (articles) {
        for (var i = 0; i < articles.length; i++) {
            if (typeof articles[i]['tags'] === 'string')
                articles[i].tags = articles[i].tags.split(',');
        }
        return articles;
    };
    ArticlesComponent.prototype.transformTitle = function (title) {
        return title.replace(/ /g, '-');
        ;
    };
    ArticlesComponent.prototype.transformImage = function (url, width, height, crop) {
        return this.PicturesService.transformImage(url, width, height, crop);
    };
    ArticlesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-articles',
            template: __webpack_require__("./src/app/Components/learn/articles/articles.component.html"),
            styles: [__webpack_require__("./src/app/Components/learn/articles/articles.component.scss")],
            providers: []
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_Articles_articles_service__["a" /* ArticlesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_Articles_articles_service__["a" /* ArticlesService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__Services_Articles_article_like_service__["a" /* ArticleLikeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_Articles_article_like_service__["a" /* ArticleLikeService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__Services_Pictures_pictures_service__["a" /* PicturesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_Pictures_pictures_service__["a" /* PicturesService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__Services_Trackings_tracking_service__["a" /* TrackingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_Trackings_tracking_service__["a" /* TrackingService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__Services_Authentication_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_Authentication_token_service__["a" /* TokenService */]) === "function" && _e || Object])
    ], ArticlesComponent);
    return ArticlesComponent;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=articles.component.js.map

/***/ }),

/***/ "./src/app/Components/learn/learn.component.html":
/***/ (function(module, exports) {

module.exports = "<section id=\"learn-body-page\" class=\"animate fadeIn\" >\n\n\t<div class=\"learn-header-title-video\" style=\"z-index: 100\" *ngIf=\"!mobile\">\n\t\t<h1>Learn</h1>\n\t\t<h3>Ressources, stories, interviews & curated content from our community</h3>\n\t</div>\n\t<div class=\"whc-videobg\" *ngIf=\"!mobile\">\n\t\t<video poster=\"/public/images/backgrounds/background-learn.jpg\" loop muted autoplay>\n\t\t\t<source src=\"/public/videos/Learn.mp4\" type=\"video/mp4\" />\n\t\t</video>\n\t</div>\n\n\t<div class=\"learn-body-mobile\" *ngIf=\"mobile\">\n\t\t<div class=\"filter\"></div>\n\t\t<div class=\"learn-body-mobile-title align-center\">\n\t\t\t<h1 class=\"freigs\">Learn</h1>\n\t\t\t<h3 class=\"freigb\">Ressources, stories, interviews & curated content from our community</h3>\n\t\t</div>\n\t</div>\n\n\t<router-outlet></router-outlet>\n\t<app-footer></app-footer>\n</section>\n"

/***/ }),

/***/ "./src/app/Components/learn/learn.component.scss":
/***/ (function(module, exports) {

module.exports = "/****** LEARN *******/\n#learn-body-page {\n  height: auto;\n  width: 100%; }\n#learn-body-page .whc-videobg {\n    height: 250px;\n    /*\t\tbackground-image: url('/public/images/backgrounds/background-learn.jpg');\n*/ }\n#learn-body-page .whc-videobg video {\n      position: relative;\n      top: -100px;\n      background-image: url(\"/public/images/backgrounds/background-learn.jpg\"); }\n#learn-body-page .learn-header-title-video {\n    position: absolute;\n    left: 0;\n    right: 0;\n    width: 500px;\n    text-align: center;\n    margin: 0 auto;\n    top: 80px;\n    z-index: 100000000; }\n#learn-body-page .learn-header-title-video h1 {\n      font-family: 'FreigSem';\n      color: white;\n      font-size: 42px; }\n#learn-body-page .learn-header-title-video h3 {\n      font-family: 'FreigMed';\n      color: white;\n      font-size: 21px;\n      line-height: 28px; }\n#learn-body-page .learn-corp {\n    width: 1000px;\n    padding: 35px 0;\n    margin: 0 auto; }\n#learn-body-page .learn-corp h1, #learn-body-page .learn-corp h2, #learn-body-page .learn-corp h3, #learn-body-page .learn-corp h4, #learn-body-page .learn-corp h5, #learn-body-page .learn-corp h6, #learn-body-page .learn-corp span, #learn-body-page .learn-corp li, #learn-body-page .learn-corp a {\n      color: #222; }\n#learn-body-page .learn-corp ul {\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap; }\n#learn-body-page .learn-corp ul li {\n        display: inline-block;\n        color: #999999;\n        margin-right: 5px;\n        font-size: 14px; }\n#learn-body-page .learn-corp .learn-corp-fix {\n      width: 1000px;\n      position: absolute;\n      z-index: -1; }\n#learn-body-page .learn-corp .learn-corp-fix h2 {\n        font-size: 26px; }\n#learn-body-page .learn-corp .learn-corp-fix .learn-corp-fix-left {\n        width: 60%;\n        padding: 10px 0px;\n        -ms-flex-item-align: baseline;\n            align-self: baseline;\n        background-color: white; }\n#learn-body-page .learn-corp .learn-corp-fix .learn-corp-fix-left h2 {\n          -webkit-box-flex: 1;\n              -ms-flex-positive: 1;\n                  flex-grow: 1; }\n#learn-body-page .learn-corp .learn-corp-fix .learn-corp-fix-left .lcfl-most h4 {\n          font-size: 18px; }\n#learn-body-page .learn-corp .learn-corp-fix .learn-corp-fix-right {\n        width: 40%;\n        padding: 10px 0 10px 70px;\n        background-color: white; }\n#learn-body-page .learn-corp .learn-corp-fix .learn-corp-fix-right h2 {\n          margin-bottom: 45px; }\n#learn-body-page .learn-corp .learn-corp-fix .learn-corp-fix-right .learn-corp-similiar img {\n          -ms-flex-item-align: baseline;\n              align-self: baseline; }\n#learn-body-page .learn-corp .learn-corp-fix .learn-corp-fix-right .learn-corp-similiar:hover h5 {\n          text-decoration: underline; }\n#learn-body-page .learn-corp .learn-corp-fix .learn-corp-fix-right .learn-corp-similiar-info {\n          width: 210px; }\n#learn-body-page .learn-corp .learn-corp-fix .learn-corp-fix-right .learn-corp-similiar-info h5, #learn-body-page .learn-corp .learn-corp-fix .learn-corp-fix-right .learn-corp-similiar-info span {\n            font-size: 14px; }\n#learn-body-page .learn-corp .learn-corp-article {\n      display: inline-block;\n      width: 60%;\n      padding: 90px 0px 25px 0px;\n      /*.learn-corp-articles:hover {\n\t\t\t\t.learn-corp-article-body {\n\t\t\t\t\th1 {\n\t\t\t\t\t\ttext-decoration: underline;\n\t\t\t\t\t}\n\n\t\t\t\t\t.lcab-text {\n\t\t\t\t\t\th1 {\n\t\t\t\t\t\t\ttext-decoration: none;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}*/ }\n#learn-body-page .learn-corp .learn-corp-article .learn-corp-articles {\n        margin-bottom: 35px; }\n#learn-body-page .learn-corp .learn-corp-article .learn-corp-articles .learn-corp-article-head {\n          margin-bottom: 25px; }\n#learn-body-page .learn-corp .learn-corp-article .learn-corp-articles .learn-corp-article-head .lcah-left .lcahl-time span {\n            font-size: 14px; }\n#learn-body-page .learn-corp .learn-corp-article .learn-corp-articles .learn-corp-article-head .lcah-right {\n            -ms-flex-item-align: baseline;\n                align-self: baseline;\n            -webkit-box-flex: 1;\n                -ms-flex-positive: 1;\n                    flex-grow: 1;\n            text-align: right; }\n#learn-body-page .learn-corp .learn-corp-article .learn-corp-articles .learn-corp-article-head .lcah-right a {\n              font-size: 14px; }\n#learn-body-page .learn-corp .learn-corp-article .learn-corp-articles .learn-corp-article-head .lcah-right ul {\n              vertical-align: top; }\n#learn-body-page .learn-corp .learn-corp-article .learn-corp-articles .learn-corp-article-body .title {\n          font-size: 27px;\n          line-height: 29px; }\n#learn-body-page .learn-corp .learn-corp-article .learn-corp-articles .learn-corp-article-body a {\n          color: gray; }\n#learn-body-page .learn-corp .learn-corp-article .learn-corp-articles .learn-corp-article-body a:hover {\n          color: black; }\n#learn-body-page .learn-corp .learn-corp-article .learn-corp-articles .learn-corp-article-body .article-about .filter-text {\n          position: absolute;\n          width: 100%;\n          height: 195px;\n          /* For Safari 5.1 to 6.0 */\n          /* For Opera 11.1 to 12.0 */\n          /* For Firefox 3.6 to 15 */\n          background: -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 0)), to(white));\n          background: linear-gradient(rgba(255, 255, 255, 0), white);\n          /* Standard syntax (must be last) */ }\n#learn-body-page .learn-corp .learn-corp-article .learn-corp-articles .learn-corp-article-body .lcab-text {\n          height: 195px;\n          overflow-y: hidden; }\n#learn-body-page .learn-corp .learn-corp-article .learn-corp-articles .learn-corp-article-body .lcab-text h1, #learn-body-page .learn-corp .learn-corp-article .learn-corp-articles .learn-corp-article-body .lcab-text h2, #learn-body-page .learn-corp .learn-corp-article .learn-corp-articles .learn-corp-article-body .lcab-text h3, #learn-body-page .learn-corp .learn-corp-article .learn-corp-articles .learn-corp-article-body .lcab-text h4, #learn-body-page .learn-corp .learn-corp-article .learn-corp-articles .learn-corp-article-body .lcab-text h5, #learn-body-page .learn-corp .learn-corp-article .learn-corp-articles .learn-corp-article-body .lcab-text h6, #learn-body-page .learn-corp .learn-corp-article .learn-corp-articles .learn-corp-article-body .lcab-text em, #learn-body-page .learn-corp .learn-corp-article .learn-corp-articles .learn-corp-article-body .lcab-text span, #learn-body-page .learn-corp .learn-corp-article .learn-corp-articles .learn-corp-article-body .lcab-text p, #learn-body-page .learn-corp .learn-corp-article .learn-corp-articles .learn-corp-article-body .lcab-text blockquote {\n            color: #222; }\n#learn-body-page .learn-corp .learn-corp-article .learn-corp-articles .learn-corp-article-body .lcab-text p, #learn-body-page .learn-corp .learn-corp-article .learn-corp-articles .learn-corp-article-body .lcab-text blockquote {\n            font-family: 'FreigBook'; }\n#learn-body-page .learn-corp .learn-corp-article .learn-corp-articles .learn-corp-article-body:hover h1 {\n          text-decoration: underline; }\n#learn-body-page .learn-corp .learn-corp-article .learn-corp-articles .learn-corp-article-body:hover .lcab-text h1 {\n          text-decoration: none; }\n/******************** MOBILE ****************************/\n@media only screen and (max-width: 736px) {\n  .learn-body-mobile {\n    position: relative;\n    background-image: url(\"/public/images/bg_mobile/bg_home_mobile.jpg\");\n    overflow-y: hidden;\n    height: 250px; }\n    .learn-body-mobile .filter {\n      height: 600px;\n      background: rgba(0, 0, 0, 0.7); }\n    .learn-body-mobile .learn-body-mobile-title {\n      position: absolute;\n      text-align: center;\n      padding: 0 10px;\n      margin-top: 25px; }\n      .learn-body-mobile .learn-body-mobile-title h1 {\n        font-size: 26px; }\n      .learn-body-mobile .learn-body-mobile-title h3 {\n        font-size: 18px; } }\n"

/***/ }),

/***/ "./src/app/Components/learn/learn.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LearnComponent; });
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

var LearnComponent = /** @class */ (function () {
    function LearnComponent() {
        this.show = false;
        this.mobile = false;
    }
    LearnComponent.prototype.ngOnInit = function () {
        this.initWindow();
    };
    LearnComponent.prototype.initWindow = function () {
        window.scrollTo(0, 0);
        if ((window.screen.width) < 736)
            this.mobile = true;
    };
    LearnComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-learn',
            template: __webpack_require__("./src/app/Components/learn/learn.component.html"),
            styles: [__webpack_require__("./src/app/Components/learn/learn.component.scss")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
            providers: []
        }),
        __metadata("design:paramtypes", [])
    ], LearnComponent);
    return LearnComponent;
}());

//# sourceMappingURL=learn.component.js.map

/***/ }),

/***/ "./src/app/Components/learn/learn.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LearnModule", function() { return LearnModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__ = __webpack_require__("./src/app/Pipes/pipe.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__footer_footer_module__ = __webpack_require__("./src/app/Components/footer/footer.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__learn_component__ = __webpack_require__("./src/app/Components/learn/learn.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__article_article_component__ = __webpack_require__("./src/app/Components/learn/article/article.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__articles_articles_component__ = __webpack_require__("./src/app/Components/learn/articles/articles.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Services_Articles_articles_service__ = __webpack_require__("./src/app/Services/Articles/articles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Services_Articles_article_like_service__ = __webpack_require__("./src/app/Services/Articles/article-like.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Services_Pictures_pictures_service__ = __webpack_require__("./src/app/Services/Pictures/pictures.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angular2_moment__ = __webpack_require__("./node_modules/angular2-moment/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Routes_learn_routes__ = __webpack_require__("./src/app/Routes/learn.routes.ts");
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

var LearnModule = /** @class */ (function () {
    function LearnModule() {
    }
    LearnModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_13__Routes_learn_routes__["a" /* LEARN_ROUTES */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["f" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__["a" /* PipeModule */],
                __WEBPACK_IMPORTED_MODULE_5__footer_footer_module__["a" /* FooterModule */],
                __WEBPACK_IMPORTED_MODULE_12_angular2_moment__["MomentModule"]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__learn_component__["a" /* LearnComponent */],
                __WEBPACK_IMPORTED_MODULE_7__article_article_component__["a" /* ArticleComponent */],
                __WEBPACK_IMPORTED_MODULE_8__articles_articles_component__["a" /* ArticlesComponent */]
            ],
            exports: [],
            providers: [__WEBPACK_IMPORTED_MODULE_9__Services_Articles_articles_service__["a" /* ArticlesService */], __WEBPACK_IMPORTED_MODULE_10__Services_Articles_article_like_service__["a" /* ArticleLikeService */], __WEBPACK_IMPORTED_MODULE_11__Services_Pictures_pictures_service__["a" /* PicturesService */]]
        })
    ], LearnModule);
    return LearnModule;
}());

//# sourceMappingURL=learn.module.js.map

/***/ }),

/***/ "./src/app/Routes/learn.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LEARN_ROUTES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Components_learn_learn_component__ = __webpack_require__("./src/app/Components/learn/learn.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Components_learn_article_article_component__ = __webpack_require__("./src/app/Components/learn/article/article.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Components_learn_articles_articles_component__ = __webpack_require__("./src/app/Components/learn/articles/articles.component.ts");

/* Components */



/* Librairies */
var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__Components_learn_learn_component__["a" /* LearnComponent */],
        children: [
            { path: '', redirectTo: 'articles', pathMatch: 'full' },
            { path: 'articles', component: __WEBPACK_IMPORTED_MODULE_3__Components_learn_articles_articles_component__["a" /* ArticlesComponent */] },
            { path: 'articles/:id/:title', component: __WEBPACK_IMPORTED_MODULE_2__Components_learn_article_article_component__["a" /* ArticleComponent */] },
        ]
    },
];
var LEARN_ROUTES = __WEBPACK_IMPORTED_MODULE_0__angular_router__["f" /* RouterModule */].forChild(routes);
//# sourceMappingURL=learn.routes.js.map

/***/ }),

/***/ "./src/app/Services/Articles/article-like.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticleLikeService; });
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



var ArticleLikeService = /** @class */ (function () {
    function ArticleLikeService(AuthHttp) {
        this.AuthHttp = AuthHttp;
    }
    // Get all article's likes
    ArticleLikeService.prototype.getLikes = function (article_id) {
        var url = 'http://localhost:3000/api/articles/' + article_id + '/up';
        return this.AuthHttp.get(url)
            .map(function (res) { console.log(res); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    // Like an article
    ArticleLikeService.prototype.likeArticle = function (article_id, body) {
        var url = 'http://localhost:3000/api/articles/' + article_id + '/up';
        return this.AuthHttp.post(url, body)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    // Unlike an article
    ArticleLikeService.prototype.unlikeArticle = function (article_id) {
        var url = 'http://localhost:3000/api/articles/' + article_id + '/up';
        return this.AuthHttp.delete(url)
            .map(function (res) { console.log(res); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    ArticleLikeService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_bearer__["AuthHttp"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng2_bearer__["AuthHttp"]) === "function" && _a || Object])
    ], ArticleLikeService);
    return ArticleLikeService;
    var _a;
}());

//# sourceMappingURL=article-like.service.js.map

/***/ })

});
//# sourceMappingURL=learn.module.chunk.js.map