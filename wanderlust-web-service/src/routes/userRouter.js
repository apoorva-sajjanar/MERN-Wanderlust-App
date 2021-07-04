const express = require( 'express' );
const router = express.Router();
const setupUser = require( "../model/setupUser")
const userservice = require( '../service/userslogin' )
const userDetails = require( '../model/beanClasses/users' );
const BookingDetails = require( '../model/beanClasses/bookingDetails' );


router.get( "/setup", ( req, res, next ) => {
    setupUser.userSetup().then( ( data ) => {
        res.send( data )
    } ).catch( err => next( err ) );
})

router.post( '/user/login', function ( req, res, next ) {
    let contactNo = req.body.contactNo;
    let password = req.body.password;
    userservice.login( parseInt( contactNo ), password ).then( function ( userDetails ) {
        res.json( userDetails );
        console.log(userDetails);
    } ).catch( (err) => 
    
     next( err ) 
    );
} )

router.get( '/packages/hotDeals', function ( req, res, next ) {
    userservice.getAllDeals().then( ( data )=>{
        res.json( data );
    } ).catch( err => next( err ) );
} )

router.get( '/packages/:continent', function ( req, res, next ) {
    let continent=req.params.continent[0].toUpperCase()+req.params.continent.slice( 1 ).toLowerCase()
    userservice.getAllPackages( continent ).then( ( data )=>{
        res.json( data );
    } ).catch( err => next( err ));
} )


router.post( '/user/register', function ( req, res, next ) {
    const regObj=new userDetails( req.body );
    userservice.register( regObj ).then( function ( userDetails ) {
        res.json( userDetails );
    } ).catch( err => next( err ) );
} )


router.post( '/book/:userId/:destId', function ( req, res, next ) {
    let userId=req.params.userId;
    let destinationId=req.params.destId;
    const bookObj=new BookingDetails( req.body );
    
    userservice.bookingsData( bookObj,userId,destinationId ).then( function ( Details ) {
        res.json( Details );
    } ).catch( err => next( err ) );
} )


router.get( '/book/getDetails/:userId', function ( req, res, next ) {
    let userId=req.params.userId;
    userservice.getDetails( userId ).then( function ( userDetails ) {
        res.json( userDetails );
    } ).catch( err => next( err ) );
} )


router.delete( '/book/cancelBooking/:bookingId', function ( req, res, next ) {
    let bookingId=req.params.bookingId;
    userservice.deleteBooking( bookingId ).then( function ( userDetails ) {
        res.json( userDetails );
    } ).catch( err => next( err ) );
})



module.exports = router;

