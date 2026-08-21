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
exports.MasterDataController = void 0;
const common_1 = require("@nestjs/common");
const create_supplier_dto_1 = require("./dto/create-supplier.dto");
const master_data_service_1 = require("./master-data.service");
let MasterDataController = class MasterDataController {
    masterDataService;
    constructor(masterDataService) {
        this.masterDataService = masterDataService;
    }
    listSuppliers() {
        return this.masterDataService.listSuppliers();
    }
    createSupplier(dto) {
        return this.masterDataService.createSupplier(dto);
    }
    listFabricTypes() {
        return this.masterDataService.listFabricTypes();
    }
};
exports.MasterDataController = MasterDataController;
__decorate([
    (0, common_1.Get)('suppliers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MasterDataController.prototype, "listSuppliers", null);
__decorate([
    (0, common_1.Post)('suppliers'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_supplier_dto_1.CreateSupplierDto]),
    __metadata("design:returntype", void 0)
], MasterDataController.prototype, "createSupplier", null);
__decorate([
    (0, common_1.Get)('fabric-types'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MasterDataController.prototype, "listFabricTypes", null);
exports.MasterDataController = MasterDataController = __decorate([
    (0, common_1.Controller)('master-data'),
    __metadata("design:paramtypes", [master_data_service_1.MasterDataService])
], MasterDataController);
//# sourceMappingURL=master-data.controller.js.map