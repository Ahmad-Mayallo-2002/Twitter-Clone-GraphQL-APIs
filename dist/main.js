"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const console_1 = require("console");
async function bootstrap() {
    const port = Number(process.env.PORT) || 3000;
    (0, console_1.log)(`http://localhost:${port}`);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map