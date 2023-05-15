"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
class Server {
    constructor(port, dbURL) {
        this.port = port;
        this.dbURL = dbURL;
    }
    start() {
        process.on('uncaughtException', (err) => {
            console.log('Uncaught exceptions...server shutting down 1..2..3');
            console.log(err.name, err.message);
        });
        process.on('unhandledRejection', (err) => {
            console.log('Uncaught exceptions...server shutting down 1..2..3');
            console.log(err.name, err.message);
        });
        const options = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        };
        mongoose_1.default.connect(this.dbURL, options).then(() => console.log('DB connection successful!'));
        app_1.default.listen(this.port, () => {
            console.log(`server is live on port ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map