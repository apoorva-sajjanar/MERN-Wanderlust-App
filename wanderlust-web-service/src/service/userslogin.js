const userDB = require( '../model/userslogin' );


const userService = {}

userService.login = ( contactNo, userPassword ) => {
    return userDB.checkUser( contactNo ).then( ( user ) => {
        if( user == null ) {
            let err = new Error( "Please enter registered contact number!!" )
            err.status = 404
            throw err
        }
        else{
            return userDB.getPassword( contactNo ).then( ( password ) => {
                if( password != userPassword ) {
                    let err = new Error( "Enter correct password" )
                    err.status = 406
                    throw err
                }
                else{
                    return user;
                }
            } )
        }
    } )
}

userService.register=( regObj )=>{
    return userDB.checkUser( regObj.contactNo ).then( ( contact )=>{
        if( contact!==null ){
            let err=new Error( "You have already registered!!" )
            err.status=404
            throw err
        }
        else{
            return userDB.register( regObj ).then( ( data )=>{
                if( data ){
                    return data;
                }
                else{
                    let err=new Error( "could'nt register" )
                    err.status=404
                    throw err
                }
            } )
        }
    } )
}

userService.getAllDeals=()=>{
    return userDB.getAllDeals().then( ( data )=>{
        if( data )
        return data
        else{
        let err = new Error( "Could'nt fetch Data" )
        err.status = 404
        throw err
        }
        
    } )
}

userService.getAllPackages=( continent )=>{
    return userDB.getAllPackages( continent ).then( ( data )=>{
        if( data )
        return data
        else{
        let err = new Error( "could'nt fetch data" )
        err.status = 404
        throw err
        }
        
    } )
}

userService.bookingsData=( bookObj,userId,destinationId )=>{
    return userDB.bookingsData( bookObj,userId,destinationId ).then( ( data )=>{
        if( data )
        return data
        else{
        let err = new Error( "Sorry, Not Enough seats available!! Please check back later" )
        err.status = 404
        throw err
        }
        
    } )
}


userService.getDetails=( userId )=>{
    return userDB.getDetails( userId ).then( ( data )=>{
        if( data )
        return data
        else{
        let err = new Error( "couldn't fetch data" )
        err.status = 404
        throw err
        }
        
    } )
}

userService.deleteBooking=( bookingId )=>{
    return userDB.deleteBooking( bookingId ).then( ( data )=>{
        if( data )
        return data
        else{
        let err = new Error( "Deleteion failed" )
        err.status = 404
        throw err
        }
    } )
}

module.exports = userService
