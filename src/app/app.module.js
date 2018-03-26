"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var http_2 = require("@angular/common/http");
//import { InMemoryDataService }  from './in-memory-data.service';
//Services
var product_service_1 = require("./Services/product.service");
var shop_cart_service_1 = require("./Services/shop-cart.service");
var emailservice_1 = require("./Services/emailservice");
var list_email_service_1 = require("./Services/list-email.service");
//Components
var app_component_1 = require("./app.component");
var products_component_1 = require("./products.component");
var menu_component_1 = require("./menu.component");
var cart_component_1 = require("./cart.component");
var stoneweight_component_1 = require("./stoneweight.component");
var common_1 = require("@angular/common");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_2.HttpClientModule,
            http_1.HttpModule,
            //InMemoryWebApiModule.forRoot(InMemoryDataService),
            router_1.RouterModule.forRoot([
                {
                    path: '',
                    redirectTo: '/products',
                    pathMatch: 'full'
                },
                {
                    path: 'products',
                    component: products_component_1.ProductsComponent
                },
                {
                    path: 'cart',
                    component: cart_component_1.CartComponent
                },
                {
                    path: 'stoneweight',
                    component: stoneweight_component_1.StoneweightComponent
                }
            ])
        ],
        declarations: [
            app_component_1.AppComponent,
            products_component_1.ProductsComponent,
            menu_component_1.MenuComponent,
            cart_component_1.CartComponent,
            stoneweight_component_1.StoneweightComponent
        ],
        providers: [
            product_service_1.ProductService,
            shop_cart_service_1.ShopCartService,
            emailservice_1.EmailService,
            list_email_service_1.ListEmailService,
            { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map