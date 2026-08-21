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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiveFabricDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class ReceiveFabricDto {
    supplierCode;
    fabricType;
    color;
    quantity;
    unitOfMeasure;
    supplierInvoiceNumber;
    supplierDeliveryChallanNumber;
    pricePerUnit;
}
exports.ReceiveFabricDto = ReceiveFabricDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(3),
    (0, class_validator_1.Matches)(/^[A-Z0-9]+$/, {
        message: 'supplierCode may contain only letters and numbers',
    }),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? value.trim().toUpperCase() : value),
    __metadata("design:type", String)
], ReceiveFabricDto.prototype, "supplierCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/^[A-Z0-9_]+$/, {
        message: 'fabricType must be a valid master-data code',
    }),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? value.trim().toUpperCase() : value),
    __metadata("design:type", String)
], ReceiveFabricDto.prototype, "fabricType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(50),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? value.trim().toUpperCase() : value),
    __metadata("design:type", String)
], ReceiveFabricDto.prototype, "color", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 3 }),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], ReceiveFabricDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsIn)([client_1.MeasurementUnit.YARDS, client_1.MeasurementUnit.METERS]),
    __metadata("design:type", String)
], ReceiveFabricDto.prototype, "unitOfMeasure", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(50),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? value.trim() : value),
    __metadata("design:type", String)
], ReceiveFabricDto.prototype, "supplierInvoiceNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(50),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? value.trim() : value),
    __metadata("design:type", String)
], ReceiveFabricDto.prototype, "supplierDeliveryChallanNumber", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], ReceiveFabricDto.prototype, "pricePerUnit", void 0);
//# sourceMappingURL=receive-fabric.dto.js.map