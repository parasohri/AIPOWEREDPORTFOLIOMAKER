import mongoose from "mongoose";
import { use } from "react";
const SchedularSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    order:{ type: [String], default: [] },
}, { timestamps: true });
const Schedular = mongoose.models.Schedular || mongoose.model("Schedular", SchedularSchema);
export default Schedular;