// src/modules/facility/facility.model.ts

import mongoose from "mongoose";
import { TFacility } from "./facility.interface";

const facilitySchema = new mongoose.Schema<TFacility>({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  pricePerHour:{
    type:Number,
    required:true
  },
  location:{
    type:String,
    required:true
  },
  isDeleted:{
    type:Boolean,
    default:false
  }
})

const FacilityModel = mongoose.model<TFacility>('Facility', facilitySchema)
export default FacilityModel