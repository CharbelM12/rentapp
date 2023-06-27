const cron = require('node-cron');
const Reservation = require('../Reservation/ReservationModel');

module.exports=cron.schedule(' 0 0 * * *', async () => {
  try {
    
    const expiredReservations = await Reservation.find({ enddate: { $lt: new Date() } });
    await Reservation.deleteMany({ _id: { $in: expiredReservations.map(reservation => reservation._id) } });
    console.log('Expired reservations have been deleted.');
  } catch (error) {
    next(error)
}
});
