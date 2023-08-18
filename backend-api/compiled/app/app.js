"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: '.env' });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const logger = console;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('combined'));
const port = process.env.PORT || process.env.API_PORT || 3001;
app.use('/', routes_1.default);
app.use('/test', (req, res) => {
    console.log('test');
    res.json({
        data: 'test'
    });
});
app.listen(port, () => {
    logger.log('Running on port', port);
});
exports.default = app;
