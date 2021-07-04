const{Schema} = require( "mongoose" );
const Mongoose = require( "mongoose" )
Mongoose.Promise = global.Promise;
const url = "mongodb://localhost:27017/Wanderlust_DB";

let userSchema = Schema( {
    name: String,
    userId: String,
    emailId: String,
    contactNo: Number,
    password: String,
    bookings: [String]
}, { collection: "User" } )

let hotDealsSchema=Schema( {
    destinationId: String,
  continent: String,
  imageUrl: String,
  name: String,
  details: {
    about: String,
    itinerary: {
      dayWiseDetails: {firstDay: String,restDaysSightSeeing: [String],lastDay: String} ,
      packageInclusions: [String],
      tourHighlights: [String],
      tourPace: [String]
    }
  },
  noOfNights: Number,
  flightCharges: Number,
  chargesPerPerson: Number,
  discount: Number,
  availability: Number
} ,{collection: "Hotdeals"} )


let destinationsSchema=Schema( {
    destinationId: String,
    continent: String,
    imageUrl: String,
    name: String,
    details: {
      about: String,
      itinerary: {
        dayWiseDetails: {firstDay: String,restDaysSightSeeing: [String],lastDay: String},
        packageInclusions: [String],
        tourHighlights: [String],
        tourPace: [String]
      }
    },
    noOfNights: Number,
    flightCharges: Number,
    chargesPerPerson: Number,
    discount: Number,
    availability: Number
},{collection: "Destinations"} )


let bookingSchema=Schema( {
    bookingId: String,
    userId: String,
    destId: String,
    destinationName: String,
    checkInDate: Date,
    checkOutDate: Date,
    noOfPersons: Number,
    totalCharges: Number,
    timeStamp: Number
},{collection: "Bookings"} )


let collection = {};

collection.getUserCollection = () => {
    return Mongoose.connect( url, { useNewUrlParser: true , useUnifiedTopology: true } ).then( ( database ) => {
        return database.model( 'User', userSchema )
    } ).catch( () => {
        let err = new Error( "Could not connect to Database" );
        err.status = 500;
        throw err;
    } )
}

collection.getDealCollection = () => {
    return Mongoose.connect( url, { useNewUrlParser: true , useUnifiedTopology: true } ).then( ( database ) => {
        return database.model( 'Hotdeals', hotDealsSchema )
    } ).catch( () => {
        let err = new Error( "Could not connect to Database" );
        err.status = 500;
        throw err;
    } )
}


collection.getDestinationsCollection = () => {
    return Mongoose.connect( url, { useNewUrlParser: true , useUnifiedTopology: true } ).then( ( database ) => {
        return database.model( 'Destinations', destinationsSchema )
    } ).catch( ( ) => {
        let err = new Error( "Could not connect to Database" );
        err.status = 500;
        throw err;
    } )
}

collection.getBookingsCollection = () => {
    return Mongoose.connect( url, { useNewUrlParser: true , useUnifiedTopology: true } ).then( ( database ) => {
        return database.model( 'Bookings',bookingSchema )
    } ).catch( ( ) => {
        let err = new Error( "Could not connect to Database" );
        err.status = 500;
        throw err;
    } )
}

module.exports = collection;
