"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const console_1 = require("console");
const graphql_upload_ts_1 = require("graphql-upload-ts");
const express = require("express");
const path_1 = require("path");
async function bootstrap() {
    const port = Number(process.env.PORT) || 3000;
    (0, console_1.log)(`http://localhost:${port}`);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, graphql_upload_ts_1.graphqlUploadExpress)({
        maxFieldSize: 10000000,
        maxFiles: 5
    }));
    app.use("/uploads", express.static((0, path_1.join)(__dirname, "..", "uploads")));
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map