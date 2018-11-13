webpackJsonp(["home.module"],{

/***/ "./node_modules/css-animator/angular.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./node_modules/css-animator/angular/animator.module.js"));
__export(__webpack_require__("./node_modules/css-animator/angular/animates.directive.js"));
__export(__webpack_require__("./node_modules/css-animator/angular/animation.service.js"));

//# sourceMappingURL=angular.js.map


/***/ }),

/***/ "./node_modules/css-animator/angular/animates.directive.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var animation_service_1 = __webpack_require__("./node_modules/css-animator/angular/animation.service.js");
var AnimatesDirective = /** @class */ (function () {
    function AnimatesDirective(_elementRef, animationService) {
        this._elementRef = _elementRef;
        this._animationBuilder = animationService.builder();
    }
    Object.defineProperty(AnimatesDirective.prototype, "animates", {
        set: function (options) {
            this._defaultOptions = options;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnimatesDirective.prototype, "animatesOnInit", {
        set: function (options) {
            this._initOptions = options;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnimatesDirective.prototype, "animatesInitMode", {
        set: function (mode) {
            if (typeof mode === 'string') {
                this._initMode = mode.toLowerCase();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnimatesDirective.prototype, "animationBuilder", {
        get: function () {
            return this._animationBuilder;
        },
        enumerable: true,
        configurable: true
    });
    AnimatesDirective.prototype.ngOnInit = function () {
        if (!this._initOptions) {
            return;
        }
        var promise;
        var builder = this._animationBuilder
            .setOptions(this._initOptions);
        switch (this._initMode) {
            case 'show':
                promise = builder.show(this._elementRef.nativeElement);
                break;
            case 'hide':
                promise = builder.hide(this._elementRef.nativeElement);
                break;
            default:
                promise = builder.animate(this._elementRef.nativeElement);
        }
        promise.then(function (element) { return element; }, function (error) {
            // Animation interrupted
        });
    };
    AnimatesDirective.prototype.start = function (options) {
        this._started = true;
        this.setOptions(options);
        return this._animationBuilder
            .animate(this._elementRef.nativeElement)
            .then(function (element) { return element; }, function (error) {
            // Animation interrupted
        });
    };
    AnimatesDirective.prototype.hide = function (options) {
        this.setOptions(options);
        return this._animationBuilder
            .setOptions(options)
            .hide(this._elementRef.nativeElement)
            .then(function (element) { return element; }, function (error) {
            // Animation interrupted
        });
    };
    AnimatesDirective.prototype.show = function (options) {
        this.setOptions(options);
        return this._animationBuilder
            .show(this._elementRef.nativeElement)
            .then(function (element) { return element; }, function (error) {
            // Animation interrupted
        });
    };
    AnimatesDirective.prototype.animate = function (options) {
        this.setOptions(options);
        return this._animationBuilder
            .setOptions(this._defaultOptions)
            .animate(this._elementRef.nativeElement)
            .then(function (element) { return element; }, function (error) {
            // Animation interrupted
        });
    };
    AnimatesDirective.prototype.pause = function () {
        if (!this._started)
            return;
        this._animationBuilder
            .setPlayState('paused')
            .applyPlayState(this._elementRef.nativeElement);
    };
    AnimatesDirective.prototype.resume = function () {
        if (!this._started)
            return;
        this._animationBuilder
            .setPlayState('running')
            .applyPlayState(this._elementRef.nativeElement);
    };
    AnimatesDirective.prototype.toggle = function () {
        if (!this._started)
            return;
        this._animationBuilder
            .setPlayState(this._animationBuilder.playState === 'running' ? 'paused' : 'running')
            .applyPlayState(this._elementRef.nativeElement);
    };
    AnimatesDirective.prototype.stop = function () {
        this._started = false;
        this._animationBuilder
            .stop(this._elementRef.nativeElement)
            .then(function (element) { return element; }, function (error) {
            // Animation interrupted
        });
    };
    AnimatesDirective.prototype.startOrStop = function (options) {
        if (!this._started) {
            this.start(options);
            return;
        }
        this.stop();
    };
    AnimatesDirective.prototype.setOptions = function (options) {
        if (options) {
            this._animationBuilder.setOptions(options);
            return;
        }
        this._animationBuilder.setOptions(this._defaultOptions);
    };
    AnimatesDirective = __decorate([
        core_1.Directive({
            selector: '[animates]',
            exportAs: 'animates',
            inputs: [
                'animates',
                'animatesOnInit',
                'animatesInitMode'
            ]
        }),
        __param(0, core_1.Inject(core_1.ElementRef)), __param(1, core_1.Inject(animation_service_1.AnimationService)),
        __metadata("design:paramtypes", [core_1.ElementRef, animation_service_1.AnimationService])
    ], AnimatesDirective);
    return AnimatesDirective;
}());
exports.AnimatesDirective = AnimatesDirective;

//# sourceMappingURL=animates.directive.js.map


/***/ }),

/***/ "./node_modules/css-animator/angular/animation.service.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var builder_1 = __webpack_require__("./node_modules/css-animator/builder.js");
var AnimationService = /** @class */ (function () {
    function AnimationService() {
    }
    AnimationService.prototype.builder = function () {
        return new builder_1.AnimationBuilder();
    };
    AnimationService = __decorate([
        core_1.Injectable()
    ], AnimationService);
    return AnimationService;
}());
exports.AnimationService = AnimationService;

//# sourceMappingURL=animation.service.js.map


/***/ }),

/***/ "./node_modules/css-animator/angular/animator.module.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var animates_directive_1 = __webpack_require__("./node_modules/css-animator/angular/animates.directive.js");
var animation_service_1 = __webpack_require__("./node_modules/css-animator/angular/animation.service.js");
var AnimatorModule = /** @class */ (function () {
    function AnimatorModule() {
    }
    AnimatorModule = __decorate([
        core_1.NgModule({
            declarations: [
                animates_directive_1.AnimatesDirective
            ],
            exports: [
                animates_directive_1.AnimatesDirective
            ],
            providers: [
                animation_service_1.AnimationService
            ]
        })
    ], AnimatorModule);
    return AnimatorModule;
}());
exports.AnimatorModule = AnimatorModule;

//# sourceMappingURL=animator.module.js.map


/***/ }),

/***/ "./node_modules/css-animator/builder.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./node_modules/css-animator/builder/animation_builder.js"));

//# sourceMappingURL=builder.js.map


/***/ }),

/***/ "./node_modules/css-animator/builder/animation_builder.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AnimationMode;
(function (AnimationMode) {
    AnimationMode[AnimationMode["Animate"] = 0] = "Animate";
    AnimationMode[AnimationMode["Show"] = 1] = "Show";
    AnimationMode[AnimationMode["Hide"] = 2] = "Hide";
})(AnimationMode = exports.AnimationMode || (exports.AnimationMode = {}));
;
var AnimationBuilder = /** @class */ (function () {
    // Public Methods
    function AnimationBuilder() {
        this.animationOptions = Object.assign({}, AnimationBuilder.defaults);
        this.defaultOptions = Object.assign({}, this.animationOptions);
        this.classes = [];
        this.activeClasses = new Map();
        this.listeners = new Map();
        this.timeouts = new Map();
        this.styles = new Map();
        this.log('AnimationBuilder created.');
    }
    AnimationBuilder.prototype.show = function (element) {
        return this.animate(element, AnimationMode.Show);
    };
    AnimationBuilder.prototype.hide = function (element) {
        return this.animate(element, AnimationMode.Hide);
    };
    AnimationBuilder.prototype.stop = function (element, reset) {
        if (reset === void 0) { reset = true; }
        this.removeTimeouts(element);
        this.removeListeners(element);
        if (reset)
            this.reset(element, false);
        return Promise.resolve(element);
    };
    AnimationBuilder.prototype.animate = function (element, mode) {
        var _this = this;
        if (mode === void 0) { mode = AnimationMode.Animate; }
        if (AnimationBuilder.disabled || this.animationOptions.disabled) {
            return this.animateDisabled(element, mode);
        }
        if (mode === AnimationMode.Show) {
            this.hideElement(element);
        }
        return new Promise(function (resolve, reject) {
            _this.removeTimeouts(element);
            var delay = setTimeout(function () {
                _this.reset(element, true, false, true);
                _this.registerAnimationListeners(element, mode, resolve, reject);
                _this.saveStyle(element);
                _this.saveClasses(element, mode);
                _this.pinElement(element, mode);
                _this.nextFrame(function () {
                    _this.showElement(element, mode);
                    _this.applyProperties(element, mode);
                });
            }, _this.animationOptions.delay);
            _this.addTimeout(element, delay, reject);
            _this.log("Timeout " + delay + " registered for element", element);
        });
    };
    AnimationBuilder.prototype.reset = function (element, removePending, rejectTimeouts, rejectListeners) {
        if (removePending === void 0) { removePending = true; }
        if (rejectTimeouts === void 0) { rejectTimeouts = false; }
        if (rejectListeners === void 0) { rejectListeners = false; }
        if (removePending) {
            this.removeTimeouts(element, rejectTimeouts);
            this.removeListeners(element, rejectListeners);
        }
        this.removeStyles(element);
        this.removeClasses(element);
    };
    AnimationBuilder.prototype.dispose = function () {
        this.timeouts.forEach(function (refs) {
            for (var _i = 0, refs_1 = refs; _i < refs_1.length; _i++) {
                var t = refs_1[_i];
                clearTimeout(t.timeout);
            }
        });
        this.listeners.forEach(function (refs, el) {
            for (var _i = 0, refs_2 = refs; _i < refs_2.length; _i++) {
                var l = refs_2[_i];
                el.removeEventListener(l.eventName, l.handler);
            }
        });
        this.classes = [];
        this.styles = new Map();
        this.timeouts = new Map();
        this.listeners = new Map();
    };
    AnimationBuilder.prototype.addAnimationClass = function (name) {
        if (this.classes.indexOf(name) === -1) {
            this.classes.push(name);
        }
        return this;
    };
    AnimationBuilder.prototype.removeAnimationClass = function (name) {
        var index = this.classes.indexOf(name);
        if (index !== -1) {
            this.classes.splice(index, 1);
        }
        return this;
    };
    Object.defineProperty(AnimationBuilder, "DEBUG", {
        // Public Static Methods
        get: function () {
            return AnimationBuilder._DEBUG;
        },
        set: function (debug) {
            AnimationBuilder._DEBUG = debug;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnimationBuilder, "disabled", {
        get: function () {
            return AnimationBuilder._disabled;
        },
        set: function (disabled) {
            AnimationBuilder._disabled = disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnimationBuilder, "defaults", {
        get: function () {
            return AnimationBuilder._defaults;
        },
        enumerable: true,
        configurable: true
    });
    // Private Methods
    AnimationBuilder.prototype.animateDisabled = function (element, mode) {
        if (mode === AnimationMode.Show) {
            this.showElement(element, mode);
        }
        else if (mode === AnimationMode.Hide) {
            this.hideElement(element, mode);
        }
        return Promise.resolve(element);
    };
    AnimationBuilder.prototype.log = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        if (AnimationBuilder.DEBUG) {
            console.log.apply(console, ['css-animator:'].concat(values));
        }
    };
    AnimationBuilder.prototype.nextFrame = function (fn) {
        AnimationBuilder.raf(function () {
            AnimationBuilder.raf(fn);
        });
    };
    AnimationBuilder.prototype.camelCase = function (input) {
        return input.toLowerCase().replace(/-(.)/g, function (match, group) {
            return group.toUpperCase();
        });
    };
    AnimationBuilder.prototype.hideElement = function (element, mode) {
        if (this.animationOptions.useVisibility) {
            element.style.visibility = 'hidden';
            return;
        }
        element.setAttribute('hidden', '');
    };
    AnimationBuilder.prototype.showElement = function (element, mode) {
        if (this.animationOptions.pin && mode === AnimationMode.Show) {
            element.style.visibility = 'visible';
        }
        if (this.animationOptions.useVisibility) {
            element.style.visibility = 'visible';
            return;
        }
        element.removeAttribute('hidden');
    };
    AnimationBuilder.prototype.pinElement = function (element, mode) {
        if (!this.animationOptions.pin)
            return;
        if (mode === AnimationMode.Show) {
            element.style.visibility = 'hidden';
        }
        if (!this.animationOptions.useVisibility) {
            this.showElement(element);
        }
        var position = this.getPosition(element);
        element.style.position = this.animationOptions.fixed ? 'fixed' : 'absolute';
        element.style.top = position.top + "px";
        element.style.left = position.left + "px";
        element.style.width = position.width + "px";
        element.style.height = position.height + "px";
        element.style.margin = '0px';
    };
    AnimationBuilder.prototype.getPosition = function (element) {
        var rect = element.getBoundingClientRect();
        var cs = window.getComputedStyle(element);
        var left = element.offsetLeft;
        var top = element.offsetTop;
        var width = rect.width -
            parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) -
            parseFloat(cs.borderLeftWidth) - parseFloat(cs.borderRightWidth);
        var height = rect.height -
            parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) -
            parseFloat(cs.borderTopWidth) - parseFloat(cs.borderBottomWidth);
        if (this.animationOptions.fixed) {
            left = rect.left + window.scrollX;
            top = rect.top + window.scrollY;
        }
        return { left: left, top: top, width: width, height: height };
    };
    AnimationBuilder.prototype.registerAnimationListeners = function (element, mode, resolve, reject) {
        var _this = this;
        var animationStartEvent = this.animationStartEvent(element);
        var animationEndEvent = this.animationEndEvent(element);
        var startHandler;
        element.addEventListener(animationStartEvent, startHandler = function () {
            _this.log("Animation start handler fired for element", element);
            element.removeEventListener(animationStartEvent, startHandler);
            return startHandler;
        });
        this.log("Registered animation start listener for element", element);
        var endHandler;
        element.addEventListener(animationEndEvent, endHandler = function () {
            _this.log("Animation end handler fired for element", element);
            element.removeEventListener(animationEndEvent, endHandler);
            _this.removeListeners(element, false);
            _this.reset(element, true, false, false);
            if (mode === AnimationMode.Hide)
                _this.hideElement(element);
            if (mode === AnimationMode.Show)
                _this.showElement(element);
            resolve(element);
            return endHandler;
        });
        this.log("Registered animation end listener for element", element);
        this.addListener(element, animationStartEvent, startHandler);
        this.addListener(element, animationEndEvent, endHandler, reject);
    };
    AnimationBuilder.prototype.addTimeout = function (element, timeout, reject) {
        if (!this.timeouts.has(element)) {
            this.timeouts.set(element, []);
        }
        this.timeouts.get(element).push({
            timeout: timeout,
            reject: reject,
        });
    };
    AnimationBuilder.prototype.addListener = function (element, eventName, handler, reject) {
        if (!this.listeners.has(element)) {
            this.listeners.set(element, []);
        }
        var classes = Object.assign({}, this.classes);
        this.listeners.get(element).push({
            eventName: eventName,
            handler: handler,
            reject: reject,
            classes: classes,
        });
    };
    AnimationBuilder.prototype.removeListeners = function (element, reject) {
        var _this = this;
        if (reject === void 0) { reject = false; }
        if (!this.listeners.has(element))
            return;
        this.listeners.get(element)
            .forEach(function (ref) {
            element.removeEventListener(ref.eventName, ref.handler);
            _this.log("Listener " + ref.eventName + " removed for element", element);
            if (reject && _this.animationOptions.reject && ref.reject)
                ref.reject('animation_aborted');
        });
        this.listeners.delete(element);
    };
    AnimationBuilder.prototype.removeTimeouts = function (element, reject) {
        var _this = this;
        if (reject === void 0) { reject = false; }
        if (!this.timeouts.has(element))
            return;
        this.timeouts.get(element)
            .forEach(function (ref) {
            clearTimeout(ref.timeout);
            _this.log("Timeout " + ref.timeout + " removed for element", element);
            if (reject && _this.animationOptions.reject && ref.reject)
                ref.reject('animation_aborted');
        });
        this.timeouts.delete(element);
    };
    AnimationBuilder.prototype.animationEndEvent = function (element) {
        var el = document.createElement('endAnimationElement');
        var animations = {
            animation: 'animationend',
            OAnimation: 'oAnimationEnd',
            MozAnimation: 'animationend',
            WebkitAnimation: 'webkitAnimationEnd',
        };
        for (var animation in animations) {
            if (el.style[animation] !== undefined) {
                return animations[animation];
            }
        }
        return null;
    };
    AnimationBuilder.prototype.animationStartEvent = function (element) {
        var el = document.createElement('startAnimationElement');
        var animations = {
            animation: 'animationstart',
            OAnimation: 'oAnimationStart',
            MozAnimation: 'animationstart',
            WebkitAnimation: 'webkitAnimationStart',
        };
        for (var animation in animations) {
            if (el.style[animation] !== undefined) {
                return animations[animation];
            }
        }
        return null;
    };
    AnimationBuilder.prototype.applyProperties = function (element, mode) {
        this.applyClasses(element, mode);
        this.applyStyles(element, mode);
    };
    AnimationBuilder.prototype.saveStyle = function (element) {
        var styles = {};
        for (var style in element.style) {
            styles[style] = element.style.getPropertyValue(style);
        }
        this.styles.set(element, styles);
    };
    AnimationBuilder.prototype.applyStyles = function (element, mode) {
        this.applyFillMode(element);
        this.applyTimingFunction(element);
        this.applyPlayState(element);
        this.applyDirection(element);
        this.applyDuration(element);
        this.applyIterationCount(element);
    };
    AnimationBuilder.prototype.removeStyles = function (element) {
        if (!this.styles.has(element))
            return;
        var styles = this.styles.get(element);
        element.removeAttribute('style');
        for (var style in styles) {
            element.style.setProperty(style, styles[style]);
        }
        this.styles.delete(element);
    };
    AnimationBuilder.prototype.saveClasses = function (element, mode) {
        var classes = this.classes.slice(0);
        switch (mode) {
            case AnimationMode.Show:
                classes.push('animated-show');
                break;
            case AnimationMode.Hide:
                classes.push('animated-hide');
                break;
        }
        classes.push('animated', this.animationOptions.type);
        this.activeClasses.set(element, classes);
    };
    AnimationBuilder.prototype.applyClasses = function (element, mode) {
        var active = this.activeClasses.get(element) || [];
        (_a = element.classList).add.apply(_a, ['animated'].concat(active));
        var _a;
    };
    AnimationBuilder.prototype.removeClasses = function (element) {
        var active = this.activeClasses.get(element) || [];
        (_a = element.classList).remove.apply(_a, ['animated',
            'animated-show',
            'animated-hide'].concat(active));
        this.activeClasses.delete(element);
        var _a;
    };
    AnimationBuilder.prototype.applyStyle = function (element, prop, value) {
        var el = document.createElement('checkStyle');
        var styles = {
            standard: this.camelCase(prop),
            webkit: this.camelCase("-webkit-" + prop),
            mozilla: this.camelCase("-moz-" + prop),
            opera: this.camelCase("-o-" + prop),
            explorer: this.camelCase("-ie-" + prop),
        };
        for (var style in styles) {
            if (!styles.hasOwnProperty(style))
                continue;
            if (el.style[styles[style]] !== undefined) {
                element.style[styles[style]] = value === undefined || value === null ? null : value;
                break;
            }
        }
        return this;
    };
    Object.defineProperty(AnimationBuilder.prototype, "defaults", {
        // Getters and Setters
        get: function () {
            return this.defaultOptions;
        },
        set: function (defaults) {
            this.defaultOptions = defaults;
        },
        enumerable: true,
        configurable: true
    });
    AnimationBuilder.prototype.setDefaults = function (defaults) {
        this.defaults = defaults;
        return this;
    };
    Object.defineProperty(AnimationBuilder.prototype, "options", {
        get: function () {
            return this.animationOptions;
        },
        set: function (options) {
            this.animationOptions = options;
        },
        enumerable: true,
        configurable: true
    });
    AnimationBuilder.prototype.setOptions = function (options) {
        Object.assign(this.options, options);
        return this;
    };
    Object.defineProperty(AnimationBuilder.prototype, "disabled", {
        get: function () {
            return this.animationOptions.disabled;
        },
        set: function (disabled) {
            this.animationOptions.disabled = disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnimationBuilder.prototype, "reject", {
        get: function () {
            return this.animationOptions.reject;
        },
        set: function (reject) {
            this.animationOptions.reject = reject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnimationBuilder.prototype, "pin", {
        get: function () {
            return this.animationOptions.pin;
        },
        set: function (pin) {
            this.animationOptions.pin = pin;
        },
        enumerable: true,
        configurable: true
    });
    AnimationBuilder.prototype.setPin = function (pin) {
        this.pin = pin;
        return this;
    };
    Object.defineProperty(AnimationBuilder.prototype, "useVisibility", {
        get: function () {
            return this.animationOptions.useVisibility;
        },
        set: function (useVisibility) {
            this.animationOptions.useVisibility = useVisibility;
        },
        enumerable: true,
        configurable: true
    });
    AnimationBuilder.prototype.setUseVisibility = function (useVisibility) {
        this.useVisibility = useVisibility;
        return this;
    };
    Object.defineProperty(AnimationBuilder.prototype, "type", {
        get: function () {
            return this.animationOptions.type;
        },
        set: function (type) {
            this.animationOptions.type = type;
        },
        enumerable: true,
        configurable: true
    });
    AnimationBuilder.prototype.setType = function (type) {
        this.type = type;
        return this;
    };
    Object.defineProperty(AnimationBuilder.prototype, "fillMode", {
        get: function () {
            return this.animationOptions.fillMode;
        },
        set: function (fillMode) {
            this.animationOptions.fillMode = fillMode;
        },
        enumerable: true,
        configurable: true
    });
    AnimationBuilder.prototype.setFillMode = function (fillMode) {
        this.fillMode = fillMode;
        return this;
    };
    AnimationBuilder.prototype.applyFillMode = function (element, fillMode) {
        this.applyStyle(element, 'animation-fill-mode', fillMode || this.animationOptions.fillMode);
        return this;
    };
    Object.defineProperty(AnimationBuilder.prototype, "timingFunction", {
        get: function () {
            return this.animationOptions.timingFunction;
        },
        set: function (timingFunction) {
            this.animationOptions.timingFunction = timingFunction;
        },
        enumerable: true,
        configurable: true
    });
    AnimationBuilder.prototype.setTimingFunction = function (timingFunction) {
        this.timingFunction = timingFunction;
        return this;
    };
    AnimationBuilder.prototype.applyTimingFunction = function (element, timingFunction) {
        this.applyStyle(element, 'animation-timing-function', timingFunction || this.animationOptions.timingFunction);
        return this;
    };
    Object.defineProperty(AnimationBuilder.prototype, "playState", {
        get: function () {
            return this.animationOptions.playState;
        },
        set: function (playState) {
            this.animationOptions.playState = playState;
        },
        enumerable: true,
        configurable: true
    });
    AnimationBuilder.prototype.setPlayState = function (playState) {
        this.playState = playState;
        return this;
    };
    AnimationBuilder.prototype.applyPlayState = function (element, playState) {
        this.applyStyle(element, 'animation-play-state', playState || this.animationOptions.playState);
        return this;
    };
    Object.defineProperty(AnimationBuilder.prototype, "direction", {
        get: function () {
            return this.animationOptions.direction;
        },
        set: function (direction) {
            this.animationOptions.direction = direction;
        },
        enumerable: true,
        configurable: true
    });
    AnimationBuilder.prototype.setDirection = function (direction) {
        this.direction = direction;
        return this;
    };
    AnimationBuilder.prototype.applyDirection = function (element, direction) {
        this.applyStyle(element, 'animation-direction', direction || this.animationOptions.direction);
        return this;
    };
    Object.defineProperty(AnimationBuilder.prototype, "duration", {
        get: function () {
            return this.animationOptions.duration;
        },
        set: function (duration) {
            this.animationOptions.duration = duration;
        },
        enumerable: true,
        configurable: true
    });
    AnimationBuilder.prototype.setDuration = function (duration) {
        this.duration = duration;
        return this;
    };
    AnimationBuilder.prototype.applyDuration = function (element, duration) {
        this.applyStyle(element, 'animation-duration', (duration || this.animationOptions.duration) + "ms");
        return this;
    };
    Object.defineProperty(AnimationBuilder.prototype, "delay", {
        get: function () {
            return this.animationOptions.delay;
        },
        set: function (delay) {
            this.animationOptions.delay = delay;
        },
        enumerable: true,
        configurable: true
    });
    AnimationBuilder.prototype.setDelay = function (delay) {
        this.delay = delay;
        return this;
    };
    AnimationBuilder.prototype.applyDelayAsStyle = function (element, delay) {
        this.applyStyle(element, 'animation-delay', (delay || this.animationOptions.delay) + "ms");
        return this;
    };
    Object.defineProperty(AnimationBuilder.prototype, "iterationCount", {
        get: function () {
            return this.animationOptions.iterationCount;
        },
        set: function (iterationCount) {
            this.animationOptions.iterationCount = iterationCount;
        },
        enumerable: true,
        configurable: true
    });
    AnimationBuilder.prototype.setIterationCount = function (iterationCount) {
        this.iterationCount = iterationCount;
        return this;
    };
    AnimationBuilder.prototype.applyIterationCount = function (element, iterationCount) {
        this.applyStyle(element, 'animation-iteration-count', iterationCount || this.animationOptions.iterationCount);
        return this;
    };
    AnimationBuilder._DEBUG = false;
    AnimationBuilder._disabled = false;
    AnimationBuilder._defaults = {
        disabled: false,
        fixed: false,
        reject: true,
        useVisibility: false,
        pin: true,
        type: 'bounce',
        fillMode: 'none',
        timingFunction: 'ease',
        playState: 'running',
        direction: 'normal',
        duration: 1000,
        delay: 0,
        iterationCount: 1,
    };
    AnimationBuilder.raf = window.requestAnimationFrame
        ? window.requestAnimationFrame.bind(window)
        : setTimeout;
    return AnimationBuilder;
}());
exports.AnimationBuilder = AnimationBuilder;

//# sourceMappingURL=animation_builder.js.map


/***/ }),

/***/ "./node_modules/css-animator/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./node_modules/css-animator/builder.js"));
__export(__webpack_require__("./node_modules/css-animator/angular.js"));

//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./src/app/Animations/slides.animation.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return slidePost; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");

/* Slide Right/Left dialog */
var slidePost = Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('slidePost', [
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('initial', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
        opacity: 1, left: '0px', right: '0px'
    })),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('outLeft', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
        opacity: 0, left: '-1300px', right: '0px'
    })),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('inLeft', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
        opacity: 1, left: '0px', right: '0px'
    })),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('outRight', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
        opacity: 0, right: '-1300px', left: '0px',
    })),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('inRight', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
        opacity: 1, right: '0px', left: '0px',
    })),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('initial => outLeft', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('250ms')),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('outLeft => initial', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('250ms 200ms')),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('initial => outLeft', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('250ms')),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('outRight => initial', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('250ms 200ms')),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('initial => outRight', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('250ms'))
]);
// export const slideRight = trigger('slideRight', [
// 	    	state('out', style({
// 	    		display: 'none', right: '-10000px'
// 	    	})),
// 	    	state('in', style({
// 	    		right: '0px'
// 	    	})),
// 	    	transition('out => in', animate('300ms')),
// 			transition('in => out', animate('300ms'))
// 	    ]);
//# sourceMappingURL=slides.animation.js.map

/***/ }),

/***/ "./src/app/Animations/slides2.animation.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return slideOnClick; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");

/* Slide Right/Left dialog */
var slideOnClick = Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('slideOnClick', [
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('initial', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
        opacity: 1, left: '0px', right: '0px'
    })),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('outLeft', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
        opacity: 0, left: '-180px', right: '0px'
    })),
    // state('inLeft', style({
    // 	opacity: 1, left: '0px', right: '0px'
    // })),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('outRight', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
        opacity: 0, right: '-180px', left: '0px',
    })),
    // state('inRight', style({
    // 	opacity: 1, right: '0px', left: '0px',
    // })),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('initial => outLeft', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('250ms')),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('outLeft => initial', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('250ms 200ms')),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('initial => outLeft', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('250ms')),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('outRight => initial', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('250ms 200ms')),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('initial => outRight', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('250ms'))
]);
//# sourceMappingURL=slides2.animation.js.map

/***/ }),

/***/ "./src/app/Components/home/home-around/home-around.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"background-white\">\n\t<section class=\"wh-profiles-around bb\" *ngIf=\"greatProfiles\">\n\t\t<h2 class=\"freigl\"><span>smart</span> people to <span>meet</span></h2>\n\t\t<p class=\"freigb\">Great stories start with a coffee</p>\n\n\t\t<ngx-siema [options]=\"options1\" class=\"profile-cards\" *ngIf=\"mobile && greatProfiles\">\n\t\t\t<ngx-siema-slide class=\"profile-card\" *ngFor=\"let profile of greatProfiles; let i = index\">\n\t\t\t\t<a [routerLink]=\"['', profile.username]\">\n\t\t\t\t\t<div class=\"card-click-zone\">\n\t\t\t\t\t\t<div class=\"card-rank\" *ngIf=\"profile.rank\">\n\t\t\t\t\t\t\t<span>#{{ profile.rank }}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-picture\" [style.background-image]=\"'url(' + transformImage(profile.cover_picture, 207, 40, 'fill') + ')'\">\n\t\t\t\t\t\t\t<div class=\"card-profile-picture\" [style.background-image]=\"'url(' + transformImage(profile.picture, 64, 64, 'fill') + ')'\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-info bb\">\n\t\t\t\t\t\t\t<h4>{{ profile.fullName }}</h4>\n\t\t\t\t\t\t\t<div class=\"card-location\">\n\t\t\t\t\t\t\t\t<h6 *ngIf=\"profile.state\">{{ profile.city }}, {{ profile.state }}</h6>\n\t\t\t\t\t\t\t\t<h6 *ngIf=\"!profile.state\">{{ profile.city }}, {{ profile.country }}</h6>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"card-description\">\n\t\t\t\t\t\t\t\t<p [innerHtml]=\"profile.description | cut:true:56:' ...'\"></p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"card-profile-skills\">\n\t\t\t                    <ul>\n\t\t\t                        <li *ngFor=\"let skill of profile.skills\">{{ skill | cut:true:20:' ...' }}</li>\n\t\t\t                    </ul>\n\t\t\t                </div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t\t<div class=\"card-status flex\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530771/Witty-icon/User%20Status/Meet_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'to meet smart people'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530771/Witty-icon/User%20Status/Share_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'to share what I\\'m working on'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Hiring_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'for a full time position'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Internship_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'for an internship'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Collaboration_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'for part time collaboration'\">\n\t\t\t\t\t<p class='freigb'>{{ transformCardStatus(profile.about) }}</p>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'to meet smart people'\">{{ profile.first_name }} is looking to network and meet new interesting people</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'to share what I\\'m working on'\">{{ profile.first_name }} is looking to share their work to the world</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'for a full time position'\">{{ profile.first_name }} is looking for a full time position</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'for an internship'\">{{ profile.first_name }} is looking for an internship</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'for part time collaboration'\">{{ profile.first_name }} is looking to do some part time collaboration</div>\n\t\t\t\t</div>\n\t\t\t</ngx-siema-slide>\n\t\t</ngx-siema>\n\n\t\t<div class=\"profile-cards\" *ngIf=\"!mobile && greatProfiles\">\n\t\t\t<div class=\"profile-card\" *ngFor=\"let profile of greatProfiles; let i = index\">\n\t\t\t\t<a [routerLink]=\"['', profile.username]\">\n\t\t\t\t\t<div class=\"card-click-zone\">\n\t\t\t\t\t\t<div class=\"card-rank\" *ngIf=\"profile.rank\">\n\t\t\t\t\t\t\t<span>#{{ profile.rank }}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-picture\" [style.background-image]=\"'url(' + transformImage(profile.cover_picture, 207, 40, 'fill') + ')'\">\n\t\t\t\t\t\t\t<div class=\"card-profile-picture\" [style.background-image]=\"'url(' + transformImage(profile.picture, 64, 64, 'fill') + ')'\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-info bb\">\n\t\t\t\t\t\t\t<h4>{{ profile.fullName }}</h4>\n\t\t\t\t\t\t\t<div class=\"card-location\">\n\t\t\t\t\t\t\t\t<h6 *ngIf=\"profile.state\">{{ profile.city }}, {{ profile.state }}</h6>\n\t\t\t\t\t\t\t\t<h6 *ngIf=\"!profile.state\">{{ profile.city }}, {{ profile.country }}</h6>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"card-description\">\n\t\t\t\t\t\t\t\t<p [innerHtml]=\"profile.description | cut:true:56:' ...'\"></p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"card-profile-skills\">\n\t\t\t                    <ul>\n\t\t\t                        <li *ngFor=\"let skill of profile.skills\">{{ skill | cut:true:20:' ...' }}</li>\n\t\t\t                    </ul>\n\t\t\t                </div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t\t<div class=\"card-status flex\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530771/Witty-icon/User%20Status/Meet_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'to meet smart people'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530771/Witty-icon/User%20Status/Share_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'to share what I\\'m working on'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Hiring_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'for a full time position'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Internship_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'for an internship'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Collaboration_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"profile.about === 'for part time collaboration'\">\n\t\t\t\t\t<p class='freigb'>{{ transformCardStatus(profile.about) }}</p>\n\t\t\t\t\t<!-- <div class=\"tooltipw\" *ngIf=\"profile.about === 'to meet smart people'\">{{ profile.first_name }} is looking to network and meet new interesting people</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'to share what I\\'m working on'\">{{ profile.first_name }} is looking to share their work to the world</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'for a full time position'\">{{ profile.first_name }} is looking for a full time position</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'for an internship'\">{{ profile.first_name }} is looking for an internship</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"profile.about === 'for part time collaboration'\">{{ profile.first_name }} is looking to do some part time collaboration</div> -->\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<a routerLink=\"/meet\"><button class=\"freigl\">Meet more inspiring people</button></a>\n\t</section>\n\n\t<section class=\"wh-profiles-suggest bb\" *ngIf=\"suggestProfiles\">\n\t\t<h2 class=\"freigl\"><div [innerHTML]=\"secondLineCardTitle | sanitizeHtml\"></div></h2>\n\t\t<p class=\"freigb\">{{ secondLineCardText }}</p>\n\n\t\t<ngx-siema [options]=\"options1\" class=\"profile-cards\" *ngIf=\"mobile && suggestProfiles\">\n\t\t\t<ngx-siema-slide class=\"profile-card\" *ngFor=\"let suggestProfile of suggestProfiles; let i = index\">\n\t\t\t\t<a [routerLink]=\"['', suggestProfile.username]\">\n\t\t\t\t\t<div class=\"card-click-zone\">\n\t\t\t\t\t\t<div class=\"card-rank\" *ngIf=\"suggestProfile.rank\">\n\t\t\t\t\t\t\t<span>#{{ suggestProfile.rank }}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-picture\" [style.background-image]=\"'url(' + transformImage(suggestProfile.cover_picture, 207, 40, 'fill') + ')'\">\n\t\t\t\t\t\t\t<div class=\"card-profile-picture\" [style.background-image]=\"'url(' + transformImage(suggestProfile.picture, 64, 64, 'fill') + ')'\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-info bb\">\n\t\t\t\t\t\t\t<h4>{{ suggestProfile.fullName }}</h4>\n\t\t\t\t\t\t\t<div class=\"card-location\">\n\t\t\t\t\t\t\t\t<h6 *ngIf=\"suggestProfile.state\">{{ suggestProfile.city }}, {{ suggestProfile.state }}</h6>\n\t\t\t\t\t\t\t\t<h6 *ngIf=\"!suggestProfile.state\">{{ suggestProfile.city }}, {{ suggestProfile.country }}</h6>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"card-description\">\n\t\t\t\t\t\t\t\t<p [innerHtml]=\"suggestProfile.description | cut:true:56:' ...'\"></p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"card-profile-skills\">\n\t\t\t                    <ul>\n\t\t\t                        <li *ngFor=\"let skill of transformToArray(suggestProfile.skills)\">{{ skill | cut:true:20:' ...' }}</li>\n\t\t\t                    </ul>\n\t\t\t                </div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t\t<div class=\"card-status flex\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530771/Witty-icon/User%20Status/Meet_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"suggestProfile.about === 'to meet smart people'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530771/Witty-icon/User%20Status/Share_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"suggestProfile.about === 'to share what I\\'m working on'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Hiring_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"suggestProfile.about === 'for a full time position'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Internship_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"suggestProfile.about === 'for an internship'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Collaboration_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"suggestProfile.about === 'for part time collaboration'\">\n\t\t\t\t\t<p class='freigb'>{{ transformCardStatus(suggestProfile.about) }}</p>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"suggestProfile.about === 'to meet smart people'\">{{ suggestProfile.first_name }} is looking to network and meet new interesting people</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"suggestProfile.about === 'to share what I\\'m working on'\">{{ suggestProfile.first_name }} is looking to share their work to the world</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"suggestProfile.about === 'for a full time position'\">{{ suggestProfile.first_name }} is looking for a full time position</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"suggestProfile.about === 'for an internship'\">{{ suggestProfile.first_name }} is looking for an internship</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"suggestProfile.about === 'for part time collaboration'\">{{ suggestProfile.first_name }} is looking to do some part time collaboration</div>\n\t\t\t\t</div>\n\t\t\t</ngx-siema-slide>\n\t\t</ngx-siema>\n\n\t\t<div class=\"profile-cards\" *ngIf=\"!mobile && suggestProfiles\">\n\t\t\t<div class=\"profile-card\" *ngFor=\"let suggestProfile of suggestProfiles; let i = index\">\n\t\t\t\t<a [routerLink]=\"['', suggestProfile.username]\">\n\t\t\t\t\t<div class=\"card-click-zone\">\n\t\t\t\t\t\t<div class=\"card-rank\" *ngIf=\"suggestProfile.rank\">\n\t\t\t\t\t\t\t<span>#{{ suggestProfile.rank }}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-picture\" [style.background-image]=\"'url(' + transformImage(suggestProfile.cover_picture, 207, 40, 'fill') + ')'\">\n\t\t\t\t\t\t\t<div class=\"card-profile-picture\" [style.background-image]=\"'url(' + transformImage(suggestProfile.picture, 64, 64, 'fill') + ')'\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-info bb\">\n\t\t\t\t\t\t\t<h4>{{ suggestProfile.fullName }}</h4>\n\t\t\t\t\t\t\t<div class=\"card-location\">\n\t\t\t\t\t\t\t\t<h6 *ngIf=\"suggestProfile.state\">{{ suggestProfile.city }}, {{ suggestProfile.state }}</h6>\n\t\t\t\t\t\t\t\t<h6 *ngIf=\"!suggestProfile.state\">{{ suggestProfile.city }}, {{ suggestProfile.country }}</h6>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"card-description\">\n\t\t\t\t\t\t\t\t<p [innerHtml]=\"suggestProfile.description | cut:true:56:' ...'\"></p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"card-profile-skills\">\n\t\t\t                    <ul>\n\t\t\t                        <li *ngFor=\"let skill of transformToArray(suggestProfile.skills)\">{{ skill | cut:true:20:' ...' }}</li>\n\t\t\t                    </ul>\n\t\t\t                </div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t\t<div class=\"card-status flex\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530771/Witty-icon/User%20Status/Meet_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"suggestProfile.about === 'to meet smart people'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530771/Witty-icon/User%20Status/Share_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"suggestProfile.about === 'to share what I\\'m working on'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Hiring_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"suggestProfile.about === 'for a full time position'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Internship_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"suggestProfile.about === 'for an internship'\">\n\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Collaboration_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"suggestProfile.about === 'for part time collaboration'\">\n\t\t\t\t\t<p class='freigb'>{{ transformCardStatus(suggestProfile.about) }}</p>\n\t\t\t\t\t<!-- <div class=\"tooltipw\" *ngIf=\"suggestProfile.about === 'to meet smart people'\">{{ suggestProfile.first_name }} is looking to network and meet new interesting people</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"suggestProfile.about === 'to share what I\\'m working on'\">{{ suggestProfile.first_name }} is looking to share their work to the world</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"suggestProfile.about === 'for a full time position'\">{{ suggestProfile.first_name }} is looking for a full time position</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"suggestProfile.about === 'for an internship'\">{{ suggestProfile.first_name }} is looking for an internship</div>\n\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"suggestProfile.about === 'for part time collaboration'\">{{ suggestProfile.first_name }} is looking to do some part time collaboration</div> -->\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<a routerLink=\"/meet\"><button class=\"freigl\">Meet more inspiring people</button></a>\n\t</section>\n</section>\n\n\n"

/***/ }),

/***/ "./src/app/Components/home/home-around/home-around.component.scss":
/***/ (function(module, exports) {

module.exports = ".background-white {\n  text-align: center; }\n\n.wh-profiles-around {\n  display: inline-block;\n  padding: 80px 10px 40px 10px; }\n\n.wh-profiles-suggest {\n  padding: 40px 10px 40px 10px;\n  /*\th2 {\n\t\tmargin-bottom: 20px;\n\t}*/ }\n\n.wh-profiles-around .profile-card, .wh-profiles-suggest .profile-card {\n  display: inline-block; }\n\n/******************** MOBILE ****************************/\n\n@media only screen and (max-width: 736px) {\n  .wh-profiles-around, .wh-profiles-suggest {\n    text-align: center;\n    width: 100vw; }\n    .wh-profiles-around h2, .wh-profiles-suggest h2 {\n      color: #2b2b2b;\n      font-size: 24px; }\n    .wh-profiles-around .profile-card, .wh-profiles-suggest .profile-card {\n      margin: 0 auto;\n      margin-bottom: 40px; }\n  .wh-profiles-suggest h2 {\n    margin-bottom: 20px; } }\n"

/***/ }),

/***/ "./src/app/Components/home/home-around/home-around.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeAroundComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__("./node_modules/ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_popover_login_popover_login_component__ = __webpack_require__("./src/app/Components/modals/popover-login/popover-login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_Projects_projects_service__ = __webpack_require__("./src/app/Services/Projects/projects.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_Profiles_profiles_service__ = __webpack_require__("./src/app/Services/Profiles/profiles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_Pictures_pictures_service__ = __webpack_require__("./src/app/Services/Pictures/pictures.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Services_Suggestions_suggestion_service__ = __webpack_require__("./src/app/Services/Suggestions/suggestion.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Services_Backoffice_backoffice_service__ = __webpack_require__("./src/app/Services/Backoffice/backoffice.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Interfaces_Constants_search_profile_constant__ = __webpack_require__("./src/app/Interfaces/Constants/search-profile.constant.ts");
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







var HomeAroundComponent = /** @class */ (function () {
    function HomeAroundComponent(ProfilesService, ProjectsService, PicturesService, TokenService, dialogService, SuggestionService, BackofficeService) {
        this.ProfilesService = ProfilesService;
        this.ProjectsService = ProjectsService;
        this.PicturesService = PicturesService;
        this.TokenService = TokenService;
        this.dialogService = dialogService;
        this.SuggestionService = SuggestionService;
        this.BackofficeService = BackofficeService;
        this.body_profile = __WEBPACK_IMPORTED_MODULE_9__Interfaces_Constants_search_profile_constant__["a" /* searchProfile */];
        this.recursiveIndex = 0;
        this.profileAbout = ['for a full time position', 'for an internship', "to share what I'm working on", 'for part time collaboration', 'to meet smart people'];
        this.options1 = {
            selector: '.siema2',
            duration: 200,
            easing: 'ease-out',
            perPage: 1,
            startIndex: 0,
            draggable: true,
            threshold: 20,
            loop: false,
            onInit: function () {
                // runs immediately after first initialization
            },
            onChange: function () {
                // runs after slide change
            },
        };
    }
    HomeAroundComponent.prototype.ngOnInit = function () {
        this.initSearchBody();
    };
    HomeAroundComponent.prototype.initSearchBody = function () {
        this.body_profile['paginate']['limit'] = 4;
        this.body_profile['query']['members'][2].value = this.location;
        if (this.profile['name'])
            this.body_profile['query']['members'][3].value = this.profile['name'];
        this.getSelectedProfiles();
        this.getUserProject(0);
    };
    HomeAroundComponent.prototype.getProfiles = function () {
        var _this = this;
        this.ProfilesService.searchProfiles(this.body_profile).subscribe(function (res) {
            _this.suggestProfiles = res.profiles;
        });
    };
    HomeAroundComponent.prototype.getSelectedProfiles = function () {
        var _this = this;
        this.BackofficeService.getSelectedProjectsProfiles('great_people').subscribe(function (r) {
            _this.greatProfiles = r.results;
        });
    };
    HomeAroundComponent.prototype.getUserProject = function (index) {
        var _this = this;
        if (!this.profile)
            return;
        else {
            this.ProjectsService.getUserProjects(this.profile['uid']).subscribe(function (r) {
                var lastCall = false;
                if (!r.projects.length || index + 1 === r.projects.length)
                    lastCall = true;
                if (r.projects[index])
                    _this.getSuggestProfiles(r.projects[index].id, lastCall);
            });
        }
    };
    HomeAroundComponent.prototype.getShouldMeetProfiles = function () {
        this.secondLineCardTitle = "around <span>you</span>";
        this.secondLineCardText = "Here are some great people around you";
        if (this.profile['about'] === 'to meet smart people') {
            this.body_profile['query']['sort']['field'] = 'rank';
            this.body_profile['paginate']['offset'] = Math.floor((Math.random() * 30) + 1);
        }
        else if (this.profile['about'] === "to share what I'm working on") {
            this.body_profile['query']['members'][1].value = 'to meet smart people';
        }
        else {
            this.body_profile['query']['members'][0].value = this.profile['skills'].split(',')[0];
            this.body_profile['query']['members'][1].value = "to share what I'm working on";
        }
        this.getProfiles();
    };
    HomeAroundComponent.prototype.getSuggestProfiles = function (id, lastCall) {
        var _this = this;
        this.SuggestionService.profiles({ projectId: id }).subscribe(function (res) {
            if (res[0]) {
                _this.secondLineCardTitle = "<span>people</span> who could <span>work</span> with you";
                _this.secondLineCardText = "Here are some great people who could work with you";
                _this.suggestProfiles = res.sort(function () { return .5 - Math.random(); }).slice(0, 4);
            }
            else if (!lastCall)
                _this.getUserProject(_this.recursiveIndex + 1);
            else
                _this.getShouldMeetProfiles();
        }, function (error) {
            if (!lastCall)
                _this.getUserProject(_this.recursiveIndex + 1);
            else if (lastCall)
                _this.getShouldMeetProfiles();
        });
    };
    // followProfile(id, index) {
    // 	if (!this.TokenService.getToken())
    // 		return this.showLoginPopOver();
    // 	this.ProfilesService.followProfile(id, {}).subscribe( res => {
    // 		if (!this.profiles[index]['hasLiked']){
    // 			this.profiles[index]['follower'] += 1
    // 			this.profiles[index]['hasLiked'] = true
    // 		} else {
    // 			this.profiles[index]['follower'] -= 1
    // 			this.profiles[index]['hasLiked'] = false
    // 		}
    // 	});
    // }
    HomeAroundComponent.prototype.transformCardStatus = function (status) {
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
    HomeAroundComponent.prototype.transformToArray = function (string) {
        if (typeof string === 'string')
            return string.split(',');
        else
            return string;
    };
    /* SHOW MODAL */
    HomeAroundComponent.prototype.showLoginPopOver = function () {
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_2__modals_popover_login_popover_login_component__["a" /* PopoverLoginComponent */], {});
    };
    /* TRANSFORM */
    HomeAroundComponent.prototype.transformImage = function (url, width, height, crop) {
        return this.PicturesService.transformImage(url, width, height, crop);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], HomeAroundComponent.prototype, "mobile", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], HomeAroundComponent.prototype, "profile", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], HomeAroundComponent.prototype, "location", void 0);
    HomeAroundComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home-around',
            template: __webpack_require__("./src/app/Components/home/home-around/home-around.component.html"),
            styles: [__webpack_require__("./src/app/Components/home/home-static/home-static.component.scss"), __webpack_require__("./src/app/Components/home/home-around/home-around.component.scss"), __webpack_require__("./src/public/styles/profile-card.scss"), __webpack_require__("./src/public/styles/tooltip.scss")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
            providers: []
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__Services_Profiles_profiles_service__["a" /* ProfilesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_Profiles_profiles_service__["a" /* ProfilesService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__Services_Projects_projects_service__["a" /* ProjectsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_Projects_projects_service__["a" /* ProjectsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__Services_Pictures_pictures_service__["a" /* PicturesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_Pictures_pictures_service__["a" /* PicturesService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__Services_Authentication_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__Services_Authentication_token_service__["a" /* TokenService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__Services_Suggestions_suggestion_service__["a" /* SuggestionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__Services_Suggestions_suggestion_service__["a" /* SuggestionService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_8__Services_Backoffice_backoffice_service__["a" /* BackofficeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__Services_Backoffice_backoffice_service__["a" /* BackofficeService */]) === "function" && _g || Object])
    ], HomeAroundComponent);
    return HomeAroundComponent;
    var _a, _b, _c, _d, _e, _f, _g;
}());

//# sourceMappingURL=home-around.component.js.map

/***/ }),

/***/ "./src/app/Components/home/home-invitation/home-invitation.component.html":
/***/ (function(module, exports) {

module.exports = "<section id=\"wh-ig\" class=\"wh-invite-google\">\n\t<div class=\"filter-blur\"></div>\n\t<img class=\"wlp-paralayer layer-1\" src=\"/public/images/med-parallax.png\" [style.top]=\"topPixelStr\">\n\t<img class=\"wlp-paralayer layer-2\" src=\"/public/images/big-parallax.png\" [style.top]=\"topPixelStr2\">\n\n\t<div class=\"whig-container\">\n\t\t<div class=\"whigc-title\">\n\t\t\t<h2 class=\"freigl\">improve your <span>ranking</span> and get up to <span>13x</span> more exposure</h2>\n\t\t\t<div class=\"block-text\">\n\t\t\t\t<p class=\"freigb\">Invite your friends to increase your exposure to our community</p>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"whigc-buttons mar-b-10 flex\">\n\t\t\t<button class=\"flex\" (click)=\"showInvitationModal()\">\n\t\t\t\tGet invites for your friends\n\t\t\t</button>\n\t\t\t<!-- <div class=\"subscribe-button flex\">\n\t\t\t\t<input type=\"text\" name=\"subscribe\" placeholder=\"@emails, seperated by comma\" [(ngModel)]=\"emailsEntrance\" />\n\t\t\t\t<button (click)=\"sendInvitations()\">{{ buttonText }} <i *ngIf=\"buttonText === 'Sent'\" class=\"fa fa-check\"></i></button>\n\t\t\t</div> -->\n\t\t</div>\n\n\t\t<a href=\"/statistics\" class=\"freigb\">See how your ranking is done</a>\n\t</div>\n</section>\n"

/***/ }),

/***/ "./src/app/Components/home/home-invitation/home-invitation.component.scss":
/***/ (function(module, exports) {

module.exports = ".wh-invite-google {\n  position: relative;\n  padding: 50px 0px;\n  overflow: hidden; }\n  .wh-invite-google .filter-blur {\n    height: 100%;\n    top: 0; }\n  .wh-invite-google .wlp-paralayer {\n    position: absolute;\n    width: 100%;\n    z-index: -1;\n    top: 0;\n    left: 0;\n    right: 0; }\n  .wh-invite-google .whig-container {\n    position: relative;\n    z-index: 100; }\n  .wh-invite-google .whig-container a {\n      color: #999;\n      border-bottom: 1px solid;\n      background-color: #fff; }\n  .wh-invite-google .whig-container a:hover {\n      border-bottom: 0; }\n  .wh-invite-google .whig-container .whigc-title {\n      text-align: center;\n      margin-bottom: 20px; }\n  .wh-invite-google .whig-container .whigc-title h2 {\n        display: inline-block;\n        padding: 0 10px;\n        background-color: #fff;\n        margin: 0;\n        border-radius: 4px; }\n  .wh-invite-google .whig-container .whigc-title p {\n        margin-bottom: 0;\n        display: inline-block;\n        color: #999;\n        background-color: #fff;\n        padding: 0 10px 5px 0px;\n        border-bottom-left-radius: 4px;\n        border-bottom-right-radius: 4px; }\n  .wh-invite-google .whig-container .whigc-buttons {\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center; }\n  .wh-invite-google .whig-container .whigc-buttons button {\n        position: relative;\n        top: 1px;\n        margin: 0;\n        background-color: #ff4d4d;\n        color: #fff;\n        padding: 6px 25px 8px 25px; }\n  .wh-invite-google .whig-container .whigc-buttons button img {\n          width: 20px; }\n  .wh-invite-google .whig-container .whigc-buttons button:hover {\n        background-color: #fd373c; }\n  .wh-invite-google .whig-container .whigc-buttons .subscribe-button input {\n        margin: 0;\n        padding: 10px;\n        width: 250px;\n        border-bottom-right-radius: 0;\n        border-top-right-radius: 0; }\n  .wh-invite-google .whig-container .whigc-buttons .subscribe-button button {\n        position: relative;\n        top: 1px;\n        border-bottom-left-radius: 0;\n        border-top-left-radius: 0;\n        background-color: #ff4d4d;\n        color: #fff; }\n  /******************** MOBILE ****************************/\n  @media only screen and (max-width: 736px) {\n  .wh-invite-google {\n    padding: 60px 10px; }\n    .wh-invite-google .layer-1 {\n      -webkit-transform: scale(2, 2);\n              transform: scale(2, 2); }\n    .wh-invite-google .layer-2 {\n      -webkit-transform: scale(3, 3);\n              transform: scale(3, 3); }\n    .wh-invite-google .whig-container {\n      width: 100%;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box; }\n    .wh-invite-google .whigc-buttons {\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap; }\n      .wh-invite-google .whigc-buttons button {\n        margin: 0;\n        margin-bottom: 15px; }\n      .wh-invite-google .whigc-buttons .subscribe-button {\n        display: none; } }\n"

/***/ }),

/***/ "./src/app/Components/home/home-invitation/home-invitation.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeInvitationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__("./node_modules/ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_invitation_social_invitation_social_component__ = __webpack_require__("./src/app/Components/modals/invitation-social/invitation-social.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_Invitation_invitation_service__ = __webpack_require__("./src/app/Services/Invitation/invitation.service.ts");
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
// import { GoogleContactModalComponent } from '../../modals/google-contact-modal/google-contact-modal.component';

/* Services */

var HomeInvitationComponent = /** @class */ (function () {
    function HomeInvitationComponent(InvitationService, dialogService) {
        this.InvitationService = InvitationService;
        this.dialogService = dialogService;
        this.buttonText = 'Send invites';
        this.topCount = 0;
        this.topCount2 = 0;
        this.startY = 0;
        this.initScroll = 0;
    }
    HomeInvitationComponent.prototype.ngOnInit = function () {
    };
    HomeInvitationComponent.prototype.showInvitationModal = function () {
        window.scrollTo(0, 0);
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_2__modals_invitation_social_invitation_social_component__["a" /* InvitationSocialComponent */], {
            check: true
        }).subscribe(function (success) {
        });
    };
    HomeInvitationComponent.prototype.onWindowScroll = function () {
        if (this.initScroll === 0) {
            this.initScroll = 1;
            this.startY = window.pageYOffset;
        }
        if (this.startY <= window.pageYOffset) {
            this.topPixelStr = this.topCount-- + 'px';
            this.topPixelStr2 = (this.topCount2 -= 1.5) + 'px';
            this.startY = window.pageYOffset;
        }
        else {
            this.topPixelStr = this.topCount++ + 'px';
            this.topPixelStr2 = (this.topCount2 += 1.5) + 'px';
            this.startY = window.pageYOffset;
        }
    };
    // showSocialModal() {
    // 	let disposable 	= this.dialogService.addDialog(GoogleContactModalComponent, {
    //        	profile 	: {},
    //        	index 		: 3
    //    	}).subscribe( success => {
    //    		console.log(success);
    //    	});
    // }
    HomeInvitationComponent.prototype.parsingEmails = function () {
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var emails = this.emailsEntrance.replace(/\s+/g, '').split(',');
        var length = emails.length;
        var newMails = [];
        for (var i = 0; i < length; i++) {
            if (reg.test(emails[i])) {
                newMails.push(emails[i]);
            }
        }
        return newMails;
    };
    HomeInvitationComponent.prototype.resetButton = function () {
        var _this = this;
        this.buttonText = 'Sent';
        this.emailsEntrance = '';
        setTimeout(function () {
            _this.buttonText = 'Send invites';
        }, 2000);
    };
    HomeInvitationComponent.prototype.sendInvitations = function () {
        var _this = this;
        if (this.emailsEntrance) {
            this.InvitationService.sendInvitation({ mail: this.parsingEmails() }).subscribe(function (res) {
                if (res.success) {
                    _this.resetButton();
                }
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], HomeInvitationComponent.prototype, "mobile", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])("window:scroll", []),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], HomeInvitationComponent.prototype, "onWindowScroll", null);
    HomeInvitationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home-invitation',
            template: __webpack_require__("./src/app/Components/home/home-invitation/home-invitation.component.html"),
            styles: [__webpack_require__("./src/app/Components/home/home-static/home-static.component.scss"), __webpack_require__("./src/app/Components/home/home-invitation/home-invitation.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__Services_Invitation_invitation_service__["a" /* InvitationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_Invitation_invitation_service__["a" /* InvitationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _b || Object])
    ], HomeInvitationComponent);
    return HomeInvitationComponent;
    var _a, _b;
}());

//# sourceMappingURL=home-invitation.component.js.map

/***/ }),

/***/ "./src/app/Components/home/home-post-project/home-post-project.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- BEGIN OF POST PROJECT -->\n<!-- \t\t<div class=\"wh-post align-center\">\n -->\t\t\t<!-- *********LAST TEMPLATE********* -->\n\t\t\t<div class=\"whp-10th\" [@slidePost]=\"modals[10]\" *ngIf=\"profile\">\n\t\t\t\t<h1>Thanks {{ profile.first_name }} 🎉</h1>\n\n\t\t\t\t<p class=\"whp-coms-text freigb mar-b-10\">Redirecting you to your project page</p>\n\n\t\t\t\t<div class=\"spinner\"></div>\n\t\t\t</div>\n\t\t\t<!-- *********END LAST TEMPLATE********* -->\n\n\t\t\t<!-- *********NINETH TEMPLATE********* -->\n\t\t\t<!-- <div class=\"whp-9th\" [@slidePost]=\"modals[8]\">\n\t\t\t\t<h1>Are there other people already working with you?</h1>\n\n\t\t\t\t<p class=\"whp-coms-text freigb mar-b-10\">Add them to your project (email addresses, seperated by coma)</p>\n\n\t\t\t\t<div class=\"input-tagLine\">\n\t\t\t\t\t<input #autoFocus_6 class=\"freigl\" type=\"text\" name=\"tagLine\" [(ngModel)]=\"emails\" />\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"whp-button flex\">\n\t\t\t\t\t<a class=\"freigb cursor-pt mar-r-10\" (click)=\"slideModals(8, 7)\">Back</a>\n\t\t\t\t\t<button (click)=\"slideModals(8, 9)\">Next</button>\n\t\t\t\t</div>\n\t\t\t</div> -->\n\t\t\t<!-- ********END NINETH TEMPLATE********* -->\n\n\t\t\t<!-- *********NINETH TEMPLATE********* -->\n\t\t\t<div class=\"whp-8th\" [@slidePost]=\"modals[9]\">\n\t\t\t\t<h1>Any more details to share about that need?</h1>\n\n\t\t\t\t<p class=\"whp-coms-text freigb mar-b-10\">Describe in a few words what you’re looking for. {{ need_about.length }}/175</p>\n\n\t\t\t\t<div class=\"input-tagLine\">\n\t\t\t\t\t<input #autoFocus_6 class=\"freigl\" type=\"text\" name=\"tagLine\" maxlength=\"175\" [(ngModel)]=\"need_about\" />\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"whp-button flex\">\n\t\t\t\t\t<a class=\"freigb cursor-pt mar-r-10\" (click)=\"slideModals(9, 8)\">Back</a>\n\t\t\t\t\t<button class=\"cursor-pt\" (click)=\"updateProjectNeed(9, 10)\">Next</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"whp-8th\" [@slidePost]=\"modals[8]\">\n\t\t\t\t<h1>Position title</h1>\n\n\t\t\t\t<p class=\"whp-coms-text freigb mar-b-10\">What position are you filling? {{ need_position.length }}/100</p>\n\n\t\t\t\t<div class=\"input-tagLine\">\n\t\t\t\t\t<input #autoFocus_5 class=\"freigl\" type=\"text\" name=\"position\" maxlength=\"100\" [(ngModel)]=\"need_position\" />\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"whp-button flex\">\n\t\t\t\t\t<a class=\"freigb cursor-pt mar-r-10\" (click)=\"slideModals(8, 7)\">Back</a>\n\t\t\t\t\t<button class=\"cursor-pt\" (click)=\"updateProjectNeed(8, 9)\">Next</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<!-- ********END NINETH TEMPLATE********* -->\n\n\t\t\t<!-- *********EIGHTH TEMPLATE********* -->\n\t\t\t<div class=\"whp-9th\" [@slidePost]=\"modals[7]\" needModalDiv>\n\t\t\t\t<h1>Who would you like to meet?</h1>\n\n\t\t\t\t<p class=\"whp-coms-text freigb mar-b-10\">Tell us the kind of need you have, you'll be able to add more later on</p>\n\n\t\t\t\t<div class=\"nmb-field flex\">\n\t\t\t\t\t<h2 class=\"freigl\">I am looking </h2>\n\t\t\t\t\t<div id=\"nmbd-1\" class=\"downbox flex cursor-pt\">\n\t\t\t\t\t\t<h2 class=\"freigl\">{{ currentStatus2 }}</h2>\n\t\t\t\t\t\t<img id=\"nmbd-1-i\" class=\"mar-l-10 transition-200\" src=\"/public/images/arrow-down-icon-w.svg\">\n\t\t\t\t\t\t<div id=\"nmbdb-1\" class=\"dropdown\">\n\t\t\t\t\t\t\t<li class=\"freigb cursor-pt\" *ngFor=\"let status of statutes\" (click)=\"selectStatus(status.name)\">{{ status.name }}</li>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<h2 class=\"freigl mar-r-10\">\n\t\t\t\t\t\t<span *ngIf=\"currentStatus2 === 'to hire someone' || currentStatus2 === 'to hire an intern' || currentStatus2 === 'for a cofounder'\">skilled in</span>\n\t\t\t\t\t\t<span *ngIf=\"currentStatus === 'for help'\">in</span>\n\t\t\t\t\t\t</h2>\n\t\t\t\t\t\t<div class=\"skillBox flex mar-r-10\" *ngFor=\"let selectedSkill of selectedSkills; let last = last; let i = index\">\n\t\t\t\t\t\t\t<h2 class=\"freigl mar-r-5\">{{ selectedSkill }}</h2>\n\t\t\t\t\t\t\t<img class=\"cursor-pt\" src=\"/public/images/cross-icon.svg\" (click)=\"removeSkill(selectedSkill)\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t<div id=\"nmbd-2\" class=\"downbox2\" *ngIf=\"currentStatus2 !== 'for feedback' && selectedSkills.length < 5\">\n\t\t\t\t\t\t<input id=\"nmbd-2-i\" type=\"text\" name=\"skill\" placeholder=\"any skills\" [(ngModel)]=\"skillName\" (click)=\"showSkillModal()\"/>\n\t\t\t\t\t\t<!-- <div id=\"nmbdb-2\" class=\"dropdown2\">\n\t\t\t\t\t\t\t<ul *ngIf=\"skills\">\n\t\t\t\t\t\t\t\t<li class=\"freigb cursor-pt\" *ngFor=\"let skill of (skills | searchPipe: 'name': skillName).slice(0, 5)\" (click)=\"selectSkill(skill.name)\">{{ skill.name }}</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div> -->\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"whp-button flex\">\n\t\t\t\t\t<a class=\"freigb cursor-pt mar-r-10\" (click)=\"slideModals(7, 6)\">Back</a>\n\t\t\t\t\t<button class=\"cursor-pt\" (click)=\"createProjectNeed(7, 8)\">Next</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<!-- ********END EIGHTH TEMPLATE********* -->\n\n\t\t\t<!-- *********SEVENTH TEMPLATE********* -->\n\t\t\t<div class=\"whp-7th\" [@slidePost]=\"modals[6]\">\n\t\t\t\t<h1>What does it look like?</h1>\n\n\t\t\t\t<p class=\"whp-coms-text freigb mar-b-15\">People love pictures & videos (be creative: screenshots, sketches, product, prototype, nayan cats)</p>\n\n\t\t\t\t<div class=\"whp-medias flex\">\n\t\t\t\t\t<div class=\"whpm-container2 whpm-container2-video cursor-pt\">\n\t\t\t\t\t\t<div class=\"without-content\" *ngIf=\"!video\">\n\t\t\t\t\t\t\t<div *ngIf=\"uploading1\" class=\"spinner-load\">\n\t\t\t\t\t\t\t\t<div class=\"spinner__item1 spinner-item\"></div>\n\t\t\t\t\t\t\t\t<div class=\"spinner__item2 spinner-item\"></div>\n\t\t\t\t\t\t\t\t<div class=\"spinner__item3 spinner-item\"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"media-filter transition-150\"></div>\n\t\t\t\t\t\t\t<input class=\"input-file\" id=\"file1\" type=\"file\" name=\"fileUpload\" ng2FileSelect [uploader]=\"uploader\" placeholder=\"\">\n\t\t\t\t\t\t\t<label class=\"label-media cursor-pt\" for=\"file1\" ng2FileDrop (click)=\"setType('video')\"></label>\n\t\t\t\t\t\t\t<img class=\"icon-image align-center transition-150\" src=\"/public/images/icon-media-video.svg\" alt=\"media-play\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"with-content\" *ngIf=\"video\" (click)=\"removeMedia('video', -1)\">\n\t\t\t\t\t\t\t<video muted>\n\t\t\t\t\t\t\t\t<source [src]=\"video\" type=\"video/mp4\" />\n\t\t\t\t\t\t\t</video>\n\t\t\t\t\t\t\t<img class=\"align-center play-button\" src=\"/public/images/play-button.svg\" alt=\"play-button\" />\n\t\t\t\t\t\t\t<div class=\"media-filter-remove transition-150\"></div>\n\t\t\t\t\t\t\t<span class=\"align-center freigs transition-150\">Remove</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<img *ngIf=\"pictures[0] && leftPixel < 0\" class=\"arrow-image cursor-pt\" src=\"public/images/arrow-back-w-01.svg\" alt=\"arrow-icon\" (click)=\"slideOnClick('left')\"/>\n\n\t\t\t\t\t<div class=\"repeat\">\n\t\t\t\t\t\t<div class=\"whpm-slide-container flex transition-200\" [ngStyle]=\"{ 'left': leftPixelStr }\">\n\t\t\t\t\t\t\t<input *ngIf=\"!pictures[0]\" class=\"input-file\" id=\"file2\" type=\"file\" name=\"fileUpload\" ng2FileSelect [uploader]=\"uploader\" placeholder=\"\">\n\t\t\t\t\t\t\t<div class=\"whpm-container2 whpm-container2-images cursor-pt flex\">\n\t\t\t\t\t\t\t\t<div class=\"without-content\" *ngIf=\"!pictures[0]\">\n\t\t\t\t\t\t\t\t\t<div *ngIf=\"uploading2\" class=\"spinner-load\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"spinner__item1 spinner-item\"></div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"spinner__item2 spinner-item\"></div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"spinner__item3 spinner-item\"></div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"media-filter transition-150\"></div>\n\t\t\t\t\t\t\t\t\t<img class=\"icon-image align-center transition-150\" src=\"/public/images/icon-media-picture.svg\" alt=\"media-play\">\n\t\t\t\t\t\t\t\t\t<label class=\"label-media cursor-pt\" for=\"file2\" ng2FileDrop (click)=\"setType('pictures')\"></label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"with-content with-content-repeat\" *ngFor=\"let picture of pictures; let i = index\" (click)=\"removeMedia('pictures', i)\">\n\t\t\t\t\t\t\t\t\t<img [src]=\"transformImage(picture, 160, 100, 'fill')\" alt=\"project-pictures\" />\n\t\t\t\t\t\t\t\t\t<div class=\"media-filter-remove transition-150\"></div>\n\t\t\t\t\t\t\t\t\t<span class=\"align-center freigs transition-150\">Remove</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"whpm-container2 whpm-container2-images more-content cursor-pt\" *ngIf=\"pictures[0]\">\n\t\t\t\t\t\t\t\t\t<div *ngIf=\"uploading2\" class=\"spinner-load\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"spinner__item1 spinner-item\"></div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"spinner__item2 spinner-item\"></div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"spinner__item3 spinner-item\"></div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"media-filter transition-150\"></div>\n\t\t\t\t\t\t\t\t\t<span class=\"align-center freigs transition-150\">Add more...</span>\n\t\t\t\t\t\t\t\t\t<input *ngIf=\"pictures[0]\" class=\"input-file\" id=\"file2\" type=\"file\" name=\"fileUpload\" ng2FileSelect [uploader]=\"uploader\" placeholder=\"\">\n\t\t\t\t\t\t\t\t\t<label class=\"label-media cursor-pt\" for=\"file2\" ng2FileDrop (click)=\"setType('pictures')\"></label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<img *ngIf=\"pictures[0]\" class=\"arrow-image cursor-pt\" src=\"public/images/arrow-right-icon-w.svg\" alt=\"arrow-icon\" (click)=\"slideOnClick('right')\" />\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"whp-button flex\">\n\t\t\t\t\t<a class=\"freigb cursor-pt mar-r-10\" (click)=\"slideModals(6, 5)\">Back</a>\n\t\t\t\t\t<button class=\"cursor-pt\" (click)=\"updateProject(6, 7)\">Next</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<!-- ********END SEVENTH TEMPLATE********* -->\n\n\t\t\t<!-- *********SIXTH TEMPLATE********* -->\n\t\t\t<div class=\"whp-6th\" [@slidePost]=\"modals[5]\">\n\t\t\t\t<h1>Add a thumbnail</h1>\n\n\t\t\t\t<p class=\"whp-coms-text freigb mar-b-15\">Unleash you creativity. Logos are fine too.  (.jpg .png 2mb max)</p>\n\n\t\t\t\t<div class=\"whp-medias\">\n\t\t\t\t\t<div class=\"whpm-container cursor-pt\">\n\t\t\t\t\t\t<div class=\"without-content\" *ngIf=\"!logo\">\n\t\t\t\t\t\t\t<div *ngIf=\"uploading\" class=\"spinner-load\">\n\t\t\t\t\t\t\t\t<div class=\"spinner__item1 spinner-item\"></div>\n\t\t\t\t\t\t\t\t<div class=\"spinner__item2 spinner-item\"></div>\n\t\t\t\t\t\t\t\t<div class=\"spinner__item3 spinner-item\"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"media-filter transition-150\"></div>\n\t\t\t\t\t\t\t<i *ngIf=\"!uploading\" class=\"fa fa-plus align-center transition-150\"></i>\n\t\t\t\t\t\t\t<input class=\"input-file\" id=\"file\" type=\"file\" name=\"fileUpload\" ng2FileSelect [uploader]=\"uploader\" placeholder=\"\">\n\t\t\t\t\t\t\t<label class=\"label-media cursor-pt\" for=\"file\" ng2FileDrop (click)=\"setType('logo')\"></label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"with-content\" *ngIf=\"logo\" (click)=\"removeMedia('logo', -1)\">\n\t\t\t\t\t\t\t<img [src]=\"transformImage(logo, 100, 100, 'fill')\" alt=\"project-logo\" />\n\t\t\t\t\t\t\t<div class=\"media-filter-remove transition-150\"></div>\n\t\t\t\t\t\t\t<span class=\"align-center freigs transition-150\">Remove</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"whp-button flex\">\n\t\t\t\t\t<a class=\"freigb cursor-pt mar-r-10\" (click)=\"slideModals(5, 4)\">Back</a>\n\t\t\t\t\t<button class=\"cursor-pt\" (click)=\"updateProject(5, 6)\">Next</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<!-- ********END SIXTH TEMPLATE********* -->\n\n\t\t\t<!-- *********FIFTH TEMPLATE********* -->\n\t\t\t<div class=\"whp-5th\" [@slidePost]=\"modals[4]\">\n\t\t\t\t<h1>Where can people find you?</h1>\n\n\t\t\t\t<p class=\"whp-coms-text freigb mar-b-10\">You'll be able to add more links when editing your project page</p>\n\n\t\t\t\t<div class=\"input-tagLine\">\n\t\t\t\t\t<input #autoFocus_4 class=\"freigl\" type=\"text\" name=\"tagLine\" maxlength=\"70\" [value]=\"http_url\" (input)=\"onChange($event.target.value)\" placeholder=\"  http://\" />\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"whp-button flex\">\n\t\t\t\t\t<a class=\"freigb cursor-pt mar-r-10\" (click)=\"slideModals(4, 3)\">Back</a>\n\t\t\t\t\t<button class=\"cursor-pt\" (click)=\"updateProject(4, 5)\">Next</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<!-- ********END FIFTH TEMPLATE********* -->\n\n\t\t\t<!-- *********FOURTH TEMPLATE********* -->\n\t\t\t<div class=\"whp-4th\" [@slidePost]=\"modals[3]\">\n\t\t\t\t<h1>Why are you working on that?</h1>\n\t\t\t\t<p class=\"whp-coms-text freigb mar-b-10\">Tell us why that you're building is worth sharing. Is there a need? a pain? is that your dream? {{ resume_2.length }}/500</p>\n\n\t\t\t\t<div class=\"whp-textarea whp4th-textarea flex\">\n\t\t\t\t\t<textarea class=\"mar-r-10 freigb\" #autoFocus_3 name=\"resume_2\" maxlength=\"500\" [(ngModel)]=\"resume_2\" (ngModelChange)=\"watchChange($event)\"></textarea>\n\t\t\t\t\t<div class=\"whp-button whp4th-button flex\">\n\t\t\t\t\t\t<a class=\"freigb cursor-pt mar-r-10\" (click)=\"slideModals(3, 2)\">Back</a>\n\t\t\t\t\t\t<button (click)=\"verifyProject4(3, 4)\" [ngClass]=\"{ 'disabled-button': !verify4, 'active-button': verify4 }\">Next</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<!-- *********END FOURTH TEMPLATE********* -->\n\n\t\t\t<!-- *********THIRD TEMPLATE********* -->\n\t\t\t<div class=\"whp-3rd\" [@slidePost]=\"modals[2]\">\n\t\t\t\t<h1>How would you describe your project?</h1>\n\t\t\t\t<p class=\"whp-coms-text freigb mar-b-10\">Think about what your mom or whatever could understand. {{ resume_1.length }}/500</p>\n\n\t\t\t\t<div class=\"whp-textarea whp3rd-textarea flex\">\n\t\t\t\t\t<textarea class=\"mar-r-10 freigb\" #autoFocus_2 name=\"resume_1\" maxlength=\"500\" [(ngModel)]=\"resume_1\" (ngModelChange)=\"watchChange($event)\"></textarea>\n\t\t\t\t\t<div class=\"whp-button whp3rd-button flex\">\n\t\t\t\t\t\t<a class=\"freigb cursor-pt mar-r-10\" (click)=\"slideModals(2, 1)\">Back</a>\n\t\t\t\t\t\t<button (click)=\"verifyProject3(2, 3)\" [ngClass]=\"{ 'disabled-button': !verify3, 'active-button': verify3 }\">Next</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<!-- *********END THIRD TEMPLATE********* -->\n\n\t\t\t<!-- *********SECOND TEMPLATE********* -->\n\t\t\t<div class=\"whp-2nd\" [@slidePost]=\"modals[1]\">\n\t\t\t\t<h1>Give us a tagline?</h1>\n\n\t\t\t\t<p class=\"whp-coms-text freigb mar-b-10\">Keep it short and simple. ie:\"LinkedIn: The boring professional network\". {{ tagLine.length }}/70</p>\n\n\t\t\t\t<div class=\"input-tagLine\">\n\t\t\t\t\t<input #autoFocus_1 class=\"freigl\" type=\"text\" name=\"tagLine\" maxlength=\"70\" [(ngModel)]=\"tagLine\" (ngModelChange)=\"watchChange($event)\" />\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"whp-button flex\">\n\t\t\t\t\t<a class=\"freigb cursor-pt mar-r-10\" (click)=\"slideModals(1, 0)\">Back</a>\n\t\t\t\t\t<button (click)=\"verifyProject2(1, 2)\" [ngClass]=\"{ 'disabled-button': !verify2, 'active-button': verify2 }\">Next</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<!-- ********END SECOND TEMPLATE********* -->\n\n\t\t\t<div class=\"whp-1st\" [@slidePost]=\"modals[0]\">\n\t\t\t\t<h1>What are you working on?</h1>\n\t\t\t\t<div class=\"whp-1 flex mar-b-10\">\n\t\t\t\t\t<h2 class=\"mar-r-10\">I have <span *ngIf=\"currentStatus === 'Idea'\">an</span> <span *ngIf=\"currentStatus !== 'Idea'\">a</span></h2>\n\t\t\t\t\t<div id=\"whp1\" class=\"whp-box flex mar-r-10 cursor-pt\">\n\t\t\t\t\t\t<h2>{{ currentStatus }}</h2>\n\t\t\t\t\t\t<img id=\"whp1-img\" class=\"transition-150\" src=\"/public/images/arrow-down-icon-w.svg\">\n\t\t\t\t\t\t<div id=\"whp1-b\" class=\"whp1-dropdown-1\">\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t<li (click)=\"getStatus('Idea')\">Idea</li>\n\t\t\t\t\t\t\t\t<li (click)=\"getStatus('Prototype')\">Prototype</li>\n\t\t\t\t\t\t\t\t<li (click)=\"getStatus('Beta product')\">Beta product</li>\n\t\t\t\t\t\t\t\t<li (click)=\"getStatus('Company')\">Company</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<h2 class=\"mar-r-10\">about</h2>\n\t\t\t\t\t<div id=\"whp2\" class=\"whp-box flex cursor-pt\">\n\t\t\t\t\t\t<h2>{{ currentCategory }}</h2>\n\t\t\t\t\t\t<img id=\"whp2-img\" class=\"transition-150\" src=\"/public/images/arrow-down-icon-w.svg\">\n\t\t\t\t\t\t<div id=\"whp2-b\" class=\"whp1-dropdown-2\">\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t<li *ngFor=\"let category of categories\" (click)=\"getCategory(category.name, category.id)\">{{ category.name }}</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"whp-2 flex mar-b-15\">\n\t\t\t\t\t<h2 class=\"mar-r-10\">called</h2>\n\t\t\t\t\t<input class=\"mar-r-10 input-1\" type=\"text\" name=\"title\" [(ngModel)]=\"title\" (ngModelChange)=\"watchChange($event)\" placeholder=\"project title\" />\n\t\t\t\t\t<h2 class=\"mar-r-10\">in</h2>\n\t\t\t\t\t<input class=\"input-2\" type=\"text\" name=\"location\" placeholder=\"Boston, MA\" (setAddress)=\"getAddress($event)\" googlePlace />\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"whp-button whp1st-button flex\">\n\t\t\t\t\t<a class=\"freigb cursor-pt\" (click)=\"hidePost()\">Back</a>\n\t\t\t\t\t<button (click)=\"verifyProject1(0, 1)\" [ngClass]=\"{ 'disabled-button': !verify1, 'active-button': verify1 }\">Start</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"progres-block\">\n\t\t\t\t<!-- <div class=\"progres-bar\">\n\t\t\t\t\t<div class=\"progression transition-150\" [style.width]=\"barWidth\"></div>\n\t\t\t\t</div> -->\n\t\t\t\t<!-- <span *ngIf=\"showComplete\" class=\"freigb\" counto [step]=\"50\" [countFrom]=\"countFrom\" [countTo]=\"countTo\" [duration]=\"1\" (countoChange)=\"counto = $event\"><span class=\"counter freigs\">{{ counto | round }}%</span> complete</span> -->\n\t\t\t</div>\n\n<!-- \t\t</div>\n --><!-- BEGIN OF POST PROJECT -->\n"

/***/ }),

/***/ "./src/app/Components/home/home-post-project/home-post-project.component.scss":
/***/ (function(module, exports) {

module.exports = ".progres-block {\n  position: absolute;\n  width: 700px;\n  margin: 0 auto;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin-bottom: 50px;\n  text-align: center;\n  /*\t.progres-bar {\n\t\twidth: 500px;\n\t\tborder-radius: 2px;\n\t\tmargin-right: 20px;\n\n\t\t.progression {\n\t\t\twidth: 200px;\n\t\t\theight: 2px;\n\t\t\tbackground-color: #fff;\n\t\t}\n\t}*/ }\n  .progres-block .counter {\n    font-size: 18px; }\n  .whp-1st, .whp-2nd, .whp-3rd, .whp-4th, .whp-5th, .whp-6th, .whp-7th, .whp-8th, .whp-9th, .whp-10th {\n  position: absolute;\n  width: 700px;\n  top: 50%;\n  -webkit-transform: perspective(1px) translateY(-50%);\n  transform: perspective(1px) translateY(-50%);\n  left: 0;\n  right: 0;\n  z-index: 100; }\n  .whp-1st button, .whp-2nd button, .whp-3rd button, .whp-4th button, .whp-5th button, .whp-6th button, .whp-7th button, .whp-8th button, .whp-9th button, .whp-10th button {\n    font-family: 'freigMed'; }\n  .whp-1st .spinner-load .spinner-item, .whp-2nd .spinner-load .spinner-item, .whp-3rd .spinner-load .spinner-item, .whp-4th .spinner-load .spinner-item, .whp-5th .spinner-load .spinner-item, .whp-6th .spinner-load .spinner-item, .whp-7th .spinner-load .spinner-item, .whp-8th .spinner-load .spinner-item, .whp-9th .spinner-load .spinner-item, .whp-10th .spinner-load .spinner-item {\n    top: 45%;\n    width: 9px;\n    height: 9px; }\n  .spinner {\n  margin: 0 auto;\n  border: 2px solid transparent;\n  border-top: 2px solid #fff;\n  border-radius: 50%;\n  width: 30px;\n  height: 30px;\n  -webkit-animation: spin 2s linear infinite;\n  animation: spin 0.5s linear infinite; }\n  @-webkit-keyframes spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n  @keyframes spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n  /*.wh-post {\n\twidth: 700px;\n\tmargin: 0 auto;\n\tleft: 0;\n\tright: 0;*/\n  .whp-box {\n  position: relative;\n  background-color: rgba(20, 20, 20, 0.5);\n  padding: 3px 15px 4px 10px;\n  border-radius: 4px; }\n  .whp-box img {\n    width: 12px;\n    margin-left: 10px; }\n  h1 {\n  font-family: 'FreigSem';\n  font-size: 28px;\n  margin-bottom: 5px; }\n  h2 {\n  font-family: 'FreigBook';\n  font-size: 24px; }\n  input {\n  margin: 0;\n  padding: 0;\n  font-family: 'FreigLight';\n  font-size: 24px;\n  padding: 5px 0px;\n  color: #fff;\n  width: 100%;\n  background-color: transparent;\n  border: transparent; }\n  .label-media, video {\n  position: absolute;\n  width: inherit;\n  height: inherit;\n  top: 0;\n  left: 0;\n  border-radius: inherit;\n  z-index: 100; }\n  video {\n  width: auto;\n  z-index: 0; }\n  .whp-coms-text {\n  font-size: 17px;\n  opacity: 0.7; }\n  .input-tagLine span {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n  margin-right: 50px; }\n  .whp-button {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n  padding-right: 5px; }\n  .whp-button a {\n    margin-right: 20px; }\n  .whp-button button {\n    background-color: rgba(255, 52, 52, 0.8);\n    padding: 10px 25px;\n    font-size: 18px; }\n  .whp-button .disabled-button {\n    opacity: 0.5;\n    cursor: default; }\n  .whp-button .active-button {\n    opacity: 1;\n    cursor: pointer; }\n  .whp-textarea textarea {\n  width: 450px;\n  height: 130px;\n  background-color: transparent;\n  border: transparent;\n  color: #fff;\n  font-size: 21px;\n  margin: 0;\n  margin-right: 15px;\n  padding: 5px 0px; }\n  .whp-medias .arrow-image {\n  height: 20px; }\n  .whp-medias .repeat {\n  width: 340px;\n  margin: 0 10px;\n  overflow-x: hidden; }\n  .whp-medias .repeat .whpm-slide-container, .whp-medias .repeat .with-content-repeat {\n    position: relative; }\n  .whp-medias .repeat .with-content-repeat {\n    margin: 0 10px 0 0; }\n  .whp-medias .whpm-container2-video {\n  margin-right: 45px; }\n  .whp-medias .whpm-container2-images {\n  margin: 0 10px 0 0; }\n  .whp-medias span {\n  left: 0;\n  right: 0;\n  opacity: 0; }\n  .whp-medias .whpm-container, .whp-medias .whpm-container2 {\n  position: relative;\n  width: 100px;\n  height: 100px;\n  border-radius: 4px;\n  text-align: center; }\n  .whp-medias .whpm-container img, .whp-medias .whpm-container2 img {\n    position: absolute;\n    width: inherit;\n    height: inherit;\n    top: 0;\n    left: 0;\n    right: 0;\n    border-radius: 4px; }\n  .whp-medias .whpm-container .icon-image, .whp-medias .whpm-container2 .icon-image {\n    top: 50%;\n    width: 50px;\n    height: 50px;\n    margin: 0 auto; }\n  .whp-medias .whpm-container2-video {\n  overflow-x: hidden; }\n  .whp-medias .whpm-container2 {\n  width: 160px;\n  height: 100px; }\n  .whp-medias .whpm-container2 img {\n    width: inherit;\n    height: inherit; }\n  .whp-medias .without-content, .whp-medias .with-content {\n  width: inherit;\n  height: inherit;\n  border-radius: inherit; }\n  .whp-medias .without-content .play-button, .whp-medias .with-content .play-button {\n    width: 15px;\n    margin: 0 auto;\n    top: 50%; }\n  .whp-medias .media-filter, .whp-medias .media-filter-remove {\n  background-color: #fff;\n  opacity: 0.2;\n  width: inherit;\n  height: inherit;\n  border-radius: inherit; }\n  .whp-medias .media-filter-remove {\n  opacity: 0;\n  background-color: #222; }\n  .whp-medias .without-content:hover .media-filter {\n  opacity: 0.1; }\n  .whp-medias .without-content:hover img {\n  width: 45px;\n  height: 45px; }\n  .whp-medias .without-content:hover i {\n  opacity: 0.5; }\n  .whp-medias .with-content:hover .media-filter-remove {\n  opacity: 0.3; }\n  .whp-medias .with-content:hover span {\n  opacity: 1; }\n  .whp-medias .more-content span {\n  opacity: 1; }\n  .whp-medias .more-content:hover .media-filter {\n  opacity: 0.1; }\n  .whp-medias .more-content:hover span {\n  opacity: 0.5; }\n  .whp-10th {\n  text-align: center; }\n  .whp-9th .nmb-field {\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  padding: 20px 0px; }\n  .whp-9th .nmb-field h2 {\n    color: #fff;\n    font-size: 24px;\n    margin-bottom: 5px; }\n  .whp-9th .nmb-field h2 span {\n      color: #fff; }\n  .whp-9th .nmb-field .downbox {\n    position: relative;\n    margin: 0 10px;\n    margin-bottom: 10px;\n    border-radius: 4px;\n    cursor: pointer;\n    background-color: rgba(20, 20, 20, 0.5);\n    padding: 0 15px;\n    -webkit-box-align: baseline;\n        -ms-flex-align: baseline;\n            align-items: baseline; }\n  .whp-9th .nmb-field .downbox h2 {\n      color: #fff; }\n  .whp-9th .nmb-field .downbox .dropdown {\n      display: none;\n      position: absolute;\n      top: 0;\n      margin-top: 30px;\n      /*-webkit-column-count: 3;\n\t\t\t\t\t-moz-column-count: 3;\n\t\t\t\t\tcolumn-count: 3;*/\n      padding: 10px;\n      background-color: #fff;\n      border: 1px solid #e5e5e5;\n      border-radius: 8px;\n      z-index: 1;\n      width: 150px; }\n  .whp-9th .nmb-field .downbox .dropdown li {\n        color: #222;\n        -moz-column-break-inside: avoid;\n        -webkit-column-break-inside: avoid;\n        column-break-inside: avoid;\n        padding: 10px 5px 10px 10px;\n        border-radius: 4px; }\n  .whp-9th .nmb-field .downbox .dropdown li:hover {\n        background-color: #e5e5e5; }\n  .whp-9th .nmb-field .skillBox {\n    -webkit-box-align: baseline;\n        -ms-flex-align: baseline;\n            align-items: baseline;\n    margin: 0 10px 0 0;\n    border-radius: 4px;\n    background-color: rgba(20, 20, 20, 0.5);\n    padding: 0 15px;\n    margin-bottom: 10px; }\n  .whp-9th .nmb-field .skillBox h2 {\n      color: #fff; }\n  .whp-9th .nmb-field .skillBox img {\n      width: 11px; }\n  .whp-9th .nmb-field .downbox2 {\n    position: relative; }\n  .whp-9th .nmb-field .downbox2 input {\n      width: 120px;\n      -ms-flex-item-align: center;\n          -ms-grid-row-align: center;\n          align-self: center;\n      font-family: 'FreigLight';\n      font-size: 24px;\n      margin: 0;\n      padding: 0;\n      border: 0;\n      border-bottom: 1px solid #fff;\n      border-radius: 0; }\n  .whp-9th .nmb-field .downbox2 .dropdown2 {\n      display: none;\n      min-width: 100%;\n      position: absolute;\n      padding: 10px;\n      background-color: #fff;\n      border: 1px solid #e5e5e5;\n      border-radius: 8px; }\n  .whp-9th .nmb-field .downbox2 .dropdown2 li {\n        color: #222;\n        white-space: nowrap;\n        padding: 10px;\n        border-radius: 4px; }\n  .whp-9th .nmb-field .downbox2 .dropdown2 li:hover {\n        background-color: #e5e5e5; }\n  .whp-6th i {\n  color: #fff;\n  left: 0;\n  right: 0;\n  font-size: 24px; }\n  .whp-5th input::-webkit-input-placeholder {\n  color: #fff; }\n  .whp-5th input:-ms-input-placeholder {\n  color: #fff; }\n  .whp-5th input::-ms-input-placeholder {\n  color: #fff; }\n  .whp-5th input::placeholder {\n  color: #fff; }\n  .whp-4th .whp4th-textarea textarea {\n  width: 500px; }\n  .whp-2nd, .whp-3rd, .whp-4th, .whp-5th, .whp-6th, .whp-7th, .whp-8th, .whp-9th, .whp-10th {\n  margin: 0 auto;\n  left: -1300px;\n  opacity: 0; }\n  /*\t.whp-6th {\n\t\topacity: 1;\n\t\tleft: 0px;\n\t}*/\n  .whp-1st {\n  margin: 0 auto;\n  left: 0;\n  opacity: 1; }\n  .whp-1st .whp-1 .whp1-dropdown-1 {\n    position: absolute;\n    background-color: white;\n    top: 0;\n    left: 0;\n    margin-top: 43px;\n    border-radius: 8px;\n    z-index: 100;\n    width: 180px;\n    display: none; }\n  .whp-1st .whp-1 .whp1-dropdown-1 ul {\n      padding-top: 10px;\n      padding-bottom: 10px; }\n  .whp-1st .whp-1 .whp1-dropdown-1 ul li {\n        font-family: 'FreigLight';\n        color: black;\n        font-size: 18px;\n        z-index: 10000;\n        padding: 5px 10px 10px 20px; }\n  .whp-1st .whp-1 .whp1-dropdown-2 {\n    position: absolute;\n    background-color: white;\n    top: 0;\n    left: 0;\n    margin-top: 43px;\n    border-radius: 8px;\n    z-index: 100;\n    display: none; }\n  .whp-1st .whp-1 .whp1-dropdown-2 ul {\n      -webkit-column-count: 3;\n              column-count: 3;\n      padding-top: 10px;\n      padding-bottom: 10px; }\n  .whp-1st .whp-1 .whp1-dropdown-2 ul li {\n        font-family: 'FreigLight';\n        white-space: nowrap;\n        color: black;\n        font-size: 18px;\n        z-index: 10000;\n        padding: 5px 10px 10px 20px; }\n  .whp-1st .whp-2 input {\n    color: #fff; }\n  .whp-1st .whp-2 .input-1 {\n    width: 200px;\n    background-color: transparent;\n    border: 0;\n    border-bottom: 1px solid;\n    border-radius: 0;\n    padding: 0;\n    margin: 0;\n    margin-right: 10px;\n    font-size: 24px; }\n  .whp-1st .whp-2 .input-2 {\n    width: 180px;\n    background-color: rgba(20, 20, 20, 0.5);\n    padding: 2px 10px;\n    border: 0;\n    margin: 0;\n    font-size: 24px; }\n  .whp-1st .whp1st-button {\n    padding-right: 60px; }\n  /*}\n*/\n"

/***/ }),

/***/ "./src/app/Components/home/home-post-project/home-post-project.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export stateSlide */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePostProjectComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__("./node_modules/ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cloudinary__ = __webpack_require__("./node_modules/ng2-cloudinary/dist/esm/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_popover_login_popover_login_component__ = __webpack_require__("./src/app/Components/modals/popover-login/popover-login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modals_skill_modal_skill_modal_component__ = __webpack_require__("./src/app/Components/modals/skill-modal/skill-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Services_shared_service__ = __webpack_require__("./src/app/Services/shared.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Services_Projects_projects_service__ = __webpack_require__("./src/app/Services/Projects/projects.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Services_Skills_skills_service__ = __webpack_require__("./src/app/Services/Skills/skills.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Services_Pictures_pictures_service__ = __webpack_require__("./src/app/Services/Pictures/pictures.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Interfaces_Constants_categories_constant__ = __webpack_require__("./src/app/Interfaces/Constants/categories-constant.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Interfaces_Constants_status_constant__ = __webpack_require__("./src/app/Interfaces/Constants/status-constant.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Animations_slides_animation__ = __webpack_require__("./src/app/Animations/slides.animation.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Animations_slides2_animation__ = __webpack_require__("./src/app/Animations/slides2.animation.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_underscore__ = __webpack_require__("./node_modules/underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_underscore__);
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





/* Models */


/* Animtations */


/* Libraries */

var stateSlide = {
    '0': 'initial',
    '1': 'outRight',
    '2': 'outRight',
    '3': 'outRight',
    '4': 'outRight',
    '5': 'outRight',
    '6': 'outRight',
    '7': 'outRight',
    '8': 'outRight',
    '9': 'outRight',
    '10': 'outRight'
};
var HomePostProjectComponent = /** @class */ (function () {
    function HomePostProjectComponent(SharedService, TokenService, dialogService, ProjectsService, SkillsService, PicturesService, route, router, ChangeDetectorRef) {
        this.SharedService = SharedService;
        this.TokenService = TokenService;
        this.dialogService = dialogService;
        this.ProjectsService = ProjectsService;
        this.SkillsService = SkillsService;
        this.PicturesService = PicturesService;
        this.route = route;
        this.router = router;
        this.ChangeDetectorRef = ChangeDetectorRef;
        this.slide = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.tagLine = '';
        this.resume_1 = '';
        this.resume_2 = '';
        this.http_url = '';
        this.need_about = '';
        this.need_position = '';
        this.leftPixelStr = '0px';
        this.currentStatus = 'Idea';
        this.currentStatus2 = 'for help';
        this.currentCategory = 'Any category';
        this.leftPixel = 0;
        this.done = false;
        this.uploading = false;
        this.uploading1 = false;
        this.uploading2 = false;
        this.verify1 = false;
        this.verify2 = false;
        this.verify3 = false;
        this.verify4 = false;
        this.pictures = [];
        this.categories = __WEBPACK_IMPORTED_MODULE_11__Interfaces_Constants_categories_constant__["a" /* categories */];
        this.statutes = __WEBPACK_IMPORTED_MODULE_12__Interfaces_Constants_status_constant__["b" /* needStatus2 */];
        this.selectedSkills = [];
        /* COUNTER */
        this.showComplete = false;
        this.count = 0;
        this.countTo = 0;
        this.countFrom = 0;
        this.uploader = new __WEBPACK_IMPORTED_MODULE_2_ng2_cloudinary__["b" /* CloudinaryUploader */](new __WEBPACK_IMPORTED_MODULE_2_ng2_cloudinary__["a" /* CloudinaryOptions */]({ cloudName: 'dqpkpmrgk', uploadPreset: 'z7rzegb5', autoUpload: true }));
        this.imageUpload();
    }
    HomePostProjectComponent.prototype.ngOnInit = function () {
        this.modals = stateSlide;
        // this.initServices();
    };
    HomePostProjectComponent.prototype.ngOnDestroy = function () {
        this.modals[0] = 'initial';
        this.modals[9] = 'outRight';
    };
    HomePostProjectComponent.prototype.countComplete = function (index) {
        if (index === 0) {
            this.countTo = 20;
        }
        else if (index === 1 && this.countFrom < 20) {
            this.countFrom = 20;
            this.countTo = 30;
        }
        else if (index === 2 && this.countFrom < 30) {
            this.countFrom = 30;
            this.countTo = 40;
        }
        else if (index === 3 && this.countFrom < 40) {
            this.countFrom = 40;
            this.countTo = 50;
        }
        else if (index === 4 && this.countFrom < 50) {
            this.countFrom = 50;
            this.countTo = 55;
        }
        else if (index === 5 && this.countFrom < 55) {
            this.countFrom = 55;
            this.countTo = 60;
        }
        else if (index === 6 && this.countFrom < 60) {
            this.countFrom = 60;
            this.countTo = 80;
        }
        else if (index === 7 && this.countFrom < 80) {
            this.countFrom = 80;
            this.countTo = 90;
        }
        else if (index === 8 && this.countFrom < 90) {
            this.countFrom = 90;
            this.countTo = 95;
        }
        else if (index === 9 && this.countFrom < 95) {
            this.countFrom = 90;
            this.countTo = 100;
        }
    };
    HomePostProjectComponent.prototype.autoFocus = function (index) {
        if (index === 1)
            this.input_1.nativeElement.focus();
        else if (index === 2)
            this.input_2.nativeElement.focus();
        else if (index === 3)
            this.input_3.nativeElement.focus();
        else if (index === 4)
            this.input_4.nativeElement.focus();
        else if (index === 8)
            this.input_5.nativeElement.focus();
        else if (index === 9)
            this.input_6.nativeElement.focus();
    };
    // initServices() {
    // 	this.SkillsService.getSkills().subscribe( res => {
    // 		this.skills = res.skills
    // 	})
    // }
    HomePostProjectComponent.prototype.getStatus = function (name) {
        this.currentStatus = name;
        this.checkField();
    };
    HomePostProjectComponent.prototype.getCategory = function (name, id) {
        this.currentCategory = name;
        this.currentCategoryId = id;
        this.checkField();
    };
    HomePostProjectComponent.prototype.getAddress = function (place) {
        var address = place['formatted_address'].replace('USA', 'United States');
        var array = address.split(', ');
        this.city = array[0];
        this.state = array[1];
        this.country = array[2] ? array[2] : array[1];
        this.long = place['geometry'].location.lat();
        this.lat = place['geometry'].location.lng();
        this.checkField();
        this.ChangeDetectorRef.detectChanges();
    };
    HomePostProjectComponent.prototype.onChange = function (value) {
        if (value.length === 1)
            this.http_url = 'http://' + value;
    };
    HomePostProjectComponent.prototype.watchChange = function (value) {
        this.checkField();
    };
    HomePostProjectComponent.prototype.verifyProject1 = function (index, offset) {
        if (!this.TokenService.getToken())
            this.showLoginPopOver();
        else {
            if (this.currentCategoryId && this.currentStatus && this.title && this.city) {
                this.showComplete = true;
                this.slideModals(index, offset);
                this.countComplete(index);
            }
            else
                console.log("ERROR ENTRY DATA");
        }
    };
    HomePostProjectComponent.prototype.verifyProject2 = function (index, offset) {
        if (this.tagLine) {
            this.slideModals(index, offset);
            this.countComplete(index);
        }
        else
            console.log("ERROR ENTRY DATA");
    };
    HomePostProjectComponent.prototype.verifyProject3 = function (index, offset) {
        if (this.resume_1) {
            this.slideModals(index, offset);
            this.countComplete(index);
        }
        else
            console.log("ERROR ENTRY DATA");
    };
    HomePostProjectComponent.prototype.verifyProject4 = function (index, offset) {
        if (this.resume_2) {
            this.createProject(index, offset);
            this.countComplete(index);
        }
        else
            console.log("ERROR ENTRY DATA");
    };
    HomePostProjectComponent.prototype.checkField = function () {
        if (this.currentCategoryId && this.currentStatus && this.title && this.city)
            this.verify1 = true;
        else
            this.verify1 = false;
        this.verify2 = this.tagLine ? true : false;
        this.verify3 = this.resume_1 ? true : false;
        this.verify4 = this.resume_2 ? true : false;
    };
    HomePostProjectComponent.prototype.selectSkill = function (name) {
        if (this.selectedSkills.indexOf(name) < 0 && this.selectedSkills.length < 5) {
            this.selectedSkills.push(name);
            this.skillName = null;
        }
    };
    HomePostProjectComponent.prototype.selectStatus = function (name) {
        if (name === 'Freelance' || name === 'Fundings')
            return;
        this.currentStatus2 = name;
    };
    HomePostProjectComponent.prototype.removeSkill = function (name) {
        this.selectedSkills = __WEBPACK_IMPORTED_MODULE_15_underscore__["without"](this.selectedSkills, name);
    };
    HomePostProjectComponent.prototype.createProject = function (index, offset) {
        var _this = this;
        if (!this.done) {
            var body = {
                title: this.title,
                status: this.currentStatus,
                category: this.currentCategoryId,
                description: this.tagLine,
                desc_1: this.replaceNewline(this.resume_1),
                desc_2: this.replaceNewline(this.resume_2),
                location: {
                    city: 'San Francisco',
                    state: 'CA',
                    country: 'United States',
                    lng: 37.7738997,
                    lat: -122.4158846
                }
            };
            this.ProjectsService.createProject(body).subscribe(function (res) {
                if (res.id) {
                    _this.project_id = res;
                    _this.done = true;
                    _this.slideModals(index, offset);
                    _this.countComplete(index);
                }
            });
        }
        else {
            this.slideModals(index, offset);
        }
    };
    HomePostProjectComponent.prototype.updateProject = function (index, offset) {
        var _this = this;
        var body = {
            title: this.title,
            // status     	: this.currentStatus,
            category_id: this.currentCategoryId,
            about: '',
            description: this.tagLine,
            desc_1: this.replaceNewline(this.resume_1),
            desc_2: this.replaceNewline(this.resume_2),
            video: this.video,
            link: this.http_url || '',
            app: this.app || '',
            logo: this.logo || '',
            picture: this.pictures[0],
            pictures: this.pictures,
            location: {
                city: 'San Francisco',
                state: 'CA',
                country: 'United States',
                lng: 37.7738997,
                lat: -122.4158846
            }
        };
        this.ProjectsService.updateProject(this.project_id['id'], body).subscribe(function (res) {
            _this.slideModals(index, offset);
            _this.countComplete(index);
        });
    };
    HomePostProjectComponent.prototype.createProjectNeed = function (index, offset) {
        var _this = this;
        var body = {
            status: this.currentStatus2,
            description: this.replaceNewline(this.need_about),
            tags: this.selectedSkills
        };
        // if (body.tags[0] || body.status === 'Feedback') {
        this.ProjectsService.createProjectOpening(this.project_id['id'], body).subscribe(function (res) {
            if (res.id) {
                _this.opening_id = res.id;
                if (body.status === 'to hire someone' || body.status === 'to hire an intern')
                    _this.slideModals(index, offset);
                else
                    _this.slideModals(index, offset + 1);
                _this.countComplete(index);
            }
        });
        // } else {
        // 	if (body.status === 'to hire someone' || body.status === 'to hire an intern')
        // 		this.slideModals(index, offset);
        // 	else
        // 		this.slideModals(index, offset + 1);
        // 	this.countComplete(index);
        // }
    };
    HomePostProjectComponent.prototype.updateProjectNeed = function (index, offset) {
        var _this = this;
        if (this.opening_id) {
            var body = {
                status: this.currentStatus2,
                position: this.need_position,
                description: this.replaceNewline(this.need_about),
                tags: this.selectedSkills
            };
            if (body.status !== 'to hire someone' && body.status !== 'to hire an intern')
                body.position = '';
            this.ProjectsService.updateProjectOpening(this.opening_id, body).subscribe(function (res) {
                _this.slideModals(index, offset);
                _this.countComplete(index);
            });
        }
        else {
            this.slideModals(index, offset);
            this.countComplete(index);
        }
    };
    HomePostProjectComponent.prototype.slideOnClick = function (side) {
        if (this.pictures.length) {
            if (side === 'left') {
                // const limit 	= 0
                this.leftPixel += 165;
                if (this.leftPixel <= 0)
                    this.leftPixelStr = this.leftPixel.toString() + 'px';
                else
                    this.leftPixel -= 165;
            }
            else {
                var limit = -165 * (this.pictures.length - 1);
                this.leftPixel -= 165;
                if (this.leftPixel >= limit)
                    this.leftPixelStr = this.leftPixel.toString() + 'px';
                else
                    this.leftPixel += 165;
            }
        }
    };
    HomePostProjectComponent.prototype.slideModals = function (index, offset) {
        var _this = this;
        if (index < offset) {
            this.modals[index] = 'outLeft';
            this.modals[offset] = 'initial';
        }
        else if (index > offset) {
            if (index === 9 && (this.currentStatus2 !== 'to hire someone' && this.currentStatus2 !== 'to hire an intern'))
                offset -= 1;
            this.modals[index] = 'outRight';
            this.modals[offset] = 'initial';
        }
        if (offset === 10) {
            setTimeout(function () {
                _this.router.navigate(['/project', _this.project_id['public_id'], _this.title.replace(/ /g, '-')]);
            }, 2000);
        }
        this.autoFocus(offset);
    };
    /* UPLOAD */
    HomePostProjectComponent.prototype.imageUpload = function () {
        var _this = this;
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            _this.uploading = false;
            _this.uploading1 = false;
            _this.uploading2 = false;
            _this.mediaFile = JSON.parse(response);
            if (_this.type === 'pictures') {
                _this.pictures.push(_this.mediaFile.secure_url);
                _this.slideOnClick('right');
            }
            else if (_this.type === 'logo') {
                _this.PicturesService.uploadPicture('project', 'logo', { url: _this.mediaFile.secure_url })
                    .subscribe(function (res) {
                    if (res.picture)
                        _this.logo = res.picture;
                });
            }
            else
                _this.video = _this.mediaFile.secure_url;
        };
        this.uploader.onAfterAddingFile = function (fileItem) {
            if (_this.type === 'logo')
                _this.uploading = true;
            else if (_this.type === 'pictures')
                _this.uploading2 = true;
            else
                _this.uploading1 = true;
            _this.uploader.uploadAll();
        };
    };
    HomePostProjectComponent.prototype.setType = function (type) {
        this.type = type;
    };
    HomePostProjectComponent.prototype.removeMedia = function (type, index) {
        if (type === 'logo')
            this.logo = '';
        else if (type === 'pictures') {
            this.pictures.splice(index, 1);
            this.slideOnClick('left');
        }
        else
            this.video = '';
    };
    HomePostProjectComponent.prototype.hidePost = function () {
        this.slide.emit();
    };
    HomePostProjectComponent.prototype.transformImage = function (url, width, height, crop) {
        return this.PicturesService.transformImage(url, width, height, crop);
    };
    HomePostProjectComponent.prototype.replaceNewline = function (text) {
        return text.replace(/\r?\n/g, '<br />');
    };
    /* SHOW MODAL */
    HomePostProjectComponent.prototype.showLoginPopOver = function () {
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_4__modals_popover_login_popover_login_component__["a" /* PopoverLoginComponent */], {});
    };
    HomePostProjectComponent.prototype.showSkillModal = function () {
        var _this = this;
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_5__modals_skill_modal_skill_modal_component__["a" /* SkillModalComponent */], {
            selectedSkills: this.selectedSkills
        }).subscribe(function (skills) {
            _this.selectedSkills = skills;
            // if (!skills[0])
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], HomePostProjectComponent.prototype, "login", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], HomePostProjectComponent.prototype, "profile", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
    ], HomePostProjectComponent.prototype, "slide", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('autoFocus_1'),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _b || Object)
    ], HomePostProjectComponent.prototype, "input_1", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('autoFocus_2'),
        __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _c || Object)
    ], HomePostProjectComponent.prototype, "input_2", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('autoFocus_3'),
        __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _d || Object)
    ], HomePostProjectComponent.prototype, "input_3", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('autoFocus_4'),
        __metadata("design:type", typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _e || Object)
    ], HomePostProjectComponent.prototype, "input_4", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('autoFocus_5'),
        __metadata("design:type", typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _f || Object)
    ], HomePostProjectComponent.prototype, "input_5", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('autoFocus_6'),
        __metadata("design:type", typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _g || Object)
    ], HomePostProjectComponent.prototype, "input_6", void 0);
    HomePostProjectComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home-post-project',
            template: __webpack_require__("./src/app/Components/home/home-post-project/home-post-project.component.html"),
            styles: [__webpack_require__("./src/app/Components/home/home-post-project/home-post-project.component.scss")],
            animations: [__WEBPACK_IMPORTED_MODULE_13__Animations_slides_animation__["a" /* slidePost */], __WEBPACK_IMPORTED_MODULE_14__Animations_slides2_animation__["a" /* slideOnClick */]]
        }),
        __metadata("design:paramtypes", [typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_6__Services_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__Services_shared_service__["a" /* SharedService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_7__Services_Authentication_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__Services_Authentication_token_service__["a" /* TokenService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_8__Services_Projects_projects_service__["a" /* ProjectsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__Services_Projects_projects_service__["a" /* ProjectsService */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_9__Services_Skills_skills_service__["a" /* SkillsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__Services_Skills_skills_service__["a" /* SkillsService */]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_10__Services_Pictures_pictures_service__["a" /* PicturesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__Services_Pictures_pictures_service__["a" /* PicturesService */]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */]) === "function" && _p || Object, typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["e" /* Router */]) === "function" && _q || Object, typeof (_r = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _r || Object])
    ], HomePostProjectComponent);
    return HomePostProjectComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
}());

//# sourceMappingURL=home-post-project.component.js.map

/***/ }),

/***/ "./src/app/Components/home/home-post/home-post.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"wh-post bb\" *ngIf=\"!mobile\">\n\t<div class=\"whp-project\">\n\t\t<h2 class=\"freigb\">Working on something? Need people to help you?<br />\n\t\tYou found the right place.</h2>\n\t\t<button class=\"freigm\" (click)=\"scrollTop()\">Post a project</button>\n\t</div>\n\n\t<div class=\"whp-project-need\">\n\t\t<h2 class=\"freigl\">Discover projects that need people skilled in <span class=\"whpp-skill animated fadeIn\">{{ currentSkill }}</span></h2>\n\t\t<div class=\"whpp-pictures mar-b-15 flex\" *ngIf=\"currentProjects\">\n\t\t\t<a [routerLink]=\"['/project', currentProject.public_id, transformUrl(currentProject.title)]\" *ngFor=\"let currentProject of currentProjects\"><img class=\"animated fadeIn\" [src]=\"transformImage(currentProject.picture, 40, 40, 'fill')\"></a>\n\t\t</div>\n\t\t<a [routerLink]=\"['/discover']\"><button class=\"freigb mar-t-15\">Discover more of them</button></a>\n\t</div>\n</section>\n\n<section class=\"wh-post bb\" *ngIf=\"mobile\">\n\t<div class=\"whp-project\">\n\t\t<h2 class=\"freigb\">Working on something?<br /> Need people to help you?<br /><br />\n\t\tYou found the right place.</h2>\n\t\t<button class=\"freigm\" (click)=\"scrollTop()\">Post a project</button>\n\t</div>\n\n\t<div class=\"whp-project-need whp-people-skill\" *ngIf=\"skillProfiles\">\n\t\t<h2 class=\"freigl\">Meet people skilled in <br /><span class=\"whpp-skill animated fadeIn\">{{ currentSkill }}</span></h2>\n\t\t<div class=\"whpp-pictures whpp-pictures-mobile profile flex\">\n\t\t\t<a [routerLink]=\"['/']\" *ngFor=\"let skillProfile of skillProfiles\"><img class=\"animated fadeIn\" [src]=\"transformImage(skillProfile.picture, 50, 50, 'fill')\"></a>\n\t\t</div>\n\t\t<a [routerLink]=\"['/meet']\"><button class=\"freigb mar-t-15\">Meet more of them</button></a>\n\t</div>\n\n\t<div class=\"whp-project-need whp-project-skill\" *ngIf=\"currentProjects\">\n\t\t<h2 class=\"freigl\">Discover projects that need people<br />skilled in <span class=\"whpp-skill animated fadeIn\">{{ currentSkill }}</span></h2>\n\t\t<div class=\"whpp-pictures whpp-pictures-mobile flex\">\n\t\t\t<a [routerLink]=\"['/']\" *ngFor=\"let currentProject of currentProjects.slice(0, 5)\"><img class=\"animated fadeIn\" [src]=\"transformImage(currentProject.picture, 50, 50, 'fill')\"></a>\n\t\t</div>\n\t\t<a [routerLink]=\"['/discover']\"><button class=\"freigb mar-t-15\">Discover more of them</button></a>\n\t</div>\n</section>\n"

/***/ }),

/***/ "./src/app/Components/home/home-post/home-post.component.scss":
/***/ (function(module, exports) {

module.exports = ".wh-post {\n  width: 100%;\n  text-align: center;\n  margin: 0 auto;\n  padding: 30px 0px; }\n  .wh-post .whp-project {\n    padding: 40px 30px 70px 30px;\n    background: #fafafa; }\n  .wh-post .whp-project h2 {\n      font-size: 24px;\n      color: #5b5b5b;\n      line-height: 36px;\n      margin-bottom: 20px; }\n  .wh-post .whp-project button {\n      padding: 6px 50px 8px 50px;\n      border-radius: 25px; }\n  .wh-post .whp-project button:hover {\n      background-color: #e54545; }\n  .wh-post .whp-project-need {\n    padding: 50px 30px; }\n  .wh-post .whp-project-need h2 {\n      font-size: 26px;\n      color: #2b2b2b;\n      margin-bottom: 25px; }\n  .wh-post .whp-project-need h2 .whpp-skill {\n        color: #354f8e;\n        border-bottom: 1px solid #354f8e; }\n  .wh-post .whp-project-need .whpp-pictures {\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center; }\n  .wh-post .whp-project-need .whpp-pictures a {\n        margin: 0 5px; }\n  .wh-post .whp-project-need .whpp-pictures img {\n        width: 40px;\n        height: 40px;\n        border-radius: 4px; }\n  .wh-post .whp-project-need button {\n      color: #2b2b2b;\n      background-color: transparent;\n      border: 1px solid #2b2b2b;\n      border-radius: 5px; }\n  .wh-post .whp-project-need button:hover {\n      background-color: black;\n      color: white; }\n  /******************** MOBILE ****************************/\n  @media only screen and (max-width: 736px) {\n  .wh-post .whp-project {\n    padding: 40px 30px 20px 30px; }\n    .wh-post .whp-project button {\n      padding: 10px 50px 11px 50px; }\n  .wh-post .whp-project-need {\n    padding: 40px 15px; }\n    .wh-post .whp-project-need h2 {\n      font-size: 24px; }\n    .wh-post .whp-project-need .whpp-pictures-mobile {\n      margin-bottom: 20px; }\n      .wh-post .whp-project-need .whpp-pictures-mobile a {\n        margin: 0 10px; }\n      .wh-post .whp-project-need .whpp-pictures-mobile img {\n        width: 50px;\n        height: 50px;\n        border-radius: 4px; }\n    .wh-post .whp-project-need .profile img {\n      border-radius: 50%; }\n    .wh-post .whp-project-need button {\n      padding: 8px 20px 9px 20px; }\n  .wh-post .whp-people-skill {\n    border-bottom: 1px solid #e5e5e5; } }\n"

/***/ }),

/***/ "./src/app/Components/home/home-post/home-post.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePostComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_Projects_projects_service__ = __webpack_require__("./src/app/Services/Projects/projects.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_Pictures_pictures_service__ = __webpack_require__("./src/app/Services/Pictures/pictures.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_shared_service__ = __webpack_require__("./src/app/Services/shared.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_Profiles_profiles_service__ = __webpack_require__("./src/app/Services/Profiles/profiles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Interfaces_Constants_search_profile_constant__ = __webpack_require__("./src/app/Interfaces/Constants/search-profile.constant.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Interfaces_Constants_search_project_constant__ = __webpack_require__("./src/app/Interfaces/Constants/search-project.constant.ts");
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






var HomePostComponent = /** @class */ (function () {
    function HomePostComponent(ProjectsService, PicturesService, ProfilesService, SharedService) {
        this.ProjectsService = ProjectsService;
        this.PicturesService = PicturesService;
        this.ProfilesService = ProfilesService;
        this.SharedService = SharedService;
        this.skillProjects = [];
        this.skillProfiles = [];
        this.skillTrending = __WEBPACK_IMPORTED_MODULE_6__Interfaces_Constants_search_project_constant__["d" /* skillTrending */];
        this.count = 0;
    }
    /* NG */
    HomePostComponent.prototype.ngOnInit = function () {
        this.searchProjectBody = __WEBPACK_IMPORTED_MODULE_6__Interfaces_Constants_search_project_constant__["a" /* searchProject */];
        this.searchProfileBody = __WEBPACK_IMPORTED_MODULE_5__Interfaces_Constants_search_profile_constant__["a" /* searchProfile */];
        this.currentSkill = __WEBPACK_IMPORTED_MODULE_6__Interfaces_Constants_search_project_constant__["d" /* skillTrending */][0];
        this.trendingProjectsBasedOnSkill();
        this.trendingProfilesBasedOnSkillMobile();
    };
    HomePostComponent.prototype.ngOnDestroy = function () {
        if (this.interval1)
            clearInterval(this.interval1);
    };
    /* SEARCH FUNCTION */
    HomePostComponent.prototype.searchSkilledProjects = function (skill) {
        var _this = this;
        var array = [];
        array.push(skill);
        this.searchProjectBody.query.members[3].value = array;
        this.searchProjectBody.paginate.limit = 14;
        this.ProjectsService.searchProject(this.searchProjectBody).subscribe(function (res) {
            _this.skillProjects.push(res.projects);
            if (!_this.skillProjects[1])
                _this.currentProjects = _this.skillProjects[0];
        });
    };
    HomePostComponent.prototype.searchSkilledPeople = function (skill) {
        var _this = this;
        if (this.mobile) {
            var array = [];
            array.push(skill);
            this.searchProfileBody.query.members[0].value = array;
            this.searchProfileBody.paginate.limit = 5;
            this.ProfilesService.searchProfiles(this.searchProfileBody).subscribe(function (res) {
                _this.skillProfiles = res.profiles;
                if (!_this.skillProfiles[1])
                    _this.currentProfiles = _this.skillProfiles[0];
            });
        }
    };
    /* TRENDING INTERVAL */
    HomePostComponent.prototype.trendingProfilesBasedOnSkillMobile = function () {
        var _this = this;
        if (this.mobile) {
            var length = this.skillTrending.length;
            for (var i = 0; i < length; i++) {
                this.searchSkilledPeople(this.skillTrending[i]);
            }
            this.intervalMobile = setInterval(function () {
                _this.count += 1;
                if (_this.count >= _this.skillTrending.length)
                    _this.count = 0;
                _this.currentProfiles = _this.skillProfiles[_this.count];
                _this.currentSkill = _this.skillTrending[_this.count];
            }, 5000);
        }
    };
    HomePostComponent.prototype.trendingProjectsBasedOnSkill = function () {
        var _this = this;
        var length = this.skillTrending.length;
        for (var i = 0; i < length; i++) {
            this.searchSkilledProjects(this.skillTrending[i]);
        }
        this.interval1 = setInterval(function () {
            _this.count += 1;
            if (_this.count >= _this.skillTrending.length)
                _this.count = 0;
            _this.currentProjects = _this.skillProjects[_this.count];
            _this.currentSkill = _this.skillTrending[_this.count];
        }, 5000);
    };
    /* TRANSFORM */
    HomePostComponent.prototype.transformUrl = function (url) {
        url = url.replace(/ /g, '-');
        return url;
    };
    HomePostComponent.prototype.transformImage = function (url, width, height, crop) {
        return this.PicturesService.transformImage(url, width, height, crop);
    };
    HomePostComponent.prototype.scrollTop = function () {
        window.scrollTo(0, 0);
        this.SharedService.postActiveSignal(true);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], HomePostComponent.prototype, "mobile", void 0);
    HomePostComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home-post',
            template: __webpack_require__("./src/app/Components/home/home-post/home-post.component.html"),
            styles: [__webpack_require__("./src/app/Components/home/home-post/home-post.component.scss")],
            providers: [__WEBPACK_IMPORTED_MODULE_1__Services_Projects_projects_service__["a" /* ProjectsService */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_Projects_projects_service__["a" /* ProjectsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_Projects_projects_service__["a" /* ProjectsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__Services_Pictures_pictures_service__["a" /* PicturesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_Pictures_pictures_service__["a" /* PicturesService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__Services_Profiles_profiles_service__["a" /* ProfilesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_Profiles_profiles_service__["a" /* ProfilesService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__Services_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_shared_service__["a" /* SharedService */]) === "function" && _d || Object])
    ], HomePostComponent);
    return HomePostComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=home-post.component.js.map

/***/ }),

/***/ "./src/app/Components/home/home-projects/home-projects.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"background-white\">\n\t<section class=\"wh-projects-around bb\" *ngIf=\"newProjects\">\n\t\t<h2 class=\"freigl\">new <span>projects</span></h2>\n\t\t<p class=\"freigb\">The latest products, ideas and companies posted by our community</p>\n\n\t\t<div class=\"project-cards\" *ngIf=\"!mobile && newProjects\">\n\t\t\t<div class=\"project-card\" *ngFor=\"let project of newProjects; let i = index\">\n\t\t\t\t<a [routerLink]=\"['/discover']\" [queryParams]=\"{ 'category': project.category_name }\" class=\"card-tag\">\n\t\t\t\t\t<div class=\"card-tag-content\">\n\t\t\t\t\t\t<div class=\"card-tag-bg\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<img src=\"public/images/tag-icon.png\">\n\t\t\t\t\t\t<h5>{{ project.category_name }}</h5>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\n\t\t\t\t<!-- <div class=\"card-vote\" (click)=\"followProject(project.id, i)\">\n\t\t\t\t\t<div class=\"card-vote-bg\"></div>\n\t\t\t\t\t<img *ngIf=\"!project.follow\" src=\"public/images/Upvote_Icon_w.svg\">\n\t\t\t\t\t<img *ngIf=\"project.follow\" src=\"public/images/Upvote_Icon.svg\">\n\t\t\t\t\t<span>{{ project.followers }}</span>\n\t\t\t\t</div> -->\n\t\t\t\t<a [routerLink]=\"['/project', project.public_id, transformUrl(project.title)]\" class=\"card-project-page\">\n\t\t\t\t\t<div class=\"card-picture\" [style.background-image]=\"'url(' + transformImage(project.picture, 300, 180, 'fill') + ')'\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-info\">\n\t\t\t\t\t\t<div class=\"card-title-space\">\n\t\t\t\t\t\t\t<h4>{{ project.title }}</h4>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-status\">\n\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Company'\" src=\"public/images/live-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Idea'\" src=\"public/images/idea-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Prototype'\" src=\"public/images/drafted-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Beta product'\" src=\"public/images/beta-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t{{ project.status }}\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-location\">\n\t\t\t\t\t\t\t<span *ngIf=\"project.state\"><img src=\"public/images/location-picto.svg\" alt=\"location-picture\" />{{ project.city }}, {{ project.state }}</span>\n\t\t\t\t\t\t\t<span *ngIf=\"!project.state\"><img src=\"public/images/location-picto.svg\" alt=\"location-picture\" />{{ project.city }}, {{ project.country }}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-description-text\">\n\t\t\t\t\t\t\t<p>{{ project.description | cut:true:70:' ...' }}</p>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class=\"card-need flex\">\n\t\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530708/Witty-icon/Project%20Needs/Collaboration_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'for help'\">\n\t\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530708/Witty-icon/Project%20Needs/Feedback_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'for feedback'\">\n\t\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Hiring_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'to hire someone'\">\n\t\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Internship_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'to hire an intern'\">\n\t\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530708/Witty-icon/Project%20Needs/Cofounder_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'for a cofounder'\">\n\t\t\t\t\t\t\t<p class=\"freigb flex\">{{ transformNeedStatus(project.openingStat) }}<span *ngIf=\"project.numberOpenings > 1\">, +{{ project.numberOpenings - 1 }}</span></p>\n\t\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'for help'\">{{ project.title }} is looking for help</div>\n\t\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'for feedback'\">{{ project.title }} is looking for feedback</div>\n\t\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'to hire someone'\">{{ project.title }} is currently hiring</div>\n\t\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'to hire an intern'\">{{ project.title }}  is currently hiring interns</div>\n\t\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'for a cofounder'\">{{ project.title }} is looking for a cofounder</div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class=\"card-info-by\" *ngIf=\"project.username != 'Quentin Verriere' && project.username != 'Olivier Hamelin'\">\n\t\t\t\t\t\t\t<figure class=\"card-info-by-picture\">\n\t\t\t\t\t\t\t\t<img [src]=\"transformImage(project.profile_picture, 30, 30, 'fill')\" alt=\"card-foot-picture\">\n\t\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t\t<h6>{{ project.username }} <span class=\"inline\" *ngIf=\"project.members\">& {{ project.members }} more</span></h6>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<ngx-siema [options]=\"options\" *ngIf=\"mobile\">\n\t\t\t<ngx-siema-slide class=\"project-card\" *ngFor=\"let project of newProjects; let i = index\">\n\t\t\t\t<div class=\"card-tag\">\n\t\t\t\t\t<div class=\"card-tag-content\">\n\t\t\t\t\t\t<div class=\"card-tag-bg\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<img src=\"public/images/tag-icon.png\">\n\t\t\t\t\t\t<h5>{{ project.category_name }}</h5>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<!-- <div class=\"card-vote\" (click)=\"followProject(project.id, i)\">\n\t\t\t\t\t<div class=\"card-vote-bg\"></div>\n\t\t\t\t\t<img *ngIf=\"!project.follow\" src=\"public/images/Upvote_Icon_w.svg\">\n\t\t\t\t\t<img *ngIf=\"project.follow\" src=\"public/images/Upvote_Icon.svg\">\n\t\t\t\t\t<span>{{ project.followers }}</span>\n\t\t\t\t</div> -->\n\t\t\t\t<a [routerLink]=\"['/project', project.public_id, transformUrl(project.title)]\" class=\"card-project-page\">\n\t\t\t\t\t<div class=\"card-picture\" [style.background-image]=\"'url(' + transformImage(project.picture, 300, 180, 'fill') + ')'\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-info\">\n\t\t\t\t\t\t<div class=\"card-title-space\">\n\t\t\t\t\t\t\t<h4>{{ project.title }}</h4>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-status\">\n\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Company'\" src=\"public/images/live-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Idea'\" src=\"public/images/idea-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Prototype'\" src=\"public/images/drafted-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Beta product'\" src=\"public/images/beta-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t{{ project.status }}\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-location\">\n\t\t\t\t\t\t\t<span *ngIf=\"project.state\"><img src=\"public/images/location-picto.svg\" alt=\"location-picture\" />{{ project.city }}, {{ project.state }}</span>\n\t\t\t\t\t\t\t<span *ngIf=\"!project.state\"><img src=\"public/images/location-picto.svg\" alt=\"location-picture\" />{{ project.city }}, {{ project.country }}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-description-text\">\n\t\t\t\t\t\t\t<p>{{ project.description }}</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-info-by\" *ngIf=\"project.username != 'Quentin Verriere' && project.username != 'Olivier Hamelin'\">\n\t\t\t\t\t\t\t<figure class=\"card-info-by-picture\">\n\t\t\t\t\t\t\t\t<img [src]=\"transformImage(project.profile_picture, 30, 30, 'fill')\" alt=\"card-foot-picture\">\n\t\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t\t<h6>{{ project.username }} <span class=\"inline\" *ngIf=\"project.members\">& {{ project.members }} more</span></h6>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t</ngx-siema-slide>\n\t\t</ngx-siema>\n\n\t\t<a routerLink=\"/discover\"><button class=\"freigl\">Explore more projects that need you</button></a>\n\t</section>\n\n\n\t<section class=\"wh-opportunity-projects bb\" *ngIf=\"oppProjects\">\n\t\t<h2 class=\"freigl\"><span>handpicked</span> for <span>you</span></h2>\n\t\t<p class=\"freigb\">Here are some ideas and companies looking to collaborate with people like you</p>\n\n\t\t<div class=\"project-cards\" *ngIf=\"!mobile && oppProjects\">\n\t\t\t<div class=\"project-card\" *ngFor=\"let project of oppProjects; let i = index\">\n\t\t\t\t<a [routerLink]=\"['/discover']\" [queryParams]=\"{ 'category': project.category_name }\" class=\"card-tag\">\n\t\t\t\t\t<div class=\"card-tag-content\">\n\t\t\t\t\t\t<div class=\"card-tag-bg\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<img src=\"public/images/tag-icon.png\">\n\t\t\t\t\t\t<h5>{{ project.category_name }}</h5>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\n\t\t\t\t<!-- <div class=\"card-vote\" (click)=\"followProject(project.id, i)\">\n\t\t\t\t\t<div class=\"card-vote-bg\"></div>\n\t\t\t\t\t<img *ngIf=\"!project.follow\" src=\"public/images/Upvote_Icon_w.svg\">\n\t\t\t\t\t<img *ngIf=\"project.follow\" src=\"public/images/Upvote_Icon.svg\">\n\t\t\t\t\t<span>{{ project.followers }}</span>\n\t\t\t\t</div> -->\n\t\t\t\t<a [routerLink]=\"['/project', project.public_id, transformUrl(project.title)]\" class=\"card-project-page\">\n\t\t\t\t\t<div class=\"card-picture\" [style.background-image]=\"'url(' + transformImage(project.picture, 300, 180, 'fill') + ')'\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-info\">\n\t\t\t\t\t\t<div class=\"card-title-space\">\n\t\t\t\t\t\t\t<h4>{{ project.title }}</h4>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-status\">\n\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Company'\" src=\"public/images/live-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Idea'\" src=\"public/images/idea-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Prototype'\" src=\"public/images/drafted-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Beta product'\" src=\"public/images/beta-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t{{ project.status }}\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-location\">\n\t\t\t\t\t\t\t<span *ngIf=\"project.state\"><img src=\"public/images/location-picto.svg\" alt=\"location-picture\" />{{ project.city }}, {{ project.state }}</span>\n\t\t\t\t\t\t\t<span *ngIf=\"!project.state\"><img src=\"public/images/location-picto.svg\" alt=\"location-picture\" />{{ project.city }}, {{ project.country }}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-description-text\">\n\t\t\t\t\t\t\t<p>{{ project.description | cut:true:70:' ...' }}</p>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class=\"card-need flex\">\n\t\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530708/Witty-icon/Project%20Needs/Collaboration_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'for help'\">\n\t\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530708/Witty-icon/Project%20Needs/Feedback_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'for feedback'\">\n\t\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Hiring_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'to hire someone'\">\n\t\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530768/Witty-icon/User%20Status/Internship_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'to hire an intern'\">\n\t\t\t\t\t\t\t<img src=\"https://res.cloudinary.com/dqpkpmrgk/image/upload/v1508530708/Witty-icon/Project%20Needs/Cofounder_Icon05-01.svg\" alt=\"status-logo\" *ngIf=\"project.openingStat === 'for a cofounder'\">\n\t\t\t\t\t\t\t<p class=\"freigb\">{{ transformNeedStatus(project.openingStat) }}</p>\n\t\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'for help'\">{{ project.title }} is looking for help</div>\n\t\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'for feedback'\">{{ project.title }} is looking for feedback</div>\n\t\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'to hire someone'\">{{ project.title }} is currently hiring</div>\n\t\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'to hire an intern'\">{{ project.title }}  is currently hiring interns</div>\n\t\t\t\t\t\t\t<div class=\"tooltipw\" *ngIf=\"project.openingStat === 'for a cofounder'\">{{ project.title }} is looking for a cofounder</div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class=\"card-info-by\" *ngIf=\"project.username != 'Quentin Verriere' && project.username != 'Olivier Hamelin'\">\n\t\t\t\t\t\t\t<figure class=\"card-info-by-picture\">\n\t\t\t\t\t\t\t\t<img [src]=\"transformImage(project.profile_picture, 30, 30, 'fill')\" alt=\"card-foot-picture\">\n\t\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t\t<h6>{{ project.username }} <span class=\"inline\" *ngIf=\"project.members\">& {{ project.members }} more</span></h6>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<ngx-siema [options]=\"options2\" *ngIf=\"mobile\">\n\t\t\t<ngx-siema-slide class=\"project-card\" *ngFor=\"let project of oppProjects; let i = index\">\n\t\t\t\t<div class=\"card-tag\">\n\t\t\t\t\t<div class=\"card-tag-content\">\n\t\t\t\t\t\t<div class=\"card-tag-bg\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<img src=\"public/images/tag-icon.png\">\n\t\t\t\t\t\t<h5>{{ project.category_name }}</h5>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<!-- <div class=\"card-vote\" (click)=\"followProject(project.id, i)\">\n\t\t\t\t\t<div class=\"card-vote-bg\"></div>\n\t\t\t\t\t<img *ngIf=\"!project.follow\" src=\"public/images/Upvote_Icon_w.svg\">\n\t\t\t\t\t<img *ngIf=\"project.follow\" src=\"public/images/Upvote_Icon.svg\">\n\t\t\t\t\t<span>{{ project.followers }}</span>\n\t\t\t\t</div> -->\n\t\t\t\t<a [routerLink]=\"['/project', project.public_id, transformUrl(project.title)]\" class=\"card-project-page\">\n\t\t\t\t\t<div class=\"card-picture\" [style.background-image]=\"'url(' + transformImage(project.picture, 300, 180, 'fill') + ')'\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-info\">\n\t\t\t\t\t\t<div class=\"card-title-space\">\n\t\t\t\t\t\t\t<h4>{{ project.title }}</h4>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-status\">\n\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Company'\" src=\"public/images/live-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Idea'\" src=\"public/images/idea-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Prototype'\" src=\"public/images/drafted-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t<img *ngIf=\"project.status == 'Beta product'\" src=\"public/images/beta-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t{{ project.status }}\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-location\">\n\t\t\t\t\t\t\t<span *ngIf=\"project.state\"><img src=\"public/images/location-picto.svg\" alt=\"location-picture\" />{{ project.city }}, {{ project.state }}</span>\n\t\t\t\t\t\t\t<span *ngIf=\"!project.state\"><img src=\"public/images/location-picto.svg\" alt=\"location-picture\" />{{ project.city }}, {{ project.country }}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-description-text\">\n\t\t\t\t\t\t\t<p>{{ project.description }}</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-info-by\" *ngIf=\"project.username != 'Quentin Verriere' && project.username != 'Olivier Hamelin'\">\n\t\t\t\t\t\t\t<figure class=\"card-info-by-picture\">\n\t\t\t\t\t\t\t\t<img [src]=\"transformImage(project.profile_picture, 30, 30, 'fill')\" alt=\"card-foot-picture\">\n\t\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t\t<h6>{{ project.username }} <span class=\"inline\" *ngIf=\"project.members\">& {{ project.members }} more</span></h6>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t</ngx-siema-slide>\n\t\t</ngx-siema>\n\n\t\t<a routerLink=\"/discover\"><button class=\"freigl\">Explore more opportunities</button></a>\n\t</section>\n</section>\n"

/***/ }),

/***/ "./src/app/Components/home/home-projects/home-projects.component.scss":
/***/ (function(module, exports) {

module.exports = ".wh-projects-around {\n  padding: 40px 10px 60px 10px; }\n\n.wh-opportunity-projects {\n  padding: 40px 10px 100px 10px; }\n\n/******************** MOBILE ****************************/\n\n@media only screen and (max-width: 736px) {\n  .wh-projects-around {\n    width: 100%;\n    padding: 50px 10px 50px 10px; }\n    .wh-projects-around .project-card {\n      margin: 0 0 40px 0; }\n  .wh-opportunity-projects {\n    width: 100%;\n    padding: 50px 10px 80px 10px; }\n    .wh-opportunity-projects .project-card {\n      margin: 0 0 40px 0; } }\n"

/***/ }),

/***/ "./src/app/Components/home/home-projects/home-projects.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeProjectsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__("./node_modules/ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_popover_login_popover_login_component__ = __webpack_require__("./src/app/Components/modals/popover-login/popover-login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_Projects_projects_service__ = __webpack_require__("./src/app/Services/Projects/projects.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_Profiles_profiles_service__ = __webpack_require__("./src/app/Services/Profiles/profiles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Services_Pictures_pictures_service__ = __webpack_require__("./src/app/Services/Pictures/pictures.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Services_Suggestions_suggestion_service__ = __webpack_require__("./src/app/Services/Suggestions/suggestion.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Services_Backoffice_backoffice_service__ = __webpack_require__("./src/app/Services/Backoffice/backoffice.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Interfaces_Constants_search_project_constant__ = __webpack_require__("./src/app/Interfaces/Constants/search-project.constant.ts");
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







var HomeProjectsComponent = /** @class */ (function () {
    function HomeProjectsComponent(ProjectsService, TokenService, PicturesService, dialogService, SuggestionService, ProfilesService, BackofficeService) {
        this.ProjectsService = ProjectsService;
        this.TokenService = TokenService;
        this.PicturesService = PicturesService;
        this.dialogService = dialogService;
        this.SuggestionService = SuggestionService;
        this.ProfilesService = ProfilesService;
        this.BackofficeService = BackofficeService;
        this.body_project2 = __WEBPACK_IMPORTED_MODULE_9__Interfaces_Constants_search_project_constant__["b" /* searchProject2 */];
        this.profileAbout = ['for a full time position', 'for an internship', "to share what I'm working on", 'for part time collaboration', 'to meet smart people'];
        this.projectStatus = ['to hire someone', 'to hire an intern', 'for feedback', 'for a cofounder', 'for help'];
        this.options = {
            selector: '.siema',
            duration: 200,
            easing: 'ease-out',
            perPage: 1,
            startIndex: 0,
            draggable: true,
            threshold: 20,
            loop: false,
            onInit: function () {
                // runs immediately after first initialization
            },
            onChange: function () {
                // runs after slide change
            },
        };
        this.options2 = {
            selector: '.siema',
            duration: 200,
            easing: 'ease-out',
            perPage: 1,
            startIndex: 0,
            draggable: true,
            threshold: 20,
            loop: false,
            onInit: function () {
                // runs immediately after first initialization
            },
            onChange: function () {
                // runs after slide change
            },
        };
        // this.initSearchProject();
    }
    HomeProjectsComponent.prototype.ngOnInit = function () {
        this.getNewProjects();
        this.getOpportunityProjects();
    };
    HomeProjectsComponent.prototype.getProjects = function () {
        var _this = this;
        this.ProjectsService.searchProject(this.body_project2).subscribe(function (res) {
            _this.oppProjects = res.projects.sort(function () { return .5 - Math.random(); }).slice(0, 3);
        });
    };
    HomeProjectsComponent.prototype.getNewProjects = function () {
        var _this = this;
        this.BackofficeService.getSelectedProjectsProfiles('new_projects').subscribe(function (res) {
            _this.newProjects = res.results;
        });
    };
    HomeProjectsComponent.prototype.getOpportunityProjects = function () {
        var skills = this.profile['skills'].split(',').slice(0, 2);
        var about = this.projectStatus[this.profileAbout.indexOf(this.profile['about'])];
        this.body_project2['query']['members'][4].value = this.location;
        this.body_project2['query']['members'][0]['value'] = about;
        this.body_project2['query']['members'][3]['value'] = skills || [""];
        this.getProjects();
    };
    // followProject(id, index) {
    // 	if (!this.TokenService.getToken())
    // 		return this.showLoginPopOver();
    // 	this.ProjectsService.followProject(id, {}).subscribe( res => {
    // 		this.projects[index]['follow'] = res.success
    // 		if (res.success)
    // 			this.projects[index]['followers'] += 1
    // 		else
    // 			this.projects[index]['followers'] -= 1
    // 	});
    // }
    HomeProjectsComponent.prototype.transformNeedStatus = function (status) {
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
    /* SHOW MODAL */
    HomeProjectsComponent.prototype.showLoginPopOver = function () {
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_2__modals_popover_login_popover_login_component__["a" /* PopoverLoginComponent */], {});
    };
    /* TRANSFORM */
    HomeProjectsComponent.prototype.transformUrl = function (url) {
        url = url.replace(/ /g, '-');
        return url;
    };
    HomeProjectsComponent.prototype.transformImage = function (url, width, height, crop) {
        return this.PicturesService.transformImage(url, width, height, crop);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], HomeProjectsComponent.prototype, "mobile", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], HomeProjectsComponent.prototype, "profile", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], HomeProjectsComponent.prototype, "location", void 0);
    HomeProjectsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home-projects',
            template: __webpack_require__("./src/app/Components/home/home-projects/home-projects.component.html"),
            styles: [__webpack_require__("./src/app/Components/home/home-static/home-static.component.scss"), __webpack_require__("./src/app/Components/home/home-projects/home-projects.component.scss"), __webpack_require__("./src/public/styles/project-card.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__Services_Projects_projects_service__["a" /* ProjectsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_Projects_projects_service__["a" /* ProjectsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__Services_Authentication_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_Authentication_token_service__["a" /* TokenService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__Services_Pictures_pictures_service__["a" /* PicturesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__Services_Pictures_pictures_service__["a" /* PicturesService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_7__Services_Suggestions_suggestion_service__["a" /* SuggestionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__Services_Suggestions_suggestion_service__["a" /* SuggestionService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__Services_Profiles_profiles_service__["a" /* ProfilesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_Profiles_profiles_service__["a" /* ProfilesService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_8__Services_Backoffice_backoffice_service__["a" /* BackofficeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__Services_Backoffice_backoffice_service__["a" /* BackofficeService */]) === "function" && _g || Object])
    ], HomeProjectsComponent);
    return HomeProjectsComponent;
    var _a, _b, _c, _d, _e, _f, _g;
}());

//# sourceMappingURL=home-projects.component.js.map

/***/ }),

/***/ "./src/app/Components/home/home-static/home-static.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"wh-home-statistic bb\" *ngIf=\"profile\">\n\t<div class=\"whhs-container flex\">\n\t\t<div class=\"whhs-1\">\n\t\t\t<h1 class=\"freigl\">Hello <span>{{ profile.first_name }}</span> <span class=\"fat-baby\">🎉</span></h1>\n\t\t\t<a class=\"freigl\" [routerLink]=\"['/', profile.username]\">Visit your profile >></a>\n\t\t</div>\n\t\t<div class=\"whhs-2\">\n\t\t\t<h1 class=\"freigl\"><span>#{{ profile.rank }}</span></h1>\n\t\t\t<p class=\"freigb\">Your current ranking</p>\n\t\t\t<a class=\"freigl\" href=\"/statistics\">Improve your ranking >></a>\n\t\t</div>\n\t</div>\n</section>\n\n<app-home-projects *ngIf=\"location\" [mobile]=\"mobile\" [profile]=\"profile\" [location]=\"location\"></app-home-projects>\n<app-home-invitation [mobile]=\"mobile\"></app-home-invitation>\n<app-home-around *ngIf=\"location\" [mobile]=\"mobile\" [profile]=\"profile\" [location]=\"location\"></app-home-around>\n\n<section class=\"background-2\">\n\t<section class=\"wh-how bb\">\n\t\t<h2 class=\"whh-title freigl\">how it works</h2>\n\t\t<div class=\"whh-block flex\">\n\t\t\t<div class=\"whhb-1\">\n\t\t\t\t<h2 class=\"freigl\"><span>post</span> your project 🤘</h2>\n\t\t\t\t<p class=\"freigb\">No matter if you have an idea on a post-it, or are working on a growing startup, you will always need skilled people to work with you. Post your project on Witty and they'll find you.</p>\n\t\t\t</div>\n\t\t\t<div class=\"whhb-2\">\n\t\t\t\t<h2 class=\"freigl\">connect with <span>brilliant</span> people ☝️</h2>\n\t\t\t\t<p class=\"freigb\">Witty is a network of thousands of skilled people looking for their next opportunity. It might be what youre working on. We take no fee, we just connect you for free.</p>\n\t\t\t</div>\n\t\t\t<div class=\"whhb-3\">\n\t\t\t\t<h2 class=\"freigl\">decide what's <span>next</span> 👌</h2>\n\t\t\t\t<p class=\"freigb\">What you do next is none of our business. People find here their cofounders, interns, employees, users, customers and of course, their early fans.</p>\n\t\t\t</div>\n\t\t</div>\n\t</section>\n</section>\n\n<section class=\"wh-join bg-default bb\">\n\t<div class=\"filter\"></div>\n\t<div class=\"whj-container align-center\">\n\t\t<h2 class=\"freigs\">#Staywithus</h2>\n\t\t<div class=\"fb-follow\" data-href=\"https://www.facebook.com/wittycircle\" data-layout=\"button\" data-size=\"large\" data-show-faces=\"true\"></div>\n\n\t\t<a id=\"tw-follow\" class=\"twitter-follow-button\" href=\"https://twitter.com/wittycircle\" data-show-count=\"false\" data-size=\"large\"> Follow @wittycircle</a>\n\t</div>\n</section>\n\n<div id=\"fb-root\"></div>\n<script>(function(d, s, id) {\n  var js, fjs = d.getElementsByTagName(s)[0];\n  if (d.getElementById(id)) return;\n  js = d.createElement(s); js.id = id;\n  js.src = \"//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=487284094736758\";\n  fjs.parentNode.insertBefore(js, fjs);\n}(document, 'script', 'facebook-jssdk'));</script>\n"

/***/ }),

/***/ "./src/app/Components/home/home-static/home-static.component.scss":
/***/ (function(module, exports) {

module.exports = ".background-white {\n  background-color: #fff; }\n\n.background-2 {\n  padding-top: 25px;\n  padding-bottom: 50px;\n  margin-top: 40px;\n  background-color: #fafafa; }\n\n.wh-profiles-around, .wh-projects-around, .wh-profiles-suggest, .wh-opportunity-projects, .whig-container, .wh-how {\n  width: 1000px;\n  margin: 0 auto;\n  text-align: center; }\n\n.wh-profiles-around h2, .wh-projects-around h2, .wh-profiles-suggest h2, .wh-opportunity-projects h2, .whig-container h2, .wh-how h2 {\n    font-size: 26px;\n    color: #2b2b2b;\n    line-height: 36px; }\n\n.wh-profiles-around h2 span, .wh-projects-around h2 span, .wh-profiles-suggest h2 span, .wh-opportunity-projects h2 span, .whig-container h2 span, .wh-how h2 span {\n      font-family: 'freigSem';\n      color: #333; }\n\n.wh-profiles-around p, .wh-projects-around p, .wh-profiles-suggest p, .wh-opportunity-projects p, .whig-container p, .wh-how p {\n    color: #999;\n    margin-bottom: 20px; }\n\n.wh-profiles-around button, .wh-projects-around button, .wh-profiles-suggest button, .wh-opportunity-projects button, .whig-container button, .wh-how button {\n    padding: 10px 15px;\n    font-family: 'freigMed';\n    font-size: 16px;\n    position: relative;\n    bottom: 1px;\n    background-color: #497faa; }\n\n.wh-profiles-around button:hover, .wh-projects-around button:hover, .wh-profiles-suggest button:hover, .wh-opportunity-projects button:hover, .whig-container button:hover, .wh-how button:hover {\n    background-color: #3d6a8f; }\n\n.wh-home-statistic {\n  background-color: #fff;\n  padding: 10px 0;\n  text-align: center;\n  border-bottom: 1px solid #e5e5e5; }\n\n.wh-home-statistic h1 {\n    font-size: 21px;\n    color: #333; }\n\n.wh-home-statistic h1 span {\n      font-family: 'freigSem';\n      color: #333; }\n\n.wh-home-statistic h1 .fat-baby {\n      font-size: 16px; }\n\n.wh-home-statistic .whhs-container {\n    width: 1000px;\n    margin: 0 auto;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end; }\n\n.wh-home-statistic .whhs-container p {\n      color: #999; }\n\n.wh-home-statistic .whhs-container a {\n      font-family: 14px;\n      color: #4577a1; }\n\n.wh-home-statistic .whhs-container .whhs-1, .wh-home-statistic .whhs-container .whhs-2 {\n      padding: 0 15px; }\n\n.wh-home-statistic .whhs-container .whhs-1 h1 {\n      margin-bottom: 15px; }\n\n.wh-how {\n  margin: 30px auto 10px auto; }\n\n.wh-how .whh-title {\n    margin-bottom: 20px; }\n\n.wh-how .whh-block {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n\n.wh-how .whhb-1, .wh-how .whhb-2, .wh-how .whhb-3 {\n    padding: 0 5px;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box; }\n\n.wh-how .whhb-1 h2, .wh-how .whhb-2 h2, .wh-how .whhb-3 h2 {\n      margin-bottom: 10px; }\n\n.wh-how .whhb-1 p, .wh-how .whhb-2 p, .wh-how .whhb-3 p {\n      color: #999;\n      font-size: 16px;\n      margin-bottom: 30px;\n      width: 300px; }\n\n.wh-join {\n  position: relative;\n  width: 100%;\n  height: 200px;\n  background-color: #999;\n  background-image: url(\"/public/images/backgrounds/bg-landing-signup.jpg\"); }\n\n.wh-join .filter {\n    background: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0.7)));\n    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)); }\n\n.wh-join .whj-container {\n    width: inherit;\n    text-align: center;\n    -webkit-box-align: baseline;\n        -ms-flex-align: baseline;\n            align-items: baseline; }\n\n.wh-join .whj-container h2 {\n      font-size: 32px;\n      margin-bottom: 10px; }\n\n.wh-join .whj-container .fb-follow {\n      display: block;\n      margin-bottom: 10px; }\n\n/******************** MOBILE ****************************/\n\n@media only screen and (max-width: 736px) {\n  .wh-home-statistic .whhs-container {\n    width: 100%; }\n  .wh-how {\n    width: 100vw;\n    padding: 0 10px;\n    margin-top: 0; }\n    .wh-how h2 {\n      font-size: 21px; }\n    .wh-how .whh-block {\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap; } }\n"

/***/ }),

/***/ "./src/app/Components/home/home-static/home-static.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeStaticComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_page_scroll__ = __webpack_require__("./node_modules/ng2-page-scroll/ng2-page-scroll.js");
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


/* Libraries */

var HomeStaticComponent = /** @class */ (function () {
    function HomeStaticComponent(document) {
        var _this = this;
        this.document = document;
        setTimeout(function () {
            twttr.widgets.load(_this.document.getElementById("tw-follow"));
        }, 3000);
        __WEBPACK_IMPORTED_MODULE_2_ng2_page_scroll__["b" /* PageScrollConfig */].defaultDuration = 1000;
        __WEBPACK_IMPORTED_MODULE_2_ng2_page_scroll__["b" /* PageScrollConfig */].defaultScrollOffset = 50;
        __WEBPACK_IMPORTED_MODULE_2_ng2_page_scroll__["b" /* PageScrollConfig */].defaultEasingLogic = {
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
    HomeStaticComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], HomeStaticComponent.prototype, "profile", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], HomeStaticComponent.prototype, "location", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], HomeStaticComponent.prototype, "mobile", void 0);
    HomeStaticComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home-static',
            template: __webpack_require__("./src/app/Components/home/home-static/home-static.component.html"),
            styles: [__webpack_require__("./src/app/Components/home/home-static/home-static.component.scss")],
            providers: [__WEBPACK_IMPORTED_MODULE_2_ng2_page_scroll__["d" /* PageScrollService */]]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["DOCUMENT"])),
        __metadata("design:paramtypes", [Object])
    ], HomeStaticComponent);
    return HomeStaticComponent;
}());

//# sourceMappingURL=home-static.component.js.map

/***/ }),

/***/ "./src/app/Components/home/home-trending/home-trending.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"wh-trending flex bb\" *ngIf=\"!mobile\">\n\t<div class=\"wht-trends flex\">\n\t\t<div class=\"wht-categories flex-grow\">\n\t\t\t<ul>\n\t\t\t\t<li class=\"freigl cursor-pt\" *ngFor=\"let category of categories\" (click)=\"searchProjectByCategory(category)\" [ngClass]=\"{'li-active': currentCategory === category.name}\">{{ category.name }}</li>\n\t\t\t</ul>\n\t\t</div>\n\n\t\t<div class=\"wht-projects\">\n\t\t\t<h2 class=\"freigl\">Trending projects</h2>\n\t\t\t<div class=\"project-card\" *ngIf=\"bestProject\">\n\t\t\t\t<div class=\"card-tag\">\n\t\t\t\t\t<div class=\"card-tag-content\">\n\t\t\t\t\t\t<div class=\"card-tag-bg\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<img src=\"public/images/tag-icon.png\">\n\t\t\t\t\t\t<h5>{{ bestProject.category_name }}</h5>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"card-vote\" (click)=\"followProject(bestProject.id, bestProject.follow)\">\n\t\t\t\t\t<div class=\"card-vote-bg\"></div>\n\t\t\t\t\t<img *ngIf=\"!bestProject.follow\" src=\"public/images/Upvote_Icon_w.svg\">\n\t\t\t\t\t<img *ngIf=\"bestProject.follow\" src=\"public/images/Upvote_Icon.svg\">\n\t\t\t\t\t<span>{{ bestProject.followers }}</span>\n\t\t\t\t</div>\n\t\t\t\t<a [routerLink]=\"['/project', bestProject.public_id, transformUrl(bestProject.title)]\" class=\"card-project-page\" >\n\t\t\t\t\t<div class=\"card-picture animated fadeIn\" [style.background-image]=\"'url(' + transformImage(bestProject.picture, 300, 180, 'fill') + ')'\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card-info\">\n\t\t\t\t\t\t<div class=\"card-title-space\">\n\t\t\t\t\t\t\t<h4>{{ bestProject.title }}</h4>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-status\">\n\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t<img *ngIf=\"bestProject.status == 'Company'\" src=\"public/images/live-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t<img *ngIf=\"bestProject.status == 'Idea'\" src=\"public/images/idea-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t<img *ngIf=\"bestProject.status == 'Prototype'\" src=\"public/images/drafted-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t<img *ngIf=\"bestProject.status == 'Beta product'\" src=\"public/images/beta-picto.svg\" alt=\"status-picture\"/>\n\t\t\t\t\t\t\t\t{{ bestProject.status }}\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-location\">\n\t\t\t\t\t\t\t<span *ngIf=\"bestProject.state\"><img src=\"public/images/location-picto.svg\" alt=\"location-picture\" />{{ bestProject.city }}, {{ bestProject.state }}</span>\n\t\t\t\t\t\t\t<span *ngIf=\"!bestProject.state\"><img src=\"public/images/location-picto.svg\" alt=\"location-picture\" />{{ bestProject.city }}, {{ bestProject.country }}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-description-text\">\n\t\t\t\t\t\t\t<p>{{ bestProject.description }}</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"card-info-by\">\n\t\t\t\t\t\t\t<figure class=\"card-info-by-picture\">\n\t\t\t\t\t\t\t\t<img class=\"animated fadeIn\" [src]=\"transformImage(bestProject.profile_picture, 30, 30, 'fill')\" alt=\"card-foot-picture\">\n\t\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t\t<h6>{{ bestProject.username }} <span class=\"inline\" *ngIf=\"bestProject.members\">& {{ bestProject.members }} more</span></h6>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t</div>\n\n\t\t\t<div class=\"whtpa-button\">\n\t\t\t\t<a routerLink=\"/discover\"><button class=\"freigb\">Explore more projects</button></a>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"wht-activities mar-l-15\">\n\t\t\t<h2 class=\"freigl\">Recent activity</h2>\n\t\t\t<div class=\"whta-recent\">\n\t\t\t\t<div class=\"recent-activities flex\">\n\t\t\t\t\t<div class=\"project-discussion\" *ngFor=\"let activity of activities; let i = index\" [@slideLeft]=\"i === 0 && slideState\" >\n\t\t\t\t\t\t<a class=\"flex project-discussion cursor-pt\" *ngIf=\"activity.type === 'project_up'\" [routerLink]=\"['/project', activity.route[1], transformUrl(activity.route[2])]\">\n\t\t\t\t\t\t\t<img class=\"profile-picture mar-r-10\" [src]=\"transformImage(activity.from.picture, 35, 35, 'fill')\" alt=\"activity_photo\"/>\n\t\t\t\t\t\t\t<div class=\"ra-info\">\n\t\t\t\t\t\t\t\t<h4 class=\"freigl\">\n\t\t\t\t\t\t\t\t\t<strong class=\"freigm\">{{ activity.from.full_name }} </strong>{{ activity.message }}<strong class=\"freigm\"> {{activity.to.what}}</strong>\n\t\t\t\t\t\t\t\t</h4>\n\t\t\t\t\t\t\t\t<span class=\"freigm\">{{ activity.when | amTimeAgo }}</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</a>\n\n\t\t\t\t\t\t<a class=\"flex project-discussion cursor-pt\" *ngIf=\"activity.type === 'user_follow'\" [routerLink]=\"['/', activity.route[1]]\">\n\t\t\t\t\t\t\t<img class=\"profile-picture mar-r-10\" [src]=\"transformImage(activity.from.picture, 35, 35, 'fill')\" alt=\"activity_photo\"/>\n\t\t\t\t\t\t\t<div class=\"ra-info\">\n\t\t\t\t\t\t\t\t<h4 class=\"freigl\">\n\t\t\t\t\t\t\t\t\t<strong class=\"freigm\">{{ activity.from.full_name }} </strong>{{ activity.message }}<strong class=\"freigm\"> {{activity.to.what}}</strong>\n\t\t\t\t\t\t\t\t</h4>\n\t\t\t\t\t\t\t\t<span class=\"freigm\">{{ activity.when | amTimeAgo }}</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</a>\n\n\t\t\t\t\t\t<a class=\"flex project-discussion cursor-pt\" *ngIf=\"activity.type === 'discussion_creation'\" [routerLink]=\"['/project', activity.route[1], transformUrl(activity.route[2])]\" [queryParams]=\"{ discussion: 'd' + activity.params }\">\n\t\t\t\t\t\t\t<img class=\"profile-picture mar-r-10\" [src]=\"transformImage(activity.from.picture, 35, 35, 'fill')\" alt=\"activity_photo\"/>\n\t\t\t\t\t\t\t<div class=\"ra-info\">\n\t\t\t\t\t\t\t\t<h4 class=\"freigl\">\n\t\t\t\t\t\t\t\t\t<strong class=\"freigm\">{{ activity.from.full_name }} </strong>{{ activity.message }}<strong class=\"freigm\"> {{activity.to.what}}</strong>\n\t\t\t\t\t\t\t\t</h4>\n\t\t\t\t\t\t\t\t<span class=\"freigm\">{{ activity.when | amTimeAgo }}</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</a>\n\n\t\t\t\t\t\t<a class=\"flex project-discussion cursor-pt\" *ngIf=\"activity.type === 'opening_creation'\" [routerLink]=\"['/project', activity.route[1], transformUrl(activity.route[2])]\">\n\t\t\t\t\t\t\t<img class=\"profile-picture mar-r-10\" [src]=\"transformImage(activity.from.picture, 35, 35, 'fill')\" alt=\"activity_photo\"/>\n\t\t\t\t\t\t\t<div class=\"ra-info\">\n\t\t\t\t\t\t\t\t<h4 class=\"freigl\">\n\t\t\t\t\t\t\t\t\t<strong class=\"freigm\">{{ activity.from.full_name }} </strong>{{ activity.message }}<strong class=\"freigm\"> {{activity.to.what}}</strong>\n\t\t\t\t\t\t\t\t</h4>\n\t\t\t\t\t\t\t\t<span class=\"freigm\">{{ activity.when | amTimeAgo }}</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"activities-paginate flex\">\n\t\t\t\t\t<li *ngIf=\"slideState ==='left1'\" class=\"bar bar1 animated fadeIn\"></li>\n\t\t\t\t\t<li *ngIf=\"slideState ==='left2'\" class=\"bar bar2 animated fadeIn\"></li>\n\t\t\t\t\t<li *ngIf=\"slideState ==='left3'\" class=\"bar bar3 animated fadeIn\"></li>\n\t\t\t\t\t<li *ngIf=\"slideState ==='left4'\" class=\"bar bar4 animated fadeIn\"></li>\n\t\t\t\t\t<li *ngIf=\"slideState ==='left5'\" class=\"bar bar5 animated fadeIn\"></li>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"whta-skill\">\n\t\t\t\t<h3 class=\"freigl mar-b-15 animated fadeIn\">People skilled in <br /><span class=\"whtas-u transition-200 animated fadeIn\">{{ currentSkill }}</span></h3>\n\t\t\t\t<a [routerLink]=\"['', currentProfile.username]\" *ngFor=\"let currentProfile of currentProfiles\">\n\t\t\t\t\t<div class=\"whtas-profiles flex mar-b-10\">\n\t\t\t\t\t\t<img class=\"mar-r-10 animated fadeIn\" [src]=\"currentProfile.picture\">\n\t\t\t\t\t\t<div class=\"whtasp-info animated fadeIn\">\n\t\t\t\t\t\t\t<h4 class=\"freigl animated fadeIn\">{{ currentProfile.fullName }}</h4>\n\t\t\t\t\t\t\t<span class=\"freigm animated fadeIn\">#{{ currentProfile.rank }}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t</div>\n\n\t\t\t<div class=\"whtpa-button\">\n\t\t\t\t<a routerLink=\"/meet\"><button class=\"freigb\">Meet more of them</button></a>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class=\"wht-login\" *ngIf=\"!login\">\n\t\t<h4 class=\"freigm mar-b-15\">Someone may be looking<br /> for you, right now 🙈</h4>\n\n\t\t<div class=\"login-modal-social signup-login-social\">\n\t        <div class=\"fb-login\">\n\t            <a href=\"/api/auth/facebook\" target=\"_self\">\n\t                <button><i class=\"fa fa-facebook\" style=\"color: white\"></i>Login with Facebook</button>\n\t            </a>\n\t        </div>\n\t        <div class=\"go-login\">\n\t            <a href=\"/api/auth/google\" target=\"_self\">\n\t                <button class=\"go-login\"><img src=\"/public/images/social_media/newgoogle-logo.svg\">Login with Google</button>\n\t            </a>\n\t        </div>\n\t    </div>\n\t</div>\n\n\t<div *ngIf=\"login\" class=\"wht-statistics\">\n\t\t<h2 class=\"info freigs flex\"><h2 class=\"freigl mar-r-5\">Your ranking:</h2> #{{ rank }}</h2>\n\t\t<h4 class=\"freigm mar-b-15\">The higher you rank the more we connect you to the people you need 🙈 </h4>\n\t\t<a [routerLink]=\"['/statistics']\"><button class=\"freigm\">Improve your ranking</button></a>\n\t</div>\n</section>\n\n<!-- ******************** MOBILE ************************ -->\n<section class=\"wh-trending-mobile\" *ngIf=\"mobile\">\n\t<div class=\"wht-activities-mobile\">\n\t\t<h2 class=\"freigl mar-b-15\">Recent activity</h2>\n\t\t<div class=\"whta-recent\">\n\t\t\t<div class=\"recent-activities flex mar-b-15\">\n\t\t\t\t<div class=\"project-discussion flex\" *ngFor=\"let activity of activities; let i = index\" [@slideLeft]=\"i === 0 && slideState\" >\n\t\t\t\t\t<img class=\"profile-picture mar-r-10\"\n\t\t\t\t\t[src]=\"transformImage(activity.from.picture, 30, 30, 'fill')\"\n\t\t\t\t\talt=\"activity_photo\"/>\n\t\t\t\t\t<div class=\"ra-info\">\n\t\t\t\t\t\t<h4 class=\"freigl\">\n\t\t\t\t\t\t\t<strong class=\"freigm\">{{ activity.from.full_name }} </strong>{{ activity.message }}<strong class=\"freigm\"> {{activity.to.what}}</strong>\n\t\t\t\t\t\t</h4>\n\t\t\t\t\t\t<span class=\"freigm\">{{ activity.when | amTimeAgo }}</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"activities-paginate flex\">\n\t\t\t\t<li *ngIf=\"slideState ==='left1'\" class=\"bar bar1 animated fadeIn\"></li>\n\t\t\t\t<li *ngIf=\"slideState ==='left2'\" class=\"bar bar2 animated fadeIn\"></li>\n\t\t\t\t<li *ngIf=\"slideState ==='left3'\" class=\"bar bar3 animated fadeIn\"></li>\n\t\t\t\t<li *ngIf=\"slideState ==='left4'\" class=\"bar bar4 animated fadeIn\"></li>\n\t\t\t\t<li *ngIf=\"slideState ==='left5'\" class=\"bar bar5 animated fadeIn\"></li>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<!-- <div class=\"wht-projects-mobile\">\n\t\t<h2 class=\"freigl mar-b-15\">Trending projects</h2>\n\n\t\t<div class=\"test\">\n\t\t    <h4>Swipe Avatars with HammerJS</h4>\n\n\t\t    <div class=\"swipe-box\"\n\t\t        *ngFor=\"let avatar of avatars; let idx=index\"\n\t\t        (swipeleft)=\"swipe(idx, $event.type)\" (swiperight)=\"swipe(idx, $event.type)\"\n\t\t        [class.visible]=\"avatar.visible\" [class.hidden]=\"!avatar.visible\">\n\t\t        <div>\n\t\t            <img [src]=\"avatar.image\" [alt]=\"avatar.name\">\n\t\t        </div>\n\t\t        <div>\n\t\t            <a class=\"header\">{{avatar.name}}</a>\n\t\t        </div>\n\t\t    </div>\n\t\t</div>\n\t</div> -->\n</section>\n"

/***/ }),

/***/ "./src/app/Components/home/home-trending/home-trending.component.scss":
/***/ (function(module, exports) {

module.exports = ".wh-trending {\n  width: 1100px;\n  margin: 0 auto;\n  padding: 40px 0px 40px 100px;\n  margin-bottom: 30px;\n  -webkit-box-align: baseline;\n      -ms-flex-align: baseline;\n          align-items: baseline; }\n  .wh-trending .wht-trends {\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    -webkit-box-flex: 10;\n        -ms-flex-positive: 10;\n            flex-grow: 10; }\n  .wh-trending h2 {\n    font-size: 26px;\n    color: #2b2b2b;\n    margin-bottom: 20px; }\n  .wh-trending .whtpa-button {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    margin: 0 auto; }\n  .wh-trending .whtpa-button button {\n      color: #2b2b2b;\n      background-color: transparent;\n      border: 1px solid #2b2b2b;\n      border-radius: 5px;\n      padding: 6px 15px 7px 15px; }\n  .wh-trending .whtpa-button button:hover {\n      background-color: black;\n      color: white; }\n  .wh-trending .wht-projects, .wh-trending .wht-activities {\n    text-align: center;\n    padding: 0 20px; }\n  .wh-trending .wht-projects {\n    position: relative;\n    height: 550px; }\n  .wh-trending .wht-activities {\n    position: relative;\n    height: 550px; }\n  .wh-trending .wht-activities .whta-recent {\n      padding: 0 15px;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      margin-bottom: 30px; }\n  .wh-trending .wht-activities .whta-recent .recent-activities {\n        width: 250px;\n        overflow: hidden;\n        -webkit-box-align: start;\n            -ms-flex-align: start;\n                align-items: flex-start; }\n  .wh-trending .wht-activities .whta-recent .recent-activities a {\n          -ms-flex-negative: 0;\n              flex-shrink: 0; }\n  .wh-trending .wht-activities .whta-recent .recent-activities .project-upvote {\n          margin-left: 0; }\n  .wh-trending .wht-activities .whta-recent .recent-activities .project-discussion, .wh-trending .wht-activities .whta-recent .recent-activities .project-upvote, .wh-trending .wht-activities .whta-recent .recent-activities .user-follow, .wh-trending .wht-activities .whta-recent .recent-activities .project-openings {\n          -webkit-box-align: start;\n              -ms-flex-align: start;\n                  align-items: flex-start;\n          -ms-flex-negative: 0;\n              flex-shrink: 0;\n          width: 250px; }\n  .wh-trending .wht-activities .whta-recent .recent-activities .project-discussion .ra-info, .wh-trending .wht-activities .whta-recent .recent-activities .project-upvote .ra-info, .wh-trending .wht-activities .whta-recent .recent-activities .user-follow .ra-info, .wh-trending .wht-activities .whta-recent .recent-activities .project-openings .ra-info {\n            position: relative;\n            width: 200px;\n            bottom: 5px;\n            text-align: left; }\n  .wh-trending .wht-activities .whta-recent .recent-activities .project-discussion .profile-picture, .wh-trending .wht-activities .whta-recent .recent-activities .project-upvote .profile-picture, .wh-trending .wht-activities .whta-recent .recent-activities .user-follow .profile-picture, .wh-trending .wht-activities .whta-recent .recent-activities .project-openings .profile-picture {\n            width: 35px;\n            height: 35px;\n            border-radius: 50%; }\n  .wh-trending .wht-activities .whta-recent .recent-activities .project-discussion .project-picture, .wh-trending .wht-activities .whta-recent .recent-activities .project-upvote .project-picture, .wh-trending .wht-activities .whta-recent .recent-activities .user-follow .project-picture, .wh-trending .wht-activities .whta-recent .recent-activities .project-openings .project-picture {\n            width: 35px;\n            height: 35px;\n            border-radius: 4px; }\n  .wh-trending .wht-activities .whta-recent .recent-activities .project-discussion h4, .wh-trending .wht-activities .whta-recent .recent-activities .project-discussion a, .wh-trending .wht-activities .whta-recent .recent-activities .project-discussion strong, .wh-trending .wht-activities .whta-recent .recent-activities .project-upvote h4, .wh-trending .wht-activities .whta-recent .recent-activities .project-upvote a, .wh-trending .wht-activities .whta-recent .recent-activities .project-upvote strong, .wh-trending .wht-activities .whta-recent .recent-activities .user-follow h4, .wh-trending .wht-activities .whta-recent .recent-activities .user-follow a, .wh-trending .wht-activities .whta-recent .recent-activities .user-follow strong, .wh-trending .wht-activities .whta-recent .recent-activities .project-openings h4, .wh-trending .wht-activities .whta-recent .recent-activities .project-openings a, .wh-trending .wht-activities .whta-recent .recent-activities .project-openings strong {\n            color: #2b2b2b; }\n  .wh-trending .wht-activities .whta-recent .recent-activities .project-discussion span, .wh-trending .wht-activities .whta-recent .recent-activities .project-upvote span, .wh-trending .wht-activities .whta-recent .recent-activities .user-follow span, .wh-trending .wht-activities .whta-recent .recent-activities .project-openings span {\n            color: #999;\n            font-size: 14px; }\n  .wh-trending .wht-activities .whta-recent .recent-activities .user-follow .profile-picture {\n          width: 35px;\n          height: 35px;\n          border-radius: 50%; }\n  .wh-trending .wht-activities .whta-recent .activities-paginate {\n        padding-bottom: 0px;\n        border-bottom: 2px solid #e5e5e5; }\n  .wh-trending .wht-activities .whta-recent .activities-paginate .bar {\n          padding: 0 10px;\n          width: 20px;\n          height: 2px;\n          background-color: #354f8e;\n          border-radius: 4px; }\n  .wh-trending .wht-activities .whta-recent .activities-paginate .bar1 {\n          margin-left: 0px; }\n  .wh-trending .wht-activities .whta-recent .activities-paginate .bar2 {\n          margin-left: 45px; }\n  .wh-trending .wht-activities .whta-recent .activities-paginate .bar3 {\n          margin-left: 90px; }\n  .wh-trending .wht-activities .whta-recent .activities-paginate .bar4 {\n          margin-left: 135px; }\n  .wh-trending .wht-activities .whta-recent .activities-paginate .bar5 {\n          margin-left: 180px; }\n  .wh-trending .wht-activities .whta-skill h3 {\n      font-size: 26px;\n      color: #2b2b2b; }\n  .wh-trending .wht-activities .whta-skill .whtas-u {\n      border-bottom: 1px solid #354f8e;\n      color: #354f8e; }\n  .wh-trending .wht-activities .whta-skill .whtas-profiles {\n      padding-left: 15px; }\n  .wh-trending .wht-activities .whta-skill .whtas-profiles img {\n        width: 35px;\n        border-radius: 50%; }\n  .wh-trending .wht-activities .whta-skill .whtas-profiles .whtasp-info {\n        text-align: left; }\n  .wh-trending .wht-activities .whta-skill .whtas-profiles .whtasp-info h4 {\n          color: #2b2b2b;\n          font-size: 16px; }\n  .wh-trending .wht-activities .whta-skill .whtas-profiles .whtasp-info span {\n          position: relative;\n          bottom: 2px;\n          font-size: 12px;\n          color: #999;\n          border-bottom: #354f8e; }\n  .wh-trending .wht-login {\n    position: relative;\n    top: 9px;\n    -ms-flex-item-align: start;\n        align-self: flex-start;\n    margin-left: 40px; }\n  .wh-trending .wht-login h4 {\n      font-size: 18;\n      line-height: 20px;\n      color: #7c7c7c; }\n  .wh-trending .wht-login .signup-login-social {\n      text-align: left; }\n  .wh-trending .wht-login .go-login .fa-facebook, .wh-trending .wht-login .fb-login .fa-facebook {\n      padding: 0 10px; }\n  .wh-trending .wht-login .go-login button, .wh-trending .wht-login .fb-login button {\n      padding: 8px 15px 8px 5px;\n      font-size: 14px; }\n  .wh-trending .wht-login .fb-login button {\n      padding: 8px 10px 8px 5px; }\n  .wh-trending .wht-login .go-login img {\n      width: 12px; }\n  .wh-trending .wht-statistics {\n    -ms-flex-item-align: start;\n        align-self: flex-start; }\n  .wh-trending .wht-statistics h2 {\n      text-align: center; }\n  .wh-trending .wht-statistics .info {\n      -webkit-box-align: start;\n          -ms-flex-align: start;\n              align-items: flex-start; }\n  .wh-trending .wht-statistics h4 {\n      font-size: 18;\n      line-height: 20px;\n      color: #7c7c7c;\n      line-height: 24px; }\n  .wh-trending .wht-statistics button {\n      font-size: 16px;\n      display: block;\n      margin: 0 auto;\n      padding: 10px 20px; }\n  .wh-trending .wht-categories {\n    position: relative;\n    bottom: 15px;\n    text-align: right; }\n  .wh-trending .wht-categories li {\n      white-space: nowrap;\n      color: #7c7c7c;\n      margin-bottom: 6px;\n      padding-bottom: 2px;\n      padding-right: 5px;\n      border-right: 2px solid transparent; }\n  .wh-trending .wht-categories .li-active {\n      border-right: 2px solid rgba(65, 98, 153, 0.8);\n      text-shadow: 0px 0px 1px #7c7c7c; }\n  .wh-trending .wht-categories li:hover {\n      border-right: 2px solid rgba(65, 98, 153, 0.8);\n      text-shadow: 0px 0px 1px #7c7c7c; }\n  /******************** MOBILE ****************************/\n  @media only screen and (max-width: 736px) {\n  h2 {\n    color: #222;\n    font-size: 26px;\n    text-align: center;\n    margin-bottom: 15px; }\n  .wh-trending-mobile .wht-activities-mobile {\n    padding: 30px 10px 15px 10px; }\n    .wh-trending-mobile .wht-activities-mobile .whta-recent {\n      padding: 0 40px;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      margin-bottom: 30px; }\n      .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities {\n        width: 250px;\n        overflow: hidden;\n        -webkit-box-align: start;\n            -ms-flex-align: start;\n                align-items: flex-start; }\n        .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities a {\n          -ms-flex-negative: 0;\n              flex-shrink: 0; }\n        .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .project-upvote {\n          margin-left: 0; }\n        .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .project-discussion, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .project-upvote, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .user-follow, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .project-openings {\n          -webkit-box-align: start;\n              -ms-flex-align: start;\n                  align-items: flex-start;\n          -ms-flex-negative: 0;\n              flex-shrink: 0;\n          width: 250px; }\n          .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .project-discussion .ra-info, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .project-upvote .ra-info, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .user-follow .ra-info, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .project-openings .ra-info {\n            position: relative;\n            width: 200px;\n            bottom: 5px;\n            text-align: left; }\n          .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .project-discussion .profile-picture, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .project-upvote .profile-picture, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .user-follow .profile-picture, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .project-openings .profile-picture {\n            width: 30px;\n            height: 30px;\n            border-radius: 50%; }\n          .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .project-discussion .project-picture, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .project-upvote .project-picture, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .user-follow .project-picture, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .project-openings .project-picture {\n            width: 30px;\n            height: 30px;\n            border-radius: 4px; }\n          .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .project-discussion h4, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .project-discussion a, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .project-discussion strong, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .project-upvote h4, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .project-upvote a, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .project-upvote strong, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .user-follow h4, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .user-follow a, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .user-follow strong, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .project-openings h4, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .project-openings a, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .project-openings strong {\n            color: #2b2b2b; }\n          .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .project-discussion span, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .project-upvote span, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .user-follow span, .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .project-openings span {\n            color: #999;\n            font-size: 14px; }\n        .wh-trending-mobile .wht-activities-mobile .whta-recent .recent-activities .user-follow .profile-picture {\n          width: 30px;\n          height: 30px;\n          border-radius: 50%; }\n      .wh-trending-mobile .wht-activities-mobile .whta-recent .activities-paginate {\n        padding-bottom: 0px;\n        border-bottom: 2px solid #e5e5e5; }\n        .wh-trending-mobile .wht-activities-mobile .whta-recent .activities-paginate .bar {\n          padding: 0 10px;\n          width: 20px;\n          height: 2px;\n          background-color: #354f8e;\n          border-radius: 4px; }\n        .wh-trending-mobile .wht-activities-mobile .whta-recent .activities-paginate .bar1 {\n          margin-left: 0px; }\n        .wh-trending-mobile .wht-activities-mobile .whta-recent .activities-paginate .bar2 {\n          margin-left: 45px; }\n        .wh-trending-mobile .wht-activities-mobile .whta-recent .activities-paginate .bar3 {\n          margin-left: 90px; }\n        .wh-trending-mobile .wht-activities-mobile .whta-recent .activities-paginate .bar4 {\n          margin-left: 135px; }\n        .wh-trending-mobile .wht-activities-mobile .whta-recent .activities-paginate .bar5 {\n          margin-left: 180px; }\n  .wh-trending-mobile .wht-projects-mobile .test .swipe-box {\n    display: block;\n    width: 100%;\n    float: left;\n    margin: 0; }\n  .wh-trending-mobile .wht-projects-mobile .test .visible {\n    display: block; }\n  .wh-trending-mobile .wht-projects-mobile .test .hidden {\n    display: none; } }\n"

/***/ }),

/***/ "./src/app/Components/home/home-trending/home-trending.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeTrendingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__("./node_modules/ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_popover_login_popover_login_component__ = __webpack_require__("./src/app/Components/modals/popover-login/popover-login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_Projects_projects_service__ = __webpack_require__("./src/app/Services/Projects/projects.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_Profiles_profiles_service__ = __webpack_require__("./src/app/Services/Profiles/profiles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_notification_service__ = __webpack_require__("./src/app/Services/notification.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Services_Pictures_pictures_service__ = __webpack_require__("./src/app/Services/Pictures/pictures.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Interfaces_Constants_categories_constant__ = __webpack_require__("./src/app/Interfaces/Constants/categories-constant.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Interfaces_Constants_search_profile_constant__ = __webpack_require__("./src/app/Interfaces/Constants/search-profile.constant.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Interfaces_Constants_search_project_constant__ = __webpack_require__("./src/app/Interfaces/Constants/search-project.constant.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Animations_animations__ = __webpack_require__("./src/app/Animations/animations.ts");
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








/* Animations */

var HomeTrendingComponent = /** @class */ (function () {
    function HomeTrendingComponent(ProjectsService, ProfilesService, NotificationService, PicturesService, TokenService, dialogService) {
        this.ProjectsService = ProjectsService;
        this.ProfilesService = ProfilesService;
        this.NotificationService = NotificationService;
        this.PicturesService = PicturesService;
        this.TokenService = TokenService;
        this.dialogService = dialogService;
        this.skillProfiles = [];
        this.skillTrending = __WEBPACK_IMPORTED_MODULE_10__Interfaces_Constants_search_project_constant__["d" /* skillTrending */];
        this.count = 0;
        this.countSlide = 0;
        this.slideState = 'left1';
        this.config = {
            direction: 'horizontal',
            speed: 400,
            autoplay: 8000,
            spaceBetween: 30,
            loop: true,
            pagination: '.swiper-pagination',
            paginationClickable: true,
            paginationHide: false,
        };
        this.moveSliders();
        this.getRecentActivities();
    }
    HomeTrendingComponent.prototype.ngOnInit = function () {
        this.searchProjectBody = __WEBPACK_IMPORTED_MODULE_10__Interfaces_Constants_search_project_constant__["b" /* searchProject2 */];
        this.categories = __WEBPACK_IMPORTED_MODULE_8__Interfaces_Constants_categories_constant__["b" /* homeCategories */];
        this.searchProfileBody = __WEBPACK_IMPORTED_MODULE_9__Interfaces_Constants_search_profile_constant__["a" /* searchProfile */];
        this.currentSkill = __WEBPACK_IMPORTED_MODULE_10__Interfaces_Constants_search_project_constant__["d" /* skillTrending */][0];
        this.trendingPeopleBasedOnSkill();
        this.searchProjectByCategory({ name: 'Technology', id: 16 });
    };
    HomeTrendingComponent.prototype.ngOnDestroy = function () {
        if (this.interval1 || this.interval2) {
            clearInterval(this.interval1);
            clearInterval(this.interval2);
        }
    };
    HomeTrendingComponent.prototype.getRecentActivities = function () {
        var _this = this;
        this.NotificationService.recentActivities()
            .subscribe(function (activities) {
            _this.activities = activities;
        });
    };
    HomeTrendingComponent.prototype.trendingPeopleBasedOnSkill = function () {
        var _this = this;
        var length = this.skillTrending.length;
        for (var i = 0; i < length; i++) {
            this.searchSkilledPeople(this.skillTrending[i]);
        }
        this.interval1 = setInterval(function () {
            _this.count += 1;
            if (_this.count >= _this.skillTrending.length)
                _this.count = 0;
            _this.currentProfiles = _this.skillProfiles[_this.count];
            _this.currentSkill = _this.skillTrending[_this.count];
        }, 4000);
    };
    HomeTrendingComponent.prototype.searchProjectByCategory = function (category) {
        var _this = this;
        this.currentCategory = category.name;
        this.searchProjectBody.query.members[1].value = category.name;
        this.searchProjectBody.paginate.limit = 1;
        this.ProjectsService.searchProject(this.searchProjectBody).subscribe(function (res) {
            _this.bestProject = res.projects[0];
        });
    };
    HomeTrendingComponent.prototype.searchSkilledPeople = function (skill) {
        var _this = this;
        var array = [];
        array.push(skill);
        this.searchProfileBody.query.members[0].value = array;
        this.searchProfileBody.paginate.limit = 5;
        this.ProfilesService.searchProfiles(this.searchProfileBody).subscribe(function (res) {
            _this.skillProfiles.push(res.profiles);
            if (!_this.skillProfiles[1])
                _this.currentProfiles = _this.skillProfiles[0];
        });
    };
    HomeTrendingComponent.prototype.followProject = function (id, follow) {
        var _this = this;
        if (!this.TokenService.getToken())
            return this.showLoginPopOver();
        this.ProjectsService.followProject(id, {}).subscribe(function (res) {
            if (!follow) {
                _this.bestProject['follow'] = 1;
                _this.bestProject['followers'] += 1;
            }
            else {
                _this.bestProject['follow'] = null;
                _this.bestProject['followers'] -= 1;
            }
        });
    };
    HomeTrendingComponent.prototype.moveSliders = function () {
        var _this = this;
        this.interval1 = setInterval(function () {
            _this.countSlide += 1;
            if (_this.countSlide > 4)
                _this.countSlide = 1;
            _this.slideState = 'left' + _this.countSlide.toString();
        }, 3000);
    };
    /* SHOW MODAL */
    HomeTrendingComponent.prototype.showLoginPopOver = function () {
        var disposable = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_2__modals_popover_login_popover_login_component__["a" /* PopoverLoginComponent */], {});
    };
    /* TRANSFORM FUNCTION */
    HomeTrendingComponent.prototype.transformUrl = function (url) {
        url = url.replace(/ /g, '-');
        return url;
    };
    HomeTrendingComponent.prototype.transformImage = function (url, width, height, crop) {
        return this.PicturesService.transformImage(url, width, height, crop);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], HomeTrendingComponent.prototype, "mobile", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], HomeTrendingComponent.prototype, "rank", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], HomeTrendingComponent.prototype, "login", void 0);
    HomeTrendingComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home-trending',
            template: __webpack_require__("./src/app/Components/home/home-trending/home-trending.component.html"),
            styles: [__webpack_require__("./src/app/Components/home/home-trending/home-trending.component.scss"), __webpack_require__("./src/public/styles/project-card.scss"), __webpack_require__("./src/public/styles/login-signup-modal.scss")],
            // host: {
            // 	'[@slideLeft]' : 'left1'
            // },
            animations: [__WEBPACK_IMPORTED_MODULE_11__Animations_animations__["m" /* slideActivities */]],
            providers: [__WEBPACK_IMPORTED_MODULE_5__Services_notification_service__["a" /* NotificationService */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__Services_Projects_projects_service__["a" /* ProjectsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_Projects_projects_service__["a" /* ProjectsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__Services_Profiles_profiles_service__["a" /* ProfilesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_Profiles_profiles_service__["a" /* ProfilesService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__Services_notification_service__["a" /* NotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_notification_service__["a" /* NotificationService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__Services_Pictures_pictures_service__["a" /* PicturesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__Services_Pictures_pictures_service__["a" /* PicturesService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_7__Services_Authentication_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__Services_Authentication_token_service__["a" /* TokenService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _f || Object])
    ], HomeTrendingComponent);
    return HomeTrendingComponent;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=home-trending.component.js.map

/***/ }),

/***/ "./src/app/Components/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"w-home\" homeDiv (window:resize)=\"onResize($event)\">\n\n\t<div class=\"wh-container bg-default\" *ngIf=\"!mobile\">\n\t\t<div id=\"hvbg\" class=\"whc-videobg\">\n\t\t\t<video poster=\"/public/images/background-home.jpg\" loop muted autoplay>\n\t\t\t\t<source src=\"public/videos/Home.mp4\" type=\"video/mp4\" />\n\t\t\t</video>\n\t\t</div>\n\n\t\t<app-home-post-project class=\"wh-post-project\" [@slidePost]=\"state2\" [login]=\"login\" [profile]=\"profile\" (slide)=\"hidePost($event)\"></app-home-post-project>\n\n\t\t<div [swiper]=\"config\" class=\"wh-slides swiper-container align-center bb\" [@slidePost]=\"state1\">\n\t\t\t<div class=\"swiper-wrapper\">\n\t\t\t\t<div class=\"whs-slide swiper-slide\">\n\t\t\t\t\t<div class=\"whs-text\">\n\t\t\t\t\t\t<h1 class=\"freigl mar-b-10\"><span class=\"freigs\">Share</span> your <span class=\"freigs\">project</span> to the world</h1>\n\t\t\t\t\t\t<p class=\"freigb mar-b-15\">No matter how far along you are, get connected to all the people you need for your idea, product or startup.</p>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<button (click)=\"showPost()\">Post your project</button>\n\t\t\t\t\t<!-- <div class=\"whs-button\">\n\t\t\t\t\t\t<a [routerLink]=\"['/meet']\"><button class=\"button-meet freigm mar-b-20\">Find the people you need</button></a>\n\t\t\t\t\t\t<a [routerLink]=\"['/discover']\"><button class=\"button-discover freigm\">Discover projects to help</button></a>\n\t\t\t\t\t</div> -->\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"whs-slide swiper-slide\">\n\t\t\t\t\t<div class=\"whs-text\">\n\t\t\t\t\t\t<h1 class=\"freigl mar-b-15\"><span class=\"freigs\">Explore</span> what’s <span class=\"freigs\">being built</span> around you</h1>\n\t\t\t\t\t\t<p class=\"freigb\">Explore thousands of projects; products and startups that need your skills</p>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"whs-button flex-end\">\n\t\t\t\t\t\t<a [routerLink]=\"['/discover']\"><button class=\"button-discover freigm\"> Explore projects that need you</button></a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"whs-slide swiper-slide\">\n\t\t\t\t\t<div class=\"whs-text\">\n\t\t\t\t\t\t<h1 class=\"freigl mar-b-15\">Meet the <span class=\"freigs\">people</span> you <span class=\"freigs\">truly need</span></h1>\n\t\t\t\t\t\t<p class=\"freigb\">They are designers, engineers, entrepreneurs, students, investors, and way more</p>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"whs-button flex-end\">\n\t\t\t\t\t\t<a [routerLink]=\"['/meet']\"><button class=\"button-meet freigm\">Meet our community</button></a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div id=\"swiper-2\" class=\"swiper-pagination\"></div>\n\t\t</div>\n\t</div>\n\n\t<div class=\"wh-container-mobile bg-default\" *ngIf=\"mobile\">\n\t\t<div class=\"filter\"></div>\n\t\t<div class=\"whcm-slides\">\n\t\t\t<div class=\"whcm-text\">\n\t\t\t\t<h1 class=\"freigl mar-b-10\"><span class=\"freigs\">Scaling</span> the <span class=\"freigs\">entrepreneurial</span> ecosystem</h1>\n\t\t\t\t<p class=\"freigb mar-b-10\">We give exposure to all the ideas, projects and startups from around the world and connect them to all the people they need, instantly</p>\n\n\t\t\t\t<div class=\"whcm-buttons\">\n\t\t\t\t\t<a [routerLink]=\"['/meet']\"><button class=\"button-meet mar-b-15 freigm\">Find the people you need</button></a>\n\t\t\t\t\t<a [routerLink]=\"['/discover']\"><button class=\"button-discover freigm\">Discover projects to help</button></a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<app-home-static *ngIf=\"profile\" [mobile]=\"mobile\" [profile]=\"profile\" [location]=\"location\" ></app-home-static>\n\n<app-footer></app-footer>\n</div>\n\n"

/***/ }),

/***/ "./src/app/Components/home/home.component.scss":
/***/ (function(module, exports) {

module.exports = ".body-page {\n  height: auto;\n  width: 100%; }\n\n.slick-slide {\n  opacity: 0.5; }\n\n.slick-current {\n  opacity: 1; }\n\n/*********************** Main Home **************************/\n\n#w-home {\n  position: relative; }\n\n#w-home .wh-container {\n    position: relative;\n    background: rgba(0, 0, 0, 0.5);\n    /* For Safari 5.1 to 6.0 */\n    /* For Opera 11.1 to 12.0 */\n    /* For Firefox 3.6 to 15 */\n    background: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0.9)));\n    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9));\n    /* Standard syntax (must be last) */\n    overflow-x: hidden; }\n\n#w-home .wh-container .wh-post {\n      width: 700px;\n      margin: 0 auto;\n      left: 0;\n      right: -10000px; }\n\n#w-home .wh-container .wh-post .whp-box {\n        position: relative;\n        background-color: rgba(20, 20, 20, 0.5);\n        padding: 3px 15px 4px 10px;\n        border-radius: 4px; }\n\n#w-home .wh-container .wh-post .whp-box img {\n          width: 12px;\n          margin-left: 10px; }\n\n#w-home .wh-container .wh-post h1 {\n        font-family: 'FreigSem';\n        font-size: 32px;\n        margin-bottom: 25px; }\n\n#w-home .wh-container .wh-post h2 {\n        font-family: 'FreigBook';\n        font-size: 28px; }\n\n#w-home .wh-container .wh-post .whp-1 .whp1-dropdown-1 {\n        position: absolute;\n        background-color: white;\n        top: 0;\n        left: 0;\n        margin-top: 43px;\n        border-radius: 8px;\n        z-index: 100;\n        width: 180px;\n        display: none; }\n\n#w-home .wh-container .wh-post .whp-1 .whp1-dropdown-1 ul {\n          padding-top: 10px;\n          padding-bottom: 10px; }\n\n#w-home .wh-container .wh-post .whp-1 .whp1-dropdown-1 ul li {\n            font-family: 'FreigLight';\n            color: black;\n            font-size: 18px;\n            z-index: 10000;\n            padding: 5px 10px 10px 20px; }\n\n#w-home .wh-container .wh-post .whp-1 .whp1-dropdown-2 {\n        position: absolute;\n        background-color: white;\n        top: 0;\n        left: 0;\n        margin-top: 43px;\n        border-radius: 8px;\n        z-index: 100;\n        display: none; }\n\n#w-home .wh-container .wh-post .whp-1 .whp1-dropdown-2 ul {\n          -webkit-column-count: 3;\n                  column-count: 3;\n          padding-top: 10px;\n          padding-bottom: 10px; }\n\n#w-home .wh-container .wh-post .whp-1 .whp1-dropdown-2 ul li {\n            font-family: 'FreigLight';\n            white-space: nowrap;\n            color: black;\n            font-size: 18px;\n            z-index: 10000;\n            padding: 5px 10px 10px 20px; }\n\n#w-home .wh-container .wh-post .whp-2 input {\n        color: #fff; }\n\n#w-home .wh-container .wh-post .whp-2 .input-1 {\n        width: 200px;\n        background-color: transparent;\n        border: 0;\n        border-bottom: 1px solid;\n        border-radius: 0;\n        padding: 0;\n        margin: 0;\n        margin-right: 10px;\n        font-size: 28px; }\n\n#w-home .wh-container .wh-post .whp-2 .input-2 {\n        width: 180px;\n        background-color: rgba(20, 20, 20, 0.5);\n        padding: 2px 10px;\n        border: 0;\n        margin: 0;\n        font-size: 28px; }\n\n#w-home .wh-container .wh-post .whp-button {\n        -webkit-box-pack: end;\n            -ms-flex-pack: end;\n                justify-content: flex-end;\n        padding-right: 60px; }\n\n#w-home .wh-container .wh-post .whp-button a {\n          margin-right: 20px; }\n\n#w-home .wh-container .wh-post .whp-button button {\n          background-color: rgba(255, 52, 52, 0.8);\n          padding: 10px 25px;\n          font-size: 18px; }\n\n#w-home .wh-container .wh-post-project {\n      opacity: 0;\n      right: -10000px;\n      left: 0; }\n\n#w-home .wh-container .wh-slides {\n      opacity: 1;\n      position: absolute;\n      width: 900px;\n      top: 50%;\n      right: 0;\n      left: 0;\n      margin: 0 auto;\n      padding: 30px 30px 30px 30px;\n      text-align: center; }\n\n#w-home .wh-container .wh-slides .whs-slide {\n        margin-bottom: 20px; }\n\n#w-home .wh-container .wh-slides .whs-slide .whs-text {\n          margin-bottom: 40px; }\n\n#w-home .wh-container .wh-slides .whs-slide .whs-text h1 {\n            font-size: 38px;\n            line-height: 40px; }\n\n#w-home .wh-container .wh-slides .whs-slide .whs-text span {\n            font-size: 38px; }\n\n#w-home .wh-container .wh-slides .whs-slide .whs-text p {\n            font-size: 18px;\n            line-height: 24px; }\n\n#w-home .wh-container .wh-slides .whs-slide button {\n          font-size: 16px;\n          padding: 10px 25px;\n          border-radius: 40px;\n          font-family: 'freigMed'; }\n\n#w-home .wh-container .wh-slides .whs-slide button:hover {\n          background-color: #ff3333; }\n\n#w-home .wh-container .wh-slides .whs-slide .whs-button {\n          /*\t\t\t\t\tmargin-left: 50px;\n*/\n          /*\t\t\t\t\t.button-meet, .button-discover {\n\t\t\t\t\t\tdisplay: block;\n\t\t\t\t\t\tfont-size: 14px;\n\t\t\t\t\t\ttext-transform: uppercase;\n\t\t\t\t\t\tpadding: 10px 20px;\n\t\t\t\t\t}\n\n\t\t\t\t\t.button-meet {\n\t\t\t\t\t\tpadding-right: 21px;\n\t\t\t\t\t\tbackground-color: rgba(76, 75, 93, 0.8);\n\t\t\t\t\t\tborder: 1px solid rgba(76, 75, 93, 0.8);\n\t\t\t\t\t}\n*/\n          /*\t\t\t\t\t.mar-b-20 {\n\t\t\t\t\t\tmargin-bottom: 20px;\n\t\t\t\t\t}\n\n\t\t\t\t\t.mar-b-25 {\n\t\t\t\t\t\tmargin-bottom: 25px;\n\t\t\t\t\t}*/ }\n\n#w-home .wh-container .wh-slides .whs-slide .whs-button .button-meet, #w-home .wh-container .wh-slides .whs-slide .whs-button .button-discover {\n            padding-right: 10px 15px;\n            background-color: #497faa;\n            border-radius: 4px;\n            /*\t\t\t\t\t\tborder: 1px solid white;*/ }\n\n#w-home .wh-container .wh-slides .whs-slide .whs-button .button-meet:hover, #w-home .wh-container .wh-slides .whs-slide .whs-button .button-discover:hover {\n            /*\t\t\t\t\t\tcolor: #222;\n*/\n            background-color: #3d6a8f; }\n\n/******************** MOBILE ****************************/\n\n@media only screen and (max-width: 736px) {\n  #w-home .wh-container-mobile {\n    position: relative;\n    background-image: url(\"/public/images/bg_mobile/bg_home_mobile.jpg\");\n    overflow-y: hidden; }\n    #w-home .wh-container-mobile .filter {\n      height: 600px;\n      background: rgba(0, 0, 0, 0.7); }\n    #w-home .wh-container-mobile .whcm-slides {\n      padding-top: 110px; }\n      #w-home .wh-container-mobile .whcm-slides .whcm-text {\n        position: relative;\n        padding: 10px 20px 20px 20px; }\n        #w-home .wh-container-mobile .whcm-slides .whcm-text h1, #w-home .wh-container-mobile .whcm-slides .whcm-text span {\n          font-size: 28px; }\n        #w-home .wh-container-mobile .whcm-slides .whcm-text h1 {\n          line-height: 32px; }\n        #w-home .wh-container-mobile .whcm-slides .whcm-text .whcm-buttons {\n          text-align: center;\n          padding: 15px; }\n          #w-home .wh-container-mobile .whcm-slides .whcm-text .whcm-buttons .button-meet, #w-home .wh-container-mobile .whcm-slides .whcm-text .whcm-buttons .button-discover {\n            text-transform: uppercase;\n            font-size: 16px; }\n          #w-home .wh-container-mobile .whcm-slides .whcm-text .whcm-buttons .button-meet {\n            background-color: rgba(76, 75, 93, 0.8);\n            padding: 10px 15px;\n            border: 1px solid rgba(76, 75, 93, 0.8); }\n          #w-home .wh-container-mobile .whcm-slides .whcm-text .whcm-buttons .button-discover {\n            background-color: transparent;\n            border: 1px solid;\n            padding: 10px; } }\n"

/***/ }),

/***/ "./src/app/Components/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_css_animator__ = __webpack_require__("./node_modules/css-animator/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_css_animator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_css_animator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_Projects_projects_service__ = __webpack_require__("./src/app/Services/Projects/projects.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_shared_service__ = __webpack_require__("./src/app/Services/shared.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Services_Authentication_token_service__ = __webpack_require__("./src/app/Services/Authentication/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Services_Profiles_profiles_service__ = __webpack_require__("./src/app/Services/Profiles/profiles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Services_meta_service__ = __webpack_require__("./src/app/Services/meta.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Services_Trackings_tracking_service__ = __webpack_require__("./src/app/Services/Trackings/tracking.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Interfaces_Constants_categories_constant__ = __webpack_require__("./src/app/Interfaces/Constants/categories-constant.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Animations_slides_animation__ = __webpack_require__("./src/app/Animations/slides.animation.ts");
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







/* Models */

/* Animations */

var HomeComponent = /** @class */ (function () {
    function HomeComponent(ProjectsService, SharedService, route, router, TokenService, ProfilesService, Title, MetaService, TrackingService) {
        var _this = this;
        this.ProjectsService = ProjectsService;
        this.SharedService = SharedService;
        this.route = route;
        this.router = router;
        this.TokenService = TokenService;
        this.ProfilesService = ProfilesService;
        this.Title = Title;
        this.MetaService = MetaService;
        this.TrackingService = TrackingService;
        this.config = {
            direction: 'horizontal',
            speed: 400,
            autoplay: 8000,
            spaceBetween: 30,
            loop: true,
            pagination: '.swiper-pagination',
            paginationClickable: true,
            paginationHide: false,
        };
        this.animates = false;
        this.state1 = 'initial';
        this.state2 = 'outRight';
        this.mobile = false;
        this.login = 0;
        this.check = false;
        this.categories = __WEBPACK_IMPORTED_MODULE_10__Interfaces_Constants_categories_constant__["a" /* categories */];
        this.currentStatus = 'Idea';
        this.currentCategory = 'Any category';
        if ((window.screen.width) < 736)
            this.mobile = true;
        this.subscription = this.SharedService.postActive$.subscribe(function (res) {
            if (res) {
                _this.state1 = 'outLeft';
                _this.state2 = 'initial';
            }
        });
        this.getToken();
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.getProfile();
        this.getLocation();
        this.setMetaData();
        this.trackViewPage();
    };
    HomeComponent.prototype.getLocation = function () {
        var _this = this;
        setTimeout(function () {
            if (!_this.location)
                _this.location = 'San Francisco, CA, United Stated';
        }, 3000);
        // this.ProfilesService.getIP().subscribe(res => {
        // 	let city, state, country;
        // 	city 	= res.city + ', '
        // 	country = res.country_name;
        // 	if (res.region_code)
        // 		state = res.region_code + ', '
        // 	else
        // 		state = "' ', "
        // 	this.location = city + state + country
        // });
    };
    HomeComponent.prototype.trackViewPage = function () {
        var token = this.TokenService.getToken();
        this.TrackingService.viewActivities({}, token, 5).subscribe(function (r) { });
    };
    HomeComponent.prototype.setMetaData = function () {
        this.Title.setTitle('Witty | Networking for the entrepreneurial age');
        this.MetaService.setMeta('description', 'We give exposure to all the ideas, projects and startups from around the world and connect them to the people they need, instantly');
        this.MetaService.setMeta('og:title', "Witty - Networking for the entrepreneurial age");
        this.MetaService.setMeta('og:description', 'We showcase all the ideas, products, initiatives and startups from around the world and connect them to all the people they need, including you.');
        this.MetaService.setMeta('og:url', 'https://www.wittycircle.com');
        this.MetaService.setMeta('og:image', 'http://res.cloudinary.com/dqpkpmrgk/image/upload/v1508448660/Share_Link_Cards_Facebook/Folger_Coffee_Company_Building__San_Francisco_2.jpg');
    };
    HomeComponent.prototype.ngAfterViewInit = function () {
        this.animates = true;
    };
    HomeComponent.prototype.onResize = function (event) {
        if (event.target.innerWidth < 736)
            this.mobile = true;
        else
            this.mobile = false;
    };
    HomeComponent.prototype.scrollToTop = function () {
        this.router.events.subscribe(function (evt) {
            if (!(evt instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* NavigationEnd */])) {
                return;
            }
            window.scrollTo(0, 0);
        });
    };
    HomeComponent.prototype.getProfile = function () {
        var _this = this;
        if (this.login) {
            this.ProfilesService.getProfile(this.login).subscribe(function (res) {
                _this.profile = res.profile;
            });
        }
    };
    HomeComponent.prototype.getToken = function () {
        if (this.TokenService.getToken())
            this.login = this.TokenService.getToken().user.id;
    };
    HomeComponent.prototype.getStatus = function (name) {
        this.currentStatus = name;
    };
    HomeComponent.prototype.getCategory = function (name, id) {
        this.currentCategory = name;
        this.currentCategoryId = id;
    };
    HomeComponent.prototype.createProject = function () {
        var _this = this;
        if (!this.TokenService.getToken())
            return;
        else {
            if (this.currentCategoryId && this.currentStatus && this.title && this.city) {
                var body = {
                    title: this.title,
                    status: this.currentStatus,
                    category: this.currentCategoryId,
                    location: {
                        city: this.city,
                        state: this.state,
                        country: this.country,
                        lng: this.long,
                        lat: this.lat
                    }
                };
                this.ProjectsService.createProject(body).subscribe(function (res) {
                    if (res)
                        _this.router.navigate(['/project/update'], { queryParams: { id: res.id, start: 1 } });
                });
            }
            else
                console.log("ERROR");
        }
    };
    HomeComponent.prototype.getAddress = function (place) {
        var address = place['formatted_address'].replace('USA', 'United States');
        var array = address.split(', ');
        this.city = array[0];
        this.state = array[1];
        this.country = array[2] ? array[2] : array[1];
        this.long = place['geometry'].location.lat();
        this.lat = place['geometry'].location.lng();
    };
    HomeComponent.prototype.showPost = function () {
        this.state1 = 'outLeft';
        this.state2 = 'initial';
    };
    HomeComponent.prototype.hidePost = function (value) {
        this.state1 = 'initial';
        this.state2 = 'outRight';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('autoFocus'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
    ], HomeComponent.prototype, "input", void 0);
    HomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home',
            template: __webpack_require__("./src/app/Components/home/home.component.html"),
            styles: [__webpack_require__("./src/app/Components/home/home.component.scss")],
            animations: [__WEBPACK_IMPORTED_MODULE_11__Animations_slides_animation__["a" /* slidePost */]],
            providers: [__WEBPACK_IMPORTED_MODULE_3_css_animator__["AnimationService"], __WEBPACK_IMPORTED_MODULE_7__Services_Profiles_profiles_service__["a" /* ProfilesService */]]
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__Services_Projects_projects_service__["a" /* ProjectsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_Projects_projects_service__["a" /* ProjectsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__Services_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_shared_service__["a" /* SharedService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__Services_Authentication_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__Services_Authentication_token_service__["a" /* TokenService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7__Services_Profiles_profiles_service__["a" /* ProfilesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__Services_Profiles_profiles_service__["a" /* ProfilesService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["Title"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["Title"]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_8__Services_meta_service__["a" /* MetaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__Services_meta_service__["a" /* MetaService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_9__Services_Trackings_tracking_service__["a" /* TrackingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__Services_Trackings_tracking_service__["a" /* TrackingService */]) === "function" && _k || Object])
    ], HomeComponent);
    return HomeComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
}());

//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "./src/app/Components/home/home.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__ = __webpack_require__("./src/app/Pipes/pipe.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__footer_footer_module__ = __webpack_require__("./src/app/Components/footer/footer.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_component__ = __webpack_require__("./src/app/Components/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_trending_home_trending_component__ = __webpack_require__("./src/app/Components/home/home-trending/home-trending.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__home_around_home_around_component__ = __webpack_require__("./src/app/Components/home/home-around/home-around.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__home_post_home_post_component__ = __webpack_require__("./src/app/Components/home/home-post/home-post.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Directives_Home_home_directive__ = __webpack_require__("./src/app/Directives/Home/home.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Directives_directives_module__ = __webpack_require__("./src/app/Directives/directives.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Services_Pictures_pictures_service__ = __webpack_require__("./src/app/Services/Pictures/pictures.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Services_Projects_projects_service__ = __webpack_require__("./src/app/Services/Projects/projects.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Services_Profiles_profiles_service__ = __webpack_require__("./src/app/Services/Profiles/profiles.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__Services_Invitation_invitation_service__ = __webpack_require__("./src/app/Services/Invitation/invitation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__Services_Skills_skills_service__ = __webpack_require__("./src/app/Services/Skills/skills.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__Services_Backoffice_backoffice_service__ = __webpack_require__("./src/app/Services/Backoffice/backoffice.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ngx_swiper_wrapper__ = __webpack_require__("./node_modules/ngx-swiper-wrapper/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ngx_swiper_wrapper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_ngx_swiper_wrapper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_angular2_moment__ = __webpack_require__("./node_modules/angular2-moment/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ng2_cloudinary__ = __webpack_require__("./node_modules/ng2-cloudinary/dist/esm/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_ng2_file_upload__ = __webpack_require__("./node_modules/ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_ng2_page_scroll__ = __webpack_require__("./node_modules/ng2-page-scroll/ng2-page-scroll.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_ngx_siema__ = __webpack_require__("./node_modules/ngx-siema/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__Routes_home_routes__ = __webpack_require__("./src/app/Routes/home.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__home_post_project_home_post_project_component__ = __webpack_require__("./src/app/Components/home/home-post-project/home-post-project.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__home_projects_home_projects_component__ = __webpack_require__("./src/app/Components/home/home-projects/home-projects.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__home_invitation_home_invitation_component__ = __webpack_require__("./src/app/Components/home/home-invitation/home-invitation.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__home_static_home_static_component__ = __webpack_require__("./src/app/Components/home/home-static/home-static.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






/* Components */




/* Directives */


/* Services */





// import { MetaService } from '../../Services/meta.service';

/* Library */





// import { CountoModule }  from 'angular2-counto';

/* Route */





var SWIPER_CONFIG = {
    direction: 'horizontal',
    slidesPerView: 'auto',
    keyboardControl: true,
    speed: 300,
};
var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_24__Routes_home_routes__["a" /* HOME_ROUTES */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["f" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_5__footer_footer_module__["a" /* FooterModule */],
                __WEBPACK_IMPORTED_MODULE_18_ngx_swiper_wrapper__["SwiperModule"].forRoot(SWIPER_CONFIG),
                __WEBPACK_IMPORTED_MODULE_4__Pipes_pipe_module__["a" /* PipeModule */],
                __WEBPACK_IMPORTED_MODULE_19_angular2_moment__["MomentModule"],
                __WEBPACK_IMPORTED_MODULE_11__Directives_directives_module__["a" /* DirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_20_ng2_cloudinary__["c" /* Ng2CloudinaryModule */],
                __WEBPACK_IMPORTED_MODULE_21_ng2_file_upload__["FileUploadModule"],
                __WEBPACK_IMPORTED_MODULE_22_ng2_page_scroll__["a" /* Ng2PageScrollModule */].forRoot(),
                // CountoModule,
                __WEBPACK_IMPORTED_MODULE_23_ngx_siema__["a" /* NgxSiemaModule */].forRoot()
            ],
            exports: [],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_8__home_around_home_around_component__["a" /* HomeAroundComponent */],
                __WEBPACK_IMPORTED_MODULE_7__home_trending_home_trending_component__["a" /* HomeTrendingComponent */],
                __WEBPACK_IMPORTED_MODULE_10__Directives_Home_home_directive__["a" /* HomeDirective */],
                __WEBPACK_IMPORTED_MODULE_9__home_post_home_post_component__["a" /* HomePostComponent */],
                __WEBPACK_IMPORTED_MODULE_25__home_post_project_home_post_project_component__["a" /* HomePostProjectComponent */],
                __WEBPACK_IMPORTED_MODULE_26__home_projects_home_projects_component__["a" /* HomeProjectsComponent */],
                __WEBPACK_IMPORTED_MODULE_27__home_invitation_home_invitation_component__["a" /* HomeInvitationComponent */],
                __WEBPACK_IMPORTED_MODULE_28__home_static_home_static_component__["a" /* HomeStaticComponent */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_12__Services_Pictures_pictures_service__["a" /* PicturesService */],
                __WEBPACK_IMPORTED_MODULE_13__Services_Projects_projects_service__["a" /* ProjectsService */],
                __WEBPACK_IMPORTED_MODULE_14__Services_Profiles_profiles_service__["a" /* ProfilesService */],
                __WEBPACK_IMPORTED_MODULE_15__Services_Invitation_invitation_service__["a" /* InvitationService */],
                __WEBPACK_IMPORTED_MODULE_16__Services_Skills_skills_service__["a" /* SkillsService */],
                __WEBPACK_IMPORTED_MODULE_17__Services_Backoffice_backoffice_service__["a" /* BackofficeService */]
            ]
        })
    ], HomeModule);
    return HomeModule;
}());

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ "./src/app/Directives/Home/home.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeDirective; });
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

var HomeDirective = /** @class */ (function () {
    function HomeDirective(el) {
        this.el = el;
        this.nativeElement = el.nativeElement;
    }
    HomeDirective.prototype.rotateUp = function (sub_id) {
        var id = sub_id + '-img';
        this.nativeElement.querySelector(id).style.transform = 'rotate(180deg)';
    };
    HomeDirective.prototype.rotateDown = function (sub_id) {
        var id = sub_id + '-img';
        this.nativeElement.querySelector(id).style.transform = 'rotate(0)';
    };
    /* Box1 */
    HomeDirective.prototype.showBox1 = function () {
        if (this.nativeElement.querySelector('#whp1-b') &&
            this.nativeElement.querySelector('#whp1-b').style.display !== 'block') {
            this.rotateUp('#whp1');
            this.nativeElement.querySelector('#whp1-b').style.display = 'block';
            this.hideBox2();
        }
        else {
            this.hideBox1();
        }
    };
    HomeDirective.prototype.hideBox1 = function () {
        if (this.nativeElement.querySelector('#whp1-b')) {
            this.rotateDown('#whp1');
            this.nativeElement.querySelector('#whp1-b').style.display = 'none';
        }
    };
    /* Box2 */
    HomeDirective.prototype.showBox2 = function () {
        if (this.nativeElement.querySelector('#whp2-b') &&
            this.nativeElement.querySelector('#whp2-b').style.display !== 'block') {
            this.rotateUp('#whp2');
            this.nativeElement.querySelector('#whp2-b').style.display = 'block';
            this.hideBox1();
        }
        else {
            this.hideBox2();
        }
    };
    HomeDirective.prototype.hideBox2 = function () {
        if (this.nativeElement.querySelector('#whp2-b')) {
            this.rotateDown('#whp2');
            this.nativeElement.querySelector('#whp2-b').style.display = 'none';
        }
    };
    HomeDirective.prototype.onClick = function (event) {
        if (this.nativeElement.querySelector('#whp1') || this.nativeElement.querySelector('#whp2')) {
            if (this.nativeElement.querySelector('#whp1').contains(event.target)) {
                this.showBox1();
            }
            else if (this.nativeElement.querySelector('#whp2').contains(event.target)) {
                this.showBox2();
            }
            else {
                this.hideBox1();
                this.hideBox2();
            }
        }
    };
    HomeDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[homeDiv]',
            host: {
                '(document:click)': 'onClick($event)',
            },
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
    ], HomeDirective);
    return HomeDirective;
    var _a;
}());

//# sourceMappingURL=home.directive.js.map

/***/ }),

/***/ "./src/app/Routes/home.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HOME_ROUTES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Components_home_home_component__ = __webpack_require__("./src/app/Components/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_Authentication_authentication_service__ = __webpack_require__("./src/app/Services/Authentication/authentication.service.ts");

/* Components */

/* Librairies */
// import { MetaGuard } from '@ngx-meta/core';

var routes = [
    { path: '', canActivate: [__WEBPACK_IMPORTED_MODULE_2__Services_Authentication_authentication_service__["a" /* AuthenticationService */]], component: __WEBPACK_IMPORTED_MODULE_1__Components_home_home_component__["a" /* HomeComponent */]
        // data: {
        // 	meta: {
        // 		title 		: 'Wittycircle | Networking for the entrepreneurial world',
        // 		description	: 'We give exposure to all the ideas, projects and startups from around the world and connect them to the people they need, instantly',
        // 		'og:url' 	: 'https://www.wittycircle.com',
        // 		'og:image'	: 'http://res.cloudinary.com/dqpkpmrgk/image/upload/v1503093167/Share_banner_cover/Banner_Meta_Facebook-01.png',
        // 		'og:type'	: 'website',
        // 		'og:locale'	: 'en_US',
        // 	}
        // }
    }
];
var HOME_ROUTES = __WEBPACK_IMPORTED_MODULE_0__angular_router__["f" /* RouterModule */].forChild(routes);
//# sourceMappingURL=home.routes.js.map

/***/ })

});
//# sourceMappingURL=home.module.chunk.js.map