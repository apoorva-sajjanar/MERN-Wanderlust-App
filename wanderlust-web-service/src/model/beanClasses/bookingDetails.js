class BookingDetails {
    constructor ( obj ) {
        this.bookingId = obj.bookingId;
        this.userId = obj.userId;
        this.destId = obj.destId;
        this.destinationName = obj.destinationName;
        this.checkInDate = obj.checkInDate;
        this.checkOutDate = obj.checkOutDate;
        this.noOfPersons = obj.noOfPersons;
        this.totalCharges = obj.totalCharges;
        this.timeStamp = obj.timeStamp;
    }
}

module.exports = BookingDetails;