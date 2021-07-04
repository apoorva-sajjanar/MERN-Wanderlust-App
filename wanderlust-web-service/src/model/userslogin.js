const userDetails = require( './beanClasses/users' );
const connection = require( "../utilities/connections" )
const usersDB = {}

usersDB.generateId = () => {
    return connection.getUserCollection().then( ( collection ) => {
        return collection.distinct( "userId" ).then( ( ids ) => {
            let uId = parseInt( ids.pop().slice( 1 ) ) + 1
            return"U" + uId;
        } )
    } )
}

usersDB.generateBookId = () => {
    return connection.getBookingsCollection().then( ( collection ) => {
        return collection.distinct( "bookingId" ).then( ( ids ) => {
            let bId = parseInt( ids.pop().slice( 1 ) ) + 1
            return"B" + bId;
        } )
    } )
}

usersDB.checkUser = ( contactNo ) => {
    return connection.getUserCollection().then( ( collection ) => {
        return collection.findOne( { "contactNo": contactNo } ).then( ( customerContact ) => {
            if( customerContact ) {
                return new userDetails( customerContact );
            }
            else return null;
        } )
    })
}

usersDB.getPassword = ( contactNo ) => {
    return connection.getUserCollection().then( ( collection ) => {
        return collection.find( { "contactNo": contactNo }, { _id: 0, password: 1 } ).then( ( password ) => {
            if( password.length != 0 )
                return password[0].password;
            else
                return null;
        } )
    } )
}

usersDB.register = ( regObj ) => {
    return connection.getUserCollection().then( ( collection ) => {
        return usersDB.generateId().then( ( uid ) => {
            regObj.userId = uid;
            return collection.insertMany( [regObj] ).then( ( data ) => {
                if( data ) {
                    return data;
                }
                else{
                    let err = new Error( "Registration failed" );
                    err.status = 400;
                    throw err;
                }
            } )
        } )
    } )
}

usersDB.getAllDeals = () => {
    return connection.getDealCollection().then( ( collection ) => {
        return collection.find().then( ( data ) => {
            
            if( data ) {
                return data
            }
            else{
                return null
            }
        } )
    } )
}

usersDB.getAllPackages = ( continent ) => {
    return connection.getDestinationsCollection().then( ( collection ) => {
        return collection.find( { $or: [{ continent: continent }, { "details.itinerary.tourHighlights": continent }] } ).then( ( data ) => {
            
            if( data ) {
                return data
            }
            else{
                return null
            }
        } )
    } )
}

usersDB.addOnlyuser = ( userId, bid ) => {
    return connection.getUserCollection().then( ( collection ) => {
        return collection.updateMany( { userId: userId }, { $push: { bookings: bid } } ).then( ( data ) => {
            if( data.nModified == 1 ) {
                return data
            }
            else{
                let err = new Error( "User update failed" );
                err.status = 400;
                throw err;
            }
        } )
    } )
}

usersDB.updateAvailonDelete=( destinationId,noOfTravelers )=>{
    let hotDeals = ["HD1002", "HD1003", "HD1001"]
    
    if( !( hotDeals.includes( destinationId ) ) ) {
        return connection.getDestinationsCollection().then( ( collection ) => {
                return collection.updateMany( { destinationId: destinationId }, { $inc: { availability: noOfTravelers } } )
                .then( ( data ) => {
                    if( data.nModified == 1 ) {
                        return data
                    }
                    else{
                        return null
                    }
                } )
        } )
    }
    else{
        
        return connection.getDealCollection().then( ( collection ) => {
                return collection.updateMany( { destinationId: destinationId }, { $inc: { availability: noOfTravelers } } )
                .then( ( data ) => {
                    
                    if( data.nModified == 1 ) {
                        return data
                    }
                    else{
                        return null
                    }
                } )
        } )
    }
}


usersDB.updateAvailOnly = ( destinationId, noOfTravelers ) => {
    let hotDeals = ["HD1002", "HD1003", "HD1001"]
    if( !( hotDeals.includes( destinationId ) ) ) {
        return connection.getDestinationsCollection().then( ( collection ) => {
            return collection.find( {destinationId: destinationId},{availability: 1,_id: 0} ).then( ( data )=>{
                if( data[0].availability>=noOfTravelers ){
                    return collection.updateMany( { destinationId: destinationId }, { $inc: { availability: -noOfTravelers } } )
                .then( ( data ) => {
                    if( data.nModified == 1 ) {
                        return data
                    }
                    else{
                        return null
                    }
                } )
                }
                else{
                    let err = new Error( "Sorry, Not Enough seats available!! Please check back later" );
                    err.status = 400;
                    throw err;
                }
                
            } )      
        } )
    }
    else{
        return connection.getDealCollection().then( ( collection ) => {
            return collection.find( {destinationId: destinationId},{availability: 1,_id: 0} ).then( ( data )=>{
                if( data[0].availability>=noOfTravelers ){
                return collection.updateMany( { destinationId: destinationId }, { $inc: { availability: -noOfTravelers } } )
                .then( ( data ) => {
                    
                    if( data.nModified == 1 ) {
                        return data
                    }
                    else{
                        return null
                    }
                } )
            } else{
                let err = new Error( "This Package is Full... " + data[0].availability + " left!!" );
                err.status = 400;
                throw err;
            }
        } )
    } )
    }
}

usersDB.bookingsData = ( bookObj, userId, destinationId ) => {
    let noOfTravelers = bookObj.noOfPersons;
    return connection.getBookingsCollection().then( ( collection ) => {
        return usersDB.generateBookId().then( ( bid ) => {
            bookObj.bookingId = bid;
            
            return usersDB.updateAvailOnly( destinationId, noOfTravelers ).then( ( saved ) => {
                if( saved.nModified == 1 ) {
                    return usersDB.addOnlyuser( userId, bid ).then( ( userUpdate ) => {
                        if( userUpdate.nModified == 1 ) {
                            return collection.insertMany( [bookObj] ).then( ( data ) => {
                                if( data ) {
                                    return data;
                                }
                                else{
                                    let err = new Error( "Booking failed" );
                                    err.status = 400;
                                    throw err;
                                }
                            } )
                        } else{
                            let err = new Error( "User data not updated " );
                            err.status = 400;
                            throw err;
                        }
                    } )
                }
                else{
                    let err = new Error( "Availablity not updated" );
                    err.status = 400;
                    throw err;
                }
            } )

        } )
    } )
}

usersDB.getDetails = ( userId ) => {
    return connection.getBookingsCollection().then( ( collection ) => {
        return collection.find( { userId: userId } ).then( ( data ) => {
            if( data ) {
                return data
            }
            else{
                return null
            }
        } )
    } )
}

usersDB.deleteUserBooking = ( bookingId ) => {
    return connection.getUserCollection().then( ( collection ) => {
        return collection.updateMany( {}, { $pull: { bookings: bookingId } } ).then( ( data ) => {
            if( data ) {
                return data
            }
            else{
                return null
            }
        } )
    } )
}


usersDB.deleteBooking = ( bookingId ) => {
    return connection.getBookingsCollection().then( ( collection ) => {
        return collection.findOne( {bookingId: bookingId},{destId: 1,noOfPersons: 1,_id: 0} ).then( ( data )=>{
            return usersDB.updateAvailonDelete( data.destId,data.noOfPersons ).then( ()=>{
                return collection.deleteOne( { bookingId: bookingId } ).then( () => {
                    return usersDB.deleteUserBooking( bookingId ).then( () => {
                        if( data ) {
                            return data
                        }
                        else{
                            return null
                        }
                    } )
                } )

            } )
            
        } )
        
    } )
}

module.exports = usersDB;
