webpackJsonp(["discover.module"],{

/***/ "./src/app/Components/discover/discover-search/discover-search.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"discover-component presentation-component\" *ngIf=\"!mobile\">\n\t<div class=\"discover-title presentation-title\">\n\t\t<h2>What do you want to discover?</h2>\n\t</div>\n\n\t<div class=\"discover-search1\">\n\t\t<div id=\"wds-1\" class=\"discover-search1-dropdown flex\">\n\t\t\t<div class=\"searchbox flex\">\n\t\t\t\t<h2>{{ currentStatus }}</h2>\n\t\t\t\t<img id=\"wds-1-img\" class=\"transition-150\" src=\"/public/images/arrow-down-icon-w.svg\">\n\t\t\t</div>\n\t\t\t<aside id=\"wds-1-s\" class=\"discover-search1-downbox1\">\n\t\t\t\t<ul>\n\t\t\t\t\t<li class=\"cursor-pt\" *ngFor=\"let status of statutes\" (click)=\"selectStatus(status.name, status.searchName)\">{{ status.name }}</li>\n\t\t\t\t</ul>\n\t\t\t</aside>\n\t\t</div>\n\t\t<div class=\"discover-search1-text\">\n\t\t\t<h2>about</h2>\n\t\t</div>\n\t\t<div id=\"wds-2\" class=\"discover-search1-dropdown flex\">\n\t\t\t<div class=\"searchbox flex\">\n\t\t\t\t<h2>{{ currentCategory }}</h2>\n\t\t\t\t<img id=\"wds-2-img\" class=\"transition-150\" src=\"/public/images/arrow-down-icon-w.svg\">\n\t\t\t</div>\n\t\t\t<aside id=\"wds-2-s\" class=\"discover-search1-downbox2\">\n\t\t\t\t<ul>\n\t\t\t\t\t<li class=\"cursor-pt\" *ngFor=\"let category of categories\" (click)=\"selectCategory(category.name)\">{{ category.name }}</li>\n\t\t\t\t</ul>\n\t\t\t</aside>\n\t\t</div>\n\t</div>\n\n\t<div class=\"discover-search2\">\n\t\t<div class=\"discover-search2-text\">\n\t\t\t<h2 class=\"discover-search2-textarticle\">looking </h2>\n\t\t</div>\n\t\t<div id=\"wds-3\" class=\"discover-search2-dropdown\">\n\t\t\t<div class=\"discover-search2-ah searchbox\">\n\t\t\t\t<h2>{{ currentNeed }}</h2>\n\t\t\t\t<img id=\"wds-3-img\" class=\"transition-150\" src=\"/public/images/arrow-down-icon-w.svg\">\n\t\t\t</div>\n\t\t\t<aside id=\"wds-3-s\" class=\"discover-search2-downbox\">\n\t\t\t\t<ul>\n\t\t\t\t\t<li class=\"cursor-pt\" *ngFor=\"let needStatus of needStatutes\" (click)=\"selectNeedStatus(needStatus.name)\">{{ needStatus.name }}</li>\n\t\t\t\t</ul>\n\t\t\t</aside>\n\t\t</div>\n\t\t<div class=\"discover-search2-text animated fadeIn\">\n\t\t\t<h2 *ngIf=\"currentNeed !== 'for feedback' && currentNeed === 'for help' || currentNeed === 'for anything'\">in</h2>\n\t\t\t<h2 *ngIf=\"currentNeed !== 'for feedback' && currentNeed !== 'for help' && currentNeed !== 'for anything'\">skilled in</h2>\n\t\t</div>\n\t\t<div class=\"discover-skill-list\" *ngFor=\"let selectedSkill of selectedSkills; let last = last; let in = index\" [attr.id]=\"'wds-4-' + in\" d_wds4>\n\t\t\t<div class=\"discover-skill-tag searchbox\" *ngIf=\"currentNeed !== 'for feedback'\">\n\t\t\t\t<h2>{{ selectedSkill }}</h2>\n\t\t\t\t<div class=\"discover-skill-cross\" (click)=\"removeSkill(selectedSkill)\">\n\t\t\t\t\t<img src=\"/public/images/cross-icon.svg\">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<span *ngIf=\"!last && currentNeed !== 'for feedback'\">,</span>\n<!-- \t\t\t<span *ngIf=\"last && selectedSkills.length === 5\">,</span>\n -->\t\t</div>\n\t\t<div id=\"wds-5\" class=\"discover-search2-dropdown2\" *ngIf=\"currentNeed !== 'for feedback'\">\n\t\t\t<div class=\"discover-search2-anyskill inputfield\">\n\t\t\t\t<input id=\"wds-5-i\" (click)=\"showSkillModal()\" (mouseenter)=\"changePlaceholder()\" (mouseleave)=\"changePlaceholder()\" type=\"search\" [(ngModel)]=\"skillName\" d_sub1>\n\t\t\t\t<label id=\"wds-5-l\" [@fadeIn]=\"visibility\">{{ placeholder }}</label>\n\t\t\t</div>\n\t\t\t<!-- <aside id=\"wds-5-s-1\" class=\"discover-search2-popularskills downbox\">\n\t\t\t\t<ul id=\"wds-5-s-1-1\">\n\t\t\t\t\t<h3>Popular skills:</h3>\n\t\t\t\t\t<li class=\"cursor-pt\" *ngFor=\"let popularSkill of popularSkills\" (click)=\"selectSkill(popularSkill.name)\">{{ popularSkill.name }}</li>\n\t\t\t\t</ul>\n\t\t\t</aside>\n\t\t\t<aside id=\"wds-5-s-2\" class=\"discover-search2-downbox1 downbox\">\n\t\t\t\t<ul id=\"wds-5-s-2-1\">\n\t\t\t\t\t<li class=\"cursor-pt\" *ngFor=\"let skill of skills | searchPipe: 'name': skillName\" (click)=\"selectSkill(skill.name)\">{{ skill.name }}</li>\n\t\t\t\t\t<span *ngIf=\"(skills | searchPipe: 'name': skillName) === true\">No skill found...</span>\n\t\t\t\t</ul>\n\t\t\t</aside> -->\n\t\t</div>\n\t\t<div class=\"bomobi discover-search2-text\">\n\t\t\t<h2>near</h2>\n\t\t</div>\n\t\t<div class=\"discover-search2-anylocation inputfield\">\n\t\t\t<input type=\"text\" [(ngModel)]=\"location\" placeholder=\"Any location\" (setAddress)=\"getAddress($event)\" googlePlace />\n\t\t</div>\n\t</div>\n</div>\n\n<div class=\"presentation-search2\" *ngIf=\"!mobile\">\n    <div class=\"presentation-search2-right flex\">\n        <div id=\"wds-6\" class=\"presentation-search2-right-input flex-grow\">\n            <div id=\"wds-6-1\" class=\"presentation-search2-left inline\">\n                <h3 class=\"inline\">Ranked by: </h3>\n                <div class=\"inline\">\n                    <h3 class=\"inline\">{{ currentRankType }}</h3>\n                    <img id=\"wds-6-1-img\" class=\"inline transition-150\" src=\"/public/images/arrow-down-icon-w.svg\" alt=\"arrow\" />\n                    <ul id=\"wds-6-1-1\" class=\"presentation-search2-left-box\">\n                        <li (click)=\"changeRankType()\" >{{ rankType }}</li>\n                    </ul>\n                </div>\n            </div>\n            <h3 class=\"inline\">network:</h3>\n            <div class=\"network-box inline\" *ngIf=\"selectedNetwork\">\n                <h3 class=\"inline\">{{ selectedNetwork }} <span *ngIf=\"!launched\">(Coming soon)</span></h3>\n                <img (click)=\"removeNetwork()\" class=\"inline cursor-pt\" src=\"/public/images/cross-icon.svg\">\n            </div>\n            <div id=\"wds-6-3\" class=\"network-search inline\" *ngIf=\"!selectedNetwork\">\n                <input id=\"wds-6-3-i\" type=\"text\" [(ngModel)]=\"searchNetwork\" placeholder=\"Berkeley, Numa, 500 Startups...\">\n                <div id=\"wds-6-3-1\" class=\"network-dropdown downbox\" *ngIf=\"networks\">\n                    <h3 *ngIf=\"!searchNetwork\">Popular network: </h3>\n                    <li class=\"cursor-pt\" *ngFor=\"let network of (networks | searchPipe: 'network': searchNetwork).slice(0, 5)\" (click)=\"selectNetwork(network.network, network.launched)\">{{ network.network }}</li>\n                </div>\n            </div>\n        </div>\n        <div id=\"wds-7\" class=\"presentation-search2-right-box cursor-pt\">\n            <h3 class=\"inline\">less criteria</h3>\n            <img id=\"wds-7-img\" class=\"inline\" src=\"/public/images/arrow-down-icon-w.svg\" alt=\"arrow\" />\n        </div>\n    </div>\n</div>\n\n<div class=\"wd-body-mobile bg-default\" *ngIf=\"mobile\">\n  <div class=\"filter\"></div>\n  <div class=\"wbdm-fields\">\n    <h1 class=\"freigl mar-b-15\"><span class=\"freigs\">What</span> do you want to <span class=\"freigs\">discover?</span>\n    </h1>\n\n    <div class=\"wdbm-boxes flex mar-b-15\">\n      <div class=\"wdbmb-box1 flex border-bottom mar-r-15 mar-b-10\" (click)=\"showStatusMobileModal()\">\n        <h2 class=\"mar-r-5\">{{ currentStatus }}</h2>\n        <img src=\"/public/images/arrow-down-icon-w.svg\" alt=\"arrow\"/>\n      </div>\n      <div class=\"wdbmb-box2 flex mar-r-15 mar-b-10\">\n        <h2 class=\"mar-r-15\">about </h2>\n        <div class=\"border-bottom flex\" (click)=\"showCategoryMobileModal()\">\n          <h2 class=\"mar-r-5\">{{ currentCategory }}</h2>\n          <img src=\"/public/images/arrow-down-icon-w.svg\" alt=\"arrow\"/>\n        </div>\n      </div>\n      <div class=\"wdbmb-box3 flex mar-r-15 mar-b-10\">\n        <h2 class=\"mar-r-15\">looking for</h2>\n        <div class=\"border-bottom flex\" (click)=\"showNeedMobileModal()\">\n          <h2 class=\"mar-r-5\">{{ currentNeed }}</h2>\n          <img src=\"/public/images/arrow-down-icon-w.svg\" alt=\"arrow\"/>\n        </div>\n      </div>\n\n      <div class=\"wdbmb-box4 flex mar-b-10\">\n        <h2 class=\"mar-r-15\">near</h2>\n        <div class=\"border-bottom flex\" (click)=\"showLocationMobileModal()\">\n          <h2 class=\"mar-r-5 location-h2\">{{ currentLocation | cut:true:16:' ...' }}</h2>\n          <img src=\"/public/images/arrow-down-icon-w.svg\" alt=\"arrow\"/>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<section id=\"discover-body-content\" infinite-scroll\n\t\t    [infiniteScrollDistance]=\"1\"\n\t\t    [infiniteScrollThrottle]=\"300\"\n\t\t    (scrolled)=\"onScroll()\">\n\t\t<div *ngIf=\"searching\" id=\"hoho\" class=\"loader\"></div>\n\t\t<div *ngIf=\"!searching\" id=\"haha\" class=\"discover-body-container presentation-body-container animated fadeIn\">\n\t\t\t<div class=\"discover-body-title presentation-body-title\">\n\t\t\t\t<h4>Browse <span>the projects below</span> or filter them using our magic tool above. Upvotes and last 24h activity do the ranking.</h4>\n\t\t\t</div>\n\n\t\t\t<div class=\"discover-body-list \">\n\t\t\t\t<div class=\"discover-body-card project-card\" *ngFor=\"let project of projects; let i = index\">\n\t\t\t\t\t<a [routerLink]=\"['/discover']\" [queryParams]=\"{ 'category': project.category_name }\" class=\"card-tag\">\n\t\t\t\t\t\t<div class=\"card-tag-content\">\n\t\t\t\t\t\t\t<div class=\"card-tag-bg\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<img src=\"public/images/tag-icon.png\">\n\t\t\t\t\t\t\t<h5>{{ project.category_name }}</h5>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</a>\n\n\t\t\t\t\t<!-- <div class=\"card-vote\" (click)=\"followProject(project.id, i, project.follow)\">\n\t\t\t\t\t\t<div class=\"card-vote-bg\"></div>\n\t\t\t\t\t\t<img *ngIf=\"!project.follow\" src=\"public/images/Upvote_Icon_w.svg\">\n\t\t\t\t\t\t<img *ngIf=\"project.follow\" src=\"public/images/Upvote_Icon.svg\">\n\t\t\t\t\t\t<span>{{ project.followers }}</span>\n\t\t\t\t\t</div> -->\n\t\t\t\t\t<a [routerLink]=\"['/project', project.public_id, transformUrl(project.title)]\" class=\"card-project-page\" >\n\t\t\t\t\t\t<div class=\"card-picture animated fadeIn\" [style.background-image]=\"'url(' + transformImage(project.picture, 300, 180, 'fill') + ')'\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-info\">\n\t\t\t\t\t\t\t<div class=\"card-title-space\">\n\t\t\t\t\t\t\t\t<h4>{{ project.title }}</h4>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"card-status\">\n\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Company'\" src=\"public/images/live-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Idea'\" src=\"public/images/idea-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Prototype'\" src=\"public/images/drafted-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Beta product'\" src=\"public/images/beta-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t\t{{ project.status }}\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"card-location\">\n\t\t\t\t\t\t\t\t<span *ngIf=\"project.state\"><img src=\"public/images/location-picto.svg\" alt=\"location-picture\" />{{ project.city }}, {{ project.state }}</span>\n\t\t\t\t\t\t\t\t<span *ngIf=\"!project.state\"><img src=\"public/images/location-picto.svg\" alt=\"location-picture\" />{{ project.city }}, {{ project.country }}</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"card-description-text\">\n\t\t\t\t\t\t\t\t<p>{{ project.description | cut:true:70:' ...' }}</p>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class=\"card-need flex\">\n\t\t\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530708/Witty-icon/Project%20Needs/Collaboration_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.firstStatus === 'for help'\">\n\t\t\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530708/Witty-icon/Project%20Needs/Feedback_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.firstStatus === 'for feedback'\">\n\t\t\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Hiring_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.firstStatus === 'to hire someone'\">\n\t\t\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Internship_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.firstStatus === 'to hire an intern'\">\n\t\t\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530708/Witty-icon/Project%20Needs/Cofounder_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.firstStatus === 'for a cofounder'\">\n\t\t\t\t\t\t\t\t<p class=\"freigb flex\">{{ transformNeedStatus(project.firstStatus) }}<span *ngIf=\"project.openingStat > 1\">, +{{ project.openingStat - 1 }}</span></p>\n\t\t\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.firstStatus === 'for help'\">{{ project.title }} is looking for help</div>\n\t\t\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.firstStatus === 'for feedback'\">{{ project.title }} is looking for feedback</div>\n\t\t\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.firstStatus === 'to hire someone'\">{{ project.title }} is currently hiring</div>\n\t\t\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.firstStatus === 'to hire an intern'\">{{ project.title }}  is currently hiring interns</div>\n\t\t\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.firstStatus === 'for a cofounder'\">{{ project.title }} is looking for a cofounder</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class=\"card-info-by\" *ngIf=\"project.username != 'Quentin Verriere' && project.username != 'Olivier Hamelin' && project.username != 'Jay Ho'\">\n\t\t\t\t\t\t\t\t<figure class=\"card-info-by-picture\">\n\t\t\t\t\t\t\t\t\t<img [src]=\"project.profile_picture\" alt=\"card-foot-picture\">\n\t\t\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t\t\t<h6>{{ project.username }} <span class=\"inline\" *ngIf=\"project.members\">& {{ project.members }} more</span></h6>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n</section>\n"

/***/ }),

/***/ "./src/app/Components/discover/discover-search/discover-search.component.scss":
/***/ (function(module, exports) {

module.exports = ".discover-component .discover-search1 .discover-search1-text {\n  display: inline-block;\n  margin: 0px 10px; }\n\n.discover-component .discover-search1 .discover-search1-dropdown {\n  display: inline-block;\n  margin: 10px 0px; }\n\n.discover-component .discover-search1 .discover-search1-dropdown h2 {\n    display: inline-block;\n    padding: 5px 15px 5px 10px; }\n\n.discover-component .discover-search1 .discover-search1-dropdown .discover-search1-downbox1 {\n    display: none;\n    position: absolute;\n    z-index: 50;\n    background-color: white;\n    border: 1px solid white;\n    border-radius: 8px;\n    width: 200px; }\n\n.discover-component .discover-search1 .discover-search1-dropdown .discover-search1-downbox1 ul {\n      margin-top: 10px;\n      margin-bottom: 20px; }\n\n.discover-component .discover-search1 .discover-search1-dropdown .discover-search1-downbox1 li {\n      padding: 10px 20px 0px 20px;\n      font-family: 'FreigLight';\n      color: #222222;\n      font-size: 18px; }\n\n.discover-component .discover-search1 .discover-search1-dropdown .discover-search1-downbox1 li:hover {\n      background-color: #F5F5F5; }\n\n.discover-component .discover-search1 .discover-search1-dropdown .discover-search1-downbox2 {\n    display: none;\n    position: absolute;\n    background-color: white;\n    border: 1px solid white;\n    z-index: 99999;\n    border-radius: 8px;\n    margin-left: 5px; }\n\n.discover-component .discover-search1 .discover-search1-dropdown .discover-search1-downbox2 ul {\n      -webkit-column-count: 3;\n      column-count: 3;\n      margin-top: 10px;\n      margin-bottom: 20px;\n      margin-right: 10px; }\n\n.discover-component .discover-search1 .discover-search1-dropdown .discover-search1-downbox2 li {\n      padding: 10px 20px 0px 20px;\n      font-family: 'FreigLight';\n      color: #222222;\n      font-size: 18px; }\n\n.discover-component .discover-search1 .discover-search1-dropdown .discover-search1-downbox2 li:hover {\n      background-color: #F5F5F5; }\n\n.discover-component .discover-search2 #input-dsa::-webkit-input-placeholder {\n  color: white; }\n\n.discover-component .discover-search2 #input-dsa2::-webkit-input-placeholder {\n  color: rgba(255, 255, 255, 0.5); }\n\n.discover-component .discover-search2 .discover-search2-text {\n  display: inline-block;\n  margin-right: 10px; }\n\n.discover-component .discover-search2 .discover-search2-text-mobile {\n  display: none; }\n\n.discover-component .discover-search2 #dsdrop1m {\n  display: none; }\n\n.discover-component .discover-search2 .discover-search2-dropdown {\n  display: inline-block;\n  margin-right: 10px; }\n\n.discover-component .discover-search2 .discover-search2-dropdown h2 {\n    display: inline-block;\n    padding: 5px 15px 5px 10px; }\n\n.discover-component .discover-search2 .discover-search2-dropdown .discover-search2-downbox {\n    display: none;\n    position: absolute;\n    z-index: 50;\n    background-color: white;\n    border: 1px solid white;\n    border-radius: 8px; }\n\n.discover-component .discover-search2 .discover-search2-dropdown ul {\n    margin-top: 10px;\n    margin-bottom: 20px;\n    margin-right: 10px;\n    -webkit-column-count: 3;\n    column-count: 3;\n    -webkit-column-gap: 10px;\n            column-gap: 10px; }\n\n.discover-component .discover-search2 .discover-search2-dropdown li {\n    padding: 10px 20px 0px 20px;\n    font-family: 'FreigLight';\n    color: #222222;\n    font-size: 18px; }\n\n.discover-component .discover-search2 .discover-search2-dropdown li:hover {\n    background-color: #F5F5F5; }\n\n.discover-component .discover-search2 .discover-skill-list {\n  display: inline-block;\n  margin-right: 10px;\n  margin-bottom: 10px; }\n\n.discover-component .discover-search2 .discover-skill-list .discover-skill-tag {\n    display: inline-block; }\n\n.discover-component .discover-search2 .discover-skill-list .discover-skill-tag h2 {\n      display: inline-block;\n      padding: 5px 5px 5px 10px; }\n\n.discover-component .discover-search2 .discover-skill-list .discover-skill-tag .discover-skill-cross {\n      display: inline-block;\n      padding-top: 10px; }\n\n.discover-component .discover-search2 .discover-skill-list .discover-skill-tag .discover-skill-cross img:focus {\n        outline: 0; }\n\n.discover-component .discover-search2 .discover-skill-list span {\n    display: inline-block;\n    font-family: 'FreigBook';\n    font-size: 30px;\n    color: white;\n    margin-bottom: 0; }\n\n.discover-component .discover-search2 .discover-search2-dropdown2 {\n  display: inline-block;\n  margin: 0px 10px 10px 0px; }\n\n.discover-component .discover-search2 .discover-search2-dropdown2 h2 {\n    display: inline-block;\n    padding: 8px 5px 8px 10px; }\n\n.discover-component .discover-search2 .discover-search2-dropdown2 .discover-search2-anyskill input {\n    margin: 0;\n    padding: 5px 10px;\n    background-color: rgba(20, 20, 20, 0.5); }\n\n.discover-component .discover-search2 .discover-search2-dropdown2 .discover-search2-popularskills {\n    display: none; }\n\n.discover-component .discover-search2 .discover-search2-dropdown2 .discover-search2-popularskills h3 {\n      font-family: 'FreigBook';\n      color: #999999;\n      font-size: 18px;\n      padding: 8px 20px; }\n\n.discover-component .discover-search2 .discover-search2-dropdown2 .discover-search2-downbox1 {\n    display: none;\n    max-height: 240px;\n    min-height: 50px;\n    overflow: auto; }\n\n.discover-component .discover-search2 .discover-search2-dropdown2 .discover-search2-downbox1 span {\n      padding: 10px;\n      font-family: 'FreigBook';\n      font-style: italic;\n      font-size: 16px;\n      color: #999999; }\n\n.discover-component .discover-search2 .discover-search2-anylocation {\n  display: inline-block; }\n\n.discover-component .discover-search2 .discover-search2-anylocation input {\n    margin: 0;\n    padding: 5px 10px;\n    width: 160px; }\n\n.discover-component .discover-search2 .discover-search2-anylocation input:focus {\n    color: white; }\n\n.discover-component .discover-search2 .discover-search2-anylocation input:focus ::-webkit-input-placeholder {\n      color: white; }\n\n.discover-component .discover-search2 .discover-search2-anylocation-mobile {\n  display: none; }\n\n.discover-component .discover-search2 .inputfield input {\n  color: white; }\n\n#discover-body-content {\n  min-height: 400px; }\n\n#discover-body-content .discover-body-container .discover-body-list {\n    text-align: left;\n    padding-left: 20px; }\n\n#discover-body-content .discover-body-container .discover-body-list .discover-body-card {\n      margin: 0 16px 40px 16px;\n      display: inline-block;\n      width: 287px;\n      height: 418px;\n      border: 1px solid #E5E5E5;\n      border-radius: 5px;\n      cursor: pointer;\n      overflow: hidden; }\n\n#discover-body-content .loader {\n    margin: 45px auto; }\n\n/******************** MOBILE ****************************/\n\n@media only screen and (max-width: 736px) {\n  .wd-body-mobile {\n    position: relative;\n    background-image: url(\"/public/images/bg_mobile/bg_home_mobile.jpg\");\n    overflow-y: hidden; }\n    .wd-body-mobile .filter {\n      height: 600px;\n      background: rgba(0, 0, 0, 0.7); }\n    .wd-body-mobile h1, .wd-body-mobile span {\n      font-size: 28px; }\n    .wd-body-mobile h2 {\n      font-family: 'FreigLight';\n      font-size: 28px; }\n    .wd-body-mobile .wbdm-fields {\n      position: relative;\n      padding: 130px 20px 20px 20px; }\n      .wd-body-mobile .wbdm-fields .wdbm-boxes {\n        position: relative;\n        -webkit-box-align: start;\n            -ms-flex-align: start;\n                align-items: flex-start;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap; }\n        .wd-body-mobile .wbdm-fields .wdbm-boxes .location-h2 {\n          white-space: nowrap;\n          overflow: hidden; }\n        .wd-body-mobile .wbdm-fields .wdbm-boxes .border-bottom {\n          border-bottom: 1px solid #fff; }\n  #discover-body-content .discover-body-list {\n    padding: 0 !important;\n    text-align: center !important; } }\n"

/***/ }),

/***/ "./src/app/Components/discover/discover-search/discover-search.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiscoverSearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__ = __webpack_require__("./node_modules/ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_popover_login_popover_login_component__ = __webpack_require__("./src/app/Components/modals/popover-login/popover-login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modals_skill_modal_skill_modal_component__ = __webpack_require__("./src/app/Components/modals/skill-modal/skill-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modals_mobile_modals_status_mobile_modal_status_mobile_modal_component__ = __webpack_require__("./src/app/Components/modals/mobile-modals/status-mobile-modal/status-mobile-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modals_mobile_modals_category_mobile_modal_category_mobile_modal_component__ = __webpack_require__("./src/app/Components/modals/mobile-modals/category-mobile-modal/category-mobile-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modals_mobile_modals_need_mobile_modal_need_mobile_modal_component__ = __webpack_require__("./src/app/Components/modals/mobile-modals/need-mobile-modal/need-mobile-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modals_mobile_modals_skill_mobile_modal_skill_mobile_modal_component__ = __webpack_require__("./src/app/Components/modals/mobile-modals/skill-mobile-modal/skill-mobile-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__modals_mobile_modals_location_mobile_modal_location_mobile_modal_component__ = __webpack_require__("./src/app/Components/modals/mobile-modals/location-mobile-modal/location-mobile-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Services_Skills_skills_service__ = __webpack_require__("./src/app/Services/Skills/skills.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Services_Projects_projects_service__ = __webpack_require__("./src/app/Services/Projects/projects.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Services_Networks_networks_service__ = __webpack_require__("./src/app/Services/Networks/networks.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__Services_Pictures_pictures_service__ = __webpack_require__("./src/app/Services/Pictures/pictures.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__Interfaces_Constants_categories_constant__ = __webpack_require__("./src/app/Interfaces/Constants/categories-constant.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__Interfaces_Constants_status_constant__ = __webpack_require__("./src/app/Interfaces/Constants/status-constant.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__Interfaces_Constants_search_project_constant__ = __webpack_require__("./src/app/Interfaces/Constants/search-project.constant.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_underscore__ = __webpack_require__("./node_modules/underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19_underscore__);
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



/* Library */

var DiscoverSearchComponent = /** @class */ (function () {
    function DiscoverSearchComponent(SkillsService, ProjectsService, NetworksService, TokenService, dialogService, PicturesService, ActivatedRoute, ChangeDetectorRef, document) {
        this.SkillsService = SkillsService;
        this.ProjectsService = ProjectsService;
        this.NetworksService = NetworksService;
        this.TokenService = TokenService;
        this.dialogService = dialogService;
        this.PicturesService = PicturesService;
        this.ActivatedRoute = ActivatedRoute;
        this.ChangeDetectorRef = ChangeDetectorRef;
        this.document = document;
        this.projects = [];
        this.searching = false;
        this.visibility = 'shown';
        this.priorities = ['status', 'category', 'opening', 'skills', 'location', 'network'];
    }
    DiscoverSearchComponent.prototype.ngOnInit = function () {
        this.initModels();
        this.initServices();
        this.getNetworks();
        this.initParams();
    };
    DiscoverSearchComponent.prototype.onScroll = function () {
        this.limit += 18;
        this.getSearchBody('paginate', { value1: 18, value2: this.limit });
    };
    DiscoverSearchComponent.prototype.initModels = function () {
        this.skills = [];
        this.selectedSkills = [];
        this.limit = 18;
        this.projects = [];
        this.placeholder = 'Anything';
        this.currentStatus = 'All projects';
        this.currentCategory = 'Any category';
        this.currentLocation = 'any location';
        this.currentNeed = __WEBPACK_IMPORTED_MODULE_17__Interfaces_Constants_status_constant__["a" /* needStatus */][5].name;
        this.categories = __WEBPACK_IMPORTED_MODULE_16__Interfaces_Constants_categories_constant__["a" /* categories */];
        this.statutes = __WEBPACK_IMPORTED_MODULE_17__Interfaces_Constants_status_constant__["c" /* projectStatus */];
        this.needStatutes = __WEBPACK_IMPORTED_MODULE_17__Interfaces_Constants_status_constant__["a" /* needStatus */];
        this.searchBody = __WEBPACK_IMPORTED_MODULE_18__Interfaces_Constants_search_project_constant__["c" /* searchProject3 */];
        this.currentRankType = 'magic';
        this.rankType = 'popularity';
    };
    DiscoverSearchComponent.prototype.initServices = function () {
        this.searchBody.paginate.limit = 18;
        this.getSkills();
        this.getNetworks();
    };
    DiscoverSearchComponent.prototype.initParams = function () {
        var _this = this;
        this.ActivatedRoute.queryParams.subscribe(function (params) {
            _this.currentCategory = params.category ? params.category : 'Any category';
            _this.currentStatus = params.status ? params.status : 'All projects';
            _this.searchBody.query.members[0].value = _this.currentStatus;
            _this.searchBody.query.members[1].value = _this.currentCategory;
            _this.searchBody.paginate.limit = 18;
            _this.searchBody.paginate.offset = 0;
            _this.searchProjects(1);
            window.scrollTo(0, 0);
        });
    };
    DiscoverSearchComponent.prototype.searchProjects = function (index) {
        var _this = this;
        if (index)
            this.searching = true;
        // if (this.projects.length && this.projects.length === this.limit) return
        // else {
        this.ProjectsService.searchProject(this.searchBody).subscribe(function (res) {
            if (index)
                _this.projects = [];
            _this.projects = _this.projects.concat(res.projects);
            _this.searching = false;
        });
        // }
    };
    DiscoverSearchComponent.prototype.getSkills = function () {
        var _this = this;
        this.SkillsService.getSkills().subscribe(function (res) {
            _this.skills = res.skills;
            _this.popularSkills = _this.skills.slice(0, 5);
        });
    };
    DiscoverSearchComponent.prototype.getNetworks = function () {
        var _this = this;
        this.NetworksService.getNetworks('university').subscribe(function (res) {
            _this.networks = res.university;
        });
    };
    DiscoverSearchComponent.prototype.getSearchBody = function (group, member) {
        var i = 0;
        if (group === 'members') {
            this.limit = 18;
            this.searchBody.paginate.limit = 18;
            this.searchBody.paginate.offset = 0;
            this.searchBody.query.members[member.index].value = member.value;
            this.searchBody.query.priority = this.priorities[member.index];
            i = 1;
        }
        if (group === 'sort') {
            var value = member.value === 'popularity' ? 'followers' : member.value;
            this.searchBody.query.sort.field = value;
            i = 1;
        }
        if (group === 'paginate') {
            this.searchBody.paginate.limit = member.value1,
                this.searchBody.paginate.offset = member.value2;
        }
        this.searchProjects(i);
    };
    DiscoverSearchComponent.prototype.selectStatus = function (name, searchName) {
        this.currentStatus = name;
        if (this.currentStatus === 'All projects')
            this.searchProjects(1);
        else
            this.getSearchBody('members', { index: 0, value: searchName });
    };
    DiscoverSearchComponent.prototype.selectCategory = function (name) {
        this.currentCategory = name;
        if (this.currentCategory === 'Any category')
            this.searchProjects(1);
        else
            this.getSearchBody('members', { index: 1, value: name });
    };
    DiscoverSearchComponent.prototype.selectNeedStatus = function (name) {
        this.currentNeed = name;
        if (this.currentNeed === 'for anything')
            this.searchProjects(1);
        else
            this.getSearchBody('members', { index: 2, value: name });
    };
    // selectSkill(name: string) {
    // 	if (this.selectedSkills.indexOf(name) < 0 && this.selectedSkills.length < 5) {
    // 		this.selectedSkills.push(name);
    // 		this.skillName = null;
    // 		this.getSearchBody('members', {index: 3, value: this.selectedSkills});
    // 	}
    // }
    DiscoverSearchComponent.prototype.removeSkill = function (name) {
        this.selectedSkills = __WEBPACK_IMPORTED_MODULE_19_underscore__["without"](this.selectedSkills, name);
        if (!this.searchSkills.length)
            this.searchSkills[0] = '';
        this.getSearchBody('members', { index: 3, value: this.searchSkills });
    };
    DiscoverSearchComponent.prototype.changePlaceholder = function () {
        if (this.placeholder !== 'add skill') {
            this.placeholder = 'add skill';
        }
        else {
            this.placeholder = 'Anything';
        }
    };
    DiscoverSearchComponent.prototype.getAddress = function (place) {
        var address = place['address_components'][0].long_name + ', ';
        if (!place['address_components'][3])
            address = address + "' ', " + place['address_components'][2].long_name;
        else
            address = address + place['address_components'][2].short_name + ', ' + place['address_components'][3].long_name;
        this.getSearchBody('members', { index: 4, value: address });
    };
    DiscoverSearchComponent.prototype.changeRankType = function () {
        var old_type = this.currentRankType;
        this.currentRankType = this.rankType;
        this.rankType = old_type;
        this.getSearchBody('sort', { value: this.currentRankType });
    };
    /* TRANSFORM FUNCTION */
    DiscoverSearchComponent.prototype.transformUrl = function (url) {
        url = url.replace(/ /g, '-');
        return url;
    };
    DiscoverSearchComponent.prototype.transformImage = function (url, width, height, crop) {
        return this.PicturesService.transformImage(url, width, height, crop);
    };
    DiscoverSearchComponent.prototype.transformNeedStatus = function (status) {
        if (status === 'for help')
            return 'any help';
        else if (status === 'for feedback')
            return 'feedback';
        else if (status === 'to hire someone')
            return 'hiring';
        else if (status === 'to hire an intern')
            return 'hiring interns';
        else if (status === 'for a cofounder')
            return 'cofounder';
    };
    /* NETWORK */
    DiscoverSearchComponent.prototype.selectNetwork = function (name, launched) {
        this.selectedNetwork = name;
        this.launched = launched;
        if (launched)
            this.getSearchBody('members', { index: 5, value: name });
    };
    DiscoverSearchComponent.prototype.removeNetwork = function () {
        this.selectedNetwork = '';
    };
    DiscoverSearchComponent.prototype.followProject = function (id, index, follow) {
        var _this = this;
        if (!this.TokenService.getToken())
            return this.showLoginPopOver();
        this.ProjectsService.followProject(id, {}).subscribe(function (res) {
            if (res.success) {
                if (follow) {
                    _this.projects[index]['follow'] = 0;
                    _this.projects[index]['followers'] -= 1;
                }
                else {
                    _this.projects[index]['follow'] = 1;
                    _this.projects[index]['followers'] += 1;
                }
            }
        });
    };
    /* SHOW MODAL */
    DiscoverSearchComponent.prototype.showLoginPopOver = function () {
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_4__modals_popover_login_popover_login_component__["a" /* PopoverLoginComponent */], {});
    };
    DiscoverSearchComponent.prototype.showSkillModal = function () {
        var _this = this;
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_5__modals_skill_modal_skill_modal_component__["a" /* SkillModalComponent */], {
            selectedSkills: this.selectedSkills
        }).subscribe(function (skills) {
            if (!skills[0])
                _this.document.getElementById('wds-5').style.display = 'inline-block';
            _this.selectedSkills = skills;
            _this.searchSkills = _this.selectedSkills[0] ? _this.selectedSkills : [''];
            _this.getSearchBody('members', { index: 3, value: _this.searchSkills });
        });
    };
    /* SHOW MOBILE MODAL */
    DiscoverSearchComponent.prototype.showStatusMobileModal = function () {
        var _this = this;
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_6__modals_mobile_modals_status_mobile_modal_status_mobile_modal_component__["a" /* StatusMobileModalComponent */], {
            statutes: this.statutes
        }).subscribe(function (status) {
            if (status)
                _this.selectStatus(status['status'], status['searchName']);
        });
    };
    DiscoverSearchComponent.prototype.showCategoryMobileModal = function () {
        var _this = this;
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_7__modals_mobile_modals_category_mobile_modal_category_mobile_modal_component__["a" /* CategoryMobileModalComponent */], {
            categories: this.categories
        }).subscribe(function (category) {
            if (category)
                _this.selectCategory(category);
        });
    };
    DiscoverSearchComponent.prototype.showNeedMobileModal = function () {
        var _this = this;
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_8__modals_mobile_modals_need_mobile_modal_need_mobile_modal_component__["a" /* NeedMobileModalComponent */], {
            needs: this.needStatutes
        }).subscribe(function (need) {
            if (need) {
                if (need === 'Any help' || need === 'Teammate' || need === 'Mentor')
                    _this.showSkillMobileModal();
                _this.selectNeedStatus(need);
            }
        });
    };
    DiscoverSearchComponent.prototype.showSkillMobileModal = function () {
        var _this = this;
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_9__modals_mobile_modals_skill_mobile_modal_skill_mobile_modal_component__["a" /* SkillMobileModalComponent */], {
            skills: this.skills
        }).subscribe(function (skills) {
            if (skills)
                _this.getSearchBody('members', { index: 3, value: skills });
        });
    };
    DiscoverSearchComponent.prototype.showLocationMobileModal = function () {
        var _this = this;
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_10__modals_mobile_modals_location_mobile_modal_location_mobile_modal_component__["a" /* LocationMobileModalComponent */], {
            noVariable: 'hello'
        }).subscribe(function (location) {
            if (location) {
                _this.currentLocation = location;
                _this.getSearchBody('members', { index: 4, value: location });
                _this.ChangeDetectorRef.detectChanges();
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], DiscoverSearchComponent.prototype, "mobile", void 0);
    DiscoverSearchComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-discover-search',
            template: __webpack_require__("./src/app/Components/discover/discover-search/discover-search.component.html"),
            styles: [__webpack_require__("./src/app/Components/discover/discover-search/discover-search.component.scss"), __webpack_require__("./src/public/styles/presentation.scss"), __webpack_require__("./src/public/styles/project-card.scss"), __webpack_require__("./src/public/styles/tooltip.scss")],
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('fadeIn', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('shown', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ opacity: 1 })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('hidden', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ opacity: 0 })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('shown => hidden', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('0s')),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('hidden => shown', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('.5s'))
                ])
            ]
        }),
        __param(8, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["DOCUMENT"])),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_11__Services_Skills_skills_service__["a" /* SkillsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__Services_Skills_skills_service__["a" /* SkillsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_12__Services_Projects_projects_service__["a" /* ProjectsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12__Services_Projects_projects_service__["a" /* ProjectsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_13__Services_Networks_networks_service__["a" /* NetworksService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_13__Services_Networks_networks_service__["a" /* NetworksService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_14__Services_Authentication_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_14__Services_Authentication_token_service__["a" /* TokenService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__["DialogService"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_15__Services_Pictures_pictures_service__["a" /* PicturesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_15__Services_Pictures_pictures_service__["a" /* PicturesService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _h || Object, Object])
    ], DiscoverSearchComponent);
    return DiscoverSearchComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());

//# sourceMappingURL=discover-search.component.js.map

/***/ }),

/***/ "./src/app/Components/discover/discover.component.html":
/***/ (function(module, exports) {

module.exports = "<section id=\"w-discover\" discoverDiv *ngIf=\"!mobile\" (scroll)=\"onWindowScroll()\">\n\t<div class=\"wd-body bg-default\">\n\t\t<div class=\"whc-videobg\">\n\t\t\t<video loop muted autoplay poster=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1491979665/Discover_Background_snnz7m.png\">\n\t    \t\t  <source src=\"/public/videos/Discover.mp4\" type=\"video/mp4\">\n\t  \t\t</video>\n\t  \t</div>\n\t</div>\n\n\t<app-discover-search></app-discover-search>\n</section>\n\n<section id=\"w-discover-mobile\" *ngIf=\"mobile\">\n  <app-discover-search [mobile]=\"mobile\"></app-discover-search>\n</section>\n\n<!-- <div id=\"pfffs\" [@popover]=\"popState\" *ngIf=\"!mobile && showPop\" class=\"presentation-forced-signup bb transition-250\">\n\t<h5>{{ text }}</h5>\n\t<ul class=\"flex\">\n\t\t<li class=\"presentation-forced-signup-mail cursor-pt\" (click)=\"signIn()\"><img src=\"/public/images/mailbox-icon-w.png\" alt=\"mailbox\"></li>\n\t\t<a href=\"/api/auth/google\" target=\"_self\"><li class=\"presentation-forced-signup-google\"><img src=\"/public/images/social_media/newgoogle-logo.svg\"></li></a>\n\t\t<a href=\"api/auth/facebook\" target=\"_self\"><li class=\"presentation-forced-signup-facebook\"><i class=\"fa fa-facebook\" style=\"color: white\"></i></li></a>\n\t</ul>\n</div> -->\n\n<div [@popover]=\"popState\" *ngIf=\"!mobile && showPop\" class=\"presentation-forced-signup2 bb transition-450\">\n\t<div class=\"pfs-text flex\" *ngIf=\"!log\">\n\t\t<p class=\"freigb\">Want to get access to more great things people are building around you?</p>\n\t\t<button (click)=\"signIn()\">Get started 🎉</button>\n\t</div>\n\n\t<div class=\"pfs-text flex\" *ngIf=\"log\">\n\t\t<p class=\"freigb\">Know some people working on great ideas, products, or companies that we should feature?</p>\n\t\t<button class=\"button2\" (click)=\"showInvitationModal()\">Send them an invite <span> 🎉</span></button>\n\t</div>\n</div>\n\n<app-footer></app-footer>\n"

/***/ }),

/***/ "./src/app/Components/discover/discover.component.scss":
/***/ (function(module, exports) {

module.exports = "#w-discover {\n  position: relative; }\n  #w-discover .wd-body .whc-videobg {\n    background: rgba(0, 0, 0, 0.5);\n    /* For Safari 5.1 to 6.0 */\n    /* For Opera 11.1 to 12.0 */\n    /* For Firefox 3.6 to 15 */\n    background: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0.9)));\n    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9));\n    /* Standard syntax (must be last) */ }\n"

/***/ }),

/***/ "./src/app/Components/discover/discover.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export textScrollDiscover */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiscoverComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__ = __webpack_require__("./node_modules/ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_invitation_social_invitation_social_component__ = __webpack_require__("./src/app/Components/modals/invitation-social/invitation-social.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_Skills_skills_service__ = __webpack_require__("./src/app/Services/Skills/skills.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_Projects_projects_service__ = __webpack_require__("./src/app/Services/Projects/projects.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Services_Networks_networks_service__ = __webpack_require__("./src/app/Services/Networks/networks.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Services_Pictures_pictures_service__ = __webpack_require__("./src/app/Services/Pictures/pictures.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Services_shared_service__ = __webpack_require__("./src/app/Services/shared.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Services_meta_service__ = __webpack_require__("./src/app/Services/meta.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Services_Trackings_tracking_service__ = __webpack_require__("./src/app/Services/Trackings/tracking.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Animations_animations__ = __webpack_require__("./src/app/Animations/animations.ts");
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








/* Animations */

var textScrollDiscover = [
    'Let us find the projects looking to connect with you. Join the best community on the Internet.',
    'It takes less than 20 seconds',
    'Why are you still waiting? 🙈'
];
var DiscoverComponent = /** @class */ (function () {
    function DiscoverComponent(dialogService, TokenService, SharedService, MetaService, Title, TrackingService, document) {
        this.dialogService = dialogService;
        this.TokenService = TokenService;
        this.SharedService = SharedService;
        this.MetaService = MetaService;
        this.Title = Title;
        this.TrackingService = TrackingService;
        this.document = document;
        this.mobile = false;
        this.showPop = false;
        this.log = false;
        this.alreadyPop = false;
        this.notPop = false;
    }
    DiscoverComponent.prototype.ngOnInit = function () {
        this.initWindow();
        this.initToken();
        // this.text = textScrollDiscover[0]
        this.setMetaData();
        this.trackViewPage();
    };
    DiscoverComponent.prototype.trackViewPage = function () {
        var token = this.TokenService.getToken();
        this.TrackingService.viewActivities({}, token, 6).subscribe(function (r) { });
    };
    DiscoverComponent.prototype.setMetaData = function () {
        this.Title.setTitle('Witty | Discover');
        this.MetaService.setMeta('description', "Witty is the professional network for the new entrepreneurial age. We connect millions of people to what's being built around them, including you.");
        this.MetaService.setMeta('og:title', "Explore what's being built around you, now - Witty");
        this.MetaService.setMeta('og:description', "Witty is the professional network for the new entrepreneurial age. We connect millions of people to what's being built around them, including you.");
        this.MetaService.setMeta('og:url', 'https://www.wittycircle.com/discover');
        this.MetaService.setMeta('og:image', 'http://res.cloudinary.com/dqpkpmrgk/image/upload/v1508448762/Share_Link_Cards_Facebook/Thanks_But_No_Thanks_White_Bckgrd-01.png');
    };
    DiscoverComponent.prototype.initWindow = function () {
        window.scrollTo(0, 0);
        if ((window.screen.width) < 736)
            this.mobile = true;
    };
    DiscoverComponent.prototype.initToken = function () {
        if (this.TokenService.getToken() && this.TokenService.getToken().user)
            this.log = true;
    };
    DiscoverComponent.prototype.signIn = function () {
        this.notShowPop();
        this.SharedService.setSignUpStatus(true);
    };
    DiscoverComponent.prototype.notShowPop = function () {
        var _this = this;
        this.notPop = true;
        this.popState = '';
        this.showPop = false;
        this.alreadyPop = false;
        setTimeout(function () {
            _this.notPop = false;
        }, 1000 * 10);
    };
    DiscoverComponent.prototype.showInvitationModal = function () {
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
    DiscoverComponent.prototype.onWindowScroll = function () {
        // if (!this.log) {
        var number = this.document.documentElement.scrollTop;
        if (!this.notPop) {
            if (number > 50 && !this.alreadyPop) {
                if (this.popState !== 'up1') {
                    // this.text 		= textScrollDiscover[0]
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
        // if (number > 50) {
        // 	if (this.popState !== 'up1') {
        // 		// this.text 		= textScrollDiscover[0]
        // 		this.popState 	= 'up1'
        // 		this.showPop 	= true
        // 	}
        // } else if (number > 300 && number < 600) {
        // 	if (this.popState !== 'up2') {
        // 		this.popState 	= 'up2'
        // 		// this.text 		= textScrollDiscover[1]
        // 	}
        // } else if (number > 600 && number < 900) {
        // 	if (this.popState !== 'up3') {
        // 		this.popState 	= 'up3'
        // 		// this.text 		= textScrollDiscover[2]
        // 	}
        // } else if (number <= 50) {
        // 	this.popState 	= ''
        // 	this.showPop 	= false
        // }
        // }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])("window:scroll", []),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DiscoverComponent.prototype, "onWindowScroll", null);
    DiscoverComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-discover',
            template: __webpack_require__("./src/app/Components/discover/discover.component.html"),
            styles: [__webpack_require__("./src/app/Components/discover/discover.component.scss"), __webpack_require__("./src/public/styles/presentation.scss")],
            providers: [__WEBPACK_IMPORTED_MODULE_4__Services_Skills_skills_service__["a" /* SkillsService */], __WEBPACK_IMPORTED_MODULE_5__Services_Projects_projects_service__["a" /* ProjectsService */], __WEBPACK_IMPORTED_MODULE_6__Services_Networks_networks_service__["a" /* NetworksService */], __WEBPACK_IMPORTED_MODULE_7__Services_Pictures_pictures_service__["a" /* PicturesService */]],
            animations: [__WEBPACK_IMPORTED_MODULE_12__Animations_animations__["g" /* popDiscover */]]
        }),
        __param(6, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["DOCUMENT"])),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__["DialogService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_8__Services_Authentication_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__Services_Authentication_token_service__["a" /* TokenService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_9__Services_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__Services_shared_service__["a" /* SharedService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_10__Services_meta_service__["a" /* MetaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__Services_meta_service__["a" /* MetaService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["Title"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["Title"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_11__Services_Trackings_tracking_service__["a" /* TrackingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__Services_Trackings_tracking_service__["a" /* TrackingService */]) === "function" && _f || Object, Object])
    ], DiscoverComponent);
    return DiscoverComponent;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=discover.component.js.map

/***/ }),

/***/ "./src/app/Components/discover/discover.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiscoverModule", function() { return DiscoverModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__ = __webpack_require__("./src/app/Pipes/pipe.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__footer_footer_module__ = __webpack_require__("./src/app/Components/footer/footer.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_infinite_scroll__ = __webpack_require__("./node_modules/ngx-infinite-scroll/modules/ngx-infinite-scroll.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__discover_component__ = __webpack_require__("./src/app/Components/discover/discover.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__discover_search_discover_search_component__ = __webpack_require__("./src/app/Components/discover/discover-search/discover-search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Directives_Discover_discover_directive__ = __webpack_require__("./src/app/Directives/Discover/discover.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Directives_Discover_discover_sub1_directive__ = __webpack_require__("./src/app/Directives/Discover/discover-sub1.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Directives_Discover_discover_wds4_directive__ = __webpack_require__("./src/app/Directives/Discover/discover-wds4.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Directives_directives_module__ = __webpack_require__("./src/app/Directives/directives.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Routes_discover_routes__ = __webpack_require__("./src/app/Routes/discover.routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




/* Custom Modules */



/* Components */


// import { MetaService } from '../../Services/meta.service';
/* Directives */




/* Librairies */
/* Route */

var DiscoverModule = /** @class */ (function () {
    function DiscoverModule() {
    }
    DiscoverModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_13__Routes_discover_routes__["a" /* DISCOVER_ROUTES */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["f" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__["a" /* PipeModule */],
                __WEBPACK_IMPORTED_MODULE_5__footer_footer_module__["a" /* FooterModule */],
                __WEBPACK_IMPORTED_MODULE_12__Directives_directives_module__["a" /* DirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_6_ngx_infinite_scroll__["a" /* InfiniteScrollModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__discover_component__["a" /* DiscoverComponent */],
                __WEBPACK_IMPORTED_MODULE_8__discover_search_discover_search_component__["a" /* DiscoverSearchComponent */],
                __WEBPACK_IMPORTED_MODULE_9__Directives_Discover_discover_directive__["a" /* DiscoverDirective */],
                __WEBPACK_IMPORTED_MODULE_10__Directives_Discover_discover_sub1_directive__["a" /* DiscoverDirectiveSub1 */],
                __WEBPACK_IMPORTED_MODULE_11__Directives_Discover_discover_wds4_directive__["a" /* DiscoverDirectiveWDS4 */]
            ],
            providers: [],
            exports: []
        })
    ], DiscoverModule);
    return DiscoverModule;
}());

//# sourceMappingURL=discover.module.js.map

/***/ }),

/***/ "./src/app/Directives/Discover/discover-sub1.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiscoverDirectiveSub1; });
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

var DiscoverDirectiveSub1 = /** @class */ (function () {
    function DiscoverDirectiveSub1(el) {
        this.el = el;
        this.nativeElement = el.nativeElement.parentNode.parentNode;
    }
    DiscoverDirectiveSub1.prototype.showSearchBox = function () {
        this.nativeElement.querySelector('#wds-5-s-2').style.display = 'block';
    };
    DiscoverDirectiveSub1.prototype.hideSearchBox = function () {
        this.nativeElement.querySelector('#wds-5-s-2').style.display = 'none';
    };
    DiscoverDirectiveSub1.prototype.showPopularBox = function () {
        this.nativeElement.querySelector('#wds-5-s-1').style.display = 'block';
    };
    DiscoverDirectiveSub1.prototype.hidePopularBox = function () {
        this.nativeElement.querySelector('#wds-5-s-1').style.display = 'none';
    };
    DiscoverDirectiveSub1.prototype.onInputChange = function (event) {
        if (event && this.nativeElement.querySelector('#wds-5-s-2').style.display !== 'block') {
            this.showSearchBox();
            this.hidePopularBox();
        }
        else if (!event) {
            this.hideSearchBox();
            this.showPopularBox();
        }
    };
    DiscoverDirectiveSub1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[d_sub1]',
            host: {
                '(ngModelChange)': 'onInputChange($event)'
            }
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
    ], DiscoverDirectiveSub1);
    return DiscoverDirectiveSub1;
    var _a;
}());

//# sourceMappingURL=discover-sub1.directive.js.map

/***/ }),

/***/ "./src/app/Directives/Discover/discover-wds4.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiscoverDirectiveWDS4; });
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

var DiscoverDirectiveWDS4 = /** @class */ (function () {
    function DiscoverDirectiveWDS4(el) {
        this.el = el;
    }
    DiscoverDirectiveWDS4.prototype.onMouseEnter = function (event) {
        this.nativeElement = this.el.nativeElement.parentNode;
        if (this.el.nativeElement.contains(event.target) ||
            this.nativeElement.querySelector('#wds-5').contains(event.target)) {
            this.el.nativeElement.parentNode.querySelector('#wds-5').style.display = 'inline-block';
        }
    };
    DiscoverDirectiveWDS4.prototype.onMouseLeave = function (event) {
        // this.nativeElement = this.el.nativeElement.parentNode
        // if (!this.nativeElement.querySelector('#wds-4').contains(event.target) && 
        // 	!this.nativeElement.querySelector('#wds-5').contains(event.target)) {
        // 	this.el.nativeElement.parentNode.querySelector('#wds-5').style.display = 'none'
        // }
    };
    DiscoverDirectiveWDS4 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[d_wds4]',
            host: {
                '(mouseenter)': 'onMouseEnter($event)',
                '(mouseleave)': 'onMouseLeave($event)'
            },
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
    ], DiscoverDirectiveWDS4);
    return DiscoverDirectiveWDS4;
    var _a;
}());

//# sourceMappingURL=discover-wds4.directive.js.map

/***/ }),

/***/ "./src/app/Directives/Discover/discover.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiscoverDirective; });
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

var DiscoverDirective = /** @class */ (function () {
    function DiscoverDirective(el) {
        this.el = el;
        this.nativeElement = el.nativeElement;
    }
    DiscoverDirective.prototype.rotateUp = function (sub_id) {
        var id = sub_id + '-img';
        this.nativeElement.querySelector(id).style.transform = 'rotate(180deg)';
    };
    DiscoverDirective.prototype.rotateDown = function (sub_id) {
        var id = sub_id + '-img';
        this.nativeElement.querySelector(id).style.transform = 'rotate(0)';
    };
    /* Box1 */
    DiscoverDirective.prototype.showBox1 = function () {
        if (this.nativeElement.querySelector('#wds-1-s').style.display !== 'block') {
            this.nativeElement.querySelector('#wds-1-s').style.display = 'block';
            this.rotateUp('#wds-1');
            this.hideBox2();
            this.hideBox3();
            // this.hideBox4();
            // this.hideBox5();
        }
        else {
            this.rotateDown('#wds-1');
            this.hideBox1();
        }
    };
    DiscoverDirective.prototype.hideBox1 = function () {
        this.rotateDown('#wds-1');
        this.nativeElement.querySelector('#wds-1-s').style.display = 'none';
    };
    /* Box2 */
    DiscoverDirective.prototype.showBox2 = function () {
        if (this.nativeElement.querySelector('#wds-2-s').style.display !== 'block') {
            this.nativeElement.querySelector('#wds-2-s').style.display = 'block';
            this.rotateUp('#wds-2');
            this.hideBox1();
            this.hideBox3();
            // this.hideBox4();
            // this.hideBox5();
        }
        else {
            this.rotateDown('#wds-2');
            this.hideBox2();
        }
    };
    DiscoverDirective.prototype.hideBox2 = function () {
        this.rotateDown('#wds-2');
        this.nativeElement.querySelector('#wds-2-s').style.display = 'none';
    };
    /* Box3 */
    DiscoverDirective.prototype.showBox3 = function () {
        if (this.nativeElement.querySelector('#wds-3-s').style.display !== 'block') {
            this.nativeElement.querySelector('#wds-3-s').style.display = 'block';
            this.rotateUp('#wds-3');
            this.hideBox1();
            this.hideBox2();
            // this.hideBox4();
            // this.hideBox5();
        }
        else {
            this.rotateDown('#wds-3');
            this.hideBox3();
        }
    };
    DiscoverDirective.prototype.hideBox3 = function () {
        this.rotateDown('#wds-3');
        this.nativeElement.querySelector('#wds-3-s').style.display = 'none';
    };
    /* Box4 */
    // showBox4() {
    // 	if (this.nativeElement.querySelector('#wds-5-s-2').style.display !== 'block') {
    // 		this.nativeElement.querySelector('#wds-5-s-1').style.display = 'block'
    // 		this.hideBox1();
    // 		this.hideBox2();
    // 		this.hideBox3();
    // 	}
    // }
    // hideBox4() {
    // 	this.nativeElement.querySelector('#wds-5-s-1').style.display = 'none'
    // }
    /* Box5 */
    // showBox5() {
    // 	if (this.nativeElement.querySelector('#wds-5-i').value)
    // 		this.nativeElement.querySelector('#wds-5-s-2').style.display = 'block'
    // }
    // hideBox5() {
    // 	this.nativeElement.querySelector('#wds-5-s-2').style.display = 'none'
    // }
    /* Box6 */
    DiscoverDirective.prototype.showBox6 = function () {
        this.nativeElement.querySelector('#wds-5').style.display = 'block';
    };
    DiscoverDirective.prototype.hideBox6 = function () {
        this.nativeElement.querySelector('#wds-5').style.display = 'none';
    };
    /* Box7 */
    DiscoverDirective.prototype.showBox7 = function () {
        if (this.nativeElement.querySelector('#wds-6-1-1').style.display !== 'block') {
            this.rotateUp('#wds-6-1');
            this.nativeElement.querySelector('#wds-6-1-1').style.display = 'block';
            this.hideBox2();
            this.hideBox3();
        }
        else {
            this.rotateDown('#wds-6-1');
            this.nativeElement.querySelector('#wds-6-1-1').style.display = 'none';
        }
    };
    DiscoverDirective.prototype.hideBox7 = function () {
        this.rotateDown('#wds-6-1');
        this.nativeElement.querySelector('#wds-6-1-1').style.display = 'none';
    };
    /* Box7 */
    DiscoverDirective.prototype.showBox8 = function () {
        if (this.nativeElement.querySelector('#wds-6-3-1'))
            this.nativeElement.querySelector('#wds-6-3-1').style.display = 'block';
    };
    DiscoverDirective.prototype.hideBox8 = function () {
        if (this.nativeElement.querySelector('#wds-6-3-1'))
            this.nativeElement.querySelector('#wds-6-3-1').style.display = 'none';
    };
    /* Box/Placeholder */
    DiscoverDirective.prototype.showPlaceholder = function () {
        if (this.nativeElement.querySelector('#wds-5') && !this.nativeElement.querySelector('#wds-5-i').value)
            this.nativeElement.querySelector('#wds-5-l').style.display = 'block';
    };
    DiscoverDirective.prototype.hidePlaceholder = function () {
        this.nativeElement.querySelector('#wds-5-l').style.display = 'none';
    };
    DiscoverDirective.prototype.onClick = function (event) {
        if (this.nativeElement.querySelector('#wds-1').contains(event.target)) {
            this.showBox1();
        }
        else if (this.nativeElement.querySelector('#wds-2').contains(event.target)) {
            this.showBox2();
        }
        else if (this.nativeElement.querySelector('#wds-3').contains(event.target)) {
            this.showBox3();
        }
        else if (this.nativeElement.querySelector('#wds-5') && this.nativeElement.querySelector('#wds-5').contains(event.target)) {
            this.hidePlaceholder();
            // this.showBox4();
            // this.showBox5();
            // if (this.nativeElement.querySelector('#wds-5-s-1-1').contains(event.target)) {
            // 	// this.hideBox4();
            // 	// this.hideBox5();
            // 	this.hideBox6();
            // 	this.showPlaceholder();
            // } else if (this.nativeElement.querySelector('#wds-5-s-2-1').contains(event.target)) {
            // 	// this.hideBox4();
            // 	// this.hideBox5();
            // 	this.hideBox6();
            // 	this.showPlaceholder();
            // }
        }
        else if (this.nativeElement.querySelector('#wds-6-1').contains(event.target)) {
            this.showBox7();
            this.showPlaceholder();
        }
        else if (this.nativeElement.querySelector('#wds-6-3-i') &&
            this.nativeElement.querySelector('#wds-6-3-i').contains(event.target)) {
            this.showBox8();
        }
        else {
            this.hideBox1();
            this.hideBox2();
            this.hideBox3();
            // this.hideBox4();
            this.hideBox7();
            this.hideBox8();
            this.showPlaceholder();
            if (this.nativeElement.querySelector('#wds-4-0'))
                this.hideBox6();
        }
    };
    DiscoverDirective.prototype.onScroll = function (event) {
        console.debug("Scroll Event", window.pageYOffset);
    };
    DiscoverDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[discoverDiv]',
            host: {
                '(document:click)': 'onClick($event)',
                '(window:scroll)': 'onScroll($event)'
            },
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
    ], DiscoverDirective);
    return DiscoverDirective;
    var _a;
}());

//# sourceMappingURL=discover.directive.js.map

/***/ }),

/***/ "./src/app/Routes/discover.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DISCOVER_ROUTES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Components_discover_discover_component__ = __webpack_require__("./src/app/Components/discover/discover.component.ts");

/* Components */

/* Librairies */
// import { MetaGuard } from '@ngx-meta/core';
var routes = [
    { path: '', canActivate: [], component: __WEBPACK_IMPORTED_MODULE_1__Components_discover_discover_component__["a" /* DiscoverComponent */]
        // data: {
        // 	meta: {
        // 		title		: 'Wittycircle | Discover',
        // 		description	: 'Discover ideas, startups, products and many more awesome projects waiting for your help.',
        // 		url			: "https://www.wittycircle.com/discover",
        // 		'og:url'	: "https://www.wittycircle.com/discover",
        // 		'og:image'	: 'https://res.cloudinary.com/dqpkpmrgk/image/upload/v1465994773/Share_Link_Cards_Facebook/Share_Pic_Facebook_Discover.png',
        // 		'og:type'	: 'website',
        // 		'og:locale'	: 'en_US',
        // 	}
        // }
    },
];
var DISCOVER_ROUTES = __WEBPACK_IMPORTED_MODULE_0__angular_router__["f" /* RouterModule */].forChild(routes);
//# sourceMappingURL=discover.routes.js.map

/***/ })

});
//# sourceMappingURL=discover.module.chunk.js.map