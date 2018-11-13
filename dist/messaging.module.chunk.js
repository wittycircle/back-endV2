webpackJsonp(["messaging.module"],{

/***/ "./src/app/Components/messaging/messaging.component.html":
/***/ (function(module, exports) {

module.exports = "<section id=\"w-messages\" *ngIf=\"!mobile\">\n\t<div *ngIf=\"profile\">\n\t\t<div class=\"wm-head bg-default\" [ngStyle]=\"{'background-image': 'url(' + profile.cover_picture + ')'}\">\n\t\t\t<div class=\"filter\"></div>\n\t\t\t<div class=\"wmh-presentation flex align-center\">\n\t\t\t\t<h1 class=\"freigs flex-grow\">Messages</h1>\n\t\t\t\t<button class=\"freigm cursor-pt\" (click)=\"showSearchUsersModal(1)\">New Message</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class=\"wm-body\">\n\t\t<div class=\"wm-body-background flex\">\n\t\t\t<div class=\"wmb-room\">\n\t\t\t\t<div class=\"wmbr-input bb\">\n\t\t\t\t\t<input type=\"text\" name=\"searchRoom\" placeholder=\"Search users or messages\" [(ngModel)]=\"searchContact\"/>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"wmbr-users\" *ngIf=\"discussions\">\n\t\t\t\t\t<div class=\"wmbru-user flex cursor-pt\" [ngClass]=\"{ 'active-message' : (tab === discussion.id) || !discussion.read }\" *ngFor=\"let discussion of (discussions | searchPipe: 'members[0]': searchContact: 'full_name'); let i = index\" (click)=\"showMessage(i)\">\n\t\t\t\t\t\t<img class=\"mar-r-15\" [src]=\"discussion.members[0].picture\" alt=\"profile_picture\"/>\n\t\t\t\t\t\t<div class=\"wmbruu-info\">\n\t\t\t\t\t\t\t<div class=\"on-off flex\">\n\t\t\t\t\t\t\t\t<i class=\"mar-r-5\" [ngClass]=\"{'on': discussion.members[0].online, 'off': !discussion.members[0].online}\"></i>\n\t\t\t\t\t\t\t\t<h4 class=\"freigs\">{{ discussion.members[0].full_name }}</h4>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<p class=\"freigb innerHtml mar-b-5\" [innerHtml]=\"discussion.last_message | sanitizeHtml\"></p>\n\t\t\t\t\t\t\t<span class=\"freigb\">{{ discussion.date | amTimeAgo }}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"wmb-message\" *ngIf=\"chat.id !== 0\">\n\t\t\t\t<div class=\"wmbm-nav flex\">\n\t\t\t\t\t<div class=\"wmbmn-title flex flex-grow\">\n\t\t\t\t\t\t<img class=\"mar-r-15\" *ngIf=\"chat.picture\" [src]=\"chat.picture\" alt=\"profile_picture\"/>\n\t\t\t\t\t\t<h2 class=\"freigs\">Conversation with {{ chat.full_name }}</h2>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"wmbmn-options flex\">\n\t\t\t\t\t\t<h2 class=\"freigb mar-r-10\">Actions</h2>\n\t\t\t\t\t\t<img src=\"/public/images/arrow-down-icon-b.svg\" alt=\"arrow\"/>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"wmbm-messsages\" #scrollBottom>\n\t\t\t\t\t<div class=\"wmbmm-message flex\" *ngFor=\"let message of messages\">\n\t\t\t\t\t\t<img class=\"mar-r-15\" [src]=\"message.sender_picture\" alt=\"profile_picture\"/>\n\t\t\t\t\t\t<div class=\"wmbmmm-text flex-grow\">\n\t\t\t\t\t\t\t<h4 class=\"freigs\">{{ message.name }}</h4>\n\t\t\t\t\t\t\t<p class=\"freigb innerHtml\" [innerHtml]=\"message.message | sanitizeHtml\"></p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<span class=\"freigm\">{{ message.creation_date | amTimeAgo }}</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"wmbm-textarea\">\n\t\t\t\t\t<textarea placeholder=\"Write a reply...\" [(ngModel)]=\"message\" name=\"message\"></textarea>\n\t\t\t\t\t<button (click)=\"sendMessage()\">Send</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t</div>\n\t</div>\n</section>\n\n<section id=\"w-messages-mobile\" *ngIf=\"mobile\">\n\t<div class=\"wmm-head flex\">\n\t\t<input type=\"text\" name=\"name\" placeholder=\"Search users or messages\" [(ngModel)]=\"searchContact\" />\n\t\t<img src=\"/public/images/write-icon-g.svg\" atl=\"new_message\" (click)=\"showSearchUsersModal(1)\" />\n\t\t<a [routerLink]=\"['/']\"><i class=\"fa fa-home\"></i></a>\n\t</div>\n\t<div class=\"wmm-discussions\" *ngIf=\"discussions\">\n\t\t<div class=\"wmmd-discussion flex\" *ngFor=\"let discussion of (discussions | searchPipe: 'members[0]': searchContact: 'full_name'); let i = index\" (click)=\"showMessage(i, 1)\" [ngClass]=\"{ 'active-message' : !discussion.read }\">\n\t\t\t<img class=\"mar-r-15\" [src]=\"discussion.members[0].picture\" alt=\"profile_picture\" />\n\t\t\t<div class=\"wmmdd-message\">\n\t\t\t\t<div class=\"wmmddm-info flex\">\n\t\t\t\t\t<i class=\"mar-r-5\" [ngClass]=\"{'on': discussion.members[0].online, 'off': !discussion.members[0].online}\"></i>\n\t\t\t\t\t<h3 class=\"freigm\">{{ discussion.members[0].full_name }}</h3>\n\t\t\t\t</div>\n\t\t\t\t<p class=\"freigb innerHtml mar-b-5\" [innerHtml]=\"discussion.last_message | sanitizeHtml\"></p>\n\t\t\t\t<span class=\"freigb\">{{ discussion.date | amTimeAgo }}</span>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</section>\n<app-footer></app-footer>\n\n"

/***/ }),

/***/ "./src/app/Components/messaging/messaging.component.scss":
/***/ (function(module, exports) {

module.exports = "#w-messages .wm-head {\n  height: 200px;\n  position: relative; }\n  #w-messages .wm-head .wmh-presentation {\n    position: absolute;\n    width: 1000px;\n    left: 0;\n    right: 0;\n    margin: 0 auto;\n    margin-top: 30px; }\n  #w-messages .wm-head .wmh-presentation h1 {\n      font-size: 32px; }\n  #w-messages .wm-head .wmh-presentation button {\n      background-image: url(/public/images/write-icon.svg);\n      background-color: transparent;\n      border: 1px solid #fff;\n      padding-left: 45px;\n      background-repeat: no-repeat;\n      background-size: 18px;\n      background-position: 15px 48%; }\n  #w-messages .wm-head .wmh-presentation button:hover {\n      background-image: url(/public/images/write-icon-b.svg);\n      background-color: #fff;\n      color: #222; }\n  #w-messages .wm-body {\n  background-color: #fafafa; }\n  #w-messages .wm-body img {\n    width: 40px; }\n  #w-messages .wm-body .wm-body-background {\n    width: 1000px;\n    margin: 0 auto;\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start; }\n  #w-messages .wm-body .wm-body-background .wmb-room {\n      width: 35%;\n      border-right: 1px solid #e5e5e5; }\n  #w-messages .wm-body .wm-body-background .wmb-room .wmbr-input {\n        padding: 25px 0;\n        border-bottom: 1px solid #e5e5e5;\n        padding-right: 30px; }\n  #w-messages .wm-body .wm-body-background .wmb-room .wmbr-input input {\n          margin: 0;\n          width: 100%;\n          background-image: url(/public/images/search-icon-b.svg);\n          background-repeat: no-repeat;\n          background-position: 3% 50%; }\n  #w-messages .wm-body .wm-body-background .wmb-room .wmbr-users {\n        height: 450px;\n        overflow-y: auto; }\n  #w-messages .wm-body .wm-body-background .wmb-room .wmbr-users .wmbru-user {\n          -webkit-box-align: start;\n              -ms-flex-align: start;\n                  align-items: flex-start;\n          padding: 15px 0 15px 15px;\n          border-bottom: 1px solid #e5e5e5; }\n  #w-messages .wm-body .wm-body-background .wmb-room .wmbr-users .wmbru-user h4, #w-messages .wm-body .wm-body-background .wmb-room .wmbr-users .wmbru-user p {\n            color: #222; }\n  #w-messages .wm-body .wm-body-background .wmb-room .wmbr-users .wmbru-user span {\n            color: #999;\n            font-size: 14px; }\n  #w-messages .wm-body .wm-body-background .wmb-room .wmbr-users .wmbru-user img {\n            border-radius: 50%; }\n  #w-messages .wm-body .wm-body-background .wmb-room .wmbr-users .wmbru-user p {\n            font-size: 15px; }\n  #w-messages .wm-body .wm-body-background .wmb-room .wmbr-users .wmbru-user .wmbruu-info .on-off {\n            -webkit-box-align: center;\n                -ms-flex-align: center;\n                    align-items: center; }\n  #w-messages .wm-body .wm-body-background .wmb-room .wmbr-users .wmbru-user .wmbruu-info .on-off .on {\n              width: 10px;\n              height: 10px;\n              background: #42B72A;\n              border-radius: 50px;\n              margin-right: 5px; }\n  #w-messages .wm-body .wm-body-background .wmb-room .wmbr-users .wmbru-user .wmbruu-info .on-off .off {\n              width: 10px;\n              height: 10px;\n              background: gray;\n              border-radius: 50px;\n              margin-right: 5px; }\n  #w-messages .wm-body .wm-body-background .wmb-room .wmbr-users .wmbru-user .wmbruu-info p {\n            max-height: 25px;\n            overflow-y: hidden; }\n  #w-messages .wm-body .wm-body-background .wmb-room .wmbr-users .wmbru-user:hover {\n          background-color: #e9edf3; }\n  #w-messages .wm-body .wm-body-background .wmb-room .wmbr-users .wmbru-user:hover h4, #w-messages .wm-body .wm-body-background .wmb-room .wmbr-users .wmbru-user:hover p, #w-messages .wm-body .wm-body-background .wmb-room .wmbr-users .wmbru-user:hover span {\n            color: #5471A3; }\n  #w-messages .wm-body .wm-body-background .wmb-room .wmbr-users .active-message {\n          background-color: #e9edf3; }\n  #w-messages .wm-body .wm-body-background .wmb-room .wmbr-users .active-message h4, #w-messages .wm-body .wm-body-background .wmb-room .wmbr-users .active-message p, #w-messages .wm-body .wm-body-background .wmb-room .wmbr-users .active-message span {\n            color: #5471A3; }\n  #w-messages .wm-body .wm-body-background .wmb-message {\n      width: 65%;\n      border-right: 1px solid #e5e5e5; }\n  #w-messages .wm-body .wm-body-background .wmb-message h2 {\n        font-size: 18px; }\n  #w-messages .wm-body .wm-body-background .wmb-message .wmbm-nav {\n        padding: 15px 30px;\n        border-bottom: 1px solid #e5e5e5; }\n  #w-messages .wm-body .wm-body-background .wmb-message .wmbm-nav .wmbmn-title h2 {\n          color: #222; }\n  #w-messages .wm-body .wm-body-background .wmb-message .wmbm-nav .wmbmn-title img {\n          border-radius: 50%; }\n  #w-messages .wm-body .wm-body-background .wmb-message .wmbm-nav .wmbmn-options {\n          -webkit-box-align: baseline;\n              -ms-flex-align: baseline;\n                  align-items: baseline; }\n  #w-messages .wm-body .wm-body-background .wmb-message .wmbm-nav .wmbmn-options img {\n            width: 11px; }\n  #w-messages .wm-body .wm-body-background .wmb-message .wmbm-nav .wmbmn-options h2 {\n            color: #999; }\n  #w-messages .wm-body .wm-body-background .wmb-message .wmbm-messsages {\n        background-color: #fff;\n        border-bottom: 1px solid #e5e5e5;\n        height: 300px;\n        overflow-y: auto; }\n  #w-messages .wm-body .wm-body-background .wmb-message .wmbm-messsages .wmbmm-message {\n          -webkit-box-align: start;\n              -ms-flex-align: start;\n                  align-items: flex-start;\n          padding: 15px 30px;\n          border-bottom: 1px solid #fafafa; }\n  #w-messages .wm-body .wm-body-background .wmb-message .wmbm-messsages .wmbmm-message img {\n            width: 36px;\n            border-radius: 50%; }\n  #w-messages .wm-body .wm-body-background .wmb-message .wmbm-messsages .wmbmm-message .wmbmmm-text h4, #w-messages .wm-body .wm-body-background .wmb-message .wmbm-messsages .wmbmm-message .wmbmmm-text p {\n            color: #222; }\n  #w-messages .wm-body .wm-body-background .wmb-message .wmbm-messsages .wmbmm-message .wmbmmm-text p {\n            word-break: break-word;\n            font-size: 15px; }\n  #w-messages .wm-body .wm-body-background .wmb-message .wmbm-messsages .wmbmm-message span {\n            font-size: 14px;\n            color: #999;\n            -ms-flex-negative: 0;\n                flex-shrink: 0; }\n  #w-messages .wm-body .wm-body-background .wmb-message .wmbm-textarea {\n        padding: 20px;\n        margin: 0; }\n  #w-messages .wm-body .wm-body-background .wmb-message .wmbm-textarea textarea {\n          border-radius: 4px; }\n  #w-messages .wm-body .wm-body-background .wmb-message .wmbm-textarea button {\n          margin: 0;\n          border-radius: 4px;\n          display: block;\n          margin-left: auto; }\n  /******************** MOBILE ****************************/\n  @media only screen and (max-width: 736px) {\n  #w-messages-mobile {\n    position: fixed;\n    width: 100vw;\n    height: 100vh;\n    overflow: hidden;\n    background-color: #fff;\n    z-index: 10000; }\n    #w-messages-mobile .wmm-head {\n      padding: 5px 10px;\n      border-bottom: 1px solid #e5e5e5;\n      background-color: #fafafa; }\n      #w-messages-mobile .wmm-head input {\n        margin: 0;\n        margin-right: 15px;\n        -webkit-box-flex: 1;\n            -ms-flex-positive: 1;\n                flex-grow: 1;\n        background-repeat: no-repeat;\n        background-position: 10px 50%;\n        background-image: url(\"/public/images/search-icon-b.svg\"); }\n      #w-messages-mobile .wmm-head img {\n        width: 20px;\n        padding: 10px; }\n      #w-messages-mobile .wmm-head i {\n        color: #999;\n        font-size: 22px;\n        padding: 10px; }\n    #w-messages-mobile .wmm-discussions {\n      height: 100vh;\n      overflow: auto;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      padding-bottom: 150px; }\n      #w-messages-mobile .wmm-discussions .active-message {\n        background-color: #e9edf3; }\n        #w-messages-mobile .wmm-discussions .active-message h4, #w-messages-mobile .wmm-discussions .active-message p, #w-messages-mobile .wmm-discussions .active-message span {\n          color: #5471A3; }\n      #w-messages-mobile .wmm-discussions .wmmd-discussion {\n        padding: 15px 10px;\n        border-bottom: 1px solid #e5e5e5; }\n        #w-messages-mobile .wmm-discussions .wmmd-discussion img {\n          width: 50px;\n          height: 50px;\n          border-radius: 50%; }\n        #w-messages-mobile .wmm-discussions .wmmd-discussion .wmmdd-message .wmmddm-info .off {\n          width: 10px;\n          height: 10px;\n          background: gray;\n          border-radius: 50px;\n          margin-right: 5px; }\n        #w-messages-mobile .wmm-discussions .wmmd-discussion .wmmdd-message .wmmddm-info .on {\n          width: 10px;\n          height: 10px;\n          background: #42B72A;\n          border-radius: 50px;\n          margin-right: 5px; }\n        #w-messages-mobile .wmm-discussions .wmmd-discussion .wmmdd-message h3, #w-messages-mobile .wmm-discussions .wmmd-discussion .wmmdd-message p {\n          color: #222; }\n        #w-messages-mobile .wmm-discussions .wmmd-discussion .wmmdd-message span {\n          color: #999;\n          font-size: 14px; } }\n"

/***/ }),

/***/ "./src/app/Components/messaging/messaging.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_search_modal_user_search_modal_user_component__ = __webpack_require__("./src/app/Components/modals/search-modal-user/search-modal-user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_message_modal_message_modal_component__ = __webpack_require__("./src/app/Components/modals/message-modal/message-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_mobile_modals_messages_mobile_modal_messages_mobile_modal_component__ = __webpack_require__("./src/app/Components/modals/mobile-modals/messages-mobile-modal/messages-mobile-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_Socket_socket_service__ = __webpack_require__("./src/app/Services/Socket/socket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_bootstrap_modal__ = __webpack_require__("./node_modules/ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Services_Profiles_profiles_service__ = __webpack_require__("./src/app/Services/Profiles/profiles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Services_shared_service__ = __webpack_require__("./src/app/Services/shared.service.ts");
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





var MessagingComponent = /** @class */ (function () {
    function MessagingComponent(dialogService, SocketService, token, ProfilesService, route, SharedService) {
        this.dialogService = dialogService;
        this.SocketService = SocketService;
        this.token = token;
        this.ProfilesService = ProfilesService;
        this.route = route;
        this.SharedService = SharedService;
        this.chat = {
            id: 0
        };
        this.message = '';
        this.first = 0;
        this.mobile = false;
        this.checkModal = false;
    }
    MessagingComponent.prototype.ngOnInit = function () {
        this.initWindow();
        this.getDiscussions();
        // this.getMessages();
        this.getUserProfile();
    };
    MessagingComponent.prototype.initTab = function () {
        var _this = this;
        if (!this.first) {
            this.route.queryParams.subscribe(function (params) {
                _this.first = 1;
                if (params['id'])
                    _this.tab = params['id'];
                else
                    _this.tab = 0;
                _this.showMessage(_this.tab, 0, false, false);
            });
        }
    };
    MessagingComponent.prototype.initWindow = function () {
        window.scrollTo(0, 0);
        if ((window.screen.width) < 736)
            this.mobile = true;
    };
    MessagingComponent.prototype.getDiscussions = function () {
        var _this = this;
        this.SocketService.discussions()
            .subscribe(function (discussions) {
            _this.discussions = discussions.discussions;
            if (_this.discussions.length && !_this.mobile) {
                _this.initTab();
            }
        });
    };
    MessagingComponent.prototype.ngAfterViewChecked = function () {
        this.scrollToBottom();
    };
    MessagingComponent.prototype.scrollToBottom = function () {
        try {
            this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
        }
        catch (err) {
        }
    };
    MessagingComponent.prototype.getUserProfile = function () {
        var _this = this;
        this.ProfilesService.getProfile(this.token.getToken().user.id).subscribe(function (res) {
            _this.profile = res.profile;
        });
    };
    MessagingComponent.prototype.showMessage = function (index, mobile, check, newId) {
        var _this = this;
        var id;
        if (mobile === 2) {
            id = index;
        }
        else {
            id = this.discussions[index].id;
            this.tab = this.discussions[index].id;
            this.updateRead(index);
        }
        this.SocketService.fetchMessages(id) // TODO: duplicate on each call
            .subscribe(function (messages) {
            if (!_this.mobile) {
                _this.messages = messages.messages;
                _this.chat = _this.discussions[index].members[0];
                _this.chat.roomId = _this.discussions[index].id;
            }
            else {
                if (mobile) {
                    if (check && index) {
                        var roomIndex = void 0;
                        for (var i = 0; i < _this.discussions.length; i++) {
                            if (_this.discussions[i].id === index) {
                                roomIndex = i;
                                break;
                            }
                        }
                        _this.showMessageMobileModal(messages, _this.discussions[roomIndex].members[0]);
                        id = 0;
                    }
                    else if (!check) {
                        _this.showMessageMobileModal(messages, _this.discussions[index].members[0]);
                        id = 0;
                    }
                    else if (check && newId) {
                        _this.showMessageMobileModal({ messages: [] }, { room_id: false, uid: newId });
                        id = 0;
                    }
                }
            }
        });
    };
    MessagingComponent.prototype.updateRead = function (index) {
        var _this = this;
        this.SocketService.messagesMarkAsRead(this.discussions[index].id);
        setTimeout(function () {
            _this.SharedService.reloadSocket(true);
        }, 500);
    };
    MessagingComponent.prototype.sendMessage = function () {
        //BACK
        this.SocketService.sendMessage({
            message: this.replaceNewline(this.message),
            sender: this.profile['uid'],
            members: [this.chat.uid, this.profile['uid']],
            roomId: this.chat.roomId,
        });
        this.message = '';
        this.reloadMessage();
    };
    MessagingComponent.prototype.reloadMessage = function () {
        var _this = this;
        this.getDiscussions();
        setTimeout(function () {
            _this.showMessage(0, 0, false, false);
        }, 200);
    };
    MessagingComponent.prototype.checkExistRoom = function (id, list) {
        var length = list.length;
        var check1 = false;
        var check2 = false;
        for (var i = 0; i < length; i++) {
            for (var c = 0; c < list[i].members.length; c++) {
                if (id === list[i].members[c].uid || this.profile['uid'] === list[i].members[c].uid) {
                    if (id === list[i].members[c].uid)
                        check1 = true;
                    if (this.profile['uid'] === list[i].members[c].uid)
                        check2 = true;
                }
            }
            if (check1 && check2)
                return list[i].members[0].room_id;
            else
                check1 = check2 = false;
        }
        return false;
    };
    MessagingComponent.prototype.replaceNewline = function (text) {
        return text.replace(/\r?\n/g, '<br />');
    };
    /* SHOW MODAL */
    MessagingComponent.prototype.showSearchUsersModal = function (id) {
        var _this = this;
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_2__modals_search_modal_user_search_modal_user_component__["a" /* SearchModalUserComponent */], {
            called_id: id
        }).subscribe(function (profile) {
            if (profile && !_this.mobile) {
                _this.showMessageModal(profile);
            }
            else if (profile && _this.mobile) {
                var room_id = _this.checkExistRoom(profile['uid'], _this.discussions);
                _this.showMessage(room_id, 2, true, profile['uid']);
            }
        });
    };
    MessagingComponent.prototype.showMessageModal = function (profile) {
        var _this = this;
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_3__modals_message_modal_message_modal_component__["a" /* MessageModalComponent */], {
            profile: profile,
            roomId: this.checkExistRoom(profile['uid'], this.discussions)
        }).subscribe(function (success) {
            if (success)
                _this.reloadMessage();
        });
    };
    /* MOBILE SHOW MODAL */
    MessagingComponent.prototype.showMessageMobileModal = function (messages, member) {
        var _this = this;
        if (!this.checkModal) {
            this.checkModal = true;
            var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_4__modals_mobile_modals_messages_mobile_modal_messages_mobile_modal_component__["a" /* MessagesMobileModalComponent */], {
                object: messages,
                members: member
            }).subscribe(function (res) {
                _this.getDiscussions();
                _this.checkModal = false;
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('scrollBottom'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
    ], MessagingComponent.prototype, "container", void 0);
    MessagingComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-messaging',
            template: __webpack_require__("./src/app/Components/messaging/messaging.component.html"),
            styles: [__webpack_require__("./src/app/Components/messaging/messaging.component.scss")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
            providers: [__WEBPACK_IMPORTED_MODULE_8__Services_Profiles_profiles_service__["a" /* ProfilesService */]]
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_7_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7_ng2_bootstrap_modal__["DialogService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__Services_Socket_socket_service__["a" /* SocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_Socket_socket_service__["a" /* SocketService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__Services_Authentication_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__Services_Authentication_token_service__["a" /* TokenService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_8__Services_Profiles_profiles_service__["a" /* ProfilesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__Services_Profiles_profiles_service__["a" /* ProfilesService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_9__Services_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__Services_shared_service__["a" /* SharedService */]) === "function" && _g || Object])
    ], MessagingComponent);
    return MessagingComponent;
    var _a, _b, _c, _d, _e, _f, _g;
}());

//# sourceMappingURL=messaging.component.js.map

/***/ }),

/***/ "./src/app/Components/messaging/messaging.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagingModule", function() { return MessagingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__ = __webpack_require__("./src/app/Pipes/pipe.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__footer_footer_module__ = __webpack_require__("./src/app/Components/footer/footer.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_moment__ = __webpack_require__("./node_modules/angular2-moment/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__messaging_component__ = __webpack_require__("./src/app/Components/messaging/messaging.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Routes_messaging_routes__ = __webpack_require__("./src/app/Routes/messaging.routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




/* Custom Modules */



/* Components */

// import { MeetSearchComponent } from './discover-search/discover-search.component';
/* Services */
// import { SharedService } from '../../Services/shared.service';
/* Route */

var MessagingModule = /** @class */ (function () {
    function MessagingModule() {
    }
    MessagingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_8__Routes_messaging_routes__["a" /* MESSAGE_ROUTES */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["f" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__["a" /* PipeModule */],
                __WEBPACK_IMPORTED_MODULE_5__footer_footer_module__["a" /* FooterModule */],
                __WEBPACK_IMPORTED_MODULE_6_angular2_moment__["MomentModule"]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__messaging_component__["a" /* MessagingComponent */]
            ],
            providers: [],
            exports: []
        })
    ], MessagingModule);
    return MessagingModule;
}());

//# sourceMappingURL=messaging.module.js.map

/***/ }),

/***/ "./src/app/Routes/messaging.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MESSAGE_ROUTES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Components_messaging_messaging_component__ = __webpack_require__("./src/app/Components/messaging/messaging.component.ts");

/* Components */

/* Librairies */
var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__Components_messaging_messaging_component__["a" /* MessagingComponent */] },
];
var MESSAGE_ROUTES = __WEBPACK_IMPORTED_MODULE_0__angular_router__["f" /* RouterModule */].forChild(routes);
//# sourceMappingURL=messaging.routes.js.map

/***/ })

});
//# sourceMappingURL=messaging.module.chunk.js.map