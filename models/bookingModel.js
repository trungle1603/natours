const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      require: [true, 'Booking must belong to a price'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    paid: {
      type: Boolean,
      default: true,
    },
    tour: {
      type: mongoose.Types.ObjectId,
      ref: 'Tour',
      require: [true, 'Booking must belong to a tour'],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      require: [true, 'Booking must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bookingSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'tour',
    select: 'name',
  });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
