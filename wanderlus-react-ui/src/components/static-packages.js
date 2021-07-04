import React, { Component } from 'react';

const dummyData = [
    {
        "destinationId" : "D1001",
        "continent":"Europe",
        "imageUrl":"assets/geece.jpg",
        "name" : "A Week in Greece: Athens, Mykonos & Santorini",
        "details" : {
            "about" : "Watch the setting sun from the hilltops of Greece’s most famous islands.Experience ancient history and open-air museums in the capital of Athens. Then, the quintessential, beautiful Greek islands you’ve been dreaming of come to life on the isles of Mykonos and Santorini.",
            "itinerary" : {
                "dayWiseDetails":{
                        "firstDay":"Travel day: Board your overnight flight to Athens.",
                        "restDaysSightSeeing":[
                                                "Santorini",
                                                "Acropolis", 
                                                "Parthenon", 
                                                "Temple of Apollo", 
                                                "Ruins of Olympia", 
                                                "Ancient Theater of Epidaurus"
                                            ],
                        "lastDay":"Departure:Transfer to the airport for your flight home."
                },
                "packageInclusions" : [ 
                    "7 nights in handpicked hotels", 
                    "7 breakfasts", 
                    "3 dinners with beer or wine", 
                    "3 guided sightseeing tours", 
                    "Expert tour director & local guides", 
                    "Private deluxe motor coach"
                ],
                "tourHighlights" : [ 
                    "Greece",
                    "Athens",
                    "Mykonos",
                    "Santorini",
                    "Acropolis", 
                    "Parthenon", 
                    "Temple of Apollo", 
                    "Ruins of Olympia", 
                    "Ancient Theater of Epidaurus", 
                    "Corinth Canal photo stop"
                ],
                "tourPace" : [ 
                    "On this guided tour, you will walk for about 2 hours daily across uneven terrain, including paved roads and unpaved trails, with some hills and stairs."
                ]
            }
        },
        "noOfNights" : 7.0,
        "flightCharges":500,
        "chargesPerPerson" : 2499.0,
        "discount" : 0.0,
        "availability":30
    }, 
    {
        "destinationId" : "D1002",
        "continent":"Europe",
        "imageUrl":"assets/romantic.jpg",
        "name" : "Romantic Europe: Paris, Venice & Vienna",
        "details" : {
            "about" : "Get swept away by the beauty of Europe’s most romantic cities.Journey through the dazzling imperial capitals of France, Italy, Slovenia, and Austria, soaking up each destination’s unique culture along the way. Sip coffee in charming cafes, spend your days exploring the grand boulevards or admiring sparkling canals, and watch each city’s skyline light up every evening.",
            "itinerary" : {
                 "dayWiseDetails":{
                        "firstDay":"Travel day: Board your overnight flight to Paris.",
                        "restDaysSightSeeing":[
                                                "Vienna",
                                                "Eiffel Tower photo stop", 
                                                "The Grand Canal", 
                                                "St. Mark’s Square", 
                                                "Ljubljana’s Prešeren Square", 
                                                "Graz’s Old Town"
                                            ],
                        "lastDay":"Departure:Transfer to the airport for your flight home."
                },
                "packageInclusions" : [ 
                    "10 nights in handpicked hotels", 
                    "10 breakfasts", 
                    "4 dinners with beer or wine", 
                    "4 guided sightseeing tours", 
                    "Expert tour director & local guides", 
                    "Private deluxe motor coach"
                ],
                "tourHighlights" : [ 
                    "Paris",
                    "Venice",
                    "Vienna",
                    "Eiffel Tower photo stop", 
                    "The Grand Canal", 
                    "St. Mark’s Square", 
                    "Ljubljana’s Prešeren Square", 
                    "Graz’s Old Town", 
                    "Schönbrunn Palace"
                ],
                "tourPace" : [ 
                    "On this guided tour, you’ll walk for about 2.5 hours daily across mostly flat terrain, including paved roads and cobblestone streets, with some hills and stairs."
                ]
            }
        },
        "noOfNights" : 10.0,
        "flightCharges":500,
        "chargesPerPerson" : 2729.0,
        "discount" : 0.0,
        "availability":30
    }]



class StaticPackage extends Component {

    getItinerary = (aPackage) => {
        alert("The package details are shown as a side-bar from left side");
    };
    openBooking = (aPackage) => {
        alert("The package details are shown as a side-bar from left side");
    };

    render() {
        const singlePackage = dummyData[0];
        return (
        <div className="card bg-light text-dark package-card" key={singlePackage.destinationId}>
            <div className="card-body row">
                <div className="col-md-4">
                    <img className="package-image" alt="destination comes here" />
                </div>
                <div className="col-md-5">
                    <div className="featured-text text-center text-lg-left">
                        <h4>{singlePackage.imageUrl}</h4>
                        <div className="badge badge-info">{singlePackage.noOfNights}<em> Nights</em></div>
                        {singlePackage.discount ? <div className="discount text-danger">{singlePackage.discount}% Instant Discount</div> : null}
                        <p className="text-dark mb-0">{singlePackage.details.about}</p>
                    </div>
                    <br />

                </div>
                <div className="col-md-3">
                    <h4>Prices Starting From:</h4>
                    <div className="text-center text-success"><h6>{singlePackage.chargesPerPerson}</h6></div><br /><br />
                    <div><button className="btn btn-primary book" onClick={() => this.getItinerary(singlePackage)}>View Details</button></div><br />
                    <div><button className="btn btn-primary book" onClick={() => this.openBooking(singlePackage)}>Book </button>  </div>
                </div>
            </div>
        </div>
        )
    }

}

export default StaticPackage;