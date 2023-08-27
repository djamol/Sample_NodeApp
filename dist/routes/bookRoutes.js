"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const bookController_1 = require("../controllers/bookController");
const router = express_1.default.Router();
exports.bookRoutes = router;
router.get('/', bookController_1.bookController.getAll);
router.get('/:id', bookController_1.bookController.getById);
router.post('/', [
    (0, express_validator_1.body)('title').notEmpty().isString(),
    (0, express_validator_1.body)('author').notEmpty().isString(),
    (0, express_validator_1.body)('publishedYear').notEmpty().isInt({ min: 1000, max: new Date().getFullYear() }),
], bookController_1.bookController.create);
router.put('/:id', [
    (0, express_validator_1.param)('id').isUUID(4),
    (0, express_validator_1.body)('title').notEmpty().isString(),
    (0, express_validator_1.body)('author').notEmpty().isString(),
    (0, express_validator_1.body)('publishedYear').notEmpty().isInt({ min: 1000, max: new Date().getFullYear() }),
], bookController_1.bookController.update);
router.delete('/:id', bookController_1.bookController.remove);
