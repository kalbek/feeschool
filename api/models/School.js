import mongoose from "mongoose";
const SchoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  // students: {
  //   type: [String],
  //   // required: true,
  // },
  students: {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: 'Student',
    },
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  studentAvailables: [{number: Number, unavailableDates: [{type:Date}] }],
},
{ timestamps: true }
);

export default mongoose.model("School", SchoolSchema)