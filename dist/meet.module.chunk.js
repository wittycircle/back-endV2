webpackJsonp(["meet.module"],{

/***/ "./src/app/Components/meet/meet-search/meet-search.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"meet-component presentation-component\" *ngIf=\"!mobile\">\n\t<div class=\"meet-title presentation-title\">\n\t\t<h2>Who are you looking for?</h2>\n\t</div>\n\n\t<div class=\"meet-search1\">\n\t\t<div class=\"meet-search1-text\">\n\t\t\t<h2>Someone skilled in</h2>\n\t\t</div>\n\t\t\t<div class=\"meet-skill-list flex-inline animated fadeIn\" *ngFor=\"let selectedSkill of selectedSkills; let last = last; let in = index\" [attr.id]=\"'wms-1-' + in\" m_wms1>\n\t\t\t\t<div class=\"meet-skill-tag searchbox\">\n\t\t\t\t\t<h2>{{ selectedSkill }}</h2>\n\t\t\t\t\t<div class=\"meet-skill-cross\" (click)=\"removeSkill(selectedSkill)\">\n\t\t\t\t\t\t<img src=\"/public/images/cross-icon.svg\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<span *ngIf=\"!last\">,</span>\n\t\t\t</div>\n\t\t<div id=\"wms-2\" class=\"meet-search1-dropdown\">\n\t\t\t<div id=\"wms-2-0\" class=\"meet-search1-anyskill inputfield\">\n\t\t\t\t<input id=\"wms-2-i\" auto-complete class=\"animated fadeIn\" (click)=\"showSkillModal()\" (mouseenter)=\"changePlaceholder()\" (mouseleave)=\"changePlaceholder()\" [(ngModel)]=\"skillName\">\n\t\t\t\t<label id=\"wms-2-l\">{{ placeholder }}</label>\n\t\t\t</div>\n\t\t\t<!-- <aside id=\"wms-2-1\"  class=\"meet-search1-popularskills downbox\">\n\t\t\t\t<ul id=\"wms-2-1-1\">\n\t\t\t\t\t<h3>Popular skills:</h3>\n\t\t\t\t\t<li class=\"cursor-pt\" *ngFor=\"let popularSkill of popularSkills\" (click)=\"selectSkill(popularSkill.name)\">{{ popularSkill.name }}</li>\n\t\t\t\t</ul>\n\t\t\t</aside> -->\n\t\t\t<!-- <aside id=\"wms-2-2\" class=\"meet-search1-downbox1 downbox\">\n\t\t\t\t<ul id=\"wms-2-2-1\">\n\t\t\t\t\t<li class=\"cursor-pt\" *ngFor=\"let skill of skills | searchPipe: 'name': skillName\" (click)=\"selectSkill(skill.name)\">{{ skill.name }}</li>\n\t\t\t\t</ul>\n\t\t\t</aside> -->\n\t\t</div>\n\n\t\t<div class=\"meet-search1-text2\">\n\t\t\t<h2 >looking</h2>\n\t\t</div>\n\n\t\t<div id=\"wms-3\" class=\"meet-search1-dropdown\">\n\t\t\t<div class=\"meet-search-anything searchbox flex\">\n\t\t\t\t<h2>{{ currentCategory }}</h2>\n\t\t\t\t<img id=\"wms-3-img\" class=\"transition-150\" src=\"/public/images/arrow-down-icon-w.svg\">\n\t\t\t</div>\n\t\t\t<aside id=\"wms-3-1\" class=\"meet-search1-downbox2 downbox\">\n\t\t\t\t<ul id=\"wms-3-1-1\">\n\t\t\t\t\t<li class=\"cursor-pt\" *ngFor=\"let category of categories\" (click)=\"selectCategory(category.name)\">{{ category.name }}</li>\n\t\t\t\t</ul>\n\t\t\t</aside>\n\t\t</div>\n\t</div>\n\n\t<div id=\"wms-4\" class=\"meet-search2-anylocation inputfield flex-inline\">\n\t\t<div class=\"meet-search2-text2\" style=\"margin-left: 10px;\">\n\t\t\t<h2>near</h2>\n\t\t</div>\n\t\t<input type=\"text\" [(ngModel)]=\"location\" placeholder=\"Any location\" (setAddress)=\"getAddress($event)\" googlePlace />\n\t</div>\n</div>\n\n<div class=\"presentation-search2\" *ngIf=\"!mobile\">\n\t<div class=\"presentation-search2-right flex\">\n\t\t<div id=\"wms-5\" class=\"presentation-search2-right-input flex-grow\">\n\t\t\t<div id=\"wms-5-1\" class=\"presentation-search2-left inline\">\n\t\t\t\t<h3 class=\"inline\">Ranked by: </h3>\n\t\t\t\t<div class=\"inline\">\n\t\t\t\t\t<h3 class=\"inline\">{{ currentRankType }}</h3>\n\t\t\t\t\t<img id=\"wms-5-1-img\" class=\"inline transition-150\" src=\"/public/images/arrow-down-icon-w.svg\" alt=\"arrow\" />\n\t\t\t\t\t<ul id=\"wms-5-1-1\" class=\"presentation-search2-left-box\">\n\t\t\t\t\t\t<li (click)=\"changeRankType()\" >{{ rankType }}</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<h3 class=\"inline\">network:</h3>\n\t\t\t<div class=\"network-box inline\" *ngIf=\"selectedNetwork\">\n\t\t\t\t<h3 class=\"inline\">{{ selectedNetwork }} <span *ngIf=\"!launched\">(Coming soon)</span></h3>\n\t\t\t\t<img (click)=\"removeNetwork()\" class=\"inline cursor-pt\" src=\"/public/images/cross-icon.svg\">\n\t\t\t</div>\n\t\t\t<div id=\"wms-5-3\" class=\"network-search inline\" *ngIf=\"!selectedNetwork\">\n\t\t\t\t<input id=\"wms-5-3-i\" type=\"text\" [(ngModel)]=\"searchNetwork\" placeholder=\"Berkeley, Numa, 500 Startups...\">\n\t\t\t\t<div id=\"wms-5-3-1\" class=\"network-dropdown downbox\">\n\t\t\t\t\t<h3 *ngIf=\"!searchNetwork\">Popular network: </h3>\n\t\t\t\t\t<li class=\"meet-network cursor-pt\" *ngFor=\"let network of (networks | searchPipe: 'network': searchNetwork).slice(0, 5)\" (click)=\"selectNetwork(network.network, network.launched)\">{{ network.network }}</li>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div id=\"wms-6\" class=\"presentation-search2-right-box cursor-pt\">\n\t\t\t<h3 class=\"inline\">less criteria</h3>\n\t\t\t<img id=\"wms-6-img\" class=\"inline\" src=\"/public/images/arrow-down-icon-w.svg\" alt=\"arrow\" />\n\t\t</div>\n\t</div>\n</div>\n\n<div id=\"w-meet-mobile\" *ngIf=\"mobile\">\n\t<div class=\"wm-body-mobile bg-default\">\n\t\t<div class=\"filter\"></div>\n\t\t<div class=\"wmbm-fields\">\n\t\t\t<h1 class=\"freigl mar-b-15\"><span class=\"freigs\">Who</span> do you want to <br/><span class=\"freigs\">meet?</span>\n\t\t\t</h1>\n\n\t\t\t<div class=\"wmbm-boxes flex mar-b-15\">\n\t\t\t\t<div class=\"wmbmb-box1 flex mar-r-10 mar-b-10\">\n\t\t\t\t\t<h2 class=\"mar-r-15\">Someone skilled in</h2>\n\t\t\t\t\t<div class=\"border-bottom flex\" (click)=\"showSkillMobileModal()\">\n\t\t\t\t\t\t<h2 class=\"mar-r-5\">{{ selectedSkills | sortSkill }}</h2>\n\t\t\t\t\t\t<img src=\"/public/images/arrow-down-icon-w.svg\" alt=\"arrow\"/>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"wmbmb-box2 flex mar-r-15 mar-b-10\">\n\t\t\t\t\t<h2 class=\"mar-r-15\">looking to</h2>\n\t\t\t\t\t<div class=\"border-bottom flex\" (click)=\"showCategoryMobileModal()\">\n\t\t\t\t\t\t<h2 class=\"mar-r-5 lowercase\">{{ currentCategory }}</h2>\n\t\t\t\t\t\t<img src=\"/public/images/arrow-down-icon-w.svg\" alt=\"arrow\"/>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"wdbmb-box3 flex mar-b-10\">\n\t\t\t\t\t<h2 class=\"mar-r-15\">near</h2>\n\t\t\t\t\t<div class=\"border-bottom flex\" (click)=\"showLocationMobileModal()\">\n\t\t\t\t\t\t<h2 class=\"mar-r-5 location-h2\">{{ currentLocation | cut:true:16:' ...' }}</h2>\n\t\t\t\t\t\t<img src=\"/public/images/arrow-down-icon-w.svg\" alt=\"arrow\"/>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<section class=\"meet-body-content\" infinite-scroll\n\t[infiniteScrollDistance]=\"1\"\n\t[infiniteScrollThrottle]=\"300\"\n\t(scrolled)=\"onScroll()\">\n\t<div class=\"meet-body-container presentation-body-container animated fadeIn\">\n\t\t<div class=\"meet-body-title presentation-body-title\">\n\t\t\t<h4>Browse <span>the users below</span> or filter them using our magic tool above.</h4>\n\t\t</div>\n\n\t\t<div class=\"meet-body-cards\">\n\t\t\t<div class=\"main-body3-card profile-card\" *ngFor=\"let profile of profiles; let i = index\">\n\t\t\t\t<a [routerLink]=\"['', profile.username]\" class=\"cursor-pt\">\n\t\t\t\t\t<div class=\"card-click-zone\">\n\t\t\t\t\t\t<div class=\"card-rank\" *ngIf=\"profile.rank\">\n\t\t\t\t\t\t\t<span>#{{ profile.rank }}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-picture animated fadeIn\" [style.background-image]=\"'url(' + transformImage(profile.cover_picture, 207, 40, 'fill') + ')'\">\n\t\t\t\t\t\t\t<div class=\"card-profile-picture animated fadeIn\" [style.background-image]=\"'url(' + transformImage(profile.picture, 64, 64, 'fill') + ')'\"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-info bb\">\n\t\t\t\t\t\t\t<h4>{{ profile.fullName }}</h4>\n\t\t\t\t\t\t\t<div class=\"card-location\">\n\t\t\t\t\t\t\t\t<h6 *ngIf=\"profile.state\">{{ profile.city }}, {{ profile.state }}</h6>\n\t\t\t\t\t\t\t\t<h6 *ngIf=\"!profile.state\">{{ profile.city }}, {{ profile.country }}</h6>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"card-description\">\n\t\t\t\t\t\t\t\t<p [innerHtml]=\"profile.description | cut:true:56:' ...'\"></p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"card-profile-skills\">\n\t\t\t\t\t\t\t\t<div *ngFor=\"let skill of profile.skills\" class=\"inline\">\n\t\t\t\t\t\t\t\t\t<li *ngIf=\"skill\">{{ skill | cut:true:20:' ...' }}</li>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t\t<div class=\"card-status flex\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530771/Witty-icon/User%20Status/Meet_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'to meet smart people'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530771/Witty-icon/User%20Status/Share_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'to share what I\\'m working on'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Hiring_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'for a full time position'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Internship_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'for an internship'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Collaboration_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'for part time collaboration'\">\n\t\t\t\t\t<p class='freigb'>{{ transformCardStatus(profile.about) }}</p>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'to meet smart people'\">{{ profile.first_name }} is looking to network and meet new interesting people</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'to share what I\\'m working on'\">{{ profile.first_name }} is looking to share their work to the world</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'for a full time position'\">{{ profile.first_name }} is looking for a full time position</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'for an internship'\">{{ profile.first_name }} is looking for an internship</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'for part time collaboration'\">{{ profile.first_name }} is looking to do some part time collaboration</div>\n\t\t\t\t</div>\n\t\t\t\t<!-- <div class=\"card-follow\">\n\t\t\t\t\t<div class=\"cf-follower\">\n\t\t\t\t\t\t<p class=\"freigs\">{{ profile.follower || 0 }}</p>\n\t\t\t\t\t\t<h6 class=\"freigb\">followers</h6>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"cf-following\">\n\t\t\t\t\t\t<p class=\"freigs\">{{ profile.following || 0 }}</p>\n\t\t\t\t\t\t<h6 class=\"freigb\">following</h6>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"cf-follow cursor-pt\" (click)=\"followProfile(profile.user_id, i)\">\n\t\t\t\t\t\t<div *ngIf=\"!profile.hasLiked\" class=\"tooltipw\">Follow?</div>\n\t\t\t\t\t\t<div *ngIf=\"profile.hasLiked\" class=\"tooltipw\">Unfollow?</div>\n\t\t\t\t\t\t<i *ngIf=\"!profile.hasLiked\" class=\"fa fa-plus\"></i>\n\t\t\t\t\t\t<i *ngIf=\"profile.hasLiked\" class=\"fa fa-check\"></i>\n\t\t\t\t\t</div>\n\t\t\t\t</div> -->\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</section>\n\n\n</div>\n\n<section class=\"meet-body-content\" infinite-scroll\n[infiniteScrollDistance]=\"1\"\n[infiniteScrollThrottle]=\"300\"\n(scrolled)=\"onScroll()\">\n\t<div *ngIf=\"searching\" class=\"loader\"></div>\n\t<div *ngIf=\"!searching\" class=\"meet-body-container presentation-body-container animated fadeIn\">\n\t\t<div class=\"meet-body-title presentation-body-title\" ng-if=\"meet.profiles && !searchSk && !searchAl\">\n\t\t\t<h4>Browse <span>the users below</span> or filter them using our magic tool above.</h4>\n\t\t</div>\n\n\t\t<div class=\"meet-body-cards\">\n\t\t\t<div class=\"main-body3-card profile-card\" *ngFor=\"let profile of profiles; let i = index\">\n\t\t\t\t<a [routerLink]=\"['', profile.username]\" class=\"cursor-pt\">\n\t\t\t\t\t<div class=\"card-click-zone\">\n\t\t\t\t\t\t<div class=\"card-rank\" *ngIf=\"profile.rank\">\n\t\t\t\t\t\t\t<span>#{{ profile.rank }}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-picture animated fadeIn\" [style.background-image]=\"'url(' + transformImage(profile.cover_picture, 207, 40, 'fill') + ')'\">\n\t\t\t\t\t\t\t<div class=\"card-profile-picture animated fadeIn\" [style.background-image]=\"'url(' + transformImage(profile.picture, 64, 64, 'fill') + ')'\"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-info bb\">\n\t\t\t\t\t\t\t<h4>{{ profile.fullName }}</h4>\n\t\t\t\t\t\t\t<div class=\"card-location\">\n\t\t\t\t\t\t\t\t<h6 *ngIf=\"profile.state\">{{ profile.city }}, {{ profile.state }}</h6>\n\t\t\t\t\t\t\t\t<h6 *ngIf=\"!profile.state\">{{ profile.city }}, {{ profile.country }}</h6>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"card-description\">\n\t\t\t\t\t\t\t\t<p [innerHtml]=\"profile.description | cut:true:56:' ...'\"></p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"card-profile-skills\">\n\t\t\t\t\t\t\t\t<div *ngFor=\"let skill of profile.skills\" class=\"inline\">\n\t\t\t\t\t\t\t\t\t<li *ngIf=\"skill\">{{ skill | cut:true:20:' ...' }}</li>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t\t<div class=\"card-status flex\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530771/Witty-icon/User%20Status/Meet_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'to meet smart people'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530771/Witty-icon/User%20Status/Share_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'to share what I\\'m working on'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Hiring_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'for a full time position'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Internship_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'for an internship'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Collaboration_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'for part time collaboration'\">\n\t\t\t\t\t<p class='freigb'>{{ transformCardStatus(profile.about) }}</p>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'to meet smart people'\">{{ profile.first_name }} is looking to network and meet new interesting people</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'to share what I\\'m working on'\">{{ profile.first_name }} is looking to share their work to the world</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'for a full time position'\">{{ profile.first_name }} is looking for a full time position</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'for an internship'\">{{ profile.first_name }} is looking for an internship</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'for part time collaboration'\">{{ profile.first_name }} is looking to do some part time collaboration</div>\n\t\t\t\t</div>\n\t\t\t\t<!-- <div class=\"card-follow\">\n\t\t\t\t\t<div class=\"cf-follower\">\n\t\t\t\t\t\t<p class=\"freigs\">{{ profile.follower || 0 }}</p>\n\t\t\t\t\t\t<h6 class=\"freigb\">followers</h6>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"cf-following\">\n\t\t\t\t\t\t<p class=\"freigs\">{{ profile.following || 0 }}</p>\n\t\t\t\t\t\t<h6 class=\"freigb\">following</h6>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"cf-follow cursor-pt\" (click)=\"followProfile(profile.user_id, i)\">\n\t\t\t\t\t\t<div *ngIf=\"!profile.hasLiked\" class=\"tooltipw\">Follow?</div>\n\t\t\t\t\t\t<div *ngIf=\"profile.hasLiked\" class=\"tooltipw\">Unfollow?</div>\n\t\t\t\t\t\t<i *ngIf=\"!profile.hasLiked\" class=\"fa fa-plus\"></i>\n\t\t\t\t\t\t<i *ngIf=\"profile.hasLiked\" class=\"fa fa-check\"></i>\n\t\t\t\t\t</div>\n\t\t\t\t</div> -->\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</section>\n"

/***/ }),

/***/ "./src/app/Components/meet/meet-search/meet-search.component.scss":
/***/ (function(module, exports) {

module.exports = ".whc-videobg {\n  background: rgba(0, 0, 0, 0.5);\n  /* For Safari 5.1 to 6.0 */\n  /* For Opera 11.1 to 12.0 */\n  /* For Firefox 3.6 to 15 */\n  background: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0.9)));\n  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9));\n  /* Standard syntax (must be last) */ }\n\n.presentation-component {\n  top: 120px !important; }\n\n.meet-component li {\n  padding: 10px 20px 5px 20px;\n  font-family: 'FreigBook';\n  color: #222222;\n  font-size: 18px; }\n\n.meet-component li:hover {\n  border-radius: 8px;\n  background-color: #F5F5F5; }\n\n.meet-component ul {\n  padding-bottom: 10px;\n  margin-top: 8px; }\n\n.meet-component .meet-search2-anylocation {\n  position: relative;\n  right: 10px; }\n\n.meet-component .meet-search2-anylocation input {\n    width: 160px !important;\n    margin-left: 10px;\n    padding-top: 5px;\n    padding-bottom: 5px;\n    margin-top: 0;\n    margin-bottom: 0; }\n\n.meet-component .meet-search2-anylocation input:focus {\n    color: white; }\n\n.meet-component .meet-search1 .meet-search1-dropdown {\n  display: inline-block;\n  margin: 0px 10px 10px 0px; }\n\n.meet-component .meet-search1 .meet-search1-dropdown h2 {\n    padding: 6px 5px 6px 10px; }\n\n.meet-component .meet-search1 .meet-search1-anyskill input {\n  width: 130px;\n  -webkit-animation-duration: 0.4s;\n  -moz-animation-duration: 0.4s;\n  -o-animation-duration: 0.4s;\n  -ms-animation-duration: 0.4s; }\n\n.meet-component .meet-search1 #input-msa::-webkit-input-placeholder {\n  color: white; }\n\n.meet-component .meet-search1 #input-msa2::-webkit-input-placeholder {\n  color: rgba(255, 255, 255, 0.3); }\n\n.meet-component .meet-search1 .meet-search1-text {\n  display: inline-block;\n  margin: 0px 10px 0px 0px; }\n\n.meet-component .meet-search1 .meet-search1-text2 {\n  display: inline-block;\n  margin: 0px 10px 0px 0px; }\n\n.meet-component .meet-search1 .meet-skill-list {\n  margin-right: 10px;\n  margin-bottom: 10px;\n  -webkit-animation-duration: 0.4s;\n  -moz-animation-duration: 0.4s;\n  -o-animation-duration: 0.4s;\n  -ms-animation-duration: 0.4s; }\n\n.meet-component .meet-search1 .meet-skill-list .meet-skill-tag {\n    display: inline-block; }\n\n.meet-component .meet-search1 .meet-skill-list .meet-skill-tag h2 {\n      display: inline-block;\n      padding: 6px 5px 6px 10px; }\n\n.meet-component .meet-search1 .meet-skill-list .meet-skill-tag .meet-skill-cross {\n      display: inline-block;\n      padding-top: 10px; }\n\n.meet-component .meet-search1 .meet-skill-list .meet-skill-tag .meet-skill-cross img:focus {\n        outline: 0; }\n\n.meet-component .meet-search1 .meet-skill-list span {\n    display: inline-block;\n    font-family: 'FreigBook';\n    font-size: 30px;\n    color: white;\n    margin-bottom: 0; }\n\n.meet-component .meet-search1 .meet-search1-popularskills {\n  display: none; }\n\n.meet-component .meet-search1 .meet-search1-popularskills h3 {\n    font-family: 'FreigBook';\n    color: #999999;\n    font-size: 19px;\n    padding: 8px 20px; }\n\n.meet-component .meet-search1 .meet-search1-downbox1 {\n  display: none;\n  max-height: 240px;\n  min-height: 50px;\n  overflow: auto; }\n\n.meet-component .meet-search1 .meet-search1-downbox1 span {\n    padding: 10px;\n    font-family: 'FreigBook';\n    font-style: italic;\n    font-size: 16px;\n    color: #999999; }\n\n.meet-component .meet-search1 .meet-search1-downbox2 {\n  display: none; }\n\n.meet-component .meet-search1 .inputfield input {\n  margin: 0;\n  padding: 5px 10px;\n  color: white; }\n\n.meet-component .meet-search1 .meet-search2-text2 {\n  display: inline-block;\n  margin: 0px 10px 0px 0px; }\n\n.meet-component .meet-search2 {\n  margin: 5px 0; }\n\n.meet-component .meet-search2 .meet-search2-text1 {\n    display: inline-block; }\n\n.meet-component .meet-search2 .meet-search2-dropdown {\n    display: inline-block; }\n\n.meet-component .meet-search2 .meet-search2-dropdown h2 {\n      padding: 10px 15px 10px 10px; }\n\n.meet-component .meet-search2 .meet-search2-dropdown .meet-search2-anyskills {\n      margin-left: 20px;\n      margin-right: 10px; }\n\n.meet-component .meet-search2 .meet-search2-anylocation input {\n    width: 200px; }\n\n.meet-component .meet-search2 .meet-search2-text2 {\n    display: inline-block;\n    margin: 0px 10px 0px 0px; }\n\n.meet-body-content {\n  min-height: 700px; }\n\n.meet-body-content .loader {\n    margin: 45px auto; }\n\n.meet-body-content .meet-body-container {\n    max-width: 1000px;\n    margin: 0 auto;\n    padding-left: 10px;\n    -webkit-transition-delay: all 500ms linear;\n    -kthtml-transition-delay: all 500ms linear;\n    transition-delay: all 500ms linear; }\n\n.meet-body-content .meet-body-container .meet-body-cards {\n      text-align: left;\n      display: inline-block; }\n\n.meet-body-content .meet-body-container .meet-body-cards .meet-body-card {\n        display: inline-table;\n        text-align: center;\n        width: 207px;\n        height: 260px;\n        margin: 0px 16px 50px 16px;\n        border: 1px solid #E5E5E5;\n        border-radius: 5px; }\n\n.meet-body-content .meet-body-container .meet-search-found h2 {\n      font-family: 'FreigLight';\n      color: black;\n      padding: 45px 20px 45px 16px;\n      line-height: 38px; }\n\n/******************** MOBILE ****************************/\n\n@media only screen and (max-width: 736px) {\n  #w-meet-mobile .wm-body-mobile {\n    position: relative;\n    background-image: url(\"/public/images/bg_mobile/bg_home_mobile.jpg\");\n    overflow-y: hidden; }\n    #w-meet-mobile .wm-body-mobile .filter {\n      height: 600px;\n      background: rgba(0, 0, 0, 0.7); }\n    #w-meet-mobile .wm-body-mobile h1, #w-meet-mobile .wm-body-mobile span {\n      font-size: 28px; }\n    #w-meet-mobile .wm-body-mobile h2 {\n      font-family: 'FreigLight';\n      font-size: 28px;\n      white-space: nowrap; }\n    #w-meet-mobile .wm-body-mobile .lowercase {\n      text-transform: lowercase; }\n    #w-meet-mobile .wm-body-mobile .wmbm-fields {\n      position: relative;\n      padding: 130px 20px 20px 20px; }\n      #w-meet-mobile .wm-body-mobile .wmbm-fields .wmbm-boxes {\n        position: relative;\n        -webkit-box-align: start;\n            -ms-flex-align: start;\n                align-items: flex-start;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap; }\n        #w-meet-mobile .wm-body-mobile .wmbm-fields .wmbm-boxes .wmbmb-box1 {\n          -ms-flex-wrap: wrap;\n              flex-wrap: wrap; }\n        #w-meet-mobile .wm-body-mobile .wmbm-fields .wmbm-boxes .location-h2 {\n          white-space: nowrap;\n          overflow: hidden; }\n        #w-meet-mobile .wm-body-mobile .wmbm-fields .wmbm-boxes .border-bottom {\n          border-bottom: 1px solid #fff; }\n  #w-meet-mobile .meet-body-cards {\n    text-align: center; } }\n"

/***/ }),

/***/ "./src/app/Components/meet/meet-search/meet-search.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MeetSearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__ = __webpack_require__("./node_modules/ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_popover_login_popover_login_component__ = __webpack_require__("./src/app/Components/modals/popover-login/popover-login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modals_skill_modal_skill_modal_component__ = __webpack_require__("./src/app/Components/modals/skill-modal/skill-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modals_mobile_modals_category_mobile_modal_category_mobile_modal_component__ = __webpack_require__("./src/app/Components/modals/mobile-modals/category-mobile-modal/category-mobile-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modals_mobile_modals_skill_mobile_modal_skill_mobile_modal_component__ = __webpack_require__("./src/app/Components/modals/mobile-modals/skill-mobile-modal/skill-mobile-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modals_mobile_modals_location_mobile_modal_location_mobile_modal_component__ = __webpack_require__("./src/app/Components/modals/mobile-modals/location-mobile-modal/location-mobile-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Services_Skills_skills_service__ = __webpack_require__("./src/app/Services/Skills/skills.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Services_Profiles_profiles_service__ = __webpack_require__("./src/app/Services/Profiles/profiles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Services_Networks_networks_service__ = __webpack_require__("./src/app/Services/Networks/networks.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Services_Pictures_pictures_service__ = __webpack_require__("./src/app/Services/Pictures/pictures.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Interfaces_Constants_categories_meet_constant__ = __webpack_require__("./src/app/Interfaces/Constants/categories-meet-constant.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__Interfaces_Constants_search_profile_constant__ = __webpack_require__("./src/app/Interfaces/Constants/search-profile.constant.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_underscore__ = __webpack_require__("./node_modules/underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_underscore__);
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





/* Models */


/* Librairies */

var MeetSearchComponent = /** @class */ (function () {
    function MeetSearchComponent(SkillsService, ProfilesService, NetworksService, dialogService, TokenService, PicturesService, ActivatedRoute, ChangeDetectorRef, document) {
        this.SkillsService = SkillsService;
        this.ProfilesService = ProfilesService;
        this.NetworksService = NetworksService;
        this.dialogService = dialogService;
        this.TokenService = TokenService;
        this.PicturesService = PicturesService;
        this.ActivatedRoute = ActivatedRoute;
        this.ChangeDetectorRef = ChangeDetectorRef;
        this.document = document;
        this.searching = false;
        this.priorities = ['skills', 'about', 'location', 'network'];
    }
    MeetSearchComponent.prototype.ngOnInit = function () {
        this.initModels();
        this.initServices();
    };
    MeetSearchComponent.prototype.onScroll = function () {
        var old_limit = this.limit;
        this.limit += 32;
        this.getSearchBody('paginate', { value1: 32, value2: this.limit });
    };
    MeetSearchComponent.prototype.initModels = function () {
        this.skills = [];
        this.selectedSkills = [];
        this.networks = [];
        this.profiles = [];
        this.limit = 32;
        this.placeholder = 'Anything';
        this.currentCategory = 'to meet smart people';
        this.currentLocation = 'any location';
        this.categories = __WEBPACK_IMPORTED_MODULE_14__Interfaces_Constants_categories_meet_constant__["a" /* categoriesMeet */];
        this.searchBody = __WEBPACK_IMPORTED_MODULE_15__Interfaces_Constants_search_profile_constant__["b" /* searchProfile2 */];
        this.currentRankType = 'magic';
        this.rankType = 'popularity';
    };
    MeetSearchComponent.prototype.initServices = function () {
        this.searchBody.paginate.limit = 32;
        this.getSkills();
        this.getNetworks();
        this.initParams();
    };
    MeetSearchComponent.prototype.initParams = function () {
        var _this = this;
        this.ActivatedRoute.queryParams.subscribe(function (params) {
            _this.selectedSkills = params.skills ? params.skills.split(',') : [];
            _this.searchSkills = _this.selectedSkills[0] ? _this.selectedSkills : [''];
            var location = localStorage.getItem('geoLocation');
            if (location)
                _this.searchBody.query.members[2].value = location;
            if (_this.searchSkills[0])
                _this.getSearchBody('members', { index: 0, value: _this.searchSkills });
            else
                _this.searchProfiles(0);
        });
    };
    MeetSearchComponent.prototype.searchProfiles = function (index) {
        var _this = this;
        if (index)
            this.searching = true;
        this.ProfilesService.searchProfiles(this.searchBody).subscribe(function (res) {
            if (index)
                _this.profiles = [];
            _this.profiles = _this.profiles.concat(res.profiles);
            _this.searching = false;
        });
    };
    MeetSearchComponent.prototype.getSkills = function () {
        var _this = this;
        this.SkillsService.getSkills().subscribe(function (res) {
            _this.skills = res.skills;
            // this.popularSkills = this.skills.slice(0, 5);
        });
    };
    MeetSearchComponent.prototype.getNetworks = function () {
        var _this = this;
        this.NetworksService.getNetworks('university').subscribe(function (res) {
            _this.networks = res.university;
        });
    };
    MeetSearchComponent.prototype.getSearchBody = function (group, member) {
        var i = 0;
        if (group === 'members') {
            this.limit = 32;
            this.searchBody.paginate.limit = 32;
            this.searchBody.paginate.offset = 0;
            this.searchBody.query.members[member.index].value = member.value;
            this.searchBody.query.priority = this.priorities[member.index];
            i = 1;
        }
        if (group === 'sort') {
            var value = member.value === 'popularity' ? 'rank' : member.value;
            this.searchBody.query.sort.field = value;
            i = 1;
        }
        if (group === 'paginate') {
            this.searchBody.paginate.limit = member.value1,
                this.searchBody.paginate.offset = member.value2;
        }
        this.searchProfiles(i);
    };
    // selectSkill(name: string) {
    // 	if (this.selectedSkills.indexOf(name) < 0 && this.selectedSkills.length < 5) {
    // 		this.selectedSkills.push(name);
    // 		this.skillName = null;
    // 		this.getSearchBody('members', {index: 0, value: this.selectedSkills});
    // 	}
    // }
    MeetSearchComponent.prototype.removeSkill = function (name) {
        this.selectedSkills = __WEBPACK_IMPORTED_MODULE_16_underscore__["without"](this.selectedSkills, name);
        if (!this.selectedSkills.length)
            this.searchSkills[0] = '';
        this.getSearchBody('members', { index: 0, value: this.searchSkills });
    };
    MeetSearchComponent.prototype.selectCategory = function (name) {
        this.currentCategory = name;
        if (name === 'for anything')
            this.getSearchBody('members', { index: 1, value: '' });
        else if (name === "to share what they're working on")
            this.getSearchBody('members', { index: 1, value: "to share what I'm working on" });
        else
            this.getSearchBody('members', { index: 1, value: name });
    };
    MeetSearchComponent.prototype.changePlaceholder = function () {
        if (this.placeholder !== 'add skill') {
            this.placeholder = 'add skill';
        }
        else {
            this.placeholder = 'Anything';
        }
    };
    MeetSearchComponent.prototype.getAddress = function (place) {
        var address = place['address_components'][0].long_name + ', ';
        if (!place['address_components'][3])
            address = address + "' ', " + place['address_components'][2].long_name;
        else
            address = address + place['address_components'][2].short_name + ', ' + place['address_components'][3].long_name;
        this.getSearchBody('members', { index: 2, value: address });
    };
    MeetSearchComponent.prototype.changeRankType = function () {
        var old_type = this.currentRankType;
        this.currentRankType = this.rankType;
        this.rankType = old_type;
        this.getSearchBody('sort', { value: this.currentRankType });
    };
    MeetSearchComponent.prototype.selectNetwork = function (name, launched) {
        this.selectedNetwork = name;
        this.launched = launched;
        if (launched)
            this.getSearchBody('members', { index: 3, value: name });
    };
    MeetSearchComponent.prototype.removeNetwork = function () {
        this.selectedNetwork = '';
    };
    MeetSearchComponent.prototype.followProfile = function (id, index) {
        var _this = this;
        if (!this.TokenService.getToken())
            return this.showLoginPopOver();
        this.ProfilesService.followProfile(id, {}).subscribe(function (res) {
            // this.profiles[index]['hasLiked'] = res.success
            if (!_this.profiles[index]['hasLiked']) {
                _this.profiles[index]['hasLiked'] = true;
                _this.profiles[index]['follower'] += 1;
            }
            else {
                _this.profiles[index]['hasLiked'] = false;
                _this.profiles[index]['follower'] -= 1;
            }
        });
    };
    /* TRANSFORM */
    MeetSearchComponent.prototype.transformImage = function (url, width, height, crop) {
        return this.PicturesService.transformImage(url, width, height, crop);
    };
    MeetSearchComponent.prototype.transformCardStatus = function (status) {
        if (status === 'to meet smart people')
            return 'Meet smart people';
        else if (status === 'for a full time position')
            return 'Full time position';
        else if (status === 'for an internship')
            return 'Internship';
        else if (status === 'for part time collaboration')
            return 'Collaboration';
        else if (status === "to share what I'm working on")
            return 'Share work';
    };
    /* SHOW MODAL */
    MeetSearchComponent.prototype.showLoginPopOver = function () {
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_4__modals_popover_login_popover_login_component__["a" /* PopoverLoginComponent */], {});
    };
    MeetSearchComponent.prototype.showSkillModal = function () {
        var _this = this;
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_5__modals_skill_modal_skill_modal_component__["a" /* SkillModalComponent */], {
            selectedSkills: this.selectedSkills
        }).subscribe(function (skills) {
            if (!skills[0])
                _this.document.getElementById('wms-2-0').style.display = 'inline-block';
            _this.selectedSkills = skills;
            _this.searchSkills = _this.selectedSkills[0] ? _this.selectedSkills : [''];
            _this.getSearchBody('members', { index: 0, value: _this.searchSkills });
        });
    };
    /* SHOW MOBILE MODAL */
    MeetSearchComponent.prototype.showSkillMobileModal = function () {
        var _this = this;
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_7__modals_mobile_modals_skill_mobile_modal_skill_mobile_modal_component__["a" /* SkillMobileModalComponent */], {
            skills: this.skills
        }).subscribe(function (skills) {
            if (skills) {
                _this.selectedSkills = skills;
                _this.getSearchBody('members', { index: 0, value: skills });
            }
        });
    };
    MeetSearchComponent.prototype.showCategoryMobileModal = function () {
        var _this = this;
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_6__modals_mobile_modals_category_mobile_modal_category_mobile_modal_component__["a" /* CategoryMobileModalComponent */], {
            categories: this.categories
        }).subscribe(function (category) {
            if (category)
                _this.selectCategory(category);
        });
    };
    MeetSearchComponent.prototype.showLocationMobileModal = function () {
        var _this = this;
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_8__modals_mobile_modals_location_mobile_modal_location_mobile_modal_component__["a" /* LocationMobileModalComponent */], {
            noVariable: 'hello'
        }).subscribe(function (location) {
            if (location) {
                _this.currentLocation = location;
                _this.ChangeDetectorRef.detectChanges();
                setTimeout(function () {
                    _this.getSearchBody('members', { index: 2, value: _this.currentLocation });
                }, 500);
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], MeetSearchComponent.prototype, "mobile", void 0);
    MeetSearchComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-meet-search',
            template: __webpack_require__("./src/app/Components/meet/meet-search/meet-search.component.html"),
            styles: [__webpack_require__("./src/app/Components/meet/meet-search/meet-search.component.scss"), __webpack_require__("./src/public/styles/presentation.scss"), __webpack_require__("./src/public/styles/profile-card.scss"), __webpack_require__("./src/public/styles/tooltip.scss")]
        }),
        __param(8, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["DOCUMENT"])),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_9__Services_Skills_skills_service__["a" /* SkillsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__Services_Skills_skills_service__["a" /* SkillsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_10__Services_Profiles_profiles_service__["a" /* ProfilesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__Services_Profiles_profiles_service__["a" /* ProfilesService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_11__Services_Networks_networks_service__["a" /* NetworksService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__Services_Networks_networks_service__["a" /* NetworksService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__["DialogService"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_12__Services_Authentication_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12__Services_Authentication_token_service__["a" /* TokenService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_13__Services_Pictures_pictures_service__["a" /* PicturesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_13__Services_Pictures_pictures_service__["a" /* PicturesService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _h || Object, Object])
    ], MeetSearchComponent);
    return MeetSearchComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());

//# sourceMappingURL=meet-search.component.js.map

/***/ }),

/***/ "./src/app/Components/meet/meet.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"w-meet\" meetDiv *ngIf=\"!mobile\">\n\t<div class=\"bg-default\">\n        <div class=\"whc-videobg\">\n            <video preload=\"none\" poster=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1491979665/Meet_Background_qgyy9j.png\" loop muted autoplay>\n                <source src=\"/public/videos/Meet.mp4\" type=\"video/mp4\">\n            </video>\n        </div>\n    </div>\n\n    <app-meet-search></app-meet-search>\n</div>\n\n<div id=\"w-meet-mobile\" *ngIf=\"mobile\">\n\t<app-meet-search [mobile]=\"mobile\" ></app-meet-search>\n</div>\n\n<!-- <div id=\"pfffs\" [@popover]=\"popState\" *ngIf=\"!mobile && showPop && banner1\" class=\"presentation-forced-signup bb transition-250\">\n\t<h5>{{ text }}</h5>\n\t<ul class=\"flex\">\n\t\t<li class=\"presentation-forced-signup-mail cursor-pt\" (click)=\"signIn()\"><img src=\"/public/images/mailbox-icon-w.png\" alt=\"mailbox\"></li>\n\t\t<a href=\"/api/auth/google\" target=\"_self\"><li class=\"presentation-forced-signup-google\"><img src=\"/public/images/social_media/newgoogle-logo.svg\"></li></a>\n\t\t<a href=\"api/auth/facebook\" target=\"_self\"><li class=\"presentation-forced-signup-facebook\"><i class=\"fa fa-facebook\" style=\"color: white\"></i></li></a>\n\t</ul>\n</div>\n<div [@popover]=\"popState\" *ngIf=\"!mobile && showPop && banner2 && !noBanner\" class=\"presentation-forced-signup bb transition-250\">\n\t<img class=\"crossover cursor-pt\" src=\"/public/images/cross-icon.svg\" alt=\"cross-icon\" (click)=\"closeModal()\"/>\n\t<h5 [innerHtml]=\"text | sanitizeHtml \"></h5>\n\t<button class=\"flex\" *ngIf=\"popState === 'up2'\" (click)=\"showSocialModal(3)\"><img src=\"/public/images/social_media/newgoogle-logo.svg\"> <span class=\"freigb\">Connect your Google account</span></button>\n</div> -->\n\n<div [@popover]=\"popState\" *ngIf=\"!mobile && showPop\" class=\"presentation-forced-signup2 bb transition-450\">\n\t<div class=\"pfs-text flex\" *ngIf=\"!log\">\n\t\t<p class=\"freigb\">Looking to meet your next intern, cofounder, coworker or soulmate?</p>\n\t\t<button (click)=\"signIn()\">Join us, it's free<span> 🎉</span></button>\n\t</div>\n\n\t<div class=\"pfs-text flex\" *ngIf=\"log\">\n\t\t<p class=\"freigb\">Have some friends looking for their next gig, internship or job?</p>\n\t\t<button class=\"button2\" (click)=\"showInvitationModal()\">Send them an invite <span> 🎉</span></button>\n\t</div>\n</div>\n\n<app-footer></app-footer>\n"

/***/ }),

/***/ "./src/app/Components/meet/meet.component.scss":
/***/ (function(module, exports) {

module.exports = ".whc-videobg {\n  background: rgba(0, 0, 0, 0.5);\n  /* For Safari 5.1 to 6.0 */\n  /* For Opera 11.1 to 12.0 */\n  /* For Firefox 3.6 to 15 */\n  background: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0.9)));\n  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9));\n  /* Standard syntax (must be last) */ }\n\n.presentation-component {\n  top: 120px !important; }\n\n.meet-component li {\n  padding: 10px 20px 5px 20px;\n  font-family: 'FreigBook';\n  color: #222222;\n  font-size: 18px; }\n\n.meet-component li:hover {\n  border-radius: 8px;\n  background-color: #F5F5F5; }\n\n.meet-component ul {\n  padding-bottom: 10px;\n  margin-top: 8px; }\n\n.meet-component .meet-search2-anylocation {\n  position: relative;\n  right: 10px; }\n\n.meet-component .meet-search2-anylocation input {\n    width: 160px !important;\n    margin-left: 10px;\n    padding-top: 5px;\n    padding-bottom: 5px;\n    margin-top: 0;\n    margin-bottom: 0; }\n\n.meet-component .meet-search2-anylocation input:focus {\n    color: white; }\n\n.meet-component .meet-search1 .meet-search1-dropdown {\n  display: inline-block;\n  margin: 0px 10px 10px 0px; }\n\n.meet-component .meet-search1 .meet-search1-dropdown h2 {\n    padding: 6px 5px 6px 10px; }\n\n.meet-component .meet-search1 .meet-search1-anyskill input {\n  width: 130px;\n  -webkit-animation-duration: 0.4s;\n  -moz-animation-duration: 0.4s;\n  -o-animation-duration: 0.4s;\n  -ms-animation-duration: 0.4s; }\n\n.meet-component .meet-search1 #input-msa::-webkit-input-placeholder {\n  color: white; }\n\n.meet-component .meet-search1 #input-msa2::-webkit-input-placeholder {\n  color: rgba(255, 255, 255, 0.3); }\n\n.meet-component .meet-search1 .meet-search1-text {\n  display: inline-block;\n  margin: 0px 10px 0px 0px; }\n\n.meet-component .meet-search1 .meet-search1-text2 {\n  display: inline-block;\n  margin: 0px 10px 0px 0px; }\n\n.meet-component .meet-search1 .meet-skill-list {\n  margin-right: 10px;\n  margin-bottom: 10px;\n  -webkit-animation-duration: 0.4s;\n  -moz-animation-duration: 0.4s;\n  -o-animation-duration: 0.4s;\n  -ms-animation-duration: 0.4s; }\n\n.meet-component .meet-search1 .meet-skill-list .meet-skill-tag {\n    display: inline-block; }\n\n.meet-component .meet-search1 .meet-skill-list .meet-skill-tag h2 {\n      display: inline-block;\n      padding: 6px 5px 6px 10px; }\n\n.meet-component .meet-search1 .meet-skill-list .meet-skill-tag .meet-skill-cross {\n      display: inline-block;\n      padding-top: 10px; }\n\n.meet-component .meet-search1 .meet-skill-list .meet-skill-tag .meet-skill-cross img:focus {\n        outline: 0; }\n\n.meet-component .meet-search1 .meet-skill-list span {\n    display: inline-block;\n    font-family: 'FreigBook';\n    font-size: 30px;\n    color: white;\n    margin-bottom: 0; }\n\n.meet-component .meet-search1 .meet-search1-popularskills {\n  display: none; }\n\n.meet-component .meet-search1 .meet-search1-popularskills h3 {\n    font-family: 'FreigBook';\n    color: #999999;\n    font-size: 19px;\n    padding: 8px 20px; }\n\n.meet-component .meet-search1 .meet-search1-downbox1 {\n  display: none;\n  max-height: 240px;\n  min-height: 50px;\n  overflow: auto; }\n\n.meet-component .meet-search1 .meet-search1-downbox1 span {\n    padding: 10px;\n    font-family: 'FreigBook';\n    font-style: italic;\n    font-size: 16px;\n    color: #999999; }\n\n.meet-component .meet-search1 .meet-search1-downbox2 {\n  display: none; }\n\n.meet-component .meet-search1 .inputfield input {\n  margin: 0;\n  padding: 5px 10px;\n  color: white; }\n\n.meet-component .meet-search1 .meet-search2-text2 {\n  display: inline-block;\n  margin: 0px 10px 0px 0px; }\n\n.meet-component .meet-search2 {\n  margin: 5px 0; }\n\n.meet-component .meet-search2 .meet-search2-text1 {\n    display: inline-block; }\n\n.meet-component .meet-search2 .meet-search2-dropdown {\n    display: inline-block; }\n\n.meet-component .meet-search2 .meet-search2-dropdown h2 {\n      padding: 10px 15px 10px 10px; }\n\n.meet-component .meet-search2 .meet-search2-dropdown .meet-search2-anyskills {\n      margin-left: 20px;\n      margin-right: 10px; }\n\n.meet-component .meet-search2 .meet-search2-anylocation input {\n    width: 200px; }\n\n.meet-component .meet-search2 .meet-search2-text2 {\n    display: inline-block;\n    margin: 0px 10px 0px 0px; }\n\n.meet-body-content {\n  min-height: 700px; }\n\n.meet-body-content .meet-body-container {\n    max-width: 1000px;\n    margin: 0 auto;\n    padding-left: 10px;\n    -webkit-transition-delay: all 500ms linear;\n    -kthtml-transition-delay: all 500ms linear;\n    transition-delay: all 500ms linear; }\n\n.meet-body-content .meet-body-container .meet-body-cards {\n      text-align: left;\n      display: inline-block; }\n\n.meet-body-content .meet-body-container .meet-body-cards .meet-body-card {\n        display: inline-table;\n        text-align: center;\n        width: 207px;\n        height: 260px;\n        margin: 0px 16px 50px 16px;\n        border: 1px solid #E5E5E5;\n        border-radius: 5px; }\n\n.meet-body-content .meet-body-container .meet-search-found h2 {\n      font-family: 'FreigLight';\n      color: black;\n      padding: 45px 20px 45px 16px;\n      line-height: 38px; }\n\n/******************** MOBILE ****************************/\n\n@media only screen and (max-width: 736px) {\n  #w-meet-mobile .wm-body-mobile {\n    position: relative;\n    background-image: url(\"/public/images/bg_mobile/bg_home_mobile.jpg\");\n    overflow-y: hidden; }\n    #w-meet-mobile .wm-body-mobile .filter {\n      height: 600px;\n      background: rgba(0, 0, 0, 0.7); }\n    #w-meet-mobile .wm-body-mobile h1, #w-meet-mobile .wm-body-mobile span {\n      font-size: 28px; }\n    #w-meet-mobile .wm-body-mobile h2 {\n      font-family: 'FreigLight';\n      font-size: 28px;\n      white-space: nowrap; }\n    #w-meet-mobile .wm-body-mobile .lowercase {\n      text-transform: lowercase; }\n    #w-meet-mobile .wm-body-mobile .wmbm-fields {\n      position: relative;\n      padding: 130px 20px 20px 20px; }\n      #w-meet-mobile .wm-body-mobile .wmbm-fields .wmbm-boxes {\n        position: relative;\n        -webkit-box-align: start;\n            -ms-flex-align: start;\n                align-items: flex-start;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap; }\n        #w-meet-mobile .wm-body-mobile .wmbm-fields .wmbm-boxes .wmbmb-box1 {\n          -ms-flex-wrap: wrap;\n              flex-wrap: wrap; }\n        #w-meet-mobile .wm-body-mobile .wmbm-fields .wmbm-boxes .location-h2 {\n          white-space: nowrap;\n          overflow: hidden; }\n        #w-meet-mobile .wm-body-mobile .wmbm-fields .wmbm-boxes .border-bottom {\n          border-bottom: 1px solid #fff; }\n  #w-meet-mobile .meet-body-cards {\n    text-align: center; } }\n"

/***/ }),

/***/ "./src/app/Components/meet/meet.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export textScrollMeet */
/* unused harmony export textScrollMeet1 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MeetComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__ = __webpack_require__("./node_modules/ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_invitation_social_invitation_social_component__ = __webpack_require__("./src/app/Components/modals/invitation-social/invitation-social.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_Skills_skills_service__ = __webpack_require__("./src/app/Services/Skills/skills.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_Profiles_profiles_service__ = __webpack_require__("./src/app/Services/Profiles/profiles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Services_Networks_networks_service__ = __webpack_require__("./src/app/Services/Networks/networks.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Services_Pictures_pictures_service__ = __webpack_require__("./src/app/Services/Pictures/pictures.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Services_shared_service__ = __webpack_require__("./src/app/Services/shared.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Services_Social_social_service__ = __webpack_require__("./src/app/Services/Social/social.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Services_account_service__ = __webpack_require__("./src/app/Services/account.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Services_meta_service__ = __webpack_require__("./src/app/Services/meta.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Services_Trackings_tracking_service__ = __webpack_require__("./src/app/Services/Trackings/tracking.service.ts");
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




/* Services */










/* Animations */

var textScrollMeet = [
    'Let us find who could help you. Join the most exciting community on the Internet.',
    "It won't take more than 20 seconds",
    'Elon and Mark already signed up 🙈'
];
var textScrollMeet1 = [
    'Want to be listed on top? 🤓 </br> <p>See how ranking is done in your <a href="/statistics" style="border-bottom: 1px solid">Statistics</a> page</p>',
    'Increase your ranking by 283 % and get 27x more exposure, instantly',
    ''
];
var MeetComponent = /** @class */ (function () {
    function MeetComponent(TokenService, SharedService, NetworksService, ProfilesService, SocialService, dialogService, AccountService, MetaService, Title, TrackingService, document) {
        this.TokenService = TokenService;
        this.SharedService = SharedService;
        this.NetworksService = NetworksService;
        this.ProfilesService = ProfilesService;
        this.SocialService = SocialService;
        this.dialogService = dialogService;
        this.AccountService = AccountService;
        this.MetaService = MetaService;
        this.Title = Title;
        this.TrackingService = TrackingService;
        this.document = document;
        this.mobile = false;
        this.showPop = false;
        this.log = false;
        this.banner1 = false;
        this.banner2 = false;
        this.alreadyPop = false;
        this.notPop = false;
        this.isAuthorized = false;
        this.noBanner = false;
        this.googleCheck = false;
    }
    MeetComponent.prototype.ngOnInit = function () {
        this.initWindow();
        this.initToken();
        this.initGoogleInvite();
        this.setMetaData();
        this.trackViewPage();
    };
    MeetComponent.prototype.trackViewPage = function () {
        var token = this.TokenService.getToken();
        this.TrackingService.viewActivities({}, token, 7).subscribe(function (r) { });
    };
    MeetComponent.prototype.setMetaData = function () {
        this.Title.setTitle('Witty | Meet');
        this.MetaService.setMeta('description', "Witty is the professional network for the entrepreneurial age. We connect millions of people to what's being built around them, including you.");
        this.MetaService.setMeta('og:title', 'Meet the people you truly need - Witty');
        this.MetaService.setMeta('og:description', 'Meet thousands of designers, programmers, engineers and creative people ready to help you grow your project.');
        this.MetaService.setMeta('og:url', 'https://www.wittycircle.com/meet');
        this.MetaService.setMeta('og:image', 'http://res.cloudinary.com/dqpkpmrgk/image/upload/v1508448688/Share_Link_Cards_Facebook/Thanks_But_No_Thanks_Sheep_Head.png');
    };
    MeetComponent.prototype.initWindow = function () {
        window.scrollTo(0, 0);
        if ((window.screen.width) < 736)
            this.mobile = true;
    };
    MeetComponent.prototype.initToken = function () {
        if (this.TokenService.getToken() && this.TokenService.getToken().user) {
            this.initProfile(this.TokenService.getToken().user['id']);
            this.log = true;
        }
    };
    MeetComponent.prototype.initProfile = function (id) {
        this.ProfilesService.getProfile(id).subscribe(function (res) {
            if (res)
                textScrollMeet1[2] = '<img style="width: 45px; border-radius: 50%;" src="' + res.profile.picture + '" alt="profile_picture"/><br /> or share your own <a href="/invite/' + res.profile.invite_link + '" style="border-bottom: 1px solid #fff">invite link</a>';
        });
    };
    MeetComponent.prototype.initGoogleInvite = function () {
        var _this = this;
        if (this.TokenService.getToken()) {
            var my_id = this.TokenService.getToken().user.id;
            this.AccountService.getSocialInvite(my_id).subscribe(function (check) {
                _this.googleCheck = check.invite_google;
            });
        }
    };
    MeetComponent.prototype.signIn = function () {
        this.notShowPop();
        this.SharedService.setSignUpStatus(true);
    };
    MeetComponent.prototype.notShowPop = function () {
        var _this = this;
        this.notPop = true;
        this.popState = '';
        this.showPop = false;
        this.alreadyPop = false;
        setTimeout(function () {
            _this.notPop = false;
        }, 1000 * 10);
    };
    MeetComponent.prototype.closeModal = function () {
        var _this = this;
        this.popState = '';
        setTimeout(function () {
            _this.noBanner = true;
        }, 200);
    };
    // showSocialModal(index) {
    // 	this.popState 	= ''
    // 	let disposable 	= this.dialogService.addDialog(GoogleContactModalComponent, {
    //        	profile 	: {},
    //        	index 		: index
    //    	}).subscribe( success => {
    //    		console.log(success);
    //    	});
    // }
    MeetComponent.prototype.showInvitationModal = function () {
        var _this = this;
        window.scrollTo(0, 0);
        this.notShowPop();
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_3__modals_invitation_social_invitation_social_component__["a" /* InvitationSocialComponent */], {
            check: true
        }).subscribe(function (success) {
            _this.notPop = false;
        });
    };
    /* ON SCROLL EVENT */
    MeetComponent.prototype.onWindowScroll = function () {
        var number = this.document.documentElement.scrollTop;
        if (!this.notPop) {
            if (number > 50 && !this.alreadyPop) {
                if (this.popState !== 'up1') {
                    this.popState = 'up1';
                    this.showPop = true;
                    this.alreadyPop = true;
                }
            }
            else if (number <= 50 && this.alreadyPop) {
                this.popState = '';
                this.showPop = false;
                this.alreadyPop = false;
            }
        }
        // if (!this.log) {
        // 	this.banner1 = true
        // 	this.banner2 = false
        // 	let number = this.document.body.scrollTop;
        // 	if (number > 50 && number < 300) {
        // 		if (this.popState !== 'up1') {
        // 			this.text 		= textScrollMeet[0]
        // 			this.popState 	= 'up1'
        // 			this.showPop 	= true
        // 		}
        // 	} else if (number > 300 && number < 600) {
        // 		if (this.popState !== 'up2') {
        // 			this.popState 	= 'up2'
        // 			this.text 		= textScrollMeet[1]
        // 		}
        // 	} else if (number > 600 && number < 900) {
        // 		if (this.popState !== 'up3') {
        // 			this.popState 	= 'up3'
        // 			this.text 		= textScrollMeet[2]
        // 		}
        // 	} else if (number <= 50) {
        // 		this.popState 	= ''
        // 		this.showPop 	= false
        // 	}
        // } else {
        // 	if (!this.googleCheck) {
        // 		this.banner1 = false
        // 		this.banner2 = true
        // 		let number = this.document.body.scrollTop;
        // 		if (number > 50 && number < 300) {
        // 			if (this.popState !== 'up1') {
        // 				this.text 		= textScrollMeet1[0]
        // 				this.popState 	= 'up1'
        // 				this.showPop 	= true
        // 			}
        // 		} else if (number > 300 && number < 800) {
        // 			if (this.popState !== 'up2') {
        // 				this.popState 	= 'up2'
        // 				this.text 		= textScrollMeet1[1]
        // 			}
        // 		} else if (number > 800) {
        // 			if (this.popState !== 'up3') {
        // 				this.popState 	= 'up3'
        // 				this.text 		= textScrollMeet1[2]
        // 			}
        // 		} else if (number <= 50) {
        // 			this.popState 	= ''
        // 			this.showPop 	= false
        // 		}
        // 	}
        // }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])("window:scroll", []),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MeetComponent.prototype, "onWindowScroll", null);
    MeetComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-meet',
            template: __webpack_require__("./src/app/Components/meet/meet.component.html"),
            styles: [__webpack_require__("./src/app/Components/meet/meet.component.scss"), __webpack_require__("./src/public/styles/presentation.scss")],
            providers: [__WEBPACK_IMPORTED_MODULE_4__Services_Skills_skills_service__["a" /* SkillsService */], __WEBPACK_IMPORTED_MODULE_5__Services_Profiles_profiles_service__["a" /* ProfilesService */], __WEBPACK_IMPORTED_MODULE_6__Services_Networks_networks_service__["a" /* NetworksService */], __WEBPACK_IMPORTED_MODULE_8__Services_Pictures_pictures_service__["a" /* PicturesService */], __WEBPACK_IMPORTED_MODULE_10__Services_Social_social_service__["a" /* SocialService */], __WEBPACK_IMPORTED_MODULE_11__Services_account_service__["a" /* AccountService */]],
            animations: [__WEBPACK_IMPORTED_MODULE_14__Animations_animations__["g" /* popDiscover */]]
        }),
        __param(10, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["DOCUMENT"])),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_7__Services_Authentication_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__Services_Authentication_token_service__["a" /* TokenService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_9__Services_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__Services_shared_service__["a" /* SharedService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__Services_Networks_networks_service__["a" /* NetworksService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__Services_Networks_networks_service__["a" /* NetworksService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__Services_Profiles_profiles_service__["a" /* ProfilesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_Profiles_profiles_service__["a" /* ProfilesService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_10__Services_Social_social_service__["a" /* SocialService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__Services_Social_social_service__["a" /* SocialService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__["DialogService"]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_11__Services_account_service__["a" /* AccountService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__Services_account_service__["a" /* AccountService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_12__Services_meta_service__["a" /* MetaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12__Services_meta_service__["a" /* MetaService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["Title"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["Title"]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_13__Services_Trackings_tracking_service__["a" /* TrackingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_13__Services_Trackings_tracking_service__["a" /* TrackingService */]) === "function" && _k || Object, Object])
    ], MeetComponent);
    return MeetComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
}());

//# sourceMappingURL=meet.component.js.map

/***/ }),

/***/ "./src/app/Components/meet/meet.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MeetModule", function() { return MeetModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__ = __webpack_require__("./src/app/Pipes/pipe.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_infinite_scroll__ = __webpack_require__("./node_modules/ngx-infinite-scroll/modules/ngx-infinite-scroll.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__footer_footer_module__ = __webpack_require__("./src/app/Components/footer/footer.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__meet_component__ = __webpack_require__("./src/app/Components/meet/meet.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__meet_search_meet_search_component__ = __webpack_require__("./src/app/Components/meet/meet-search/meet-search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Directives_Meet_meet_directive__ = __webpack_require__("./src/app/Directives/Meet/meet.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Directives_Meet_meet_wms1_directive__ = __webpack_require__("./src/app/Directives/Meet/meet-wms1.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Directives_Meet_meet_wms2i_directive__ = __webpack_require__("./src/app/Directives/Meet/meet-wms2i.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Directives_directives_module__ = __webpack_require__("./src/app/Directives/directives.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Routes_meet_routes__ = __webpack_require__("./src/app/Routes/meet.routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




/* Custom Modules */



/* Components */


/* Directives */




/* Route */

var MeetModule = /** @class */ (function () {
    function MeetModule() {
    }
    MeetModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_13__Routes_meet_routes__["a" /* MEET_ROUTES */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["f" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__["a" /* PipeModule */],
                __WEBPACK_IMPORTED_MODULE_6__footer_footer_module__["a" /* FooterModule */],
                __WEBPACK_IMPORTED_MODULE_5_ngx_infinite_scroll__["a" /* InfiniteScrollModule */],
                __WEBPACK_IMPORTED_MODULE_12__Directives_directives_module__["a" /* DirectivesModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__meet_component__["a" /* MeetComponent */],
                __WEBPACK_IMPORTED_MODULE_9__Directives_Meet_meet_directive__["a" /* MeetDirective */],
                __WEBPACK_IMPORTED_MODULE_10__Directives_Meet_meet_wms1_directive__["a" /* MeetDirectiveWMS1 */],
                __WEBPACK_IMPORTED_MODULE_11__Directives_Meet_meet_wms2i_directive__["a" /* MeetDirectiveWMS2I */],
                __WEBPACK_IMPORTED_MODULE_8__meet_search_meet_search_component__["a" /* MeetSearchComponent */],
            ],
            exports: []
        })
    ], MeetModule);
    return MeetModule;
}());

//# sourceMappingURL=meet.module.js.map

/***/ }),

/***/ "./src/app/Directives/Meet/meet-wms1.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MeetDirectiveWMS1; });
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

var MeetDirectiveWMS1 = /** @class */ (function () {
    function MeetDirectiveWMS1(el) {
        this.el = el;
    }
    MeetDirectiveWMS1.prototype.onMouseEnter = function (event) {
        this.nativeElement = this.el.nativeElement.parentNode;
        if (this.el.nativeElement.contains(event.target) ||
            this.nativeElement.querySelector('#wms-2').contains(event.target)) {
            if (!this.nativeElement.querySelector('#wms-1-4'))
                this.el.nativeElement.parentNode.querySelector('#wms-2-0').style.display = 'inline-block';
        }
    };
    MeetDirectiveWMS1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[m_wms1]',
            host: {
                '(mouseenter)': 'onMouseEnter($event)',
            },
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
    ], MeetDirectiveWMS1);
    return MeetDirectiveWMS1;
    var _a;
}());

//# sourceMappingURL=meet-wms1.directive.js.map

/***/ }),

/***/ "./src/app/Directives/Meet/meet-wms2i.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MeetDirectiveWMS2I; });
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

var MeetDirectiveWMS2I = /** @class */ (function () {
    function MeetDirectiveWMS2I(el) {
        this.el = el;
        this.nativeElement = el.nativeElement.parentNode.parentNode;
    }
    MeetDirectiveWMS2I.prototype.showPopularBox = function () {
        this.nativeElement.querySelector('#wms-2-1').style.display = 'block';
    };
    MeetDirectiveWMS2I.prototype.hidePopularBox = function () {
        this.nativeElement.querySelector('#wms-2-1').style.display = 'none';
    };
    MeetDirectiveWMS2I.prototype.showSearchBox = function () {
        this.nativeElement.querySelector('#wms-2-2').style.display = 'block';
    };
    MeetDirectiveWMS2I.prototype.hideSearchBox = function () {
        this.nativeElement.querySelector('#wms-2-2').style.display = 'none';
    };
    MeetDirectiveWMS2I.prototype.onInputChange = function (event) {
        if (event && this.nativeElement.querySelector('#wms-2-2').style.display !== 'block') {
            this.showSearchBox();
            this.hidePopularBox();
        }
        else if (!event) {
            this.hideSearchBox();
            this.showPopularBox();
        }
    };
    MeetDirectiveWMS2I = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[m_wms2_i]',
            host: {
                '(ngModelChange)': 'onInputChange($event)'
            }
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
    ], MeetDirectiveWMS2I);
    return MeetDirectiveWMS2I;
    var _a;
}());

//# sourceMappingURL=meet-wms2i.directive.js.map

/***/ }),

/***/ "./src/app/Directives/Meet/meet.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MeetDirective; });
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

var MeetDirective = /** @class */ (function () {
    function MeetDirective(el) {
        this.el = el;
        this.nativeElement = el.nativeElement;
    }
    MeetDirective.prototype.rotateUp = function (sub_id) {
        var id = sub_id + '-img';
        this.nativeElement.querySelector(id).style.transform = 'rotate(180deg)';
    };
    MeetDirective.prototype.rotateDown = function (sub_id) {
        var id = sub_id + '-img';
        this.nativeElement.querySelector(id).style.transform = 'rotate(0)';
    };
    /* Box1 */
    MeetDirective.prototype.showBox1 = function () {
    };
    MeetDirective.prototype.hideBox1 = function () {
        if (this.nativeElement.querySelector('#wms-1-0'))
            this.nativeElement.querySelector('#wms-2-0').style.display = 'none';
    };
    /* Box2 */
    // showBox2() {
    // 	if (this.nativeElement.querySelector('#wms-2-2').style.display !== 'block') {
    // 		this.nativeElement.querySelector('#wms-2-1').style.display = 'inline-block';
    // 		this.hideBox3();
    // 		this.hideBox5();
    // 	}
    // }
    // hideBox2() {
    // 	this.nativeElement.querySelector('#wms-2-1').style.display = 'none'
    // }
    /* Box3 */
    MeetDirective.prototype.showBox3 = function () {
        if (this.nativeElement.querySelector('#wms-3-1').style.display !== 'inline-block') {
            this.rotateUp('#wms-3');
            this.nativeElement.querySelector('#wms-3-1').style.display = 'inline-block';
            // this.hideBox2();
            this.hideBox5();
        }
        else {
            this.rotateDown('#wms-3');
            this.hideBox3();
        }
    };
    MeetDirective.prototype.hideBox3 = function () {
        this.rotateDown('#wms-3');
        this.nativeElement.querySelector('#wms-3-1').style.display = 'none';
    };
    /* Box4 */
    // showBox4() {
    // 	if (this.nativeElement.querySelector('#wms-2-1').style.display !== 'inline-block') {
    // 		this.nativeElement.querySelector('#wms-2-2').style.display = 'block';
    // 		this.hideBox3();
    // 		this.hideBox5();
    // 	}
    // }
    // hideBox4() {
    // 	this.nativeElement.querySelector('#wms-2-2').style.display = 'none'
    // }
    /* Box5 */
    MeetDirective.prototype.showBox5 = function () {
        if (this.nativeElement.querySelector('#wms-5-1-1').style.display !== 'block') {
            this.rotateUp('#wms-5-1');
            this.nativeElement.querySelector('#wms-5-1-1').style.display = 'block';
            // this.hideBox2();
            this.hideBox3();
        }
        else {
            this.rotateDown('#wms-5-1');
            this.nativeElement.querySelector('#wms-5-1-1').style.display = 'none';
        }
    };
    MeetDirective.prototype.hideBox5 = function () {
        this.rotateDown('#wms-5-1');
        this.nativeElement.querySelector('#wms-5-1-1').style.display = 'none';
    };
    /* Box6 */
    MeetDirective.prototype.showBox6 = function () {
        if (this.nativeElement.querySelector('#wms-5').style.display !== 'block') {
            this.rotateUp('#wms-6');
            this.nativeElement.querySelector('#wms-5').style.display = 'block';
        }
        else {
            this.rotateDown('#wms-6');
            this.nativeElement.querySelector('#wms-5').style.display = 'none';
        }
    };
    /* Box7 */
    MeetDirective.prototype.showBox7 = function () {
        if (this.nativeElement.querySelector('#wms-5-3-1'))
            this.nativeElement.querySelector('#wms-5-3-1').style.display = 'block';
    };
    MeetDirective.prototype.hideBox7 = function () {
        if (this.nativeElement.querySelector('#wms-5-3-1'))
            this.nativeElement.querySelector('#wms-5-3-1').style.display = 'none';
    };
    /* Box/Placeholder */
    MeetDirective.prototype.showPlaceholder = function () {
        if (!this.nativeElement.querySelector('#wms-2-i').value)
            this.nativeElement.querySelector('#wms-2-l').style.display = 'block';
    };
    MeetDirective.prototype.hidePlaceholder = function () {
        this.nativeElement.querySelector('#wms-2-l').style.display = 'none';
    };
    MeetDirective.prototype.onClick = function (event) {
        if (this.nativeElement.querySelector('#wms-2').contains(event.target)) {
            // this.showBox2();
            this.hidePlaceholder();
            // if (this.nativeElement.querySelector('#wms-2-1-1').contains(event.target) ||
            // 	this.nativeElement.querySelector('#wms-2-2-1').contains(event.target)) {
            // 	this.hideBox1();
            // 	// this.hideBox2();
            // 	this.hideBox3();
            // 	this.hideBox4();
            // 	this.showPlaceholder();
            // }
        }
        else if (this.nativeElement.querySelector('#wms-3').contains(event.target)) {
            this.showBox3();
            this.showPlaceholder();
            if (this.nativeElement.querySelector('#wms-3-1-1').contains(event.target)) {
                // this.hideBox2();
                this.hideBox3();
            }
        }
        else if (this.nativeElement.querySelector('#wms-5-1').contains(event.target)) {
            this.showBox5();
            this.showPlaceholder();
        }
        else if (this.nativeElement.querySelector('#wms-6').contains(event.target)) {
            this.showBox6();
        }
        else if (this.nativeElement.querySelector('#wms-5-3-i') &&
            this.nativeElement.querySelector('#wms-5-3-i').contains(event.target)) {
            this.showBox7();
        }
        else {
            this.hideBox1();
            // this.hideBox2();
            this.hideBox3();
            this.hideBox5();
            this.hideBox7();
            this.showPlaceholder();
        }
    };
    MeetDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[meetDiv]',
            host: {
                '(document:click)': 'onClick($event)',
            },
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
    ], MeetDirective);
    return MeetDirective;
    var _a;
}());

//# sourceMappingURL=meet.directive.js.map

/***/ }),

/***/ "./src/app/Interfaces/Constants/categories-meet-constant.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return categoriesMeet; });
var categoriesMeet = [
    {
        id: 1,
        name: 'to meet smart people'
    },
    {
        id: 2,
        name: "to share what they're working on"
    },
    {
        id: 3,
        name: 'for a full time position'
    },
    {
        id: 4,
        name: 'for an internship'
    },
    {
        id: 5,
        name: 'for part time collaboration'
    },
    {
        id: 5,
        name: 'for anything'
    }
];
//# sourceMappingURL=categories-meet-constant.js.map

/***/ }),

/***/ "./src/app/Routes/meet.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MEET_ROUTES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Components_meet_meet_component__ = __webpack_require__("./src/app/Components/meet/meet.component.ts");

/* Components */

/* Librairies */
// import { MetaGuard } from '@ngx-meta/core';
var routes = [
    { path: '', canActivate: [], component: __WEBPACK_IMPORTED_MODULE_1__Components_meet_meet_component__["a" /* MeetComponent */]
        // data: {
        // 	meta: {
        // 		title		: 'Wittycircle | Meet',
        // 		description	: 'Meet thousands of designers, programmers, engineers and creative people ready to help you grow your project.',
        // 		url			: "https://www.wittycircle.com/meet",
        // 		'og:url'	: "https://www.wittycircle.com/meet",
        // 		'og:image'	: 'https://res.cloudinary.com/dqpkpmrgk/image/upload/v1465994773/Share_Link_Cards_Facebook/Share_Pic_Facebook_Meet.pn',
        // 		'og:type'	: 'website',
        // 		'og:locale'	: 'en_US',
        // 	}
        // }
    },
];
var MEET_ROUTES = __WEBPACK_IMPORTED_MODULE_0__angular_router__["f" /* RouterModule */].forChild(routes);
//# sourceMappingURL=meet.routes.js.map

/***/ })

});
//# sourceMappingURL=meet.module.chunk.js.map