"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const financial_records_1 = __importDefault(require("./routes/financial-records"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: '.env.local' });
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 3001;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    throw new Error('MONGO_URI is not defined');
}
mongoose_1.default
    .connect(mongoURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to Connect to MongoDB:", err));
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/dist')));
app.use("/api/financial-records", financial_records_1.default);
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/dist', 'index.html'));
});
app.listen(port, '0.0.0.0', () => { console.log(`Server Running on PORT: ${port}`); });
