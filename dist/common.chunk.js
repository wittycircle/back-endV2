webpackJsonp(["common"],{

/***/ "./node_modules/angular2-froala-wysiwyg/editor/editor.directive.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FroalaEditorDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");


var FroalaEditorDirective = (function () {
    function FroalaEditorDirective(el) {
        // editor options
        this._opts = {
            immediateAngularModelUpdate: false,
            angularIgnoreAttrs: null
        };
        this.SPECIAL_TAGS = ['img', 'button', 'input', 'a'];
        this.INNER_HTML_ATTR = 'innerHTML';
        this._hasSpecialTag = false;
        this._listeningEvents = [];
        this._editorInitialized = false;
        this._oldModel = null;
        // Begin ControlValueAccesor methods.
        this.onChange = function (_) { };
        this.onTouched = function () { };
        // froalaModel directive as output: update model if editor contentChanged
        this.froalaModelChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        // froalaInit directive as output: send manual editor initialization
        this.froalaInit = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        var element = el.nativeElement;
        // check if the element is a special tag
        if (this.SPECIAL_TAGS.indexOf(element.tagName.toLowerCase()) != -1) {
            this._hasSpecialTag = true;
        }
        // jquery wrap and store element
        this._$element = $(element);
    }
    // Form model content changed.
    FroalaEditorDirective.prototype.writeValue = function (content) {
        this.updateEditor(content);
    };
    FroalaEditorDirective.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    FroalaEditorDirective.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    Object.defineProperty(FroalaEditorDirective.prototype, "froalaEditor", {
        // End ControlValueAccesor methods.
        // froalaEditor directive as input: store the editor options
        set: function (opts) {
            this._opts = opts || this._opts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FroalaEditorDirective.prototype, "froalaModel", {
        // froalaModel directive as input: store initial editor content
        set: function (content) {
            this.updateEditor(content);
        },
        enumerable: true,
        configurable: true
    });
    // Update editor with model contents.
    FroalaEditorDirective.prototype.updateEditor = function (content) {
        if (JSON.stringify(this._oldModel) == JSON.stringify(content)) {
            return;
        }
        this._model = content;
        if (this._editorInitialized) {
            this.setContent();
        }
    };
    // update model if editor contentChanged
    FroalaEditorDirective.prototype.updateModel = function () {
        var modelContent = null;
        if (this._hasSpecialTag) {
            var attributeNodes = this._$element[0].attributes;
            var attrs = {};
            for (var i = 0; i < attributeNodes.length; i++) {
                var attrName = attributeNodes[i].name;
                if (this._opts.angularIgnoreAttrs && this._opts.angularIgnoreAttrs.indexOf(attrName) != -1) {
                    continue;
                }
                attrs[attrName] = attributeNodes[i].value;
            }
            if (this._$element[0].innerHTML) {
                attrs[this.INNER_HTML_ATTR] = this._$element[0].innerHTML;
            }
            modelContent = attrs;
        }
        else {
            var returnedHtml = this._$element.froalaEditor('html.get');
            if (typeof returnedHtml === 'string') {
                modelContent = returnedHtml;
            }
        }
        this._oldModel = modelContent;
        // Update froalaModel.
        this.froalaModelChange.emit(modelContent);
        // Update form model.
        this.onChange(modelContent);
    };
    // register event on jquery element
    FroalaEditorDirective.prototype.registerEvent = function (element, eventName, callback) {
        if (!element || !eventName || !callback) {
            return;
        }
        this._listeningEvents.push(eventName);
        element.on(eventName, callback);
    };
    FroalaEditorDirective.prototype.initListeners = function () {
        var self = this;
        // bind contentChange and keyup event to froalaModel
        this.registerEvent(this._$element, 'froalaEditor.contentChanged', function () {
            setTimeout(function () {
                self.updateModel();
            }, 0);
        });
        if (this._opts.immediateAngularModelUpdate) {
            this.registerEvent(this._editor, 'keyup', function () {
                setTimeout(function () {
                    self.updateModel();
                }, 0);
            });
        }
    };
    // register events from editor options
    FroalaEditorDirective.prototype.registerFroalaEvents = function () {
        if (!this._opts.events) {
            return;
        }
        for (var eventName in this._opts.events) {
            if (this._opts.events.hasOwnProperty(eventName)) {
                this.registerEvent(this._$element, eventName, this._opts.events[eventName]);
            }
        }
    };
    FroalaEditorDirective.prototype.createEditor = function () {
        if (this._editorInitialized) {
            return;
        }
        this.setContent(true);
        // Registering events before initializing the editor will bind the initialized event correctly.
        this.registerFroalaEvents();
        // init editor
        this._editor = this._$element.froalaEditor(this._opts).data('froala.editor').$el;
        this.initListeners();
        this._editorInitialized = true;
    };
    FroalaEditorDirective.prototype.setHtml = function () {
        this._$element.froalaEditor('html.set', this._model || '', true);
        //This will reset the undo stack everytime the model changes externally. Can we fix this?
        this._$element.froalaEditor('undo.reset');
        this._$element.froalaEditor('undo.saveStep');
    };
    FroalaEditorDirective.prototype.setContent = function (firstTime) {
        if (firstTime === void 0) { firstTime = false; }
        var self = this;
        // set initial content
        if (this._model || this._model == '') {
            this._oldModel = this._model;
            if (this._hasSpecialTag) {
                var tags = this._model;
                // add tags on element
                if (tags) {
                    for (var attr in tags) {
                        if (tags.hasOwnProperty(attr) && attr != this.INNER_HTML_ATTR) {
                            this._$element.attr(attr, tags[attr]);
                        }
                    }
                    if (tags.hasOwnProperty(this.INNER_HTML_ATTR)) {
                        this._$element[0].innerHTML = tags[this.INNER_HTML_ATTR];
                    }
                }
            }
            else {
                if (firstTime) {
                    this.registerEvent(this._$element, 'froalaEditor.initialized', function () {
                        self.setHtml();
                    });
                }
                else {
                    self.setHtml();
                }
            }
        }
    };
    FroalaEditorDirective.prototype.destroyEditor = function () {
        if (this._editorInitialized) {
            this._$element.off(this._listeningEvents.join(" "));
            this._editor.off('keyup');
            this._$element.froalaEditor('destroy');
            this._listeningEvents.length = 0;
            this._editorInitialized = false;
        }
    };
    FroalaEditorDirective.prototype.getEditor = function () {
        if (this._$element) {
            return this._$element.froalaEditor.bind(this._$element);
        }
        return null;
    };
    // send manual editor initialization
    FroalaEditorDirective.prototype.generateManualController = function () {
        var self = this;
        var controls = {
            initialize: this.createEditor.bind(this),
            destroy: this.destroyEditor.bind(this),
            getEditor: this.getEditor.bind(this),
        };
        this.froalaInit.emit(controls);
    };
    // TODO not sure if ngOnInit is executed after @inputs
    FroalaEditorDirective.prototype.ngOnInit = function () {
        // check if output froalaInit is present. Maybe observers is private and should not be used?? TODO how to better test that an output directive is present.
        if (!this.froalaInit.observers.length) {
            this.createEditor();
        }
        else {
            this.generateManualController();
        }
    };
    FroalaEditorDirective.prototype.ngOnDestroy = function () {
        this.destroyEditor();
    };
    FroalaEditorDirective.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                    selector: '[froalaEditor]',
                    providers: [{
                            provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* NG_VALUE_ACCESSOR */], useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return FroalaEditorDirective; }),
                            multi: true
                        }]
                },] },
    ];
    /** @nocollapse */
    FroalaEditorDirective.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
    ]; };
    FroalaEditorDirective.propDecorators = {
        'froalaEditor': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'froalaModel': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'froalaModelChange': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
        'froalaInit': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    };
    return FroalaEditorDirective;
}());
//# sourceMappingURL=editor.directive.js.map

/***/ }),

/***/ "./node_modules/angular2-froala-wysiwyg/editor/editor.module.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FroalaEditorModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_directive__ = __webpack_require__("./node_modules/angular2-froala-wysiwyg/editor/editor.directive.js");


var FroalaEditorModule = (function () {
    function FroalaEditorModule() {
    }
    FroalaEditorModule.forRoot = function () {
        return { ngModule: FroalaEditorModule, providers: [] };
    };
    FroalaEditorModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                    declarations: [__WEBPACK_IMPORTED_MODULE_1__editor_directive__["a" /* FroalaEditorDirective */]],
                    exports: [__WEBPACK_IMPORTED_MODULE_1__editor_directive__["a" /* FroalaEditorDirective */]]
                },] },
    ];
    /** @nocollapse */
    FroalaEditorModule.ctorParameters = function () { return []; };
    return FroalaEditorModule;
}());
//# sourceMappingURL=editor.module.js.map

/***/ }),

/***/ "./node_modules/angular2-froala-wysiwyg/editor/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__editor_directive__ = __webpack_require__("./node_modules/angular2-froala-wysiwyg/editor/editor.directive.js");
/* unused harmony reexport FroalaEditorDirective */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_module__ = __webpack_require__("./node_modules/angular2-froala-wysiwyg/editor/editor.module.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__editor_module__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/angular2-froala-wysiwyg/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export FERootModule */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor__ = __webpack_require__("./node_modules/angular2-froala-wysiwyg/editor/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view__ = __webpack_require__("./node_modules/angular2-froala-wysiwyg/view/index.js");
/* unused harmony reexport FroalaEditorDirective */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__editor__["a"]; });
/* unused harmony reexport FroalaViewDirective */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__view__["a"]; });





var MODULES = [
    __WEBPACK_IMPORTED_MODULE_1__editor__["a" /* FroalaEditorModule */],
    __WEBPACK_IMPORTED_MODULE_2__view__["a" /* FroalaViewModule */]
];
var FERootModule = (function () {
    function FERootModule() {
    }
    FERootModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                    imports: [
                        __WEBPACK_IMPORTED_MODULE_1__editor__["a" /* FroalaEditorModule */].forRoot(),
                        __WEBPACK_IMPORTED_MODULE_2__view__["a" /* FroalaViewModule */].forRoot()
                    ],
                    exports: MODULES
                },] },
    ];
    /** @nocollapse */
    FERootModule.ctorParameters = function () { return []; };
    return FERootModule;
}());
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/angular2-froala-wysiwyg/view/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__view_directive__ = __webpack_require__("./node_modules/angular2-froala-wysiwyg/view/view.directive.js");
/* unused harmony reexport FroalaViewDirective */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view_module__ = __webpack_require__("./node_modules/angular2-froala-wysiwyg/view/view.module.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__view_module__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/angular2-froala-wysiwyg/view/view.directive.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FroalaViewDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");

var FroalaViewDirective = (function () {
    function FroalaViewDirective(renderer, element) {
        this.renderer = renderer;
        this._element = element.nativeElement;
    }
    Object.defineProperty(FroalaViewDirective.prototype, "froalaView", {
        // update content model as it comes
        set: function (content) {
            this._element.innerHTML = content;
        },
        enumerable: true,
        configurable: true
    });
    FroalaViewDirective.prototype.ngAfterViewInit = function () {
        this.renderer.setElementClass(this._element, "fr-view", true);
    };
    FroalaViewDirective.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                    selector: '[froalaView]'
                },] },
    ];
    /** @nocollapse */
    FroalaViewDirective.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
    ]; };
    FroalaViewDirective.propDecorators = {
        'froalaView': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    };
    return FroalaViewDirective;
}());
//# sourceMappingURL=view.directive.js.map

/***/ }),

/***/ "./node_modules/angular2-froala-wysiwyg/view/view.module.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FroalaViewModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view_directive__ = __webpack_require__("./node_modules/angular2-froala-wysiwyg/view/view.directive.js");


var FroalaViewModule = (function () {
    function FroalaViewModule() {
    }
    FroalaViewModule.forRoot = function () {
        return { ngModule: FroalaViewModule, providers: [] };
    };
    FroalaViewModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                    declarations: [__WEBPACK_IMPORTED_MODULE_1__view_directive__["a" /* FroalaViewDirective */]],
                    exports: [__WEBPACK_IMPORTED_MODULE_1__view_directive__["a" /* FroalaViewDirective */]]
                },] },
    ];
    /** @nocollapse */
    FroalaViewModule.ctorParameters = function () { return []; };
    return FroalaViewModule;
}());
//# sourceMappingURL=view.module.js.map

/***/ }),

/***/ "./node_modules/ng2-cloudinary/dist/esm/src/cloudinary-image.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CloudinaryImageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cloudinary_transforms_class__ = __webpack_require__("./node_modules/ng2-cloudinary/dist/esm/src/cloudinary-transforms.class.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cloudinary_image_service__ = __webpack_require__("./node_modules/ng2-cloudinary/dist/esm/src/cloudinary-image.service.js");



var CloudinaryImageComponent = (function () {
    function CloudinaryImageComponent(_imageService) {
        this._imageService = _imageService;
        this.imageUrl = '';
        this.transforms = new __WEBPACK_IMPORTED_MODULE_1__cloudinary_transforms_class__["a" /* CloudinaryTransforms */]();
    }
    CloudinaryImageComponent.prototype.ngOnChanges = function (changes) {
        if (this.publicId && this.cloudName) {
            var resourceType = 'image';
            var type = this.type || 'upload';
            this.imageUrl = this._imageService.getImageUrl(this.publicId, this.cloudName, resourceType, type, this.transforms);
        }
        else {
            this.imageUrl = '';
        }
    };
    Object.defineProperty(CloudinaryImageComponent.prototype, "width", {
        set: function (value) {
            this.transforms.width = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryImageComponent.prototype, "height", {
        set: function (value) {
            this.transforms.height = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryImageComponent.prototype, "crop", {
        set: function (value) {
            this.transforms.crop = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryImageComponent.prototype, "aspect_ratio", {
        set: function (value) {
            this.transforms.aspect_ratio = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryImageComponent.prototype, "gravity", {
        set: function (value) {
            this.transforms.gravity = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryImageComponent.prototype, "zoom", {
        set: function (value) {
            this.transforms.zoom = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryImageComponent.prototype, "x", {
        set: function (value) {
            this.transforms.x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryImageComponent.prototype, "y", {
        set: function (value) {
            this.transforms.y = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryImageComponent.prototype, "format", {
        set: function (value) {
            this.transforms.format = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryImageComponent.prototype, "quality", {
        set: function (value) {
            this.transforms.quality = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryImageComponent.prototype, "radius", {
        set: function (value) {
            this.transforms.radius = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryImageComponent.prototype, "angle", {
        set: function (value) {
            this.transforms.angle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryImageComponent.prototype, "effect", {
        set: function (value) {
            this.transforms.effect = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryImageComponent.prototype, "opacity", {
        set: function (value) {
            this.transforms.opacity = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryImageComponent.prototype, "border", {
        set: function (value) {
            this.transforms.border = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryImageComponent.prototype, "background", {
        set: function (value) {
            this.transforms.background = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryImageComponent.prototype, "overlay", {
        set: function (value) {
            this.transforms.overlay = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryImageComponent.prototype, "underlay", {
        set: function (value) {
            this.transforms.underlay = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryImageComponent.prototype, "default_image", {
        set: function (value) {
            this.transforms.default_image = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryImageComponent.prototype, "delay", {
        set: function (value) {
            this.transforms.delay = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryImageComponent.prototype, "color", {
        set: function (value) {
            this.transforms.color = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryImageComponent.prototype, "dpr", {
        set: function (value) {
            this.transforms.dpr = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryImageComponent.prototype, "page", {
        set: function (value) {
            this.transforms.page = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryImageComponent.prototype, "density", {
        set: function (value) {
            this.transforms.density = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryImageComponent.prototype, "flags", {
        set: function (value) {
            this.transforms.flags = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryImageComponent.prototype, "transformation", {
        set: function (value) {
            this.transforms.transformation = value;
        },
        enumerable: true,
        configurable: true
    });
    CloudinaryImageComponent.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                    selector: 'cl-image',
                    template: "\n    <img [src]=\"imageUrl\" [title]=\"title ||\u00A0''\" [alt]=\"alt ||\u00A0''\">\n  "
                },] },
    ];
    /** @nocollapse */
    CloudinaryImageComponent.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_2__cloudinary_image_service__["a" /* CloudinaryImageService */], },
    ]; };
    CloudinaryImageComponent.propDecorators = {
        'publicId': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['public-id',] },],
        'cloudName': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['cloud-name',] },],
        'type': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'title': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'alt': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'width': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'height': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'crop': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'aspect_ratio': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['aspect-ratio',] },],
        'gravity': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'zoom': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'x': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'y': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'format': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'quality': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'radius': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'angle': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'effect': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'opacity': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'border': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'background': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'overlay': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'underlay': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'default_image': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['default-image',] },],
        'delay': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'color': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'dpr': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'page': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'density': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'flags': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'transformation': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    };
    return CloudinaryImageComponent;
}());
//# sourceMappingURL=cloudinary-image.component.js.map

/***/ }),

/***/ "./node_modules/ng2-cloudinary/dist/esm/src/cloudinary-image.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CloudinaryImageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");

var CLOUDINARY_URL = 'https://res.cloudinary.com/';
var CloudinaryImageService = (function () {
    function CloudinaryImageService() {
    }
    CloudinaryImageService.prototype.getImageUrl = function (publicId, cloudName, resourceType, type, transforms) {
        return CLOUDINARY_URL +
            cloudName + '/' +
            resourceType + '/' +
            type + '/' +
            transforms.toUrlSegment() +
            publicId + '.' + (transforms.format || 'jpg');
    };
    CloudinaryImageService.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    CloudinaryImageService.ctorParameters = function () { return []; };
    return CloudinaryImageService;
}());
//# sourceMappingURL=cloudinary-image.service.js.map

/***/ }),

/***/ "./node_modules/ng2-cloudinary/dist/esm/src/cloudinary-options.class.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CloudinaryOptions; });
var CloudinaryOptions = (function () {
    function CloudinaryOptions(opts) {
        this.cloudName = opts.cloudName;
        this.uploadPreset = opts.uploadPreset;
        this.resourceType = opts.resourceType || 'auto';
        this.type = opts.type || 'upload';
        this.autoUpload = !!opts.autoUpload || false;
    }
    return CloudinaryOptions;
}());
//# sourceMappingURL=cloudinary-options.class.js.map

/***/ }),

/***/ "./node_modules/ng2-cloudinary/dist/esm/src/cloudinary-transforms.class.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CloudinaryTransforms; });
var CloudinaryTransforms = (function () {
    function CloudinaryTransforms() {
    }
    CloudinaryTransforms.prototype.toUrlSegment = function () {
        var transformSegment = '';
        //Loop on all transformations
        for (var key in this) {
            if (this.hasOwnProperty(key) && key !== 'format') {
                transformSegment += this.toPropertySegment(transformSegment, key, this[key]);
            }
        }
        if (transformSegment.length > 0) {
            transformSegment += '/';
        }
        return transformSegment;
    };
    CloudinaryTransforms.prototype.toPropertySegment = function (segment, transformation, value) {
        var newSegment = '';
        if (transformation && value) {
            if (segment.length > 0) {
                newSegment += ',';
            }
            newSegment += CloudinaryTransforms.URL_PARAMS[transformation] + '_' + value;
        }
        return newSegment;
    };
    CloudinaryTransforms.URL_PARAMS = {
        'width': 'w',
        'height': 'h',
        'crop': 'c',
        'aspect_ratio': 'ar',
        'gravity': 'g',
        'zoom': 'z',
        'x': 'x',
        'y': 'y',
        'quality': 'q',
        'radius': 'r',
        'angle': 'a',
        'effect': 'e',
        'opacity': 'o',
        'border': 'bo',
        'background': 'b',
        'overlay': 'l',
        'underlay': 'u',
        'default_image': 'd',
        'delay': 'dl',
        'color': 'co',
        'dpr': 'dpr',
        'page': 'pg',
        'density': 'dn',
        'flags': 'fl',
        'transformation': 't'
    };
    return CloudinaryTransforms;
}());
//# sourceMappingURL=cloudinary-transforms.class.js.map

/***/ }),

/***/ "./node_modules/ng2-cloudinary/dist/esm/src/cloudinary-uploader.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CloudinaryUploader", function() { return CloudinaryUploader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ng2_file_upload__ = __webpack_require__("./node_modules/ng2-cloudinary/node_modules/ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ng2_file_upload__);
/* unused harmony namespace reexport */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


var UPLOAD_ENDPOINT = 'https://api.cloudinary.com/v1_1/';
var CloudinaryUploader = (function (_super) {
    __extends(CloudinaryUploader, _super);
    function CloudinaryUploader(opts) {
        _super.call(this, {});
        this._cloudName = opts.cloudName;
        this._resourceType = opts.resourceType || 'auto';
        this._type = opts.type || 'upload';
        this._propagateUploadUrl();
        this.uploadPreset = opts.uploadPreset;
        this.autoUpload = opts.autoUpload;
    }
    CloudinaryUploader.prototype.onBuildItemForm = function (fileItem, form) {
        form.append('upload_preset', this.uploadPreset);
        // Force the file uploader to never use app credentials
        fileItem.withCredentials = false;
        return { fileItem: fileItem, form: form };
    };
    CloudinaryUploader.prototype._propagateUploadUrl = function () {
        this.options.url = "" + UPLOAD_ENDPOINT + this.cloudName + "/" + this.resourceType + "/" + this.type;
    };
    Object.defineProperty(CloudinaryUploader.prototype, "cloudName", {
        get: function () {
            return this._cloudName;
        },
        set: function (value) {
            this._cloudName = value;
            this._propagateUploadUrl();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryUploader.prototype, "resourceType", {
        get: function () {
            return this._resourceType;
        },
        set: function (value) {
            this._resourceType = value;
            this._propagateUploadUrl();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloudinaryUploader.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
            this._propagateUploadUrl();
        },
        enumerable: true,
        configurable: true
    });
    return CloudinaryUploader;
}(__WEBPACK_IMPORTED_MODULE_0_ng2_file_upload__["FileUploader"]));
//# sourceMappingURL=cloudinary-uploader.service.js.map

/***/ }),

/***/ "./node_modules/ng2-cloudinary/dist/esm/src/cloudinary.module.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ng2CloudinaryModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_file_upload__ = __webpack_require__("./node_modules/ng2-cloudinary/node_modules/ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cloudinary_image_component__ = __webpack_require__("./node_modules/ng2-cloudinary/dist/esm/src/cloudinary-image.component.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cloudinary_image_service__ = __webpack_require__("./node_modules/ng2-cloudinary/dist/esm/src/cloudinary-image.service.js");





var Ng2CloudinaryModule = (function () {
    function Ng2CloudinaryModule() {
    }
    Ng2CloudinaryModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                    declarations: [
                        __WEBPACK_IMPORTED_MODULE_3__cloudinary_image_component__["a" /* CloudinaryImageComponent */],
                    ],
                    imports: [
                        __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                        __WEBPACK_IMPORTED_MODULE_2_ng2_file_upload__["FileUploadModule"]
                    ],
                    exports: [
                        __WEBPACK_IMPORTED_MODULE_3__cloudinary_image_component__["a" /* CloudinaryImageComponent */],
                    ],
                    providers: [
                        __WEBPACK_IMPORTED_MODULE_4__cloudinary_image_service__["a" /* CloudinaryImageService */]
                    ]
                },] },
    ];
    /** @nocollapse */
    Ng2CloudinaryModule.ctorParameters = function () { return []; };
    return Ng2CloudinaryModule;
}());
//# sourceMappingURL=cloudinary.module.js.map

/***/ }),

/***/ "./node_modules/ng2-cloudinary/dist/esm/src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cloudinary_module__ = __webpack_require__("./node_modules/ng2-cloudinary/dist/esm/src/cloudinary.module.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__cloudinary_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cloudinary_options_class__ = __webpack_require__("./node_modules/ng2-cloudinary/dist/esm/src/cloudinary-options.class.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__cloudinary_options_class__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cloudinary_transforms_class__ = __webpack_require__("./node_modules/ng2-cloudinary/dist/esm/src/cloudinary-transforms.class.js");
/* unused harmony reexport CloudinaryTransforms */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cloudinary_uploader_service__ = __webpack_require__("./node_modules/ng2-cloudinary/dist/esm/src/cloudinary-uploader.service.js");
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_3__cloudinary_uploader_service__, "CloudinaryUploader")) __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__cloudinary_uploader_service__["CloudinaryUploader"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cloudinary_image_service__ = __webpack_require__("./node_modules/ng2-cloudinary/dist/esm/src/cloudinary-image.service.js");
/* unused harmony reexport CloudinaryImageService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cloudinary_image_component__ = __webpack_require__("./node_modules/ng2-cloudinary/dist/esm/src/cloudinary-image.component.js");
/* unused harmony reexport CloudinaryImageComponent */






//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ng2-cloudinary/node_modules/ng2-file-upload/file-upload/file-drop.directive.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var FileDropDirective = (function () {
    function FileDropDirective(element) {
        this.fileOver = new core_1.EventEmitter();
        this.onFileDrop = new core_1.EventEmitter();
        this.element = element;
    }
    FileDropDirective.prototype.getOptions = function () {
        return this.uploader.options;
    };
    FileDropDirective.prototype.getFilters = function () {
        return {};
    };
    FileDropDirective.prototype.onDrop = function (event) {
        var transfer = this._getTransfer(event);
        if (!transfer) {
            return;
        }
        var options = this.getOptions();
        var filters = this.getFilters();
        this._preventAndStop(event);
        this.uploader.addToQueue(transfer.files, options, filters);
        this.fileOver.emit(false);
        this.onFileDrop.emit(transfer.files);
    };
    FileDropDirective.prototype.onDragOver = function (event) {
        var transfer = this._getTransfer(event);
        if (!this._haveFiles(transfer.types)) {
            return;
        }
        transfer.dropEffect = 'copy';
        this._preventAndStop(event);
        this.fileOver.emit(true);
    };
    FileDropDirective.prototype.onDragLeave = function (event) {
        if (event.currentTarget === this.element[0]) {
            return;
        }
        this._preventAndStop(event);
        this.fileOver.emit(false);
    };
    FileDropDirective.prototype._getTransfer = function (event) {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer; // jQuery fix;
    };
    FileDropDirective.prototype._preventAndStop = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    FileDropDirective.prototype._haveFiles = function (types) {
        if (!types) {
            return false;
        }
        if (types.indexOf) {
            return types.indexOf('Files') !== -1;
        }
        else if (types.contains) {
            return types.contains('Files');
        }
        else {
            return false;
        }
    };
    /*
     _addOverClass(item:any):any {
     item.addOverClass();
     }
  
     _removeOverClass(item:any):any {
     item.removeOverClass();
     }*/
    FileDropDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[ng2FileDrop]' },] },
    ];
    /** @nocollapse */
    FileDropDirective.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    FileDropDirective.propDecorators = {
        'uploader': [{ type: core_1.Input },],
        'fileOver': [{ type: core_1.Output },],
        'onFileDrop': [{ type: core_1.Output },],
        'onDrop': [{ type: core_1.HostListener, args: ['drop', ['$event'],] },],
        'onDragOver': [{ type: core_1.HostListener, args: ['dragover', ['$event'],] },],
        'onDragLeave': [{ type: core_1.HostListener, args: ['dragleave', ['$event'],] },],
    };
    return FileDropDirective;
}());
exports.FileDropDirective = FileDropDirective;


/***/ }),

/***/ "./node_modules/ng2-cloudinary/node_modules/ng2-file-upload/file-upload/file-item.class.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var file_like_object_class_1 = __webpack_require__("./node_modules/ng2-cloudinary/node_modules/ng2-file-upload/file-upload/file-like-object.class.js");
var FileItem = (function () {
    function FileItem(uploader, some, options) {
        this.url = '/';
        this.headers = [];
        this.withCredentials = true;
        this.formData = [];
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.index = void 0;
        this.uploader = uploader;
        this.some = some;
        this.options = options;
        this.file = new file_like_object_class_1.FileLikeObject(some);
        this._file = some;
        if (uploader.options) {
            this.method = uploader.options.method || 'POST';
            this.alias = uploader.options.itemAlias || 'file';
        }
        this.url = uploader.options.url;
    }
    FileItem.prototype.upload = function () {
        try {
            this.uploader.uploadItem(this);
        }
        catch (e) {
            this.uploader._onCompleteItem(this, '', 0, {});
            this.uploader._onErrorItem(this, '', 0, {});
        }
    };
    FileItem.prototype.cancel = function () {
        this.uploader.cancelItem(this);
    };
    FileItem.prototype.remove = function () {
        this.uploader.removeFromQueue(this);
    };
    FileItem.prototype.onBeforeUpload = function () {
        return void 0;
    };
    FileItem.prototype.onBuildForm = function (form) {
        return { form: form };
    };
    FileItem.prototype.onProgress = function (progress) {
        return { progress: progress };
    };
    FileItem.prototype.onSuccess = function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    FileItem.prototype.onError = function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    FileItem.prototype.onCancel = function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    FileItem.prototype.onComplete = function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    FileItem.prototype._onBeforeUpload = function () {
        this.isReady = true;
        this.isUploading = true;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.onBeforeUpload();
    };
    FileItem.prototype._onBuildForm = function (form) {
        this.onBuildForm(form);
    };
    FileItem.prototype._onProgress = function (progress) {
        this.progress = progress;
        this.onProgress(progress);
    };
    FileItem.prototype._onSuccess = function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = true;
        this.isCancel = false;
        this.isError = false;
        this.progress = 100;
        this.index = void 0;
        this.onSuccess(response, status, headers);
    };
    FileItem.prototype._onError = function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = true;
        this.progress = 0;
        this.index = void 0;
        this.onError(response, status, headers);
    };
    FileItem.prototype._onCancel = function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = true;
        this.isError = false;
        this.progress = 0;
        this.index = void 0;
        this.onCancel(response, status, headers);
    };
    FileItem.prototype._onComplete = function (response, status, headers) {
        this.onComplete(response, status, headers);
        if (this.uploader.options.removeAfterUpload) {
            this.remove();
        }
    };
    FileItem.prototype._prepareToUploading = function () {
        this.index = this.index || ++this.uploader._nextIndex;
        this.isReady = true;
    };
    return FileItem;
}());
exports.FileItem = FileItem;


/***/ }),

/***/ "./node_modules/ng2-cloudinary/node_modules/ng2-file-upload/file-upload/file-like-object.class.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isElement(node) {
    return !!(node && (node.nodeName || node.prop && node.attr && node.find));
}
var FileLikeObject = (function () {
    function FileLikeObject(fileOrInput) {
        var isInput = isElement(fileOrInput);
        var fakePathOrObject = isInput ? fileOrInput.value : fileOrInput;
        var postfix = typeof fakePathOrObject === 'string' ? 'FakePath' : 'Object';
        var method = '_createFrom' + postfix;
        this[method](fakePathOrObject);
    }
    FileLikeObject.prototype._createFromFakePath = function (path) {
        this.lastModifiedDate = void 0;
        this.size = void 0;
        this.type = 'like/' + path.slice(path.lastIndexOf('.') + 1).toLowerCase();
        this.name = path.slice(path.lastIndexOf('/') + path.lastIndexOf('\\') + 2);
    };
    FileLikeObject.prototype._createFromObject = function (object) {
        // this.lastModifiedDate = copy(object.lastModifiedDate);
        this.size = object.size;
        this.type = object.type;
        this.name = object.name;
    };
    return FileLikeObject;
}());
exports.FileLikeObject = FileLikeObject;


/***/ }),

/***/ "./node_modules/ng2-cloudinary/node_modules/ng2-file-upload/file-upload/file-select.directive.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
// todo: filters
var FileSelectDirective = (function () {
    function FileSelectDirective(element) {
        this.element = element;
    }
    FileSelectDirective.prototype.getOptions = function () {
        return this.uploader.options;
    };
    FileSelectDirective.prototype.getFilters = function () {
        return void 0;
    };
    FileSelectDirective.prototype.isEmptyAfterSelection = function () {
        return !!this.element.nativeElement.attributes.multiple;
    };
    FileSelectDirective.prototype.onChange = function () {
        // let files = this.uploader.isHTML5 ? this.element.nativeElement[0].files : this.element.nativeElement[0];
        var files = this.element.nativeElement.files;
        var options = this.getOptions();
        var filters = this.getFilters();
        // if(!this.uploader.isHTML5) this.destroy();
        this.uploader.addToQueue(files, options, filters);
        if (this.isEmptyAfterSelection()) {
        }
    };
    FileSelectDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[ng2FileSelect]' },] },
    ];
    /** @nocollapse */
    FileSelectDirective.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    FileSelectDirective.propDecorators = {
        'uploader': [{ type: core_1.Input },],
        'onChange': [{ type: core_1.HostListener, args: ['change',] },],
    };
    return FileSelectDirective;
}());
exports.FileSelectDirective = FileSelectDirective;


/***/ }),

/***/ "./node_modules/ng2-cloudinary/node_modules/ng2-file-upload/file-upload/file-type.class.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var FileType = (function () {
    function FileType() {
    }
    FileType.getMimeClass = function (file) {
        var mimeClass = 'application';
        if (this.mime_psd.indexOf(file.type) !== -1) {
            mimeClass = 'image';
        }
        else if (file.type.match('image.*')) {
            mimeClass = 'image';
        }
        else if (file.type.match('video.*')) {
            mimeClass = 'video';
        }
        else if (file.type.match('audio.*')) {
            mimeClass = 'audio';
        }
        else if (file.type === 'application/pdf') {
            mimeClass = 'pdf';
        }
        else if (this.mime_compress.indexOf(file.type) !== -1) {
            mimeClass = 'compress';
        }
        else if (this.mime_doc.indexOf(file.type) !== -1) {
            mimeClass = 'doc';
        }
        else if (this.mime_xsl.indexOf(file.type) !== -1) {
            mimeClass = 'xls';
        }
        else if (this.mime_ppt.indexOf(file.type) !== -1) {
            mimeClass = 'ppt';
        }
        if (mimeClass === 'application') {
            mimeClass = this.fileTypeDetection(file.name);
        }
        return mimeClass;
    };
    FileType.fileTypeDetection = function (inputFilename) {
        var types = {
            'jpg': 'image',
            'jpeg': 'image',
            'tif': 'image',
            'psd': 'image',
            'bmp': 'image',
            'png': 'image',
            'nef': 'image',
            'tiff': 'image',
            'cr2': 'image',
            'dwg': 'image',
            'cdr': 'image',
            'ai': 'image',
            'indd': 'image',
            'pin': 'image',
            'cdp': 'image',
            'skp': 'image',
            'stp': 'image',
            '3dm': 'image',
            'mp3': 'audio',
            'wav': 'audio',
            'wma': 'audio',
            'mod': 'audio',
            'm4a': 'audio',
            'compress': 'compress',
            'rar': 'compress',
            '7z': 'compress',
            'lz': 'compress',
            'z01': 'compress',
            'pdf': 'pdf',
            'xls': 'xls',
            'xlsx': 'xls',
            'ods': 'xls',
            'mp4': 'video',
            'avi': 'video',
            'wmv': 'video',
            'mpg': 'video',
            'mts': 'video',
            'flv': 'video',
            '3gp': 'video',
            'vob': 'video',
            'm4v': 'video',
            'mpeg': 'video',
            'm2ts': 'video',
            'mov': 'video',
            'doc': 'doc',
            'docx': 'doc',
            'eps': 'doc',
            'txt': 'doc',
            'odt': 'doc',
            'rtf': 'doc',
            'ppt': 'ppt',
            'pptx': 'ppt',
            'pps': 'ppt',
            'ppsx': 'ppt',
            'odp': 'ppt'
        };
        var chunks = inputFilename.split('.');
        if (chunks.length < 2) {
            return 'application';
        }
        var extension = chunks[chunks.length - 1].toLowerCase();
        if (types[extension] === undefined) {
            return 'application';
        }
        else {
            return types[extension];
        }
    };
    /*  MS office  */
    FileType.mime_doc = [
        'application/msword',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
        'application/vnd.ms-word.document.macroEnabled.12',
        'application/vnd.ms-word.template.macroEnabled.12'
    ];
    FileType.mime_xsl = [
        'application/vnd.ms-excel',
        'application/vnd.ms-excel',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
        'application/vnd.ms-excel.sheet.macroEnabled.12',
        'application/vnd.ms-excel.template.macroEnabled.12',
        'application/vnd.ms-excel.addin.macroEnabled.12',
        'application/vnd.ms-excel.sheet.binary.macroEnabled.12'
    ];
    FileType.mime_ppt = [
        'application/vnd.ms-powerpoint',
        'application/vnd.ms-powerpoint',
        'application/vnd.ms-powerpoint',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/vnd.openxmlformats-officedocument.presentationml.template',
        'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
        'application/vnd.ms-powerpoint.addin.macroEnabled.12',
        'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
        'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
        'application/vnd.ms-powerpoint.slideshow.macroEnabled.12'
    ];
    /* PSD */
    FileType.mime_psd = [
        'image/photoshop',
        'image/x-photoshop',
        'image/psd',
        'application/photoshop',
        'application/psd',
        'zz-application/zz-winassoc-psd'
    ];
    /* Compressed files */
    FileType.mime_compress = [
        'application/x-gtar',
        'application/x-gcompress',
        'application/compress',
        'application/x-tar',
        'application/x-rar-compressed',
        'application/octet-stream'
    ];
    return FileType;
}());
exports.FileType = FileType;


/***/ }),

/***/ "./node_modules/ng2-cloudinary/node_modules/ng2-file-upload/file-upload/file-upload.module.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var common_1 = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var file_drop_directive_1 = __webpack_require__("./node_modules/ng2-cloudinary/node_modules/ng2-file-upload/file-upload/file-drop.directive.js");
var file_select_directive_1 = __webpack_require__("./node_modules/ng2-cloudinary/node_modules/ng2-file-upload/file-upload/file-select.directive.js");
var FileUploadModule = (function () {
    function FileUploadModule() {
    }
    FileUploadModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    declarations: [file_drop_directive_1.FileDropDirective, file_select_directive_1.FileSelectDirective],
                    exports: [file_drop_directive_1.FileDropDirective, file_select_directive_1.FileSelectDirective]
                },] },
    ];
    /** @nocollapse */
    FileUploadModule.ctorParameters = [];
    return FileUploadModule;
}());
exports.FileUploadModule = FileUploadModule;


/***/ }),

/***/ "./node_modules/ng2-cloudinary/node_modules/ng2-file-upload/file-upload/file-uploader.class.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var file_like_object_class_1 = __webpack_require__("./node_modules/ng2-cloudinary/node_modules/ng2-file-upload/file-upload/file-like-object.class.js");
var file_item_class_1 = __webpack_require__("./node_modules/ng2-cloudinary/node_modules/ng2-file-upload/file-upload/file-item.class.js");
var file_type_class_1 = __webpack_require__("./node_modules/ng2-cloudinary/node_modules/ng2-file-upload/file-upload/file-type.class.js");
function isFile(value) {
    return (File && value instanceof File);
}
var FileUploader = (function () {
    function FileUploader(options) {
        this.isUploading = false;
        this.queue = [];
        this.progress = 0;
        this._nextIndex = 0;
        this.options = {
            autoUpload: false,
            isHTML5: true,
            filters: [],
            removeAfterUpload: false,
            disableMultipart: false
        };
        this.setOptions(options);
    }
    FileUploader.prototype.setOptions = function (options) {
        this.options = Object.assign(this.options, options);
        this.authToken = options.authToken;
        this.authTokenHeader = options.authTokenHeader || 'Authorization';
        this.autoUpload = options.autoUpload;
        this.options.filters.unshift({ name: 'queueLimit', fn: this._queueLimitFilter });
        if (this.options.maxFileSize) {
            this.options.filters.unshift({ name: 'fileSize', fn: this._fileSizeFilter });
        }
        if (this.options.allowedFileType) {
            this.options.filters.unshift({ name: 'fileType', fn: this._fileTypeFilter });
        }
        if (this.options.allowedMimeType) {
            this.options.filters.unshift({ name: 'mimeType', fn: this._mimeTypeFilter });
        }
        for (var i = 0; i < this.queue.length; i++) {
            this.queue[i].url = this.options.url;
        }
        // this.options.filters.unshift({name: 'folder', fn: this._folderFilter});
    };
    FileUploader.prototype.addToQueue = function (files, options, filters) {
        var _this = this;
        var list = [];
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            list.push(file);
        }
        var arrayOfFilters = this._getFilters(filters);
        var count = this.queue.length;
        var addedFileItems = [];
        list.map(function (some) {
            if (!options) {
                options = _this.options;
            }
            var temp = new file_like_object_class_1.FileLikeObject(some);
            if (_this._isValidFile(temp, arrayOfFilters, options)) {
                var fileItem = new file_item_class_1.FileItem(_this, some, options);
                addedFileItems.push(fileItem);
                _this.queue.push(fileItem);
                _this._onAfterAddingFile(fileItem);
            }
            else {
                var filter = arrayOfFilters[_this._failFilterIndex];
                _this._onWhenAddingFileFailed(temp, filter, options);
            }
        });
        if (this.queue.length !== count) {
            this._onAfterAddingAll(addedFileItems);
            this.progress = this._getTotalProgress();
        }
        this._render();
        if (this.options.autoUpload) {
            this.uploadAll();
        }
    };
    FileUploader.prototype.removeFromQueue = function (value) {
        var index = this.getIndexOfItem(value);
        var item = this.queue[index];
        if (item.isUploading) {
            item.cancel();
        }
        this.queue.splice(index, 1);
        this.progress = this._getTotalProgress();
    };
    FileUploader.prototype.clearQueue = function () {
        while (this.queue.length) {
            this.queue[0].remove();
        }
        this.progress = 0;
    };
    FileUploader.prototype.uploadItem = function (value) {
        var index = this.getIndexOfItem(value);
        var item = this.queue[index];
        var transport = this.options.isHTML5 ? '_xhrTransport' : '_iframeTransport';
        item._prepareToUploading();
        if (this.isUploading) {
            return;
        }
        this.isUploading = true;
        this[transport](item);
    };
    FileUploader.prototype.cancelItem = function (value) {
        var index = this.getIndexOfItem(value);
        var item = this.queue[index];
        var prop = this.options.isHTML5 ? item._xhr : item._form;
        if (item && item.isUploading) {
            prop.abort();
        }
    };
    FileUploader.prototype.uploadAll = function () {
        var items = this.getNotUploadedItems().filter(function (item) { return !item.isUploading; });
        if (!items.length) {
            return;
        }
        items.map(function (item) { return item._prepareToUploading(); });
        items[0].upload();
    };
    FileUploader.prototype.cancelAll = function () {
        var items = this.getNotUploadedItems();
        items.map(function (item) { return item.cancel(); });
    };
    FileUploader.prototype.isFile = function (value) {
        return isFile(value);
    };
    FileUploader.prototype.isFileLikeObject = function (value) {
        return value instanceof file_like_object_class_1.FileLikeObject;
    };
    FileUploader.prototype.getIndexOfItem = function (value) {
        return typeof value === 'number' ? value : this.queue.indexOf(value);
    };
    FileUploader.prototype.getNotUploadedItems = function () {
        return this.queue.filter(function (item) { return !item.isUploaded; });
    };
    FileUploader.prototype.getReadyItems = function () {
        return this.queue
            .filter(function (item) { return (item.isReady && !item.isUploading); })
            .sort(function (item1, item2) { return item1.index - item2.index; });
    };
    FileUploader.prototype.destroy = function () {
        return void 0;
        /*forEach(this._directives, (key) => {
         forEach(this._directives[key], (object) => {
         object.destroy();
         });
         });*/
    };
    FileUploader.prototype.onAfterAddingAll = function (fileItems) {
        return { fileItems: fileItems };
    };
    FileUploader.prototype.onBuildItemForm = function (fileItem, form) {
        return { fileItem: fileItem, form: form };
    };
    FileUploader.prototype.onAfterAddingFile = function (fileItem) {
        return { fileItem: fileItem };
    };
    FileUploader.prototype.onWhenAddingFileFailed = function (item, filter, options) {
        return { item: item, filter: filter, options: options };
    };
    FileUploader.prototype.onBeforeUploadItem = function (fileItem) {
        return { fileItem: fileItem };
    };
    FileUploader.prototype.onProgressItem = function (fileItem, progress) {
        return { fileItem: fileItem, progress: progress };
    };
    FileUploader.prototype.onProgressAll = function (progress) {
        return { progress: progress };
    };
    FileUploader.prototype.onSuccessItem = function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    FileUploader.prototype.onErrorItem = function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    FileUploader.prototype.onCancelItem = function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    FileUploader.prototype.onCompleteItem = function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    FileUploader.prototype.onCompleteAll = function () {
        return void 0;
    };
    FileUploader.prototype._mimeTypeFilter = function (item) {
        return !(this.options.allowedMimeType && this.options.allowedMimeType.indexOf(item.type) === -1);
    };
    FileUploader.prototype._fileSizeFilter = function (item) {
        return !(this.options.maxFileSize && item.size > this.options.maxFileSize);
    };
    FileUploader.prototype._fileTypeFilter = function (item) {
        return !(this.options.allowedFileType &&
            this.options.allowedFileType.indexOf(file_type_class_1.FileType.getMimeClass(item)) === -1);
    };
    FileUploader.prototype._onErrorItem = function (item, response, status, headers) {
        item._onError(response, status, headers);
        this.onErrorItem(item, response, status, headers);
    };
    FileUploader.prototype._onCompleteItem = function (item, response, status, headers) {
        item._onComplete(response, status, headers);
        this.onCompleteItem(item, response, status, headers);
        var nextItem = this.getReadyItems()[0];
        this.isUploading = false;
        if (nextItem) {
            nextItem.upload();
            return;
        }
        this.onCompleteAll();
        this.progress = this._getTotalProgress();
        this._render();
    };
    FileUploader.prototype._headersGetter = function (parsedHeaders) {
        return function (name) {
            if (name) {
                return parsedHeaders[name.toLowerCase()] || void 0;
            }
            return parsedHeaders;
        };
    };
    FileUploader.prototype._xhrTransport = function (item) {
        var _this = this;
        var xhr = item._xhr = new XMLHttpRequest();
        var sendable;
        this._onBeforeUploadItem(item);
        // todo
        /*item.formData.map(obj => {
         obj.map((value, key) => {
         form.append(key, value);
         });
         });*/
        if (typeof item._file.size !== 'number') {
            throw new TypeError('The file specified is no longer valid');
        }
        if (!this.options.disableMultipart) {
            sendable = new FormData();
            this._onBuildItemForm(item, sendable);
            sendable.append(item.alias, item._file, item.file.name);
        }
        else {
            sendable = item._file;
        }
        xhr.upload.onprogress = function (event) {
            var progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
            _this._onProgressItem(item, progress);
        };
        xhr.onload = function () {
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            var response = _this._transformResponse(xhr.response, headers);
            var gist = _this._isSuccessCode(xhr.status) ? 'Success' : 'Error';
            var method = '_on' + gist + 'Item';
            _this[method](item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        };
        xhr.onerror = function () {
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            var response = _this._transformResponse(xhr.response, headers);
            _this._onErrorItem(item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        };
        xhr.onabort = function () {
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            var response = _this._transformResponse(xhr.response, headers);
            _this._onCancelItem(item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        };
        xhr.open(item.method, item.url, true);
        xhr.withCredentials = item.withCredentials;
        // todo
        /*item.headers.map((value, name) => {
         xhr.setRequestHeader(name, value);
         });*/
        if (this.options.headers) {
            for (var _i = 0, _a = this.options.headers; _i < _a.length; _i++) {
                var header = _a[_i];
                xhr.setRequestHeader(header.name, header.value);
            }
        }
        if (this.authToken) {
            xhr.setRequestHeader(this.authTokenHeader, this.authToken);
        }
        xhr.send(sendable);
        this._render();
    };
    FileUploader.prototype._getTotalProgress = function (value) {
        if (value === void 0) { value = 0; }
        if (this.options.removeAfterUpload) {
            return value;
        }
        var notUploaded = this.getNotUploadedItems().length;
        var uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
        var ratio = 100 / this.queue.length;
        var current = value * ratio / 100;
        return Math.round(uploaded * ratio + current);
    };
    FileUploader.prototype._getFilters = function (filters) {
        if (!filters) {
            return this.options.filters;
        }
        if (Array.isArray(filters)) {
            return filters;
        }
        if (typeof filters === 'string') {
            var names_1 = filters.match(/[^\s,]+/g);
            return this.options.filters
                .filter(function (filter) { return names_1.indexOf(filter.name) !== -1; });
        }
        return this.options.filters;
    };
    FileUploader.prototype._render = function () {
        return void 0;
        // todo: ?
    };
    // private _folderFilter(item:FileItem):boolean {
    //   return !!(item.size || item.type);
    // }
    FileUploader.prototype._queueLimitFilter = function () {
        return this.options.queueLimit === undefined || this.queue.length < this.options.queueLimit;
    };
    FileUploader.prototype._isValidFile = function (file, filters, options) {
        var _this = this;
        this._failFilterIndex = -1;
        return !filters.length ? true : filters.every(function (filter) {
            _this._failFilterIndex++;
            return filter.fn.call(_this, file, options);
        });
    };
    FileUploader.prototype._isSuccessCode = function (status) {
        return (status >= 200 && status < 300) || status === 304;
    };
    /* tslint:disable */
    FileUploader.prototype._transformResponse = function (response, headers) {
        // todo: ?
        /*var headersGetter = this._headersGetter(headers);
         forEach($http.defaults.transformResponse, (transformFn) => {
         response = transformFn(response, headersGetter);
         });*/
        return response;
    };
    /* tslint:enable */
    FileUploader.prototype._parseHeaders = function (headers) {
        var parsed = {};
        var key;
        var val;
        var i;
        if (!headers) {
            return parsed;
        }
        headers.split('\n').map(function (line) {
            i = line.indexOf(':');
            key = line.slice(0, i).trim().toLowerCase();
            val = line.slice(i + 1).trim();
            if (key) {
                parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
            }
        });
        return parsed;
    };
    /*private _iframeTransport(item:FileItem) {
     // todo: implement it later
     }*/
    FileUploader.prototype._onWhenAddingFileFailed = function (item, filter, options) {
        this.onWhenAddingFileFailed(item, filter, options);
    };
    FileUploader.prototype._onAfterAddingFile = function (item) {
        this.onAfterAddingFile(item);
    };
    FileUploader.prototype._onAfterAddingAll = function (items) {
        this.onAfterAddingAll(items);
    };
    FileUploader.prototype._onBeforeUploadItem = function (item) {
        item._onBeforeUpload();
        this.onBeforeUploadItem(item);
    };
    FileUploader.prototype._onBuildItemForm = function (item, form) {
        item._onBuildForm(form);
        this.onBuildItemForm(item, form);
    };
    FileUploader.prototype._onProgressItem = function (item, progress) {
        var total = this._getTotalProgress(progress);
        this.progress = total;
        item._onProgress(progress);
        this.onProgressItem(item, progress);
        this.onProgressAll(total);
        this._render();
    };
    /* tslint:disable */
    FileUploader.prototype._onSuccessItem = function (item, response, status, headers) {
        item._onSuccess(response, status, headers);
        this.onSuccessItem(item, response, status, headers);
    };
    /* tslint:enable */
    FileUploader.prototype._onCancelItem = function (item, response, status, headers) {
        item._onCancel(response, status, headers);
        this.onCancelItem(item, response, status, headers);
    };
    return FileUploader;
}());
exports.FileUploader = FileUploader;


/***/ }),

/***/ "./node_modules/ng2-cloudinary/node_modules/ng2-file-upload/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./node_modules/ng2-cloudinary/node_modules/ng2-file-upload/file-upload/file-select.directive.js"));
__export(__webpack_require__("./node_modules/ng2-cloudinary/node_modules/ng2-file-upload/file-upload/file-drop.directive.js"));
__export(__webpack_require__("./node_modules/ng2-cloudinary/node_modules/ng2-file-upload/file-upload/file-uploader.class.js"));
var file_upload_module_1 = __webpack_require__("./node_modules/ng2-cloudinary/node_modules/ng2-file-upload/file-upload/file-upload.module.js");
exports.FileUploadModule = file_upload_module_1.FileUploadModule;


/***/ }),

/***/ "./node_modules/ng2-file-upload/file-upload/file-drop.directive.js":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var file_uploader_class_1 = __webpack_require__("./node_modules/ng2-file-upload/file-upload/file-uploader.class.js");
var FileDropDirective = (function () {
    function FileDropDirective(element) {
        this.fileOver = new core_1.EventEmitter();
        this.onFileDrop = new core_1.EventEmitter();
        this.element = element;
    }
    FileDropDirective.prototype.getOptions = function () {
        return this.uploader.options;
    };
    FileDropDirective.prototype.getFilters = function () {
        return {};
    };
    FileDropDirective.prototype.onDrop = function (event) {
        var transfer = this._getTransfer(event);
        if (!transfer) {
            return;
        }
        var options = this.getOptions();
        var filters = this.getFilters();
        this._preventAndStop(event);
        this.uploader.addToQueue(transfer.files, options, filters);
        this.fileOver.emit(false);
        this.onFileDrop.emit(transfer.files);
    };
    FileDropDirective.prototype.onDragOver = function (event) {
        var transfer = this._getTransfer(event);
        if (!this._haveFiles(transfer.types)) {
            return;
        }
        transfer.dropEffect = 'copy';
        this._preventAndStop(event);
        this.fileOver.emit(true);
    };
    FileDropDirective.prototype.onDragLeave = function (event) {
        if (this.element) {
            if (event.currentTarget === this.element[0]) {
                return;
            }
        }
        this._preventAndStop(event);
        this.fileOver.emit(false);
    };
    FileDropDirective.prototype._getTransfer = function (event) {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer; // jQuery fix;
    };
    FileDropDirective.prototype._preventAndStop = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    FileDropDirective.prototype._haveFiles = function (types) {
        if (!types) {
            return false;
        }
        if (types.indexOf) {
            return types.indexOf('Files') !== -1;
        }
        else if (types.contains) {
            return types.contains('Files');
        }
        else {
            return false;
        }
    };
    return FileDropDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", file_uploader_class_1.FileUploader)
], FileDropDirective.prototype, "uploader", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileDropDirective.prototype, "fileOver", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileDropDirective.prototype, "onFileDrop", void 0);
__decorate([
    core_1.HostListener('drop', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileDropDirective.prototype, "onDrop", null);
__decorate([
    core_1.HostListener('dragover', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileDropDirective.prototype, "onDragOver", null);
__decorate([
    core_1.HostListener('dragleave', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], FileDropDirective.prototype, "onDragLeave", null);
FileDropDirective = __decorate([
    core_1.Directive({ selector: '[ng2FileDrop]' }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], FileDropDirective);
exports.FileDropDirective = FileDropDirective;


/***/ }),

/***/ "./node_modules/ng2-file-upload/file-upload/file-item.class.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var file_like_object_class_1 = __webpack_require__("./node_modules/ng2-file-upload/file-upload/file-like-object.class.js");
var FileItem = (function () {
    function FileItem(uploader, some, options) {
        this.url = '/';
        this.headers = [];
        this.withCredentials = true;
        this.formData = [];
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.index = void 0;
        this.uploader = uploader;
        this.some = some;
        this.options = options;
        this.file = new file_like_object_class_1.FileLikeObject(some);
        this._file = some;
        if (uploader.options) {
            this.method = uploader.options.method || 'POST';
            this.alias = uploader.options.itemAlias || 'file';
        }
        this.url = uploader.options.url;
    }
    FileItem.prototype.upload = function () {
        try {
            this.uploader.uploadItem(this);
        }
        catch (e) {
            this.uploader._onCompleteItem(this, '', 0, {});
            this.uploader._onErrorItem(this, '', 0, {});
        }
    };
    FileItem.prototype.cancel = function () {
        this.uploader.cancelItem(this);
    };
    FileItem.prototype.remove = function () {
        this.uploader.removeFromQueue(this);
    };
    FileItem.prototype.onBeforeUpload = function () {
        return void 0;
    };
    FileItem.prototype.onBuildForm = function (form) {
        return { form: form };
    };
    FileItem.prototype.onProgress = function (progress) {
        return { progress: progress };
    };
    FileItem.prototype.onSuccess = function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    FileItem.prototype.onError = function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    FileItem.prototype.onCancel = function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    FileItem.prototype.onComplete = function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    FileItem.prototype._onBeforeUpload = function () {
        this.isReady = true;
        this.isUploading = true;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.onBeforeUpload();
    };
    FileItem.prototype._onBuildForm = function (form) {
        this.onBuildForm(form);
    };
    FileItem.prototype._onProgress = function (progress) {
        this.progress = progress;
        this.onProgress(progress);
    };
    FileItem.prototype._onSuccess = function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = true;
        this.isCancel = false;
        this.isError = false;
        this.progress = 100;
        this.index = void 0;
        this.onSuccess(response, status, headers);
    };
    FileItem.prototype._onError = function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = true;
        this.progress = 0;
        this.index = void 0;
        this.onError(response, status, headers);
    };
    FileItem.prototype._onCancel = function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = true;
        this.isError = false;
        this.progress = 0;
        this.index = void 0;
        this.onCancel(response, status, headers);
    };
    FileItem.prototype._onComplete = function (response, status, headers) {
        this.onComplete(response, status, headers);
        if (this.uploader.options.removeAfterUpload) {
            this.remove();
        }
    };
    FileItem.prototype._prepareToUploading = function () {
        this.index = this.index || ++this.uploader._nextIndex;
        this.isReady = true;
    };
    return FileItem;
}());
exports.FileItem = FileItem;


/***/ }),

/***/ "./node_modules/ng2-file-upload/file-upload/file-like-object.class.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isElement(node) {
    return !!(node && (node.nodeName || node.prop && node.attr && node.find));
}
var FileLikeObject = (function () {
    function FileLikeObject(fileOrInput) {
        this.rawFile = fileOrInput;
        var isInput = isElement(fileOrInput);
        var fakePathOrObject = isInput ? fileOrInput.value : fileOrInput;
        var postfix = typeof fakePathOrObject === 'string' ? 'FakePath' : 'Object';
        var method = '_createFrom' + postfix;
        this[method](fakePathOrObject);
    }
    FileLikeObject.prototype._createFromFakePath = function (path) {
        this.lastModifiedDate = void 0;
        this.size = void 0;
        this.type = 'like/' + path.slice(path.lastIndexOf('.') + 1).toLowerCase();
        this.name = path.slice(path.lastIndexOf('/') + path.lastIndexOf('\\') + 2);
    };
    FileLikeObject.prototype._createFromObject = function (object) {
        this.size = object.size;
        this.type = object.type;
        this.name = object.name;
    };
    return FileLikeObject;
}());
exports.FileLikeObject = FileLikeObject;


/***/ }),

/***/ "./node_modules/ng2-file-upload/file-upload/file-select.directive.js":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var file_uploader_class_1 = __webpack_require__("./node_modules/ng2-file-upload/file-upload/file-uploader.class.js");
var FileSelectDirective = (function () {
    function FileSelectDirective(element) {
        this.onFileSelected = new core_1.EventEmitter();
        this.element = element;
    }
    FileSelectDirective.prototype.getOptions = function () {
        return this.uploader.options;
    };
    FileSelectDirective.prototype.getFilters = function () {
        return {};
    };
    FileSelectDirective.prototype.isEmptyAfterSelection = function () {
        return !!this.element.nativeElement.attributes.multiple;
    };
    FileSelectDirective.prototype.onChange = function () {
        var files = this.element.nativeElement.files;
        var options = this.getOptions();
        var filters = this.getFilters();
        this.uploader.addToQueue(files, options, filters);
        this.onFileSelected.emit(files);
        if (this.isEmptyAfterSelection()) {
            this.element.nativeElement.value = '';
        }
    };
    return FileSelectDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", file_uploader_class_1.FileUploader)
], FileSelectDirective.prototype, "uploader", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileSelectDirective.prototype, "onFileSelected", void 0);
__decorate([
    core_1.HostListener('change'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], FileSelectDirective.prototype, "onChange", null);
FileSelectDirective = __decorate([
    core_1.Directive({ selector: '[ng2FileSelect]' }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], FileSelectDirective);
exports.FileSelectDirective = FileSelectDirective;


/***/ }),

/***/ "./node_modules/ng2-file-upload/file-upload/file-type.class.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var FileType = (function () {
    function FileType() {
    }
    FileType.getMimeClass = function (file) {
        var mimeClass = 'application';
        if (this.mime_psd.indexOf(file.type) !== -1) {
            mimeClass = 'image';
        }
        else if (file.type.match('image.*')) {
            mimeClass = 'image';
        }
        else if (file.type.match('video.*')) {
            mimeClass = 'video';
        }
        else if (file.type.match('audio.*')) {
            mimeClass = 'audio';
        }
        else if (file.type === 'application/pdf') {
            mimeClass = 'pdf';
        }
        else if (this.mime_compress.indexOf(file.type) !== -1) {
            mimeClass = 'compress';
        }
        else if (this.mime_doc.indexOf(file.type) !== -1) {
            mimeClass = 'doc';
        }
        else if (this.mime_xsl.indexOf(file.type) !== -1) {
            mimeClass = 'xls';
        }
        else if (this.mime_ppt.indexOf(file.type) !== -1) {
            mimeClass = 'ppt';
        }
        if (mimeClass === 'application') {
            mimeClass = this.fileTypeDetection(file.name);
        }
        return mimeClass;
    };
    FileType.fileTypeDetection = function (inputFilename) {
        var types = {
            'jpg': 'image',
            'jpeg': 'image',
            'tif': 'image',
            'psd': 'image',
            'bmp': 'image',
            'png': 'image',
            'nef': 'image',
            'tiff': 'image',
            'cr2': 'image',
            'dwg': 'image',
            'cdr': 'image',
            'ai': 'image',
            'indd': 'image',
            'pin': 'image',
            'cdp': 'image',
            'skp': 'image',
            'stp': 'image',
            '3dm': 'image',
            'mp3': 'audio',
            'wav': 'audio',
            'wma': 'audio',
            'mod': 'audio',
            'm4a': 'audio',
            'compress': 'compress',
            'zip': 'compress',
            'rar': 'compress',
            '7z': 'compress',
            'lz': 'compress',
            'z01': 'compress',
            'pdf': 'pdf',
            'xls': 'xls',
            'xlsx': 'xls',
            'ods': 'xls',
            'mp4': 'video',
            'avi': 'video',
            'wmv': 'video',
            'mpg': 'video',
            'mts': 'video',
            'flv': 'video',
            '3gp': 'video',
            'vob': 'video',
            'm4v': 'video',
            'mpeg': 'video',
            'm2ts': 'video',
            'mov': 'video',
            'doc': 'doc',
            'docx': 'doc',
            'eps': 'doc',
            'txt': 'doc',
            'odt': 'doc',
            'rtf': 'doc',
            'ppt': 'ppt',
            'pptx': 'ppt',
            'pps': 'ppt',
            'ppsx': 'ppt',
            'odp': 'ppt'
        };
        var chunks = inputFilename.split('.');
        if (chunks.length < 2) {
            return 'application';
        }
        var extension = chunks[chunks.length - 1].toLowerCase();
        if (types[extension] === undefined) {
            return 'application';
        }
        else {
            return types[extension];
        }
    };
    return FileType;
}());
/*  MS office  */
FileType.mime_doc = [
    'application/msword',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
    'application/vnd.ms-word.document.macroEnabled.12',
    'application/vnd.ms-word.template.macroEnabled.12'
];
FileType.mime_xsl = [
    'application/vnd.ms-excel',
    'application/vnd.ms-excel',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
    'application/vnd.ms-excel.sheet.macroEnabled.12',
    'application/vnd.ms-excel.template.macroEnabled.12',
    'application/vnd.ms-excel.addin.macroEnabled.12',
    'application/vnd.ms-excel.sheet.binary.macroEnabled.12'
];
FileType.mime_ppt = [
    'application/vnd.ms-powerpoint',
    'application/vnd.ms-powerpoint',
    'application/vnd.ms-powerpoint',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.presentationml.template',
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    'application/vnd.ms-powerpoint.addin.macroEnabled.12',
    'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
    'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
    'application/vnd.ms-powerpoint.slideshow.macroEnabled.12'
];
/* PSD */
FileType.mime_psd = [
    'image/photoshop',
    'image/x-photoshop',
    'image/psd',
    'application/photoshop',
    'application/psd',
    'zz-application/zz-winassoc-psd'
];
/* Compressed files */
FileType.mime_compress = [
    'application/x-gtar',
    'application/x-gcompress',
    'application/compress',
    'application/x-tar',
    'application/x-rar-compressed',
    'application/octet-stream'
];
exports.FileType = FileType;


/***/ }),

/***/ "./node_modules/ng2-file-upload/file-upload/file-upload.module.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var common_1 = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var file_drop_directive_1 = __webpack_require__("./node_modules/ng2-file-upload/file-upload/file-drop.directive.js");
var file_select_directive_1 = __webpack_require__("./node_modules/ng2-file-upload/file-upload/file-select.directive.js");
var FileUploadModule = (function () {
    function FileUploadModule() {
    }
    return FileUploadModule;
}());
FileUploadModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [file_drop_directive_1.FileDropDirective, file_select_directive_1.FileSelectDirective],
        exports: [file_drop_directive_1.FileDropDirective, file_select_directive_1.FileSelectDirective]
    })
], FileUploadModule);
exports.FileUploadModule = FileUploadModule;


/***/ }),

/***/ "./node_modules/ng2-file-upload/file-upload/file-uploader.class.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var file_like_object_class_1 = __webpack_require__("./node_modules/ng2-file-upload/file-upload/file-like-object.class.js");
var file_item_class_1 = __webpack_require__("./node_modules/ng2-file-upload/file-upload/file-item.class.js");
var file_type_class_1 = __webpack_require__("./node_modules/ng2-file-upload/file-upload/file-type.class.js");
function isFile(value) {
    return (File && value instanceof File);
}
var FileUploader = (function () {
    function FileUploader(options) {
        this.isUploading = false;
        this.queue = [];
        this.progress = 0;
        this._nextIndex = 0;
        this.options = {
            autoUpload: false,
            isHTML5: true,
            filters: [],
            removeAfterUpload: false,
            disableMultipart: false,
            formatDataFunction: function (item) { return item._file; },
            formatDataFunctionIsAsync: false
        };
        this.setOptions(options);
        this.response = new core_1.EventEmitter();
    }
    FileUploader.prototype.setOptions = function (options) {
        this.options = Object.assign(this.options, options);
        this.authToken = this.options.authToken;
        this.authTokenHeader = this.options.authTokenHeader || 'Authorization';
        this.autoUpload = this.options.autoUpload;
        this.options.filters.unshift({ name: 'queueLimit', fn: this._queueLimitFilter });
        if (this.options.maxFileSize) {
            this.options.filters.unshift({ name: 'fileSize', fn: this._fileSizeFilter });
        }
        if (this.options.allowedFileType) {
            this.options.filters.unshift({ name: 'fileType', fn: this._fileTypeFilter });
        }
        if (this.options.allowedMimeType) {
            this.options.filters.unshift({ name: 'mimeType', fn: this._mimeTypeFilter });
        }
        for (var i = 0; i < this.queue.length; i++) {
            this.queue[i].url = this.options.url;
        }
    };
    FileUploader.prototype.addToQueue = function (files, options, filters) {
        var _this = this;
        var list = [];
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            list.push(file);
        }
        var arrayOfFilters = this._getFilters(filters);
        var count = this.queue.length;
        var addedFileItems = [];
        list.map(function (some) {
            if (!options) {
                options = _this.options;
            }
            var temp = new file_like_object_class_1.FileLikeObject(some);
            if (_this._isValidFile(temp, arrayOfFilters, options)) {
                var fileItem = new file_item_class_1.FileItem(_this, some, options);
                addedFileItems.push(fileItem);
                _this.queue.push(fileItem);
                _this._onAfterAddingFile(fileItem);
            }
            else {
                var filter = arrayOfFilters[_this._failFilterIndex];
                _this._onWhenAddingFileFailed(temp, filter, options);
            }
        });
        if (this.queue.length !== count) {
            this._onAfterAddingAll(addedFileItems);
            this.progress = this._getTotalProgress();
        }
        this._render();
        if (this.options.autoUpload) {
            this.uploadAll();
        }
    };
    FileUploader.prototype.removeFromQueue = function (value) {
        var index = this.getIndexOfItem(value);
        var item = this.queue[index];
        if (item.isUploading) {
            item.cancel();
        }
        this.queue.splice(index, 1);
        this.progress = this._getTotalProgress();
    };
    FileUploader.prototype.clearQueue = function () {
        while (this.queue.length) {
            this.queue[0].remove();
        }
        this.progress = 0;
    };
    FileUploader.prototype.uploadItem = function (value) {
        var index = this.getIndexOfItem(value);
        var item = this.queue[index];
        var transport = this.options.isHTML5 ? '_xhrTransport' : '_iframeTransport';
        item._prepareToUploading();
        if (this.isUploading) {
            return;
        }
        this.isUploading = true;
        this[transport](item);
    };
    FileUploader.prototype.cancelItem = function (value) {
        var index = this.getIndexOfItem(value);
        var item = this.queue[index];
        var prop = this.options.isHTML5 ? item._xhr : item._form;
        if (item && item.isUploading) {
            prop.abort();
        }
    };
    FileUploader.prototype.uploadAll = function () {
        var items = this.getNotUploadedItems().filter(function (item) { return !item.isUploading; });
        if (!items.length) {
            return;
        }
        items.map(function (item) { return item._prepareToUploading(); });
        items[0].upload();
    };
    FileUploader.prototype.cancelAll = function () {
        var items = this.getNotUploadedItems();
        items.map(function (item) { return item.cancel(); });
    };
    FileUploader.prototype.isFile = function (value) {
        return isFile(value);
    };
    FileUploader.prototype.isFileLikeObject = function (value) {
        return value instanceof file_like_object_class_1.FileLikeObject;
    };
    FileUploader.prototype.getIndexOfItem = function (value) {
        return typeof value === 'number' ? value : this.queue.indexOf(value);
    };
    FileUploader.prototype.getNotUploadedItems = function () {
        return this.queue.filter(function (item) { return !item.isUploaded; });
    };
    FileUploader.prototype.getReadyItems = function () {
        return this.queue
            .filter(function (item) { return (item.isReady && !item.isUploading); })
            .sort(function (item1, item2) { return item1.index - item2.index; });
    };
    FileUploader.prototype.destroy = function () {
        return void 0;
    };
    FileUploader.prototype.onAfterAddingAll = function (fileItems) {
        return { fileItems: fileItems };
    };
    FileUploader.prototype.onBuildItemForm = function (fileItem, form) {
        return { fileItem: fileItem, form: form };
    };
    FileUploader.prototype.onAfterAddingFile = function (fileItem) {
        return { fileItem: fileItem };
    };
    FileUploader.prototype.onWhenAddingFileFailed = function (item, filter, options) {
        return { item: item, filter: filter, options: options };
    };
    FileUploader.prototype.onBeforeUploadItem = function (fileItem) {
        return { fileItem: fileItem };
    };
    FileUploader.prototype.onProgressItem = function (fileItem, progress) {
        return { fileItem: fileItem, progress: progress };
    };
    FileUploader.prototype.onProgressAll = function (progress) {
        return { progress: progress };
    };
    FileUploader.prototype.onSuccessItem = function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    FileUploader.prototype.onErrorItem = function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    FileUploader.prototype.onCancelItem = function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    FileUploader.prototype.onCompleteItem = function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    FileUploader.prototype.onCompleteAll = function () {
        return void 0;
    };
    FileUploader.prototype._mimeTypeFilter = function (item) {
        return !(this.options.allowedMimeType && this.options.allowedMimeType.indexOf(item.type) === -1);
    };
    FileUploader.prototype._fileSizeFilter = function (item) {
        return !(this.options.maxFileSize && item.size > this.options.maxFileSize);
    };
    FileUploader.prototype._fileTypeFilter = function (item) {
        return !(this.options.allowedFileType &&
            this.options.allowedFileType.indexOf(file_type_class_1.FileType.getMimeClass(item)) === -1);
    };
    FileUploader.prototype._onErrorItem = function (item, response, status, headers) {
        item._onError(response, status, headers);
        this.onErrorItem(item, response, status, headers);
    };
    FileUploader.prototype._onCompleteItem = function (item, response, status, headers) {
        item._onComplete(response, status, headers);
        this.onCompleteItem(item, response, status, headers);
        var nextItem = this.getReadyItems()[0];
        this.isUploading = false;
        if (nextItem) {
            nextItem.upload();
            return;
        }
        this.onCompleteAll();
        this.progress = this._getTotalProgress();
        this._render();
    };
    FileUploader.prototype._headersGetter = function (parsedHeaders) {
        return function (name) {
            if (name) {
                return parsedHeaders[name.toLowerCase()] || void 0;
            }
            return parsedHeaders;
        };
    };
    FileUploader.prototype._xhrTransport = function (item) {
        var _this = this;
        var that = this;
        var xhr = item._xhr = new XMLHttpRequest();
        var sendable;
        this._onBeforeUploadItem(item);
        if (typeof item._file.size !== 'number') {
            throw new TypeError('The file specified is no longer valid');
        }
        if (!this.options.disableMultipart) {
            sendable = new FormData();
            this._onBuildItemForm(item, sendable);
            var appendFile = function () { return sendable.append(item.alias, item._file, item.file.name); };
            if (!this.options.parametersBeforeFiles) {
                appendFile();
            }
            // For AWS, Additional Parameters must come BEFORE Files
            if (this.options.additionalParameter !== undefined) {
                Object.keys(this.options.additionalParameter).forEach(function (key) {
                    var paramVal = _this.options.additionalParameter[key];
                    // Allow an additional parameter to include the filename
                    if (typeof paramVal === 'string' && paramVal.indexOf('{{file_name}}') >= 0) {
                        paramVal = paramVal.replace('{{file_name}}', item.file.name);
                    }
                    sendable.append(key, paramVal);
                });
            }
            if (this.options.parametersBeforeFiles) {
                appendFile();
            }
        }
        else {
            sendable = this.options.formatDataFunction(item);
        }
        xhr.upload.onprogress = function (event) {
            var progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
            _this._onProgressItem(item, progress);
        };
        xhr.onload = function () {
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            var response = _this._transformResponse(xhr.response, headers);
            var gist = _this._isSuccessCode(xhr.status) ? 'Success' : 'Error';
            var method = '_on' + gist + 'Item';
            _this[method](item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        };
        xhr.onerror = function () {
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            var response = _this._transformResponse(xhr.response, headers);
            _this._onErrorItem(item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        };
        xhr.onabort = function () {
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            var response = _this._transformResponse(xhr.response, headers);
            _this._onCancelItem(item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        };
        xhr.open(item.method, item.url, true);
        xhr.withCredentials = item.withCredentials;
        if (this.options.headers) {
            for (var _i = 0, _a = this.options.headers; _i < _a.length; _i++) {
                var header = _a[_i];
                xhr.setRequestHeader(header.name, header.value);
            }
        }
        if (item.headers.length) {
            for (var _b = 0, _c = item.headers; _b < _c.length; _b++) {
                var header = _c[_b];
                xhr.setRequestHeader(header.name, header.value);
            }
        }
        if (this.authToken) {
            xhr.setRequestHeader(this.authTokenHeader, this.authToken);
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                that.response.emit(xhr.responseText);
            }
        };
        if (this.options.formatDataFunctionIsAsync) {
            sendable.then(function (result) { return xhr.send(JSON.stringify(result)); });
        }
        else {
            xhr.send(sendable);
        }
        this._render();
    };
    FileUploader.prototype._getTotalProgress = function (value) {
        if (value === void 0) { value = 0; }
        if (this.options.removeAfterUpload) {
            return value;
        }
        var notUploaded = this.getNotUploadedItems().length;
        var uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
        var ratio = 100 / this.queue.length;
        var current = value * ratio / 100;
        return Math.round(uploaded * ratio + current);
    };
    FileUploader.prototype._getFilters = function (filters) {
        if (!filters) {
            return this.options.filters;
        }
        if (Array.isArray(filters)) {
            return filters;
        }
        if (typeof filters === 'string') {
            var names_1 = filters.match(/[^\s,]+/g);
            return this.options.filters
                .filter(function (filter) { return names_1.indexOf(filter.name) !== -1; });
        }
        return this.options.filters;
    };
    FileUploader.prototype._render = function () {
        return void 0;
    };
    FileUploader.prototype._queueLimitFilter = function () {
        return this.options.queueLimit === undefined || this.queue.length < this.options.queueLimit;
    };
    FileUploader.prototype._isValidFile = function (file, filters, options) {
        var _this = this;
        this._failFilterIndex = -1;
        return !filters.length ? true : filters.every(function (filter) {
            _this._failFilterIndex++;
            return filter.fn.call(_this, file, options);
        });
    };
    FileUploader.prototype._isSuccessCode = function (status) {
        return (status >= 200 && status < 300) || status === 304;
    };
    FileUploader.prototype._transformResponse = function (response, headers) {
        return response;
    };
    FileUploader.prototype._parseHeaders = function (headers) {
        var parsed = {};
        var key;
        var val;
        var i;
        if (!headers) {
            return parsed;
        }
        headers.split('\n').map(function (line) {
            i = line.indexOf(':');
            key = line.slice(0, i).trim().toLowerCase();
            val = line.slice(i + 1).trim();
            if (key) {
                parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
            }
        });
        return parsed;
    };
    FileUploader.prototype._onWhenAddingFileFailed = function (item, filter, options) {
        this.onWhenAddingFileFailed(item, filter, options);
    };
    FileUploader.prototype._onAfterAddingFile = function (item) {
        this.onAfterAddingFile(item);
    };
    FileUploader.prototype._onAfterAddingAll = function (items) {
        this.onAfterAddingAll(items);
    };
    FileUploader.prototype._onBeforeUploadItem = function (item) {
        item._onBeforeUpload();
        this.onBeforeUploadItem(item);
    };
    FileUploader.prototype._onBuildItemForm = function (item, form) {
        item._onBuildForm(form);
        this.onBuildItemForm(item, form);
    };
    FileUploader.prototype._onProgressItem = function (item, progress) {
        var total = this._getTotalProgress(progress);
        this.progress = total;
        item._onProgress(progress);
        this.onProgressItem(item, progress);
        this.onProgressAll(total);
        this._render();
    };
    FileUploader.prototype._onSuccessItem = function (item, response, status, headers) {
        item._onSuccess(response, status, headers);
        this.onSuccessItem(item, response, status, headers);
    };
    FileUploader.prototype._onCancelItem = function (item, response, status, headers) {
        item._onCancel(response, status, headers);
        this.onCancelItem(item, response, status, headers);
    };
    return FileUploader;
}());
exports.FileUploader = FileUploader;


/***/ }),

/***/ "./node_modules/ng2-file-upload/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./node_modules/ng2-file-upload/file-upload/file-select.directive.js"));
__export(__webpack_require__("./node_modules/ng2-file-upload/file-upload/file-drop.directive.js"));
__export(__webpack_require__("./node_modules/ng2-file-upload/file-upload/file-uploader.class.js"));
__export(__webpack_require__("./node_modules/ng2-file-upload/file-upload/file-item.class.js"));
__export(__webpack_require__("./node_modules/ng2-file-upload/file-upload/file-like-object.class.js"));
var file_upload_module_1 = __webpack_require__("./node_modules/ng2-file-upload/file-upload/file-upload.module.js");
exports.FileUploadModule = file_upload_module_1.FileUploadModule;


/***/ }),

/***/ "./node_modules/ng2-page-scroll/ng2-page-scroll.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_ng2_page_scroll_directive__ = __webpack_require__("./node_modules/ng2-page-scroll/src/ng2-page-scroll.directive.js");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_ng2_page_scroll_service__ = __webpack_require__("./node_modules/ng2-page-scroll/src/ng2-page-scroll.service.js");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2_page_scroll_service__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_ng2_page_scroll_config__ = __webpack_require__("./node_modules/ng2-page-scroll/src/ng2-page-scroll-config.js");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__src_ng2_page_scroll_config__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_ng2_page_scroll_instance__ = __webpack_require__("./node_modules/ng2-page-scroll/src/ng2-page-scroll-instance.js");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__src_ng2_page_scroll_instance__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_ng2_page_scroll_util_service__ = __webpack_require__("./node_modules/ng2-page-scroll/src/ng2-page-scroll-util.service.js");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_ng2_page_scroll_module__ = __webpack_require__("./node_modules/ng2-page-scroll/src/ng2-page-scroll.module.js");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_5__src_ng2_page_scroll_module__["a"]; });








/***/ }),

/***/ "./node_modules/ng2-page-scroll/src/ng2-page-scroll-config.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export EasingLogic */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageScrollConfig; });
var EasingLogic = (function () {
    function EasingLogic() {
    }
    return EasingLogic;
}());

var PageScrollConfig = (function () {
    function PageScrollConfig() {
    }
    Object.defineProperty(PageScrollConfig, "defaultEasingLogic", {
        // Getter and setter to avoid auto completion to suggest calling the method
        get: function () {
            return PageScrollConfig._easingLogic;
        },
        set: function (easingLogic) {
            PageScrollConfig._easingLogic = easingLogic;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * The number of milliseconds to wait till updating the scroll position again.
     * Small amounts may produce smoother animations but require more processing power.
     * @type {number}
     * @private
     */
    PageScrollConfig._interval = 10;
    /**
     * The amount of pixels that need to be between the current scrollTop/scrollLeft position
     * and the target position the cause a scroll animation. In case distance is below
     * this threshold, an immediate jump will be performed.
     * Due to dpi or rounding irregularities in browsers floating point numbers for scrollTop/scrollLeft values
     * are possible, making a === comparison of current scrollTop or scrollLeft and target scrollPosition error-prone.
     * @type {number}
     * @private
     */
    PageScrollConfig._minScrollDistance = 2;
    /**
     * Name of the default namespace.
     * @type {string}
     * @private
     */
    PageScrollConfig._defaultNamespace = 'default';
    /**
     * Whether by default the scrolling should happen in vertical direction (by manipulating the scrollTop property)
     * (= true; default) or in horizontal direction (by manipulating the scrollLeft property) (= false
     * @type {boolean}
     */
    PageScrollConfig.defaultIsVerticalScrolling = true;
    /**
     * How many console logs should be emitted. Also influenced by angular mode (dev or prod mode)
     * 0: No logs, neither in dev nor in prod mode
     * 1: Animation errors in dev mode, no logs in prod mode
     * 2: Animation errors in dev and prod mode
     * 5: Animation errors in dev and all scroll position values that get set; animation errors in prod mode
     * @type {boolean}
     * @private
     */
    PageScrollConfig._logLevel = 2;
    /**
     * The duration how long a scrollTo animation should last by default.
     * May be overridden using the page-scroll-duration attribute on a single ng2PageScroll instance.
     * @type {number}
     */
    PageScrollConfig.defaultDuration = 1250;
    /**
     * The distance in pixels above scroll target where the animation should stop. Setting a positive number results in
     * the scroll target being more in the middle of the screen, negative numbers will produce scrolling "too far"
     * @type {number}
     */
    PageScrollConfig.defaultScrollOffset = 0;
    /**
     * Whether by default for inline scroll animations the advanced offset calculation should take place (true) or
     * not (false). Default is false.
     * The advanced offset calculation will traverse the DOM tree upwards, starting at the scrollTarget, until it finds
     * the scrollingView container element. Along the way the offset positions of the relative positioned
     * (position: relative) elements will be taken into account for calculating the target elements position.
     * @type {boolean}
     */
    PageScrollConfig.defaultAdvancedInlineOffsetCalculation = false;
    /**
     * The events that are listened to on the body to decide whether a scroll animation has been interfered/interrupted by the user
     * @type {string[]}
     * @private
     */
    PageScrollConfig._interruptEvents = ['mousedown', 'wheel', 'DOMMouseScroll', 'mousewheel', 'keyup', 'touchmove'];
    /**
     * The keys that are considered to interrupt a scroll animation (mainly the arrow keys). All other key presses will not stop the
     * scroll animation.
     * @type {number[]}
     * @private
     */
    PageScrollConfig._interruptKeys = [33, 34, 35, 36, 38, 40];
    /**
     * Whether a scroll animation should be interruptible by user interaction (true) or not (false). If the user performs an
     * interrupting event while a scroll animation takes place, the scroll animation stops.
     * @type {boolean}
     */
    PageScrollConfig.defaultInterruptible = true;
    PageScrollConfig._easingLogic = {
        ease: function (t, b, c, d) {
            // Linear easing
            return c * t / d + b;
        }
    };
    return PageScrollConfig;
}());



/***/ }),

/***/ "./node_modules/ng2-page-scroll/src/ng2-page-scroll-instance.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageScrollInstance; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__ = __webpack_require__("./node_modules/ng2-page-scroll/src/ng2-page-scroll-config.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng2_page_scroll_util_service__ = __webpack_require__("./node_modules/ng2-page-scroll/src/ng2-page-scroll-util.service.js");



/**
 * Represents a scrolling action
 */
var PageScrollInstance = (function () {
    /**
     * Private constructor, requires the properties assumed to be the bare minimum.
     * Use the factory methods to create instances:
     *      {@link PageScrollInstance#simpleInstance}
     *      {@link PageScrollInstance#newInstance}
     * @param namespace
     * @param document
     */
    function PageScrollInstance(namespace, document) {
        /**
         * These properties will be set during instance construction and default to their defaults from PageScrollConfig
         */
        /* A namespace to "group" scroll animations together and stopping some does not stop others */
        this._namespace = __WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */]._defaultNamespace;
        /* Whether we scroll vertically (true) or horizontally (false) */
        this._verticalScrolling = __WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */].defaultIsVerticalScrolling;
        /* Offset in px that the animation should stop above that target element */
        this._offset = __WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */].defaultScrollOffset;
        /* Duration in milliseconds the scroll animation should last */
        this._duration = __WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */].defaultDuration;
        /* Easing function to manipulate the scrollTop/scrollLeft value over time */
        this._easingLogic = __WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */].defaultEasingLogic;
        /* Boolean whether the scroll animation should stop on user interruption or not */
        this._interruptible = __WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */].defaultInterruptible;
        /* Whether the advanded offset calculation for inline scrolling should be used */
        this._advancedInlineOffsetCalculation = __WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */].defaultAdvancedInlineOffsetCalculation;
        /* Event emitter to notify the world about the scrolling */
        this._pageScrollFinish = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * These properties will be set/manipulated if the scroll animation starts
         */
        /* The initial value of the scrollTop or scrollLeft position when the animation starts */
        this._startScrollPosition = 0;
        /* Whether an interrupt listener is attached to the body or not */
        this._interruptListenersAttached = false;
        /* References to the timer instance that is used to perform the scroll animation to be
         able to clear it on animation end*/
        this._timer = null;
        this._namespace = namespace;
        this.document = document;
    }
    /*
     * Factory methods for instance creation
     */
    PageScrollInstance.simpleInstance = function (document, scrollTarget, namespace) {
        return PageScrollInstance.newInstance({
            document: document,
            scrollTarget: scrollTarget,
            namespace: namespace
        });
    };
    PageScrollInstance.newInstance = function (options) {
        if (__WEBPACK_IMPORTED_MODULE_2__ng2_page_scroll_util_service__["a" /* PageScrollUtilService */].isUndefinedOrNull(options.namespace) || options.namespace.length <= 0) {
            options.namespace = __WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */]._defaultNamespace;
        }
        var pageScrollInstance = new PageScrollInstance(options.namespace, document);
        if (__WEBPACK_IMPORTED_MODULE_2__ng2_page_scroll_util_service__["a" /* PageScrollUtilService */].isUndefinedOrNull(options.scrollingViews) || options.scrollingViews.length === 0) {
            pageScrollInstance._isInlineScrolling = false;
            pageScrollInstance._scrollingViews = [document.documentElement, document.body, document.body.parentNode];
        }
        else {
            pageScrollInstance._isInlineScrolling = true;
            pageScrollInstance._scrollingViews = options.scrollingViews;
        }
        pageScrollInstance._scrollTarget = options.scrollTarget;
        if (!__WEBPACK_IMPORTED_MODULE_2__ng2_page_scroll_util_service__["a" /* PageScrollUtilService */].isUndefinedOrNull(options.verticalScrolling)) {
            pageScrollInstance._verticalScrolling = options.verticalScrolling;
        }
        if (!__WEBPACK_IMPORTED_MODULE_2__ng2_page_scroll_util_service__["a" /* PageScrollUtilService */].isUndefinedOrNull(options.pageScrollOffset)) {
            pageScrollInstance._offset = options.pageScrollOffset;
        }
        if (!__WEBPACK_IMPORTED_MODULE_2__ng2_page_scroll_util_service__["a" /* PageScrollUtilService */].isUndefinedOrNull(options.pageScrollEasingLogic)) {
            pageScrollInstance._easingLogic = options.pageScrollEasingLogic;
        }
        if (__WEBPACK_IMPORTED_MODULE_2__ng2_page_scroll_util_service__["a" /* PageScrollUtilService */].isUndefinedOrNull(options.pageScrollDuration) && !__WEBPACK_IMPORTED_MODULE_2__ng2_page_scroll_util_service__["a" /* PageScrollUtilService */].isUndefinedOrNull(options.pageScrollSpeed)) {
            // No duration specified in the options, only in this case we use the speed option when present
            pageScrollInstance._speed = options.pageScrollSpeed;
            pageScrollInstance._duration = undefined;
        }
        else if (!__WEBPACK_IMPORTED_MODULE_2__ng2_page_scroll_util_service__["a" /* PageScrollUtilService */].isUndefinedOrNull(options.pageScrollDuration)) {
            pageScrollInstance._duration = options.pageScrollDuration;
        }
        if (!__WEBPACK_IMPORTED_MODULE_2__ng2_page_scroll_util_service__["a" /* PageScrollUtilService */].isUndefinedOrNull(options.pageScrollFinishListener)) {
            pageScrollInstance._pageScrollFinish = options.pageScrollFinishListener;
        }
        pageScrollInstance._interruptible = options.pageScrollInterruptible ||
            (__WEBPACK_IMPORTED_MODULE_2__ng2_page_scroll_util_service__["a" /* PageScrollUtilService */].isUndefinedOrNull(options.pageScrollInterruptible) && __WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */].defaultInterruptible);
        pageScrollInstance._advancedInlineOffsetCalculation = options.advancedInlineOffsetCalculation ||
            (__WEBPACK_IMPORTED_MODULE_2__ng2_page_scroll_util_service__["a" /* PageScrollUtilService */].isUndefinedOrNull(options.advancedInlineOffsetCalculation) &&
                __WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */].defaultAdvancedInlineOffsetCalculation);
        return pageScrollInstance;
    };
    PageScrollInstance.prototype.getScrollPropertyValue = function (scrollingView) {
        if (!this.verticalScrolling) {
            return scrollingView.scrollLeft;
        }
        return scrollingView.scrollTop;
    };
    /**
     * Extract the exact location of the scrollTarget element.
     *
     * Extract the scrollTarget HTMLElement from the given PageScrollTarget object. The latter one may be
     * a string like "#heading2", then this method returns the corresponding DOM element for that id.
     *
     * @returns {HTMLElement}
     */
    PageScrollInstance.prototype.extractScrollTargetPosition = function () {
        var scrollTargetElement;
        if (typeof this._scrollTarget === 'string') {
            var targetSelector = this._scrollTarget;
            if (targetSelector.match(/^#[^\s]+$/g) !== null) {
                // It's an id selector and a valid id, as it does not contain any white space characters
                scrollTargetElement = this.document.getElementById(targetSelector.substr(1));
            }
            else {
                scrollTargetElement = this.document.querySelector(targetSelector);
            }
        }
        else {
            scrollTargetElement = this._scrollTarget;
        }
        if (scrollTargetElement === null || scrollTargetElement === undefined) {
            // Scroll target not found
            return { top: NaN, left: NaN };
        }
        if (this._isInlineScrolling) {
            var position = { top: scrollTargetElement.offsetTop, left: scrollTargetElement.offsetLeft };
            if (this._advancedInlineOffsetCalculation && this.scrollingViews.length === 1) {
                var accumulatedParentsPos = { top: 0, left: 0 };
                // not named window to make sure we're not getting the global window variable by accident
                var theWindow = scrollTargetElement.ownerDocument.defaultView;
                var parentFound = false;
                // Start parent is the immediate parent
                var parent_1 = scrollTargetElement.parentElement;
                // Iterate upwards all parents
                while (!parentFound && !__WEBPACK_IMPORTED_MODULE_2__ng2_page_scroll_util_service__["a" /* PageScrollUtilService */].isUndefinedOrNull(parent_1)) {
                    if (theWindow.getComputedStyle(parent_1).getPropertyValue('position') === 'relative') {
                        accumulatedParentsPos.top += parent_1.offsetTop;
                        accumulatedParentsPos.left += parent_1.offsetLeft;
                    }
                    // Next iteration
                    parent_1 = parent_1.parentElement;
                    parentFound = parent_1 === this.scrollingViews[0];
                }
                if (parentFound) {
                    // Only use the results if we found the parent, otherwise we accumulated too much anyway
                    position.top += accumulatedParentsPos.top;
                    position.left += accumulatedParentsPos.left;
                }
                else {
                    if (__WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */]._logLevel >= 2 || (__WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */]._logLevel >= 1 && Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["isDevMode"])())) {
                        console.warn('Unable to find nested scrolling targets parent!');
                    }
                }
            }
            return position;
        }
        return __WEBPACK_IMPORTED_MODULE_2__ng2_page_scroll_util_service__["a" /* PageScrollUtilService */].extractElementPosition(this.document, scrollTargetElement);
    };
    /**
     * Get the top offset of the scroll animation.
     * This automatically takes the offset location of the scrolling container/scrolling view
     * into account (for nested/inline scrolling).
     *
     * @returns {number}
     */
    PageScrollInstance.prototype.getCurrentOffset = function () {
        return this._offset;
    };
    /**
     * Sets the "scrollTop" or "scrollLeft" property for all scrollingViews to the provided value
     * @param position
     * @return true if at least for one ScrollTopSource the scrollTop/scrollLeft value could be set and it kept the new value.
     *          false if it failed for all ScrollingViews, meaning that we should stop the animation
     *          (probably because we're at the end of the scrolling region)
     */
    PageScrollInstance.prototype.setScrollPosition = function (position) {
        var _this = this;
        if (__WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */]._logLevel >= 5 && Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["isDevMode"])()) {
            console.warn('Scroll Position: ' + position);
        }
        // Set the new scrollTop/scrollLeft to all scrollingViews elements
        return this.scrollingViews.reduce(function (oneAlreadyWorked, scrollingView) {
            var startScrollPropertyValue = _this.getScrollPropertyValue(scrollingView);
            if (scrollingView && !__WEBPACK_IMPORTED_MODULE_2__ng2_page_scroll_util_service__["a" /* PageScrollUtilService */].isUndefinedOrNull(startScrollPropertyValue)) {
                var scrollDistance = Math.abs(startScrollPropertyValue - position);
                // The movement we need to perform is less than 2px
                // This we consider a small movement which some browser may not perform when
                // changing the scrollTop/scrollLeft property
                // Thus in this cases we do not stop the scroll animation, although setting the
                // scrollTop/scrollLeft value "fails"
                var isSmallMovement = scrollDistance < __WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */]._minScrollDistance;
                if (!_this.verticalScrolling) {
                    scrollingView.scrollLeft = position;
                }
                else {
                    scrollingView.scrollTop = position;
                }
                // Return true of setting the new scrollTop/scrollLeft value worked
                // We consider that it worked if the new scrollTop/scrollLeft value is closer to the
                // desired scrollTop/scrollLeft than before (it might not be exactly the value we
                // set due to dpi or rounding irregularities)
                if (isSmallMovement || scrollDistance > Math.abs(_this.getScrollPropertyValue(scrollingView) - position)) {
                    return true;
                }
            }
            return oneAlreadyWorked;
        }, false);
    };
    /**
     * Trigger firing a animation finish event
     * @param value Whether the animation finished at the target (true) or got interrupted (false)
     */
    PageScrollInstance.prototype.fireEvent = function (value) {
        if (this._pageScrollFinish) {
            this._pageScrollFinish.emit(value);
        }
    };
    /**
     * Attach the interrupt listeners to the PageScrollInstance body. The given interruptReporter
     * will be called if any of the attached events is fired.
     *
     * Possibly attached interruptListeners are automatically removed from the body before the new one will be attached.
     *
     * @param interruptReporter
     */
    PageScrollInstance.prototype.attachInterruptListeners = function (interruptReporter) {
        var _this = this;
        if (this._interruptListenersAttached) {
            // Detach possibly existing listeners first
            this.detachInterruptListeners();
        }
        this._interruptListener = function (event) {
            interruptReporter.report(event, _this);
        };
        __WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */]._interruptEvents.forEach(function (event) { return _this.document.body.addEventListener(event, _this._interruptListener); });
        this._interruptListenersAttached = true;
    };
    /**
     * Remove event listeners from the body and stop listening for events that might be treated as "animation
     * interrupt" events.
     */
    PageScrollInstance.prototype.detachInterruptListeners = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */]._interruptEvents.forEach(function (event) { return _this.document.body.removeEventListener(event, _this._interruptListener); });
        this._interruptListenersAttached = false;
    };
    Object.defineProperty(PageScrollInstance.prototype, "namespace", {
        get: function () {
            return this._namespace;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "scrollTarget", {
        get: function () {
            return this._scrollTarget;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "verticalScrolling", {
        get: function () {
            return this._verticalScrolling;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "scrollingViews", {
        get: function () {
            return this._scrollingViews;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "startScrollPosition", {
        get: function () {
            return this._startScrollPosition;
        },
        set: function (value) {
            this._startScrollPosition = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "targetScrollPosition", {
        get: function () {
            return this._targetScrollPosition;
        },
        set: function (value) {
            this._targetScrollPosition = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "distanceToScroll", {
        get: function () {
            return this._distanceToScroll;
        },
        set: function (value) {
            this._distanceToScroll = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "executionDuration", {
        get: function () {
            return this._executionDuration;
        },
        set: function (value) {
            this._executionDuration = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "easingLogic", {
        get: function () {
            return this._easingLogic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "interruptible", {
        get: function () {
            return this._interruptible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "startTime", {
        get: function () {
            return this._startTime;
        },
        set: function (value) {
            this._startTime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "endTime", {
        get: function () {
            return this._endTime;
        },
        set: function (value) {
            this._endTime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "timer", {
        get: function () {
            return this._timer;
        },
        set: function (value) {
            this._timer = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageScrollInstance.prototype, "interruptListenersAttached", {
        get: function () {
            return this._interruptListenersAttached;
        },
        enumerable: true,
        configurable: true
    });
    return PageScrollInstance;
}());



/***/ }),

/***/ "./node_modules/ng2-page-scroll/src/ng2-page-scroll-util.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageScrollUtilService; });
var PageScrollUtilService = (function () {
    function PageScrollUtilService() {
    }
    /**
     * Util method to check whether a given variable is either undefined or null
     * @param variable
     * @returns {boolean} true the variable is undefined or null
     */
    PageScrollUtilService.isUndefinedOrNull = function (variable) {
        return (typeof variable === 'undefined') || variable === undefined || variable === null;
    };
    PageScrollUtilService.extractElementPosition = function (document, scrollTargetElement) {
        var body = document.body;
        var docEl = document.documentElement;
        var windowPageYOffset = document.defaultView && document.defaultView.pageYOffset || undefined;
        var windowPageXOffset = document.defaultView && document.defaultView.pageXOffset || undefined;
        var scrollTop = windowPageYOffset || docEl.scrollTop || body.scrollTop;
        var scrollLeft = windowPageXOffset || docEl.scrollLeft || body.scrollLeft;
        var clientTop = docEl.clientTop || body.clientTop || 0;
        var clientLeft = docEl.clientLeft || body.clientLeft || 0;
        if (PageScrollUtilService.isUndefinedOrNull(scrollTargetElement)) {
            // No element found, so return the current position to not cause any change in scroll position
            return { top: scrollTop, left: scrollLeft };
        }
        var box = scrollTargetElement.getBoundingClientRect();
        var top = box.top + scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;
        return { top: Math.round(top), left: Math.round(left) };
    };
    return PageScrollUtilService;
}());



/***/ }),

/***/ "./node_modules/ng2-page-scroll/src/ng2-page-scroll.directive.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageScroll; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ng2_page_scroll_service__ = __webpack_require__("./node_modules/ng2-page-scroll/src/ng2-page-scroll.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ng2_page_scroll_instance__ = __webpack_require__("./node_modules/ng2-page-scroll/src/ng2-page-scroll-instance.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng2_page_scroll_util_service__ = __webpack_require__("./node_modules/ng2-page-scroll/src/ng2-page-scroll-util.service.js");






var PageScroll = (function () {
    function PageScroll(pageScrollService, router, document) {
        this.pageScrollService = pageScrollService;
        this.router = router;
        this.pageScrollTarget = null;
        this.pageScrollHorizontal = null;
        this.pageScrollOffset = null;
        this.pageScrollDuration = null;
        this.pageScrollSpeed = null;
        this.pageScrollEasing = null;
        this.pageScrollAdjustHash = false;
        this.pageScroll = null;
        this.pageScrollFinish = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.document = document;
    }
    PageScroll.prototype.ngOnChanges = function (changes) {
        // Some inputs changed, reset the pageScrollInstance
        this.pageScrollInstance = undefined;
    };
    PageScroll.prototype.ngOnDestroy = function () {
        if (this.pageScrollInstance) {
            this.pageScrollService.stop(this.pageScrollInstance);
        }
        return undefined;
    };
    PageScroll.prototype.generatePageScrollInstance = function () {
        if (__WEBPACK_IMPORTED_MODULE_5__ng2_page_scroll_util_service__["a" /* PageScrollUtilService */].isUndefinedOrNull(this.pageScrollInstance)) {
            this.pageScrollInstance = __WEBPACK_IMPORTED_MODULE_4__ng2_page_scroll_instance__["a" /* PageScrollInstance */].newInstance({
                document: this.document,
                scrollTarget: this.pageScrollTarget || this.href,
                scrollingViews: null,
                namespace: this.pageScroll,
                verticalScrolling: !this.pageScrollHorizontal,
                pageScrollOffset: this.pageScrollOffset,
                pageScrollInterruptible: this.pageScrollInterruptible,
                pageScrollEasingLogic: this.pageScrollEasing,
                pageScrollDuration: this.pageScrollDuration,
                pageScrollSpeed: this.pageScrollSpeed,
                pageScrollFinishListener: this.pageScrollFinish
            });
        }
        return this.pageScrollInstance;
    };
    PageScroll.prototype.pushRouterState = function () {
        if (this.pageScrollAdjustHash && typeof this.pageScrollInstance.scrollTarget === 'string'
            && this.pageScrollInstance.scrollTarget.substr(0, 1) === '#') {
            // "Navigate" to the current route again and this time set the fragment/hash
            this.router.navigate([], {
                fragment: this.pageScrollInstance.scrollTarget.substr(1),
                preserveQueryParams: true
            });
        }
    };
    PageScroll.prototype.scroll = function () {
        var pageScrollInstance = this.generatePageScrollInstance();
        this.pushRouterState();
        this.pageScrollService.start(pageScrollInstance);
    };
    PageScroll.prototype.handleClick = function (clickEvent) {
        var _this = this;
        if (this.routerLink && this.router !== null && this.router !== undefined) {
            var urlTree = void 0;
            if (typeof this.routerLink === 'string') {
                urlTree = this.router.parseUrl(this.routerLink);
            }
            else {
                urlTree = this.router.createUrlTree(this.routerLink);
            }
            if (!this.router.isActive(urlTree, true)) {
                // We need to navigate their first.
                // Navigation is handled by the routerLink directive
                // so we only need to listen for route change
                var subscription_1 = this.router.events.subscribe(function (routerEvent) {
                    if (routerEvent instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* NavigationEnd */]) {
                        subscription_1.unsubscribe();
                        // use a timeout to start scrolling as soon as the stack is cleared
                        setTimeout(function () {
                            _this.scroll();
                        }, 0);
                    }
                    else if (routerEvent instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* NavigationError */] || routerEvent instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* NavigationCancel */]) {
                        subscription_1.unsubscribe();
                    }
                });
                return false; // to preventDefault()
            }
        }
        this.scroll();
        return false; // to preventDefault()
    };
    PageScroll.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                    selector: '[pageScroll]',
                    host: {
                        '(click)': 'handleClick($event)',
                    }
                },] },
    ];
    /** @nocollapse */
    PageScroll.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_3__ng2_page_scroll_service__["b" /* PageScrollService */], },
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */], decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] },] },
        { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_2__angular_common__["DOCUMENT"],] },] },
    ]; };
    PageScroll.propDecorators = {
        'routerLink': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'href': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'pageScrollTarget': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'pageScrollHorizontal': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'pageScrollOffset': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'pageScrollDuration': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'pageScrollSpeed': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'pageScrollEasing': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'pageScrollInterruptible': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'pageScrollAdjustHash': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'pageScroll': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'pageScrollFinish': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    };
    return PageScroll;
}());



/***/ }),

/***/ "./node_modules/ng2-page-scroll/src/ng2-page-scroll.module.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ng2PageScrollModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng2_page_scroll_service__ = __webpack_require__("./node_modules/ng2-page-scroll/src/ng2-page-scroll.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ng2_page_scroll_directive__ = __webpack_require__("./node_modules/ng2-page-scroll/src/ng2-page-scroll.directive.js");




var Ng2PageScrollModule = (function () {
    function Ng2PageScrollModule() {
    }
    /** @deprecated since v4.0.0-beta.10 (https://github.com/Nolanus/ng2-page-scroll/pull/190) */
    Ng2PageScrollModule.forRoot = function () {
        return {
            ngModule: Ng2PageScrollModule,
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_2__ng2_page_scroll_service__["b" /* PageScrollService */], useClass: __WEBPACK_IMPORTED_MODULE_2__ng2_page_scroll_service__["b" /* PageScrollService */] }
            ]
        };
    };
    Ng2PageScrollModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"], args: [{
                    imports: [__WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"]],
                    declarations: [__WEBPACK_IMPORTED_MODULE_3__ng2_page_scroll_directive__["a" /* PageScroll */]],
                    exports: [__WEBPACK_IMPORTED_MODULE_3__ng2_page_scroll_directive__["a" /* PageScroll */]],
                    providers: [__WEBPACK_IMPORTED_MODULE_2__ng2_page_scroll_service__["a" /* NG2PAGESCROLL_SERVICE_PROVIDER */]]
                },] },
    ];
    /** @nocollapse */
    Ng2PageScrollModule.ctorParameters = function () { return []; };
    return Ng2PageScrollModule;
}());



/***/ }),

/***/ "./node_modules/ng2-page-scroll/src/ng2-page-scroll.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PageScrollService; });
/* unused harmony export NG2PAGESCROLL_SERVICE_PROVIDER_FACTORY */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NG2PAGESCROLL_SERVICE_PROVIDER; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__ = __webpack_require__("./node_modules/ng2-page-scroll/src/ng2-page-scroll-config.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng2_page_scroll_util_service__ = __webpack_require__("./node_modules/ng2-page-scroll/src/ng2-page-scroll-util.service.js");



var PageScrollService = (function () {
    function PageScrollService() {
        var _this = this;
        this.runningInstances = [];
        this.onInterrupted = {
            report: function (event, pageScrollInstance) {
                if (!pageScrollInstance.interruptible) {
                    // Non-interruptible anyway, so do not stop anything
                    return;
                }
                var shouldStop = true;
                if (event.type === 'keyup') {
                    // Only stop if specific keys have been pressed, for all others don't stop anything
                    if (__WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */]._interruptKeys.indexOf(event.keyCode) === -1) {
                        // The pressed key is not in the list of interrupting keys
                        shouldStop = false;
                    }
                }
                else if (event.type === 'mousedown') {
                    // For mousedown events we only stop the scroll animation of the mouse has
                    // been clicked inside the scrolling container
                    if (!pageScrollInstance.scrollingViews.some(function (scrollingView) { return scrollingView.contains(event.target); })) {
                        // Mouse clicked an element which is not inside any of the the scrolling containers
                        shouldStop = false;
                    }
                }
                if (shouldStop) {
                    _this.stopAll(pageScrollInstance.namespace);
                }
            }
        };
        if (PageScrollService.instanceCounter > 0 &&
            (__WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */]._logLevel >= 2 || (__WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */]._logLevel >= 1 && Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["isDevMode"])()))) {
            console.warn('An instance of PageScrollService already exists, usually ' +
                'including one provider should be enough, so double check.');
        }
        PageScrollService.instanceCounter++;
    }
    PageScrollService.prototype.stopInternal = function (interrupted, pageScrollInstance) {
        var index = this.runningInstances.indexOf(pageScrollInstance);
        if (index >= 0) {
            this.runningInstances.splice(index, 1);
        }
        if (pageScrollInstance.interruptListenersAttached) {
            pageScrollInstance.detachInterruptListeners();
        }
        if (pageScrollInstance.timer) {
            // Clear/Stop the timer
            clearInterval(pageScrollInstance.timer);
            // Clear the reference to this timer
            pageScrollInstance.timer = undefined;
            pageScrollInstance.fireEvent(!interrupted);
            return true;
        }
        return false;
    };
    /**
     * Start a scroll animation. All properties of the animation are stored in the given {@link PageScrollInstance} object.
     *
     * This is the core functionality of the whole library.
     *
     * @param pageScrollInstance
     */
    PageScrollService.prototype.start = function (pageScrollInstance) {
        var _this = this;
        // Stop all possibly running scroll animations in the same namespace
        this.stopAll(pageScrollInstance.namespace);
        if (pageScrollInstance.scrollingViews === null || pageScrollInstance.scrollingViews.length === 0) {
            // No scrollingViews specified, thus we can't animate anything
            if (__WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */]._logLevel >= 2 || (__WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */]._logLevel >= 1 && Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["isDevMode"])())) {
                console.warn('No scrollingViews specified, this ng2-page-scroll does not know which DOM elements to scroll');
            }
            return;
        }
        var startScrollPositionFound = false;
        // Reset start scroll position to 0. If any of the scrollingViews has a different one, it will be extracted next
        pageScrollInstance.startScrollPosition = 0;
        // Get the start scroll position from the scrollingViews (e.g. if the user already scrolled down the content)
        pageScrollInstance.scrollingViews.forEach(function (scrollingView) {
            if (__WEBPACK_IMPORTED_MODULE_2__ng2_page_scroll_util_service__["a" /* PageScrollUtilService */].isUndefinedOrNull(scrollingView)) {
                return;
            }
            // Get the scrollTop or scrollLeft value of the first scrollingView that returns a value for its "scrollTop"
            // or "scrollLeft" property that is not undefined and unequal to 0
            var scrollPosition = pageScrollInstance.getScrollPropertyValue(scrollingView);
            if (!startScrollPositionFound && scrollPosition) {
                // We found a scrollingView that does not have scrollTop or scrollLeft 0
                // Return the scroll position value, as this will be our startScrollPosition
                pageScrollInstance.startScrollPosition = scrollPosition;
                startScrollPositionFound = true;
            }
        });
        var pageScrollOffset = pageScrollInstance.getCurrentOffset();
        // Calculate the target position that the scroll animation should go to
        var scrollTargetPosition = pageScrollInstance.extractScrollTargetPosition();
        pageScrollInstance.targetScrollPosition = Math.round((pageScrollInstance.verticalScrolling ? scrollTargetPosition.top : scrollTargetPosition.left) - pageScrollOffset);
        // Calculate the distance we need to go in total
        pageScrollInstance.distanceToScroll = pageScrollInstance.targetScrollPosition - pageScrollInstance.startScrollPosition;
        if (isNaN(pageScrollInstance.distanceToScroll)) {
            // We weren't able to find the target position, maybe the element does not exist?
            if (__WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */]._logLevel >= 2 || (__WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */]._logLevel >= 1 && Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["isDevMode"])())) {
                console.log('Scrolling not possible, as we can\'t find the specified target');
            }
            pageScrollInstance.fireEvent(false);
            return;
        }
        // We're at the final destination already
        // OR we need to scroll down but are already at the end
        // OR we need to scroll up but are at the top already
        var allReadyAtDestination = Math.abs(pageScrollInstance.distanceToScroll) < __WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */]._minScrollDistance;
        // Check how long we need to scroll if a speed option is given
        // Default executionDuration is the specified duration
        pageScrollInstance.executionDuration = pageScrollInstance.duration;
        // Maybe we need to pay attention to the speed option?
        if (!__WEBPACK_IMPORTED_MODULE_2__ng2_page_scroll_util_service__["a" /* PageScrollUtilService */].isUndefinedOrNull(pageScrollInstance.speed) && __WEBPACK_IMPORTED_MODULE_2__ng2_page_scroll_util_service__["a" /* PageScrollUtilService */].isUndefinedOrNull(pageScrollInstance.duration)) {
            // Speed option is set and no duration => calculate duration based on speed and scroll distance
            pageScrollInstance.executionDuration = Math.abs(pageScrollInstance.distanceToScroll) / pageScrollInstance.speed * 1000;
        }
        // We should go there directly, as our "animation" would have one big step
        // only anyway and this way we save the interval stuff
        var tooShortInterval = pageScrollInstance.executionDuration <= __WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */]._interval;
        if (allReadyAtDestination || tooShortInterval) {
            if (__WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */]._logLevel >= 2 || (__WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */]._logLevel >= 1 && Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["isDevMode"])())) {
                if (allReadyAtDestination) {
                    console.log('Scrolling not possible, as we can\'t get any closer to the destination');
                }
                else {
                    console.log('Scroll duration shorter that interval length, jumping to target');
                }
            }
            pageScrollInstance.setScrollPosition(pageScrollInstance.targetScrollPosition);
            pageScrollInstance.fireEvent(true);
            return;
        }
        // Register the interrupt listeners if we want an interruptible scroll animation
        if (pageScrollInstance.interruptible ||
            (__WEBPACK_IMPORTED_MODULE_2__ng2_page_scroll_util_service__["a" /* PageScrollUtilService */].isUndefinedOrNull(pageScrollInstance.interruptible) && __WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */].defaultInterruptible)) {
            pageScrollInstance.attachInterruptListeners(this.onInterrupted);
        }
        // Let's get started, get the start time...
        pageScrollInstance.startTime = new Date().getTime();
        // .. and calculate the end time (when we need to finish at last)
        pageScrollInstance.endTime = pageScrollInstance.startTime + pageScrollInstance.executionDuration;
        pageScrollInstance.timer = setInterval(function (_pageScrollInstance) {
            // Take the current time
            var currentTime = new Date().getTime();
            // Determine the new scroll position
            var newScrollPosition;
            var stopNow = false;
            if (_pageScrollInstance.endTime <= currentTime) {
                // We're over the time already, so go the targetScrollPosition (aka destination)
                newScrollPosition = _pageScrollInstance.targetScrollPosition;
                stopNow = true;
            }
            else {
                // Calculate the scroll position based on the current time using the easing function
                newScrollPosition = Math.round(_pageScrollInstance.easingLogic.ease(currentTime - _pageScrollInstance.startTime, _pageScrollInstance.startScrollPosition, _pageScrollInstance.distanceToScroll, _pageScrollInstance.executionDuration));
            }
            // Set the new scrollPosition to all scrollingViews elements
            if (!_pageScrollInstance.setScrollPosition(newScrollPosition)) {
                // Setting the new scrollTop/scrollLeft value failed for all ScrollingViews
                // early stop the scroll animation to save resources
                stopNow = true;
            }
            // At the end do the internal stop maintenance and fire the pageScrollFinish event
            // (otherwise the event might arrive at "too early")
            if (stopNow) {
                _this.stopInternal(false, _pageScrollInstance);
            }
        }, __WEBPACK_IMPORTED_MODULE_1__ng2_page_scroll_config__["a" /* PageScrollConfig */]._interval, pageScrollInstance);
        // Register the instance as running one
        this.runningInstances.push(pageScrollInstance);
    };
    /**
     * Stop all running scroll animations. Optionally limit to stop only the ones of specific namespace.
     *
     * @param namespace
     * @returns {boolean}
     */
    PageScrollService.prototype.stopAll = function (namespace) {
        if (this.runningInstances.length > 0) {
            var stoppedSome = false;
            for (var i = 0; i < this.runningInstances.length; ++i) {
                var pageScrollInstance = this.runningInstances[i];
                if (__WEBPACK_IMPORTED_MODULE_2__ng2_page_scroll_util_service__["a" /* PageScrollUtilService */].isUndefinedOrNull(namespace) || namespace.length === 0 ||
                    pageScrollInstance.namespace === namespace) {
                    stoppedSome = true;
                    this.stopInternal(true, pageScrollInstance);
                    // Decrease the counter, as we removed an item from the array we iterate over
                    i--;
                }
            }
            return stoppedSome;
        }
        return false;
    };
    PageScrollService.prototype.stop = function (pageScrollInstance) {
        return this.stopInternal(true, pageScrollInstance);
    };
    PageScrollService.instanceCounter = 0;
    PageScrollService.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    PageScrollService.ctorParameters = function () { return []; };
    return PageScrollService;
}());

/* singleton pattern taken from https://github.com/angular/angular/issues/13854 */
function NG2PAGESCROLL_SERVICE_PROVIDER_FACTORY(parentDispatcher) {
    return parentDispatcher || new PageScrollService();
}
var NG2PAGESCROLL_SERVICE_PROVIDER = {
    provide: PageScrollService,
    deps: [[new __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"](), new __WEBPACK_IMPORTED_MODULE_0__angular_core__["SkipSelf"](), PageScrollService]],
    useFactory: NG2PAGESCROLL_SERVICE_PROVIDER_FACTORY
};


/***/ }),

/***/ "./node_modules/ngx-infinite-scroll/modules/ngx-infinite-scroll.es5.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfiniteScrollModule; });
/* unused harmony export ɵa */
/* unused harmony export ɵc */
/* unused harmony export ɵb */
/* unused harmony export ɵd */
/* unused harmony export ɵe */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_fromEvent__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/fromEvent.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_sampleTime__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/sampleTime.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_mergeMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/mergeMap.js");







var AxisResolverFactory = (function () {
    function AxisResolverFactory() {
    }
    /**
     * @param {?=} vertical
     * @return {?}
     */
    AxisResolverFactory.prototype.create = function (vertical) {
        if (vertical === void 0) { vertical = true; }
        return new AxisResolver(vertical);
    };
    return AxisResolverFactory;
}());
AxisResolverFactory.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
AxisResolverFactory.ctorParameters = function () { return []; };
var AxisResolver = (function () {
    /**
     * @param {?=} vertical
     */
    function AxisResolver(vertical) {
        if (vertical === void 0) { vertical = true; }
        this.vertical = vertical;
    }
    /**
     * @return {?}
     */
    AxisResolver.prototype.clientHeightKey = function () { return this.vertical ? 'clientHeight' : 'clientWidth'; };
    /**
     * @return {?}
     */
    AxisResolver.prototype.offsetHeightKey = function () { return this.vertical ? 'offsetHeight' : 'offsetWidth'; };
    /**
     * @return {?}
     */
    AxisResolver.prototype.scrollHeightKey = function () { return this.vertical ? 'scrollHeight' : 'scrollWidth'; };
    /**
     * @return {?}
     */
    AxisResolver.prototype.pageYOffsetKey = function () { return this.vertical ? 'pageYOffset' : 'pageXOffset'; };
    /**
     * @return {?}
     */
    AxisResolver.prototype.offsetTopKey = function () { return this.vertical ? 'offsetTop' : 'offsetLeft'; };
    /**
     * @return {?}
     */
    AxisResolver.prototype.scrollTopKey = function () { return this.vertical ? 'scrollTop' : 'scrollLeft'; };
    /**
     * @return {?}
     */
    AxisResolver.prototype.topKey = function () { return this.vertical ? 'top' : 'left'; };
    return AxisResolver;
}());
var PositionResolverFactory = (function () {
    /**
     * @param {?} axisResolver
     */
    function PositionResolverFactory(axisResolver) {
        this.axisResolver = axisResolver;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    PositionResolverFactory.prototype.create = function (options) {
        return new PositionResolver(this.axisResolver.create(!options.horizontal), options);
    };
    return PositionResolverFactory;
}());
PositionResolverFactory.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
PositionResolverFactory.ctorParameters = function () { return [
    { type: AxisResolverFactory, },
]; };
var PositionResolver = (function () {
    /**
     * @param {?} axis
     * @param {?} options
     */
    function PositionResolver(axis, options) {
        this.axis = axis;
        this.options = options;
        this.resolveContainer(this.options.windowElement);
        this.defineContainer(this.options.windowElement);
    }
    /**
     * @param {?} windowElement
     * @return {?}
     */
    PositionResolver.prototype.defineContainer = function (windowElement) {
        if (this.resolveContainer(windowElement) || !windowElement.nativeElement) {
            this.container = windowElement;
        }
        else {
            this.container = windowElement.nativeElement;
        }
        return this.container;
    };
    /**
     * @param {?} windowElement
     * @return {?}
     */
    PositionResolver.prototype.resolveContainer = function (windowElement) {
        var /** @type {?} */ isContainerWindow = Object.prototype.toString.call(windowElement).includes('Window');
        this.isContainerWindow = isContainerWindow;
        return isContainerWindow;
    };
    /**
     * @return {?}
     */
    PositionResolver.prototype.getDocumentElement = function () {
        return this.isContainerWindow
            ? this.options.windowElement.document.documentElement
            : null;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    PositionResolver.prototype.calculatePoints = function (element) {
        return this.isContainerWindow
            ? this.calculatePointsForWindow(element)
            : this.calculatePointsForElement(element);
    };
    /**
     * @param {?} element
     * @return {?}
     */
    PositionResolver.prototype.calculatePointsForWindow = function (element) {
        // container's height
        var /** @type {?} */ height = this.height(this.container);
        // scrolled until now / current y point
        var /** @type {?} */ scrolledUntilNow = height + this.pageYOffset(this.getDocumentElement());
        // total height / most bottom y point
        var /** @type {?} */ totalToScroll = this.offsetTop(element.nativeElement) + this.height(element.nativeElement);
        return { height: height, scrolledUntilNow: scrolledUntilNow, totalToScroll: totalToScroll };
    };
    /**
     * @param {?} element
     * @return {?}
     */
    PositionResolver.prototype.calculatePointsForElement = function (element) {
        var /** @type {?} */ scrollTop = this.axis.scrollTopKey();
        var /** @type {?} */ scrollHeight = this.axis.scrollHeightKey();
        var /** @type {?} */ container = this.container;
        var /** @type {?} */ height = this.height(container);
        // perhaps use this.container.offsetTop instead of 'scrollTop'
        var /** @type {?} */ scrolledUntilNow = container[scrollTop];
        var /** @type {?} */ containerTopOffset = 0;
        var /** @type {?} */ offsetTop = this.offsetTop(container);
        if (offsetTop !== void 0) {
            containerTopOffset = offsetTop;
        }
        var /** @type {?} */ totalToScroll = container[scrollHeight];
        return { height: height, scrolledUntilNow: scrolledUntilNow, totalToScroll: totalToScroll };
    };
    /**
     * @param {?} elem
     * @return {?}
     */
    PositionResolver.prototype.height = function (elem) {
        var /** @type {?} */ offsetHeight = this.axis.offsetHeightKey();
        var /** @type {?} */ clientHeight = this.axis.clientHeightKey();
        // elem = elem.nativeElement;
        if (isNaN(elem[offsetHeight])) {
            return this.getDocumentElement()[clientHeight];
        }
        else {
            return elem[offsetHeight];
        }
    };
    /**
     * @param {?} elem
     * @return {?}
     */
    PositionResolver.prototype.offsetTop = function (elem) {
        var /** @type {?} */ top = this.axis.topKey();
        // elem = elem.nativeElement;
        if (!elem.getBoundingClientRect) {
            return;
        }
        return elem.getBoundingClientRect()[top] + this.pageYOffset(elem);
    };
    /**
     * @param {?} elem
     * @return {?}
     */
    PositionResolver.prototype.pageYOffset = function (elem) {
        var /** @type {?} */ pageYOffset = this.axis.pageYOffsetKey();
        var /** @type {?} */ scrollTop = this.axis.scrollTopKey();
        var /** @type {?} */ offsetTop = this.axis.offsetTopKey();
        // elem = elem.nativeElement;
        if (isNaN(window[pageYOffset])) {
            return this.getDocumentElement()[scrollTop];
        }
        else if (elem.ownerDocument) {
            return elem.ownerDocument.defaultView[pageYOffset];
        }
        else {
            return elem[offsetTop];
        }
    };
    return PositionResolver;
}());
var ScrollRegister = (function () {
    function ScrollRegister() {
    }
    /**
     * @param {?} options
     * @return {?}
     */
    ScrollRegister.prototype.attachEvent = function (options) {
        var /** @type {?} */ scroller$ = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromEvent(options.container, 'scroll')
            .sampleTime(options.throttleDuration)
            .filter(options.filterBefore)
            .mergeMap(function (ev) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of(options.mergeMap(ev)); })
            .subscribe(options.scrollHandler);
        return scroller$;
    };
    return ScrollRegister;
}());
ScrollRegister.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
ScrollRegister.ctorParameters = function () { return []; };
var ScrollResolver = (function () {
    function ScrollResolver() {
        this.lastScrollPosition = 0;
    }
    /**
     * @param {?} container
     * @param {?} config
     * @param {?} scrollingDown
     * @return {?}
     */
    ScrollResolver.prototype.shouldScroll = function (container, config, scrollingDown) {
        var /** @type {?} */ distance = config.distance;
        var /** @type {?} */ remaining;
        var /** @type {?} */ containerBreakpoint;
        if (scrollingDown) {
            remaining = container.totalToScroll - container.scrolledUntilNow;
            containerBreakpoint = container.height * distance.down + 1;
        }
        else {
            remaining = container.scrolledUntilNow;
            containerBreakpoint = container.height * distance.up + 1;
        }
        var /** @type {?} */ shouldScroll = remaining <= containerBreakpoint;
        this.lastScrollPosition = container.scrolledUntilNow;
        return shouldScroll;
    };
    /**
     * @param {?} container
     * @return {?}
     */
    ScrollResolver.prototype.isScrollingDown = function (container) {
        return this.lastScrollPosition < container.scrolledUntilNow;
    };
    /**
     * @param {?} container
     * @param {?} config
     * @return {?}
     */
    ScrollResolver.prototype.getScrollStats = function (container, config) {
        var /** @type {?} */ isScrollingDown = this.isScrollingDown(container);
        var /** @type {?} */ shouldScroll = this.shouldScroll(container, config, isScrollingDown);
        return { isScrollingDown: isScrollingDown, shouldScroll: shouldScroll };
    };
    return ScrollResolver;
}());
ScrollResolver.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
ScrollResolver.ctorParameters = function () { return []; };
var InfiniteScrollDirective = (function () {
    /**
     * @param {?} element
     * @param {?} zone
     * @param {?} positionResolverFactory
     * @param {?} scrollRegister
     * @param {?} scrollerResolver
     */
    function InfiniteScrollDirective(element, zone, positionResolverFactory, scrollRegister, scrollerResolver) {
        this.element = element;
        this.zone = zone;
        this.positionResolverFactory = positionResolverFactory;
        this.scrollRegister = scrollRegister;
        this.scrollerResolver = scrollerResolver;
        this.scrolled = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.scrolledUp = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.infiniteScrollDistance = 2;
        this.infiniteScrollUpDistance = 1.5;
        this.infiniteScrollThrottle = 300;
        this.infiniteScrollDisabled = false;
        this.infiniteScrollContainer = null;
        this.scrollWindow = true;
        this.immediateCheck = false;
        this.horizontal = false;
        this.alwaysCallback = false;
    }
    /**
     * @return {?}
     */
    InfiniteScrollDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (typeof window !== 'undefined') {
            var /** @type {?} */ containerElement = this.resolveContainerElement();
            var /** @type {?} */ positionResolver_1 = this.positionResolverFactory.create({
                horizontal: this.horizontal,
                windowElement: containerElement
            });
            var /** @type {?} */ options = {
                container: positionResolver_1.container,
                filterBefore: function () { return !_this.infiniteScrollDisabled; },
                mergeMap: function () { return positionResolver_1.calculatePoints(_this.element); },
                scrollHandler: function (container) { return _this.handleOnScroll(container); },
                throttleDuration: this.infiniteScrollThrottle
            };
            this.disposeScroller = this.scrollRegister.attachEvent(options);
        }
    };
    /**
     * @param {?} container
     * @return {?}
     */
    InfiniteScrollDirective.prototype.handleOnScroll = function (container) {
        var /** @type {?} */ scrollResolverConfig = {
            distance: {
                down: this.infiniteScrollDistance,
                up: this.infiniteScrollUpDistance
            }
        };
        var /** @type {?} */ scrollStats = this.scrollerResolver.getScrollStats(container, scrollResolverConfig);
        if (this.shouldTriggerEvents(scrollStats.shouldScroll)) {
            var /** @type {?} */ infiniteScrollEvent = {
                currentScrollPosition: container.scrolledUntilNow
            };
            if (scrollStats.isScrollingDown) {
                this.onScrollDown(infiniteScrollEvent);
            }
            else {
                this.onScrollUp(infiniteScrollEvent);
            }
        }
    };
    /**
     * @param {?} shouldScroll
     * @return {?}
     */
    InfiniteScrollDirective.prototype.shouldTriggerEvents = function (shouldScroll) {
        return (this.alwaysCallback || shouldScroll) && !this.infiniteScrollDisabled;
    };
    /**
     * @return {?}
     */
    InfiniteScrollDirective.prototype.ngOnDestroy = function () {
        if (this.disposeScroller) {
            this.disposeScroller.unsubscribe();
        }
    };
    /**
     * @param {?=} data
     * @return {?}
     */
    InfiniteScrollDirective.prototype.onScrollDown = function (data) {
        var _this = this;
        if (data === void 0) { data = { currentScrollPosition: 0 }; }
        this.zone.run(function () { return _this.scrolled.emit(data); });
    };
    /**
     * @param {?=} data
     * @return {?}
     */
    InfiniteScrollDirective.prototype.onScrollUp = function (data) {
        var _this = this;
        if (data === void 0) { data = { currentScrollPosition: 0 }; }
        this.zone.run(function () { return _this.scrolledUp.emit(data); });
    };
    /**
     * @return {?}
     */
    InfiniteScrollDirective.prototype.resolveContainerElement = function () {
        var /** @type {?} */ selector = this.infiniteScrollContainer;
        var /** @type {?} */ hasWindow = window && window.hasOwnProperty('document');
        var /** @type {?} */ containerIsString = selector && hasWindow && typeof (this.infiniteScrollContainer) === 'string';
        var /** @type {?} */ container = containerIsString
            ? window.document.querySelector(selector)
            : selector;
        if (!selector) {
            container = this.scrollWindow ? window : this.element;
        }
        return container;
    };
    return InfiniteScrollDirective;
}());
InfiniteScrollDirective.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: '[infiniteScroll], [infinite-scroll], [data-infinite-scroll]'
            },] },
];
/**
 * @nocollapse
 */
InfiniteScrollDirective.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], },
    { type: PositionResolverFactory, },
    { type: ScrollRegister, },
    { type: ScrollResolver, },
]; };
InfiniteScrollDirective.propDecorators = {
    'scrolled': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'scrolledUp': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'infiniteScrollDistance': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'infiniteScrollUpDistance': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'infiniteScrollThrottle': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'infiniteScrollDisabled': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'infiniteScrollContainer': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'scrollWindow': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'immediateCheck': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'horizontal': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'alwaysCallback': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
};
var InfiniteScrollModule = (function () {
    function InfiniteScrollModule() {
    }
    return InfiniteScrollModule;
}());
InfiniteScrollModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                declarations: [InfiniteScrollDirective],
                exports: [InfiniteScrollDirective],
                imports: [],
                providers: [
                    AxisResolverFactory,
                    PositionResolverFactory,
                    ScrollRegister,
                    ScrollResolver
                ]
            },] },
];
/**
 * @nocollapse
 */
InfiniteScrollModule.ctorParameters = function () { return []; };
/**
 * Angular library starter.
 * Build an Angular library compatible with AoT compilation & Tree shaking.
 * Written by Roberto Simonetti.
 * MIT license.
 * https://github.com/robisim74/angular-library-starter
 */
/**
 * Entry point for all public APIs of the package.
 */
/**
 * Generated bundle index. Do not edit.
 */

//# sourceMappingURL=ngx-infinite-scroll.es5.js.map


/***/ }),

/***/ "./node_modules/ngx-siema/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__siema_component__ = __webpack_require__("./node_modules/ngx-siema/siema.component.js");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__siema_service__ = __webpack_require__("./node_modules/ngx-siema/siema.service.js");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__siema_module__ = __webpack_require__("./node_modules/ngx-siema/siema.module.js");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__siema_module__["a"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ngx-siema/siema.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NgxSiemaSlideComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgxSiemaComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_siema__ = __webpack_require__("./node_modules/siema/dist/siema.min.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_siema___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_siema__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__siema_service__ = __webpack_require__("./node_modules/ngx-siema/siema.service.js");



var NgxSiemaSlideComponent = (function () {
    function NgxSiemaSlideComponent() {
    }
    return NgxSiemaSlideComponent;
}());

NgxSiemaSlideComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                selector: 'ngx-siema-slide',
                styles: [
                    "\n      :host {\n        display: flex;\n      }\n    ",
                ],
                template: "\n    <ng-content></ng-content>\n  ",
            },] },
];
NgxSiemaSlideComponent.ctorParameters = function () { return []; };
var NgxSiemaComponent = (function () {
    function NgxSiemaComponent(ngxSiemaService) {
        this.ngxSiemaService = ngxSiemaService;
        this.next = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.prev = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.goTo = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.remove = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.insert = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.prepend = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.append = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.destroy = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.currentSlide = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    NgxSiemaComponent.prototype.ngAfterViewInit = function () {
        this.instance = new __WEBPACK_IMPORTED_MODULE_1_siema___default.a(this.options);
    };
    NgxSiemaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ngxClass = this.options.selector.replace('.', '');
        this.nextSubscription = this.ngxSiemaService.onNext()
            .subscribe(function (data) {
            if (_this.compareSelectors(data.selector) && _this.instance) {
                _this.instance.next(data.numbers, function () {
                    _this.next.emit({
                        selector: _this.options.selector,
                        currentSlide: _this.instance.currentSlide,
                    });
                    data.listener.next({ selector: _this.options.selector, currentSlide: _this.instance.currentSlide });
                });
            }
        });
        this.prevSubscription = this.ngxSiemaService.onPrev()
            .subscribe(function (data) {
            if (_this.compareSelectors(data.selector) && _this.instance) {
                _this.instance.prev(data.numbers, function () {
                    _this.prev.emit({
                        selector: _this.options.selector,
                        currentSlide: _this.instance.currentSlide,
                    });
                    data.listener.next({ selector: _this.options.selector, currentSlide: _this.instance.currentSlide });
                });
            }
        });
        this.goToSubscription = this.ngxSiemaService.onGoTo()
            .subscribe(function (data) {
            if (_this.compareSelectors(data.selector) && _this.instance) {
                _this.instance.goTo(data.index, function () {
                    _this.goTo.emit({
                        selector: _this.options.selector,
                        currentSlide: _this.instance.currentSlide,
                    });
                    data.listener.next({ selector: _this.options.selector, currentSlide: _this.instance.currentSlide });
                });
            }
        });
        this.removeSubscription = this.ngxSiemaService.onRemove()
            .subscribe(function (data) {
            if (_this.compareSelectors(data.selector) && _this.instance) {
                _this.instance.remove(data.index, function () {
                    _this.remove.emit({
                        selector: _this.options.selector,
                        currentSlide: _this.instance.currentSlide,
                    });
                    data.listener.next({ selector: _this.options.selector, currentSlide: _this.instance.currentSlide });
                });
            }
        });
        this.insertSubscription = this.ngxSiemaService.onInsert()
            .subscribe(function (data) {
            if (_this.compareSelectors(data.selector) && _this.instance) {
                _this.instance.insert(data.item, data.index, function () {
                    _this.insert.emit({
                        selector: _this.options.selector,
                        currentSlide: _this.instance.currentSlide,
                    });
                    data.listener.next({ selector: _this.options.selector, currentSlide: _this.instance.currentSlide });
                });
            }
        });
        this.prependSubscription = this.ngxSiemaService.onPrepend()
            .subscribe(function (data) {
            if (_this.compareSelectors(data.selector) && _this.instance) {
                _this.instance.prepend(data.item, function () {
                    _this.prepend.emit({
                        selector: _this.options.selector,
                        currentSlide: _this.instance.currentSlide,
                    });
                    data.listener.next({ selector: _this.options.selector, currentSlide: _this.instance.currentSlide });
                });
            }
        });
        this.appendSubscription = this.ngxSiemaService.onAppend()
            .subscribe(function (data) {
            if (_this.compareSelectors(data.selector) && _this.instance) {
                _this.instance.append(data.item, function () {
                    _this.append.emit({
                        selector: _this.options.selector,
                        currentSlide: _this.instance.currentSlide,
                    });
                    data.listener.next({ selector: _this.options.selector, currentSlide: _this.instance.currentSlide });
                });
            }
        });
        this.destroySubscription = this.ngxSiemaService.onDestroy()
            .subscribe(function (data) {
            if (_this.compareSelectors(data.selector) && _this.instance) {
                _this.instance.destroy(data.restoreMarkup, function () {
                    _this.destroy.emit({
                        selector: _this.options.selector,
                    });
                    data.listener.next({ selector: _this.options.selector });
                });
            }
        });
        this.currentSlideSubscription = this.ngxSiemaService.onCurrentSlide()
            .subscribe(function (data) {
            if (_this.compareSelectors(data.selector) && _this.instance) {
                _this.currentSlide.emit({
                    selector: _this.options.selector,
                    currentSlide: _this.instance.currentSlide,
                });
                data.listener.next({ selector: _this.options.selector, currentSlide: _this.instance.currentSlide });
            }
        });
    };
    NgxSiemaComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        if (this.instance) {
            setTimeout(function () {
                _this.instance.destroy();
                _this.instance = null;
            });
        }
        this.nextSubscription.unsubscribe();
        this.prevSubscription.unsubscribe();
        this.goToSubscription.unsubscribe();
        this.removeSubscription.unsubscribe();
        this.insertSubscription.unsubscribe();
        this.prependSubscription.unsubscribe();
        this.appendSubscription.unsubscribe();
        this.destroySubscription.unsubscribe();
        this.currentSlideSubscription.unsubscribe();
    };
    NgxSiemaComponent.prototype.onNext = function (numbers) {
        if (numbers === void 0) { numbers = 1; }
        this.instance.next(numbers, this.next.emit({
            currentSlide: this.instance.currentSlide,
        }));
    };
    NgxSiemaComponent.prototype.onPrev = function (numbers) {
        if (numbers === void 0) { numbers = 1; }
        this.instance.prev(numbers, this.next.emit({
            currentSlide: this.instance.currentSlide,
        }));
    };
    NgxSiemaComponent.prototype.onGoTo = function (index) {
        this.instance.goTo(index, this.goTo.emit({
            currentSlide: this.instance.currentSlide,
        }));
    };
    NgxSiemaComponent.prototype.onRemove = function (index) {
        this.instance.remove(index, this.remove.emit({
            currentSlide: this.instance.currentSlide,
        }));
    };
    NgxSiemaComponent.prototype.onInsert = function (item, index) {
        this.instance.insert(item, index, this.insert.emit({
            currentSlide: this.instance.currentSlide,
        }));
    };
    NgxSiemaComponent.prototype.onPrepend = function (item) {
        this.instance.prepend(item, this.prepend.emit({
            currentSlide: this.instance.currentSlide,
        }));
    };
    NgxSiemaComponent.prototype.onAppend = function (item) {
        this.instance.append(item, this.append.emit({
            currentSlide: this.instance.currentSlide,
        }));
    };
    NgxSiemaComponent.prototype.onDestroy = function (restoreMarkup) {
        if (restoreMarkup === void 0) { restoreMarkup = false; }
        this.instance.destroy(restoreMarkup, this.destroy.emit({
            currentSlide: this.instance.currentSlide,
        }));
    };
    NgxSiemaComponent.prototype.onCurrentSlide = function () {
        this.currentSlide.emit({
            currentSlide: this.instance.currentSlide,
        });
    };
    NgxSiemaComponent.prototype.compareSelectors = function (selector) {
        return !selector || selector === this.options.selector;
    };
    return NgxSiemaComponent;
}());

NgxSiemaComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                selector: 'ngx-siema',
                template: "\n    <div class=\"{{ ngxClass }}\">\n      <ng-content select=\"ngx-siema-slide\"></ng-content>\n    </div>\n  ",
            },] },
];
NgxSiemaComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__siema_service__["a" /* NgxSiemaService */], },
]; };
NgxSiemaComponent.propDecorators = {
    'options': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'next': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'prev': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'goTo': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'remove': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'insert': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'prepend': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'append': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'destroy': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'currentSlide': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
};
//# sourceMappingURL=siema.component.js.map

/***/ }),

/***/ "./node_modules/ngx-siema/siema.module.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgxSiemaModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__siema_component__ = __webpack_require__("./node_modules/ngx-siema/siema.component.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__siema_service__ = __webpack_require__("./node_modules/ngx-siema/siema.service.js");




var NgxSiemaModule = (function () {
    function NgxSiemaModule() {
    }
    NgxSiemaModule.forRoot = function () {
        return {
            ngModule: NgxSiemaModule,
            providers: [
                __WEBPACK_IMPORTED_MODULE_3__siema_service__["a" /* NgxSiemaService */],
            ],
        };
    };
    return NgxSiemaModule;
}());

NgxSiemaModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                imports: [
                    __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                ],
                declarations: [
                    __WEBPACK_IMPORTED_MODULE_2__siema_component__["a" /* NgxSiemaComponent */],
                    __WEBPACK_IMPORTED_MODULE_2__siema_component__["b" /* NgxSiemaSlideComponent */],
                ],
                exports: [
                    __WEBPACK_IMPORTED_MODULE_2__siema_component__["a" /* NgxSiemaComponent */],
                    __WEBPACK_IMPORTED_MODULE_2__siema_component__["b" /* NgxSiemaSlideComponent */],
                ],
            },] },
];
NgxSiemaModule.ctorParameters = function () { return []; };
//# sourceMappingURL=siema.module.js.map

/***/ }),

/***/ "./node_modules/ngx-siema/siema.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgxSiemaService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__ = __webpack_require__("./node_modules/rxjs/_esm5/ReplaySubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_publish__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/publish.js");




var next$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__["a" /* ReplaySubject */](1);
var prev$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__["a" /* ReplaySubject */](1);
var goTo$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__["a" /* ReplaySubject */](1);
var remove$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__["a" /* ReplaySubject */](1);
var insert$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__["a" /* ReplaySubject */](1);
var prepend$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__["a" /* ReplaySubject */](1);
var append$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__["a" /* ReplaySubject */](1);
var destroy$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__["a" /* ReplaySubject */](1);
var currentSlide$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__["a" /* ReplaySubject */](1);
var NgxSiemaService = (function () {
    function NgxSiemaService() {
    }
    NgxSiemaService.prototype.next = function (numbers, selector) {
        if (numbers === void 0) { numbers = 1; }
        var listener = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](null);
        next$.next({ selector: selector, numbers: numbers, listener: listener });
        return listener.asObservable();
    };
    NgxSiemaService.prototype.prev = function (numbers, selector) {
        if (numbers === void 0) { numbers = 1; }
        var listener = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](null);
        prev$.next({ selector: selector, numbers: numbers, listener: listener });
        return listener.asObservable();
    };
    NgxSiemaService.prototype.goTo = function (index, selector) {
        var listener = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](null);
        goTo$.next({ selector: selector, index: index, listener: listener });
        return listener.asObservable();
    };
    NgxSiemaService.prototype.remove = function (index, selector) {
        var listener = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](null);
        remove$.next({ selector: selector, index: index, listener: listener });
        return listener.asObservable();
    };
    NgxSiemaService.prototype.insert = function (item, index, selector) {
        var listener = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](null);
        insert$.next({ selector: selector, item: item, index: index, listener: listener });
        return listener.asObservable();
    };
    NgxSiemaService.prototype.prepend = function (item, selector) {
        var listener = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](null);
        prepend$.next({ selector: selector, item: item, listener: listener });
        return listener.asObservable();
    };
    NgxSiemaService.prototype.append = function (item, selector) {
        var listener = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](null);
        append$.next({ selector: selector, item: item, listener: listener });
        return listener.asObservable();
    };
    NgxSiemaService.prototype.destroy = function (restoreMarkup, selector) {
        if (restoreMarkup === void 0) { restoreMarkup = false; }
        var listener = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](null);
        destroy$.next({ selector: selector, listener: listener });
        return listener.asObservable();
    };
    NgxSiemaService.prototype.currentSlide = function (selector) {
        var listener = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](null);
        currentSlide$.next({ selector: selector, listener: listener });
        return listener.asObservable();
    };
    NgxSiemaService.prototype.onNext = function () {
        return next$.publish().refCount();
    };
    NgxSiemaService.prototype.onPrev = function () {
        return prev$.publish().refCount();
    };
    NgxSiemaService.prototype.onGoTo = function () {
        return goTo$.publish().refCount();
    };
    NgxSiemaService.prototype.onRemove = function () {
        return remove$.publish().refCount();
    };
    NgxSiemaService.prototype.onInsert = function () {
        return insert$.publish().refCount();
    };
    NgxSiemaService.prototype.onPrepend = function () {
        return prepend$.publish().refCount();
    };
    NgxSiemaService.prototype.onAppend = function () {
        return append$.publish().refCount();
    };
    NgxSiemaService.prototype.onDestroy = function () {
        return destroy$.publish().refCount();
    };
    NgxSiemaService.prototype.onCurrentSlide = function () {
        return currentSlide$.publish().refCount();
    };
    return NgxSiemaService;
}());

NgxSiemaService.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
NgxSiemaService.ctorParameters = function () { return []; };
//# sourceMappingURL=siema.service.js.map

/***/ }),

/***/ "./node_modules/ngx-swiper-wrapper/dist/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__("./node_modules/ngx-swiper-wrapper/dist/lib/index.js");
exports.SwiperComponent = index_1.SwiperComponent;
exports.SwiperDirective = index_1.SwiperDirective;
exports.coverflowObject = index_1.coverflowObject;
exports.cubeObject = index_1.cubeObject;
exports.fadeObject = index_1.fadeObject;
exports.flipObject = index_1.flipObject;
exports.SwiperConfig = index_1.SwiperConfig;
exports.SwiperEvents = index_1.SwiperEvents;
exports.provideDefaultConfig = index_1.provideDefaultConfig;
exports.provideForRootGuard = index_1.provideForRootGuard;
exports.SWIPER_CONFIG = index_1.SWIPER_CONFIG;
exports.SWIPER_GUARD = index_1.SWIPER_GUARD;
exports.SwiperModule = index_1.SwiperModule;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ngx-swiper-wrapper/dist/lib/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var swiper_component_1 = __webpack_require__("./node_modules/ngx-swiper-wrapper/dist/lib/swiper.component.js");
exports.SwiperComponent = swiper_component_1.SwiperComponent;
var swiper_directive_1 = __webpack_require__("./node_modules/ngx-swiper-wrapper/dist/lib/swiper.directive.js");
exports.SwiperDirective = swiper_directive_1.SwiperDirective;
var swiper_interfaces_1 = __webpack_require__("./node_modules/ngx-swiper-wrapper/dist/lib/swiper.interfaces.js");
exports.coverflowObject = swiper_interfaces_1.coverflowObject;
exports.cubeObject = swiper_interfaces_1.cubeObject;
exports.fadeObject = swiper_interfaces_1.fadeObject;
exports.flipObject = swiper_interfaces_1.flipObject;
exports.SwiperConfig = swiper_interfaces_1.SwiperConfig;
exports.SwiperEvents = swiper_interfaces_1.SwiperEvents;
var swiper_module_1 = __webpack_require__("./node_modules/ngx-swiper-wrapper/dist/lib/swiper.module.js");
exports.provideDefaultConfig = swiper_module_1.provideDefaultConfig;
exports.provideForRootGuard = swiper_module_1.provideForRootGuard;
exports.SWIPER_CONFIG = swiper_module_1.SWIPER_CONFIG;
exports.SWIPER_GUARD = swiper_module_1.SWIPER_GUARD;
exports.SwiperModule = swiper_module_1.SwiperModule;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ngx-swiper-wrapper/dist/lib/swiper.component.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var core_2 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var swiper_directive_1 = __webpack_require__("./node_modules/ngx-swiper-wrapper/dist/lib/swiper.directive.js");
var swiper_interfaces_1 = __webpack_require__("./node_modules/ngx-swiper-wrapper/dist/lib/swiper.interfaces.js");
var SwiperComponent = (function () {
    function SwiperComponent(zone, elementRef, defaults) {
        this.zone = zone;
        this.elementRef = elementRef;
        this.defaults = defaults;
        this.index = null;
        this.fxShow = true;
        this.fxHide = false;
        this.hidden = false;
        this.disabled = false;
        this.useSwiperClass = true;
        this.runInsideAngular = false;
        this.useSwiperWrapperClass = true;
        this.indexChange = new core_2.EventEmitter();
        this.S_INIT = new core_2.EventEmitter();
        this.S_DESTROY = new core_2.EventEmitter();
        this.S_SCROLL = new core_2.EventEmitter();
        this.S_PROGRESS = new core_2.EventEmitter();
        this.S_KEYPRESS = new core_2.EventEmitter();
        this.S_BEFORERESIZE = new core_2.EventEmitter();
        this.S_AFTERRESIZE = new core_2.EventEmitter();
        this.S_SETTRANSLATE = new core_2.EventEmitter();
        this.S_SETTRANSITION = new core_2.EventEmitter();
        this.S_AUTOPLAY = new core_2.EventEmitter();
        this.S_AUTOPLAYSTART = new core_2.EventEmitter();
        this.S_AUTOPLAYSTOP = new core_2.EventEmitter();
        this.S_REACHBEGINNING = new core_2.EventEmitter();
        this.S_REACHEND = new core_2.EventEmitter();
        this.S_SLIDECHANGESTART = new core_2.EventEmitter();
        this.S_SLIDECHANGEEND = new core_2.EventEmitter();
        this.S_SLIDENEXTSTART = new core_2.EventEmitter();
        this.S_SLIDENEXTEND = new core_2.EventEmitter();
        this.S_SLIDEPREVSTART = new core_2.EventEmitter();
        this.S_SLIDEPREVEND = new core_2.EventEmitter();
        this.S_SLIDERMOVE = new core_2.EventEmitter();
        this.S_CLICK = new core_2.EventEmitter();
        this.S_TAP = new core_2.EventEmitter();
        this.S_DOUBLETAP = new core_2.EventEmitter();
        this.S_TOUCHSTART = new core_2.EventEmitter();
        this.S_TOUCHMOVE = new core_2.EventEmitter();
        this.S_TOUCHMOVEOPPOSITE = new core_2.EventEmitter();
        this.S_TOUCHEND = new core_2.EventEmitter();
        this.S_TRANSITIONSTART = new core_2.EventEmitter();
        this.S_TRANSITIONEND = new core_2.EventEmitter();
        this.S_IMAGESREADY = new core_2.EventEmitter();
        this.S_LAZYIMAGELOAD = new core_2.EventEmitter();
        this.S_LAZYIMAGEREADY = new core_2.EventEmitter();
        this.S_PAGINATIONRENDERED = new core_2.EventEmitter();
    }
    Object.defineProperty(SwiperComponent.prototype, "isAtLast", {
        get: function () {
            return (!this.directiveRef || !this.directiveRef.swiper) ?
                false : this.directiveRef.swiper.isEnd;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwiperComponent.prototype, "isAtFirst", {
        get: function () {
            return (!this.directiveRef || !this.directiveRef.swiper) ?
                false : this.directiveRef.swiper.isBeginning;
        },
        enumerable: true,
        configurable: true
    });
    SwiperComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.updateClasses();
            if (typeof MutationObserver !== 'undefined') {
                _this.mo = new MutationObserver(function (mutations) {
                    _this.updateClasses();
                });
                _this.mo.observe(_this.swiperSlides.nativeElement, { childList: true });
            }
        });
    };
    SwiperComponent.prototype.ngOnDestroy = function () {
        if (this.mo) {
            this.mo.disconnect();
        }
    };
    SwiperComponent.prototype.getConfig = function () {
        this.config = this.config || {};
        var options = new swiper_interfaces_1.SwiperConfig(this.defaults);
        options.assign(this.config); // Custom config
        if (options.scrollbar === true) {
            options.scrollbar = '.swiper-scrollbar';
        }
        if (options.pagination === true) {
            options.pagination = '.swiper-pagination';
        }
        if (options.prevButton === true) {
            options.prevButton = '.swiper-button-prev';
        }
        if (options.nextButton === true) {
            options.nextButton = '.swiper-button-next';
        }
        if (options.pagination === '.swiper-pagination' && !options.paginationBulletRender) {
            options.paginationClickable = false;
            if (!this.paginationBulletRender) {
                this.paginationBulletRender = function (swiper, index, className) {
                    var bullet = "<span class=\"" + className + " " + className + "-middle\" index=\"" + index + "\"></span>";
                    if (index === 0) {
                        bullet = "<span class=\"" + className + " " + className + "-first\" index=\"" + index + "\"></span>";
                    }
                    else if (index === (swiper.slides.length - 1)) {
                        bullet = "<span class=\"" + className + " " + className + "-last\" index=\"" + index + "\"></span>";
                    }
                    return "<span class=\"swiper-pagination-handle\" index=\"" + index + "\">" + bullet + "</span>";
                };
            }
            options.paginationBulletRender = this.paginationBulletRender;
        }
        return options;
    };
    SwiperComponent.prototype.updateClasses = function () {
        var updateNeeded = false;
        var children = this.swiperSlides.nativeElement.children;
        for (var i = 0; i < children.length; i++) {
            if (!children[i].classList.contains('swiper-slide')) {
                updateNeeded = true;
                children[i].classList.add('swiper-slide');
            }
        }
        if (updateNeeded) {
            this.directiveRef.update();
        }
    };
    SwiperComponent.prototype.update = function (updateTranslate) {
        console.warn('Deprecated function, update needs to be called through directiveRef!');
        this.directiveRef.update(updateTranslate);
    };
    SwiperComponent.prototype.getIndex = function () {
        console.warn('Deprecated function, getIndex needs to be called through directiveRef!');
        return this.directiveRef.getIndex();
    };
    SwiperComponent.prototype.setIndex = function (index, speed, callbacks) {
        console.warn('Deprecated function, setIndex needs to be called through directiveRef!');
        this.directiveRef.setIndex(index, speed, callbacks);
    };
    SwiperComponent.prototype.prevSlide = function (callbacks, speed) {
        console.warn('Deprecated function, prevSlide needs to be called through directiveRef!');
        this.directiveRef.prevSlide(speed, callbacks);
    };
    SwiperComponent.prototype.nextSlide = function (callbacks, speed) {
        console.warn('Deprecated function, nextSlide needs to be called through directiveRef!');
        this.directiveRef.nextSlide(speed, callbacks);
    };
    SwiperComponent.prototype.stopAutoplay = function () {
        console.warn('Deprecated function, stopAutoplay needs to be called through directiveRef!');
        this.directiveRef.stopAutoplay();
    };
    SwiperComponent.prototype.startAutoplay = function () {
        console.warn('Deprecated function, startAutoplay needs to be called through directiveRef!');
        this.directiveRef.startAutoplay();
    };
    SwiperComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'swiper',
                    exportAs: 'ngxSwiper',
                    template: '<div class="swiper-container" [swiper]="getConfig()" [index]="index" [hidden]="hidden" [fxHide]="fxHide" [fxShow]="fxShow" [disabled]="disabled" [useSwiperClass]="useSwiperClass" [runInsideAngular]="runInsideAngular" (indexChange)="indexChange.emit($event)" (init)="S_INIT.emit($event)" (destroy)="S_DESTROY.emit($event)" (scroll)="S_SCROLL.emit($event)" (progress)="S_PROGRESS.emit($event)" (keyPress)="S_KEYPRESS.emit($event)" (beforeResize)="S_BEFORERESIZE.emit($event)" (afterResize)="S_AFTERRESIZE.emit($event)" (setTranslate)="S_SETTRANSLATE.emit($event)" (setTransition)="S_SETTRANSITION.emit($event)" (autoplay)="S_AUTOPLAY.emit($event)" (autoplayStart)="S_AUTOPLAYSTART.emit($event)" (autoplayStop)="S_AUTOPLAYSTOP.emit($event)" (reachBeginning)="S_REACHBEGINNING.emit($event)" (reachEnd)="S_REACHEND.emit($event)" (slideChangeStart)="S_SLIDECHANGESTART.emit($event)" (slideChangeEnd)="S_SLIDECHANGEEND.emit($event)" (slideNextStart)="S_SLIDENEXTSTART.emit($event)" (slideNextEnd)="S_SLIDENEXTEND.emit($event)" (slidePrevStart)="S_SLIDEPREVSTART.emit($event)" (slidePrevEnd)="S_SLIDEPREVEND.emit($event)" (sliderMove)="S_SLIDERMOVE.emit($event)" (swiperClick)="S_CLICK.emit($event)" (swiperTap)="S_TAP.emit($event)" (swiperDoubleTap)="S_DOUBLETAP.emit($event)" (swiperTouchStart)="S_TOUCHSTART.emit($event)" (swiperTouchMove)="S_TOUCHMOVE.emit($event)" (swiperTouchMoveOpposite)="S_TOUCHMOVEOPPOSITE.emit($event)" (swiperTouchEnd)="S_TOUCHEND.emit($event)" (swiperTransitionStart)="S_TRANSITIONSTART.emit($event)" (swiperTransitionEnd)="S_TRANSITIONEND.emit($event)" (imagesReady)="S_IMAGESREADY.emit($event)" (lazyImageLoad)="S_LAZYIMAGELOAD.emit($event)" (lazyImageReady)="S_LAZYIMAGEREADY.emit($event)" (paginationRendered)="S_PAGINATIONRENDERED.emit($event)"><div #swiperSlides class="swiper-wrapper"><ng-content></ng-content></div><div [hidden]="config?.scrollbar !== \'.swiper-scrollbar\'" class="swiper-scrollbar"></div><div [hidden]="config?.prevButton !== \'.swiper-button-prev\'" class="swiper-button-prev" [attr.disabled]="isAtFirst || null"></div><div [hidden]="config?.nextButton !== \'.swiper-button-next\'" class="swiper-button-next" [attr.disabled]="isAtLast || null"></div><div [hidden]="config?.pagination !== \'.swiper-pagination\'" class="swiper-pagination" (click)="directiveRef.setIndex($event.target.getAttribute(\'index\'))"></div></div>',
                    styles: ['.swiper-slide,.swiper-wrapper{width:100%;height:100%;position:relative}.swiper-container{margin-left:auto;margin-right:auto;position:relative;overflow:hidden;z-index:1}.swiper-container-no-flexbox .swiper-slide{float:left}.swiper-container-vertical>.swiper-wrapper{-webkit-box-orient:vertical;-moz-box-orient:vertical;-ms-flex-direction:column;-webkit-flex-direction:column;flex-direction:column}.swiper-wrapper{z-index:1;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-transition-property:-webkit-transform;-moz-transition-property:-moz-transform;-o-transition-property:-o-transform;-ms-transition-property:-ms-transform;transition-property:transform;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}.swiper-container-android .swiper-slide,.swiper-wrapper{-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);-o-transform:translate(0,0);-ms-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.swiper-container-multirow>.swiper-wrapper{-webkit-box-lines:multiple;-moz-box-lines:multiple;-ms-flex-wrap:wrap;-webkit-flex-wrap:wrap;flex-wrap:wrap}.swiper-container-free-mode>.swiper-wrapper{-webkit-transition-timing-function:ease-out;-moz-transition-timing-function:ease-out;-ms-transition-timing-function:ease-out;-o-transition-timing-function:ease-out;transition-timing-function:ease-out;margin:0 auto}.swiper-slide{-webkit-flex-shrink:0;-ms-flex:0 0 auto;flex-shrink:0}.swiper-container-autoheight,.swiper-container-autoheight .swiper-slide{height:auto}.swiper-container-autoheight .swiper-wrapper{-webkit-box-align:start;-ms-flex-align:start;-webkit-align-items:flex-start;align-items:flex-start;-webkit-transition-property:-webkit-transform,height;-moz-transition-property:-moz-transform;-o-transition-property:-o-transform;-ms-transition-property:-ms-transform;transition-property:transform,height}.swiper-container .swiper-notification{position:absolute;left:0;top:0;pointer-events:none;opacity:0;z-index:-1000}.swiper-wp8-horizontal{-ms-touch-action:pan-y;touch-action:pan-y}.swiper-wp8-vertical{-ms-touch-action:pan-x;touch-action:pan-x}.swiper-button-next,.swiper-button-prev{position:absolute;top:50%;width:27px;height:44px;margin-top:-22px;z-index:10;cursor:pointer;-moz-background-size:27px 44px;-webkit-background-size:27px 44px;background-size:27px 44px;background-position:center;background-repeat:no-repeat}.swiper-button-next.swiper-button-disabled,.swiper-button-prev.swiper-button-disabled{opacity:.35;cursor:auto;pointer-events:none}.swiper-button-prev,.swiper-container-rtl .swiper-button-next{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%2027%2044\'%3E%3Cpath%20d%3D\'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z\'%20fill%3D\'%23007aff\'%2F%3E%3C%2Fsvg%3E");left:10px;right:auto}.swiper-button-prev.swiper-button-black,.swiper-container-rtl .swiper-button-next.swiper-button-black{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%2027%2044\'%3E%3Cpath%20d%3D\'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z\'%20fill%3D\'%23000000\'%2F%3E%3C%2Fsvg%3E")}.swiper-button-prev.swiper-button-white,.swiper-container-rtl .swiper-button-next.swiper-button-white{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%2027%2044\'%3E%3Cpath%20d%3D\'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z\'%20fill%3D\'%23ffffff\'%2F%3E%3C%2Fsvg%3E")}.swiper-button-next,.swiper-container-rtl .swiper-button-prev{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%2027%2044\'%3E%3Cpath%20d%3D\'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z\'%20fill%3D\'%23007aff\'%2F%3E%3C%2Fsvg%3E");right:10px;left:auto}.swiper-button-next.swiper-button-black,.swiper-container-rtl .swiper-button-prev.swiper-button-black{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%2027%2044\'%3E%3Cpath%20d%3D\'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z\'%20fill%3D\'%23000000\'%2F%3E%3C%2Fsvg%3E")}.swiper-button-next.swiper-button-white,.swiper-container-rtl .swiper-button-prev.swiper-button-white{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%2027%2044\'%3E%3Cpath%20d%3D\'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z\'%20fill%3D\'%23ffffff\'%2F%3E%3C%2Fsvg%3E")}.swiper-pagination{position:absolute;text-align:center;-webkit-transition:.3s;-moz-transition:.3s;-o-transition:.3s;transition:.3s;-webkit-transform:translate3d(0,0,0);-ms-transform:translate3d(0,0,0);-o-transform:translate3d(0,0,0);transform:translate3d(0,0,0);z-index:10}.swiper-pagination.swiper-pagination-hidden{opacity:0}.swiper-container-horizontal>.swiper-pagination-bullets,.swiper-pagination-custom,.swiper-pagination-fraction{bottom:10px;left:0;width:100%}.swiper-pagination-bullet{width:8px;height:8px;display:inline-block;border-radius:100%;background:#000;opacity:.2}button.swiper-pagination-bullet{border:none;margin:0;padding:0;box-shadow:none;-moz-appearance:none;-ms-appearance:none;-webkit-appearance:none;appearance:none}.swiper-pagination-clickable .swiper-pagination-bullet{cursor:pointer}.swiper-pagination-white .swiper-pagination-bullet{background:#fff}.swiper-pagination-bullet-active{opacity:1;background:#007aff}.swiper-pagination-white .swiper-pagination-bullet-active{background:#fff}.swiper-pagination-black .swiper-pagination-bullet-active{background:#000}.swiper-container-vertical>.swiper-pagination-bullets{right:10px;top:50%;-webkit-transform:translate3d(0,-50%,0);-moz-transform:translate3d(0,-50%,0);-o-transform:translate(0,-50%);-ms-transform:translate3d(0,-50%,0);transform:translate3d(0,-50%,0)}.swiper-container-vertical>.swiper-pagination-bullets .swiper-pagination-bullet{margin:5px 0;display:block}.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet{margin:0 5px}.swiper-pagination-progress{background:rgba(0,0,0,.25);position:absolute}.swiper-pagination-progress .swiper-pagination-progressbar{background:#007aff;position:absolute;left:0;top:0;width:100%;height:100%;-webkit-transform:scale(0);-ms-transform:scale(0);-o-transform:scale(0);transform:scale(0);-webkit-transform-origin:left top;-moz-transform-origin:left top;-ms-transform-origin:left top;-o-transform-origin:left top;transform-origin:left top}.swiper-container-rtl .swiper-pagination-progress .swiper-pagination-progressbar{-webkit-transform-origin:right top;-moz-transform-origin:right top;-ms-transform-origin:right top;-o-transform-origin:right top;transform-origin:right top}.swiper-container-horizontal>.swiper-pagination-progress{width:100%;height:4px;left:0;top:0}.swiper-container-vertical>.swiper-pagination-progress{width:4px;height:100%;left:0;top:0}.swiper-pagination-progress.swiper-pagination-white{background:rgba(255,255,255,.5)}.swiper-pagination-progress.swiper-pagination-white .swiper-pagination-progressbar{background:#fff}.swiper-pagination-progress.swiper-pagination-black .swiper-pagination-progressbar{background:#000}.swiper-container-3d{-webkit-perspective:1200px;-moz-perspective:1200px;-o-perspective:1200px;perspective:1200px}.swiper-container-3d .swiper-cube-shadow,.swiper-container-3d .swiper-slide,.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top,.swiper-container-3d .swiper-wrapper{-webkit-transform-style:preserve-3d;-moz-transform-style:preserve-3d;-ms-transform-style:preserve-3d;transform-style:preserve-3d}.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10}.swiper-container-3d .swiper-slide-shadow-left{background-image:-webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.5)),to(transparent));background-image:-webkit-linear-gradient(right,rgba(0,0,0,.5),transparent);background-image:-moz-linear-gradient(right,rgba(0,0,0,.5),transparent);background-image:-o-linear-gradient(right,rgba(0,0,0,.5),transparent);background-image:linear-gradient(to left,rgba(0,0,0,.5),transparent)}.swiper-container-3d .swiper-slide-shadow-right{background-image:-webkit-gradient(linear,right top,left top,from(rgba(0,0,0,.5)),to(transparent));background-image:-webkit-linear-gradient(left,rgba(0,0,0,.5),transparent);background-image:-moz-linear-gradient(left,rgba(0,0,0,.5),transparent);background-image:-o-linear-gradient(left,rgba(0,0,0,.5),transparent);background-image:linear-gradient(to right,rgba(0,0,0,.5),transparent)}.swiper-container-3d .swiper-slide-shadow-top{background-image:-webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,.5)),to(transparent));background-image:-webkit-linear-gradient(bottom,rgba(0,0,0,.5),transparent);background-image:-moz-linear-gradient(bottom,rgba(0,0,0,.5),transparent);background-image:-o-linear-gradient(bottom,rgba(0,0,0,.5),transparent);background-image:linear-gradient(to top,rgba(0,0,0,.5),transparent)}.swiper-container-3d .swiper-slide-shadow-bottom{background-image:-webkit-gradient(linear,left bottom,left top,from(rgba(0,0,0,.5)),to(transparent));background-image:-webkit-linear-gradient(top,rgba(0,0,0,.5),transparent);background-image:-moz-linear-gradient(top,rgba(0,0,0,.5),transparent);background-image:-o-linear-gradient(top,rgba(0,0,0,.5),transparent);background-image:linear-gradient(to bottom,rgba(0,0,0,.5),transparent)}.swiper-container-coverflow .swiper-wrapper,.swiper-container-flip .swiper-wrapper{-ms-perspective:1200px}.swiper-container-cube,.swiper-container-flip{overflow:visible}.swiper-container-cube .swiper-slide,.swiper-container-flip .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;backface-visibility:hidden;z-index:1}.swiper-container-cube .swiper-slide .swiper-slide,.swiper-container-flip .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-active .swiper-slide-active,.swiper-container-flip .swiper-slide-active,.swiper-container-flip .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-cube .swiper-slide-shadow-bottom,.swiper-container-cube .swiper-slide-shadow-left,.swiper-container-cube .swiper-slide-shadow-right,.swiper-container-cube .swiper-slide-shadow-top,.swiper-container-flip .swiper-slide-shadow-bottom,.swiper-container-flip .swiper-slide-shadow-left,.swiper-container-flip .swiper-slide-shadow-right,.swiper-container-flip .swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;backface-visibility:hidden}.swiper-container-cube .swiper-slide{visibility:hidden;-webkit-transform-origin:0 0;-moz-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0;width:100%;height:100%}.swiper-container-cube.swiper-container-rtl .swiper-slide{-webkit-transform-origin:100% 0;-moz-transform-origin:100% 0;-ms-transform-origin:100% 0;transform-origin:100% 0}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-next,.swiper-container-cube .swiper-slide-next+.swiper-slide,.swiper-container-cube .swiper-slide-prev{pointer-events:auto;visibility:visible}.swiper-container-cube .swiper-cube-shadow{position:absolute;left:0;bottom:0;width:100%;height:100%;background:#000;opacity:.6;-webkit-filter:blur(50px);filter:blur(50px);z-index:0}.swiper-container-fade.swiper-container-free-mode .swiper-slide{-webkit-transition-timing-function:ease-out;-moz-transition-timing-function:ease-out;-ms-transition-timing-function:ease-out;-o-transition-timing-function:ease-out;transition-timing-function:ease-out}.swiper-container-fade .swiper-slide{pointer-events:none;-webkit-transition-property:opacity;-moz-transition-property:opacity;-o-transition-property:opacity;transition-property:opacity}.swiper-container-fade .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-fade .swiper-slide-active,.swiper-container-fade .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-zoom-container{width:100%;height:100%;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-pack:center;-moz-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-moz-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;text-align:center}.swiper-zoom-container>canvas,.swiper-zoom-container>img,.swiper-zoom-container>svg{max-width:100%;max-height:100%;object-fit:contain}.swiper-scrollbar{border-radius:10px;position:relative;-ms-touch-action:none;background:rgba(0,0,0,.1)}.swiper-container-horizontal>.swiper-scrollbar{position:absolute;left:1%;bottom:3px;z-index:50;height:5px;width:98%}.swiper-container-vertical>.swiper-scrollbar{position:absolute;right:3px;top:1%;z-index:50;width:5px;height:98%}.swiper-scrollbar-drag{height:100%;width:100%;position:relative;background:rgba(0,0,0,.5);border-radius:10px;left:0;top:0}.swiper-scrollbar-cursor-drag{cursor:move}.swiper-lazy-preloader{width:42px;height:42px;position:absolute;left:50%;top:50%;margin-left:-21px;margin-top:-21px;z-index:10;-webkit-transform-origin:50%;-moz-transform-origin:50%;transform-origin:50%;-webkit-animation:swiper-preloader-spin 1s steps(12,end) infinite;-moz-animation:swiper-preloader-spin 1s steps(12,end) infinite;animation:swiper-preloader-spin 1s steps(12,end) infinite}.swiper-lazy-preloader:after{display:block;content:"";width:100%;height:100%;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D\'0%200%20120%20120\'%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20xmlns%3Axlink%3D\'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink\'%3E%3Cdefs%3E%3Cline%20id%3D\'l\'%20x1%3D\'60\'%20x2%3D\'60\'%20y1%3D\'7\'%20y2%3D\'27\'%20stroke%3D\'%236c6c6c\'%20stroke-width%3D\'11\'%20stroke-linecap%3D\'round\'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(30%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(60%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(90%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(120%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(150%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.37\'%20transform%3D\'rotate(180%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.46\'%20transform%3D\'rotate(210%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.56\'%20transform%3D\'rotate(240%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.66\'%20transform%3D\'rotate(270%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.75\'%20transform%3D\'rotate(300%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.85\'%20transform%3D\'rotate(330%2060%2C60)\'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");background-position:50%;-webkit-background-size:100%;background-size:100%;background-repeat:no-repeat}.swiper-lazy-preloader-white:after{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D\'0%200%20120%20120\'%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20xmlns%3Axlink%3D\'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink\'%3E%3Cdefs%3E%3Cline%20id%3D\'l\'%20x1%3D\'60\'%20x2%3D\'60\'%20y1%3D\'7\'%20y2%3D\'27\'%20stroke%3D\'%23fff\'%20stroke-width%3D\'11\'%20stroke-linecap%3D\'round\'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(30%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(60%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(90%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(120%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(150%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.37\'%20transform%3D\'rotate(180%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.46\'%20transform%3D\'rotate(210%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.56\'%20transform%3D\'rotate(240%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.66\'%20transform%3D\'rotate(270%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.75\'%20transform%3D\'rotate(300%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.85\'%20transform%3D\'rotate(330%2060%2C60)\'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E")}@-webkit-keyframes swiper-preloader-spin{100%{-webkit-transform:rotate(360deg)}}@keyframes swiper-preloader-spin{100%{transform:rotate(360deg)}}swiper.s-wrapper[fxflex],swiper.s-wrapper[fxflexfill],swiper.s-wrapper[fxlayout]{display:flex;flex-direction:inherit;-webkit-box-orient:inherit;-webkit-box-direction:inherit;align-item:inherit;place-content:inherit;-webkit-box-pack:inherit;-webkit-box-align:inherit}swiper.s-wrapper[fxflex]>.swiper,swiper.s-wrapper[fxflexfill]>.swiper,swiper.s-wrapper[fxlayout]>.swiper{display:flex;flex:1 1 auto;-webkit-box-flex:1;-ms-flex:1 1 auto;flex-direction:inherit;-webkit-box-orient:inherit;-webkit-box-direction:inherit;align-item:inherit;place-content:inherit;-webkit-box-pack:inherit;-webkit-box-align:inherit}swiper.s-wrapper>.swiper{width:100%;height:100%}swiper.s-wrapper>.swiper .swiper-wrapper .swiper-slide,swiper.s-wrapper>.swiper .swiper-wrapper .swiper-slide-content{overflow:auto;width:100%;height:100%;max-width:100%;max-height:100%}swiper.s-wrapper>.swiper .swiper-pagination{pointer-events:none}swiper.s-wrapper>.swiper .swiper-pagination .swiper-pagination-handle{position:relative;padding:4px;margin:2px;cursor:pointer;pointer-events:all}swiper.s-wrapper>.swiper .swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet{margin:0}swiper.s-wrapper>.swiper .swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet-first,swiper.s-wrapper>.swiper .swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet-last{border:1px solid rgba(0,0,0,.5)}swiper.s-wrapper>.swiper.swiper-container-vertical>.swiper-button-prev{top:10px;left:50%;margin-top:0;margin-left:-13px;transform:rotate(90deg)}swiper.s-wrapper>.swiper.swiper-container-vertical>.swiper-button-next{top:auto;bottom:10px;left:50%;margin-top:0;margin-left:-13px;transform:rotate(90deg)}swiper.s-wrapper>.swiper.swiper-container-vertical>.swiper-scrollbar{width:8px;transition:width 250ms ease-in-out}swiper.s-wrapper>.swiper.swiper-container-vertical>.swiper-scrollbar:hover{width:16px}swiper.s-wrapper>.swiper.swiper-container-vertical>.swiper-pagination .swiper-pagination-handle{display:block}swiper.s-wrapper>.swiper.swiper-container-vertical>.swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet{display:inline-block}swiper.s-wrapper>.swiper.swiper-container-vertical>.swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet.swiper-pagination-bullet-first,swiper.s-wrapper>.swiper.swiper-container-vertical>.swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet.swiper-pagination-bullet-last{margin:0 -1px}swiper.s-wrapper>.swiper.swiper-container-horizontal>.swiper-scrollbar{height:8px;transition:height 250ms ease-in-out}swiper.s-wrapper>.swiper.swiper-container-horizontal>.swiper-scrollbar:hover{height:16px}swiper.s-wrapper>.swiper.swiper-container-horizontal>.swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet.swiper-pagination-bullet-first,swiper.s-wrapper>.swiper.swiper-container-horizontal>.swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet.swiper-pagination-bullet-last{margin:-1px 0}'],
                    encapsulation: core_2.ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    SwiperComponent.ctorParameters = function () { return [
        { type: core_1.NgZone, },
        { type: core_2.ElementRef, },
        { type: swiper_interfaces_1.SwiperConfig, decorators: [{ type: core_1.Optional },] },
    ]; };
    SwiperComponent.propDecorators = {
        'index': [{ type: core_1.Input },],
        'fxShow': [{ type: core_1.Input },],
        'fxHide': [{ type: core_1.Input },],
        'hidden': [{ type: core_2.HostBinding, args: ['hidden',] }, { type: core_1.Input },],
        'disabled': [{ type: core_1.Input },],
        'config': [{ type: core_1.Input },],
        'useSwiperClass': [{ type: core_1.Input },],
        'runInsideAngular': [{ type: core_1.Input },],
        'useSwiperWrapperClass': [{ type: core_2.HostBinding, args: ['class.s-wrapper',] }, { type: core_1.Input },],
        'indexChange': [{ type: core_1.Output },],
        'swiperSlides': [{ type: core_2.ViewChild, args: ['swiperSlides',] },],
        'directiveRef': [{ type: core_2.ViewChild, args: [swiper_directive_1.SwiperDirective,] },],
        'S_INIT': [{ type: core_1.Output, args: ['init',] },],
        'S_DESTROY': [{ type: core_1.Output, args: ['destroy',] },],
        'S_SCROLL': [{ type: core_1.Output, args: ['scroll',] },],
        'S_PROGRESS': [{ type: core_1.Output, args: ['progress',] },],
        'S_KEYPRESS': [{ type: core_1.Output, args: ['keyPress',] },],
        'S_BEFORERESIZE': [{ type: core_1.Output, args: ['beforeResize',] },],
        'S_AFTERRESIZE': [{ type: core_1.Output, args: ['afterResize',] },],
        'S_SETTRANSLATE': [{ type: core_1.Output, args: ['setTranslate',] },],
        'S_SETTRANSITION': [{ type: core_1.Output, args: ['setTransition',] },],
        'S_AUTOPLAY': [{ type: core_1.Output, args: ['autoplay',] },],
        'S_AUTOPLAYSTART': [{ type: core_1.Output, args: ['autoplayStart',] },],
        'S_AUTOPLAYSTOP': [{ type: core_1.Output, args: ['autoplayStop',] },],
        'S_REACHBEGINNING': [{ type: core_1.Output, args: ['reachBeginning',] },],
        'S_REACHEND': [{ type: core_1.Output, args: ['reachEnd',] },],
        'S_SLIDECHANGESTART': [{ type: core_1.Output, args: ['slideChangeStart',] },],
        'S_SLIDECHANGEEND': [{ type: core_1.Output, args: ['slideChangeEnd',] },],
        'S_SLIDENEXTSTART': [{ type: core_1.Output, args: ['slideNextStart',] },],
        'S_SLIDENEXTEND': [{ type: core_1.Output, args: ['slideNextEnd',] },],
        'S_SLIDEPREVSTART': [{ type: core_1.Output, args: ['slidePrevStart',] },],
        'S_SLIDEPREVEND': [{ type: core_1.Output, args: ['slidePrevEnd',] },],
        'S_SLIDERMOVE': [{ type: core_1.Output, args: ['sliderMove',] },],
        'S_CLICK': [{ type: core_1.Output, args: ['swiperClick',] },],
        'S_TAP': [{ type: core_1.Output, args: ['swiperTap',] },],
        'S_DOUBLETAP': [{ type: core_1.Output, args: ['swiperDoubleTap',] },],
        'S_TOUCHSTART': [{ type: core_1.Output, args: ['swiperTouchStart',] },],
        'S_TOUCHMOVE': [{ type: core_1.Output, args: ['swiperTouchMove',] },],
        'S_TOUCHMOVEOPPOSITE': [{ type: core_1.Output, args: ['swiperTouchMoveOpposite',] },],
        'S_TOUCHEND': [{ type: core_1.Output, args: ['swiperTouchEnd',] },],
        'S_TRANSITIONSTART': [{ type: core_1.Output, args: ['swiperTransitionStart',] },],
        'S_TRANSITIONEND': [{ type: core_1.Output, args: ['swiperTransitionEnd',] },],
        'S_IMAGESREADY': [{ type: core_1.Output, args: ['imagesReady',] },],
        'S_LAZYIMAGELOAD': [{ type: core_1.Output, args: ['lazyImageLoad',] },],
        'S_LAZYIMAGEREADY': [{ type: core_1.Output, args: ['lazyImageReady',] },],
        'S_PAGINATIONRENDERED': [{ type: core_1.Output, args: ['paginationRendered',] },],
    };
    return SwiperComponent;
}());
exports.SwiperComponent = SwiperComponent;
//# sourceMappingURL=swiper.component.js.map

/***/ }),

/***/ "./node_modules/ngx-swiper-wrapper/dist/lib/swiper.directive.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Swiper = __webpack_require__("./node_modules/swiper/dist/js/swiper.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var core_2 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var core_3 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var swiper_interfaces_1 = __webpack_require__("./node_modules/ngx-swiper-wrapper/dist/lib/swiper.interfaces.js");
var SwiperDirective = (function () {
    function SwiperDirective(zone, platformId, elementRef, differs, defaults) {
        this.zone = zone;
        this.platformId = platformId;
        this.elementRef = elementRef;
        this.differs = differs;
        this.defaults = defaults;
        this.fxShow = true;
        this.fxHide = false;
        this.hidden = false;
        this.disabled = false;
        this.useSwiperClass = true;
        this.runInsideAngular = false;
        this.indexChange = new core_3.EventEmitter();
        this.S_INIT = new core_3.EventEmitter();
        this.S_DESTROY = new core_3.EventEmitter();
        this.S_SCROLL = new core_3.EventEmitter();
        this.S_PROGRESS = new core_3.EventEmitter();
        this.S_KEYPRESS = new core_3.EventEmitter();
        this.S_BEFORERESIZE = new core_3.EventEmitter();
        this.S_AFTERRESIZE = new core_3.EventEmitter();
        this.S_SETTRANSLATE = new core_3.EventEmitter();
        this.S_SETTRANSITION = new core_3.EventEmitter();
        this.S_AUTOPLAY = new core_3.EventEmitter();
        this.S_AUTOPLAYSTART = new core_3.EventEmitter();
        this.S_AUTOPLAYSTOP = new core_3.EventEmitter();
        this.S_REACHBEGINNING = new core_3.EventEmitter();
        this.S_REACHEND = new core_3.EventEmitter();
        this.S_SLIDECHANGESTART = new core_3.EventEmitter();
        this.S_SLIDECHANGEEND = new core_3.EventEmitter();
        this.S_SLIDENEXTSTART = new core_3.EventEmitter();
        this.S_SLIDENEXTEND = new core_3.EventEmitter();
        this.S_SLIDEPREVSTART = new core_3.EventEmitter();
        this.S_SLIDEPREVEND = new core_3.EventEmitter();
        this.S_SLIDERMOVE = new core_3.EventEmitter();
        this.S_CLICK = new core_3.EventEmitter();
        this.S_TAP = new core_3.EventEmitter();
        this.S_DOUBLETAP = new core_3.EventEmitter();
        this.S_TOUCHSTART = new core_3.EventEmitter();
        this.S_TOUCHMOVE = new core_3.EventEmitter();
        this.S_TOUCHMOVEOPPOSITE = new core_3.EventEmitter();
        this.S_TOUCHEND = new core_3.EventEmitter();
        this.S_TRANSITIONSTART = new core_3.EventEmitter();
        this.S_TRANSITIONEND = new core_3.EventEmitter();
        this.S_IMAGESREADY = new core_3.EventEmitter();
        this.S_LAZYIMAGELOAD = new core_3.EventEmitter();
        this.S_LAZYIMAGEREADY = new core_3.EventEmitter();
        this.S_PAGINATIONRENDERED = new core_3.EventEmitter();
    }
    Object.defineProperty(SwiperDirective.prototype, "index", {
        set: function (index) {
            if (index != null) {
                this.setIndex(index);
            }
        },
        enumerable: true,
        configurable: true
    });
    SwiperDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (!common_1.isPlatformBrowser(this.platformId)) {
            return false;
        }
        var element = this.elementRef.nativeElement;
        var options = new swiper_interfaces_1.SwiperConfig(this.defaults);
        options.assign(this.config); // Custom config
        if (this.initialIndex != null) {
            options.initialSlide = this.initialIndex;
        }
        var onSlideChangeStart = options.onSlideChangeStart;
        var onScrollbarDragEnd = options.onScrollbarDragEnd;
        options.onSlideChangeStart = function (swiper) {
            if (onSlideChangeStart) {
                onSlideChangeStart(swiper);
            }
            _this.zone.run(function () {
                _this.indexChange.emit(swiper.snapIndex);
            });
        };
        options.onScrollbarDragEnd = function (swiper) {
            if (onScrollbarDragEnd) {
                onScrollbarDragEnd(swiper);
            }
            _this.zone.run(function () {
                _this.indexChange.emit(swiper.snapIndex);
            });
        };
        if (typeof options.scrollbar === 'string') {
            options.scrollbar = element.querySelector(options.scrollbar);
        }
        if (typeof options.pagination === 'string') {
            options.pagination = element.querySelector(options.pagination);
        }
        if (typeof options.prevButton === 'string') {
            options.prevButton = element.querySelector(options.prevButton);
        }
        if (typeof options.nextButton === 'string') {
            options.nextButton = element.querySelector(options.nextButton);
        }
        if (this.runInsideAngular) {
            this.swiper = new Swiper(element, options);
        }
        else {
            this.zone.runOutsideAngular(function () {
                _this.swiper = new Swiper(element, options);
            });
        }
        this.S_INIT.emit(this.swiper);
        // Add native swiper event handling
        swiper_interfaces_1.SwiperEvents.forEach(function (eventName) {
            eventName = eventName.replace('swiper', '');
            eventName = eventName.charAt(0).toLowerCase() + eventName.slice(1);
            _this.swiper.on(eventName, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (args.length === 1) {
                    args = args[0];
                }
                if (_this["S_" + eventName.toUpperCase()]) {
                    _this["S_" + eventName.toUpperCase()].emit(args);
                }
            });
        });
        if (!this.configDiff) {
            this.configDiff = this.differs.find(this.config || {}).create(null);
        }
    };
    SwiperDirective.prototype.ngDoCheck = function () {
        var _this = this;
        if (this.configDiff) {
            var changes = this.configDiff.diff(this.config || {});
            if (changes) {
                this.initialIndex = this.getIndex();
                changes.forEachAddedItem(function (changed) {
                    if (changed.key === 'initialSlide') {
                        _this.initialIndex = _this.config.initialSlide;
                    }
                });
                this.ngOnDestroy();
                // Timeout is needed for the styles to update properly
                setTimeout(function () {
                    _this.ngOnInit();
                }, 0);
            }
        }
    };
    SwiperDirective.prototype.ngOnDestroy = function () {
        var _this = this;
        if (this.swiper) {
            if (this.runInsideAngular) {
                this.swiper.destroy(true, true);
            }
            else {
                this.zone.runOutsideAngular(function () {
                    _this.swiper.destroy(true, true);
                });
            }
            this.swiper = null;
        }
    };
    SwiperDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.swiper && ((changes['hidden'] && this.hidden) ||
            (changes['fxHide'] && this.fxHide) || (changes['fxShow'] && !this.fxShow))) {
            // For some reason resize causes Swiper to change index when hidden
            this.initialIndex = this.swiper.activeIndex || 0;
        }
        if (this.swiper && ((changes['hidden'] && !this.hidden) ||
            (changes['fxHide'] && !this.fxHide) || (changes['fxShow'] && this.fxShow))) {
            // For some reason resize causes Swiper to change index when hidden
            this.swiper.activeIndex = this.initialIndex || 0;
            this.update(true);
        }
        if (this.swiper && changes['disabled']) {
            if (changes['disabled'].currentValue !== changes['disabled'].previousValue) {
                if (changes['disabled'].currentValue === true) {
                    if (this.runInsideAngular) {
                        this.swiper.lockSwipes();
                    }
                    else {
                        this.zone.runOutsideAngular(function () {
                            _this.swiper.lockSwipes();
                        });
                    }
                }
                else if (changes['disabled'].currentValue === false) {
                    if (this.runInsideAngular) {
                        this.swiper.unlockSwipes();
                    }
                    else {
                        this.zone.runOutsideAngular(function () {
                            _this.swiper.unlockSwipes();
                        });
                    }
                }
            }
        }
    };
    SwiperDirective.prototype.update = function (updateTranslate) {
        var _this = this;
        setTimeout(function () {
            if (_this.swiper) {
                if (_this.runInsideAngular) {
                    _this.swiper.update();
                    if (updateTranslate) {
                        setTimeout(function () {
                            if (_this.swiper) {
                                _this.swiper.update(true);
                            }
                        }, 0);
                    }
                }
                else {
                    _this.zone.runOutsideAngular(function () {
                        _this.swiper.update();
                        if (updateTranslate) {
                            setTimeout(function () {
                                if (_this.swiper) {
                                    _this.swiper.update(true);
                                }
                            }, 0);
                        }
                    });
                }
            }
        }, 0);
    };
    SwiperDirective.prototype.getIndex = function () {
        if (!this.swiper) {
            return this.initialIndex;
        }
        else {
            var index = this.swiper.activeIndex;
            if (this.swiper.params.loop) {
                var slidesCount = this.swiper.slides.length - 2 * this.swiper.loopedSlides;
                index -= this.swiper.loopedSlides;
                if (index < 0) {
                    index += slidesCount;
                }
                else if (index >= slidesCount) {
                    index -= slidesCount;
                }
            }
            return index;
        }
    };
    SwiperDirective.prototype.setIndex = function (index, speed, silent) {
        var _this = this;
        if (!this.swiper || this.hidden || this.fxHide || !this.fxShow) {
            this.initialIndex = index;
        }
        else {
            var realIndex_1 = index * this.swiper.params.slidesPerGroup;
            if (this.swiper.params.loop) {
                realIndex_1 += this.swiper.loopedSlides;
            }
            if (this.runInsideAngular) {
                this.swiper.slideTo(realIndex_1, speed, !silent);
            }
            else {
                this.zone.runOutsideAngular(function () {
                    _this.swiper.slideTo(realIndex_1, speed, !silent);
                });
            }
        }
    };
    SwiperDirective.prototype.prevSlide = function (speed, silent) {
        var _this = this;
        if (this.swiper) {
            if (this.runInsideAngular) {
                this.swiper.slidePrev(!silent, speed);
            }
            else {
                this.zone.runOutsideAngular(function () {
                    _this.swiper.slidePrev(!silent, speed);
                });
            }
        }
    };
    SwiperDirective.prototype.nextSlide = function (speed, silent) {
        var _this = this;
        if (this.swiper) {
            if (this.runInsideAngular) {
                this.swiper.slideNext(!silent, speed);
            }
            else {
                this.zone.runOutsideAngular(function () {
                    _this.swiper.slideNext(!silent, speed);
                });
            }
        }
    };
    SwiperDirective.prototype.stopAutoplay = function (reset) {
        var _this = this;
        if (reset) {
            this.setIndex(0);
        }
        if (this.swiper) {
            if (this.runInsideAngular) {
                this.swiper.stopAutoplay();
            }
            else {
                this.zone.runOutsideAngular(function () {
                    _this.swiper.stopAutoplay();
                });
            }
        }
    };
    SwiperDirective.prototype.startAutoplay = function (reset) {
        var _this = this;
        if (reset) {
            this.setIndex(0);
        }
        if (this.swiper) {
            if (this.runInsideAngular) {
                this.swiper.startAutoplay();
            }
            else {
                this.zone.runOutsideAngular(function () {
                    _this.swiper.startAutoplay();
                });
            }
        }
    };
    SwiperDirective.decorators = [
        { type: core_3.Directive, args: [{
                    selector: '[swiper]',
                    exportAs: 'ngxSwiper'
                },] },
    ];
    /** @nocollapse */
    SwiperDirective.ctorParameters = function () { return [
        { type: core_1.NgZone, },
        { type: Object, decorators: [{ type: core_2.Inject, args: [core_1.PLATFORM_ID,] },] },
        { type: core_3.ElementRef, },
        { type: core_1.KeyValueDiffers, },
        { type: swiper_interfaces_1.SwiperConfig, decorators: [{ type: core_2.Optional },] },
    ]; };
    SwiperDirective.propDecorators = {
        'index': [{ type: core_3.Input },],
        'fxShow': [{ type: core_3.Input },],
        'fxHide': [{ type: core_3.Input },],
        'hidden': [{ type: core_3.Input },],
        'disabled': [{ type: core_3.Input },],
        'useSwiperClass': [{ type: core_3.HostBinding, args: ['class.swiper',] }, { type: core_3.Input },],
        'runInsideAngular': [{ type: core_3.Input },],
        'config': [{ type: core_3.Input, args: ['swiper',] },],
        'indexChange': [{ type: core_3.Output },],
        'S_INIT': [{ type: core_3.Output, args: ['init',] },],
        'S_DESTROY': [{ type: core_3.Output, args: ['destroy',] },],
        'S_SCROLL': [{ type: core_3.Output, args: ['scroll',] },],
        'S_PROGRESS': [{ type: core_3.Output, args: ['progress',] },],
        'S_KEYPRESS': [{ type: core_3.Output, args: ['keyPress',] },],
        'S_BEFORERESIZE': [{ type: core_3.Output, args: ['beforeResize',] },],
        'S_AFTERRESIZE': [{ type: core_3.Output, args: ['afterResize',] },],
        'S_SETTRANSLATE': [{ type: core_3.Output, args: ['setTranslate',] },],
        'S_SETTRANSITION': [{ type: core_3.Output, args: ['setTransition',] },],
        'S_AUTOPLAY': [{ type: core_3.Output, args: ['autoplay',] },],
        'S_AUTOPLAYSTART': [{ type: core_3.Output, args: ['autoplayStart',] },],
        'S_AUTOPLAYSTOP': [{ type: core_3.Output, args: ['autoplayStop',] },],
        'S_REACHBEGINNING': [{ type: core_3.Output, args: ['reachBeginning',] },],
        'S_REACHEND': [{ type: core_3.Output, args: ['reachEnd',] },],
        'S_SLIDECHANGESTART': [{ type: core_3.Output, args: ['slideChangeStart',] },],
        'S_SLIDECHANGEEND': [{ type: core_3.Output, args: ['slideChangeEnd',] },],
        'S_SLIDENEXTSTART': [{ type: core_3.Output, args: ['slideNextStart',] },],
        'S_SLIDENEXTEND': [{ type: core_3.Output, args: ['slideNextEnd',] },],
        'S_SLIDEPREVSTART': [{ type: core_3.Output, args: ['slidePrevStart',] },],
        'S_SLIDEPREVEND': [{ type: core_3.Output, args: ['slidePrevEnd',] },],
        'S_SLIDERMOVE': [{ type: core_3.Output, args: ['sliderMove',] },],
        'S_CLICK': [{ type: core_3.Output, args: ['swiperClick',] },],
        'S_TAP': [{ type: core_3.Output, args: ['swiperTap',] },],
        'S_DOUBLETAP': [{ type: core_3.Output, args: ['swiperDoubleTap',] },],
        'S_TOUCHSTART': [{ type: core_3.Output, args: ['swiperTouchStart',] },],
        'S_TOUCHMOVE': [{ type: core_3.Output, args: ['swiperTouchMove',] },],
        'S_TOUCHMOVEOPPOSITE': [{ type: core_3.Output, args: ['swiperTouchMoveOpposite',] },],
        'S_TOUCHEND': [{ type: core_3.Output, args: ['swiperTouchEnd',] },],
        'S_TRANSITIONSTART': [{ type: core_3.Output, args: ['swiperTransitionStart',] },],
        'S_TRANSITIONEND': [{ type: core_3.Output, args: ['swiperTransitionEnd',] },],
        'S_IMAGESREADY': [{ type: core_3.Output, args: ['imagesReady',] },],
        'S_LAZYIMAGELOAD': [{ type: core_3.Output, args: ['lazyImageLoad',] },],
        'S_LAZYIMAGEREADY': [{ type: core_3.Output, args: ['lazyImageReady',] },],
        'S_PAGINATIONRENDERED': [{ type: core_3.Output, args: ['paginationRendered',] },],
    };
    return SwiperDirective;
}());
exports.SwiperDirective = SwiperDirective;
//# sourceMappingURL=swiper.directive.js.map

/***/ }),

/***/ "./node_modules/ngx-swiper-wrapper/dist/lib/swiper.interfaces.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// http://idangero.us/swiper/api/#emitter
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwiperEvents = [
    'init',
    'destroy',
    'scroll',
    'progress',
    'keyPress',
    'beforeResize',
    'afterResize',
    'setTranslate',
    'setTransition',
    'autoplay',
    'autoplayStart',
    'autoplayStop',
    'reachBeginning',
    'reachEnd',
    'slideChangeEnd',
    'slideChangeStart',
    'slideNextStart',
    'slideNextEnd',
    'slidePrevStart',
    'slidePrevEnd',
    'sliderMove',
    'swiperClick',
    'swiperTap',
    'swiperDoubleTap',
    'swiperTouchStart',
    'swiperTouchMove',
    'swiperTouchMoveOpposite',
    'swiperTouchEnd',
    'swiperTransitionStart',
    'swiperTransitionEnd',
    'imagesReady',
    'lazyImageLoad',
    'lazyImageReady',
    'paginationRendered'
];
var fadeObject = (function () {
    function fadeObject() {
    }
    return fadeObject;
}());
exports.fadeObject = fadeObject;
var flipObject = (function () {
    function flipObject() {
    }
    return flipObject;
}());
exports.flipObject = flipObject;
var cubeObject = (function () {
    function cubeObject() {
    }
    return cubeObject;
}());
exports.cubeObject = cubeObject;
var coverflowObject = (function () {
    function coverflowObject() {
    }
    return coverflowObject;
}());
exports.coverflowObject = coverflowObject;
var SwiperConfig = (function () {
    function SwiperConfig(config) {
        if (config === void 0) { config = {}; }
        this.assign(config);
    }
    SwiperConfig.prototype.assign = function (config) {
        if (config === void 0) { config = {}; }
        for (var key in config) {
            this[key] = config[key];
        }
    };
    return SwiperConfig;
}());
exports.SwiperConfig = SwiperConfig;
//# sourceMappingURL=swiper.interfaces.js.map

/***/ }),

/***/ "./node_modules/ngx-swiper-wrapper/dist/lib/swiper.module.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
var swiper_component_1 = __webpack_require__("./node_modules/ngx-swiper-wrapper/dist/lib/swiper.component.js");
var swiper_directive_1 = __webpack_require__("./node_modules/ngx-swiper-wrapper/dist/lib/swiper.directive.js");
var swiper_interfaces_1 = __webpack_require__("./node_modules/ngx-swiper-wrapper/dist/lib/swiper.interfaces.js");
exports.SWIPER_GUARD = new core_1.InjectionToken('SWIPER_GUARD');
exports.SWIPER_CONFIG = new core_1.InjectionToken('SWIPER_CONFIG');
var SwiperModule = (function () {
    function SwiperModule(guard) {
    }
    SwiperModule.forRoot = function (config) {
        return {
            ngModule: SwiperModule,
            providers: [
                {
                    provide: exports.SWIPER_GUARD,
                    useFactory: provideForRootGuard,
                    deps: [
                        [
                            swiper_interfaces_1.SwiperConfig,
                            new core_1.Optional(),
                            new core_1.SkipSelf()
                        ]
                    ]
                },
                {
                    provide: exports.SWIPER_CONFIG,
                    useValue: config ? config : {}
                },
                {
                    provide: swiper_interfaces_1.SwiperConfig,
                    useFactory: provideDefaultConfig,
                    deps: [
                        exports.SWIPER_CONFIG
                    ]
                }
            ]
        };
    };
    SwiperModule.forChild = function () {
        return {
            ngModule: SwiperModule
        };
    };
    SwiperModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    declarations: [swiper_component_1.SwiperComponent, swiper_directive_1.SwiperDirective],
                    exports: [common_1.CommonModule, swiper_component_1.SwiperComponent, swiper_directive_1.SwiperDirective]
                },] },
    ];
    /** @nocollapse */
    SwiperModule.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [exports.SWIPER_GUARD,] },] },
    ]; };
    return SwiperModule;
}());
exports.SwiperModule = SwiperModule;
function provideForRootGuard(config) {
    if (config) {
        throw new Error("\n      Application called SwiperModule.forRoot() twice.\n      For submodules use SwiperModule.forChild() instead.\n    ");
    }
    return 'guarded';
}
exports.provideForRootGuard = provideForRootGuard;
function provideDefaultConfig(config) {
    return new swiper_interfaces_1.SwiperConfig(config);
}
exports.provideDefaultConfig = provideDefaultConfig;
//# sourceMappingURL=swiper.module.js.map

/***/ }),

/***/ "./node_modules/siema/dist/siema.min.js":
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define("Siema",[],t):"object"==typeof exports?exports.Siema=t():e.Siema=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(i[r])return i[r].exports;var n=i[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var i={};return t.m=e,t.c=i,t.d=function(e,i,r){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,i){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),l=function(){function e(t){var i=this;if(r(this,e),this.config=e.mergeSettings(t),this.selector="string"==typeof this.config.selector?document.querySelector(this.config.selector):this.config.selector,null===this.selector)throw new Error("Something wrong with your selector 😭");this.resolveSlidesNumber(),this.selectorWidth=this.selector.offsetWidth,this.innerElements=[].slice.call(this.selector.children),this.currentSlide=this.config.loop?this.config.startIndex%this.innerElements.length:Math.max(0,Math.min(this.config.startIndex,this.innerElements.length-this.perPage)),this.transformProperty=e.webkitOrNot(),["resizeHandler","touchstartHandler","touchendHandler","touchmoveHandler","mousedownHandler","mouseupHandler","mouseleaveHandler","mousemoveHandler","clickHandler"].forEach(function(e){i[e]=i[e].bind(i)}),this.init()}return s(e,[{key:"attachEvents",value:function(){window.addEventListener("resize",this.resizeHandler),this.config.draggable&&(this.pointerDown=!1,this.drag={startX:0,endX:0,startY:0,letItGo:null,preventClick:!1},this.selector.addEventListener("touchstart",this.touchstartHandler),this.selector.addEventListener("touchend",this.touchendHandler),this.selector.addEventListener("touchmove",this.touchmoveHandler),this.selector.addEventListener("mousedown",this.mousedownHandler),this.selector.addEventListener("mouseup",this.mouseupHandler),this.selector.addEventListener("mouseleave",this.mouseleaveHandler),this.selector.addEventListener("mousemove",this.mousemoveHandler),this.selector.addEventListener("click",this.clickHandler))}},{key:"detachEvents",value:function(){window.removeEventListener("resize",this.resizeHandler),this.selector.removeEventListener("touchstart",this.touchstartHandler),this.selector.removeEventListener("touchend",this.touchendHandler),this.selector.removeEventListener("touchmove",this.touchmoveHandler),this.selector.removeEventListener("mousedown",this.mousedownHandler),this.selector.removeEventListener("mouseup",this.mouseupHandler),this.selector.removeEventListener("mouseleave",this.mouseleaveHandler),this.selector.removeEventListener("mousemove",this.mousemoveHandler),this.selector.removeEventListener("click",this.clickHandler)}},{key:"init",value:function(){this.attachEvents(),this.selector.style.overflow="hidden",this.selector.style.direction=this.config.rtl?"rtl":"ltr",this.buildSliderFrame(),this.config.onInit.call(this)}},{key:"buildSliderFrame",value:function(){var e=this.selectorWidth/this.perPage,t=this.config.loop?this.innerElements.length+2*this.perPage:this.innerElements.length;this.sliderFrame=document.createElement("div"),this.sliderFrame.style.width=e*t+"px",this.enableTransition(),this.config.draggable&&(this.selector.style.cursor="-webkit-grab");var i=document.createDocumentFragment();if(this.config.loop)for(var r=this.innerElements.length-this.perPage;r<this.innerElements.length;r++){var n=this.buildSliderFrameItem(this.innerElements[r].cloneNode(!0));i.appendChild(n)}for(var s=0;s<this.innerElements.length;s++){var l=this.buildSliderFrameItem(this.innerElements[s]);i.appendChild(l)}if(this.config.loop)for(var o=0;o<this.perPage;o++){var a=this.buildSliderFrameItem(this.innerElements[o].cloneNode(!0));i.appendChild(a)}this.sliderFrame.appendChild(i),this.selector.innerHTML="",this.selector.appendChild(this.sliderFrame),this.slideToCurrent()}},{key:"buildSliderFrameItem",value:function(e){var t=document.createElement("div");return t.style.cssFloat=this.config.rtl?"right":"left",t.style.float=this.config.rtl?"right":"left",t.style.width=(this.config.loop?100/(this.innerElements.length+2*this.perPage):100/this.innerElements.length)+"%",t.appendChild(e),t}},{key:"resolveSlidesNumber",value:function(){if("number"==typeof this.config.perPage)this.perPage=this.config.perPage;else if("object"===n(this.config.perPage)){this.perPage=1;for(var e in this.config.perPage)window.innerWidth>=e&&(this.perPage=this.config.perPage[e])}}},{key:"prev",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments[1];if(!(this.innerElements.length<=this.perPage)){var i=this.currentSlide;if(this.config.loop){if(this.currentSlide-e<0){this.disableTransition();var r=this.currentSlide+this.innerElements.length,n=this.perPage,s=r+n,l=(this.config.rtl?1:-1)*s*(this.selectorWidth/this.perPage),o=this.config.draggable?this.drag.endX-this.drag.startX:0;this.sliderFrame.style[this.transformProperty]="translate3d("+(l+o)+"px, 0, 0)",this.currentSlide=r-e}else this.currentSlide=this.currentSlide-e}else this.currentSlide=Math.max(this.currentSlide-e,0);i!==this.currentSlide&&(this.slideToCurrent(this.config.loop),this.config.onChange.call(this),t&&t.call(this))}}},{key:"next",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments[1];if(!(this.innerElements.length<=this.perPage)){var i=this.currentSlide;if(this.config.loop){if(this.currentSlide+e>this.innerElements.length-this.perPage){this.disableTransition();var r=this.currentSlide-this.innerElements.length,n=this.perPage,s=r+n,l=(this.config.rtl?1:-1)*s*(this.selectorWidth/this.perPage),o=this.config.draggable?this.drag.endX-this.drag.startX:0;this.sliderFrame.style[this.transformProperty]="translate3d("+(l+o)+"px, 0, 0)",this.currentSlide=r+e}else this.currentSlide=this.currentSlide+e}else this.currentSlide=Math.min(this.currentSlide+e,this.innerElements.length-this.perPage);i!==this.currentSlide&&(this.slideToCurrent(this.config.loop),this.config.onChange.call(this),t&&t.call(this))}}},{key:"disableTransition",value:function(){this.sliderFrame.style.webkitTransition="all 0ms "+this.config.easing,this.sliderFrame.style.transition="all 0ms "+this.config.easing}},{key:"enableTransition",value:function(){this.sliderFrame.style.webkitTransition="all "+this.config.duration+"ms "+this.config.easing,this.sliderFrame.style.transition="all "+this.config.duration+"ms "+this.config.easing}},{key:"goTo",value:function(e,t){if(!(this.innerElements.length<=this.perPage)){var i=this.currentSlide;this.currentSlide=this.config.loop?e%this.innerElements.length:Math.min(Math.max(e,0),this.innerElements.length-this.perPage),i!==this.currentSlide&&(this.slideToCurrent(),this.config.onChange.call(this),t&&t.call(this))}}},{key:"slideToCurrent",value:function(e){var t=this,i=this.config.loop?this.currentSlide+this.perPage:this.currentSlide,r=(this.config.rtl?1:-1)*i*(this.selectorWidth/this.perPage);e?requestAnimationFrame(function(){requestAnimationFrame(function(){t.enableTransition(),t.sliderFrame.style[t.transformProperty]="translate3d("+r+"px, 0, 0)"})}):this.sliderFrame.style[this.transformProperty]="translate3d("+r+"px, 0, 0)"}},{key:"updateAfterDrag",value:function(){var e=(this.config.rtl?-1:1)*(this.drag.endX-this.drag.startX),t=Math.abs(e),i=this.config.multipleDrag?Math.ceil(t/(this.selectorWidth/this.perPage)):1,r=e>0&&this.currentSlide-i<0,n=e<0&&this.currentSlide+i>this.innerElements.length-this.perPage;e>0&&t>this.config.threshold&&this.innerElements.length>this.perPage?this.prev(i):e<0&&t>this.config.threshold&&this.innerElements.length>this.perPage&&this.next(i),this.slideToCurrent(r||n)}},{key:"resizeHandler",value:function(){this.resolveSlidesNumber(),this.currentSlide+this.perPage>this.innerElements.length&&(this.currentSlide=this.innerElements.length<=this.perPage?0:this.innerElements.length-this.perPage),this.selectorWidth=this.selector.offsetWidth,this.buildSliderFrame()}},{key:"clearDrag",value:function(){this.drag={startX:0,endX:0,startY:0,letItGo:null,preventClick:this.drag.preventClick}}},{key:"touchstartHandler",value:function(e){-1!==["TEXTAREA","OPTION","INPUT","SELECT"].indexOf(e.target.nodeName)||(e.stopPropagation(),this.pointerDown=!0,this.drag.startX=e.touches[0].pageX,this.drag.startY=e.touches[0].pageY)}},{key:"touchendHandler",value:function(e){e.stopPropagation(),this.pointerDown=!1,this.enableTransition(),this.drag.endX&&this.updateAfterDrag(),this.clearDrag()}},{key:"touchmoveHandler",value:function(e){if(e.stopPropagation(),null===this.drag.letItGo&&(this.drag.letItGo=Math.abs(this.drag.startY-e.touches[0].pageY)<Math.abs(this.drag.startX-e.touches[0].pageX)),this.pointerDown&&this.drag.letItGo){e.preventDefault(),this.drag.endX=e.touches[0].pageX,this.sliderFrame.style.webkitTransition="all 0ms "+this.config.easing,this.sliderFrame.style.transition="all 0ms "+this.config.easing;var t=this.config.loop?this.currentSlide+this.perPage:this.currentSlide,i=t*(this.selectorWidth/this.perPage),r=this.drag.endX-this.drag.startX,n=this.config.rtl?i+r:i-r;this.sliderFrame.style[this.transformProperty]="translate3d("+(this.config.rtl?1:-1)*n+"px, 0, 0)"}}},{key:"mousedownHandler",value:function(e){-1!==["TEXTAREA","OPTION","INPUT","SELECT"].indexOf(e.target.nodeName)||(e.preventDefault(),e.stopPropagation(),this.pointerDown=!0,this.drag.startX=e.pageX)}},{key:"mouseupHandler",value:function(e){e.stopPropagation(),this.pointerDown=!1,this.selector.style.cursor="-webkit-grab",this.enableTransition(),this.drag.endX&&this.updateAfterDrag(),this.clearDrag()}},{key:"mousemoveHandler",value:function(e){if(e.preventDefault(),this.pointerDown){"A"===e.target.nodeName&&(this.drag.preventClick=!0),this.drag.endX=e.pageX,this.selector.style.cursor="-webkit-grabbing",this.sliderFrame.style.webkitTransition="all 0ms "+this.config.easing,this.sliderFrame.style.transition="all 0ms "+this.config.easing;var t=this.config.loop?this.currentSlide+this.perPage:this.currentSlide,i=t*(this.selectorWidth/this.perPage),r=this.drag.endX-this.drag.startX,n=this.config.rtl?i+r:i-r;this.sliderFrame.style[this.transformProperty]="translate3d("+(this.config.rtl?1:-1)*n+"px, 0, 0)"}}},{key:"mouseleaveHandler",value:function(e){this.pointerDown&&(this.pointerDown=!1,this.selector.style.cursor="-webkit-grab",this.drag.endX=e.pageX,this.drag.preventClick=!1,this.enableTransition(),this.updateAfterDrag(),this.clearDrag())}},{key:"clickHandler",value:function(e){this.drag.preventClick&&e.preventDefault(),this.drag.preventClick=!1}},{key:"remove",value:function(e,t){if(e<0||e>=this.innerElements.length)throw new Error("Item to remove doesn't exist 😭");var i=e<this.currentSlide,r=this.currentSlide+this.perPage-1===e;(i||r)&&this.currentSlide--,this.innerElements.splice(e,1),this.buildSliderFrame(),t&&t.call(this)}},{key:"insert",value:function(e,t,i){if(t<0||t>this.innerElements.length+1)throw new Error("Unable to inset it at this index 😭");if(-1!==this.innerElements.indexOf(e))throw new Error("The same item in a carousel? Really? Nope 😭");var r=t<=this.currentSlide>0&&this.innerElements.length;this.currentSlide=r?this.currentSlide+1:this.currentSlide,this.innerElements.splice(t,0,e),this.buildSliderFrame(),i&&i.call(this)}},{key:"prepend",value:function(e,t){this.insert(e,0),t&&t.call(this)}},{key:"append",value:function(e,t){this.insert(e,this.innerElements.length+1),t&&t.call(this)}},{key:"destroy",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments[1];if(this.detachEvents(),this.selector.style.cursor="auto",e){for(var i=document.createDocumentFragment(),r=0;r<this.innerElements.length;r++)i.appendChild(this.innerElements[r]);this.selector.innerHTML="",this.selector.appendChild(i),this.selector.removeAttribute("style")}t&&t.call(this)}}],[{key:"mergeSettings",value:function(e){var t={selector:".siema",duration:200,easing:"ease-out",perPage:1,startIndex:0,draggable:!0,multipleDrag:!0,threshold:20,loop:!1,rtl:!1,onInit:function(){},onChange:function(){}},i=e;for(var r in i)t[r]=i[r];return t}},{key:"webkitOrNot",value:function(){return"string"==typeof document.documentElement.style.transform?"transform":"WebkitTransform"}}]),e}();t.default=l,e.exports=t.default}])});

/***/ }),

/***/ "./node_modules/swiper/dist/js/swiper.js":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Swiper 3.4.2
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2017, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: March 10, 2017
 */
(function () {
    'use strict';
    var $;

    /*===========================
    Swiper
    ===========================*/
    var Swiper = function (container, params) {
        if (!(this instanceof Swiper)) return new Swiper(container, params);
    

        var defaults = {
            direction: 'horizontal',
            touchEventsTarget: 'container',
            initialSlide: 0,
            speed: 300,
            // autoplay
            autoplay: false,
            autoplayDisableOnInteraction: true,
            autoplayStopOnLast: false,
            // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
            iOSEdgeSwipeDetection: false,
            iOSEdgeSwipeThreshold: 20,
            // Free mode
            freeMode: false,
            freeModeMomentum: true,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: true,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: false,
            freeModeMinimumVelocity: 0.02,
            // Autoheight
            autoHeight: false,
            // Set wrapper width
            setWrapperSize: false,
            // Virtual Translate
            virtualTranslate: false,
            // Effects
            effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows : true
            },
            flip: {
                slideShadows : true,
                limitRotation: true
            },
            cube: {
                slideShadows: true,
                shadow: true,
                shadowOffset: 20,
                shadowScale: 0.94
            },
            fade: {
                crossFade: false
            },
            // Parallax
            parallax: false,
            // Zoom
            zoom: false,
            zoomMax: 3,
            zoomMin: 1,
            zoomToggle: true,
            // Scrollbar
            scrollbar: null,
            scrollbarHide: true,
            scrollbarDraggable: false,
            scrollbarSnapOnRelease: false,
            // Keyboard Mousewheel
            keyboardControl: false,
            mousewheelControl: false,
            mousewheelReleaseOnEdges: false,
            mousewheelInvert: false,
            mousewheelForceToAxis: false,
            mousewheelSensitivity: 1,
            mousewheelEventsTarged: 'container',
            // Hash Navigation
            hashnav: false,
            hashnavWatchState: false,
            // History
            history: false,
            // Commong Nav State
            replaceState: false,
            // Breakpoints
            breakpoints: undefined,
            // Slides grid
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: 'column',
            slidesPerGroup: 1,
            centeredSlides: false,
            slidesOffsetBefore: 0, // in px
            slidesOffsetAfter: 0, // in px
            // Round length
            roundLengths: false,
            // Touches
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: true,
            onlyExternal: false,
            threshold: 0,
            touchMoveStopPropagation: true,
            touchReleaseOnEdges: false,
            // Unique Navigation Elements
            uniqueNavElements: true,
            // Pagination
            pagination: null,
            paginationElement: 'span',
            paginationClickable: false,
            paginationHide: false,
            paginationBulletRender: null,
            paginationProgressRender: null,
            paginationFractionRender: null,
            paginationCustomRender: null,
            paginationType: 'bullets', // 'bullets' or 'progress' or 'fraction' or 'custom'
            // Resistance
            resistance: true,
            resistanceRatio: 0.85,
            // Next/prev buttons
            nextButton: null,
            prevButton: null,
            // Progress
            watchSlidesProgress: false,
            watchSlidesVisibility: false,
            // Cursor
            grabCursor: false,
            // Clicks
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            // Lazy Loading
            lazyLoading: false,
            lazyLoadingInPrevNext: false,
            lazyLoadingInPrevNextAmount: 1,
            lazyLoadingOnTransitionStart: false,
            // Images
            preloadImages: true,
            updateOnImagesReady: true,
            // loop
            loop: false,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            // Control
            control: undefined,
            controlInverse: false,
            controlBy: 'slide', //or 'container'
            normalizeSlideIndex: true,
            // Swiping/no swiping
            allowSwipeToPrev: true,
            allowSwipeToNext: true,
            swipeHandler: null, //'.swipe-handler',
            noSwiping: true,
            noSwipingClass: 'swiper-no-swiping',
            // Passive Listeners
            passiveListeners: true,
            // NS
            containerModifierClass: 'swiper-container-', // NEW
            slideClass: 'swiper-slide',
            slideActiveClass: 'swiper-slide-active',
            slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
            slideVisibleClass: 'swiper-slide-visible',
            slideDuplicateClass: 'swiper-slide-duplicate',
            slideNextClass: 'swiper-slide-next',
            slideDuplicateNextClass: 'swiper-slide-duplicate-next',
            slidePrevClass: 'swiper-slide-prev',
            slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
            wrapperClass: 'swiper-wrapper',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            buttonDisabledClass: 'swiper-button-disabled',
            paginationCurrentClass: 'swiper-pagination-current',
            paginationTotalClass: 'swiper-pagination-total',
            paginationHiddenClass: 'swiper-pagination-hidden',
            paginationProgressbarClass: 'swiper-pagination-progressbar',
            paginationClickableClass: 'swiper-pagination-clickable', // NEW
            paginationModifierClass: 'swiper-pagination-', // NEW
            lazyLoadingClass: 'swiper-lazy',
            lazyStatusLoadingClass: 'swiper-lazy-loading',
            lazyStatusLoadedClass: 'swiper-lazy-loaded',
            lazyPreloaderClass: 'swiper-lazy-preloader',
            notificationClass: 'swiper-notification',
            preloaderClass: 'preloader',
            zoomContainerClass: 'swiper-zoom-container',
        
            // Observer
            observer: false,
            observeParents: false,
            // Accessibility
            a11y: false,
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
            paginationBulletMessage: 'Go to slide {{index}}',
            // Callbacks
            runCallbacksOnInit: true
            /*
            Callbacks:
            onInit: function (swiper)
            onDestroy: function (swiper)
            onBeforeResize: function (swiper)
            onAfterResize: function (swiper)
            onClick: function (swiper, e)
            onTap: function (swiper, e)
            onDoubleTap: function (swiper, e)
            onSliderMove: function (swiper, e)
            onSlideChangeStart: function (swiper)
            onSlideChangeEnd: function (swiper)
            onTransitionStart: function (swiper)
            onTransitionEnd: function (swiper)
            onImagesReady: function (swiper)
            onProgress: function (swiper, progress)
            onTouchStart: function (swiper, e)
            onTouchMove: function (swiper, e)
            onTouchMoveOpposite: function (swiper, e)
            onTouchEnd: function (swiper, e)
            onReachBeginning: function (swiper)
            onReachEnd: function (swiper)
            onSetTransition: function (swiper, duration)
            onSetTranslate: function (swiper, translate)
            onAutoplayStart: function (swiper)
            onAutoplayStop: function (swiper),
            onLazyImageLoad: function (swiper, slide, image)
            onLazyImageReady: function (swiper, slide, image)
            onKeyPress: function (swiper, keyCode)
            */
        
        };
        var initialVirtualTranslate = params && params.virtualTranslate;
        
        params = params || {};
        var originalParams = {};
        for (var param in params) {
            if (typeof params[param] === 'object' && params[param] !== null && !(params[param].nodeType || params[param] === window || params[param] === document || (typeof Dom7 !== 'undefined' && params[param] instanceof Dom7) || (typeof jQuery !== 'undefined' && params[param] instanceof jQuery))) {
                originalParams[param] = {};
                for (var deepParam in params[param]) {
                    originalParams[param][deepParam] = params[param][deepParam];
                }
            }
            else {
                originalParams[param] = params[param];
            }
        }
        for (var def in defaults) {
            if (typeof params[def] === 'undefined') {
                params[def] = defaults[def];
            }
            else if (typeof params[def] === 'object') {
                for (var deepDef in defaults[def]) {
                    if (typeof params[def][deepDef] === 'undefined') {
                        params[def][deepDef] = defaults[def][deepDef];
                    }
                }
            }
        }
        
        // Swiper
        var s = this;
        
        // Params
        s.params = params;
        s.originalParams = originalParams;
        
        // Classname
        s.classNames = [];
        /*=========================
          Dom Library and plugins
          ===========================*/
        if (typeof $ !== 'undefined' && typeof Dom7 !== 'undefined'){
            $ = Dom7;
        }
        if (typeof $ === 'undefined') {
            if (typeof Dom7 === 'undefined') {
                $ = window.Dom7 || window.Zepto || window.jQuery;
            }
            else {
                $ = Dom7;
            }
            if (!$) return;
        }
        // Export it to Swiper instance
        s.$ = $;
        
        /*=========================
          Breakpoints
          ===========================*/
        s.currentBreakpoint = undefined;
        s.getActiveBreakpoint = function () {
            //Get breakpoint for window width
            if (!s.params.breakpoints) return false;
            var breakpoint = false;
            var points = [], point;
            for ( point in s.params.breakpoints ) {
                if (s.params.breakpoints.hasOwnProperty(point)) {
                    points.push(point);
                }
            }
            points.sort(function (a, b) {
                return parseInt(a, 10) > parseInt(b, 10);
            });
            for (var i = 0; i < points.length; i++) {
                point = points[i];
                if (point >= window.innerWidth && !breakpoint) {
                    breakpoint = point;
                }
            }
            return breakpoint || 'max';
        };
        s.setBreakpoint = function () {
            //Set breakpoint for window width and update parameters
            var breakpoint = s.getActiveBreakpoint();
            if (breakpoint && s.currentBreakpoint !== breakpoint) {
                var breakPointsParams = breakpoint in s.params.breakpoints ? s.params.breakpoints[breakpoint] : s.originalParams;
                var needsReLoop = s.params.loop && (breakPointsParams.slidesPerView !== s.params.slidesPerView);
                for ( var param in breakPointsParams ) {
                    s.params[param] = breakPointsParams[param];
                }
                s.currentBreakpoint = breakpoint;
                if(needsReLoop && s.destroyLoop) {
                    s.reLoop(true);
                }
            }
        };
        // Set breakpoint on load
        if (s.params.breakpoints) {
            s.setBreakpoint();
        }
        
        /*=========================
          Preparation - Define Container, Wrapper and Pagination
          ===========================*/
        s.container = $(container);
        if (s.container.length === 0) return;
        if (s.container.length > 1) {
            var swipers = [];
            s.container.each(function () {
                var container = this;
                swipers.push(new Swiper(this, params));
            });
            return swipers;
        }
        
        // Save instance in container HTML Element and in data
        s.container[0].swiper = s;
        s.container.data('swiper', s);
        
        s.classNames.push(s.params.containerModifierClass + s.params.direction);
        
        if (s.params.freeMode) {
            s.classNames.push(s.params.containerModifierClass + 'free-mode');
        }
        if (!s.support.flexbox) {
            s.classNames.push(s.params.containerModifierClass + 'no-flexbox');
            s.params.slidesPerColumn = 1;
        }
        if (s.params.autoHeight) {
            s.classNames.push(s.params.containerModifierClass + 'autoheight');
        }
        // Enable slides progress when required
        if (s.params.parallax || s.params.watchSlidesVisibility) {
            s.params.watchSlidesProgress = true;
        }
        // Max resistance when touchReleaseOnEdges
        if (s.params.touchReleaseOnEdges) {
            s.params.resistanceRatio = 0;
        }
        // Coverflow / 3D
        if (['cube', 'coverflow', 'flip'].indexOf(s.params.effect) >= 0) {
            if (s.support.transforms3d) {
                s.params.watchSlidesProgress = true;
                s.classNames.push(s.params.containerModifierClass + '3d');
            }
            else {
                s.params.effect = 'slide';
            }
        }
        if (s.params.effect !== 'slide') {
            s.classNames.push(s.params.containerModifierClass + s.params.effect);
        }
        if (s.params.effect === 'cube') {
            s.params.resistanceRatio = 0;
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.centeredSlides = false;
            s.params.spaceBetween = 0;
            s.params.virtualTranslate = true;
        }
        if (s.params.effect === 'fade' || s.params.effect === 'flip') {
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.watchSlidesProgress = true;
            s.params.spaceBetween = 0;
            if (typeof initialVirtualTranslate === 'undefined') {
                s.params.virtualTranslate = true;
            }
        }
        
        // Grab Cursor
        if (s.params.grabCursor && s.support.touch) {
            s.params.grabCursor = false;
        }
        
        // Wrapper
        s.wrapper = s.container.children('.' + s.params.wrapperClass);
        
        // Pagination
        if (s.params.pagination) {
            s.paginationContainer = $(s.params.pagination);
            if (s.params.uniqueNavElements && typeof s.params.pagination === 'string' && s.paginationContainer.length > 1 && s.container.find(s.params.pagination).length === 1) {
                s.paginationContainer = s.container.find(s.params.pagination);
            }
        
            if (s.params.paginationType === 'bullets' && s.params.paginationClickable) {
                s.paginationContainer.addClass(s.params.paginationModifierClass + 'clickable');
            }
            else {
                s.params.paginationClickable = false;
            }
            s.paginationContainer.addClass(s.params.paginationModifierClass + s.params.paginationType);
        }
        // Next/Prev Buttons
        if (s.params.nextButton || s.params.prevButton) {
            if (s.params.nextButton) {
                s.nextButton = $(s.params.nextButton);
                if (s.params.uniqueNavElements && typeof s.params.nextButton === 'string' && s.nextButton.length > 1 && s.container.find(s.params.nextButton).length === 1) {
                    s.nextButton = s.container.find(s.params.nextButton);
                }
            }
            if (s.params.prevButton) {
                s.prevButton = $(s.params.prevButton);
                if (s.params.uniqueNavElements && typeof s.params.prevButton === 'string' && s.prevButton.length > 1 && s.container.find(s.params.prevButton).length === 1) {
                    s.prevButton = s.container.find(s.params.prevButton);
                }
            }
        }
        
        // Is Horizontal
        s.isHorizontal = function () {
            return s.params.direction === 'horizontal';
        };
        // s.isH = isH;
        
        // RTL
        s.rtl = s.isHorizontal() && (s.container[0].dir.toLowerCase() === 'rtl' || s.container.css('direction') === 'rtl');
        if (s.rtl) {
            s.classNames.push(s.params.containerModifierClass + 'rtl');
        }
        
        // Wrong RTL support
        if (s.rtl) {
            s.wrongRTL = s.wrapper.css('display') === '-webkit-box';
        }
        
        // Columns
        if (s.params.slidesPerColumn > 1) {
            s.classNames.push(s.params.containerModifierClass + 'multirow');
        }
        
        // Check for Android
        if (s.device.android) {
            s.classNames.push(s.params.containerModifierClass + 'android');
        }
        
        // Add classes
        s.container.addClass(s.classNames.join(' '));
        
        // Translate
        s.translate = 0;
        
        // Progress
        s.progress = 0;
        
        // Velocity
        s.velocity = 0;
        
        /*=========================
          Locks, unlocks
          ===========================*/
        s.lockSwipeToNext = function () {
            s.params.allowSwipeToNext = false;
            if (s.params.allowSwipeToPrev === false && s.params.grabCursor) {
                s.unsetGrabCursor();
            }
        };
        s.lockSwipeToPrev = function () {
            s.params.allowSwipeToPrev = false;
            if (s.params.allowSwipeToNext === false && s.params.grabCursor) {
                s.unsetGrabCursor();
            }
        };
        s.lockSwipes = function () {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = false;
            if (s.params.grabCursor) s.unsetGrabCursor();
        };
        s.unlockSwipeToNext = function () {
            s.params.allowSwipeToNext = true;
            if (s.params.allowSwipeToPrev === true && s.params.grabCursor) {
                s.setGrabCursor();
            }
        };
        s.unlockSwipeToPrev = function () {
            s.params.allowSwipeToPrev = true;
            if (s.params.allowSwipeToNext === true && s.params.grabCursor) {
                s.setGrabCursor();
            }
        };
        s.unlockSwipes = function () {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = true;
            if (s.params.grabCursor) s.setGrabCursor();
        };
        
        /*=========================
          Round helper
          ===========================*/
        function round(a) {
            return Math.floor(a);
        }
        /*=========================
          Set grab cursor
          ===========================*/
        s.setGrabCursor = function(moving) {
            s.container[0].style.cursor = 'move';
            s.container[0].style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
            s.container[0].style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
            s.container[0].style.cursor = moving ? 'grabbing': 'grab';
        };
        s.unsetGrabCursor = function () {
            s.container[0].style.cursor = '';
        };
        if (s.params.grabCursor) {
            s.setGrabCursor();
        }
        /*=========================
          Update on Images Ready
          ===========================*/
        s.imagesToLoad = [];
        s.imagesLoaded = 0;
        
        s.loadImage = function (imgElement, src, srcset, sizes, checkForComplete, callback) {
            var image;
            function onReady () {
                if (callback) callback();
            }
            if (!imgElement.complete || !checkForComplete) {
                if (src) {
                    image = new window.Image();
                    image.onload = onReady;
                    image.onerror = onReady;
                    if (sizes) {
                        image.sizes = sizes;
                    }
                    if (srcset) {
                        image.srcset = srcset;
                    }
                    if (src) {
                        image.src = src;
                    }
                } else {
                    onReady();
                }
        
            } else {//image already loaded...
                onReady();
            }
        };
        s.preloadImages = function () {
            s.imagesToLoad = s.container.find('img');
            function _onReady() {
                if (typeof s === 'undefined' || s === null || !s) return;
                if (s.imagesLoaded !== undefined) s.imagesLoaded++;
                if (s.imagesLoaded === s.imagesToLoad.length) {
                    if (s.params.updateOnImagesReady) s.update();
                    s.emit('onImagesReady', s);
                }
            }
            for (var i = 0; i < s.imagesToLoad.length; i++) {
                s.loadImage(s.imagesToLoad[i], (s.imagesToLoad[i].currentSrc || s.imagesToLoad[i].getAttribute('src')), (s.imagesToLoad[i].srcset || s.imagesToLoad[i].getAttribute('srcset')), s.imagesToLoad[i].sizes || s.imagesToLoad[i].getAttribute('sizes'), true, _onReady);
            }
        };
        
        /*=========================
          Autoplay
          ===========================*/
        s.autoplayTimeoutId = undefined;
        s.autoplaying = false;
        s.autoplayPaused = false;
        function autoplay() {
            var autoplayDelay = s.params.autoplay;
            var activeSlide = s.slides.eq(s.activeIndex);
            if (activeSlide.attr('data-swiper-autoplay')) {
                autoplayDelay = activeSlide.attr('data-swiper-autoplay') || s.params.autoplay;
            }
            s.autoplayTimeoutId = setTimeout(function () {
                if (s.params.loop) {
                    s.fixLoop();
                    s._slideNext();
                    s.emit('onAutoplay', s);
                }
                else {
                    if (!s.isEnd) {
                        s._slideNext();
                        s.emit('onAutoplay', s);
                    }
                    else {
                        if (!params.autoplayStopOnLast) {
                            s._slideTo(0);
                            s.emit('onAutoplay', s);
                        }
                        else {
                            s.stopAutoplay();
                        }
                    }
                }
            }, autoplayDelay);
        }
        s.startAutoplay = function () {
            if (typeof s.autoplayTimeoutId !== 'undefined') return false;
            if (!s.params.autoplay) return false;
            if (s.autoplaying) return false;
            s.autoplaying = true;
            s.emit('onAutoplayStart', s);
            autoplay();
        };
        s.stopAutoplay = function (internal) {
            if (!s.autoplayTimeoutId) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplaying = false;
            s.autoplayTimeoutId = undefined;
            s.emit('onAutoplayStop', s);
        };
        s.pauseAutoplay = function (speed) {
            if (s.autoplayPaused) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplayPaused = true;
            if (speed === 0) {
                s.autoplayPaused = false;
                autoplay();
            }
            else {
                s.wrapper.transitionEnd(function () {
                    if (!s) return;
                    s.autoplayPaused = false;
                    if (!s.autoplaying) {
                        s.stopAutoplay();
                    }
                    else {
                        autoplay();
                    }
                });
            }
        };
        /*=========================
          Min/Max Translate
          ===========================*/
        s.minTranslate = function () {
            return (-s.snapGrid[0]);
        };
        s.maxTranslate = function () {
            return (-s.snapGrid[s.snapGrid.length - 1]);
        };
        /*=========================
          Slider/slides sizes
          ===========================*/
        s.updateAutoHeight = function () {
            var activeSlides = [];
            var newHeight = 0;
            var i;
        
            // Find slides currently in view
            if(s.params.slidesPerView !== 'auto' && s.params.slidesPerView > 1) {
                for (i = 0; i < Math.ceil(s.params.slidesPerView); i++) {
                    var index = s.activeIndex + i;
                    if(index > s.slides.length) break;
                    activeSlides.push(s.slides.eq(index)[0]);
                }
            } else {
                activeSlides.push(s.slides.eq(s.activeIndex)[0]);
            }
        
            // Find new height from heighest slide in view
            for (i = 0; i < activeSlides.length; i++) {
                if (typeof activeSlides[i] !== 'undefined') {
                    var height = activeSlides[i].offsetHeight;
                    newHeight = height > newHeight ? height : newHeight;
                }
            }
        
            // Update Height
            if (newHeight) s.wrapper.css('height', newHeight + 'px');
        };
        s.updateContainerSize = function () {
            var width, height;
            if (typeof s.params.width !== 'undefined') {
                width = s.params.width;
            }
            else {
                width = s.container[0].clientWidth;
            }
            if (typeof s.params.height !== 'undefined') {
                height = s.params.height;
            }
            else {
                height = s.container[0].clientHeight;
            }
            if (width === 0 && s.isHorizontal() || height === 0 && !s.isHorizontal()) {
                return;
            }
        
            //Subtract paddings
            width = width - parseInt(s.container.css('padding-left'), 10) - parseInt(s.container.css('padding-right'), 10);
            height = height - parseInt(s.container.css('padding-top'), 10) - parseInt(s.container.css('padding-bottom'), 10);
        
            // Store values
            s.width = width;
            s.height = height;
            s.size = s.isHorizontal() ? s.width : s.height;
        };
        
        s.updateSlidesSize = function () {
            s.slides = s.wrapper.children('.' + s.params.slideClass);
            s.snapGrid = [];
            s.slidesGrid = [];
            s.slidesSizesGrid = [];
        
            var spaceBetween = s.params.spaceBetween,
                slidePosition = -s.params.slidesOffsetBefore,
                i,
                prevSlideSize = 0,
                index = 0;
            if (typeof s.size === 'undefined') return;
            if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
                spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size;
            }
        
            s.virtualSize = -spaceBetween;
            // reset margins
            if (s.rtl) s.slides.css({marginLeft: '', marginTop: ''});
            else s.slides.css({marginRight: '', marginBottom: ''});
        
            var slidesNumberEvenToRows;
            if (s.params.slidesPerColumn > 1) {
                if (Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn) {
                    slidesNumberEvenToRows = s.slides.length;
                }
                else {
                    slidesNumberEvenToRows = Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn;
                }
                if (s.params.slidesPerView !== 'auto' && s.params.slidesPerColumnFill === 'row') {
                    slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, s.params.slidesPerView * s.params.slidesPerColumn);
                }
            }
        
            // Calc slides
            var slideSize;
            var slidesPerColumn = s.params.slidesPerColumn;
            var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
            var numFullColumns = slidesPerRow - (s.params.slidesPerColumn * slidesPerRow - s.slides.length);
            for (i = 0; i < s.slides.length; i++) {
                slideSize = 0;
                var slide = s.slides.eq(i);
                if (s.params.slidesPerColumn > 1) {
                    // Set slides order
                    var newSlideOrderIndex;
                    var column, row;
                    if (s.params.slidesPerColumnFill === 'column') {
                        column = Math.floor(i / slidesPerColumn);
                        row = i - column * slidesPerColumn;
                        if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn-1)) {
                            if (++row >= slidesPerColumn) {
                                row = 0;
                                column++;
                            }
                        }
                        newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
                        slide
                            .css({
                                '-webkit-box-ordinal-group': newSlideOrderIndex,
                                '-moz-box-ordinal-group': newSlideOrderIndex,
                                '-ms-flex-order': newSlideOrderIndex,
                                '-webkit-order': newSlideOrderIndex,
                                'order': newSlideOrderIndex
                            });
                    }
                    else {
                        row = Math.floor(i / slidesPerRow);
                        column = i - row * slidesPerRow;
                    }
                    slide
                        .css(
                            'margin-' + (s.isHorizontal() ? 'top' : 'left'),
                            (row !== 0 && s.params.spaceBetween) && (s.params.spaceBetween + 'px')
                        )
                        .attr('data-swiper-column', column)
                        .attr('data-swiper-row', row);
        
                }
                if (slide.css('display') === 'none') continue;
                if (s.params.slidesPerView === 'auto') {
                    slideSize = s.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
                    if (s.params.roundLengths) slideSize = round(slideSize);
                }
                else {
                    slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
                    if (s.params.roundLengths) slideSize = round(slideSize);
        
                    if (s.isHorizontal()) {
                        s.slides[i].style.width = slideSize + 'px';
                    }
                    else {
                        s.slides[i].style.height = slideSize + 'px';
                    }
                }
                s.slides[i].swiperSlideSize = slideSize;
                s.slidesSizesGrid.push(slideSize);
        
        
                if (s.params.centeredSlides) {
                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                    if(prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
                    if (i === 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
                    if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                }
                else {
                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                    slidePosition = slidePosition + slideSize + spaceBetween;
                }
        
                s.virtualSize += slideSize + spaceBetween;
        
                prevSlideSize = slideSize;
        
                index ++;
            }
            s.virtualSize = Math.max(s.virtualSize, s.size) + s.params.slidesOffsetAfter;
            var newSlidesGrid;
        
            if (
                s.rtl && s.wrongRTL && (s.params.effect === 'slide' || s.params.effect === 'coverflow')) {
                s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
            }
            if (!s.support.flexbox || s.params.setWrapperSize) {
                if (s.isHorizontal()) s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
                else s.wrapper.css({height: s.virtualSize + s.params.spaceBetween + 'px'});
            }
        
            if (s.params.slidesPerColumn > 1) {
                s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows;
                s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween;
                if (s.isHorizontal()) s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
                else s.wrapper.css({height: s.virtualSize + s.params.spaceBetween + 'px'});
                if (s.params.centeredSlides) {
                    newSlidesGrid = [];
                    for (i = 0; i < s.snapGrid.length; i++) {
                        if (s.snapGrid[i] < s.virtualSize + s.snapGrid[0]) newSlidesGrid.push(s.snapGrid[i]);
                    }
                    s.snapGrid = newSlidesGrid;
                }
            }
        
            // Remove last grid elements depending on width
            if (!s.params.centeredSlides) {
                newSlidesGrid = [];
                for (i = 0; i < s.snapGrid.length; i++) {
                    if (s.snapGrid[i] <= s.virtualSize - s.size) {
                        newSlidesGrid.push(s.snapGrid[i]);
                    }
                }
                s.snapGrid = newSlidesGrid;
                if (Math.floor(s.virtualSize - s.size) - Math.floor(s.snapGrid[s.snapGrid.length - 1]) > 1) {
                    s.snapGrid.push(s.virtualSize - s.size);
                }
            }
            if (s.snapGrid.length === 0) s.snapGrid = [0];
        
            if (s.params.spaceBetween !== 0) {
                if (s.isHorizontal()) {
                    if (s.rtl) s.slides.css({marginLeft: spaceBetween + 'px'});
                    else s.slides.css({marginRight: spaceBetween + 'px'});
                }
                else s.slides.css({marginBottom: spaceBetween + 'px'});
            }
            if (s.params.watchSlidesProgress) {
                s.updateSlidesOffset();
            }
        };
        s.updateSlidesOffset = function () {
            for (var i = 0; i < s.slides.length; i++) {
                s.slides[i].swiperSlideOffset = s.isHorizontal() ? s.slides[i].offsetLeft : s.slides[i].offsetTop;
            }
        };
        
        /*=========================
          Dynamic Slides Per View
          ===========================*/
        s.currentSlidesPerView = function () {
            var spv = 1, i, j;
            if (s.params.centeredSlides) {
                var size = s.slides[s.activeIndex].swiperSlideSize;
                var breakLoop;
                for (i = s.activeIndex + 1; i < s.slides.length; i++) {
                    if (s.slides[i] && !breakLoop) {
                        size += s.slides[i].swiperSlideSize;
                        spv ++;
                        if (size > s.size) breakLoop = true;
                    }
                }
                for (j = s.activeIndex - 1; j >= 0; j--) {
                    if (s.slides[j] && !breakLoop) {
                        size += s.slides[j].swiperSlideSize;
                        spv ++;
                        if (size > s.size) breakLoop = true;
                    }
                }
            }
            else {
                for (i = s.activeIndex + 1; i < s.slides.length; i++) {
                    if (s.slidesGrid[i] - s.slidesGrid[s.activeIndex] < s.size) {
                        spv++;
                    }
                }
            }
            return spv;
        };
        /*=========================
          Slider/slides progress
          ===========================*/
        s.updateSlidesProgress = function (translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            if (s.slides.length === 0) return;
            if (typeof s.slides[0].swiperSlideOffset === 'undefined') s.updateSlidesOffset();
        
            var offsetCenter = -translate;
            if (s.rtl) offsetCenter = translate;
        
            // Visible Slides
            s.slides.removeClass(s.params.slideVisibleClass);
            for (var i = 0; i < s.slides.length; i++) {
                var slide = s.slides[i];
                var slideProgress = (offsetCenter + (s.params.centeredSlides ? s.minTranslate() : 0) - slide.swiperSlideOffset) / (slide.swiperSlideSize + s.params.spaceBetween);
                if (s.params.watchSlidesVisibility) {
                    var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
                    var slideAfter = slideBefore + s.slidesSizesGrid[i];
                    var isVisible =
                        (slideBefore >= 0 && slideBefore < s.size) ||
                        (slideAfter > 0 && slideAfter <= s.size) ||
                        (slideBefore <= 0 && slideAfter >= s.size);
                    if (isVisible) {
                        s.slides.eq(i).addClass(s.params.slideVisibleClass);
                    }
                }
                slide.progress = s.rtl ? -slideProgress : slideProgress;
            }
        };
        s.updateProgress = function (translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            var wasBeginning = s.isBeginning;
            var wasEnd = s.isEnd;
            if (translatesDiff === 0) {
                s.progress = 0;
                s.isBeginning = s.isEnd = true;
            }
            else {
                s.progress = (translate - s.minTranslate()) / (translatesDiff);
                s.isBeginning = s.progress <= 0;
                s.isEnd = s.progress >= 1;
            }
            if (s.isBeginning && !wasBeginning) s.emit('onReachBeginning', s);
            if (s.isEnd && !wasEnd) s.emit('onReachEnd', s);
        
            if (s.params.watchSlidesProgress) s.updateSlidesProgress(translate);
            s.emit('onProgress', s, s.progress);
        };
        s.updateActiveIndex = function () {
            var translate = s.rtl ? s.translate : -s.translate;
            var newActiveIndex, i, snapIndex;
            for (i = 0; i < s.slidesGrid.length; i ++) {
                if (typeof s.slidesGrid[i + 1] !== 'undefined') {
                    if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] - (s.slidesGrid[i + 1] - s.slidesGrid[i]) / 2) {
                        newActiveIndex = i;
                    }
                    else if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1]) {
                        newActiveIndex = i + 1;
                    }
                }
                else {
                    if (translate >= s.slidesGrid[i]) {
                        newActiveIndex = i;
                    }
                }
            }
            // Normalize slideIndex
            if(s.params.normalizeSlideIndex){
                if (newActiveIndex < 0 || typeof newActiveIndex === 'undefined') newActiveIndex = 0;
            }
            // for (i = 0; i < s.slidesGrid.length; i++) {
                // if (- translate >= s.slidesGrid[i]) {
                    // newActiveIndex = i;
                // }
            // }
            snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup);
            if (snapIndex >= s.snapGrid.length) snapIndex = s.snapGrid.length - 1;
        
            if (newActiveIndex === s.activeIndex) {
                return;
            }
            s.snapIndex = snapIndex;
            s.previousIndex = s.activeIndex;
            s.activeIndex = newActiveIndex;
            s.updateClasses();
            s.updateRealIndex();
        };
        s.updateRealIndex = function(){
            s.realIndex = parseInt(s.slides.eq(s.activeIndex).attr('data-swiper-slide-index') || s.activeIndex, 10);
        };
        
        /*=========================
          Classes
          ===========================*/
        s.updateClasses = function () {
            s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass + ' ' + s.params.slideDuplicateActiveClass + ' ' + s.params.slideDuplicateNextClass + ' ' + s.params.slideDuplicatePrevClass);
            var activeSlide = s.slides.eq(s.activeIndex);
            // Active classes
            activeSlide.addClass(s.params.slideActiveClass);
            if (params.loop) {
                // Duplicate to all looped slides
                if (activeSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass);
                }
                else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass);
                }
            }
            // Next Slide
            var nextSlide = activeSlide.next('.' + s.params.slideClass).addClass(s.params.slideNextClass);
            if (s.params.loop && nextSlide.length === 0) {
                nextSlide = s.slides.eq(0);
                nextSlide.addClass(s.params.slideNextClass);
            }
            // Prev Slide
            var prevSlide = activeSlide.prev('.' + s.params.slideClass).addClass(s.params.slidePrevClass);
            if (s.params.loop && prevSlide.length === 0) {
                prevSlide = s.slides.eq(-1);
                prevSlide.addClass(s.params.slidePrevClass);
            }
            if (params.loop) {
                // Duplicate to all looped slides
                if (nextSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + nextSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicateNextClass);
                }
                else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + nextSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicateNextClass);
                }
                if (prevSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + prevSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicatePrevClass);
                }
                else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + prevSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicatePrevClass);
                }
            }
        
            // Pagination
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                // Current/Total
                var current,
                    total = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                if (s.params.loop) {
                    current = Math.ceil((s.activeIndex - s.loopedSlides)/s.params.slidesPerGroup);
                    if (current > s.slides.length - 1 - s.loopedSlides * 2) {
                        current = current - (s.slides.length - s.loopedSlides * 2);
                    }
                    if (current > total - 1) current = current - total;
                    if (current < 0 && s.params.paginationType !== 'bullets') current = total + current;
                }
                else {
                    if (typeof s.snapIndex !== 'undefined') {
                        current = s.snapIndex;
                    }
                    else {
                        current = s.activeIndex || 0;
                    }
                }
                // Types
                if (s.params.paginationType === 'bullets' && s.bullets && s.bullets.length > 0) {
                    s.bullets.removeClass(s.params.bulletActiveClass);
                    if (s.paginationContainer.length > 1) {
                        s.bullets.each(function () {
                            if ($(this).index() === current) $(this).addClass(s.params.bulletActiveClass);
                        });
                    }
                    else {
                        s.bullets.eq(current).addClass(s.params.bulletActiveClass);
                    }
                }
                if (s.params.paginationType === 'fraction') {
                    s.paginationContainer.find('.' + s.params.paginationCurrentClass).text(current + 1);
                    s.paginationContainer.find('.' + s.params.paginationTotalClass).text(total);
                }
                if (s.params.paginationType === 'progress') {
                    var scale = (current + 1) / total,
                        scaleX = scale,
                        scaleY = 1;
                    if (!s.isHorizontal()) {
                        scaleY = scale;
                        scaleX = 1;
                    }
                    s.paginationContainer.find('.' + s.params.paginationProgressbarClass).transform('translate3d(0,0,0) scaleX(' + scaleX + ') scaleY(' + scaleY + ')').transition(s.params.speed);
                }
                if (s.params.paginationType === 'custom' && s.params.paginationCustomRender) {
                    s.paginationContainer.html(s.params.paginationCustomRender(s, current + 1, total));
                    s.emit('onPaginationRendered', s, s.paginationContainer[0]);
                }
            }
        
            // Next/active buttons
            if (!s.params.loop) {
                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                    if (s.isBeginning) {
                        s.prevButton.addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable(s.prevButton);
                    }
                    else {
                        s.prevButton.removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable(s.prevButton);
                    }
                }
                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                    if (s.isEnd) {
                        s.nextButton.addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable(s.nextButton);
                    }
                    else {
                        s.nextButton.removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable(s.nextButton);
                    }
                }
            }
        };
        
        /*=========================
          Pagination
          ===========================*/
        s.updatePagination = function () {
            if (!s.params.pagination) return;
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                var paginationHTML = '';
                if (s.params.paginationType === 'bullets') {
                    var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                    for (var i = 0; i < numberOfBullets; i++) {
                        if (s.params.paginationBulletRender) {
                            paginationHTML += s.params.paginationBulletRender(s, i, s.params.bulletClass);
                        }
                        else {
                            paginationHTML += '<' + s.params.paginationElement+' class="' + s.params.bulletClass + '"></' + s.params.paginationElement + '>';
                        }
                    }
                    s.paginationContainer.html(paginationHTML);
                    s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
                    if (s.params.paginationClickable && s.params.a11y && s.a11y) {
                        s.a11y.initPagination();
                    }
                }
                if (s.params.paginationType === 'fraction') {
                    if (s.params.paginationFractionRender) {
                        paginationHTML = s.params.paginationFractionRender(s, s.params.paginationCurrentClass, s.params.paginationTotalClass);
                    }
                    else {
                        paginationHTML =
                            '<span class="' + s.params.paginationCurrentClass + '"></span>' +
                            ' / ' +
                            '<span class="' + s.params.paginationTotalClass+'"></span>';
                    }
                    s.paginationContainer.html(paginationHTML);
                }
                if (s.params.paginationType === 'progress') {
                    if (s.params.paginationProgressRender) {
                        paginationHTML = s.params.paginationProgressRender(s, s.params.paginationProgressbarClass);
                    }
                    else {
                        paginationHTML = '<span class="' + s.params.paginationProgressbarClass + '"></span>';
                    }
                    s.paginationContainer.html(paginationHTML);
                }
                if (s.params.paginationType !== 'custom') {
                    s.emit('onPaginationRendered', s, s.paginationContainer[0]);
                }
            }
        };
        /*=========================
          Common update method
          ===========================*/
        s.update = function (updateTranslate) {
            if (!s) return;
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updateProgress();
            s.updatePagination();
            s.updateClasses();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            var newTranslate;
            function forceSetTranslate() {
                var translate = s.rtl ? -s.translate : s.translate;
                newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();
            }
            if (updateTranslate) {
                var translated;
                if (s.controller && s.controller.spline) {
                    s.controller.spline = undefined;
                }
                if (s.params.freeMode) {
                    forceSetTranslate();
                    if (s.params.autoHeight) {
                        s.updateAutoHeight();
                    }
                }
                else {
                    if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                        translated = s.slideTo(s.slides.length - 1, 0, false, true);
                    }
                    else {
                        translated = s.slideTo(s.activeIndex, 0, false, true);
                    }
                    if (!translated) {
                        forceSetTranslate();
                    }
                }
            }
            else if (s.params.autoHeight) {
                s.updateAutoHeight();
            }
        };
        
        /*=========================
          Resize Handler
          ===========================*/
        s.onResize = function (forceUpdatePagination) {
            if (s.params.onBeforeResize) s.params.onBeforeResize(s);
            //Breakpoints
            if (s.params.breakpoints) {
                s.setBreakpoint();
            }
        
            // Disable locks on resize
            var allowSwipeToPrev = s.params.allowSwipeToPrev;
            var allowSwipeToNext = s.params.allowSwipeToNext;
            s.params.allowSwipeToPrev = s.params.allowSwipeToNext = true;
        
            s.updateContainerSize();
            s.updateSlidesSize();
            if (s.params.slidesPerView === 'auto' || s.params.freeMode || forceUpdatePagination) s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            if (s.controller && s.controller.spline) {
                s.controller.spline = undefined;
            }
            var slideChangedBySlideTo = false;
            if (s.params.freeMode) {
                var newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();
        
                if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
            }
            else {
                s.updateClasses();
                if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                    slideChangedBySlideTo = s.slideTo(s.slides.length - 1, 0, false, true);
                }
                else {
                    slideChangedBySlideTo = s.slideTo(s.activeIndex, 0, false, true);
                }
            }
            if (s.params.lazyLoading && !slideChangedBySlideTo && s.lazy) {
                s.lazy.load();
            }
            // Return locks after resize
            s.params.allowSwipeToPrev = allowSwipeToPrev;
            s.params.allowSwipeToNext = allowSwipeToNext;
            if (s.params.onAfterResize) s.params.onAfterResize(s);
        };
        
        /*=========================
          Events
          ===========================*/
        
        //Define Touch Events
        s.touchEventsDesktop = {start: 'mousedown', move: 'mousemove', end: 'mouseup'};
        if (window.navigator.pointerEnabled) s.touchEventsDesktop = {start: 'pointerdown', move: 'pointermove', end: 'pointerup'};
        else if (window.navigator.msPointerEnabled) s.touchEventsDesktop = {start: 'MSPointerDown', move: 'MSPointerMove', end: 'MSPointerUp'};
        s.touchEvents = {
            start : s.support.touch || !s.params.simulateTouch  ? 'touchstart' : s.touchEventsDesktop.start,
            move : s.support.touch || !s.params.simulateTouch ? 'touchmove' : s.touchEventsDesktop.move,
            end : s.support.touch || !s.params.simulateTouch ? 'touchend' : s.touchEventsDesktop.end
        };
        
        
        // WP8 Touch Events Fix
        if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
            (s.params.touchEventsTarget === 'container' ? s.container : s.wrapper).addClass('swiper-wp8-' + s.params.direction);
        }
        
        // Attach/detach events
        s.initEvents = function (detach) {
            var actionDom = detach ? 'off' : 'on';
            var action = detach ? 'removeEventListener' : 'addEventListener';
            var touchEventsTarget = s.params.touchEventsTarget === 'container' ? s.container[0] : s.wrapper[0];
            var target = s.support.touch ? touchEventsTarget : document;
        
            var moveCapture = s.params.nested ? true : false;
        
            //Touch Events
            if (s.browser.ie) {
                touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
                target[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                target[action](s.touchEvents.end, s.onTouchEnd, false);
            }
            else {
                if (s.support.touch) {
                    var passiveListener = s.touchEvents.start === 'touchstart' && s.support.passiveListener && s.params.passiveListeners ? {passive: true, capture: false} : false;
                    touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, passiveListener);
                    touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                    touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, passiveListener);
                }
                if ((params.simulateTouch && !s.device.ios && !s.device.android) || (params.simulateTouch && !s.support.touch && s.device.ios)) {
                    touchEventsTarget[action]('mousedown', s.onTouchStart, false);
                    document[action]('mousemove', s.onTouchMove, moveCapture);
                    document[action]('mouseup', s.onTouchEnd, false);
                }
            }
            window[action]('resize', s.onResize);
        
            // Next, Prev, Index
            if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                s.nextButton[actionDom]('click', s.onClickNext);
                if (s.params.a11y && s.a11y) s.nextButton[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                s.prevButton[actionDom]('click', s.onClickPrev);
                if (s.params.a11y && s.a11y) s.prevButton[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.pagination && s.params.paginationClickable) {
                s.paginationContainer[actionDom]('click', '.' + s.params.bulletClass, s.onClickIndex);
                if (s.params.a11y && s.a11y) s.paginationContainer[actionDom]('keydown', '.' + s.params.bulletClass, s.a11y.onEnterKey);
            }
        
            // Prevent Links Clicks
            if (s.params.preventClicks || s.params.preventClicksPropagation) touchEventsTarget[action]('click', s.preventClicks, true);
        };
        s.attachEvents = function () {
            s.initEvents();
        };
        s.detachEvents = function () {
            s.initEvents(true);
        };
        
        /*=========================
          Handle Clicks
          ===========================*/
        // Prevent Clicks
        s.allowClick = true;
        s.preventClicks = function (e) {
            if (!s.allowClick) {
                if (s.params.preventClicks) e.preventDefault();
                if (s.params.preventClicksPropagation && s.animating) {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            }
        };
        // Clicks
        s.onClickNext = function (e) {
            e.preventDefault();
            if (s.isEnd && !s.params.loop) return;
            s.slideNext();
        };
        s.onClickPrev = function (e) {
            e.preventDefault();
            if (s.isBeginning && !s.params.loop) return;
            s.slidePrev();
        };
        s.onClickIndex = function (e) {
            e.preventDefault();
            var index = $(this).index() * s.params.slidesPerGroup;
            if (s.params.loop) index = index + s.loopedSlides;
            s.slideTo(index);
        };
        
        /*=========================
          Handle Touches
          ===========================*/
        function findElementInEvent(e, selector) {
            var el = $(e.target);
            if (!el.is(selector)) {
                if (typeof selector === 'string') {
                    el = el.parents(selector);
                }
                else if (selector.nodeType) {
                    var found;
                    el.parents().each(function (index, _el) {
                        if (_el === selector) found = selector;
                    });
                    if (!found) return undefined;
                    else return selector;
                }
            }
            if (el.length === 0) {
                return undefined;
            }
            return el[0];
        }
        s.updateClickedSlide = function (e) {
            var slide = findElementInEvent(e, '.' + s.params.slideClass);
            var slideFound = false;
            if (slide) {
                for (var i = 0; i < s.slides.length; i++) {
                    if (s.slides[i] === slide) slideFound = true;
                }
            }
        
            if (slide && slideFound) {
                s.clickedSlide = slide;
                s.clickedIndex = $(slide).index();
            }
            else {
                s.clickedSlide = undefined;
                s.clickedIndex = undefined;
                return;
            }
            if (s.params.slideToClickedSlide && s.clickedIndex !== undefined && s.clickedIndex !== s.activeIndex) {
                var slideToIndex = s.clickedIndex,
                    realIndex,
                    duplicatedSlides,
                    slidesPerView = s.params.slidesPerView === 'auto' ? s.currentSlidesPerView() : s.params.slidesPerView;
                if (s.params.loop) {
                    if (s.animating) return;
                    realIndex = parseInt($(s.clickedSlide).attr('data-swiper-slide-index'), 10);
                    if (s.params.centeredSlides) {
                        if ((slideToIndex < s.loopedSlides - slidesPerView/2) || (slideToIndex > s.slides.length - s.loopedSlides + slidesPerView/2)) {
                            s.fixLoop();
                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ')').eq(0).index();
                            setTimeout(function () {
                                s.slideTo(slideToIndex);
                            }, 0);
                        }
                        else {
                            s.slideTo(slideToIndex);
                        }
                    }
                    else {
                        if (slideToIndex > s.slides.length - slidesPerView) {
                            s.fixLoop();
                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ')').eq(0).index();
                            setTimeout(function () {
                                s.slideTo(slideToIndex);
                            }, 0);
                        }
                        else {
                            s.slideTo(slideToIndex);
                        }
                    }
                }
                else {
                    s.slideTo(slideToIndex);
                }
            }
        };
        
        var isTouched,
            isMoved,
            allowTouchCallbacks,
            touchStartTime,
            isScrolling,
            currentTranslate,
            startTranslate,
            allowThresholdMove,
            // Form elements to match
            formElements = 'input, select, textarea, button, video',
            // Last click time
            lastClickTime = Date.now(), clickTimeout,
            //Velocities
            velocities = [],
            allowMomentumBounce;
        
        // Animating Flag
        s.animating = false;
        
        // Touches information
        s.touches = {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
        };
        
        // Touch handlers
        var isTouchEvent, startMoving;
        s.onTouchStart = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            isTouchEvent = e.type === 'touchstart';
            if (!isTouchEvent && 'which' in e && e.which === 3) return;
            if (s.params.noSwiping && findElementInEvent(e, '.' + s.params.noSwipingClass)) {
                s.allowClick = true;
                return;
            }
            if (s.params.swipeHandler) {
                if (!findElementInEvent(e, s.params.swipeHandler)) return;
            }
        
            var startX = s.touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
            var startY = s.touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        
            // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore
            if(s.device.ios && s.params.iOSEdgeSwipeDetection && startX <= s.params.iOSEdgeSwipeThreshold) {
                return;
            }
        
            isTouched = true;
            isMoved = false;
            allowTouchCallbacks = true;
            isScrolling = undefined;
            startMoving = undefined;
            s.touches.startX = startX;
            s.touches.startY = startY;
            touchStartTime = Date.now();
            s.allowClick = true;
            s.updateContainerSize();
            s.swipeDirection = undefined;
            if (s.params.threshold > 0) allowThresholdMove = false;
            if (e.type !== 'touchstart') {
                var preventDefault = true;
                if ($(e.target).is(formElements)) preventDefault = false;
                if (document.activeElement && $(document.activeElement).is(formElements)) {
                    document.activeElement.blur();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
            }
            s.emit('onTouchStart', s, e);
        };
        
        s.onTouchMove = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            if (isTouchEvent && e.type === 'mousemove') return;
            if (e.preventedByNestedSwiper) {
                s.touches.startX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                s.touches.startY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                return;
            }
            if (s.params.onlyExternal) {
                // isMoved = true;
                s.allowClick = false;
                if (isTouched) {
                    s.touches.startX = s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                    s.touches.startY = s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    touchStartTime = Date.now();
                }
                return;
            }
            if (isTouchEvent && s.params.touchReleaseOnEdges && !s.params.loop) {
                if (!s.isHorizontal()) {
                    // Vertical
                    if (
                        (s.touches.currentY < s.touches.startY && s.translate <= s.maxTranslate()) ||
                        (s.touches.currentY > s.touches.startY && s.translate >= s.minTranslate())
                        ) {
                        return;
                    }
                }
                else {
                    if (
                        (s.touches.currentX < s.touches.startX && s.translate <= s.maxTranslate()) ||
                        (s.touches.currentX > s.touches.startX && s.translate >= s.minTranslate())
                        ) {
                        return;
                    }
                }
            }
            if (isTouchEvent && document.activeElement) {
                if (e.target === document.activeElement && $(e.target).is(formElements)) {
                    isMoved = true;
                    s.allowClick = false;
                    return;
                }
            }
            if (allowTouchCallbacks) {
                s.emit('onTouchMove', s, e);
            }
            if (e.targetTouches && e.targetTouches.length > 1) return;
        
            s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
            s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        
            if (typeof isScrolling === 'undefined') {
                var touchAngle;
                if (s.isHorizontal() && s.touches.currentY === s.touches.startY || !s.isHorizontal() && s.touches.currentX === s.touches.startX) {
                    isScrolling = false;
                }
                else {
                    touchAngle = Math.atan2(Math.abs(s.touches.currentY - s.touches.startY), Math.abs(s.touches.currentX - s.touches.startX)) * 180 / Math.PI;
                    isScrolling = s.isHorizontal() ? touchAngle > s.params.touchAngle : (90 - touchAngle > s.params.touchAngle);
                }
            }
            if (isScrolling) {
                s.emit('onTouchMoveOpposite', s, e);
            }
            if (typeof startMoving === 'undefined') {
                if (s.touches.currentX !== s.touches.startX || s.touches.currentY !== s.touches.startY) {
                    startMoving = true;
                }
            }
            if (!isTouched) return;
            if (isScrolling)  {
                isTouched = false;
                return;
            }
            if (!startMoving) {
                return;
            }
            s.allowClick = false;
            s.emit('onSliderMove', s, e);
            e.preventDefault();
            if (s.params.touchMoveStopPropagation && !s.params.nested) {
                e.stopPropagation();
            }
        
            if (!isMoved) {
                if (params.loop) {
                    s.fixLoop();
                }
                startTranslate = s.getWrapperTranslate();
                s.setWrapperTransition(0);
                if (s.animating) {
                    s.wrapper.trigger('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd');
                }
                if (s.params.autoplay && s.autoplaying) {
                    if (s.params.autoplayDisableOnInteraction) {
                        s.stopAutoplay();
                    }
                    else {
                        s.pauseAutoplay();
                    }
                }
                allowMomentumBounce = false;
                //Grab Cursor
                if (s.params.grabCursor && (s.params.allowSwipeToNext === true || s.params.allowSwipeToPrev === true)) {
                    s.setGrabCursor(true);
                }
            }
            isMoved = true;
        
            var diff = s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
        
            diff = diff * s.params.touchRatio;
            if (s.rtl) diff = -diff;
        
            s.swipeDirection = diff > 0 ? 'prev' : 'next';
            currentTranslate = diff + startTranslate;
        
            var disableParentSwiper = true;
            if ((diff > 0 && currentTranslate > s.minTranslate())) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio);
            }
            else if (diff < 0 && currentTranslate < s.maxTranslate()) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio);
            }
        
            if (disableParentSwiper) {
                e.preventedByNestedSwiper = true;
            }
        
            // Directions locks
            if (!s.params.allowSwipeToNext && s.swipeDirection === 'next' && currentTranslate < startTranslate) {
                currentTranslate = startTranslate;
            }
            if (!s.params.allowSwipeToPrev && s.swipeDirection === 'prev' && currentTranslate > startTranslate) {
                currentTranslate = startTranslate;
            }
        
        
            // Threshold
            if (s.params.threshold > 0) {
                if (Math.abs(diff) > s.params.threshold || allowThresholdMove) {
                    if (!allowThresholdMove) {
                        allowThresholdMove = true;
                        s.touches.startX = s.touches.currentX;
                        s.touches.startY = s.touches.currentY;
                        currentTranslate = startTranslate;
                        s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
                        return;
                    }
                }
                else {
                    currentTranslate = startTranslate;
                    return;
                }
            }
        
            if (!s.params.followFinger) return;
        
            // Update active index in free mode
            if (s.params.freeMode || s.params.watchSlidesProgress) {
                s.updateActiveIndex();
            }
            if (s.params.freeMode) {
                //Velocity
                if (velocities.length === 0) {
                    velocities.push({
                        position: s.touches[s.isHorizontal() ? 'startX' : 'startY'],
                        time: touchStartTime
                    });
                }
                velocities.push({
                    position: s.touches[s.isHorizontal() ? 'currentX' : 'currentY'],
                    time: (new window.Date()).getTime()
                });
            }
            // Update progress
            s.updateProgress(currentTranslate);
            // Update translate
            s.setWrapperTranslate(currentTranslate);
        };
        s.onTouchEnd = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            if (allowTouchCallbacks) {
                s.emit('onTouchEnd', s, e);
            }
            allowTouchCallbacks = false;
            if (!isTouched) return;
            //Return Grab Cursor
            if (s.params.grabCursor && isMoved && isTouched  && (s.params.allowSwipeToNext === true || s.params.allowSwipeToPrev === true)) {
                s.setGrabCursor(false);
            }
        
            // Time diff
            var touchEndTime = Date.now();
            var timeDiff = touchEndTime - touchStartTime;
        
            // Tap, doubleTap, Click
            if (s.allowClick) {
                s.updateClickedSlide(e);
                s.emit('onTap', s, e);
                if (timeDiff < 300 && (touchEndTime - lastClickTime) > 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    clickTimeout = setTimeout(function () {
                        if (!s) return;
                        if (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass)) {
                            s.paginationContainer.toggleClass(s.params.paginationHiddenClass);
                        }
                        s.emit('onClick', s, e);
                    }, 300);
        
                }
                if (timeDiff < 300 && (touchEndTime - lastClickTime) < 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    s.emit('onDoubleTap', s, e);
                }
            }
        
            lastClickTime = Date.now();
            setTimeout(function () {
                if (s) s.allowClick = true;
            }, 0);
        
            if (!isTouched || !isMoved || !s.swipeDirection || s.touches.diff === 0 || currentTranslate === startTranslate) {
                isTouched = isMoved = false;
                return;
            }
            isTouched = isMoved = false;
        
            var currentPos;
            if (s.params.followFinger) {
                currentPos = s.rtl ? s.translate : -s.translate;
            }
            else {
                currentPos = -currentTranslate;
            }
            if (s.params.freeMode) {
                if (currentPos < -s.minTranslate()) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                else if (currentPos > -s.maxTranslate()) {
                    if (s.slides.length < s.snapGrid.length) {
                        s.slideTo(s.snapGrid.length - 1);
                    }
                    else {
                        s.slideTo(s.slides.length - 1);
                    }
                    return;
                }
        
                if (s.params.freeModeMomentum) {
                    if (velocities.length > 1) {
                        var lastMoveEvent = velocities.pop(), velocityEvent = velocities.pop();
        
                        var distance = lastMoveEvent.position - velocityEvent.position;
                        var time = lastMoveEvent.time - velocityEvent.time;
                        s.velocity = distance / time;
                        s.velocity = s.velocity / 2;
                        if (Math.abs(s.velocity) < s.params.freeModeMinimumVelocity) {
                            s.velocity = 0;
                        }
                        // this implies that the user stopped moving a finger then released.
                        // There would be no events with distance zero, so the last event is stale.
                        if (time > 150 || (new window.Date().getTime() - lastMoveEvent.time) > 300) {
                            s.velocity = 0;
                        }
                    } else {
                        s.velocity = 0;
                    }
                    s.velocity = s.velocity * s.params.freeModeMomentumVelocityRatio;
        
                    velocities.length = 0;
                    var momentumDuration = 1000 * s.params.freeModeMomentumRatio;
                    var momentumDistance = s.velocity * momentumDuration;
        
                    var newPosition = s.translate + momentumDistance;
                    if (s.rtl) newPosition = - newPosition;
                    var doBounce = false;
                    var afterBouncePosition;
                    var bounceAmount = Math.abs(s.velocity) * 20 * s.params.freeModeMomentumBounceRatio;
                    if (newPosition < s.maxTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition + s.maxTranslate() < -bounceAmount) {
                                newPosition = s.maxTranslate() - bounceAmount;
                            }
                            afterBouncePosition = s.maxTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        }
                        else {
                            newPosition = s.maxTranslate();
                        }
                    }
                    else if (newPosition > s.minTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition - s.minTranslate() > bounceAmount) {
                                newPosition = s.minTranslate() + bounceAmount;
                            }
                            afterBouncePosition = s.minTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        }
                        else {
                            newPosition = s.minTranslate();
                        }
                    }
                    else if (s.params.freeModeSticky) {
                        var j = 0,
                            nextSlide;
                        for (j = 0; j < s.snapGrid.length; j += 1) {
                            if (s.snapGrid[j] > -newPosition) {
                                nextSlide = j;
                                break;
                            }
        
                        }
                        if (Math.abs(s.snapGrid[nextSlide] - newPosition) < Math.abs(s.snapGrid[nextSlide - 1] - newPosition) || s.swipeDirection === 'next') {
                            newPosition = s.snapGrid[nextSlide];
                        } else {
                            newPosition = s.snapGrid[nextSlide - 1];
                        }
                        if (!s.rtl) newPosition = - newPosition;
                    }
                    //Fix duration
                    if (s.velocity !== 0) {
                        if (s.rtl) {
                            momentumDuration = Math.abs((-newPosition - s.translate) / s.velocity);
                        }
                        else {
                            momentumDuration = Math.abs((newPosition - s.translate) / s.velocity);
                        }
                    }
                    else if (s.params.freeModeSticky) {
                        s.slideReset();
                        return;
                    }
        
                    if (s.params.freeModeMomentumBounce && doBounce) {
                        s.updateProgress(afterBouncePosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        s.animating = true;
                        s.wrapper.transitionEnd(function () {
                            if (!s || !allowMomentumBounce) return;
                            s.emit('onMomentumBounce', s);
        
                            s.setWrapperTransition(s.params.speed);
                            s.setWrapperTranslate(afterBouncePosition);
                            s.wrapper.transitionEnd(function () {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        });
                    } else if (s.velocity) {
                        s.updateProgress(newPosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        if (!s.animating) {
                            s.animating = true;
                            s.wrapper.transitionEnd(function () {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        }
        
                    } else {
                        s.updateProgress(newPosition);
                    }
        
                    s.updateActiveIndex();
                }
                if (!s.params.freeModeMomentum || timeDiff >= s.params.longSwipesMs) {
                    s.updateProgress();
                    s.updateActiveIndex();
                }
                return;
            }
        
            // Find current slide
            var i, stopIndex = 0, groupSize = s.slidesSizesGrid[0];
            for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup) {
                if (typeof s.slidesGrid[i + s.params.slidesPerGroup] !== 'undefined') {
                    if (currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i];
                    }
                }
                else {
                    if (currentPos >= s.slidesGrid[i]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2];
                    }
                }
            }
        
            // Find current slide size
            var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;
        
            if (timeDiff > s.params.longSwipesMs) {
                // Long touches
                if (!s.params.longSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    if (ratio >= s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);
                    else s.slideTo(stopIndex);
        
                }
                if (s.swipeDirection === 'prev') {
                    if (ratio > (1 - s.params.longSwipesRatio)) s.slideTo(stopIndex + s.params.slidesPerGroup);
                    else s.slideTo(stopIndex);
                }
            }
            else {
                // Short swipes
                if (!s.params.shortSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    s.slideTo(stopIndex + s.params.slidesPerGroup);
        
                }
                if (s.swipeDirection === 'prev') {
                    s.slideTo(stopIndex);
                }
            }
        };
        /*=========================
          Transitions
          ===========================*/
        s._slideTo = function (slideIndex, speed) {
            return s.slideTo(slideIndex, speed, true, true);
        };
        s.slideTo = function (slideIndex, speed, runCallbacks, internal) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (typeof slideIndex === 'undefined') slideIndex = 0;
            if (slideIndex < 0) slideIndex = 0;
            s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
            if (s.snapIndex >= s.snapGrid.length) s.snapIndex = s.snapGrid.length - 1;
        
            var translate = - s.snapGrid[s.snapIndex];
            // Stop autoplay
            if (s.params.autoplay && s.autoplaying) {
                if (internal || !s.params.autoplayDisableOnInteraction) {
                    s.pauseAutoplay(speed);
                }
                else {
                    s.stopAutoplay();
                }
            }
            // Update progress
            s.updateProgress(translate);
        
            // Normalize slideIndex
            if(s.params.normalizeSlideIndex){
                for (var i = 0; i < s.slidesGrid.length; i++) {
                    if (- Math.floor(translate * 100) >= Math.floor(s.slidesGrid[i] * 100)) {
                        slideIndex = i;
                    }
                }
            }
        
            // Directions locks
            if (!s.params.allowSwipeToNext && translate < s.translate && translate < s.minTranslate()) {
                return false;
            }
            if (!s.params.allowSwipeToPrev && translate > s.translate && translate > s.maxTranslate()) {
                if ((s.activeIndex || 0) !== slideIndex ) return false;
            }
        
            // Update Index
            if (typeof speed === 'undefined') speed = s.params.speed;
            s.previousIndex = s.activeIndex || 0;
            s.activeIndex = slideIndex;
            s.updateRealIndex();
            if ((s.rtl && -translate === s.translate) || (!s.rtl && translate === s.translate)) {
                // Update Height
                if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
                s.updateClasses();
                if (s.params.effect !== 'slide') {
                    s.setWrapperTranslate(translate);
                }
                return false;
            }
            s.updateClasses();
            s.onTransitionStart(runCallbacks);
        
            if (speed === 0 || s.browser.lteIE9) {
                s.setWrapperTranslate(translate);
                s.setWrapperTransition(0);
                s.onTransitionEnd(runCallbacks);
            }
            else {
                s.setWrapperTranslate(translate);
                s.setWrapperTransition(speed);
                if (!s.animating) {
                    s.animating = true;
                    s.wrapper.transitionEnd(function () {
                        if (!s) return;
                        s.onTransitionEnd(runCallbacks);
                    });
                }
        
            }
        
            return true;
        };
        
        s.onTransitionStart = function (runCallbacks) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.params.autoHeight) {
                s.updateAutoHeight();
            }
            if (s.lazy) s.lazy.onTransitionStart();
            if (runCallbacks) {
                s.emit('onTransitionStart', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeStart', s);
                    if (s.activeIndex > s.previousIndex) {
                        s.emit('onSlideNextStart', s);
                    }
                    else {
                        s.emit('onSlidePrevStart', s);
                    }
                }
        
            }
        };
        s.onTransitionEnd = function (runCallbacks) {
            s.animating = false;
            s.setWrapperTransition(0);
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.lazy) s.lazy.onTransitionEnd();
            if (runCallbacks) {
                s.emit('onTransitionEnd', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeEnd', s);
                    if (s.activeIndex > s.previousIndex) {
                        s.emit('onSlideNextEnd', s);
                    }
                    else {
                        s.emit('onSlidePrevEnd', s);
                    }
                }
            }
            if (s.params.history && s.history) {
                s.history.setHistory(s.params.history, s.activeIndex);
            }
            if (s.params.hashnav && s.hashnav) {
                s.hashnav.setHash();
            }
        
        };
        s.slideNext = function (runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
            }
            else return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
        };
        s._slideNext = function (speed) {
            return s.slideNext(true, speed, true);
        };
        s.slidePrev = function (runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
            }
            else return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
        };
        s._slidePrev = function (speed) {
            return s.slidePrev(true, speed, true);
        };
        s.slideReset = function (runCallbacks, speed, internal) {
            return s.slideTo(s.activeIndex, speed, runCallbacks);
        };
        
        s.disableTouchControl = function () {
            s.params.onlyExternal = true;
            return true;
        };
        s.enableTouchControl = function () {
            s.params.onlyExternal = false;
            return true;
        };
        
        /*=========================
          Translate/transition helpers
          ===========================*/
        s.setWrapperTransition = function (duration, byController) {
            s.wrapper.transition(duration);
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTransition(duration);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTransition(duration);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTransition(duration);
            }
            if (s.params.control && s.controller) {
                s.controller.setTransition(duration, byController);
            }
            s.emit('onSetTransition', s, duration);
        };
        s.setWrapperTranslate = function (translate, updateActiveIndex, byController) {
            var x = 0, y = 0, z = 0;
            if (s.isHorizontal()) {
                x = s.rtl ? -translate : translate;
            }
            else {
                y = translate;
            }
        
            if (s.params.roundLengths) {
                x = round(x);
                y = round(y);
            }
        
            if (!s.params.virtualTranslate) {
                if (s.support.transforms3d) s.wrapper.transform('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
                else s.wrapper.transform('translate(' + x + 'px, ' + y + 'px)');
            }
        
            s.translate = s.isHorizontal() ? x : y;
        
            // Check if we need to update progress
            var progress;
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            if (translatesDiff === 0) {
                progress = 0;
            }
            else {
                progress = (translate - s.minTranslate()) / (translatesDiff);
            }
            if (progress !== s.progress) {
                s.updateProgress(translate);
            }
        
            if (updateActiveIndex) s.updateActiveIndex();
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTranslate(s.translate);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTranslate(s.translate);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTranslate(s.translate);
            }
            if (s.params.control && s.controller) {
                s.controller.setTranslate(s.translate, byController);
            }
            s.emit('onSetTranslate', s, s.translate);
        };
        
        s.getTranslate = function (el, axis) {
            var matrix, curTransform, curStyle, transformMatrix;
        
            // automatic axis detection
            if (typeof axis === 'undefined') {
                axis = 'x';
            }
        
            if (s.params.virtualTranslate) {
                return s.rtl ? -s.translate : s.translate;
            }
        
            curStyle = window.getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(',').length > 6) {
                    curTransform = curTransform.split(', ').map(function(a){
                        return a.replace(',','.');
                    }).join(', ');
                }
                // Some old versions of Webkit choke when 'none' is passed; pass
                // empty string instead in this case
                transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
            }
            else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',');
            }
        
            if (axis === 'x') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m41;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[12]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[4]);
            }
            if (axis === 'y') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m42;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[13]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[5]);
            }
            if (s.rtl && curTransform) curTransform = -curTransform;
            return curTransform || 0;
        };
        s.getWrapperTranslate = function (axis) {
            if (typeof axis === 'undefined') {
                axis = s.isHorizontal() ? 'x' : 'y';
            }
            return s.getTranslate(s.wrapper[0], axis);
        };
        
        /*=========================
          Observer
          ===========================*/
        s.observers = [];
        function initObserver(target, options) {
            options = options || {};
            // create an observer instance
            var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            var observer = new ObserverFunc(function (mutations) {
                mutations.forEach(function (mutation) {
                    s.onResize(true);
                    s.emit('onObserverUpdate', s, mutation);
                });
            });
        
            observer.observe(target, {
                attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
                childList: typeof options.childList === 'undefined' ? true : options.childList,
                characterData: typeof options.characterData === 'undefined' ? true : options.characterData
            });
        
            s.observers.push(observer);
        }
        s.initObservers = function () {
            if (s.params.observeParents) {
                var containerParents = s.container.parents();
                for (var i = 0; i < containerParents.length; i++) {
                    initObserver(containerParents[i]);
                }
            }
        
            // Observe container
            initObserver(s.container[0], {childList: false});
        
            // Observe wrapper
            initObserver(s.wrapper[0], {attributes: false});
        };
        s.disconnectObservers = function () {
            for (var i = 0; i < s.observers.length; i++) {
                s.observers[i].disconnect();
            }
            s.observers = [];
        };
        /*=========================
          Loop
          ===========================*/
        // Create looped slides
        s.createLoop = function () {
            // Remove duplicated slides
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
        
            var slides = s.wrapper.children('.' + s.params.slideClass);
        
            if(s.params.slidesPerView === 'auto' && !s.params.loopedSlides) s.params.loopedSlides = slides.length;
        
            s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10);
            s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides;
            if (s.loopedSlides > slides.length) {
                s.loopedSlides = slides.length;
            }
        
            var prependSlides = [], appendSlides = [], i;
            slides.each(function (index, el) {
                var slide = $(this);
                if (index < s.loopedSlides) appendSlides.push(el);
                if (index < slides.length && index >= slides.length - s.loopedSlides) prependSlides.push(el);
                slide.attr('data-swiper-slide-index', index);
            });
            for (i = 0; i < appendSlides.length; i++) {
                s.wrapper.append($(appendSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
            for (i = prependSlides.length - 1; i >= 0; i--) {
                s.wrapper.prepend($(prependSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
        };
        s.destroyLoop = function () {
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
            s.slides.removeAttr('data-swiper-slide-index');
        };
        s.reLoop = function (updatePosition) {
            var oldIndex = s.activeIndex - s.loopedSlides;
            s.destroyLoop();
            s.createLoop();
            s.updateSlidesSize();
            if (updatePosition) {
                s.slideTo(oldIndex + s.loopedSlides, 0, false);
            }
        
        };
        s.fixLoop = function () {
            var newIndex;
            //Fix For Negative Oversliding
            if (s.activeIndex < s.loopedSlides) {
                newIndex = s.slides.length - s.loopedSlides * 3 + s.activeIndex;
                newIndex = newIndex + s.loopedSlides;
                s.slideTo(newIndex, 0, false, true);
            }
            //Fix For Positive Oversliding
            else if ((s.params.slidesPerView === 'auto' && s.activeIndex >= s.loopedSlides * 2) || (s.activeIndex > s.slides.length - s.params.slidesPerView * 2)) {
                newIndex = -s.slides.length + s.activeIndex + s.loopedSlides;
                newIndex = newIndex + s.loopedSlides;
                s.slideTo(newIndex, 0, false, true);
            }
        };
        /*=========================
          Append/Prepend/Remove Slides
          ===========================*/
        s.appendSlide = function (slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            if (typeof slides === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.append(slides[i]);
                }
            }
            else {
                s.wrapper.append(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
        };
        s.prependSlide = function (slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            var newActiveIndex = s.activeIndex + 1;
            if (typeof slides === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.prepend(slides[i]);
                }
                newActiveIndex = s.activeIndex + slides.length;
            }
            else {
                s.wrapper.prepend(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            s.slideTo(newActiveIndex, 0, false);
        };
        s.removeSlide = function (slidesIndexes) {
            if (s.params.loop) {
                s.destroyLoop();
                s.slides = s.wrapper.children('.' + s.params.slideClass);
            }
            var newActiveIndex = s.activeIndex,
                indexToRemove;
            if (typeof slidesIndexes === 'object' && slidesIndexes.length) {
                for (var i = 0; i < slidesIndexes.length; i++) {
                    indexToRemove = slidesIndexes[i];
                    if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                    if (indexToRemove < newActiveIndex) newActiveIndex--;
                }
                newActiveIndex = Math.max(newActiveIndex, 0);
            }
            else {
                indexToRemove = slidesIndexes;
                if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                if (indexToRemove < newActiveIndex) newActiveIndex--;
                newActiveIndex = Math.max(newActiveIndex, 0);
            }
        
            if (s.params.loop) {
                s.createLoop();
            }
        
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            if (s.params.loop) {
                s.slideTo(newActiveIndex + s.loopedSlides, 0, false);
            }
            else {
                s.slideTo(newActiveIndex, 0, false);
            }
        
        };
        s.removeAllSlides = function () {
            var slidesIndexes = [];
            for (var i = 0; i < s.slides.length; i++) {
                slidesIndexes.push(i);
            }
            s.removeSlide(slidesIndexes);
        };
        

        /*=========================
          Effects
          ===========================*/
        s.effects = {
            fade: {
                setTranslate: function () {
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var offset = slide[0].swiperSlideOffset;
                        var tx = -offset;
                        if (!s.params.virtualTranslate) tx = tx - s.translate;
                        var ty = 0;
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                        }
                        var slideOpacity = s.params.fade.crossFade ?
                                Math.max(1 - Math.abs(slide[0].progress), 0) :
                                1 + Math.min(Math.max(slide[0].progress, -1), 0);
                        slide
                            .css({
                                opacity: slideOpacity
                            })
                            .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px)');
        
                    }
        
                },
                setTransition: function (duration) {
                    s.slides.transition(duration);
                    if (s.params.virtualTranslate && duration !== 0) {
                        var eventTriggered = false;
                        s.slides.transitionEnd(function () {
                            if (eventTriggered) return;
                            if (!s) return;
                            eventTriggered = true;
                            s.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                            for (var i = 0; i < triggerEvents.length; i++) {
                                s.wrapper.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            },
            flip: {
                setTranslate: function () {
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var progress = slide[0].progress;
                        if (s.params.flip.limitRotation) {
                            progress = Math.max(Math.min(slide[0].progress, 1), -1);
                        }
                        var offset = slide[0].swiperSlideOffset;
                        var rotate = -180 * progress,
                            rotateY = rotate,
                            rotateX = 0,
                            tx = -offset,
                            ty = 0;
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                            rotateX = -rotateY;
                            rotateY = 0;
                        }
                        else if (s.rtl) {
                            rotateY = -rotateY;
                        }
        
                        slide[0].style.zIndex = -Math.abs(Math.round(progress)) + s.slides.length;
        
                        if (s.params.flip.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
                            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
                        }
        
                        slide
                            .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
                    }
                },
                setTransition: function (duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    if (s.params.virtualTranslate && duration !== 0) {
                        var eventTriggered = false;
                        s.slides.eq(s.activeIndex).transitionEnd(function () {
                            if (eventTriggered) return;
                            if (!s) return;
                            if (!$(this).hasClass(s.params.slideActiveClass)) return;
                            eventTriggered = true;
                            s.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                            for (var i = 0; i < triggerEvents.length; i++) {
                                s.wrapper.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            },
            cube: {
                setTranslate: function () {
                    var wrapperRotate = 0, cubeShadow;
                    if (s.params.cube.shadow) {
                        if (s.isHorizontal()) {
                            cubeShadow = s.wrapper.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.wrapper.append(cubeShadow);
                            }
                            cubeShadow.css({height: s.width + 'px'});
                        }
                        else {
                            cubeShadow = s.container.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.container.append(cubeShadow);
                            }
                        }
                    }
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var slideAngle = i * 90;
                        var round = Math.floor(slideAngle / 360);
                        if (s.rtl) {
                            slideAngle = -slideAngle;
                            round = Math.floor(-slideAngle / 360);
                        }
                        var progress = Math.max(Math.min(slide[0].progress, 1), -1);
                        var tx = 0, ty = 0, tz = 0;
                        if (i % 4 === 0) {
                            tx = - round * 4 * s.size;
                            tz = 0;
                        }
                        else if ((i - 1) % 4 === 0) {
                            tx = 0;
                            tz = - round * 4 * s.size;
                        }
                        else if ((i - 2) % 4 === 0) {
                            tx = s.size + round * 4 * s.size;
                            tz = s.size;
                        }
                        else if ((i - 3) % 4 === 0) {
                            tx = - s.size;
                            tz = 3 * s.size + s.size * 4 * round;
                        }
                        if (s.rtl) {
                            tx = -tx;
                        }
        
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                        }
        
                        var transform = 'rotateX(' + (s.isHorizontal() ? 0 : -slideAngle) + 'deg) rotateY(' + (s.isHorizontal() ? slideAngle : 0) + 'deg) translate3d(' + tx + 'px, ' + ty + 'px, ' + tz + 'px)';
                        if (progress <= 1 && progress > -1) {
                            wrapperRotate = i * 90 + progress * 90;
                            if (s.rtl) wrapperRotate = -i * 90 - progress * 90;
                        }
                        slide.transform(transform);
                        if (s.params.cube.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
                            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
                        }
                    }
                    s.wrapper.css({
                        '-webkit-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        '-moz-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        '-ms-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        'transform-origin': '50% 50% -' + (s.size / 2) + 'px'
                    });
        
                    if (s.params.cube.shadow) {
                        if (s.isHorizontal()) {
                            cubeShadow.transform('translate3d(0px, ' + (s.width / 2 + s.params.cube.shadowOffset) + 'px, ' + (-s.width / 2) + 'px) rotateX(90deg) rotateZ(0deg) scale(' + (s.params.cube.shadowScale) + ')');
                        }
                        else {
                            var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
                            var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
                            var scale1 = s.params.cube.shadowScale,
                                scale2 = s.params.cube.shadowScale / multiplier,
                                offset = s.params.cube.shadowOffset;
                            cubeShadow.transform('scale3d(' + scale1 + ', 1, ' + scale2 + ') translate3d(0px, ' + (s.height / 2 + offset) + 'px, ' + (-s.height / 2 / scale2) + 'px) rotateX(-90deg)');
                        }
                    }
                    var zFactor = (s.isSafari || s.isUiWebView) ? (-s.size / 2) : 0;
                    s.wrapper.transform('translate3d(0px,0,' + zFactor + 'px) rotateX(' + (s.isHorizontal() ? 0 : wrapperRotate) + 'deg) rotateY(' + (s.isHorizontal() ? -wrapperRotate : 0) + 'deg)');
                },
                setTransition: function (duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    if (s.params.cube.shadow && !s.isHorizontal()) {
                        s.container.find('.swiper-cube-shadow').transition(duration);
                    }
                }
            },
            coverflow: {
                setTranslate: function () {
                    var transform = s.translate;
                    var center = s.isHorizontal() ? -transform + s.width / 2 : -transform + s.height / 2;
                    var rotate = s.isHorizontal() ? s.params.coverflow.rotate: -s.params.coverflow.rotate;
                    var translate = s.params.coverflow.depth;
                    //Each slide offset from center
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideSize = s.slidesSizesGrid[i];
                        var slideOffset = slide[0].swiperSlideOffset;
                        var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * s.params.coverflow.modifier;
        
                        var rotateY = s.isHorizontal() ? rotate * offsetMultiplier : 0;
                        var rotateX = s.isHorizontal() ? 0 : rotate * offsetMultiplier;
                        // var rotateZ = 0
                        var translateZ = -translate * Math.abs(offsetMultiplier);
        
                        var translateY = s.isHorizontal() ? 0 : s.params.coverflow.stretch * (offsetMultiplier);
                        var translateX = s.isHorizontal() ? s.params.coverflow.stretch * (offsetMultiplier) : 0;
        
                        //Fix for ultra small values
                        if (Math.abs(translateX) < 0.001) translateX = 0;
                        if (Math.abs(translateY) < 0.001) translateY = 0;
                        if (Math.abs(translateZ) < 0.001) translateZ = 0;
                        if (Math.abs(rotateY) < 0.001) rotateY = 0;
                        if (Math.abs(rotateX) < 0.001) rotateX = 0;
        
                        var slideTransform = 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)  rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
        
                        slide.transform(slideTransform);
                        slide[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
                        if (s.params.coverflow.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
                            if (shadowAfter.length) shadowAfter[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
                        }
                    }
        
                    //Set correct perspective for IE10
                    if (s.browser.ie) {
                        var ws = s.wrapper[0].style;
                        ws.perspectiveOrigin = center + 'px 50%';
                    }
                },
                setTransition: function (duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                }
            }
        };
        

        /*=========================
          Images Lazy Loading
          ===========================*/
        s.lazy = {
            initialImageLoaded: false,
            loadImageInSlide: function (index, loadInDuplicate) {
                if (typeof index === 'undefined') return;
                if (typeof loadInDuplicate === 'undefined') loadInDuplicate = true;
                if (s.slides.length === 0) return;
        
                var slide = s.slides.eq(index);
                var img = slide.find('.' + s.params.lazyLoadingClass + ':not(.' + s.params.lazyStatusLoadedClass + '):not(.' + s.params.lazyStatusLoadingClass + ')');
                if (slide.hasClass(s.params.lazyLoadingClass) && !slide.hasClass(s.params.lazyStatusLoadedClass) && !slide.hasClass(s.params.lazyStatusLoadingClass)) {
                    img = img.add(slide[0]);
                }
                if (img.length === 0) return;
        
                img.each(function () {
                    var _img = $(this);
                    _img.addClass(s.params.lazyStatusLoadingClass);
                    var background = _img.attr('data-background');
                    var src = _img.attr('data-src'),
                        srcset = _img.attr('data-srcset'),
                        sizes = _img.attr('data-sizes');
                    s.loadImage(_img[0], (src || background), srcset, sizes, false, function () {
                        if (typeof s === 'undefined' || s === null || !s) return;
                        if (background) {
                            _img.css('background-image', 'url("' + background + '")');
                            _img.removeAttr('data-background');
                        }
                        else {
                            if (srcset) {
                                _img.attr('srcset', srcset);
                                _img.removeAttr('data-srcset');
                            }
                            if (sizes) {
                                _img.attr('sizes', sizes);
                                _img.removeAttr('data-sizes');
                            }
                            if (src) {
                                _img.attr('src', src);
                                _img.removeAttr('data-src');
                            }
        
                        }
        
                        _img.addClass(s.params.lazyStatusLoadedClass).removeClass(s.params.lazyStatusLoadingClass);
                        slide.find('.' + s.params.lazyPreloaderClass + ', .' + s.params.preloaderClass).remove();
                        if (s.params.loop && loadInDuplicate) {
                            var slideOriginalIndex = slide.attr('data-swiper-slide-index');
                            if (slide.hasClass(s.params.slideDuplicateClass)) {
                                var originalSlide = s.wrapper.children('[data-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + s.params.slideDuplicateClass + ')');
                                s.lazy.loadImageInSlide(originalSlide.index(), false);
                            }
                            else {
                                var duplicatedSlide = s.wrapper.children('.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + slideOriginalIndex + '"]');
                                s.lazy.loadImageInSlide(duplicatedSlide.index(), false);
                            }
                        }
                        s.emit('onLazyImageReady', s, slide[0], _img[0]);
                    });
        
                    s.emit('onLazyImageLoad', s, slide[0], _img[0]);
                });
        
            },
            load: function () {
                var i;
                var slidesPerView = s.params.slidesPerView;
                if (slidesPerView === 'auto') {
                    slidesPerView = 0;
                }
                if (!s.lazy.initialImageLoaded) s.lazy.initialImageLoaded = true;
                if (s.params.watchSlidesVisibility) {
                    s.wrapper.children('.' + s.params.slideVisibleClass).each(function () {
                        s.lazy.loadImageInSlide($(this).index());
                    });
                }
                else {
                    if (slidesPerView > 1) {
                        for (i = s.activeIndex; i < s.activeIndex + slidesPerView ; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    }
                    else {
                        s.lazy.loadImageInSlide(s.activeIndex);
                    }
                }
                if (s.params.lazyLoadingInPrevNext) {
                    if (slidesPerView > 1 || (s.params.lazyLoadingInPrevNextAmount && s.params.lazyLoadingInPrevNextAmount > 1)) {
                        var amount = s.params.lazyLoadingInPrevNextAmount;
                        var spv = slidesPerView;
                        var maxIndex = Math.min(s.activeIndex + spv + Math.max(amount, spv), s.slides.length);
                        var minIndex = Math.max(s.activeIndex - Math.max(spv, amount), 0);
                        // Next Slides
                        for (i = s.activeIndex + slidesPerView; i < maxIndex; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                        // Prev Slides
                        for (i = minIndex; i < s.activeIndex ; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    }
                    else {
                        var nextSlide = s.wrapper.children('.' + s.params.slideNextClass);
                        if (nextSlide.length > 0) s.lazy.loadImageInSlide(nextSlide.index());
        
                        var prevSlide = s.wrapper.children('.' + s.params.slidePrevClass);
                        if (prevSlide.length > 0) s.lazy.loadImageInSlide(prevSlide.index());
                    }
                }
            },
            onTransitionStart: function () {
                if (s.params.lazyLoading) {
                    if (s.params.lazyLoadingOnTransitionStart || (!s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded)) {
                        s.lazy.load();
                    }
                }
            },
            onTransitionEnd: function () {
                if (s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart) {
                    s.lazy.load();
                }
            }
        };
        

        /*=========================
          Scrollbar
          ===========================*/
        s.scrollbar = {
            isTouched: false,
            setDragPosition: function (e) {
                var sb = s.scrollbar;
                var x = 0, y = 0;
                var translate;
                var pointerPosition = s.isHorizontal() ?
                    ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX) :
                    ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY) ;
                var position = (pointerPosition) - sb.track.offset()[s.isHorizontal() ? 'left' : 'top'] - sb.dragSize / 2;
                var positionMin = -s.minTranslate() * sb.moveDivider;
                var positionMax = -s.maxTranslate() * sb.moveDivider;
                if (position < positionMin) {
                    position = positionMin;
                }
                else if (position > positionMax) {
                    position = positionMax;
                }
                position = -position / sb.moveDivider;
                s.updateProgress(position);
                s.setWrapperTranslate(position, true);
            },
            dragStart: function (e) {
                var sb = s.scrollbar;
                sb.isTouched = true;
                e.preventDefault();
                e.stopPropagation();
        
                sb.setDragPosition(e);
                clearTimeout(sb.dragTimeout);
        
                sb.track.transition(0);
                if (s.params.scrollbarHide) {
                    sb.track.css('opacity', 1);
                }
                s.wrapper.transition(100);
                sb.drag.transition(100);
                s.emit('onScrollbarDragStart', s);
            },
            dragMove: function (e) {
                var sb = s.scrollbar;
                if (!sb.isTouched) return;
                if (e.preventDefault) e.preventDefault();
                else e.returnValue = false;
                sb.setDragPosition(e);
                s.wrapper.transition(0);
                sb.track.transition(0);
                sb.drag.transition(0);
                s.emit('onScrollbarDragMove', s);
            },
            dragEnd: function (e) {
                var sb = s.scrollbar;
                if (!sb.isTouched) return;
                sb.isTouched = false;
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.dragTimeout);
                    sb.dragTimeout = setTimeout(function () {
                        sb.track.css('opacity', 0);
                        sb.track.transition(400);
                    }, 1000);
        
                }
                s.emit('onScrollbarDragEnd', s);
                if (s.params.scrollbarSnapOnRelease) {
                    s.slideReset();
                }
            },
            draggableEvents: (function () {
                if ((s.params.simulateTouch === false && !s.support.touch)) return s.touchEventsDesktop;
                else return s.touchEvents;
            })(),
            enableDraggable: function () {
                var sb = s.scrollbar;
                var target = s.support.touch ? sb.track : document;
                $(sb.track).on(sb.draggableEvents.start, sb.dragStart);
                $(target).on(sb.draggableEvents.move, sb.dragMove);
                $(target).on(sb.draggableEvents.end, sb.dragEnd);
            },
            disableDraggable: function () {
                var sb = s.scrollbar;
                var target = s.support.touch ? sb.track : document;
                $(sb.track).off(sb.draggableEvents.start, sb.dragStart);
                $(target).off(sb.draggableEvents.move, sb.dragMove);
                $(target).off(sb.draggableEvents.end, sb.dragEnd);
            },
            set: function () {
                if (!s.params.scrollbar) return;
                var sb = s.scrollbar;
                sb.track = $(s.params.scrollbar);
                if (s.params.uniqueNavElements && typeof s.params.scrollbar === 'string' && sb.track.length > 1 && s.container.find(s.params.scrollbar).length === 1) {
                    sb.track = s.container.find(s.params.scrollbar);
                }
                sb.drag = sb.track.find('.swiper-scrollbar-drag');
                if (sb.drag.length === 0) {
                    sb.drag = $('<div class="swiper-scrollbar-drag"></div>');
                    sb.track.append(sb.drag);
                }
                sb.drag[0].style.width = '';
                sb.drag[0].style.height = '';
                sb.trackSize = s.isHorizontal() ? sb.track[0].offsetWidth : sb.track[0].offsetHeight;
        
                sb.divider = s.size / s.virtualSize;
                sb.moveDivider = sb.divider * (sb.trackSize / s.size);
                sb.dragSize = sb.trackSize * sb.divider;
        
                if (s.isHorizontal()) {
                    sb.drag[0].style.width = sb.dragSize + 'px';
                }
                else {
                    sb.drag[0].style.height = sb.dragSize + 'px';
                }
        
                if (sb.divider >= 1) {
                    sb.track[0].style.display = 'none';
                }
                else {
                    sb.track[0].style.display = '';
                }
                if (s.params.scrollbarHide) {
                    sb.track[0].style.opacity = 0;
                }
            },
            setTranslate: function () {
                if (!s.params.scrollbar) return;
                var diff;
                var sb = s.scrollbar;
                var translate = s.translate || 0;
                var newPos;
        
                var newSize = sb.dragSize;
                newPos = (sb.trackSize - sb.dragSize) * s.progress;
                if (s.rtl && s.isHorizontal()) {
                    newPos = -newPos;
                    if (newPos > 0) {
                        newSize = sb.dragSize - newPos;
                        newPos = 0;
                    }
                    else if (-newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize + newPos;
                    }
                }
                else {
                    if (newPos < 0) {
                        newSize = sb.dragSize + newPos;
                        newPos = 0;
                    }
                    else if (newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize - newPos;
                    }
                }
                if (s.isHorizontal()) {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(' + (newPos) + 'px, 0, 0)');
                    }
                    else {
                        sb.drag.transform('translateX(' + (newPos) + 'px)');
                    }
                    sb.drag[0].style.width = newSize + 'px';
                }
                else {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(0px, ' + (newPos) + 'px, 0)');
                    }
                    else {
                        sb.drag.transform('translateY(' + (newPos) + 'px)');
                    }
                    sb.drag[0].style.height = newSize + 'px';
                }
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.timeout);
                    sb.track[0].style.opacity = 1;
                    sb.timeout = setTimeout(function () {
                        sb.track[0].style.opacity = 0;
                        sb.track.transition(400);
                    }, 1000);
                }
            },
            setTransition: function (duration) {
                if (!s.params.scrollbar) return;
                s.scrollbar.drag.transition(duration);
            }
        };
        

        /*=========================
          Controller
          ===========================*/
        s.controller = {
            LinearSpline: function (x, y) {
                var binarySearch = (function() {
                    var maxIndex, minIndex, guess;
                    return function(array, val) {
                        minIndex = -1;
                        maxIndex = array.length;
                        while (maxIndex - minIndex > 1)
                            if (array[guess = maxIndex + minIndex >> 1] <= val) {
                                minIndex = guess;
                            } else {
                                maxIndex = guess;
                            }
                        return maxIndex;
                    };
                })();
                this.x = x;
                this.y = y;
                this.lastIndex = x.length - 1;
                // Given an x value (x2), return the expected y2 value:
                // (x1,y1) is the known point before given value,
                // (x3,y3) is the known point after given value.
                var i1, i3;
                var l = this.x.length;
        
                this.interpolate = function (x2) {
                    if (!x2) return 0;
        
                    // Get the indexes of x1 and x3 (the array indexes before and after given x2):
                    i3 = binarySearch(this.x, x2);
                    i1 = i3 - 1;
        
                    // We have our indexes i1 & i3, so we can calculate already:
                    // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
                    return ((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1]) + this.y[i1];
                };
            },
            //xxx: for now i will just save one spline function to to
            getInterpolateFunction: function(c){
                if(!s.controller.spline) s.controller.spline = s.params.loop ?
                    new s.controller.LinearSpline(s.slidesGrid, c.slidesGrid) :
                    new s.controller.LinearSpline(s.snapGrid, c.snapGrid);
            },
            setTranslate: function (translate, byController) {
               var controlled = s.params.control;
               var multiplier, controlledTranslate;
               function setControlledTranslate(c) {
                    // this will create an Interpolate function based on the snapGrids
                    // x is the Grid of the scrolled scroller and y will be the controlled scroller
                    // it makes sense to create this only once and recall it for the interpolation
                    // the function does a lot of value caching for performance
                    translate = c.rtl && c.params.direction === 'horizontal' ? -s.translate : s.translate;
                    if (s.params.controlBy === 'slide') {
                        s.controller.getInterpolateFunction(c);
                        // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
                        // but it did not work out
                        controlledTranslate = -s.controller.spline.interpolate(-translate);
                    }
        
                    if(!controlledTranslate || s.params.controlBy === 'container'){
                        multiplier = (c.maxTranslate() - c.minTranslate()) / (s.maxTranslate() - s.minTranslate());
                        controlledTranslate = (translate - s.minTranslate()) * multiplier + c.minTranslate();
                    }
        
                    if (s.params.controlInverse) {
                        controlledTranslate = c.maxTranslate() - controlledTranslate;
                    }
                    c.updateProgress(controlledTranslate);
                    c.setWrapperTranslate(controlledTranslate, false, s);
                    c.updateActiveIndex();
               }
               if (Array.isArray(controlled)) {
                   for (var i = 0; i < controlled.length; i++) {
                       if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                           setControlledTranslate(controlled[i]);
                       }
                   }
               }
               else if (controlled instanceof Swiper && byController !== controlled) {
        
                   setControlledTranslate(controlled);
               }
            },
            setTransition: function (duration, byController) {
                var controlled = s.params.control;
                var i;
                function setControlledTransition(c) {
                    c.setWrapperTransition(duration, s);
                    if (duration !== 0) {
                        c.onTransitionStart();
                        c.wrapper.transitionEnd(function(){
                            if (!controlled) return;
                            if (c.params.loop && s.params.controlBy === 'slide') {
                                c.fixLoop();
                            }
                            c.onTransitionEnd();
        
                        });
                    }
                }
                if (Array.isArray(controlled)) {
                    for (i = 0; i < controlled.length; i++) {
                        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                            setControlledTransition(controlled[i]);
                        }
                    }
                }
                else if (controlled instanceof Swiper && byController !== controlled) {
                    setControlledTransition(controlled);
                }
            }
        };
        

        /*=========================
          Hash Navigation
          ===========================*/
        s.hashnav = {
            onHashCange: function (e, a) {
                var newHash = document.location.hash.replace('#', '');
                var activeSlideHash = s.slides.eq(s.activeIndex).attr('data-hash');
                if (newHash !== activeSlideHash) {
                    s.slideTo(s.wrapper.children('.' + s.params.slideClass + '[data-hash="' + (newHash) + '"]').index());
                }
            },
            attachEvents: function (detach) {
                var action = detach ? 'off' : 'on';
                $(window)[action]('hashchange', s.hashnav.onHashCange);
            },
            setHash: function () {
                if (!s.hashnav.initialized || !s.params.hashnav) return;
                if (s.params.replaceState && window.history && window.history.replaceState) {
                    window.history.replaceState(null, null, ('#' + s.slides.eq(s.activeIndex).attr('data-hash') || ''));
                } else {
                    var slide = s.slides.eq(s.activeIndex);
                    var hash = slide.attr('data-hash') || slide.attr('data-history');
                    document.location.hash = hash || '';
                }
            },
            init: function () {
                if (!s.params.hashnav || s.params.history) return;
                s.hashnav.initialized = true;
                var hash = document.location.hash.replace('#', '');
                if (hash) {
                    var speed = 0;
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideHash = slide.attr('data-hash') || slide.attr('data-history');
                        if (slideHash === hash && !slide.hasClass(s.params.slideDuplicateClass)) {
                            var index = slide.index();
                            s.slideTo(index, speed, s.params.runCallbacksOnInit, true);
                        }
                    }
                }
                if (s.params.hashnavWatchState) s.hashnav.attachEvents();
            },
            destroy: function () {
                if (s.params.hashnavWatchState) s.hashnav.attachEvents(true);
            }
        };
        

        /*=========================
          History Api with fallback to Hashnav
          ===========================*/
        s.history = {
            init: function () {
                if (!s.params.history) return;
                if (!window.history || !window.history.pushState) {
                    s.params.history = false;
                    s.params.hashnav = true;
                    return;
                }
                s.history.initialized = true;
                this.paths = this.getPathValues();
                if (!this.paths.key && !this.paths.value) return;
                this.scrollToSlide(0, this.paths.value, s.params.runCallbacksOnInit);
                if (!s.params.replaceState) {
                    window.addEventListener('popstate', this.setHistoryPopState);
                }
            },
            setHistoryPopState: function() {
                s.history.paths = s.history.getPathValues();
                s.history.scrollToSlide(s.params.speed, s.history.paths.value, false);
            },
            getPathValues: function() {
                var pathArray = window.location.pathname.slice(1).split('/');
                var total = pathArray.length;
                var key = pathArray[total - 2];
                var value = pathArray[total - 1];
                return { key: key, value: value };
            },
            setHistory: function (key, index) {
                if (!s.history.initialized || !s.params.history) return;
                var slide = s.slides.eq(index);
                var value = this.slugify(slide.attr('data-history'));
                if (!window.location.pathname.includes(key)) {
                    value = key + '/' + value;
                }
                if (s.params.replaceState) {
                    window.history.replaceState(null, null, value);
                } else {
                    window.history.pushState(null, null, value);
                }
            },
            slugify: function(text) {
                return text.toString().toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]+/g, '')
                    .replace(/\-\-+/g, '-')
                    .replace(/^-+/, '')
                    .replace(/-+$/, '');
            },
            scrollToSlide: function(speed, value, runCallbacks) {
                if (value) {
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideHistory = this.slugify(slide.attr('data-history'));
                        if (slideHistory === value && !slide.hasClass(s.params.slideDuplicateClass)) {
                            var index = slide.index();
                            s.slideTo(index, speed, runCallbacks);
                        }
                    }
                } else {
                    s.slideTo(0, speed, runCallbacks);
                }
            }
        };
        

        /*=========================
          Keyboard Control
          ===========================*/
        function handleKeyboard(e) {
            if (e.originalEvent) e = e.originalEvent; //jquery fix
            var kc = e.keyCode || e.charCode;
            // Directions locks
            if (!s.params.allowSwipeToNext && (s.isHorizontal() && kc === 39 || !s.isHorizontal() && kc === 40)) {
                return false;
            }
            if (!s.params.allowSwipeToPrev && (s.isHorizontal() && kc === 37 || !s.isHorizontal() && kc === 38)) {
                return false;
            }
            if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
                return;
            }
            if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
                return;
            }
            if (kc === 37 || kc === 39 || kc === 38 || kc === 40) {
                var inView = false;
                //Check that swiper should be inside of visible area of window
                if (s.container.parents('.' + s.params.slideClass).length > 0 && s.container.parents('.' + s.params.slideActiveClass).length === 0) {
                    return;
                }
                var windowScroll = {
                    left: window.pageXOffset,
                    top: window.pageYOffset
                };
                var windowWidth = window.innerWidth;
                var windowHeight = window.innerHeight;
                var swiperOffset = s.container.offset();
                if (s.rtl) swiperOffset.left = swiperOffset.left - s.container[0].scrollLeft;
                var swiperCoord = [
                    [swiperOffset.left, swiperOffset.top],
                    [swiperOffset.left + s.width, swiperOffset.top],
                    [swiperOffset.left, swiperOffset.top + s.height],
                    [swiperOffset.left + s.width, swiperOffset.top + s.height]
                ];
                for (var i = 0; i < swiperCoord.length; i++) {
                    var point = swiperCoord[i];
                    if (
                        point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth &&
                        point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight
                    ) {
                        inView = true;
                    }
        
                }
                if (!inView) return;
            }
            if (s.isHorizontal()) {
                if (kc === 37 || kc === 39) {
                    if (e.preventDefault) e.preventDefault();
                    else e.returnValue = false;
                }
                if ((kc === 39 && !s.rtl) || (kc === 37 && s.rtl)) s.slideNext();
                if ((kc === 37 && !s.rtl) || (kc === 39 && s.rtl)) s.slidePrev();
            }
            else {
                if (kc === 38 || kc === 40) {
                    if (e.preventDefault) e.preventDefault();
                    else e.returnValue = false;
                }
                if (kc === 40) s.slideNext();
                if (kc === 38) s.slidePrev();
            }
            s.emit('onKeyPress', s, kc);
        }
        s.disableKeyboardControl = function () {
            s.params.keyboardControl = false;
            $(document).off('keydown', handleKeyboard);
        };
        s.enableKeyboardControl = function () {
            s.params.keyboardControl = true;
            $(document).on('keydown', handleKeyboard);
        };
        

        /*=========================
          Mousewheel Control
          ===========================*/
        s.mousewheel = {
            event: false,
            lastScrollTime: (new window.Date()).getTime()
        };
        function isEventSupported() {
            var eventName = 'onwheel';
            var isSupported = eventName in document;
        
            if (!isSupported) {
                var element = document.createElement('div');
                element.setAttribute(eventName, 'return;');
                isSupported = typeof element[eventName] === 'function';
            }
        
            if (!isSupported &&
                document.implementation &&
                document.implementation.hasFeature &&
                    // always returns true in newer browsers as per the standard.
                    // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
                document.implementation.hasFeature('', '') !== true ) {
                // This is the only way to test support for the `wheel` event in IE9+.
                isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
            }
        
            return isSupported;
        }
        /**
         * Mouse wheel (and 2-finger trackpad) support on the web sucks.  It is
         * complicated, thus this doc is long and (hopefully) detailed enough to answer
         * your questions.
         *
         * If you need to react to the mouse wheel in a predictable way, this code is
         * like your bestest friend. * hugs *
         *
         * As of today, there are 4 DOM event types you can listen to:
         *
         *   'wheel'                -- Chrome(31+), FF(17+), IE(9+)
         *   'mousewheel'           -- Chrome, IE(6+), Opera, Safari
         *   'MozMousePixelScroll'  -- FF(3.5 only!) (2010-2013) -- don't bother!
         *   'DOMMouseScroll'       -- FF(0.9.7+) since 2003
         *
         * So what to do?  The is the best:
         *
         *   normalizeWheel.getEventType();
         *
         * In your event callback, use this code to get sane interpretation of the
         * deltas.  This code will return an object with properties:
         *
         *   spinX   -- normalized spin speed (use for zoom) - x plane
         *   spinY   -- " - y plane
         *   pixelX  -- normalized distance (to pixels) - x plane
         *   pixelY  -- " - y plane
         *
         * Wheel values are provided by the browser assuming you are using the wheel to
         * scroll a web page by a number of lines or pixels (or pages).  Values can vary
         * significantly on different platforms and browsers, forgetting that you can
         * scroll at different speeds.  Some devices (like trackpads) emit more events
         * at smaller increments with fine granularity, and some emit massive jumps with
         * linear speed or acceleration.
         *
         * This code does its best to normalize the deltas for you:
         *
         *   - spin is trying to normalize how far the wheel was spun (or trackpad
         *     dragged).  This is super useful for zoom support where you want to
         *     throw away the chunky scroll steps on the PC and make those equal to
         *     the slow and smooth tiny steps on the Mac. Key data: This code tries to
         *     resolve a single slow step on a wheel to 1.
         *
         *   - pixel is normalizing the desired scroll delta in pixel units.  You'll
         *     get the crazy differences between browsers, but at least it'll be in
         *     pixels!
         *
         *   - positive value indicates scrolling DOWN/RIGHT, negative UP/LEFT.  This
         *     should translate to positive value zooming IN, negative zooming OUT.
         *     This matches the newer 'wheel' event.
         *
         * Why are there spinX, spinY (or pixels)?
         *
         *   - spinX is a 2-finger side drag on the trackpad, and a shift + wheel turn
         *     with a mouse.  It results in side-scrolling in the browser by default.
         *
         *   - spinY is what you expect -- it's the classic axis of a mouse wheel.
         *
         *   - I dropped spinZ/pixelZ.  It is supported by the DOM 3 'wheel' event and
         *     probably is by browsers in conjunction with fancy 3D controllers .. but
         *     you know.
         *
         * Implementation info:
         *
         * Examples of 'wheel' event if you scroll slowly (down) by one step with an
         * average mouse:
         *
         *   OS X + Chrome  (mouse)     -    4   pixel delta  (wheelDelta -120)
         *   OS X + Safari  (mouse)     -  N/A   pixel delta  (wheelDelta  -12)
         *   OS X + Firefox (mouse)     -    0.1 line  delta  (wheelDelta  N/A)
         *   Win8 + Chrome  (mouse)     -  100   pixel delta  (wheelDelta -120)
         *   Win8 + Firefox (mouse)     -    3   line  delta  (wheelDelta -120)
         *
         * On the trackpad:
         *
         *   OS X + Chrome  (trackpad)  -    2   pixel delta  (wheelDelta   -6)
         *   OS X + Firefox (trackpad)  -    1   pixel delta  (wheelDelta  N/A)
         *
         * On other/older browsers.. it's more complicated as there can be multiple and
         * also missing delta values.
         *
         * The 'wheel' event is more standard:
         *
         * http://www.w3.org/TR/DOM-Level-3-Events/#events-wheelevents
         *
         * The basics is that it includes a unit, deltaMode (pixels, lines, pages), and
         * deltaX, deltaY and deltaZ.  Some browsers provide other values to maintain
         * backward compatibility with older events.  Those other values help us
         * better normalize spin speed.  Example of what the browsers provide:
         *
         *                          | event.wheelDelta | event.detail
         *        ------------------+------------------+--------------
         *          Safari v5/OS X  |       -120       |       0
         *          Safari v5/Win7  |       -120       |       0
         *         Chrome v17/OS X  |       -120       |       0
         *         Chrome v17/Win7  |       -120       |       0
         *                IE9/Win7  |       -120       |   undefined
         *         Firefox v4/OS X  |     undefined    |       1
         *         Firefox v4/Win7  |     undefined    |       3
         *
         */
        function normalizeWheel( /*object*/ event ) /*object*/ {
            // Reasonable defaults
            var PIXEL_STEP = 10;
            var LINE_HEIGHT = 40;
            var PAGE_HEIGHT = 800;
        
            var sX = 0, sY = 0,       // spinX, spinY
                pX = 0, pY = 0;       // pixelX, pixelY
        
            // Legacy
            if( 'detail' in event ) {
                sY = event.detail;
            }
            if( 'wheelDelta' in event ) {
                sY = -event.wheelDelta / 120;
            }
            if( 'wheelDeltaY' in event ) {
                sY = -event.wheelDeltaY / 120;
            }
            if( 'wheelDeltaX' in event ) {
                sX = -event.wheelDeltaX / 120;
            }
        
            // side scrolling on FF with DOMMouseScroll
            if( 'axis' in event && event.axis === event.HORIZONTAL_AXIS ) {
                sX = sY;
                sY = 0;
            }
        
            pX = sX * PIXEL_STEP;
            pY = sY * PIXEL_STEP;
        
            if( 'deltaY' in event ) {
                pY = event.deltaY;
            }
            if( 'deltaX' in event ) {
                pX = event.deltaX;
            }
        
            if( (pX || pY) && event.deltaMode ) {
                if( event.deltaMode === 1 ) {          // delta in LINE units
                    pX *= LINE_HEIGHT;
                    pY *= LINE_HEIGHT;
                } else {                             // delta in PAGE units
                    pX *= PAGE_HEIGHT;
                    pY *= PAGE_HEIGHT;
                }
            }
        
            // Fall-back if spin cannot be determined
            if( pX && !sX ) {
                sX = (pX < 1) ? -1 : 1;
            }
            if( pY && !sY ) {
                sY = (pY < 1) ? -1 : 1;
            }
        
            return {
                spinX: sX,
                spinY: sY,
                pixelX: pX,
                pixelY: pY
            };
        }
        if (s.params.mousewheelControl) {
            /**
             * The best combination if you prefer spinX + spinY normalization.  It favors
             * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
             * 'wheel' event, making spin speed determination impossible.
             */
            s.mousewheel.event = (navigator.userAgent.indexOf('firefox') > -1) ?
                'DOMMouseScroll' :
                isEventSupported() ?
                    'wheel' : 'mousewheel';
        }
        function handleMousewheel(e) {
            if (e.originalEvent) e = e.originalEvent; //jquery fix
            var delta = 0;
            var rtlFactor = s.rtl ? -1 : 1;
        
            var data = normalizeWheel( e );
        
            if (s.params.mousewheelForceToAxis) {
                if (s.isHorizontal()) {
                    if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = data.pixelX * rtlFactor;
                    else return;
                }
                else {
                    if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = data.pixelY;
                    else return;
                }
            }
            else {
                delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? - data.pixelX * rtlFactor : - data.pixelY;
            }
        
            if (delta === 0) return;
        
            if (s.params.mousewheelInvert) delta = -delta;
        
            if (!s.params.freeMode) {
                if ((new window.Date()).getTime() - s.mousewheel.lastScrollTime > 60) {
                    if (delta < 0) {
                        if ((!s.isEnd || s.params.loop) && !s.animating) {
                            s.slideNext();
                            s.emit('onScroll', s, e);
                        }
                        else if (s.params.mousewheelReleaseOnEdges) return true;
                    }
                    else {
                        if ((!s.isBeginning || s.params.loop) && !s.animating) {
                            s.slidePrev();
                            s.emit('onScroll', s, e);
                        }
                        else if (s.params.mousewheelReleaseOnEdges) return true;
                    }
                }
                s.mousewheel.lastScrollTime = (new window.Date()).getTime();
        
            }
            else {
                //Freemode or scrollContainer:
                var position = s.getWrapperTranslate() + delta * s.params.mousewheelSensitivity;
                var wasBeginning = s.isBeginning,
                    wasEnd = s.isEnd;
        
                if (position >= s.minTranslate()) position = s.minTranslate();
                if (position <= s.maxTranslate()) position = s.maxTranslate();
        
                s.setWrapperTransition(0);
                s.setWrapperTranslate(position);
                s.updateProgress();
                s.updateActiveIndex();
        
                if (!wasBeginning && s.isBeginning || !wasEnd && s.isEnd) {
                    s.updateClasses();
                }
        
                if (s.params.freeModeSticky) {
                    clearTimeout(s.mousewheel.timeout);
                    s.mousewheel.timeout = setTimeout(function () {
                        s.slideReset();
                    }, 300);
                }
                else {
                    if (s.params.lazyLoading && s.lazy) {
                        s.lazy.load();
                    }
                }
                // Emit event
                s.emit('onScroll', s, e);
        
                // Stop autoplay
                if (s.params.autoplay && s.params.autoplayDisableOnInteraction) s.stopAutoplay();
        
                // Return page scroll on edge positions
                if (position === 0 || position === s.maxTranslate()) return;
            }
        
            if (e.preventDefault) e.preventDefault();
            else e.returnValue = false;
            return false;
        }
        s.disableMousewheelControl = function () {
            if (!s.mousewheel.event) return false;
            var target = s.container;
            if (s.params.mousewheelEventsTarged !== 'container') {
                target = $(s.params.mousewheelEventsTarged);
            }
            target.off(s.mousewheel.event, handleMousewheel);
            s.params.mousewheelControl = false;
            return true;
        };
        
        s.enableMousewheelControl = function () {
            if (!s.mousewheel.event) return false;
            var target = s.container;
            if (s.params.mousewheelEventsTarged !== 'container') {
                target = $(s.params.mousewheelEventsTarged);
            }
            target.on(s.mousewheel.event, handleMousewheel);
            s.params.mousewheelControl = true;
            return true;
        };
        

        /*=========================
          Parallax
          ===========================*/
        function setParallaxTransform(el, progress) {
            el = $(el);
            var p, pX, pY;
            var rtlFactor = s.rtl ? -1 : 1;
        
            p = el.attr('data-swiper-parallax') || '0';
            pX = el.attr('data-swiper-parallax-x');
            pY = el.attr('data-swiper-parallax-y');
            if (pX || pY) {
                pX = pX || '0';
                pY = pY || '0';
            }
            else {
                if (s.isHorizontal()) {
                    pX = p;
                    pY = '0';
                }
                else {
                    pY = p;
                    pX = '0';
                }
            }
        
            if ((pX).indexOf('%') >= 0) {
                pX = parseInt(pX, 10) * progress * rtlFactor + '%';
            }
            else {
                pX = pX * progress * rtlFactor + 'px' ;
            }
            if ((pY).indexOf('%') >= 0) {
                pY = parseInt(pY, 10) * progress + '%';
            }
            else {
                pY = pY * progress + 'px' ;
            }
        
            el.transform('translate3d(' + pX + ', ' + pY + ',0px)');
        }
        s.parallax = {
            setTranslate: function () {
                s.container.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
                    setParallaxTransform(this, s.progress);
        
                });
                s.slides.each(function () {
                    var slide = $(this);
                    slide.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
                        var progress = Math.min(Math.max(slide[0].progress, -1), 1);
                        setParallaxTransform(this, progress);
                    });
                });
            },
            setTransition: function (duration) {
                if (typeof duration === 'undefined') duration = s.params.speed;
                s.container.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
                    var el = $(this);
                    var parallaxDuration = parseInt(el.attr('data-swiper-parallax-duration'), 10) || duration;
                    if (duration === 0) parallaxDuration = 0;
                    el.transition(parallaxDuration);
                });
            }
        };
        

        /*=========================
          Zoom
          ===========================*/
        s.zoom = {
            // "Global" Props
            scale: 1,
            currentScale: 1,
            isScaling: false,
            gesture: {
                slide: undefined,
                slideWidth: undefined,
                slideHeight: undefined,
                image: undefined,
                imageWrap: undefined,
                zoomMax: s.params.zoomMax
            },
            image: {
                isTouched: undefined,
                isMoved: undefined,
                currentX: undefined,
                currentY: undefined,
                minX: undefined,
                minY: undefined,
                maxX: undefined,
                maxY: undefined,
                width: undefined,
                height: undefined,
                startX: undefined,
                startY: undefined,
                touchesStart: {},
                touchesCurrent: {}
            },
            velocity: {
                x: undefined,
                y: undefined,
                prevPositionX: undefined,
                prevPositionY: undefined,
                prevTime: undefined
            },
            // Calc Scale From Multi-touches
            getDistanceBetweenTouches: function (e) {
                if (e.targetTouches.length < 2) return 1;
                var x1 = e.targetTouches[0].pageX,
                    y1 = e.targetTouches[0].pageY,
                    x2 = e.targetTouches[1].pageX,
                    y2 = e.targetTouches[1].pageY;
                var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                return distance;
            },
            // Events
            onGestureStart: function (e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchstart' || e.type === 'touchstart' && e.targetTouches.length < 2) {
                        return;
                    }
                    z.gesture.scaleStart = z.getDistanceBetweenTouches(e);
                }
                if (!z.gesture.slide || !z.gesture.slide.length) {
                    z.gesture.slide = $(this);
                    if (z.gesture.slide.length === 0) z.gesture.slide = s.slides.eq(s.activeIndex);
                    z.gesture.image = z.gesture.slide.find('img, svg, canvas');
                    z.gesture.imageWrap = z.gesture.image.parent('.' + s.params.zoomContainerClass);
                    z.gesture.zoomMax = z.gesture.imageWrap.attr('data-swiper-zoom') || s.params.zoomMax ;
                    if (z.gesture.imageWrap.length === 0) {
                        z.gesture.image = undefined;
                        return;
                    }
                }
                z.gesture.image.transition(0);
                z.isScaling = true;
            },
            onGestureChange: function (e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchmove' || e.type === 'touchmove' && e.targetTouches.length < 2) {
                        return;
                    }
                    z.gesture.scaleMove = z.getDistanceBetweenTouches(e);
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (s.support.gestures) {
                    z.scale = e.scale * z.currentScale;
                }
                else {
                    z.scale = (z.gesture.scaleMove / z.gesture.scaleStart) * z.currentScale;
                }
                if (z.scale > z.gesture.zoomMax) {
                    z.scale = z.gesture.zoomMax - 1 + Math.pow((z.scale - z.gesture.zoomMax + 1), 0.5);
                }
                if (z.scale < s.params.zoomMin) {
                    z.scale =  s.params.zoomMin + 1 - Math.pow((s.params.zoomMin - z.scale + 1), 0.5);
                }
                z.gesture.image.transform('translate3d(0,0,0) scale(' + z.scale + ')');
            },
            onGestureEnd: function (e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchend' || e.type === 'touchend' && e.changedTouches.length < 2) {
                        return;
                    }
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                z.scale = Math.max(Math.min(z.scale, z.gesture.zoomMax), s.params.zoomMin);
                z.gesture.image.transition(s.params.speed).transform('translate3d(0,0,0) scale(' + z.scale + ')');
                z.currentScale = z.scale;
                z.isScaling = false;
                if (z.scale === 1) z.gesture.slide = undefined;
            },
            onTouchStart: function (s, e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (z.image.isTouched) return;
                if (s.device.os === 'android') e.preventDefault();
                z.image.isTouched = true;
                z.image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                z.image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
            },
            onTouchMove: function (e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                s.allowClick = false;
                if (!z.image.isTouched || !z.gesture.slide) return;
        
                if (!z.image.isMoved) {
                    z.image.width = z.gesture.image[0].offsetWidth;
                    z.image.height = z.gesture.image[0].offsetHeight;
                    z.image.startX = s.getTranslate(z.gesture.imageWrap[0], 'x') || 0;
                    z.image.startY = s.getTranslate(z.gesture.imageWrap[0], 'y') || 0;
                    z.gesture.slideWidth = z.gesture.slide[0].offsetWidth;
                    z.gesture.slideHeight = z.gesture.slide[0].offsetHeight;
                    z.gesture.imageWrap.transition(0);
                    if (s.rtl) z.image.startX = -z.image.startX;
                    if (s.rtl) z.image.startY = -z.image.startY;
                }
                // Define if we need image drag
                var scaledWidth = z.image.width * z.scale;
                var scaledHeight = z.image.height * z.scale;
        
                if (scaledWidth < z.gesture.slideWidth && scaledHeight < z.gesture.slideHeight) return;
        
                z.image.minX = Math.min((z.gesture.slideWidth / 2 - scaledWidth / 2), 0);
                z.image.maxX = -z.image.minX;
                z.image.minY = Math.min((z.gesture.slideHeight / 2 - scaledHeight / 2), 0);
                z.image.maxY = -z.image.minY;
        
                z.image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                z.image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        
                if (!z.image.isMoved && !z.isScaling) {
                    if (s.isHorizontal() &&
                        (Math.floor(z.image.minX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x < z.image.touchesStart.x) ||
                        (Math.floor(z.image.maxX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x > z.image.touchesStart.x)
                        ) {
                        z.image.isTouched = false;
                        return;
                    }
                    else if (!s.isHorizontal() &&
                        (Math.floor(z.image.minY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y < z.image.touchesStart.y) ||
                        (Math.floor(z.image.maxY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y > z.image.touchesStart.y)
                        ) {
                        z.image.isTouched = false;
                        return;
                    }
                }
                e.preventDefault();
                e.stopPropagation();
        
                z.image.isMoved = true;
                z.image.currentX = z.image.touchesCurrent.x - z.image.touchesStart.x + z.image.startX;
                z.image.currentY = z.image.touchesCurrent.y - z.image.touchesStart.y + z.image.startY;
        
                if (z.image.currentX < z.image.minX) {
                    z.image.currentX =  z.image.minX + 1 - Math.pow((z.image.minX - z.image.currentX + 1), 0.8);
                }
                if (z.image.currentX > z.image.maxX) {
                    z.image.currentX = z.image.maxX - 1 + Math.pow((z.image.currentX - z.image.maxX + 1), 0.8);
                }
        
                if (z.image.currentY < z.image.minY) {
                    z.image.currentY =  z.image.minY + 1 - Math.pow((z.image.minY - z.image.currentY + 1), 0.8);
                }
                if (z.image.currentY > z.image.maxY) {
                    z.image.currentY = z.image.maxY - 1 + Math.pow((z.image.currentY - z.image.maxY + 1), 0.8);
                }
        
                //Velocity
                if (!z.velocity.prevPositionX) z.velocity.prevPositionX = z.image.touchesCurrent.x;
                if (!z.velocity.prevPositionY) z.velocity.prevPositionY = z.image.touchesCurrent.y;
                if (!z.velocity.prevTime) z.velocity.prevTime = Date.now();
                z.velocity.x = (z.image.touchesCurrent.x - z.velocity.prevPositionX) / (Date.now() - z.velocity.prevTime) / 2;
                z.velocity.y = (z.image.touchesCurrent.y - z.velocity.prevPositionY) / (Date.now() - z.velocity.prevTime) / 2;
                if (Math.abs(z.image.touchesCurrent.x - z.velocity.prevPositionX) < 2) z.velocity.x = 0;
                if (Math.abs(z.image.touchesCurrent.y - z.velocity.prevPositionY) < 2) z.velocity.y = 0;
                z.velocity.prevPositionX = z.image.touchesCurrent.x;
                z.velocity.prevPositionY = z.image.touchesCurrent.y;
                z.velocity.prevTime = Date.now();
        
                z.gesture.imageWrap.transform('translate3d(' + z.image.currentX + 'px, ' + z.image.currentY + 'px,0)');
            },
            onTouchEnd: function (s, e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (!z.image.isTouched || !z.image.isMoved) {
                    z.image.isTouched = false;
                    z.image.isMoved = false;
                    return;
                }
                z.image.isTouched = false;
                z.image.isMoved = false;
                var momentumDurationX = 300;
                var momentumDurationY = 300;
                var momentumDistanceX = z.velocity.x * momentumDurationX;
                var newPositionX = z.image.currentX + momentumDistanceX;
                var momentumDistanceY = z.velocity.y * momentumDurationY;
                var newPositionY = z.image.currentY + momentumDistanceY;
        
                //Fix duration
                if (z.velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - z.image.currentX) / z.velocity.x);
                if (z.velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - z.image.currentY) / z.velocity.y);
                var momentumDuration = Math.max(momentumDurationX, momentumDurationY);
        
                z.image.currentX = newPositionX;
                z.image.currentY = newPositionY;
        
                // Define if we need image drag
                var scaledWidth = z.image.width * z.scale;
                var scaledHeight = z.image.height * z.scale;
                z.image.minX = Math.min((z.gesture.slideWidth / 2 - scaledWidth / 2), 0);
                z.image.maxX = -z.image.minX;
                z.image.minY = Math.min((z.gesture.slideHeight / 2 - scaledHeight / 2), 0);
                z.image.maxY = -z.image.minY;
                z.image.currentX = Math.max(Math.min(z.image.currentX, z.image.maxX), z.image.minX);
                z.image.currentY = Math.max(Math.min(z.image.currentY, z.image.maxY), z.image.minY);
        
                z.gesture.imageWrap.transition(momentumDuration).transform('translate3d(' + z.image.currentX + 'px, ' + z.image.currentY + 'px,0)');
            },
            onTransitionEnd: function (s) {
                var z = s.zoom;
                if (z.gesture.slide && s.previousIndex !== s.activeIndex) {
                    z.gesture.image.transform('translate3d(0,0,0) scale(1)');
                    z.gesture.imageWrap.transform('translate3d(0,0,0)');
                    z.gesture.slide = z.gesture.image = z.gesture.imageWrap = undefined;
                    z.scale = z.currentScale = 1;
                }
            },
            // Toggle Zoom
            toggleZoom: function (s, e) {
                var z = s.zoom;
                if (!z.gesture.slide) {
                    z.gesture.slide = s.clickedSlide ? $(s.clickedSlide) : s.slides.eq(s.activeIndex);
                    z.gesture.image = z.gesture.slide.find('img, svg, canvas');
                    z.gesture.imageWrap = z.gesture.image.parent('.' + s.params.zoomContainerClass);
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;
        
                var touchX, touchY, offsetX, offsetY, diffX, diffY, translateX, translateY, imageWidth, imageHeight, scaledWidth, scaledHeight, translateMinX, translateMinY, translateMaxX, translateMaxY, slideWidth, slideHeight;
        
                if (typeof z.image.touchesStart.x === 'undefined' && e) {
                    touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
                    touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
                }
                else {
                    touchX = z.image.touchesStart.x;
                    touchY = z.image.touchesStart.y;
                }
        
                if (z.scale && z.scale !== 1) {
                    // Zoom Out
                    z.scale = z.currentScale = 1;
                    z.gesture.imageWrap.transition(300).transform('translate3d(0,0,0)');
                    z.gesture.image.transition(300).transform('translate3d(0,0,0) scale(1)');
                    z.gesture.slide = undefined;
                }
                else {
                    // Zoom In
                    z.scale = z.currentScale = z.gesture.imageWrap.attr('data-swiper-zoom') || s.params.zoomMax;
                    if (e) {
                        slideWidth = z.gesture.slide[0].offsetWidth;
                        slideHeight = z.gesture.slide[0].offsetHeight;
                        offsetX = z.gesture.slide.offset().left;
                        offsetY = z.gesture.slide.offset().top;
                        diffX = offsetX + slideWidth/2 - touchX;
                        diffY = offsetY + slideHeight/2 - touchY;
        
                        imageWidth = z.gesture.image[0].offsetWidth;
                        imageHeight = z.gesture.image[0].offsetHeight;
                        scaledWidth = imageWidth * z.scale;
                        scaledHeight = imageHeight * z.scale;
        
                        translateMinX = Math.min((slideWidth / 2 - scaledWidth / 2), 0);
                        translateMinY = Math.min((slideHeight / 2 - scaledHeight / 2), 0);
                        translateMaxX = -translateMinX;
                        translateMaxY = -translateMinY;
        
                        translateX = diffX * z.scale;
                        translateY = diffY * z.scale;
        
                        if (translateX < translateMinX) {
                            translateX =  translateMinX;
                        }
                        if (translateX > translateMaxX) {
                            translateX = translateMaxX;
                        }
        
                        if (translateY < translateMinY) {
                            translateY =  translateMinY;
                        }
                        if (translateY > translateMaxY) {
                            translateY = translateMaxY;
                        }
                    }
                    else {
                        translateX = 0;
                        translateY = 0;
                    }
                    z.gesture.imageWrap.transition(300).transform('translate3d(' + translateX + 'px, ' + translateY + 'px,0)');
                    z.gesture.image.transition(300).transform('translate3d(0,0,0) scale(' + z.scale + ')');
                }
            },
            // Attach/Detach Events
            attachEvents: function (detach) {
                var action = detach ? 'off' : 'on';
        
                if (s.params.zoom) {
                    var target = s.slides;
                    var passiveListener = s.touchEvents.start === 'touchstart' && s.support.passiveListener && s.params.passiveListeners ? {passive: true, capture: false} : false;
                    // Scale image
                    if (s.support.gestures) {
                        s.slides[action]('gesturestart', s.zoom.onGestureStart, passiveListener);
                        s.slides[action]('gesturechange', s.zoom.onGestureChange, passiveListener);
                        s.slides[action]('gestureend', s.zoom.onGestureEnd, passiveListener);
                    }
                    else if (s.touchEvents.start === 'touchstart') {
                        s.slides[action](s.touchEvents.start, s.zoom.onGestureStart, passiveListener);
                        s.slides[action](s.touchEvents.move, s.zoom.onGestureChange, passiveListener);
                        s.slides[action](s.touchEvents.end, s.zoom.onGestureEnd, passiveListener);
                    }
        
                    // Move image
                    s[action]('touchStart', s.zoom.onTouchStart);
                    s.slides.each(function (index, slide){
                        if ($(slide).find('.' + s.params.zoomContainerClass).length > 0) {
                            $(slide)[action](s.touchEvents.move, s.zoom.onTouchMove);
                        }
                    });
                    s[action]('touchEnd', s.zoom.onTouchEnd);
        
                    // Scale Out
                    s[action]('transitionEnd', s.zoom.onTransitionEnd);
                    if (s.params.zoomToggle) {
                        s.on('doubleTap', s.zoom.toggleZoom);
                    }
                }
            },
            init: function () {
                s.zoom.attachEvents();
            },
            destroy: function () {
                s.zoom.attachEvents(true);
            }
        };
        

        /*=========================
          Plugins API. Collect all and init all plugins
          ===========================*/
        s._plugins = [];
        for (var plugin in s.plugins) {
            var p = s.plugins[plugin](s, s.params[plugin]);
            if (p) s._plugins.push(p);
        }
        // Method to call all plugins event/method
        s.callPlugins = function (eventName) {
            for (var i = 0; i < s._plugins.length; i++) {
                if (eventName in s._plugins[i]) {
                    s._plugins[i][eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
        };
        

        /*=========================
          Events/Callbacks/Plugins Emitter
          ===========================*/
        function normalizeEventName (eventName) {
            if (eventName.indexOf('on') !== 0) {
                if (eventName[0] !== eventName[0].toUpperCase()) {
                    eventName = 'on' + eventName[0].toUpperCase() + eventName.substring(1);
                }
                else {
                    eventName = 'on' + eventName;
                }
            }
            return eventName;
        }
        s.emitterEventListeners = {
        
        };
        s.emit = function (eventName) {
            // Trigger callbacks
            if (s.params[eventName]) {
                s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            }
            var i;
            // Trigger events
            if (s.emitterEventListeners[eventName]) {
                for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                    s.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
            // Trigger plugins
            if (s.callPlugins) s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        };
        s.on = function (eventName, handler) {
            eventName = normalizeEventName(eventName);
            if (!s.emitterEventListeners[eventName]) s.emitterEventListeners[eventName] = [];
            s.emitterEventListeners[eventName].push(handler);
            return s;
        };
        s.off = function (eventName, handler) {
            var i;
            eventName = normalizeEventName(eventName);
            if (typeof handler === 'undefined') {
                // Remove all handlers for such event
                s.emitterEventListeners[eventName] = [];
                return s;
            }
            if (!s.emitterEventListeners[eventName] || s.emitterEventListeners[eventName].length === 0) return;
            for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                if(s.emitterEventListeners[eventName][i] === handler) s.emitterEventListeners[eventName].splice(i, 1);
            }
            return s;
        };
        s.once = function (eventName, handler) {
            eventName = normalizeEventName(eventName);
            var _handler = function () {
                handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                s.off(eventName, _handler);
            };
            s.on(eventName, _handler);
            return s;
        };
        

        // Accessibility tools
        s.a11y = {
            makeFocusable: function ($el) {
                $el.attr('tabIndex', '0');
                return $el;
            },
            addRole: function ($el, role) {
                $el.attr('role', role);
                return $el;
            },
        
            addLabel: function ($el, label) {
                $el.attr('aria-label', label);
                return $el;
            },
        
            disable: function ($el) {
                $el.attr('aria-disabled', true);
                return $el;
            },
        
            enable: function ($el) {
                $el.attr('aria-disabled', false);
                return $el;
            },
        
            onEnterKey: function (event) {
                if (event.keyCode !== 13) return;
                if ($(event.target).is(s.params.nextButton)) {
                    s.onClickNext(event);
                    if (s.isEnd) {
                        s.a11y.notify(s.params.lastSlideMessage);
                    }
                    else {
                        s.a11y.notify(s.params.nextSlideMessage);
                    }
                }
                else if ($(event.target).is(s.params.prevButton)) {
                    s.onClickPrev(event);
                    if (s.isBeginning) {
                        s.a11y.notify(s.params.firstSlideMessage);
                    }
                    else {
                        s.a11y.notify(s.params.prevSlideMessage);
                    }
                }
                if ($(event.target).is('.' + s.params.bulletClass)) {
                    $(event.target)[0].click();
                }
            },
        
            liveRegion: $('<span class="' + s.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
        
            notify: function (message) {
                var notification = s.a11y.liveRegion;
                if (notification.length === 0) return;
                notification.html('');
                notification.html(message);
            },
            init: function () {
                // Setup accessibility
                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                    s.a11y.makeFocusable(s.nextButton);
                    s.a11y.addRole(s.nextButton, 'button');
                    s.a11y.addLabel(s.nextButton, s.params.nextSlideMessage);
                }
                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                    s.a11y.makeFocusable(s.prevButton);
                    s.a11y.addRole(s.prevButton, 'button');
                    s.a11y.addLabel(s.prevButton, s.params.prevSlideMessage);
                }
        
                $(s.container).append(s.a11y.liveRegion);
            },
            initPagination: function () {
                if (s.params.pagination && s.params.paginationClickable && s.bullets && s.bullets.length) {
                    s.bullets.each(function () {
                        var bullet = $(this);
                        s.a11y.makeFocusable(bullet);
                        s.a11y.addRole(bullet, 'button');
                        s.a11y.addLabel(bullet, s.params.paginationBulletMessage.replace(/{{index}}/, bullet.index() + 1));
                    });
                }
            },
            destroy: function () {
                if (s.a11y.liveRegion && s.a11y.liveRegion.length > 0) s.a11y.liveRegion.remove();
            }
        };
        

        /*=========================
          Init/Destroy
          ===========================*/
        s.init = function () {
            if (s.params.loop) s.createLoop();
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
                if (s.params.scrollbarDraggable) {
                    s.scrollbar.enableDraggable();
                }
            }
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                if (!s.params.loop) s.updateProgress();
                s.effects[s.params.effect].setTranslate();
            }
            if (s.params.loop) {
                s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit);
            }
            else {
                s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit);
                if (s.params.initialSlide === 0) {
                    if (s.parallax && s.params.parallax) s.parallax.setTranslate();
                    if (s.lazy && s.params.lazyLoading) {
                        s.lazy.load();
                        s.lazy.initialImageLoaded = true;
                    }
                }
            }
            s.attachEvents();
            if (s.params.observer && s.support.observer) {
                s.initObservers();
            }
            if (s.params.preloadImages && !s.params.lazyLoading) {
                s.preloadImages();
            }
            if (s.params.zoom && s.zoom) {
                s.zoom.init();
            }
            if (s.params.autoplay) {
                s.startAutoplay();
            }
            if (s.params.keyboardControl) {
                if (s.enableKeyboardControl) s.enableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.enableMousewheelControl) s.enableMousewheelControl();
            }
            // Deprecated hashnavReplaceState changed to replaceState for use in hashnav and history
            if (s.params.hashnavReplaceState) {
                s.params.replaceState = s.params.hashnavReplaceState;
            }
            if (s.params.history) {
                if (s.history) s.history.init();
            }
            if (s.params.hashnav) {
                if (s.hashnav) s.hashnav.init();
            }
            if (s.params.a11y && s.a11y) s.a11y.init();
            s.emit('onInit', s);
        };
        
        // Cleanup dynamic styles
        s.cleanupStyles = function () {
            // Container
            s.container.removeClass(s.classNames.join(' ')).removeAttr('style');
        
            // Wrapper
            s.wrapper.removeAttr('style');
        
            // Slides
            if (s.slides && s.slides.length) {
                s.slides
                    .removeClass([
                      s.params.slideVisibleClass,
                      s.params.slideActiveClass,
                      s.params.slideNextClass,
                      s.params.slidePrevClass
                    ].join(' '))
                    .removeAttr('style')
                    .removeAttr('data-swiper-column')
                    .removeAttr('data-swiper-row');
            }
        
            // Pagination/Bullets
            if (s.paginationContainer && s.paginationContainer.length) {
                s.paginationContainer.removeClass(s.params.paginationHiddenClass);
            }
            if (s.bullets && s.bullets.length) {
                s.bullets.removeClass(s.params.bulletActiveClass);
            }
        
            // Buttons
            if (s.params.prevButton) $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
            if (s.params.nextButton) $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
        
            // Scrollbar
            if (s.params.scrollbar && s.scrollbar) {
                if (s.scrollbar.track && s.scrollbar.track.length) s.scrollbar.track.removeAttr('style');
                if (s.scrollbar.drag && s.scrollbar.drag.length) s.scrollbar.drag.removeAttr('style');
            }
        };
        
        // Destroy
        s.destroy = function (deleteInstance, cleanupStyles) {
            // Detach evebts
            s.detachEvents();
            // Stop autoplay
            s.stopAutoplay();
            // Disable draggable
            if (s.params.scrollbar && s.scrollbar) {
                if (s.params.scrollbarDraggable) {
                    s.scrollbar.disableDraggable();
                }
            }
            // Destroy loop
            if (s.params.loop) {
                s.destroyLoop();
            }
            // Cleanup styles
            if (cleanupStyles) {
                s.cleanupStyles();
            }
            // Disconnect observer
            s.disconnectObservers();
        
            // Destroy zoom
            if (s.params.zoom && s.zoom) {
                s.zoom.destroy();
            }
            // Disable keyboard/mousewheel
            if (s.params.keyboardControl) {
                if (s.disableKeyboardControl) s.disableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.disableMousewheelControl) s.disableMousewheelControl();
            }
            // Disable a11y
            if (s.params.a11y && s.a11y) s.a11y.destroy();
            // Delete history popstate
            if (s.params.history && !s.params.replaceState) {
                window.removeEventListener('popstate', s.history.setHistoryPopState);
            }
            if (s.params.hashnav && s.hashnav)  {
                s.hashnav.destroy();
            }
            // Destroy callback
            s.emit('onDestroy');
            // Delete instance
            if (deleteInstance !== false) s = null;
        };
        
        s.init();
        

    
        // Return swiper instance
        return s;
    };
    

    /*==================================================
        Prototype
    ====================================================*/
    Swiper.prototype = {
        isSafari: (function () {
            var ua = window.navigator.userAgent.toLowerCase();
            return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
        })(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
        isArray: function (arr) {
            return Object.prototype.toString.apply(arr) === '[object Array]';
        },
        /*==================================================
        Browser
        ====================================================*/
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1) || (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1),
            lteIE9: (function() {
                // create temporary DIV
                var div = document.createElement('div');
                // add content to tmp DIV which is wrapped into the IE HTML conditional statement
                div.innerHTML = '<!--[if lte IE 9]><i></i><![endif]-->';
                // return true / false value based on what will browser render
                return div.getElementsByTagName('i').length === 1;
            })()
        },
        /*==================================================
        Devices
        ====================================================*/
        device: (function () {
            var ua = window.navigator.userAgent;
            var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            return {
                ios: ipad || iphone || ipod,
                android: android
            };
        })(),
        /*==================================================
        Feature Detection
        ====================================================*/
        support: {
            touch : (window.Modernizr && Modernizr.touch === true) || (function () {
                return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
            })(),
    
            transforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
                var div = document.createElement('div').style;
                return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
            })(),
    
            flexbox: (function () {
                var div = document.createElement('div').style;
                var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
                for (var i = 0; i < styles.length; i++) {
                    if (styles[i] in div) return true;
                }
            })(),
    
            observer: (function () {
                return ('MutationObserver' in window || 'WebkitMutationObserver' in window);
            })(),
    
            passiveListener: (function () {
                var supportsPassive = false;
                try {
                    var opts = Object.defineProperty({}, 'passive', {
                        get: function() {
                            supportsPassive = true;
                        }
                    });
                    window.addEventListener('testPassiveListener', null, opts);
                } catch (e) {}
                return supportsPassive;
            })(),
    
            gestures: (function () {
                return 'ongesturestart' in window;
            })()
        },
        /*==================================================
        Plugins
        ====================================================*/
        plugins: {}
    };
    

    /*===========================
    Dom7 Library
    ===========================*/
    var Dom7 = (function () {
        var Dom7 = function (arr) {
            var _this = this, i = 0;
            // Create array-like object
            for (i = 0; i < arr.length; i++) {
                _this[i] = arr[i];
            }
            _this.length = arr.length;
            // Return collection with methods
            return this;
        };
        var $ = function (selector, context) {
            var arr = [], i = 0;
            if (selector && !context) {
                if (selector instanceof Dom7) {
                    return selector;
                }
            }
            if (selector) {
                // String
                if (typeof selector === 'string') {
                    var els, tempParent, html = selector.trim();
                    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
                        var toCreate = 'div';
                        if (html.indexOf('<li') === 0) toCreate = 'ul';
                        if (html.indexOf('<tr') === 0) toCreate = 'tbody';
                        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
                        if (html.indexOf('<tbody') === 0) toCreate = 'table';
                        if (html.indexOf('<option') === 0) toCreate = 'select';
                        tempParent = document.createElement(toCreate);
                        tempParent.innerHTML = selector;
                        for (i = 0; i < tempParent.childNodes.length; i++) {
                            arr.push(tempParent.childNodes[i]);
                        }
                    }
                    else {
                        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
                            // Pure ID selector
                            els = [document.getElementById(selector.split('#')[1])];
                        }
                        else {
                            // Other selectors
                            els = (context || document).querySelectorAll(selector);
                        }
                        for (i = 0; i < els.length; i++) {
                            if (els[i]) arr.push(els[i]);
                        }
                    }
                }
                // Node/element
                else if (selector.nodeType || selector === window || selector === document) {
                    arr.push(selector);
                }
                //Array of elements or instance of Dom
                else if (selector.length > 0 && selector[0].nodeType) {
                    for (i = 0; i < selector.length; i++) {
                        arr.push(selector[i]);
                    }
                }
            }
            return new Dom7(arr);
        };
        Dom7.prototype = {
            // Classes and attriutes
            addClass: function (className) {
                if (typeof className === 'undefined') {
                    return this;
                }
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.add(classes[i]);
                    }
                }
                return this;
            },
            removeClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.remove(classes[i]);
                    }
                }
                return this;
            },
            hasClass: function (className) {
                if (!this[0]) return false;
                else return this[0].classList.contains(className);
            },
            toggleClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.toggle(classes[i]);
                    }
                }
                return this;
            },
            attr: function (attrs, value) {
                if (arguments.length === 1 && typeof attrs === 'string') {
                    // Get attr
                    if (this[0]) return this[0].getAttribute(attrs);
                    else return undefined;
                }
                else {
                    // Set attrs
                    for (var i = 0; i < this.length; i++) {
                        if (arguments.length === 2) {
                            // String
                            this[i].setAttribute(attrs, value);
                        }
                        else {
                            // Object
                            for (var attrName in attrs) {
                                this[i][attrName] = attrs[attrName];
                                this[i].setAttribute(attrName, attrs[attrName]);
                            }
                        }
                    }
                    return this;
                }
            },
            removeAttr: function (attr) {
                for (var i = 0; i < this.length; i++) {
                    this[i].removeAttribute(attr);
                }
                return this;
            },
            data: function (key, value) {
                if (typeof value === 'undefined') {
                    // Get value
                    if (this[0]) {
                        var dataKey = this[0].getAttribute('data-' + key);
                        if (dataKey) return dataKey;
                        else if (this[0].dom7ElementDataStorage && (key in this[0].dom7ElementDataStorage)) return this[0].dom7ElementDataStorage[key];
                        else return undefined;
                    }
                    else return undefined;
                }
                else {
                    // Set value
                    for (var i = 0; i < this.length; i++) {
                        var el = this[i];
                        if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
                        el.dom7ElementDataStorage[key] = value;
                    }
                    return this;
                }
            },
            // Transforms
            transform : function (transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            },
            transition: function (duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            },
            //Events
            on: function (eventName, targetSelector, listener, capture) {
                function handleLiveEvent(e) {
                    var target = e.target;
                    if ($(target).is(targetSelector)) listener.call(target, e);
                    else {
                        var parents = $(target).parents();
                        for (var k = 0; k < parents.length; k++) {
                            if ($(parents[k]).is(targetSelector)) listener.call(parents[k], e);
                        }
                    }
                }
                var events = eventName.split(' ');
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof targetSelector === 'function' || targetSelector === false) {
                        // Usual events
                        if (typeof targetSelector === 'function') {
                            listener = arguments[1];
                            capture = arguments[2] || false;
                        }
                        for (j = 0; j < events.length; j++) {
                            this[i].addEventListener(events[j], listener, capture);
                        }
                    }
                    else {
                        //Live events
                        for (j = 0; j < events.length; j++) {
                            if (!this[i].dom7LiveListeners) this[i].dom7LiveListeners = [];
                            this[i].dom7LiveListeners.push({listener: listener, liveListener: handleLiveEvent});
                            this[i].addEventListener(events[j], handleLiveEvent, capture);
                        }
                    }
                }
    
                return this;
            },
            off: function (eventName, targetSelector, listener, capture) {
                var events = eventName.split(' ');
                for (var i = 0; i < events.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof targetSelector === 'function' || targetSelector === false) {
                            // Usual events
                            if (typeof targetSelector === 'function') {
                                listener = arguments[1];
                                capture = arguments[2] || false;
                            }
                            this[j].removeEventListener(events[i], listener, capture);
                        }
                        else {
                            // Live event
                            if (this[j].dom7LiveListeners) {
                                for (var k = 0; k < this[j].dom7LiveListeners.length; k++) {
                                    if (this[j].dom7LiveListeners[k].listener === listener) {
                                        this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
                                    }
                                }
                            }
                        }
                    }
                }
                return this;
            },
            once: function (eventName, targetSelector, listener, capture) {
                var dom = this;
                if (typeof targetSelector === 'function') {
                    targetSelector = false;
                    listener = arguments[1];
                    capture = arguments[2];
                }
                function proxy(e) {
                    listener(e);
                    dom.off(eventName, targetSelector, proxy, capture);
                }
                dom.on(eventName, targetSelector, proxy, capture);
            },
            trigger: function (eventName, eventData) {
                for (var i = 0; i < this.length; i++) {
                    var evt;
                    try {
                        evt = new window.CustomEvent(eventName, {detail: eventData, bubbles: true, cancelable: true});
                    }
                    catch (e) {
                        evt = document.createEvent('Event');
                        evt.initEvent(eventName, true, true);
                        evt.detail = eventData;
                    }
                    this[i].dispatchEvent(evt);
                }
                return this;
            },
            transitionEnd: function (callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i, j, dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            },
            // Sizing/Styles
            width: function () {
                if (this[0] === window) {
                    return window.innerWidth;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('width'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerWidth: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins)
                        return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));
                    else
                        return this[0].offsetWidth;
                }
                else return null;
            },
            height: function () {
                if (this[0] === window) {
                    return window.innerHeight;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('height'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerHeight: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins)
                        return this[0].offsetHeight + parseFloat(this.css('margin-top')) + parseFloat(this.css('margin-bottom'));
                    else
                        return this[0].offsetHeight;
                }
                else return null;
            },
            offset: function () {
                if (this.length > 0) {
                    var el = this[0];
                    var box = el.getBoundingClientRect();
                    var body = document.body;
                    var clientTop  = el.clientTop  || body.clientTop  || 0;
                    var clientLeft = el.clientLeft || body.clientLeft || 0;
                    var scrollTop  = window.pageYOffset || el.scrollTop;
                    var scrollLeft = window.pageXOffset || el.scrollLeft;
                    return {
                        top: box.top  + scrollTop  - clientTop,
                        left: box.left + scrollLeft - clientLeft
                    };
                }
                else {
                    return null;
                }
            },
            css: function (props, value) {
                var i;
                if (arguments.length === 1) {
                    if (typeof props === 'string') {
                        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
                    }
                    else {
                        for (i = 0; i < this.length; i++) {
                            for (var prop in props) {
                                this[i].style[prop] = props[prop];
                            }
                        }
                        return this;
                    }
                }
                if (arguments.length === 2 && typeof props === 'string') {
                    for (i = 0; i < this.length; i++) {
                        this[i].style[props] = value;
                    }
                    return this;
                }
                return this;
            },
    
            //Dom manipulation
            each: function (callback) {
                for (var i = 0; i < this.length; i++) {
                    callback.call(this[i], i, this[i]);
                }
                return this;
            },
            html: function (html) {
                if (typeof html === 'undefined') {
                    return this[0] ? this[0].innerHTML : undefined;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].innerHTML = html;
                    }
                    return this;
                }
            },
            text: function (text) {
                if (typeof text === 'undefined') {
                    if (this[0]) {
                        return this[0].textContent.trim();
                    }
                    else return null;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].textContent = text;
                    }
                    return this;
                }
            },
            is: function (selector) {
                if (!this[0]) return false;
                var compareWith, i;
                if (typeof selector === 'string') {
                    var el = this[0];
                    if (el === document) return selector === document;
                    if (el === window) return selector === window;
    
                    if (el.matches) return el.matches(selector);
                    else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
                    else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);
                    else if (el.msMatchesSelector) return el.msMatchesSelector(selector);
                    else {
                        compareWith = $(selector);
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                }
                else if (selector === document) return this[0] === document;
                else if (selector === window) return this[0] === window;
                else {
                    if (selector.nodeType || selector instanceof Dom7) {
                        compareWith = selector.nodeType ? [selector] : selector;
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                    return false;
                }
    
            },
            index: function () {
                if (this[0]) {
                    var child = this[0];
                    var i = 0;
                    while ((child = child.previousSibling) !== null) {
                        if (child.nodeType === 1) i++;
                    }
                    return i;
                }
                else return undefined;
            },
            eq: function (index) {
                if (typeof index === 'undefined') return this;
                var length = this.length;
                var returnIndex;
                if (index > length - 1) {
                    return new Dom7([]);
                }
                if (index < 0) {
                    returnIndex = length + index;
                    if (returnIndex < 0) return new Dom7([]);
                    else return new Dom7([this[returnIndex]]);
                }
                return new Dom7([this[index]]);
            },
            append: function (newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        while (tempDiv.firstChild) {
                            this[i].appendChild(tempDiv.firstChild);
                        }
                    }
                    else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].appendChild(newChild[j]);
                        }
                    }
                    else {
                        this[i].appendChild(newChild);
                    }
                }
                return this;
            },
            prepend: function (newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
                            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
                        }
                        // this[i].insertAdjacentHTML('afterbegin', newChild);
                    }
                    else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
                        }
                    }
                    else {
                        this[i].insertBefore(newChild, this[i].childNodes[0]);
                    }
                }
                return this;
            },
            insertBefore: function (selector) {
                var before = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (before.length === 1) {
                        before[0].parentNode.insertBefore(this[i], before[0]);
                    }
                    else if (before.length > 1) {
                        for (var j = 0; j < before.length; j++) {
                            before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
                        }
                    }
                }
            },
            insertAfter: function (selector) {
                var after = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (after.length === 1) {
                        after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
                    }
                    else if (after.length > 1) {
                        for (var j = 0; j < after.length; j++) {
                            after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
                        }
                    }
                }
            },
            next: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) return new Dom7([this[0].nextElementSibling]);
                        else return new Dom7([]);
                    }
                    else {
                        if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);
                        else return new Dom7([]);
                    }
                }
                else return new Dom7([]);
            },
            nextAll: function (selector) {
                var nextEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.nextElementSibling) {
                    var next = el.nextElementSibling;
                    if (selector) {
                        if($(next).is(selector)) nextEls.push(next);
                    }
                    else nextEls.push(next);
                    el = next;
                }
                return new Dom7(nextEls);
            },
            prev: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new Dom7([this[0].previousElementSibling]);
                        else return new Dom7([]);
                    }
                    else {
                        if (this[0].previousElementSibling) return new Dom7([this[0].previousElementSibling]);
                        else return new Dom7([]);
                    }
                }
                else return new Dom7([]);
            },
            prevAll: function (selector) {
                var prevEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.previousElementSibling) {
                    var prev = el.previousElementSibling;
                    if (selector) {
                        if($(prev).is(selector)) prevEls.push(prev);
                    }
                    else prevEls.push(prev);
                    el = prev;
                }
                return new Dom7(prevEls);
            },
            parent: function (selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    if (selector) {
                        if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
                    }
                    else {
                        parents.push(this[i].parentNode);
                    }
                }
                return $($.unique(parents));
            },
            parents: function (selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    var parent = this[i].parentNode;
                    while (parent) {
                        if (selector) {
                            if ($(parent).is(selector)) parents.push(parent);
                        }
                        else {
                            parents.push(parent);
                        }
                        parent = parent.parentNode;
                    }
                }
                return $($.unique(parents));
            },
            find : function (selector) {
                var foundElements = [];
                for (var i = 0; i < this.length; i++) {
                    var found = this[i].querySelectorAll(selector);
                    for (var j = 0; j < found.length; j++) {
                        foundElements.push(found[j]);
                    }
                }
                return new Dom7(foundElements);
            },
            children: function (selector) {
                var children = [];
                for (var i = 0; i < this.length; i++) {
                    var childNodes = this[i].childNodes;
    
                    for (var j = 0; j < childNodes.length; j++) {
                        if (!selector) {
                            if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
                        }
                        else {
                            if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
                        }
                    }
                }
                return new Dom7($.unique(children));
            },
            remove: function () {
                for (var i = 0; i < this.length; i++) {
                    if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
                }
                return this;
            },
            add: function () {
                var dom = this;
                var i, j;
                for (i = 0; i < arguments.length; i++) {
                    var toAdd = $(arguments[i]);
                    for (j = 0; j < toAdd.length; j++) {
                        dom[dom.length] = toAdd[j];
                        dom.length++;
                    }
                }
                return dom;
            }
        };
        $.fn = Dom7.prototype;
        $.unique = function (arr) {
            var unique = [];
            for (var i = 0; i < arr.length; i++) {
                if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
            }
            return unique;
        };
    
        return $;
    })();
    

    /*===========================
     Get Dom libraries
     ===========================*/
    var swiperDomPlugins = ['jQuery', 'Zepto', 'Dom7'];
    for (var i = 0; i < swiperDomPlugins.length; i++) {
    	if (window[swiperDomPlugins[i]]) {
    		addLibraryPlugin(window[swiperDomPlugins[i]]);
    	}
    }
    // Required DOM Plugins
    var domLib;
    if (typeof Dom7 === 'undefined') {
    	domLib = window.Dom7 || window.Zepto || window.jQuery;
    }
    else {
    	domLib = Dom7;
    }
    

    /*===========================
    Add .swiper plugin from Dom libraries
    ===========================*/
    function addLibraryPlugin(lib) {
        lib.fn.swiper = function (params) {
            var firstInstance;
            lib(this).each(function () {
                var s = new Swiper(this, params);
                if (!firstInstance) firstInstance = s;
            });
            return firstInstance;
        };
    }
    
    if (domLib) {
        if (!('transitionEnd' in domLib.fn)) {
            domLib.fn.transitionEnd = function (callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i, j, dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            };
        }
        if (!('transform' in domLib.fn)) {
            domLib.fn.transform = function (transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            };
        }
        if (!('transition' in domLib.fn)) {
            domLib.fn.transition = function (duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            };
        }
        if (!('outerWidth' in domLib.fn)) {
            domLib.fn.outerWidth = function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins)
                        return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));
                    else
                        return this[0].offsetWidth;
                }
                else return null;
            };
        }
    }
    

    window.Swiper = Swiper;
})();

/*===========================
Swiper AMD Export
===========================*/
if (true)
{
    module.exports = window.Swiper;
}
else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.Swiper;
    });
}

//# sourceMappingURL=maps/swiper.js.map


/***/ }),

/***/ "./src/app/Components/footer/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<section id=\"footer-page\" *ngIf=\"showFooter\">\n    <div class=\"footer-global\">\n        <div class=\"footer-info-section\">\n            <div id=\"fta\" class=\"footer-about footer-size\">\n                <h5>About Wittycircle</h5>\n                <ul id=\"ftal\" class=\"footer-list\">\n                    <li><a href=\"/terms\">Terms of use</a></li>\n                    <li><a href=\"/privacy\">Privacy settings</a></li>\n                </ul>\n            </div>\n            <div id=\"fte\" class=\"footer-explore footer-size\">\n                <h5>Explore Projects</h5>\n                <div id=\"ftel\" class=\"footer-list\">\n                    <ul>\n                        <li><a [routerLink]=\"['/discover']\" [queryParams]=\"{category: 'Art'}\">Art</a></li>\n                        <li><a [routerLink]=\"['/discover']\" [queryParams]=\"{category: 'Craft'}\">Craft</a></li>\n                        <li><a [routerLink]=\"['/discover']\" [queryParams]=\"{category: 'Design'}\">Design</a></li>\n                        <li><a [routerLink]=\"['/discover']\" [queryParams]=\"{category: 'Fashion'}\">Fashion</a></li>\n                        <li><a [routerLink]=\"['/discover']\" [queryParams]=\"{category: 'Film & Video'}\">Film & Video</a></li>\n                        <li><a [routerLink]=\"['/discover']\" [queryParams]=\"{category: 'Food'}\">Food</a></li>\n                        <li><a [routerLink]=\"['/discover']\" [queryParams]=\"{category: 'Games'}\">Games</a></li>\n                        <li><a [routerLink]=\"['/discover']\" [queryParams]=\"{category: 'Green'}\">Green</a></li>\n                    </ul>\n\n                    <ul class=\"footer-explore-more\">\n                        <li><a [routerLink]=\"['/discover']\" [queryParams]=\"{category: 'Heritage'}\">Heritage</a></li>\n                        <li><a [routerLink]=\"['/discover']\" [queryParams]=\"{category: 'Charity'}\">Charity</a></li>\n                        <li><a [routerLink]=\"['/discover']\" [queryParams]=\"{category: 'Music'}\">Music</a></li>\n                        <li><a [routerLink]=\"['/discover']\" [queryParams]=\"{category: 'Publishing'}\">Publishing</a></li>\n                        <li><a [routerLink]=\"['/discover']\" [queryParams]=\"{category: 'Science'}\">Science</a></li>\n                        <li><a [routerLink]=\"['/discover']\" [queryParams]=\"{category: 'Sport'}\">Sport</a></li>\n                        <li><a [routerLink]=\"['/discover']\" [queryParams]=\"{category: 'Technology'}\">Technology</a></li>\n                        <li><a [routerLink]=\"['/discover']\">More...</a></li>\n                    </ul>\n                </div>\n            </div>\n            <div id=\"ftm\" class=\"footer-meet footer-size\">\n                <h5>Meet...</h5>\n                <div id=\"ftml\" class=\"footer-list\">\n                    <ul>\n                        <li><a [routerLink]=\"['/meet']\" [queryParams]=\"{skills: 'Graphic Design, Product Design'}\">Designers</a></li>\n                        <li><a [routerLink]=\"['/meet']\" [queryParams]=\"{skills: 'Content Writting'}\">Writers</a></li>\n                        <li><a [routerLink]=\"['/meet']\" [queryParams]=\"{skills: 'Web Development, Computer Engineering'}\">Developers</a></li>\n                        <li><a [routerLink]=\"['/meet']\" [queryParams]=\"{skills: 'Manufacturing Design, Electronics'}\">Engineers</a></li>\n                    </ul>\n\n                    <ul class=\"footer-meet-more\">\n                        <li><a [routerLink]=\"['/meet']\" [queryParams]=\"{skills: 'Entrepreneurship, Business Development'}\">Business developers</a></li>\n                        <li><a [routerLink]=\"['/meet']\" [queryParams]=\"{skills: 'Civil Law, Contract Law'}\">Legal advisors</a></li>\n                        <li><a [routerLink]=\"['/meet']\">More...</a></li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"footer-brand-copyright\">\n            <div class=\"footer-brand-logo\">\n                <figure>\n                    <img src=\"/public/images/new-logo.svg\" atl=\"witty-logo\">\n                </figure>\n            </div>\n            <div class=\"footer-copyright\">\n                <span class=\"copyright\">&copy; 2017 Wittycircle Inc. 169th 11th St San Francisco, CA.</span>\n            </div>\n            <div class=\"footer-social-media\">\n                <ul>\n                    <li class=\"fb\"><a href=\"https://www.facebook.com/wittycircle\" class=\"fb-logo\" target=\"_blank\"></a></li>\n                    <li class=\"tw\"><a href=\"https://twitter.com/wittycircle\" class=\"tw-logo\" target=\"_blank\"></a></li>\n                </ul>\n            </div>\n        </div>\n    </div>\n</section>\n\n"

/***/ }),

/***/ "./src/app/Components/footer/footer.component.scss":
/***/ (function(module, exports) {

module.exports = "#footer-page {\n  background-color: #222222;\n  height: auto;\n  width: 100%;\n  border-top: 1px solid #767373;\n  text-align: center;\n  position: relative; }\n  #footer-page .footer-global {\n    max-width: 1000px;\n    margin-left: auto;\n    margin-right: auto; }\n  #footer-page .footer-global .footer-info-section {\n      margin-top: 45px;\n      border-bottom: 1px solid black;\n      text-align: left; }\n  #footer-page .footer-global .footer-info-section .footer-about {\n        display: inline-block;\n        text-align: left;\n        width: 220px;\n        margin-right: 40px; }\n  #footer-page .footer-global .footer-info-section .footer-explore {\n        display: inline-block;\n        text-align: left; }\n  #footer-page .footer-global .footer-info-section .footer-explore ul {\n          display: inline-block;\n          width: 150px; }\n  #footer-page .footer-global .footer-info-section .footer-explore .footer-explore-more {\n          float: right; }\n  #footer-page .footer-global .footer-info-section .footer-meet {\n        display: inline-block;\n        text-align: left; }\n  #footer-page .footer-global .footer-info-section .footer-meet ul {\n          display: inline-block;\n          width: 150px; }\n  #footer-page .footer-global .footer-info-section .footer-meet .footer-meet-more {\n          float: right; }\n  #footer-page .footer-global .footer-info-section .footer-size {\n        position: initial;\n        margin-top: 20px;\n        margin-bottom: 40px;\n        vertical-align: top;\n        padding-left: 15px;\n        padding-right: 15px; }\n  #footer-page .footer-global .footer-info-section .footer-size h5 {\n          font-family: 'FreigSem';\n          margin-bottom: 10px;\n          font-size: 18px; }\n  #footer-page .footer-global .footer-info-section .footer-size li {\n          cursor: pointer;\n          color: white;\n          font-family: 'FreigLight';\n          font-size: 14px; }\n  #footer-page .footer-global .footer-info-section .footer-size li:hover {\n          text-decoration: underline; }\n  #footer-page .footer-global .footer-brand-copyright {\n      padding: 0 15px 60px 15px;\n      margin-top: 40px;\n      text-align: left; }\n  #footer-page .footer-global .footer-brand-copyright .footer-brand-logo {\n        display: inline-block;\n        margin-right: 10px; }\n  #footer-page .footer-global .footer-brand-copyright .footer-brand-logo figure img {\n          width: 60px;\n          height: auto;\n          vertical-align: middle; }\n  #footer-page .footer-global .footer-brand-copyright .footer-copyright {\n        display: inline-block;\n        padding-right: 10px;\n        padding-left: 10px; }\n  #footer-page .footer-global .footer-brand-copyright .footer-copyright span {\n          font-family: 'FreigLight';\n          font-size: 14px;\n          color: white; }\n  #footer-page .footer-global .footer-brand-copyright .footer-social-media {\n        display: inline-block;\n        position: relative;\n        float: right;\n        margin-right: 10px;\n        margin-left: 10px; }\n  #footer-page .footer-global .footer-brand-copyright .footer-social-media li {\n          display: inline-block; }\n  #footer-page .footer-global .footer-brand-copyright .footer-social-media li a {\n            width: 24px;\n            height: 24px;\n            margin-right: 6px;\n            margin-left: 6px; }\n  #footer-page .footer-global .footer-brand-copyright .footer-social-media li a.fb-logo {\n            display: block;\n            background-image: url(\"/public/images/social_media/facebook-logo.png\");\n            background-size: 11px;\n            background-repeat: no-repeat;\n            background-position: center; }\n  #footer-page .footer-global .footer-brand-copyright .footer-social-media li a.tw-logo {\n            display: block;\n            position: relative;\n            top: 2px;\n            background-image: url(\"/public/images/social_media/twitter-logo.png\");\n            background-size: 100%;\n            background-repeat: no-repeat; }\n  #footer-page .footer-global .footer-brand-copyright .footer-social-media li a.gp-logo {\n            display: block;\n            background-image: url(\"/public/images/social_media/googleplus-logo.png\");\n            background-size: 100%;\n            background-repeat: no-repeat; }\n  #footer-page .footer-global .footer-brand-copyright .footer-social-media li a.ln-logo {\n            display: block;\n            background-image: url(\"/public/images/social_media/linkedin-logo.png\");\n            background-size: 100%;\n            background-repeat: no-repeat; }\n  /*********************** MEDIA QUERIES MOBILE WIDTH \\*320px to 800px*\\ **************************/\n  @media only screen and (max-width: 736px) {\n  #footer-page .footer-global .footer-info-section {\n    margin-top: 0px;\n    padding: 0 20px;\n    text-align: left;\n    border-bottom: none; }\n    #footer-page .footer-global .footer-info-section h5 {\n      background-image: url(\"/public/images/arrow-down-icon-w.svg\");\n      background-repeat: no-repeat;\n      background-position: 99% 50%; }\n    #footer-page .footer-global .footer-info-section .footer-about {\n      margin-right: 0; }\n    #footer-page .footer-global .footer-info-section .footer-explore ul {\n      width: 130px; }\n    #footer-page .footer-global .footer-info-section .footer-explore .footer-explore-more {\n      float: none; }\n    #footer-page .footer-global .footer-info-section .footer-meet ul {\n      width: 130px; }\n    #footer-page .footer-global .footer-info-section .footer-meet .footer-meet-more {\n      position: relative;\n      float: none;\n      bottom: 17.5px; }\n    #footer-page .footer-global .footer-info-section .footer-size {\n      width: 100%;\n      margin-top: 0px;\n      margin-bottom: 0px;\n      border-bottom: 1px solid black;\n      padding: 0; }\n      #footer-page .footer-global .footer-info-section .footer-size h5 {\n        margin: 20px 0; }\n    #footer-page .footer-global .footer-info-section .footer-list {\n      display: none;\n      margin-bottom: 20px; }\n  #footer-page .footer-global .footer-brand-copyright {\n    text-align: center;\n    padding: 0 15px 20px 15px; }\n    #footer-page .footer-global .footer-brand-copyright .footer-brand-logo {\n      display: block;\n      margin: 0 0 10px 0; }\n    #footer-page .footer-global .footer-brand-copyright .footer-copyright {\n      display: block;\n      margin-bottom: 10px; }\n    #footer-page .footer-global .footer-brand-copyright .footer-social-media {\n      display: block;\n      float: none; } }\n"

/***/ }),

/***/ "./src/app/Components/footer/footer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
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

var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
        this.showFooter = false;
    }
    FooterComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.showFooter = true;
        }, 1500);
    };
    FooterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__("./src/app/Components/footer/footer.component.html"),
            styles: [__webpack_require__("./src/app/Components/footer/footer.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());

//# sourceMappingURL=footer.component.js.map

/***/ }),

/***/ "./src/app/Components/footer/footer.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__footer_component__ = __webpack_require__("./src/app/Components/footer/footer.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



/* Components */

/* Services */
/* Directive */
/* Librairies */
var FooterModule = /** @class */ (function () {
    function FooterModule() {
    }
    FooterModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["f" /* RouterModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__footer_component__["a" /* FooterComponent */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__footer_component__["a" /* FooterComponent */]
            ],
            providers: []
        })
    ], FooterModule);
    return FooterModule;
}());

//# sourceMappingURL=footer.module.js.map

/***/ }),

/***/ "./src/app/Interfaces/Constants/categories-constant.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return categories; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return homeCategories; });
var categories = [
    {
        id: 1,
        name: 'Art'
    },
    {
        id: 2,
        name: 'Craft'
    },
    {
        id: 3,
        name: 'Design'
    },
    {
        id: 4,
        name: 'Fashion'
    },
    {
        id: 5,
        name: 'Film & Video'
    },
    {
        id: 6,
        name: 'Food'
    },
    {
        id: 7,
        name: 'Games'
    },
    {
        id: 8,
        name: 'Green'
    },
    {
        id: 9,
        name: 'Heritage'
    },
    {
        id: 10,
        name: 'Charity'
    },
    {
        id: 11,
        name: 'Music'
    },
    {
        id: 12,
        name: 'Publishing'
    },
    {
        id: 14,
        name: 'Science'
    },
    {
        id: 15,
        name: 'Sport'
    },
    {
        id: 16,
        name: 'Technology'
    },
    {
        id: 17,
        name: 'Education'
    },
    {
        id: 18,
        name: 'Health'
    },
    {
        id: 19,
        name: 'Mobility'
    }
];
var homeCategories = [
    {
        id: 16,
        name: 'Technology'
    },
    {
        id: 1,
        name: 'Art'
    },
    {
        id: 2,
        name: 'Craft'
    },
    {
        id: 3,
        name: 'Design'
    },
    {
        id: 4,
        name: 'Fashion'
    },
    {
        id: 5,
        name: 'Film & Video'
    },
    {
        id: 6,
        name: 'Food'
    },
    {
        id: 7,
        name: 'Games'
    },
    {
        id: 8,
        name: 'Green'
    },
    {
        id: 9,
        name: 'Heritage'
    },
    {
        id: 10,
        name: 'Charity'
    },
    {
        id: 11,
        name: 'Music'
    },
    {
        id: 12,
        name: 'Publishing'
    },
    {
        id: 14,
        name: 'Science'
    },
    {
        id: 15,
        name: 'Sport'
    }
];
//# sourceMappingURL=categories-constant.js.map

/***/ }),

/***/ "./src/app/Interfaces/Constants/networks-constant.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return networks; });
var networks = [
    'Y Combinator',
    'TechStars',
    '500 Startups',
    'Hardware Club',
    'StartX',
    'Numa',
    'Station F',
    'Parisoma',
    'The Refiners'
];
//# sourceMappingURL=networks-constant.js.map

/***/ }),

/***/ "./src/app/Interfaces/Constants/search-profile.constant.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return searchProfile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return searchProfile2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return searchProfile3; });
var searchProfile = {
    "query": {
        "priority": 'location',
        "sort": {
            "field": "magic",
            "reverse": false
        },
        "members": [
            {
                "field": "skills",
                "value": ""
            },
            {
                "field": "about",
                "value": ""
            },
            {
                "field": "location",
                "value": ""
            },
            {
                "field": "network",
                "value": ""
            }
        ]
    },
    "paginate": {
        "limit": 24,
        "offset": 0
    }
};
var searchProfile2 = {
    "query": {
        "priority": 'location',
        "sort": {
            "field": "magic",
            "reverse": true
        },
        "members": [
            {
                "field": "skills",
                "value": ""
            },
            {
                "field": "about",
                "value": "to meet smart people"
            },
            {
                "field": "location",
                "value": ""
            },
            {
                "field": "network",
                "value": ""
            }
        ]
    },
    "paginate": {
        "limit": 24,
        "offset": 0
    }
};
var searchProfile3 = {
    "query": {
        "priority": '',
        "sort": {
            "field": "magic",
            "reverse": true
        },
        "members": [
            {
                "field": "skills",
                "value": ""
            },
            {
                "field": "about",
                "value": ""
            },
            {
                "field": "location",
                "value": ""
            },
            {
                "field": "network",
                "value": ""
            }
        ]
    },
    "paginate": {
        "limit": 24,
        "offset": 0
    }
};
//# sourceMappingURL=search-profile.constant.js.map

/***/ }),

/***/ "./src/app/Interfaces/Constants/search-project.constant.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return searchProject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return searchProject2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return searchProject3; });
/* unused harmony export searchProject4 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return skillTrending; });
var searchProject = {
    "query": {
        "priority": 'opening',
        "sort": {
            "field": "followers",
            "reverse": true
        },
        "members": [
            {
                "field": "status",
                "value": ""
            },
            {
                "field": "category",
                "value": ""
            },
            {
                "field": "opening",
                "value": "for anything"
            },
            {
                "field": "skills",
                "value": ""
            },
            {
                "field": "location",
                "value": ""
            },
            {
                "field": "network",
                "value": ""
            },
        ]
    },
    "paginate": {
        "limit": 18,
        "offset": 0
    }
};
var searchProject2 = {
    "query": {
        "priority": 'location',
        "sort": {
            "field": "magic",
            "reverse": false
        },
        "members": [
            {
                "field": "status",
                "value": ""
            },
            {
                "field": "category",
                "value": ""
            },
            {
                "field": "opening",
                "value": ""
            },
            {
                "field": "skills",
                "value": ""
            },
            {
                "field": "location",
                "value": ""
            },
            {
                "field": "network",
                "value": ""
            },
        ]
    },
    "paginate": {
        "limit": 18,
        "offset": 0
    }
};
var searchProject3 = {
    "query": {
        "priority": "location",
        "sort": {
            "field": "magic",
            "reverse": true
        },
        "members": [
            {
                "field": "status",
                "value": ""
            },
            {
                "field": "category",
                "value": ""
            },
            {
                "field": "opening",
                "value": ""
            },
            {
                "field": "skills",
                "value": ""
            },
            {
                "field": "location",
                "value": ""
            },
            {
                "field": "network",
                "value": ""
            },
        ]
    },
    "paginate": {
        "limit": 18,
        "offset": 0
    }
};
var searchProject4 = {
    "query": {
        "priority": 'opening',
        "sort": {
            "field": "last_upvoted",
            "reverse": true
        },
        "members": [
            {
                "field": "status",
                "value": ""
            },
            {
                "field": "category",
                "value": ""
            },
            {
                "field": "opening",
                "value": "to hire someone"
            },
            {
                "field": "skills",
                "value": ""
            },
            {
                "field": "location",
                "value": ""
            },
            {
                "field": "network",
                "value": ""
            },
        ]
    },
    "paginate": {
        "limit": 3,
        "offset": 0
    }
};
var skillTrending = ['Programming', 'Graphic Design', 'Javascript', 'Product Design', 'Business Development'];
//# sourceMappingURL=search-project.constant.js.map

/***/ }),

/***/ "./src/app/Services/Articles/articles.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticlesService; });
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




var ArticlesService = /** @class */ (function () {
    function ArticlesService(AuthHttp) {
        this.AuthHttp = AuthHttp;
    }
    // Add article's tag
    ArticlesService.prototype.addTag = function (body, article_id) {
        var url = 'http://localhost:3000/api/articles/' + article_id + '/article_tags';
        return this.AuthHttp.post(url, body)
            .map(function (res) { console.log(res); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    // Get all articles
    ArticlesService.prototype.getArticles = function () {
        var url = 'http://localhost:3000/api/articles';
        return this.AuthHttp.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    // Create new article
    ArticlesService.prototype.createArticle = function (body) {
        var url = 'http://localhost:3000/api/articles';
        return this.AuthHttp.post(url, body)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    // Update article
    ArticlesService.prototype.updateArticle = function (article_id, body) {
        var url = 'http://localhost:3000/api/articles/' + article_id;
        return this.AuthHttp.put(url, body)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    // Remove article
    ArticlesService.prototype.deleteArticle = function (article_id, body) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        var url = 'http://localhost:3000/api/articles/' + article_id;
        return this.AuthHttp.delete(url, new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({
            headers: headers,
            body: body
        }))
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    // Remove article's tag
    ArticlesService.prototype.deleteTag = function (article_id, article_tag_id) {
        var url = 'http://localhost:3000/api/articles/' + article_id + '/article_tags/' + article_tag_id;
        return this.AuthHttp.delete(url)
            .map(function (res) { console.log(res); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    /* ARTICLES COMMENTS */
    ArticlesService.prototype.getArticleComments = function (article_id) {
        var url = 'http://localhost:3000/api/articles/comment/' + article_id;
        return this.AuthHttp.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    ArticlesService.prototype.createArticleComments = function (article_id, body) {
        var url = 'http://localhost:3000/api/articles/comment/' + article_id;
        console.log(body);
        return this.AuthHttp.post(url, body)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    ArticlesService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_bearer__["AuthHttp"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng2_bearer__["AuthHttp"]) === "function" && _a || Object])
    ], ArticlesService);
    return ArticlesService;
    var _a;
}());

//# sourceMappingURL=articles.service.js.map

/***/ }),

/***/ "./src/app/Services/Backoffice/backoffice.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackofficeService; });
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




var BackofficeService = /** @class */ (function () {
    function BackofficeService(AuthHttp) {
        this.AuthHttp = AuthHttp;
    }
    BackofficeService.prototype.getStatsAnalytic = function () {
        var url = 'http://localhost:3000/api/statistics/backoffice/all';
        return this.AuthHttp.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    BackofficeService.prototype.getProjects = function () {
        var url = 'http://localhost:3000/api/admin_panel/statistics/projects';
        return this.AuthHttp.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    BackofficeService.prototype.getUsers = function () {
        var url = 'http://localhost:3000/api/admin_panel/statistics/users';
        return this.AuthHttp.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    BackofficeService.prototype.getAmbassadors = function () {
        var url = 'http://localhost:3000/api/admin_panel/uc/ambassadors';
        return this.AuthHttp.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    BackofficeService.prototype.setAmbassador = function (body) {
        var url = 'http://localhost:3000/api/admin_panel/uc/ambassadors';
        return this.AuthHttp.post(url, body)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    BackofficeService.prototype.removeAmbassador = function (body) {
        var url = 'http://localhost:3000/api/admin_panel/uc/ambassadors';
        return this.AuthHttp.put(url, body)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    BackofficeService.prototype.getSelfPostProjects = function () {
        var url = 'http://localhost:3000/api/admin_panel/projects';
        return this.AuthHttp.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    BackofficeService.prototype.sendProjectInvitation = function (body) {
        var url = 'http://localhost:3000/api/admin_panel/projects';
        return this.AuthHttp.post(url, body)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    BackofficeService.prototype.updateProjectCreator = function (token, body) {
        var url = 'http://localhost:3000/api/admin_panel/projects/' + token;
        return this.AuthHttp.post(url, body)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    BackofficeService.prototype.getSelectedProjectsProfiles = function (type) {
        var url = 'http://localhost:3000/api/admin_panel/selected/projects/profiles/' + type;
        return this.AuthHttp.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    BackofficeService.prototype.addSelectedProjectsProfiles = function (type, body) {
        var url = 'http://localhost:3000/api/admin_panel/selected/projects/profiles/' + type;
        return this.AuthHttp.post(url, body)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    BackofficeService.prototype.removeSelectedProjectsProfiles = function (type, body) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var url = 'http://localhost:3000/api/admin_panel/selected/projects/profiles/' + type;
        return this.AuthHttp.delete(url, new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({
            headers: headers,
            body: body
        }))
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    BackofficeService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_bearer__["AuthHttp"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng2_bearer__["AuthHttp"]) === "function" && _a || Object])
    ], BackofficeService);
    return BackofficeService;
    var _a;
}());

//# sourceMappingURL=backoffice.service.js.map

/***/ }),

/***/ "./src/app/Services/Networks/networks.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NetworksService; });
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



var NetworksService = /** @class */ (function () {
    function NetworksService(AuthHttp) {
        this.AuthHttp = AuthHttp;
    }
    NetworksService.prototype.getNetworks = function (from) {
        var url = 'http://localhost:3000/api/networks/' + from;
        return this.AuthHttp.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    NetworksService.prototype.getNetworksComplete = function (from) {
        var url = 'http://localhost:3000/api/networks/' + from + '/complete';
        return this.AuthHttp.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    NetworksService.prototype.joinNetwork = function (body) {
        var url = 'http://localhost:3000/api/networks/join';
        return this.AuthHttp.post(url, body)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    NetworksService.prototype.validationNetwork = function (token) {
        var url = 'http://localhost:3000/api/networks/join/' + token;
        return this.AuthHttp.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    NetworksService.prototype.createNetworkInvitation = function (body) {
        var url = 'http://localhost:3000/api/networks/admin';
        return this.AuthHttp.post(url, body)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    NetworksService.prototype.getNetworkInvitation = function (token) {
        var url = 'http://localhost:3000/api/networks/admin/' + token;
        return this.AuthHttp.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    NetworksService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_bearer__["AuthHttp"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng2_bearer__["AuthHttp"]) === "function" && _a || Object])
    ], NetworksService);
    return NetworksService;
    var _a;
}());

//# sourceMappingURL=networks.service.js.map

/***/ }),

/***/ "./src/app/Services/Statistics/statistics.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatisticsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("./node_modules/rxjs/_esm5/Rx.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var StatisticsService = /** @class */ (function () {
    function StatisticsService(http) {
        this.http = http;
    }
    StatisticsService.prototype.getNetworkGroup = function (name) {
        var url = 'http://localhost:3000/api/statistics/network/' + name + '/projects';
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    StatisticsService.prototype.getNetworksProfiles = function (name) {
        var url = 'http://localhost:3000/api/statistics/network/' + name + '/allprofiles';
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    StatisticsService.prototype.getNetworksProjects = function (name) {
        var url = 'http://localhost:3000/api/statistics/network/' + name + '/allprojects';
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    StatisticsService.prototype.getUserStatistics = function (profile_id) {
        var url = 'http://localhost:3000/api/statistics/profiles/' + profile_id;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(JSON.parse(JSON.stringify(error))); });
    };
    StatisticsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
    ], StatisticsService);
    return StatisticsService;
    var _a;
}());

//# sourceMappingURL=statistics.service.js.map

/***/ }),

/***/ "./src/public/styles/need-card.scss":
/***/ (function(module, exports) {

module.exports = ".needs-card {\n  width: 240px;\n  margin: 0 10px;\n  margin-bottom: 20px;\n  border: 1px solid #e5e5e5;\n  border-radius: 4px;\n  overflow: hidden; }\n  .needs-card .nc-header {\n    position: relative;\n    width: inherit;\n    height: 100px; }\n  .needs-card .nc-header .filter-need {\n      position: absolute;\n      width: inherit;\n      height: inherit;\n      background: rgba(0, 0, 0, 0.5);\n      /* background: -webkit-linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9));\n\t\t    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9));*/ }\n  .needs-card .nc-header h3 {\n      position: relative;\n      font-size: 18px;\n      padding-left: 15px;\n      padding-right: 15px; }\n  .needs-card .nc-header h3 span {\n        font-size: 18px; }\n  .needs-card .nc-body {\n    padding: 20px;\n    background-color: #fff; }\n  .needs-card .nc-body p {\n      height: 120px;\n      overflow-y: auto;\n      color: #222; }\n  .needs-card .nc-body ul {\n      height: 80px;\n      overflow-y: auto;\n      -webkit-box-align: baseline;\n          -ms-flex-align: baseline;\n              align-items: baseline;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: column;\n              flex-direction: column; }\n  .needs-card .nc-body ul li {\n        margin-right: 5px;\n        margin-bottom: 5px;\n        font-size: 12px;\n        padding: 2px 5px;\n        text-transform: uppercase;\n        background-color: #222;\n        border-radius: 4px;\n        white-space: nowrap; }\n  .needs-card .nc-footer {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    padding: 15px 0;\n    border-top: 1px dashed #e5e5e5; }\n  .needs-card .nc-footer h4 {\n      color: #6e6e6e; }\n  .needs-card .nc-footer i {\n      text-align: center; }\n  .needs-card .nc-footer .fa-pencil-square-o, .needs-card .nc-footer .fa-trash-o {\n      color: #999;\n      font-size: 18px;\n      margin: 0 15px; }\n  .needs-card .nc-footer .fa-pencil-squre-o:hover {\n      color: #FF4D4D; }\n  .needs-card .nc-footer .fa-trash-0:hover {\n      color: #FF4D4D; }\n  .add-card {\n  padding: 141px 40px;\n  text-align: center;\n  border-radius: 6px;\n  border: 2px dashed #e5e5e5; }\n  .add-card .plus-add i, .add-card .plus-add span {\n    color: #FF4D4D; }\n  .add-card p {\n    color: #999; }\n  .add-card:hover {\n  border: 2px dashed #999; }\n"

/***/ }),

/***/ "./src/public/styles/presentation.scss":
/***/ (function(module, exports) {

module.exports = "/*** DISCOVER ***/\n.presentation-component {\n  position: absolute;\n  width: 900px;\n  z-index: 20;\n  text-align: left;\n  top: 100px;\n  left: 0;\n  right: 0;\n  margin: 0 auto; }\n.presentation-component h2 {\n    font-family: 'FreigLight';\n    font-size: 24px;\n    color: white; }\n.presentation-component .discover-search2-textarticle {\n    display: inline-block; }\n.presentation-component .searchbox {\n    border-radius: 4px;\n    cursor: pointer;\n    background-color: rgba(20, 20, 20, 0.5); }\n.presentation-component .searchbox h2 {\n      padding-top: 6px;\n      padding-bottom: 6px; }\n.presentation-component img {\n    display: inline-block;\n    width: 12px;\n    margin: 0 8px; }\n.presentation-component .presentation-title {\n    padding-top: 15px;\n    padding-bottom: 10px; }\n.presentation-component .presentation-title h2 {\n      font-family: 'FreigSem';\n      font-size: 28px; }\n.presentation-component .inputfield input {\n    width: 130px;\n    padding-right: 10px;\n    padding-left: 10px;\n    color: #999999;\n    font-size: 24px;\n    font-family: 'FreigLight';\n    border: none;\n    border-radius: 5px;\n    background-color: rgba(20, 20, 20, 0.5);\n    cursor: pointer;\n    -webkit-transition: all 100ms linear;\n    -kthtml-transition: all 100ms linear;\n    transition: all 100ms linear; }\n.presentation-component .inputfield input:focus {\n    color: white; }\n.presentation-component label {\n    position: absolute;\n    font-family: 'FreigLight';\n    pointer-events: none;\n    font-weight: 300;\n    font-size: 24px;\n    color: rgba(255, 255, 255, 0.9);\n    margin-top: -37px;\n    margin-left: 12px; }\n.downbox {\n  position: absolute;\n  background-color: white;\n  z-index: 1000;\n  border: 1px solid #999999;\n  border-radius: 8px;\n  width: 280px; }\n.downbox li {\n    padding: 6px 20px 6px 20px;\n    font-family: 'FreigBook';\n    color: #222222;\n    font-size: 18px; }\n.downbox li:hover {\n    border-radius: 8px;\n    background-color: #F5F5F5; }\n.downbox ul {\n    padding-bottom: 10px;\n    margin-top: 8px; }\n.presentation-body-container {\n  max-width: 1000px;\n  margin: 0 auto; }\n.presentation-body-title {\n  text-align: center;\n  padding: 45px 20px 60px 20px; }\n.presentation-body-title h4 {\n    font-family: 'FreigMed';\n    font-size: 16px;\n    color: #2b2b2b; }\n.presentation-body-title h4 strong {\n      color: #ff4d4d; }\n.presentation-body-title h4 span {\n      color: #ff4d4d; }\n.presentation-search2 {\n  position: absolute;\n  padding: 20px 0;\n  width: 900px;\n  left: 0;\n  right: 0;\n  margin: 0 auto;\n  margin-top: 50px;\n  top: 260px; }\n.presentation-search2 h3 {\n    font-family: 'FreigBook';\n    font-size: 18px; }\n.presentation-search2 .inline {\n    display: inline-block; }\n.presentation-search2 li {\n    font-family: 'FreigBook';\n    color: #222222;\n    font-size: 18px; }\n.presentation-search2 li sup {\n      color: #999999;\n      margin-left: 5px; }\n.presentation-search2 img {\n    position: relative;\n    top: 1px; }\n.presentation-search2 .presentation-search2-left {\n    cursor: pointer;\n    width: 250px; }\n.presentation-search2 .presentation-search2-left .presentation-search2-left-box {\n      position: absolute;\n      background-color: white;\n      border: 1px solid #e5e5e5;\n      border-radius: 4px;\n      padding: 5px 10px;\n      display: none; }\n.presentation-search2 .presentation-search2-left .presentation-search2-left-box li {\n        padding: 2px 10px; }\n.presentation-search2 .presentation-search2-right {\n    /*\t\t\tfloat: right;\n*/\n    width: 900px;\n    text-align: left;\n    /*\t\t\tmargin-right: 50px;\n*/ }\n.presentation-search2 .presentation-search2-right .presentation-search2-right-input {\n      display: inline-block;\n      /*\t\t\t\tmargin-right: 20px;\n*/ }\n.presentation-search2 .presentation-search2-right .presentation-search2-right-input .network-box {\n        /*\t\t\t\tdisplay: none;\n*/\n        background-color: rgba(20, 20, 20, 0.5);\n        padding: 5px 10px;\n        border-radius: 4px; }\n.presentation-search2 .presentation-search2-right .presentation-search2-right-input .network-box img {\n          width: 12px;\n          margin-left: 10px; }\n.presentation-search2 .presentation-search2-right .presentation-search2-right-input .network-search .network-dropdown {\n        display: none;\n        padding: 10px 0px;\n        border: 1px solid #999999;\n        width: auto;\n        min-width: 240px; }\n.presentation-search2 .presentation-search2-right .presentation-search2-right-input .network-search .network-dropdown h3 {\n          font-family: 'FreigBook';\n          color: #999999;\n          font-size: 19px;\n          padding: 8px 20px; }\n.presentation-search2 .presentation-search2-right .presentation-search2-right-input input {\n        margin: 0;\n        border: none;\n        border-radius: 0;\n        font-family: 'FreigBook';\n        font-size: 18px;\n        color: white;\n        background-color: transparent;\n        border-bottom: 1px solid #999999;\n        width: 260px;\n        padding: 0 0 0 0px; }\n.presentation-search2 .presentation-search2-right .presentation-search2-right-box {\n      margin-left: auto;\n      margin-right: 10px;\n      padding-right: 70px; }\n.presentation-forced-signup {\n  position: fixed;\n  bottom: -300px;\n  width: 100%;\n  text-align: center;\n  background-color: rgba(0, 0, 0, 0.8);\n  padding: 30px 15px;\n  z-index: 100000; }\n.presentation-forced-signup .crossover {\n    float: right;\n    position: relative;\n    bottom: 25px; }\n.presentation-forced-signup h5 {\n    font-family: 'FreigBook';\n    font-size: 20px;\n    margin-bottom: 20px; }\n.presentation-forced-signup h5 a {\n      border-bottom: 1px solid white; }\n.presentation-forced-signup button {\n    background-color: white;\n    color: black;\n    margin: 0 auto;\n    padding: 10px 15px; }\n.presentation-forced-signup button img {\n      width: 24px;\n      margin-right: 10px; }\n.presentation-forced-signup button span {\n      color: #222; }\n.presentation-forced-signup ul {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n.presentation-forced-signup ul li {\n      padding: 3px 30px 5px 30px;\n      margin: 0 5px; }\n.presentation-forced-signup ul li img {\n        position: relative;\n        top: 2px;\n        width: 15px; }\n.presentation-forced-signup ul .presentation-forced-signup-mail {\n      border: 1px solid white;\n      border-radius: 4px; }\n.presentation-forced-signup ul .presentation-forced-signup-google {\n      background-color: white;\n      border: 1px solid white;\n      border-radius: 4px; }\n.presentation-forced-signup ul .presentation-forced-signup-facebook {\n      background-color: #46629E;\n      border: 1px solid #46629E;\n      border-radius: 4px; }\n.presentation-forced-signup ul .presentation-forced-signup-facebook:hover {\n      background-color: #344e7a;\n      border: 1px solid #344e7a; }\n.presentation-forced-signup ul .presentation-forced-signup-google:hover {\n      background-color: #E0E0E0;\n      color: #404040; }\n.presentation-forced-signup2 {\n  position: fixed;\n  bottom: -300px;\n  width: 100%;\n  text-align: center;\n  background-color: #fff;\n  padding: 20px 15px 25px 15px;\n  z-index: 100000;\n  border-top: 1px solid #efefef; }\n.presentation-forced-signup2 p {\n    color: #707070;\n    font-size: 16px;\n    margin-right: 35px; }\n.presentation-forced-signup2 button {\n    font-family: \"FreigMed\";\n    padding: 6px 25px 8px 25px;\n    font-size: 16px; }\n.presentation-forced-signup2 button span {\n      font-size: 14px; }\n.presentation-forced-signup2 .button2 {\n    background-color: #42cef4; }\n.presentation-forced-signup2 .pfs-text {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n"

/***/ }),

/***/ "./src/public/styles/profile-card.scss":
/***/ (function(module, exports) {

module.exports = "/***** PROFILE CARD *****/\n.profile-card {\n  display: inline-table;\n  width: 207px;\n  margin: 0px 16px 40px 16px;\n  border: 1px solid #E5E5E5;\n  border-radius: 4px;\n  background-color: white; }\n.profile-card .card-picture {\n    height: 40px;\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px;\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-position: center center; }\n.profile-card .card-picture .card-profile-picture {\n      position: relative;\n      width: 60px;\n      height: 60px;\n      border: 2px solid white;\n      border-radius: 50%;\n      bottom: 10px;\n      overflow: hidden;\n      margin-right: auto;\n      margin-left: auto;\n      background-size: auto 60px;\n      background-repeat: no-repeat;\n      background-position: center center; }\n.profile-card .card-rank {\n    position: absolute;\n    width: 207px;\n    margin-top: 42px;\n    text-align: right; }\n.profile-card .card-rank span {\n      font-family: 'FreigMed';\n      font-size: 14px;\n      color: #999999;\n      padding-right: 10px; }\n.profile-card .card-info {\n    padding: 15px;\n    width: 207px;\n    /*\t\tborder-bottom: 1px solid #e5e5e5;\n*/\n    overflow: hidden;\n    text-align: center; }\n.profile-card .card-info h4 {\n      height: 22px;\n      font-family: 'FreigSem';\n      font-size: 18px;\n      color: #222222;\n      margin-bottom: 4px;\n      word-break: break-word;\n      overflow-y: hidden; }\n.profile-card .card-info .card-location {\n      height: 14px; }\n.profile-card .card-info .card-location h6 {\n        font-family: 'FreigBook';\n        font-size: 13px;\n        color: #999999; }\n.profile-card .card-info .card-description {\n      margin-top: 10px;\n      height: 45px;\n      overflow: hidden; }\n.profile-card .card-info .card-description p {\n        font-family: 'FreigBook';\n        font-size: 14px;\n        color: #222222;\n        text-align: left;\n        word-break: break-word;\n        margin-bottom: 5px; }\n.profile-card .card-info .card-profile-skills {\n      text-align: left;\n      height: 38px;\n      margin-top: 2px;\n      overflow: hidden; }\n.profile-card .card-info .card-profile-skills li {\n        display: inline-block;\n        padding: 1px 6px 1px 6px;\n        font-family: 'FreigSem';\n        font-size: 11px;\n        color: white;\n        text-transform: uppercase;\n        background-color: black;\n        border-radius: 4px;\n        margin-right: 5px;\n        margin-bottom: 1px; }\n.profile-card .card-status {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    padding-bottom: 15px; }\n.profile-card .card-status img {\n      margin-right: 5px; }\n.profile-card .card-status p {\n      color: #999;\n      font-size: 14px;\n      margin-bottom: 0; }\n.profile-card .card-status .tooltipw {\n      width: 200px;\n      padding: 10px 15px;\n      background-color: #222;\n      opacity: 95%;\n      -webkit-transform: translateY(10px);\n      transform: translateY(10px); }\n.profile-card .card-status .tooltipw:after {\n      border-top: none;\n      bottom: 0px;\n      border-bottom: solid #222 6px;\n      top: -5px; }\n.profile-card .card-status:hover .tooltipw {\n    opacity: 1;\n    pointer-events: auto;\n    -webkit-transform: translateY(36px);\n    transform: translateY(36px); }\n.profile-card .card-follow {\n    display: table;\n    width: 100%;\n    table-layout: fixed;\n    text-align: center; }\n.profile-card .card-follow p {\n      font-size: 14px;\n      color: #222; }\n.profile-card .card-follow h6 {\n      font-size: 12px;\n      color: #222; }\n.profile-card .card-follow .fa-check, .profile-card .card-follow .fa-plus {\n      color: #416299; }\n.profile-card .card-follow .cf-follower, .profile-card .card-follow .cf-following, .profile-card .card-follow .cf-follow {\n      display: table-cell;\n      padding: 10px 0; }\n.profile-card .card-follow .cf-follower, .profile-card .card-follow .cf-following {\n      border-right: 1px solid #e5e5e5; }\n.profile-card .card-follow .cf-follow {\n      vertical-align: middle; }\n.profile-card .card-follow .cf-follow .tooltipw {\n        margin-top: -30px; }\n.profile-card .card-follow .cf-follow:hover {\n      background-color: #F5F5F5; }\n.profile-card .card-follow .cf-follow:hover .tooltipw {\n        opacity: 1;\n        pointer-events: auto;\n        -webkit-transform: translateY(0px);\n        transform: translateY(0px); }\n.profile-card .card-follow .cf-follow:hover .fa-plus {\n        color: #999999; }\n.profile-card .card-follow .cf-follow:hover .fa-check {\n        color: #999999; }\n/******************** MOBILE ****************************/\n@media only screen and (max-width: 736px) {\n  .profile-card .card-info .card-profile-skills {\n    height: 41px; } }\n"

/***/ }),

/***/ "./src/public/styles/project-card.scss":
/***/ (function(module, exports) {

module.exports = "/***** PROJECT CARD *****/\n.project-card {\n  margin: 0 16px 40px 16px;\n  display: inline-block;\n  position: relative;\n  width: 287px;\n  height: 418px;\n  border: 1px solid #E5E5E5;\n  border-radius: 5px;\n  cursor: pointer;\n  vertical-align: top;\n  /*    overflow: hidden;\n*/ }\n.project-card .card-tag .card-tag-content {\n    position: absolute;\n    margin-top: 19px;\n    margin-left: 20px;\n    z-index: 40; }\n.project-card .card-tag .card-tag-content .card-tag-bg {\n      position: absolute;\n      background-color: #222222;\n      opacity: 0.8;\n      border-radius: 4px;\n      height: 24px;\n      width: 100%;\n      margin-top: -1px;\n      -webkit-transition: all 100ms linear;\n      -kthtml-transition: all 100ms linear;\n      transition: all 100ms linear; }\n.project-card .card-tag .card-tag-content img {\n      position: relative;\n      display: inline-block;\n      margin-left: 10px;\n      margin-top: 1px;\n      width: 16px;\n      height: 16px;\n      z-index: 100;\n      vertical-align: middle; }\n.project-card .card-tag .card-tag-content h5 {\n      position: relative;\n      display: inline-block;\n      margin-right: 10px;\n      top: 1px;\n      font-family: 'FreigSem';\n      font-size: 13px;\n      text-transform: uppercase;\n      z-index: 100; }\n.project-card .card-tag-content:hover > .card-tag-bg {\n    -webkit-transform: scale(1.02, 1.1);\n            transform: scale(1.02, 1.1); }\n.project-card .card-vote {\n    position: relative;\n    display: inline-block;\n    float: right;\n    height: 24px;\n    margin-top: 19px;\n    margin-right: 20px;\n    z-index: 40; }\n.project-card .card-vote .card-vote-bg {\n      position: absolute;\n      width: 100%;\n      height: 24px;\n      background-color: #222222;\n      opacity: 0.8;\n      border-radius: 4px;\n      margin-top: -1px;\n      -webkit-transition: all 100ms linear;\n      -kthtml-transition: all 100ms linear;\n      transition: all 100ms linear; }\n.project-card .card-vote img {\n      position: relative;\n      z-index: 100;\n      height: 9px;\n      width: auto;\n      margin-left: 10px; }\n.project-card .card-vote span {\n      position: relative;\n      z-index: 100;\n      font-family: 'Arial';\n      font-size: 14px;\n      font-weight: 600;\n      top: 1px;\n      margin-right: 10px;\n      color: white; }\n.project-card .card-vote:hover > .card-vote-bg {\n    -webkit-transform: scale(1.05, 1.1);\n            transform: scale(1.05, 1.1); }\n.project-card .card-vote:active > .card-vote-bg {\n    -webkit-transform: scale(1.2, 1.3);\n            transform: scale(1.2, 1.3); }\n.project-card .filter_private {\n    background-color: rgba(0, 0, 0, 0.6);\n    height: inherit;\n    width: inherit;\n    z-index: 60000;\n    text-align: center; }\n.project-card .filter_private .private_text {\n      color: white;\n      font-family: 'FreigMed';\n      font-size: 18px;\n      position: relative;\n      top: 70px; }\n.project-card .card-picture {\n    height: 180px;\n    background-size: 300px 180px;\n    background-repeat: no-repeat;\n    background-position: center center; }\n.project-card .card-picture img {\n      position: absolute;\n      height: 180px;\n      width: 100%;\n      border-top-right-radius: 4px;\n      border-top-left-radius: 4px; }\n.project-card .card-info {\n    padding: 15px 20px 10px 20px;\n    background-color: white;\n    text-align: left; }\n.project-card .card-info .card-title-space {\n      height: 40px;\n      margin-bottom: 4px;\n      overflow: hidden; }\n.project-card .card-info .card-title-space h4 {\n        font-family: 'FreigSem';\n        font-size: 18px;\n        color: #222222;\n        line-height: 20px;\n        vertical-align: center; }\n.project-card .card-info span {\n      display: list-item;\n      list-style-type: none;\n      font-family: 'FreigBook';\n      font-size: 14px;\n      color: #999999; }\n.project-card .card-info .card-status span {\n      display: inline-block; }\n.project-card .card-info .card-status img {\n      display: inline-block;\n      position: relative;\n      bottom: 2px;\n      margin-right: 3px;\n      vertical-align: middle; }\n.project-card .card-info .card-location span {\n      display: inline-block; }\n.project-card .card-info .card-location img {\n      display: inline-block;\n      position: relative;\n      bottom: 2px;\n      margin-right: 8px;\n      margin-left: 1px;\n      vertical-align: middle; }\n.project-card .card-info .card-description-text {\n      height: 50px;\n      margin-bottom: 5px;\n      overflow: hidden; }\n.project-card .card-info .card-description-text p {\n        margin: 10px 0 0 0;\n        font-family: 'FreigBook';\n        font-size: 14px;\n        color: #222222;\n        line-height: 21px; }\n.project-card .card-info .card-need {\n      margin-bottom: 20px; }\n.project-card .card-info .card-need img {\n        margin-right: 5px; }\n.project-card .card-info .card-need p {\n        color: #999;\n        font-size: 14px;\n        margin-bottom: 0; }\n.project-card .card-info .card-need .tooltipw {\n        width: 180px;\n        padding: 10px 15px;\n        z-index: 1000;\n        background-color: #222;\n        opacity: 95%;\n        -webkit-transform: translateY(10px);\n        transform: translateY(10px); }\n.project-card .card-info .card-need .tooltipw:after {\n        border-top: none;\n        bottom: 0px;\n        left: 0;\n        margin-left: 30px;\n        border-bottom: solid #222 6px;\n        top: -5px; }\n.project-card .card-info .card-need:hover .tooltipw {\n      opacity: 1;\n      pointer-events: auto;\n      -webkit-transform: translateY(45px);\n      transform: translateY(45px); }\n.project-card .card-info .card-info-by {\n      position: absolute;\n      bottom: 0;\n      margin-bottom: 5px; }\n.project-card .card-info .card-info-by .card-info-by-picture {\n        border-radius: 50%;\n        overflow: hidden;\n        display: inline-block;\n        width: 30px;\n        height: 30px; }\n.project-card .card-info .card-info-by .card-info-by-picture img {\n          max-height: 100%; }\n.project-card .card-info .card-info-by h6 {\n        display: inline-block;\n        font-family: 'FreigBook';\n        font-size: 14px;\n        color: #999999;\n        margin-left: 5px;\n        position: relative;\n        bottom: 10px; }\n.project-card .card-info .card-info-by h6 span {\n          display: inline-block; }\n.project-card .card-info .card-info-by .card-info-users {\n        position: relative;\n        z-index: 1000000; }\n"

/***/ }),

/***/ "./src/public/styles/tooltip.scss":
/***/ (function(module, exports) {

module.exports = ".tooltipw {\n  display: block;\n  position: absolute;\n  background: black;\n  font-family: 'FreigSem';\n  font-size: 13px;\n  color: #fff;\n  opacity: 0;\n  padding: 3px 15px;\n  border-radius: 4px;\n  pointer-events: none;\n  -webkit-transform: translateY(10px);\n  transform: translateY(10px);\n  -webkit-transition: all .25s ease-out;\n  transition: all .25s ease-out;\n  -webkit-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);\n  -ms-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);\n  -o-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);\n  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28); }\n\n.tooltipw:before {\n  bottom: -20px;\n  content: \" \";\n  display: block;\n  height: 20px;\n  left: 0;\n  position: absolute; }\n\n.tooltipw:after {\n  border-left: solid transparent 6px;\n  border-right: solid transparent 6px;\n  border-top: solid black 6px;\n  bottom: -5px;\n  content: \" \";\n  height: 0;\n  left: 50%;\n  margin-left: -7px;\n  position: absolute; }\n"

/***/ })

});
//# sourceMappingURL=common.chunk.js.map