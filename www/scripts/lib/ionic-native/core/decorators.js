
define(['exports', 'ionic-native/plugin', 'ionic-native/util', 'rxjs/Observable', 'observable/throw'],
    function (exports, ionic_native_plugin, ionic_native_util, rxjs_Observable, observable_throw) {

        var instanceAvailability = ionic_native_plugin.instanceAvailability;
        var checkAvailability = ionic_native_plugin.checkAvailability;
        var wrap = ionic_native_plugin.wrap;
        var wrapInstance = ionic_native_plugin.wrapInstance;
        var overrideFunction = ionic_native_plugin.overrideFunction;
        var getPlugin = ionic_native_util.getPlugin;
        var getPromise = ionic_native_util.getPromise;
        var Observable = rxjs_Observable.Observable;
        
        /**
         * @private
         */
        function InstanceCheck(opts) {
            if (opts === void 0) { opts = {}; }
            return function (pluginObj, methodName, descriptor) {
                return {
                    value: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        if (instanceAvailability(this)) {
                            return descriptor.value.apply(this, args);
                        }
                        else {
                            if (opts.sync) {
                                return;
                            }
                            else if (opts.observable) {
                                return new Observable(function () { });
                            }
                            return getPromise(function () { });
                        }
                    },
                    enumerable: true
                };
            };
        }
        /**
         * Executes function only if plugin is available
         * @private
         */
        var CordovaCheck = function CordovaCheck(opts) {
            if (opts === void 0) { opts = {}; }
            return function (pluginObj, methodName, descriptor) {
                return {
                    value: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var check = checkAvailability(pluginObj);
                       
                        if (check === true) {
                            return descriptor.value.apply(this, args);
                        }
                        else {
                            if (opts.sync) {
                                return null;
                            }
                            else if (opts.observable) {
                                return observable_throw.throw(new Error(check && check.error));
                            }
                            return Promise.reject(check && check.error);
                        }
                    },
                    enumerable: true
                };
            };
        }
        /**
         * @private
         *
         * Class decorator specifying Plugin metadata. Required for all plugins.
         *
         * @usage
         * ```typescript
         * @Plugin({
         *  pluginName: 'MyPlugin',
         *  plugin: 'cordova-plugin-myplugin',
         *  pluginRef: 'window.myplugin'
         *  })
         *  export class MyPlugin {
         *
         *    // Plugin wrappers, properties, and functions go here ...
         *
         *  }
         * ```
         */
        function Plugin(config) {
            return function (cls) {
                // Add these fields to the class
                for (var prop in config) {
                    cls[prop] = config[prop];
                }
                cls['installed'] = function (printWarning) {
                    return !!getPlugin(config.pluginRef);
                };
                cls['getPlugin'] = function () {
                    return getPlugin(config.pluginRef);
                };
                cls['checkInstall'] = function () {
                    return checkAvailability(cls) === true;
                };
                cls['getPluginName'] = function () {
                    return config.pluginName;
                };
                cls['getPluginRef'] = function () {
                    return config.pluginRef;
                };
                cls['getPluginInstallName'] = function () {
                    return config.plugin;
                };
                cls['getPluginRepo'] = function () {
                    return config.repo;
                };
                cls['getSupportedPlatforms'] = function () {
                    return config.platforms;
                };
                return cls;
            };
        }
        /**
         * @private
         *
         * Wrap a stub function in a call to a Cordova plugin, checking if both Cordova
         * and the required plugin are installed.
         */
        function Cordova(opts) {
            if (opts === void 0) { opts = {}; }
            return function (target, methodName, descriptor) {
                return {
                    value: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return wrap(this, methodName, opts).apply(this, args);
                    },
                    enumerable: true
                };
            };
        }
        /**
         * @private
         *
         * Wrap an instance method
         */
         function CordovaInstance(opts) {
            if (opts === void 0) { opts = {}; }
            return function (target, methodName) {
                return {
                    value: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return wrapInstance(this, methodName, opts).apply(this, args);
                    },
                    enumerable: true
                };
            };
        }
        /**
         * @private
         *
         *
         * Before calling the original method, ensure Cordova and the plugin are installed.
         */
       function CordovaProperty(target, key) {
            Object.defineProperty(target, key, {
                enumerable: true,
                get: function () {
                    if (checkAvailability(target, key) === true) {
                        return getPlugin(target.constructor.getPluginRef())[key];
                    }
                    else {
                        return null;
                    }
                },
                set: function (value) {
                    if (checkAvailability(target, key) === true) {
                        getPlugin(target.constructor.getPluginRef())[key] = value;
                    }
                }
            });
        }
        /**
         * @private
         * @param target
         * @param key
         * @constructor
         */
         function InstanceProperty(target, key) {
            Object.defineProperty(target, key, {
                enumerable: true,
                get: function () {
                    return this._objectInstance[key];
                },
                set: function (value) {
                    this._objectInstance[key] = value;
                }
            });
        }
        /**
         * @private
         *
         * Wrap a stub function in a call to a Cordova plugin, checking if both Cordova
         * and the required plugin are installed.
         */
         function CordovaFunctionOverride(opts) {
            if (opts === void 0) { opts = {}; }
            return function (target, methodName, descriptor) {
                return {
                    value: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return overrideFunction(this, methodName, opts);
                    },
                    enumerable: true
                };
            };
        }
        /**
         * @private
         *
         * Wraps method that returns an observable that can be completed. Provided opts.resultFinalPredicate dictates when the observable completes.
         *
         */
        function CordovaFiniteObservable(opts) {
            if (opts === void 0) { opts = {}; }
            if (opts.observable === false) {
                throw new Error('CordovaFiniteObservable decorator can only be used on methods that returns observable. Please provide correct option.');
            }
            opts.observable = true;
            return function (target, methodName, descriptor) {
                return {
                    value: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var wrappedObservable = wrap(this, methodName, opts).apply(this, args);
                        return new Observable(function (observer) {
                            var wrappedSubscription = wrappedObservable.subscribe({
                                next: function (x) {
                                    observer.next(opts.resultTransform ? opts.resultTransform(x) : x);
                                    if (opts.resultFinalPredicate && opts.resultFinalPredicate(x)) {
                                        observer.complete();
                                    }
                                },
                                error: function (err) { observer.error(err); },
                                complete: function () { observer.complete(); }
                            });
                            return function () {
                                wrappedSubscription.unsubscribe();
                            };
                        });
                    },
                    enumerable: true
                };
            };
        }

        exports.CordovaFiniteObservable = CordovaFiniteObservable;
        exports.CordovaFunctionOverride = CordovaFunctionOverride;
        exports.InstanceProperty = InstanceProperty;
        exports.CordovaProperty = CordovaProperty;
        exports.CordovaInstance = CordovaInstance;
        exports.Cordova = Cordova;
        exports.Plugin = Plugin;
        exports.InstanceCheck = InstanceCheck;
        exports.CordovaCheck = CordovaCheck;
    });