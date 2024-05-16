import { Module } from "@nestjs/common";
import { LocationController } from "./controllers/location/index.controller";
import { AppService } from "./app.service";
import { RecordController } from "./controllers/record/index.controller";

@Module({
	imports: [],
	controllers: [LocationController, RecordController],
	providers: [AppService]
})
export class AppModule {
}
