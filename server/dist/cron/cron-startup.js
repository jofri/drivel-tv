var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { startCron } = require('../cron/cron');
const Broadcast = require('../models/Broadcast-model');
// Function that finds all broadcasts and start their timers
exports.startAllCron = () => __awaiter(this, void 0, void 0, function* () {
    // Find all broadcasts in DB using Mongoose
    yield Broadcast.find({}, (err, broadcasts) => {
        // For each broadcast, start a corresponding timer
        broadcasts.forEach((broadcast) => {
            startCron(broadcast.broadcastId);
        });
    });
});
//# sourceMappingURL=cron-startup.js.map