/*My Login Page*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "core", "./base.pagecomponent"], function (require, exports, core_1, base_pagecomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Login = (function (_super) {
        __extends(Login, _super);
        function Login() {
            return _super.call(this) || this;
        }
        Login = __decorate([
            core_1.Component({
                selector: 'thribe-login',
                templateUrl: "scripts/pages/login.pagecomponent.html",
                styleUrls: ['scripts/pages/login.pagecomponent.css']
            }),
            __metadata("design:paramtypes", [])
        ], Login);
        return Login;
    }(base_pagecomponent_1.ThribeAppBasePage));
    exports.Login = Login;
});
//# sourceMappingURL=login.pagecomponent.js.map