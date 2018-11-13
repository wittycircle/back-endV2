webpackJsonp(["projects.module"],{

/***/ "./src/app/Components/projects/project-discussions/project-discussions.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"wpj-discussion\" projectDiscussionDiv>\n\t<div class=\"wpjd-header\">\n\t\t<div class=\"flex mar-b-15\">\n\t\t\t<h1 class=\"freigLight\">Discussion</h1>\n\t\t\t<!-- <div id=\"wpjdh-1\" class=\"wpjdh-add flex\">\n\t\t\t\t<div class=\"plus-minus\"></div>\n\t\t\t\t<span class=\"freigSem\"> Add a comment</span>\n\t\t\t</div> -->\n\t\t</div>\n\n<!-- \t\t<div id=\"wpjdh-2\" class=\"wpjdh-ask slideDefault transition-200\">\n\t\t\t<label class=\"freigBook mar-b-10\">Comments</label>\n\t\t<textarea [(ngModel)]=\"discussionMessage\" placeholder=\"Feedback always help...\"></textarea>\n\t\t\t<div class=\"pfa-button\">\n\t\t\t\t<button (click)=\"addDiscussion()\">Publish</button>\n\t\t\t</div>\n\t\t</div> -->\n\t</div>\n\n\t<div class=\"project_feedback_body\">\n\t\t<div class=\"wpjd-comment\">\n\t\t\t<div class=\"wpjd-textarea flex\">\n\t\t\t\t<div class=\"image-distort\" *ngIf=\"logged\">\n\t\t\t\t\t<img class=\"mar-r-10\" [src]=\"transformImage(profile.picture, 36, 36, 'fill')\" alt=\"profile_picture\" />\n\t\t\t\t</div>\n\t\t\t\t<textarea [(ngModel)]=\"discussionMessage\" rows=\"1\" placeholder=\"Post your feedback, thoughts and recommandations...\"></textarea>\n\t\t\t</div>\n\t\t\t<button *ngIf=\"discussionMessage\" (click)=\"addDiscussion()\">Comment</button>\n\t\t</div>\n\n\t\t<div class=\"project_feedback_comments\">\n\t\t\t<p class=\"freigMed no-comment\" *ngIf=\"!discussions[0]\">Feedback is the key. Be the first to comment 👋🏼</p>\n\n\t\t\t<div class=\"project_feedback_main\" *ngIf=\"discussions[0]\">\n\t\t\t\t<div attr.id=\"d{{ discussion.id }}\" *ngFor=\"let discussion of discussions; let d_i = index\" class=\"pfm_title\">\n\n\t\t\t\t\t<div class=\"pfmt_list inline\">\n\t\t\t\t\t\t<div class=\"pfmt_img inline\">\n\t\t\t\t\t\t\t<img [src]=\"discussion.picture\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pfmt_info inline\">\n<!-- \t\t\t\t\t\t\t<h4 class=\"freigSem\">{{ discussion.title }}</h4>\n -->\t\t\t\t\t\t\t<a routerLink=\"/{{discussion.username}}\" class=\"p-info freigb inline cursor-pt\">{{ discussion.fullName }}</a><span>{{ discussion.creation_date | amTimeAgo }}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pfmt_setting inline\" *ngIf=\"logged && (my_id === discussion.user_id)\">\n\t\t\t\t\t\t\t<span [attr.id]=\"'pfmt-' + d_i\" class=\"cursor-pt\" (click)=\"loadComment(discussion.replies[0].message)\"><img [attr.id]=\"'pfmti-' + d_i\" src=\"/public/images/picto-edit-b.svg\"></span>\n\t\t\t\t\t\t\t<span class=\"cursor-pt\" (click)=\"removeDiscussion(discussion.id, d_i)\"><i class=\"fa fa-trash\"></i></span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pfm-comments\">\n\t\t\t\t\t\t\t<div class=\"pfm-comment\">\n\t\t\t\t\t\t\t\t<p class=\"p-text freigBook innerHtml transition-200\" [innerHtml]=\"discussion.replies[0].message\"></p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div [attr.id]=\"'pfmtbox-' + d_i\" class=\"pfm-modify project_feedback_ask mar-t-10 slideDefault transition-200\">\n\t\t\t\t\t\t\t\t<textarea [(ngModel)]=\"replyMessage\"></textarea>\n\t\t\t\t\t\t\t\t<div class=\"pfa-button\">\n\t\t\t\t\t\t\t\t\t<button (click)=\"updateReply(discussion.replies[0].id)\">Update comment</button>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"pfm-action mar-t-10\">\n\t\t\t\t\t\t\t\t<span *ngIf=\"discussion.replies[0].likes\" (click)=\"likeReply(discussion.replies[0].id, discussion.replies[0].liked, 0, 0)\" style=\"font-family: Arial; font-size: 12px\"><img class=\"pfm-vote-image\" src=\"/public/images/arrow-up-icon-g.svg\" alt=\"up\"> {{ discussion.replies[0].likes.length }}</span>\n\n\t\t\t\t\t\t\t\t<span [attr.id]=\"'pfmc-' + d_i\"><i [attr.id]=\"'pfmci-' + d_i\" class=\"fa fa-reply\" aria-hidden=\"true\"></i> Reply</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div [attr.id]=\"'pfmcbox-' + d_i\" class=\"pfm-reply-ask slideDefault transition-200\">\n\t\t\t\t\t\t\t\t<textarea [(ngModel)]=\"replyMessage\" placeholder=\"Add some comments\"></textarea>\n\t\t\t\t\t\t\t\t<div class=\"pfmrs-button\">\n\t\t\t\t\t\t\t\t\t<button (click)=\"addReply(discussion.id)\">Reply</button>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div *ngFor=\"let reply of discussion.replies; let r_i = index\" class=\"project_feedback_comments\">\n\t\t\t\t\t\t\t\t<div class=\"pfc_info inline\" *ngIf=\"r_i > 0\">\n\t\t\t\t\t\t\t\t\t<div class=\"pfc_img inline\">\n\t\t\t\t\t\t\t\t\t\t<img [src]=\"reply.picture\">\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<a routerLink=\"/{{reply.username}}\" class=\"p-info freigb inline cursor-pt\">{{ reply.fullName }}</a><span>{{reply.creation_date | amTimeAgo}}</span>\n\t\t\t\t\t\t\t\t\t<div *ngIf=\"logged && (my_id === reply.user_id)\" class=\"pfmt_setting inline\">\n\t\t\t\t\t\t\t\t\t\t<span [attr.id]=\"'pfc-' + r_i\" class=\"cursor-pt\" (click)=\"loadReply(reply.message)\"><img [attr.id]=\"'pfci-' + r_i\" src=\"/public/images/picto-edit-b.svg\"></span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"cursor-pt\" (click)=\"removeReply(reply.id, d_i, r_i)\"><i class=\"fa fa-trash\"></i></span>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"pfm-comments pfm-comments2\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"pfm-comment inline mar-b-10\">\n\t\t\t\t\t\t\t\t\t\t\t<p class=\"p-text freigBook innerHtml\" [innerHtml]=\"reply.message\"></p>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div [attr.id]=\"'pfcbox-' + r_i\" class=\"pfm-updateReply pfm-reply-ask slideDefault transition-200\">\n\t\t\t\t\t\t\t\t\t\t\t<textarea [(ngModel)]=\"replyMessage\" placeholder=\"Add some comments\"></textarea>\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"pfmrs-button\">\n\t\t\t\t\t\t\t\t\t\t\t\t<button (click)=\"updateReply(reply.id)\">Update reply</button>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"pfm-action\">\n\t\t\t\t\t\t\t\t\t\t\t<span (click)=\"likeReply(reply.id, reply.liked, d_i, r_i)\" style=\"font-family: Arial; font-size: 12px\"><img class=\"pfm-vote-image\" src=\"/public/images/arrow-up-icon-g.svg\" alt=\"up\"> {{reply.likes.length}}</span>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</section>\n\n"

/***/ }),

/***/ "./src/app/Components/projects/project-discussions/project-discussions.component.scss":
/***/ (function(module, exports) {

module.exports = ".wpj-discussion {\n  max-width: 800px;\n  margin: 0 auto;\n  /*\tpadding: 10px 30px;\n*/\n  /*\tbackground-color: #fff;\n*/\n  border-radius: 8px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; }\n  .wpj-discussion .inline {\n    display: inline-block;\n    vertical-align: top; }\n  .wpj-discussion img {\n    height: 36px;\n    width: 36px;\n    border-radius: 50%;\n    margin-right: 10px; }\n  .wpj-discussion span {\n    font-family: 'freigBook';\n    font-size: 14px;\n    outline: none;\n    color: #222; }\n  .wpj-discussion .freigBook {\n    font-family: 'freigBook';\n    font-size: 16px;\n    color: black; }\n  .wpj-discussion .freigMed {\n    font-family: 'freigMed';\n    font-size: 16px;\n    color: black; }\n  .wpj-discussion .freigSem {\n    font-family: 'freigSem';\n    font-size: 18px;\n    color: black; }\n  .wpj-discussion .freigLight {\n    font-family: 'freigLight';\n    font-size: 32px;\n    color: #999999; }\n  .wpj-discussion label {\n    margin-right: 10px; }\n  .wpj-discussion input {\n    border: 1px solid #e5e5e5;\n    padding: 6px 15px;\n    border-radius: 3px;\n    width: 100%;\n    margin-bottom: 10px; }\n  .wpj-discussion textarea {\n    border-radius: 4px; }\n  .wpj-discussion button {\n    font-size: 16px; }\n  .wpj-discussion .wpjdh-ask {\n    padding: 0 20px; }\n  .wpj-discussion .wpjdh-ask .redactor-editor {\n      min-height: 80px !important;\n      padding: 10px 15px;\n      font-family: 'freigBook';\n      border: 1px solid #e5e5e5;\n      border-radius: 4px; }\n  .wpj-discussion .wpjdh-ask .redactor-editor p {\n        margin-bottom: 0;\n        font-size: 16px; }\n  .wpj-discussion .wpjdh-ask .redactor-placeholder {\n      font-family: 'freigBook';\n      font-size: 16px; }\n  .wpj-discussion .wpjdh-ask .pfa-button {\n      margin-top: 15px;\n      text-align: right; }\n  .wpj-discussion .wpjdh-ask .pfa-button button {\n        padding: 4px 15px 4px 15px; }\n  .wpj-discussion .wpjd-header {\n    background-color: #f9f9f9; }\n  .wpj-discussion .wpjd-header .mar-b-15 {\n      margin-bottom: 30px; }\n  .wpj-discussion .wpjd-header #wpjdh-2 {\n      max-height: 0; }\n  .wpj-discussion .wpjd-header h1 {\n      font-size: 26px;\n      color: #6C6969;\n      font-family: 'freigLight'; }\n  .wpj-discussion .wpjd-header .wpjdh-add {\n      position: relative;\n      top: 2px;\n      margin-left: auto;\n      padding: 5px 10px;\n      border: 1px solid black;\n      border-radius: 4px;\n      -webkit-transition: all 200ms linear;\n      -kthtml-transition: all 200ms linear;\n      transition: all 200ms linear;\n      cursor: pointer; }\n  .wpj-discussion .wpjd-header .wpjdh-add span {\n        text-transform: uppercase;\n        font-size: 12px;\n        padding: 0 18px; }\n  .wpj-discussion .wpjd-header .wpjdh-add span i {\n          position: relative;\n          top: 1px;\n          margin-right: 5px; }\n  .wpj-discussion .wpjd-header .pfh_add:hover {\n      background-color: rgba(0, 0, 0, 0.8); }\n  .wpj-discussion .wpjd-header .pfh_add:hover span {\n        color: white; }\n  .wpj-discussion .wpjd-comment {\n    background-color: #fff;\n    margin: 0 0 50px 0; }\n  .wpj-discussion .wpjd-comment .wpjd-textarea {\n      -webkit-box-align: start;\n          -ms-flex-align: start;\n              align-items: flex-start;\n      padding: 10px;\n      background-color: #f1f1f1;\n      border-radius: 4px; }\n  .wpj-discussion .wpjd-comment .wpjd-textarea .image-distort {\n        width: 36px;\n        height: 36px;\n        margin-right: 10px; }\n  .wpj-discussion .wpjd-comment .wpjd-textarea img {\n        width: 36px;\n        height: 36px;\n        border-radius: 50%; }\n  .wpj-discussion .wpjd-comment .wpjd-textarea textarea {\n        min-height: 36px;\n        margin: 0;\n        border: 1px solid #f1f1f1; }\n  .wpj-discussion .wpjd-comment button {\n      display: block;\n      font-family: 'freigMed';\n      margin-left: auto;\n      margin-right: 30px;\n      margin-top: 10px; }\n  .wpj-discussion .project_feedback_body {\n    padding: 30px;\n    background-color: #fff;\n    border-radius: 4px;\n    margin-bottom: 100px; }\n  .wpj-discussion .project_feedback_body h4 {\n      font-size: 18px;\n      margin-bottom: 2px; }\n  .wpj-discussion .project_feedback_body .p-info {\n      margin-right: 10px;\n      color: #999999;\n      text-decoration: underline; }\n  .wpj-discussion .project_feedback_body .p-info:hover {\n      text-decoration: none; }\n  .wpj-discussion .project_feedback_body .p-text {\n      color: black; }\n  .wpj-discussion .project_feedback_body .project_feedback_comments .no-comment {\n      text-align: center;\n      color: #999;\n      margin-bottom: 30px; }\n  .wpj-discussion .project_feedback_body .project_feedback_comments .project_feedback_main .pfmt_info {\n      position: relative;\n      top: 5px;\n      max-width: 550px; }\n  .wpj-discussion .project_feedback_body .project_feedback_comments .project_feedback_main .pfmt_info span {\n        color: #999999; }\n  .wpj-discussion .project_feedback_body .project_feedback_comments .project_feedback_main .pfm_title .pfmt_list {\n      width: 100%; }\n  .wpj-discussion .project_feedback_body .project_feedback_comments .project_feedback_main .pfm_title .pfmt_list .pfmt_setting {\n        float: right; }\n  .wpj-discussion .project_feedback_body .project_feedback_comments .project_feedback_main .pfm_title .pfmt_list .pfmt_setting span img {\n          position: relative;\n          border-radius: 0;\n          width: 16px;\n          height: auto;\n          top: 2px; }\n  .wpj-discussion .project_feedback_body .project_feedback_comments .project_feedback_main .pfm_title .pfmt_list .pfmt_setting span .fa-trash {\n          color: #999999;\n          font-size: 18px; }\n  .wpj-discussion .project_feedback_body .project_feedback_comments .project_feedback_main .pfm_title .pfmt_list .pfm-comments {\n        padding-left: 50px; }\n  .wpj-discussion .project_feedback_body .project_feedback_comments .project_feedback_main .pfm_title .pfmt_list .pfm-comments .project_feedback_ask .pfa-button {\n          text-align: right; }\n  .wpj-discussion .project_feedback_body .project_feedback_comments .project_feedback_main .pfm_title .pfmt_list .pfm-comments2 {\n        margin-top: 0; }\n  .wpj-discussion .project_feedback_body .project_feedback_comments .project_feedback_main .pfm_title .pfmt_list .pfm-comments2 a {\n          color: blue; }\n  .wpj-discussion .project_feedback_body .project_feedback_comments .project_feedback_main .pfm_title .pfmt_list .pfm-action {\n        margin-bottom: 15px; }\n  .wpj-discussion .project_feedback_body .project_feedback_comments .project_feedback_main .pfm_title .pfmt_list .pfm-action .pfm-vote-image {\n          position: relative;\n          bottom: 1px;\n          height: 10px;\n          width: auto;\n          border-radius: 0;\n          margin-right: 5px; }\n  .wpj-discussion .project_feedback_body .project_feedback_comments .project_feedback_main .pfm_title .pfmt_list .pfm-action span {\n          font-family: 'freigMed';\n          text-transform: uppercase;\n          color: #999999;\n          margin-right: 15px;\n          cursor: pointer; }\n  .wpj-discussion .project_feedback_body .project_feedback_comments .project_feedback_main .pfm_title .pfmt_list .pfm-action span i {\n            font-size: 14px;\n            margin-right: 4px; }\n  .wpj-discussion .project_feedback_body .project_feedback_comments .project_feedback_main .pfm_title .pfmt_list .pfm-action span:hover {\n          color: #6C6969; }\n  .wpj-discussion .project_feedback_body .project_feedback_comments .project_feedback_main .pfm_title .pfmt_list .pfm-reply-ask .pfmrs-button {\n        text-align: right;\n        margin-top: 10px; }\n  .wpj-discussion .project_feedback_body .project_feedback_comments .project_feedback_main .pfm_title .pfmt_list .pfm-reply-ask .pfmrs-button button {\n          padding: 4px 15px; }\n  .wpj-discussion .project_feedback_body .project_feedback_comments .project_feedback_main .pfm_title .pfc_img a {\n      position: relative;\n      top: 5px; }\n  .wpj-discussion .project_feedback_body .project_feedback_comments .project_feedback_main .pfm_title .pfc_img img {\n      top: 6px; }\n  .wpj-discussion .project_feedback_body .project_feedback_comments .project_feedback_main .pfm_title .pfc_info {\n      width: 100%; }\n  /******************** MOBILE ****************************/\n  @media only screen and (max-width: 736px) {\n  .wpj-discussion .project_feedback_body {\n    padding: 30px 10px; }\n  .wpj-discussion .project_feedback_body .project_feedback_comments .project_feedback_main .pfm_title .pfc_info {\n    margin-top: 15px; }\n  .wpj-discussion .wpjd-comment .wpjd-textarea textarea {\n    -webkit-appearance: none; } }\n"

/***/ }),

/***/ "./src/app/Components/projects/project-discussions/project-discussions.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectDiscussionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__("./node_modules/ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_popover_login_popover_login_component__ = __webpack_require__("./src/app/Components/modals/popover-login/popover-login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_Projects_project_discussions_service__ = __webpack_require__("./src/app/Services/Projects/project-discussions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_Projects_project_reply_discussion_service__ = __webpack_require__("./src/app/Services/Projects/project-reply-discussion.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_Profiles_profiles_service__ = __webpack_require__("./src/app/Services/Profiles/profiles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Services_Pictures_pictures_service__ = __webpack_require__("./src/app/Services/Pictures/pictures.service.ts");
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





var ProjectDiscussionsComponent = /** @class */ (function () {
    function ProjectDiscussionsComponent(Discussion, TokenService, ReplyService, ProfilesService, dialogService, PicturesService) {
        this.Discussion = Discussion;
        this.TokenService = TokenService;
        this.ReplyService = ReplyService;
        this.ProfilesService = ProfilesService;
        this.dialogService = dialogService;
        this.PicturesService = PicturesService;
        this.emit = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.logged = false;
        this.my_project = false;
        this.discussions = [];
        this.profile = {};
        if (this.TokenService.getToken()) {
            this.my_id = this.TokenService.getToken().user.id;
            this.logged = true;
        }
        this.my_project = true;
    }
    ProjectDiscussionsComponent.prototype.ngOnInit = function () {
        this.initServices();
    };
    ProjectDiscussionsComponent.prototype.ngOnChanges = function (changes) {
        this.initServices();
    };
    ProjectDiscussionsComponent.prototype.initServices = function () {
        this.getProfile();
        this.getDiscussions();
    };
    ProjectDiscussionsComponent.prototype.getProfile = function () {
        var _this = this;
        this.ProfilesService.getProfile(this.my_id).subscribe(function (res) {
            _this.profile = res.profile;
        });
    };
    /*** DISCUSSIONS ***/
    ProjectDiscussionsComponent.prototype.getDiscussions = function () {
        var _this = this;
        this.Discussion.getDiscussions(this.project_id).subscribe(function (res) {
            _this.discussions = res.discussions;
            _this.emitDiscussionNumber(_this.discussions.length);
        }, function (error) {
            if (error)
                _this.discussions = [];
        });
    };
    ProjectDiscussionsComponent.prototype.resetDiscussions = function () {
        this.getDiscussions();
        this.discussionTitle = '';
        this.discussionMessage = '';
        this.replyMessage = '';
    };
    ProjectDiscussionsComponent.prototype.addDiscussion = function () {
        var _this = this;
        if (this.checkLogin()) {
            var body = {
                message: this.replaceNewline(this.discussionMessage),
            };
            this.Discussion.createDiscussion(this.project_id, body).subscribe(function (res) {
                if (res.id) {
                    _this.resetDiscussions();
                }
            });
        }
    };
    ProjectDiscussionsComponent.prototype.loadComment = function (message) {
        this.replyMessage = message;
    };
    ProjectDiscussionsComponent.prototype.likeDiscussion = function (id, liked, index) {
        var _this = this;
        if (this.checkLogin()) {
            this.Discussion.likeDiscussion(id, {}).subscribe(function (res) {
                if (res) {
                    _this.discussions[index].replies[0];
                    if (liked) {
                        _this.discussions[index].replies[0].liked = false;
                        _this.discussions[index].replies[0].likes.splice(0, 1);
                    }
                    else {
                        _this.discussions[index].replies[0].liked = true;
                        _this.discussions[index].replies[0].likes.push({ fake: 'like' });
                    }
                }
            });
        }
    };
    ProjectDiscussionsComponent.prototype.removeDiscussion = function (id, index) {
        var _this = this;
        if (this.checkLogin()) {
            this.Discussion.deleteDiscussion(id).subscribe(function (res) {
                if (res.success)
                    _this.discussions.splice(index, 1);
            });
        }
    };
    /*** REPLIES ***/
    ProjectDiscussionsComponent.prototype.addReply = function (id) {
        var _this = this;
        if (this.checkLogin()) {
            this.ReplyService.createReply(id, { message: this.replaceNewline(this.replyMessage) }).subscribe(function (res) {
                if (res.success)
                    _this.resetDiscussions();
            });
        }
    };
    ProjectDiscussionsComponent.prototype.loadReply = function (message) {
        this.replyMessage = message;
    };
    ProjectDiscussionsComponent.prototype.updateReply = function (id) {
        var _this = this;
        if (this.checkLogin()) {
            this.ReplyService.updateReply(id, { message: this.replaceNewline(this.replyMessage) }).subscribe(function (res) {
                if (res.success)
                    _this.resetDiscussions();
            });
        }
    };
    ProjectDiscussionsComponent.prototype.likeReply = function (id, liked, index1, index2) {
        var _this = this;
        if (this.checkLogin()) {
            this.ReplyService.likeReply(id, {}).subscribe(function (res) {
                if (liked) {
                    _this.discussions[index1].replies[index2].liked = false;
                    _this.discussions[index1].replies[index2].likes.splice(0, 1);
                }
                else {
                    _this.discussions[index1].replies[index2].liked = true;
                    _this.discussions[index1].replies[index2].likes.push({ fake: 'like' });
                }
            });
        }
    };
    ProjectDiscussionsComponent.prototype.removeReply = function (id, index1, index2) {
        var _this = this;
        if (this.checkLogin()) {
            this.ReplyService.deleteReply(id).subscribe(function (res) {
                if (res.success)
                    _this.discussions[index1].replies.splice(index2, 1);
            });
        }
    };
    ProjectDiscussionsComponent.prototype.emitDiscussionNumber = function (number) {
        this.emit.emit(number);
    };
    ProjectDiscussionsComponent.prototype.replaceNewline = function (text) {
        return text.replace(/\r?\n/g, '<br />');
    };
    ProjectDiscussionsComponent.prototype.checkLogin = function () {
        if (!this.logged) {
            var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_2__modals_popover_login_popover_login_component__["a" /* PopoverLoginComponent */], {});
            return false;
        }
        else
            return true;
    };
    ProjectDiscussionsComponent.prototype.transformImage = function (url, width, height, crop) {
        return this.PicturesService.transformImage(url, width, height, crop);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], ProjectDiscussionsComponent.prototype, "reload", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], ProjectDiscussionsComponent.prototype, "project_id", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
    ], ProjectDiscussionsComponent.prototype, "emit", void 0);
    ProjectDiscussionsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-discussions',
            template: __webpack_require__("./src/app/Components/projects/project-discussions/project-discussions.component.html"),
            styles: [__webpack_require__("./src/app/Components/projects/project-discussions/project-discussions.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__Services_Projects_project_discussions_service__["a" /* ProjectDiscussionsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_Projects_project_discussions_service__["a" /* ProjectDiscussionsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__Services_Authentication_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__Services_Authentication_token_service__["a" /* TokenService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__Services_Projects_project_reply_discussion_service__["a" /* ProjectReplyDiscussionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_Projects_project_reply_discussion_service__["a" /* ProjectReplyDiscussionService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__Services_Profiles_profiles_service__["a" /* ProfilesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_Profiles_profiles_service__["a" /* ProfilesService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7__Services_Pictures_pictures_service__["a" /* PicturesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__Services_Pictures_pictures_service__["a" /* PicturesService */]) === "function" && _g || Object])
    ], ProjectDiscussionsComponent);
    return ProjectDiscussionsComponent;
    var _a, _b, _c, _d, _e, _f, _g;
}());

//# sourceMappingURL=project-discussions.component.js.map

/***/ }),

/***/ "./src/app/Components/projects/project-needs/project-needs.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wpj-needs\">\n\t<div class=\"wpjn-header flex\">\n\t\t<h2 class=\"freigl\" *ngIf=\"needs[0]\">Current needs</h2>\n<!-- \t\t<span *ngIf=\"my_project\" class=\"freigm cursor-pt\" (click)=\"showAddNeedModal()\"><i class=\"fa fa-plus\"></i> Add/Delete a need</span>\n -->\t</div>\n\n\t<div class=\"wpjn-cards flex\">\n\t\t<div class=\"needs-card\" *ngFor=\"let need of needs\">\n\t\t\t<div class=\"nc-header bg-default\" [ngStyle]=\"{'background-image': 'url(' + transformImage(project.pictures[0], 240, 100, 'fill') + ')'}\">\n\t\t\t\t<div class=\"filter-need\"></div>\n\t\t\t\t<!-- <h3 class=\"freigs align-center\"><span *ngIf=\"need.status !== 'Any help' && need.status !== 'Tips' && need.status !== 'Feedback'\">A</span> {{ need.status }} <span class=\"freigb\" *ngIf=\"need.tags != 0 && need.status !== 'Feedback' && (need.status === 'Teammate' || need.status === 'Mentor')\">skilled</span> <span class=\"freigb\" *ngIf=\"need.tags != 0 && need.status !== 'Feedback'\">in</span> <br /> {{ transformTags(need.tags)[0] }}</h3> -->\n\t\t\t\t<h3 class=\"freigs align-center\">\n\t\t\t\t\t<span *ngIf=\"need.status === 'for feedback'\">Feedback</span>\n\t\t\t\t\t<span *ngIf=\"!need.position && need.status === 'to hire someone'\">Hire someone <span *ngIf=\"need.tags\">skilled in</span></span>\n\t\t\t\t\t<span *ngIf=\"need.status === 'for help'\">Help <span *ngIf=\"need.tags\">in</span></span>\n\t\t\t\t\t<span *ngIf=\"!need.position && need.status === 'to hire an intern'\">Hire an intern <span *ngIf=\"need.tags\">skilled in</span></span>\n\t\t\t\t\t<span *ngIf=\"need.position\">{{ need.position }}</span>\n\t\t\t\t\t<span *ngIf=\"need.status === 'for a cofounder'\">A cofounder <span *ngIf=\"need.tags\">skilled in</span></span>\n\t\t\t\t\t<span *ngIf=\"!need.position && transformTags(need.tags)[0] && need.status !== 'for feedback'\"> {{ transformTags(need.tags)[0] }} </span>\n\t\t\t\t</h3>\n\t\t\t</div>\n\n\t\t\t<div class=\"nc-body\">\n\t\t\t\t<p class=\"freigb mar-b-15 innerHtml\" [innerHtml]=\"need.description\"></p>\n\n\t\t\t\t<ul class=\"flex\" *ngIf=\"!need.position\">\n\t\t\t\t\t<div *ngFor=\"let tag of transformTags(need.tags); let i = index\">\n\t\t\t\t\t\t<li class=\"freigs\" *ngIf=\"i > 0\">{{ tag }}</li>\n\t\t\t\t\t</div>\n\t\t\t\t</ul>\n\t\t\t\t<ul class=\"flex\" *ngIf=\"need.position\">\n\t\t\t\t\t<div *ngFor=\"let tag of transformTags(need.tags); let i = index\">\n\t\t\t\t\t\t<li class=\"freigs\">{{ tag }}</li>\n\t\t\t\t\t</div>\n\t\t\t\t</ul>\n\t\t\t</div>\n\n\t\t\t<div *ngIf=\"!my_project\" class=\"nc-footer flex\">\n\t\t\t\t<img class=\"mar-r-5\" src=\"/public/images/mailbox-icon-b-2.svg\">\n\t\t\t\t<h4 class=\"freigs cursor-pt\" (click)=\"showMessageModal()\">Contact the team</h4>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div *ngIf=\"my_project\" class=\"add-card cursor-pt transition-200\" (click)=\"showAddNeedModal()\">\n\t\t\t<img class=\"mar-b-10\" src=\"/public/images/needs-icon.png\" alt=\"need\" />\n\t\t\t<div class=\"plus-add\">\n\t\t\t\t<i class=\"fa fa-plus\"></i>\n\t\t\t\t<span class=\"freigs\">Add a need</span>\n\t\t\t</div>\n\t\t\t<p class=\"freigm\">Our fancy algorithm will<br /> do the rest.</p>\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ "./src/app/Components/projects/project-needs/project-needs.component.scss":
/***/ (function(module, exports) {

module.exports = ".wpj-needs {\n  width: 800px;\n  margin: 0 auto;\n  padding: 10px 0 60px 0;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; }\n  .wpj-needs .wpjn-header {\n    margin-bottom: 25px;\n    padding: 0 10px; }\n  .wpj-needs .wpjn-header h2 {\n      color: #6C6969;\n      font-size: 26px; }\n  .wpj-needs .wpjn-header span {\n      margin-left: auto;\n      color: #FF4D4D; }\n  .wpj-needs .wpjn-header span .fa-plus {\n        color: #FF4D4D; }\n  .wpj-needs .wpjn-cards {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap; }\n  .wpj-needs .wpjn-cards .needs-card {\n      margin-right: 10px; }\n  .wpj-needs .wpjn-cards .add-card {\n      width: 240px;\n      height: 354px;\n      padding: 100px 0;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      margin: 0 10px; }\n  /******************** MOBILE ****************************/\n  @media only screen and (max-width: 736px) {\n  .wpj-needs {\n    width: 100%;\n    padding-bottom: 0; }\n    .wpj-needs .wpjn-cards {\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      padding-bottom: 50px; } }\n"

/***/ }),

/***/ "./src/app/Components/projects/project-needs/project-needs.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectNeedsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__("./node_modules/ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_message_modal_message_modal_component__ = __webpack_require__("./src/app/Components/modals/message-modal/message-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_need_modal_need_modal_component__ = __webpack_require__("./src/app/Components/modals/need-modal/need-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_Projects_projects_service__ = __webpack_require__("./src/app/Services/Projects/projects.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_Pictures_pictures_service__ = __webpack_require__("./src/app/Services/Pictures/pictures.service.ts");
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


var ProjectNeedsComponent = /** @class */ (function () {
    function ProjectNeedsComponent(dialogService, ProjectsService, PicturesService) {
        this.dialogService = dialogService;
        this.ProjectsService = ProjectsService;
        this.PicturesService = PicturesService;
    }
    ProjectNeedsComponent.prototype.ngOnInit = function () {
        this.needs = this.project['openings'];
    };
    ProjectNeedsComponent.prototype.ngOnChanges = function (changes) {
        this.needs = this.project['openings'];
    };
    ProjectNeedsComponent.prototype.transformTags = function (tags) {
        if (tags && tags != 0) {
            if (tags.indexOf(','))
                return tags.split(',');
            else
                return JSON.parse(tags);
        }
        else
            return [];
    };
    ProjectNeedsComponent.prototype.transformImage = function (url, width, height, crop) {
        return this.PicturesService.transformImage(url, width, height, crop);
    };
    /* SHOW MODAL */
    ProjectNeedsComponent.prototype.showMessageModal = function () {
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_2__modals_message_modal_message_modal_component__["a" /* MessageModalComponent */], {
            profile: this.profile
        });
    };
    ProjectNeedsComponent.prototype.showAddNeedModal = function () {
        var _this = this;
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_3__modals_need_modal_need_modal_component__["a" /* NeedModalComponent */], {
            project_id: this.project['id']
        }).subscribe(function (need) {
            if (need)
                _this.needs.push(need);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], ProjectNeedsComponent.prototype, "my_project", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], ProjectNeedsComponent.prototype, "profile", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], ProjectNeedsComponent.prototype, "project", void 0);
    ProjectNeedsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-needs',
            template: __webpack_require__("./src/app/Components/projects/project-needs/project-needs.component.html"),
            styles: [__webpack_require__("./src/app/Components/projects/project-needs/project-needs.component.scss"), __webpack_require__("./src/public/styles/need-card.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__Services_Projects_projects_service__["a" /* ProjectsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_Projects_projects_service__["a" /* ProjectsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__Services_Pictures_pictures_service__["a" /* PicturesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_Pictures_pictures_service__["a" /* PicturesService */]) === "function" && _c || Object])
    ], ProjectNeedsComponent);
    return ProjectNeedsComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=project-needs.component.js.map

/***/ }),

/***/ "./src/app/Components/projects/projects.component.html":
/***/ (function(module, exports) {

module.exports = "<section id=\"w-project\" *ngIf=\"project && project.pictures\">\n\t<div class=\"wpj-head\">\n\t\t<div class=\"container\">\n\t\t\t<div class=\"filter\" [ngStyle]=\"{'background-image': 'url(' + project.pictures[0] + ')'}\"></div>\n\t\t\t<div class=\"filter2\"></div>\n\t\t</div>\n\n\t\t<div class=\"wpjh-presentation flex\" *ngIf=\"!mobile\">\n\t\t\t<img *ngIf=\"project.logo\" class=\"logo\" [src]=\"project.logo\" alt=\"logo\" />\n\t\t\t<img *ngIf=\"!project.logo\" class=\"logo\" src=\"/public/images/default-project-logo.png\" alt=\"logo\" />\n\t\t\t<div class=\"wpjhp-info\">\n\t\t\t\t<div class=\"wpjhpi-contact flex mar-b-5\">\n\t\t\t\t\t<h2 class=\"freigs\">{{ project.title | cut:true:16:' ...' }}</h2>\n\t\t\t\t\t<div class=\"location pad-t-5 flex\">\n\t\t\t\t\t\t<img class=\"mar-r-5\" src=\"/public/images/location-picto-w.svg\">\n\t\t\t\t\t\t<h3 class=\"freigb\" *ngIf=\"project.state\">{{ project.city }}, {{ project.state }}</h3>\n\t\t\t\t\t\t<h3 class=\"freigb\" *ngIf=\"!project.state\">{{ project.city }}, {{ project.country }}</h3>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"category pad-t-5 mar-r-10 flex\">\n\t\t\t\t\t\t<img class=\"mar-r-5\" src=\"/public/images/tag-icon.png\" alt=\"category\" />\n\t\t\t\t\t\t<h3 class=\"freigb\">{{ project.category }}</h3>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div *ngIf=\"project.link\" class=\"project-link\">\n\t\t\t\t\t\t<i class=\"fa fa-link\" aria-hidden=\"true\"></i>\n\t\t\t\t\t\t<a class=\"freigb project-link\" [href]=\"project.link\" target=\"_blank\">{{ transformLink(project.link) | cut:true:18:' ...' }}</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<p class=\"freigm\">{{ project.description | cut:true:70:' ...' }}</p>\n\t\t\t\t<div class=\"wpjhpi-bar\">\n\t\t\t\t\t<a pageScroll class=\"freigb\" href=\"#wpj-needs\">Needs <span *ngIf=\"project.openings.length\" class=\"bubble\">{{ project.openings.length }}</span></a>\n\t\t\t\t\t<a pageScroll class=\"freigb\" href=\"#wpj-feedback\">Feedback <span *ngIf=\"d_length\" class=\"bubble\">{{ d_length }}</span></a>\n\t\t\t\t\t<a class=\"freigb cursor-pt\" (click)=\"showMessageModal()\">Contact</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"upvote-socials\">\n\t\t\t\t<!-- <div  class=\"wpjhp-vote cursor-pt bg-default transition-200\" (click)=\"followProject(project.id)\" [ngClass]=\"{'wpjhp-background': !project.hasLiked, 'wpjhp-background-active': project.hasLiked}\">\n\t\t\t\t\t<span class=\"freigs\">{{ project.follower_count }}</span>\n\t\t\t\t</div> -->\n\n\t\t\t\t<div class=\"wpjhp-author\">\n\t\t\t\t<a *ngIf=\"author && author.fullName != 'Quentin Verriere' && author.fullName != 'Olivier Hamelin' && author.fullName != 'Jay Ho'\" routerLink=\"/{{author.username}}\" class=\"flex\">\n\t\t\t\t\t<img class=\"mar-r-10\" [src]=\"transformImage(author.picture, 40, 40, 'fill')\" alt=\"author\">\n\t\t\t\t\t<div class=\"wpjhpa-info\">\n\t\t\t\t\t\t<h4 class=\"freigs\">{{ author.fullName }}</h4>\n\t\t\t\t\t\t<span class=\"span-1 mar-r-5 freigb\">#{{ author.rank }}</span><span class=\" span-2 freigs\">Creator</span>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\n\t\t\t\t<button *ngIf=\"my_project || admin\" class=\"edit-button cursor-pt\" (click)=\"editProject(project.public_id)\">Edit your page</button>\n\t\t\t</div>\n\n\t\t\t\t<div class=\"wpjhp-networks flex cursor-pt\">\n\t\t\t\t\t<i class=\"fa fa-facebook mar-r-10\" (click)=\"shareFacebook()\"></i>\n\t\t\t\t\t<a href=\"https://twitter.com/intent/tweet?text={{project.title}} is now live on @wittycircle, where the world meets future entrepreneurs&hashtags={{project.title}} {{ shortUrl(project.public_id, project.title) }}\"><i class=\"fa fa-twitter\"></i></a>\n\t\t\t\t</div>\n\n\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"wpjh-presentation-mobile align-center\" *ngIf=\"mobile\">\n\t\t\t<img *ngIf=\"project.logo\" class=\"logo mar-b-10\" [src]=\"transformImage(project.logo, 70, 70, 'fill')\" alt=\"logo\" />\n\t\t\t<img *ngIf=\"!project.logo\" class=\"logo mar-b-10\" src=\"/public/images/default-project-logo.png\" alt=\"logo\" />\n\n\t\t\t<h2 class=\"freigs mar-b-5\">{{ project.title | cut:true:30:' ...' }}</h2>\n\n\t\t\t<div class=\"wpjhpi-contact flex mar-b-15\">\n\t\t\t\t<div class=\"location flex\">\n\t\t\t\t\t<img class=\"mar-r-5\" src=\"/public/images/location-picto-w.svg\">\n\t\t\t\t\t<h3 class=\"freigb\" *ngIf=\"project.state\">{{ project.city }}, {{ project.state }}</h3>\n\t\t\t\t\t<h3 class=\"freigb\" *ngIf=\"!project.state\">{{ project.city }}, {{ project.country }}</h3>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"category flex\">\n\t\t\t\t\t<img class=\"mar-r-5\" src=\"/public/images/tag-icon.png\" alt=\"category\" />\n\t\t\t\t\t<h3 class=\"freigb\">{{ project.category }}</h3>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<p class=\"freigm\">{{ project.description | cut:true:70:' ...' }}</p>\n\n\t\t\t<div class=\"upvote-author flex\">\n\t\t\t\t<div  class=\"wpjhp-vote cursor-pt bg-default transition-200\" (click)=\"followProject(project.id)\" [ngClass]=\"{'wpjhp-background': !project.hasLiked, 'wpjhp-background-active': project.hasLiked}\">\n\t\t\t\t\t<span class=\"freigs\">{{ project.follower_count }}</span>\n\t\t\t\t</div>\n\n\t\t\t\t<a *ngIf=\"author && author.fullName != 'Quentin Verriere' && author.fullName != 'Olivier Hamelin' && author.fullName != 'Jay Ho'\" routerLink=\"/{{author.username}}\" class=\"flex\">\n\t\t\t\t\t<img class=\"mar-r-10\" [src]=\"transformImage(author.picture, 40, 40, 'fill')\" alt=\"author\">\n\t\t\t\t\t<div class=\"wpjhpa-info\">\n\t\t\t\t\t\t<h4 class=\"freigs\">{{ author.fullName }}</h4>\n\t\t\t\t\t\t<span class=\"span-1 mar-r-5 freigb\">#{{ author.rank }}</span><span class=\" span-2 freigs\">Creator</span>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t</div>\n\n\t</div>\n\t<div class=\"wpj-social\">\n\t\t<div class=\"wpjhpi-bar flex\" *ngIf=\"mobile\">\n\t\t\t<a pageScroll class=\"freigb\" href=\"#wpj-needs\">Needs <span *ngIf=\"project.openings.length\" class=\"bubble\">{{ project.openings.length }}</span></a>\n\t\t\t<a pageScroll class=\"freigb\" href=\"#wpj-feedback\">Feedback <span *ngIf=\"d_length\" class=\"bubble\">{{ d_length }}</span></a>\n\t\t\t<a class=\"freigb cursor-pt\" (click)=\"showMessageModal()\">Contact</a>\n\t\t</div>\n\t</div>\n\n\t<div class=\"wpj-body\">\n\t\t<div class=\"wpjb-container flex\" *ngIf=\"project.about || project['1st_description'] || (project.video && project.picture)\">\n\t\t\t<div class=\"wpjb-contents\">\n\t\t\t\t<div class=\"wpjbc-medias\" *ngIf=\"project.video || project.pictures[0]\">\n\t\t\t\t\t<div class=\"wpjbd-pano flex transition-200\" [style.left]=\"leftPixel\">\n\t\t\t\t\t\t<video id=\"my_video\" *ngIf=\"showPlayer\" class=\"wpjbc-video video-js vjs-big-play-centered\" controls preload=\"auto\">\n\t\t\t\t\t\t\t<source [src]=\"project.video\" type=\"video/mp4\" />\n\t\t\t\t\t\t</video>\n\t\t\t\t\t\t<img *ngFor=\"let picture of project.pictures\" [src]=\"transformImage(picture, 460, 300, 'fill')\" alt=\"project_pictures\" alt=\"project_pictures\" />\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"wpjbcm-carousel flex\">\n\t\t\t\t\t\t<video *ngIf=\"project.video\" class=\"wpjbc-video mar-r-5 cursor-pt\" height=\"40\" mute (click)=\"slideCarousel(0, 'video')\">\n\t\t\t\t\t\t\t<source [src]=\"project.video\" type=\"video/mp4\">\n\t\t\t\t\t\t</video>\n\t\t\t\t\t\t<img *ngFor=\"let picture of project.pictures; let i = index\" (click)=\"slideCarousel(i, 'picture')\" class=\"cursor-pt\" [src]=\"transformImage(picture, 40, 40, 'fill')\" alt=\"project_pictures\" />\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"wpjbc-resumes\" *ngIf=\"project['1st_description']\">\n\t\t\t\t\t<div class=\"first-resume flex\">\n\t\t\t\t\t\t<div class=\"image-distort mar-r-10\" *ngIf=\"author && author.fullName != 'Quentin Verriere' && author.fullName != 'Olivier Hamelin' && author.fullName != 'Jay Ho'\">\n\t\t\t\t\t\t\t<img class=\"resume-picture mar-r-10\" [src]=\"transformImage(author.picture, 30, 30, 'fill')\" alt=\"profile_picture\" />\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"resume-text\">\n\t\t\t\t\t\t<div class=\"innerHtml freigb\" [innerHtml]=\"project['1st_description']\"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"second_resumes flex\" *ngIf=\"project['2nd_description']\">\n\t\t\t\t\t\t<div class=\"image-distort mar-r-10\" *ngIf=\"author && author.fullName != 'Quentin Verriere' && author.fullName != 'Olivier Hamelin' && author.fullName != 'Jay Ho'\">\n\t\t\t\t\t\t\t<img class=\"resume-picture mar-r-10\" [src]=\"transformImage(author.picture, 30, 30, 'fill')\" alt=\"profile_picture\" />\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"resume-text\">\n\t\t\t\t\t\t\t<div class=\"innerHtml freigb\" [innerHtml]=\"project['2nd_description']\"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"wpjbc-resumes\" *ngIf=\"!project['1st_description'] && project.about\">\n\t\t\t\t\t<div class=\"first-resume flex\">\n\t\t\t\t\t\t<div class=\"image-distort mar-r-10\" *ngIf=\"author && author.fullName != 'Quentin Verriere' && author.fullName != 'Olivier Hamelin' && author.fullName != 'Jay Ho'\">\n\t\t\t\t\t\t\t<img class=\"resume-picture mar-r-10\" [src]=\"transformImage(author.picture, 30, 30, 'fill')\" alt=\"profile_picture\" />\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"resume-text\">\n\t\t\t\t\t\t\t<div class=\"innerHtml freigb\" [innerHtml]=\"project.about\"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"wpjb-similar\" *ngIf=\"!mobile && project['1st_description'] || (project.video && project.picture) || project.about\">\n\t\t\t\t<h3 class=\"freigl mar-b-15\">Similar projects</h3>\n\t\t\t\t<div *ngFor=\"let similarProject of similarProjects\">\n\t\t\t\t\t<a [routerLink]=\"['/project', similarProject.public_id, transformUrl(similarProject.title)]\" *ngIf=\"similarProject.title !== project.title\">\n\t\t\t\t\t<div class=\"wpjbcs-projects mar-b-10 flex\">\n\t\t\t\t\t\t<img class=\"mar-r-10\" [src]=\"transformImage(similarProject.picture, 36, 36, 'fill')\" alt=\"project-picture\" />\n\t\t\t\t\t\t<div class=\"wpjbcsp-info\">\n\t\t\t\t\t\t\t<h5 class=\"freigl\">{{ similarProject.title }}</h5>\n\t\t\t\t\t\t\t<p class=\"freigm\">{{ similarProject.description | cut:true:50:' ...' }}</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<!-- <div class=\"wpjb-sharing\">\n\t\t\t<p class=\"freigb mar-b-15\">Have friends who could be interested on <strong>{{ project.title | cut:true:30:' ...' }}</strong>?</p>\n\t\t\t<p class=\"freigb\">Send them a word</p>\n\t\t\t<a href=\"fb-messenger://share/?link=https//www.wittycircle.com/project/72791/dapploy\">Send In Messenger</a>\n\n\t\t</div> -->\n\n\n\t\t<app-project-needs id=\"wpj-needs\" [project]=\"project\" [profile]=\"author\" [my_project]=\"my_project\"></app-project-needs>\n\t\t<app-project-discussions id=\"wpj-feedback\" [project_id]=\"project.id\" (emit)=\"getDiscussionNumber($event)\" ></app-project-discussions>\n\t</div>\n</section>\n<app-footer></app-footer>\n"

/***/ }),

/***/ "./src/app/Components/projects/projects.component.scss":
/***/ (function(module, exports) {

module.exports = "#w-project {\n  position: relative; }\n  #w-project .wpj-head {\n    position: relative;\n    width: 100%;\n    height: 240px; }\n  #w-project .wpj-head .container {\n      position: relative;\n      width: inherit;\n      height: inherit;\n      overflow-x: hidden; }\n  #w-project .wpj-head .container .filter {\n        background-image: url(https://res.cloudinary.com/dqpkpmrgk/image/upload/v1477604114/dgjifz7btzr7e9tauiwa.jpg);\n        background-repeat: no-repeat;\n        background-position: center center;\n        background-size: cover;\n        -webkit-filter: blur(4px);\n                filter: blur(4px); }\n  #w-project .wpj-head .container .filter2 {\n        position: absolute;\n        width: inherit;\n        height: inherit;\n        background: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.4)), to(rgba(0, 0, 0, 0.5)));\n        background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)); }\n  #w-project .wpj-head .wpjh-presentation {\n      position: absolute;\n      width: 950px;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      margin: 0 auto;\n      -webkit-box-pack: end;\n          -ms-flex-pack: end;\n              justify-content: flex-end;\n      /*\t\t\tpadding-right: 100px;\n*/ }\n  #w-project .wpj-head .wpjh-presentation .logo {\n        position: relative;\n        top: 20px;\n        width: 90px;\n        height: 90px;\n        border-radius: 4px;\n        margin-right: 20px;\n        border: 1px solid #eeeeee; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-info {\n        position: relative;\n        top: 15px;\n        width: 600px; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-info .wpjhpi-contact h2 {\n          font-size: 21px;\n          margin-right: 20px; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-info .wpjhpi-contact h3 {\n          font-size: 14px;\n          color: #ccc;\n          opacity: 0.8; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-info .wpjhpi-contact .location {\n          padding-top: 5px;\n          margin-right: 10px; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-info .wpjhpi-contact .location img {\n            width: 8px;\n            opacity: 0.8; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-info .wpjhpi-contact .category {\n          padding-top: 5px; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-info .wpjhpi-contact .category img {\n            width: 10px;\n            opacity: 0.8; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-info .wpjhpi-contact .project-link {\n          padding-top: 5px; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-info .wpjhpi-contact .project-link .fa-link {\n            color: #ccc;\n            opacity: 0.8;\n            font-size: 13px;\n            position: relative;\n            top: 1px; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-info .wpjhpi-contact .project-link a {\n            color: #ccc;\n            opacity: 0.8;\n            font-size: 14px; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-info .wpjhpi-contact .project-link:hover a {\n          text-decoration: underline; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-info .wpjhpi-bar {\n          position: relative;\n          top: 30px; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-info .wpjhpi-bar a {\n            font-size: 16px;\n            color: #404040;\n            margin-right: 30px;\n            font-family: 'freigmed'; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-info .wpjhpi-bar .bubble {\n            font-family: 'Helvetica';\n            background-color: #FF4D4D;\n            margin-left: 2px;\n            padding: 2px 10px;\n            font-size: 13px;\n            border-radius: 16px;\n            position: relative;\n            bottom: 2px; }\n  #w-project .wpj-head .wpjh-presentation .upvote-socials {\n        position: relative;\n        text-align: center;\n        top: 20px;\n        margin: 0 60px 0 30px; }\n  #w-project .wpj-head .wpjh-presentation .upvote-socials .fa-facebook {\n          padding: 7px 12px;\n          background-color: #3b5998;\n          border-radius: 4px; }\n  #w-project .wpj-head .wpjh-presentation .upvote-socials .fa-twitter {\n          padding: 8px 10px 8px 10px;\n          background-color: #1dcaff;\n          border-radius: 4px; }\n  #w-project .wpj-head .wpjh-presentation .upvote-socials .wpjhp-networks {\n          -webkit-box-align: stretch;\n              -ms-flex-align: stretch;\n                  align-items: stretch;\n          position: relative;\n          top: 33px; }\n  #w-project .wpj-head .wpjh-presentation .upvote-socials .wpjhp-vote {\n          display: inline-block;\n          background-size: 10px;\n          background-position: 14px;\n          padding: 3px 15px 3px 32px;\n          border: 1px solid #fff;\n          border-radius: 4px; }\n  #w-project .wpj-head .wpjh-presentation .upvote-socials .wpjhp-vote span {\n            vertical-align: super; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-author {\n        position: relative;\n        height: 33px;\n        min-width: 140px; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-author a {\n          -webkit-box-align: start;\n              -ms-flex-align: start;\n                  align-items: flex-start; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-author img {\n          width: 40px;\n          border-radius: 50%; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-author .edit-button {\n          position: absolute;\n          top: 64px;\n          background-color: #999;\n          border: 1px solid #999;\n          color: #fff;\n          font-family: 'freigMed';\n          font-size: 16px;\n          white-space: pre;\n          margin-left: 30px; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-author .edit-button:hover {\n          background-color: #808080;\n          color: #fff; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-author .wpjhpa-info {\n          text-align: left; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-author .wpjhpa-info h4 {\n            color: #fff;\n            white-space: nowrap; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-author .wpjhpa-info .span-1 {\n            color: #fff;\n            font-size: 14px; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-author .wpjhpa-info .span-2 {\n            padding: 1px 15px;\n            background-color: #999999;\n            border-radius: 4px;\n            font-size: 10px;\n            text-transform: uppercase; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-vote:hover {\n        background-image: url(\"/public/images/Upvote_Icon_b.svg\");\n        background-color: white; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-vote:hover span {\n          color: #222; }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-background {\n        background-image: url(\"/public/images/Upvote_Icon_w.svg\"); }\n  #w-project .wpj-head .wpjh-presentation .wpjhp-background-active {\n        background-image: url(\"/public/images/Upvote_Icon.svg\"); }\n  #w-project .wpj-social {\n    width: 100%;\n    background-color: #fff;\n    height: 50px;\n    border-bottom: 1px solid #e5e5e5; }\n  #w-project .wpj-body {\n    position: relative;\n    background-color: #f9f9f9;\n    padding: 30px; }\n  #w-project .wpj-body .wpjb-container {\n      width: 900px;\n      padding-bottom: 100px;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      margin: auto;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      -webkit-box-align: start;\n          -ms-flex-align: start;\n              align-items: flex-start; }\n  #w-project .wpj-body .wpjb-contents {\n      margin-right: 50px;\n      margin-left: 50px;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box; }\n  #w-project .wpj-body .wpjb-contents .wpjbc-medias {\n        display: inline-block;\n        background-color: #fff;\n        border-radius: 4px;\n        margin-bottom: 25px;\n        overflow: hidden; }\n  #w-project .wpj-body .wpjb-contents .wpjbc-medias .wpjbd-pano {\n          position: relative;\n          left: 0px;\n          width: 460px;\n          height: auto;\n          padding: 20px 20px 15px 20px; }\n  #w-project .wpj-body .wpjb-contents .wpjbc-medias .wpjbd-pano #my_video {\n            width: 100%;\n            width: inherit !important;\n            height: inherit !important; }\n  #w-project .wpj-body .wpjb-contents .wpjbc-medias .wpjbd-pano .wpjbc-video {\n            margin-right: 20px;\n            /*    \t\t\t\t\tmax-height: 260px;\n*/\n            /*\t\t\t\t\t\t.video-js .vjs-tech {\n\t\t\t\t\t\t\tposition: absolute;\n\t\t\t\t\t\t\ttop: 0;\n\t\t\t\t\t\t\tleft: 0;\n\t\t\t\t\t\t\twidth: inherit;\n\t\t\t\t\t\t\theight: 100%;\n\t\t\t\t\t\t}*/ }\n  #w-project .wpj-body .wpjb-contents .wpjbc-medias .wpjbd-pano .video-js .vjs-tech {\n            position: relative;\n            width: inherit;\n            height: inherit; }\n  #w-project .wpj-body .wpjb-contents .wpjbc-medias .wpjbd-pano .video-js .vjs-control-bar {\n            background-color: rgba(0, 0, 0, 0.2);\n            /*\t\t\t\t\t\t\t.vjs-icon-play:before {\n\t\t\t\t\t\t\t\tcontent: '';\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t.vjs-icon-pause:before {\n\t\t\t\t\t\t\t\tcontent: '';\n\t\t\t\t\t\t\t}*/\n            /*\t\t\t\t\t\t\t.vjs-play-control {\n\t\t\t\t\t\t\t\tbackground-image: url(/public/images/play-video-button.svg);\n\t\t\t\t\t\t\t\tbackground-repeat: no-repeat;\n\t\t\t\t\t\t\t\tbackground-size: 10px;\n\t\t\t\t\t\t\t\tbackground-position: center;\n\t\t\t\t\t\t\t}*/ }\n  #w-project .wpj-body .wpjb-contents .wpjbc-medias .wpjbd-pano .video-js .vjs-big-play-button {\n            background-color: rgba(0, 0, 0, 0.4); }\n  #w-project .wpj-body .wpjb-contents .wpjbc-medias .wpjbd-pano .vjs-big-play-centered .vjs-big-play-button {\n            background-image: url(/public/images/play-video-button.svg);\n            background-repeat: no-repeat;\n            background-size: 15px;\n            background-position: center; }\n  #w-project .wpj-body .wpjb-contents .wpjbc-medias .wpjbd-pano .vjs-big-play-centered .vjs-big-play-button:before {\n            content: ''; }\n  #w-project .wpj-body .wpjb-contents .wpjbc-medias .wpjbd-pano img {\n            width: 460px;\n            /*    \t\t\t\t\tmax-height: 260px;\n*/\n            margin-right: 20px; }\n  #w-project .wpj-body .wpjb-contents .wpjbc-medias .wpjbcm-carousel {\n          width: 460px;\n          padding-bottom: 20px;\n          -webkit-box-sizing: border-box;\n                  box-sizing: border-box;\n          overflow: auto;\n          margin: 0 auto; }\n  #w-project .wpj-body .wpjb-contents .wpjbc-medias .wpjbcm-carousel img {\n            width: 40px;\n            height: 40px;\n            margin: 0 5px; }\n  #w-project .wpj-body .wpjb-contents .wpjbc-resumes {\n        width: 500px; }\n  #w-project .wpj-body .wpjb-contents .wpjbc-resumes .resume-picture {\n          width: 30px;\n          height: 30px;\n          border-radius: 50%;\n          -ms-flex-item-align: start;\n              align-self: flex-start; }\n  #w-project .wpj-body .wpjb-contents .wpjbc-resumes .resume-text {\n          padding: 15px;\n          background-color: #fff;\n          border-radius: 4px;\n          width: 460px;\n          -webkit-box-sizing: border-box;\n                  box-sizing: border-box;\n          max-height: 300px;\n          overflow: auto; }\n  #w-project .wpj-body .wpjb-contents .wpjbc-resumes .resume-text .innerHtml {\n            color: #222; }\n  #w-project .wpj-body .wpjb-contents .wpjbc-resumes .image-distort {\n          width: 30px;\n          height: 30px;\n          -ms-flex-item-align: baseline;\n              align-self: baseline; }\n  #w-project .wpj-body .wpjb-contents .wpjbc-resumes .first-resume {\n          margin-bottom: 35px; }\n  #w-project .wpj-body .wpjb-similar {\n      width: 300px;\n      padding-left: 30px;\n      -ms-flex-item-align: baseline;\n          align-self: baseline; }\n  #w-project .wpj-body .wpjb-similar h3 {\n        font-size: 18px;\n        color: #7c7c7c; }\n  #w-project .wpj-body .wpjb-similar .wpjbcs-projects {\n        width: 200px; }\n  #w-project .wpj-body .wpjb-similar .wpjbcs-projects img {\n          width: 36px;\n          border-radius: 4px; }\n  #w-project .wpj-body .wpjb-similar .wpjbcs-projects h5 {\n          color: #2b2b2b;\n          font-size: 16px; }\n  #w-project .wpj-body .wpjb-similar .wpjbcs-projects p {\n          color: #ccc;\n          font-size: 12px; }\n  #w-project .wpjb-sharing {\n    position: absolute;\n    top: 200px;\n    width: 250px;\n    margin-right: 30px;\n    right: 0; }\n  #w-project .wpjb-sharing p {\n      color: #7c7c7c; }\n  #w-project .wpjb-sharing a {\n      background-color: #0084ff; }\n  /******************** MOBILE ****************************/\n  @media only screen and (max-width: 736px) {\n  #w-project {\n    /*\t\twidth: 100vw;\n\t\toverflow-x: hidden;\n*/ }\n    #w-project .wpj-head {\n      height: 500px; }\n      #w-project .wpj-head .wpjh-presentation-mobile {\n        width: 100%;\n        text-align: center;\n        top: 58%;\n        padding: 0 15px;\n        -webkit-box-sizing: border-box;\n                box-sizing: border-box; }\n        #w-project .wpj-head .wpjh-presentation-mobile .logo {\n          width: 70px;\n          height: 70px;\n          border-radius: 4px;\n          border: 1px solid #eeeeee; }\n        #w-project .wpj-head .wpjh-presentation-mobile h2 {\n          font-size: 24px; }\n        #w-project .wpj-head .wpjh-presentation-mobile p {\n          font-size: 18px;\n          margin-bottom: 45px; }\n        #w-project .wpj-head .wpjh-presentation-mobile .wpjhpi-contact {\n          -webkit-box-pack: center;\n              -ms-flex-pack: center;\n                  justify-content: center; }\n          #w-project .wpj-head .wpjh-presentation-mobile .wpjhpi-contact h3 {\n            font-size: 16px;\n            color: #ccc;\n            opacity: 0.8; }\n          #w-project .wpj-head .wpjh-presentation-mobile .wpjhpi-contact .location {\n            -webkit-box-pack: center;\n                -ms-flex-pack: center;\n                    justify-content: center;\n            margin-right: 15px; }\n            #w-project .wpj-head .wpjh-presentation-mobile .wpjhpi-contact .location img {\n              width: 8px;\n              opacity: 0.8; }\n          #w-project .wpj-head .wpjh-presentation-mobile .wpjhpi-contact .category {\n            -webkit-box-pack: center;\n                -ms-flex-pack: center;\n                    justify-content: center; }\n            #w-project .wpj-head .wpjh-presentation-mobile .wpjhpi-contact .category img {\n              width: 10px;\n              opacity: 0.8; }\n        #w-project .wpj-head .wpjh-presentation-mobile .upvote-author {\n          -webkit-box-pack: center;\n              -ms-flex-pack: center;\n                  justify-content: center; }\n          #w-project .wpj-head .wpjh-presentation-mobile .upvote-author a {\n            -webkit-box-align: start;\n                -ms-flex-align: start;\n                    align-items: flex-start; }\n          #w-project .wpj-head .wpjh-presentation-mobile .upvote-author img {\n            width: 40px;\n            border-radius: 50%; }\n          #w-project .wpj-head .wpjh-presentation-mobile .upvote-author .wpjhpa-info h4 {\n            color: #fff; }\n          #w-project .wpj-head .wpjh-presentation-mobile .upvote-author .wpjhpa-info .span-1 {\n            color: #fff;\n            font-size: 14px; }\n          #w-project .wpj-head .wpjh-presentation-mobile .upvote-author .wpjhpa-info .span-2 {\n            padding: 1px 15px;\n            background-color: #999999;\n            border-radius: 4px;\n            font-size: 10px;\n            text-transform: uppercase; }\n          #w-project .wpj-head .wpjh-presentation-mobile .upvote-author .wpjhp-vote {\n            display: inline-block;\n            background-size: 10px;\n            background-position: 14px;\n            padding: 3px 15px 3px 32px;\n            border: 1px solid #fff;\n            border-radius: 4px;\n            margin: 0 30px; }\n            #w-project .wpj-head .wpjh-presentation-mobile .upvote-author .wpjhp-vote span {\n              vertical-align: super; }\n          #w-project .wpj-head .wpjh-presentation-mobile .upvote-author .wpjhp-vote:hover {\n            background-image: url(\"/public/images/Upvote_Icon_b.svg\");\n            background-color: white; }\n            #w-project .wpj-head .wpjh-presentation-mobile .upvote-author .wpjhp-vote:hover span {\n              color: #222; }\n          #w-project .wpj-head .wpjh-presentation-mobile .upvote-author .wpjhp-background {\n            background-image: url(\"/public/images/Upvote_Icon_w.svg\"); }\n          #w-project .wpj-head .wpjh-presentation-mobile .upvote-author .wpjhp-background-active {\n            background-image: url(\"/public/images/Upvote_Icon.svg\"); }\n    #w-project .wpj-social {\n      height: auto;\n      padding: 0 10px;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box; }\n      #w-project .wpj-social .wpjhpi-bar a {\n        font-size: 16px;\n        color: #404040;\n        font-family: 'freigmed';\n        text-align: center;\n        -webkit-box-flex: 1;\n            -ms-flex-positive: 1;\n                flex-grow: 1;\n        padding: 15px 10px; }\n      #w-project .wpj-social .wpjhpi-bar .bubble {\n        font-family: 'Helvetica';\n        background-color: #FF4D4D;\n        margin-left: 2px;\n        padding: 2px 10px;\n        font-size: 13px;\n        border-radius: 16px;\n        position: relative;\n        bottom: 2px; }\n    #w-project .wpj-body {\n      padding: 10px; }\n      #w-project .wpj-body .wpjb-container {\n        width: 100%;\n        padding-bottom: 20px; }\n        #w-project .wpj-body .wpjb-container .wpjb-contents {\n          width: inherit;\n          margin: 0; }\n          #w-project .wpj-body .wpjb-container .wpjb-contents .wpjbc-medias {\n            width: inherit; }\n            #w-project .wpj-body .wpjb-container .wpjb-contents .wpjbc-medias .wpjbd-pano {\n              width: inherit;\n              padding: 10px;\n              -webkit-box-sizing: border-box;\n                      box-sizing: border-box; }\n              #w-project .wpj-body .wpjb-container .wpjb-contents .wpjbc-medias .wpjbd-pano img {\n                width: inherit; }\n              #w-project .wpj-body .wpjb-container .wpjb-contents .wpjbc-medias .wpjbd-pano #my_video {\n                width: 460px; }\n            #w-project .wpj-body .wpjb-container .wpjb-contents .wpjbc-medias .wpjbcm-carousel {\n              width: inherit;\n              padding: 0 10px 10px 10px; }\n          #w-project .wpj-body .wpjb-container .wpjb-contents .wpjbc-resumes {\n            width: 100%; }\n            #w-project .wpj-body .wpjb-container .wpjb-contents .wpjbc-resumes .resume-text {\n              padding: 10px; }\n            #w-project .wpj-body .wpjb-container .wpjb-contents .wpjbc-resumes .first-resume {\n              width: inherit; } }\n"

/***/ }),

/***/ "./src/app/Components/projects/projects.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_message_modal_message_modal_component__ = __webpack_require__("./src/app/Components/modals/message-modal/message-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_popover_login_popover_login_component__ = __webpack_require__("./src/app/Components/modals/popover-login/popover-login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_Projects_projects_service__ = __webpack_require__("./src/app/Services/Projects/projects.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Services_Profiles_profiles_service__ = __webpack_require__("./src/app/Services/Profiles/profiles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Services_Pictures_pictures_service__ = __webpack_require__("./src/app/Services/Pictures/pictures.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Services_meta_service__ = __webpack_require__("./src/app/Services/meta.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Interfaces_Constants_search_project_constant__ = __webpack_require__("./src/app/Interfaces/Constants/search-project.constant.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ng2_page_scroll__ = __webpack_require__("./node_modules/ng2-page-scroll/ng2-page-scroll.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_bootstrap_modal__ = __webpack_require__("./node_modules/ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ngx_facebook__ = __webpack_require__("./node_modules/ngx-facebook/dist/esm/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Animations_animations__ = __webpack_require__("./src/app/Animations/animations.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



/* Components */


/* Services */






/* Librairies */



/* Animation */

var ProjectsComponent = /** @class */ (function () {
    function ProjectsComponent(ProjectsService, ProfilesService, route, router, TokenService, dialogService, FB, PicturesService, PageScrollService, Title, MetaService, document) {
        this.ProjectsService = ProjectsService;
        this.ProfilesService = ProfilesService;
        this.route = route;
        this.router = router;
        this.TokenService = TokenService;
        this.dialogService = dialogService;
        this.FB = FB;
        this.PicturesService = PicturesService;
        this.PageScrollService = PageScrollService;
        this.Title = Title;
        this.MetaService = MetaService;
        this.document = document;
        this.my_project = false;
        this.videoLoad = false;
        this.admin = false;
        this.showPlayer = false;
        // buttonText 		: string
        this.showFilterText = true;
        this.mobile = false;
        this.initWindow();
        this.slideState = 'inactive';
        this.rotateState = 'down';
        __WEBPACK_IMPORTED_MODULE_11_ng2_page_scroll__["b" /* PageScrollConfig */].defaultDuration = 1000;
        __WEBPACK_IMPORTED_MODULE_11_ng2_page_scroll__["b" /* PageScrollConfig */].defaultScrollOffset = 50;
        __WEBPACK_IMPORTED_MODULE_11_ng2_page_scroll__["b" /* PageScrollConfig */].defaultEasingLogic = {
            ease: function (t, b, c, d) {
                // easeInOutExpo easing
                if (t === 0)
                    return b;
                if (t === d)
                    return b + c;
                if ((t /= d / 2) < 1)
                    return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        };
    }
    ProjectsComponent.prototype.ngOnInit = function () {
        this.initModels();
        this.initParams();
        this.reloadOnParamsChange();
    };
    ProjectsComponent.prototype.showVideoPlayer = function () {
        var _this = this;
        this.showPlayer = true;
        setTimeout(function () {
            _this.videoJSplayer = window["videojs"](document.getElementById('my_video'), {}, function () { });
        }, 0);
    };
    ProjectsComponent.prototype.ngOnDestroy = function () {
        if (this.videoJSplayer)
            this.videoJSplayer.dispose();
    };
    ProjectsComponent.prototype.reloadOnParamsChange = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            if (_this.videoJSplayer) {
                _this.videoJSplayer.dispose();
                _this.videoJSplayer = null;
            }
            _this.showPlayer = false;
            _this.initModels();
            _this.initParams();
        });
    };
    ProjectsComponent.prototype.initWindow = function () {
        window.scrollTo(0, 0);
        if ((window.screen.width) < 736)
            this.mobile = true;
    };
    ProjectsComponent.prototype.initModels = function () {
        this.searchBody = __WEBPACK_IMPORTED_MODULE_10__Interfaces_Constants_search_project_constant__["a" /* searchProject */];
        // this.buttonText 	= 'more'
    };
    ProjectsComponent.prototype.initServices = function (public_id) {
        this.getProject(public_id);
    };
    ProjectsComponent.prototype.initParams = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.initServices(params['public_id']);
        });
        setTimeout(function () {
            _this.route.queryParams.subscribe(function (params) {
                _this.goToDiscussion("#" + params['discussion']);
            });
        }, 1000);
    };
    // initSEO() {
    // 	const url = 'https://www.wittycircle.com' + this.router.url
    // 	this.meta.setTitle(`${this.project['title']} | Wittycircle`);
    // 	this.meta.setTag('og:description', this.project['description'])
    // 	this.meta.setTag('og:image', this.project['picture']);
    // 	this.meta.setTag('og:url', url);
    // }
    ProjectsComponent.prototype.setMetaData = function () {
        var url = 'https://www.wittycircle.com' + this.router.url;
        this.Title.setTitle(this.project['title'] + " | Witty");
        this.MetaService.setMeta('description', this.project['description']);
        this.MetaService.setMeta('og:title', this.project['title'] + ' - Witty');
        this.MetaService.setMeta('og:description', this.project['description']);
        this.MetaService.setMeta('og:url', url);
        this.MetaService.setMeta('og:image', this.project['logo'] || this.project['picture']);
    };
    ProjectsComponent.prototype.getProject = function (public_id) {
        var _this = this;
        this.ProjectsService.getProject(public_id).subscribe(function (res) {
            _this.project = res.project;
            if (!_this.project)
                return _this.router.navigate(['/welcome']);
            if (_this.project.video)
                _this.showVideoPlayer();
            _this.getPermission(_this.project.profile_id);
            _this.getAuthorProfile(_this.project.profile_id);
            _this.searchSimilarProjects();
            _this.setMetaData();
        });
    };
    ProjectsComponent.prototype.getPermission = function (profile_id) {
        var token = this.TokenService.getToken();
        if (token) {
            this.my_id = token.user.id;
            this.my_project = token.user.id === profile_id ? true : false;
            this.admin = token.user.moderator ? true : false;
        }
    };
    ProjectsComponent.prototype.getAuthorProfile = function (profile_id) {
        var _this = this;
        this.ProfilesService.getProfile(profile_id).subscribe(function (res) {
            _this.author = res.profile;
        });
    };
    ProjectsComponent.prototype.getAddress = function (place) {
        console.log(place);
    };
    ProjectsComponent.prototype.searchSimilarProjects = function () {
        var _this = this;
        this.searchBody.query.members[1].value = this.project.category;
        this.searchBody.paginate.limit = 7;
        this.ProjectsService.searchProject(this.searchBody).subscribe(function (res) {
            _this.similarProjects = res.projects;
        });
    };
    ProjectsComponent.prototype.followProject = function (id) {
        var _this = this;
        if (!this.TokenService.getToken())
            return this.showLoginPopOver();
        this.ProjectsService.followProject(id, {}).subscribe(function (res) {
            if (res.success && res.type === "Like") {
                _this.project['follower_count'] += 1;
                _this.project['hasLiked'] = true;
            }
            else {
                _this.project['follower_count'] -= 1;
                _this.project['hasLiked'] = false;
            }
        });
    };
    ProjectsComponent.prototype.editProject = function (public_id) {
        this.router.navigate(['/project/update'], { queryParams: { id: public_id } });
    };
    ProjectsComponent.prototype.showText = function () {
        var _this = this;
        this.slideState = this.slideState === 'inactive' ? 'active' : 'inactive';
        this.rotateState = this.rotateState === 'down' ? 'up' : 'down';
        if (this.showFilterText) {
            this.showFilterText = false;
        }
        else {
            setTimeout(function () {
                _this.showFilterText = true;
            }, 800);
        }
    };
    ProjectsComponent.prototype.shareFacebook = function () {
        var params = {
            method: 'feed',
            name: this.project.title,
            link: 'https://www.wittycircle.com/project/' + this.project.public_id + '/' + this.transformUrl(this.project.title),
            picture: this.project.picture,
            caption: 'Wittycircle.com',
            description: this.project.description
        };
        this.FB.ui(params)
            .then(function (res) { return console.log(res); })
            .catch(function (e) { return console.error(e); });
    };
    ProjectsComponent.prototype.goToDiscussion = function (id) {
        var pageScrollInstance = __WEBPACK_IMPORTED_MODULE_11_ng2_page_scroll__["c" /* PageScrollInstance */].simpleInstance(this.document, id);
        this.PageScrollService.start(pageScrollInstance);
    };
    ;
    ProjectsComponent.prototype.shortUrl = function (public_id, title) {
        return 'https://www.wittycircle.com/project/' + public_id + '/' + this.transformUrl(title);
    };
    ProjectsComponent.prototype.transformUrl = function (url) {
        url = url.replace(/ /g, '-');
        return url;
    };
    ProjectsComponent.prototype.transformImage = function (url, width, height, crop) {
        return this.PicturesService.transformImage(url, width, height, crop);
    };
    ProjectsComponent.prototype.transformLink = function (link) {
        return link.slice((link.indexOf('/') + 2), link.length);
    };
    ProjectsComponent.prototype.slideCarousel = function (index, type) {
        if (type === 'picture' && this.project.video)
            index = index + 1;
        this.leftPixel = (index * -480).toString() + 'px';
    };
    ProjectsComponent.prototype.getDiscussionNumber = function (number) {
        this.d_length = number;
    };
    /* SHOW MODAL */
    ProjectsComponent.prototype.showMessageModal = function () {
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_3__modals_message_modal_message_modal_component__["a" /* MessageModalComponent */], {
            profile: this.author
        });
    };
    ProjectsComponent.prototype.showLoginPopOver = function () {
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_4__modals_popover_login_popover_login_component__["a" /* PopoverLoginComponent */], {});
    };
    ProjectsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-projects',
            template: __webpack_require__("./src/app/Components/projects/projects.component.html"),
            styles: [__webpack_require__("./src/app/Components/projects/projects.component.scss")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
            animations: [__WEBPACK_IMPORTED_MODULE_14__Animations_animations__["j" /* projectAnim */], __WEBPACK_IMPORTED_MODULE_14__Animations_animations__["k" /* projectAnim2 */], __WEBPACK_IMPORTED_MODULE_14__Animations_animations__["l" /* projectAnim3 */]],
            providers: [
                __WEBPACK_IMPORTED_MODULE_13_ngx_facebook__["b" /* FacebookService */],
                __WEBPACK_IMPORTED_MODULE_11_ng2_page_scroll__["d" /* PageScrollService */],
            ]
        }),
        __param(11, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["DOCUMENT"])),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__Services_Projects_projects_service__["a" /* ProjectsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_Projects_projects_service__["a" /* ProjectsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6__Services_Profiles_profiles_service__["a" /* ProfilesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__Services_Profiles_profiles_service__["a" /* ProfilesService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_7__Services_Authentication_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__Services_Authentication_token_service__["a" /* TokenService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_12_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12_ng2_bootstrap_modal__["DialogService"]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_13_ngx_facebook__["b" /* FacebookService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_13_ngx_facebook__["b" /* FacebookService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_8__Services_Pictures_pictures_service__["a" /* PicturesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__Services_Pictures_pictures_service__["a" /* PicturesService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_11_ng2_page_scroll__["d" /* PageScrollService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11_ng2_page_scroll__["d" /* PageScrollService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["Title"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["Title"]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_9__Services_meta_service__["a" /* MetaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__Services_meta_service__["a" /* MetaService */]) === "function" && _l || Object, Object])
    ], ProjectsComponent);
    return ProjectsComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
}());

//# sourceMappingURL=projects.component.js.map

/***/ }),

/***/ "./src/app/Components/projects/projects.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectsModule", function() { return ProjectsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__ = __webpack_require__("./src/app/Pipes/pipe.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__footer_footer_module__ = __webpack_require__("./src/app/Components/footer/footer.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__projects_component__ = __webpack_require__("./src/app/Components/projects/projects.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__project_needs_project_needs_component__ = __webpack_require__("./src/app/Components/projects/project-needs/project-needs.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__project_discussions_project_discussions_component__ = __webpack_require__("./src/app/Components/projects/project-discussions/project-discussions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modals_modal_module__ = __webpack_require__("./src/app/Components/modals/modal.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Services_Projects_projects_service__ = __webpack_require__("./src/app/Services/Projects/projects.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Services_Profiles_profiles_service__ = __webpack_require__("./src/app/Services/Profiles/profiles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Services_Pictures_pictures_service__ = __webpack_require__("./src/app/Services/Pictures/pictures.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Services_Projects_project_discussions_service__ = __webpack_require__("./src/app/Services/Projects/project-discussions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Services_Projects_project_reply_discussion_service__ = __webpack_require__("./src/app/Services/Projects/project-reply-discussion.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__Directives_Projects_project_discussion_directive__ = __webpack_require__("./src/app/Directives/Projects/project-discussion.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ng2_page_scroll__ = __webpack_require__("./node_modules/ng2-page-scroll/ng2-page-scroll.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angular2_moment__ = __webpack_require__("./node_modules/angular2-moment/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__Routes_projects_routes__ = __webpack_require__("./src/app/Routes/projects.routes.ts");
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
// import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';


/* Route */

var ProjectsModule = /** @class */ (function () {
    function ProjectsModule() {
    }
    ProjectsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_18__Routes_projects_routes__["a" /* PROJECT_ROUTES */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["f" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_17_angular2_moment__["MomentModule"],
                __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__["a" /* PipeModule */],
                __WEBPACK_IMPORTED_MODULE_5__footer_footer_module__["a" /* FooterModule */],
                __WEBPACK_IMPORTED_MODULE_9__modals_modal_module__["a" /* ModalModule */],
                __WEBPACK_IMPORTED_MODULE_16_ng2_page_scroll__["a" /* Ng2PageScrollModule */].forRoot(),
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__projects_component__["a" /* ProjectsComponent */],
                __WEBPACK_IMPORTED_MODULE_7__project_needs_project_needs_component__["a" /* ProjectNeedsComponent */],
                __WEBPACK_IMPORTED_MODULE_8__project_discussions_project_discussions_component__["a" /* ProjectDiscussionsComponent */],
                __WEBPACK_IMPORTED_MODULE_15__Directives_Projects_project_discussion_directive__["a" /* ProjectDiscussionDirective */],
            ],
            entryComponents: [],
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__Services_Projects_projects_service__["a" /* ProjectsService */],
                __WEBPACK_IMPORTED_MODULE_11__Services_Profiles_profiles_service__["a" /* ProfilesService */],
                __WEBPACK_IMPORTED_MODULE_12__Services_Pictures_pictures_service__["a" /* PicturesService */],
                __WEBPACK_IMPORTED_MODULE_13__Services_Projects_project_discussions_service__["a" /* ProjectDiscussionsService */],
                __WEBPACK_IMPORTED_MODULE_14__Services_Projects_project_reply_discussion_service__["a" /* ProjectReplyDiscussionService */]
            ]
        })
    ], ProjectsModule);
    return ProjectsModule;
}());

//# sourceMappingURL=projects.module.js.map

/***/ }),

/***/ "./src/app/Directives/Projects/project-discussion.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectDiscussionDirective; });
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

var ProjectDiscussionDirective = /** @class */ (function () {
    function ProjectDiscussionDirective(el) {
        this.el = el;
        this.nativeElement = el.nativeElement;
    }
    // showAddComent(target) {
    // 	if (this.nativeElement.querySelector('#wpjdh-2').style.maxHeight !== '200px')
    // 		this.nativeElement.querySelector('#wpjdh-2').style.maxHeight = '200px'
    // 	else
    // 		this.hideAddComment(target)
    // 	}
    // hideAddComment(target) {
    // 	if (this.nativeElement.querySelector('#wpjdh-2').contains(target))
    // 		return ;
    // 	else
    // 		this.nativeElement.querySelector('#wpjdh-2').style.maxHeight = '0'
    // }
    ProjectDiscussionDirective.prototype.showReplyToComment = function (event_id) {
        var id = '#pfmcbox' + event_id.substr(event_id.indexOf('-'), event_id.length);
        if (this.nativeElement.querySelector(id).style.maxHeight !== '200px')
            this.nativeElement.querySelector(id).style.maxHeight = '200px';
        else
            this.hideReplyToComment(id);
    };
    ProjectDiscussionDirective.prototype.hideReplyToComment = function (id) {
        this.nativeElement.querySelector(id).style.maxHeight = '0';
    };
    ProjectDiscussionDirective.prototype.showUpdateComment = function (event_id) {
        var id = '#pfmtbox' + event_id.substr(event_id.indexOf('-'), event_id.length);
        if (this.nativeElement.querySelector(id).style.maxHeight !== '200px') {
            this.nativeElement.querySelector(id).style.maxHeight = '200px';
            this.nativeElement.querySelector(id).style.marginBottom = '20px';
        }
        else
            this.hideUpdateComment(id);
    };
    ProjectDiscussionDirective.prototype.hideUpdateComment = function (id) {
        this.nativeElement.querySelector(id).style.maxHeight = '0';
        this.nativeElement.querySelector(id).style.marginBottom = '0px';
    };
    ProjectDiscussionDirective.prototype.showUpdateReply = function (event_id) {
        var id = '#pfcbox' + event_id.substr(event_id.indexOf('-'), event_id.length);
        if (this.nativeElement.querySelector(id).style.maxHeight !== '200px')
            this.nativeElement.querySelector(id).style.maxHeight = '200px';
        else
            this.hideReplyToComment(id);
    };
    ProjectDiscussionDirective.prototype.hideUpdateReply = function (id) {
        this.nativeElement.querySelector(id).style.maxHeight = '0';
    };
    ProjectDiscussionDirective.prototype.onClick = function (event) {
        if (event.target.id.indexOf('pfmc') >= 0) {
            this.showReplyToComment(event.target.id);
            // this.hideAddComment(event.target);
        }
        else if (event.target.id.indexOf('pfmt') >= 0) {
            this.showUpdateComment(event.target.id);
            // this.hideAddComment(event.target);
        }
        else if (event.target.id.indexOf('pfc') >= 0) {
            this.showUpdateReply(event.target.id);
            // this.hideAddComment(event.target);
        } // } else {
        // 	this.hideAddComment(event.target);
        // }
    };
    ProjectDiscussionDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[projectDiscussionDiv]',
            host: {
                '(document:click)': 'onClick($event)',
            },
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
    ], ProjectDiscussionDirective);
    return ProjectDiscussionDirective;
    var _a;
}());

//# sourceMappingURL=project-discussion.directive.js.map

/***/ }),

/***/ "./src/app/Routes/projects.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PROJECT_ROUTES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Components_projects_projects_component__ = __webpack_require__("./src/app/Components/projects/projects.component.ts");

/* Components */

/* Librairies */
var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__Components_projects_projects_component__["a" /* ProjectsComponent */] },
];
var PROJECT_ROUTES = __WEBPACK_IMPORTED_MODULE_0__angular_router__["f" /* RouterModule */].forChild(routes);
//# sourceMappingURL=projects.routes.js.map

/***/ }),

/***/ "./src/app/Services/Projects/project-discussions.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectDiscussionsService; });
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




var ProjectDiscussionsService = /** @class */ (function () {
    function ProjectDiscussionsService(http, AuthHttp) {
        this.http = http;
        this.AuthHttp = AuthHttp;
    }
    // Get all project's discussions
    ProjectDiscussionsService.prototype.getDiscussions = function (id) {
        var url = 'http://localhost:3000/api/projects/' + id + '/discussions';
        return this.AuthHttp.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    // Create new project's discussion
    ProjectDiscussionsService.prototype.createDiscussion = function (id, body) {
        var url = 'http://localhost:3000/api/projects/' + id + '/discussions';
        return this.AuthHttp.post(url, body)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    // Update project's discussion
    ProjectDiscussionsService.prototype.updateDiscussion = function (id, body) {
        var url = 'http://localhost:3000/api/discussions/' + id; // TODO: Secure update for only creator who will be able to modify
        return this.AuthHttp.put(url, body)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    // Like project's discussion
    ProjectDiscussionsService.prototype.likeDiscussion = function (id, body) {
        var url = 'http://localhost:3000/api/discussions/' + id + '/like';
        return this.AuthHttp.post(url, body)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    // Unlike project's discussion
    ProjectDiscussionsService.prototype.unlikeDiscussion = function (id) {
        var url = 'http://localhost:3000/api/discussions/' + id + '/like';
        return this.AuthHttp.delete(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    // Remove discussion from project
    ProjectDiscussionsService.prototype.deleteDiscussion = function (id) {
        var url = 'http://localhost:3000/api/discussions/' + id;
        return this.AuthHttp.delete(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    ProjectDiscussionsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_bearer__["AuthHttp"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng2_bearer__["AuthHttp"]) === "function" && _b || Object])
    ], ProjectDiscussionsService);
    return ProjectDiscussionsService;
    var _a, _b;
}());

//# sourceMappingURL=project-discussions.service.js.map

/***/ }),

/***/ "./src/app/Services/Projects/project-reply-discussion.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectReplyDiscussionService; });
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




var ProjectReplyDiscussionService = /** @class */ (function () {
    function ProjectReplyDiscussionService(http, AuthHttp) {
        this.http = http;
        this.AuthHttp = AuthHttp;
    }
    // Get all discussion's replies
    ProjectReplyDiscussionService.prototype.getReplies = function (id) {
        var url = 'http://localhost:3000/api/discussions/' + id + '/replies';
        return this.AuthHttp.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    // Create a discussion's reply
    ProjectReplyDiscussionService.prototype.createReply = function (id, body) {
        var url = 'http://localhost:3000/api/discussions/' + id + '/replies';
        return this.AuthHttp.post(url, body)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    // Update a discussion's reply
    ProjectReplyDiscussionService.prototype.updateReply = function (id, body) {
        var url = 'http://localhost:3000/api/replies/' + id;
        return this.AuthHttp.put(url, body)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    // Like a discussion's reply
    ProjectReplyDiscussionService.prototype.likeReply = function (id, body) {
        var url = 'http://localhost:3000/api/replies/' + id + '/like';
        return this.AuthHttp.post(url, body) // TODO: Do I need body as paramater ? Because POST method need an Object as parameter.
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    // Unlike a discussion's reply
    ProjectReplyDiscussionService.prototype.unlikeRepley = function (id) {
        var url = 'http://localhost:3000/api/replies/' + id + '/like';
        return this.AuthHttp.delete(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    // Remove a discussion's reply
    ProjectReplyDiscussionService.prototype.deleteReply = function (id) {
        var url = 'http://localhost:3000/api/replies/' + id;
        return this.AuthHttp.delete(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    ProjectReplyDiscussionService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_bearer__["AuthHttp"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng2_bearer__["AuthHttp"]) === "function" && _b || Object])
    ], ProjectReplyDiscussionService);
    return ProjectReplyDiscussionService;
    var _a, _b;
}());

//# sourceMappingURL=project-reply-discussion.service.js.map

/***/ })

});
//# sourceMappingURL=projects.module.chunk.js.map