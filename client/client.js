
// counter starts at 0
Session.set("lat", -1)
Session.set("lon", -1)

Template.geolocation.events({
    'click #getLocation': function () {
        if(Session.get("lat")==-1){
            console.log("getLocation")
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                Session.set("lat", -1)
                Session.set("lon", -1)
            }
        }
        else{
            console.log("already showing location")
        }
    },
    'click #makeMarker':function(){
        marker = {
            id:"123456", 
            lat: Session.get("lat"),
            lng: Session.get("lon"),
            title: "yourLocation" 

        }
        gmaps.addMarker(marker);
    }, 
    'click #findSchools':function(){
        // Meteor.call('findSchools', Session.get("lat"), Session.get("lon"), function (error, result) {
        //     console.log(error);
        //     console.log(result);
        // });
        // Meteor.call('returnSomething', Session.get("lat"), Session.get("lon"), function(error, result){
        //     console.log(error);
        //     console.log(result);
        // })
        Meteor.call("findSchools", Session.get("lat"), Session.get("lon"), function(err, res){
            console.log(err)
            console.log(res)
        });
    }
});
Template.geolocation.helpers({
    lat: function () {
        return Session.get("lat")
    },
    lon : function (){
        return Session.get("lon")
    }
});
function showPosition(position){
    console.log("show position")
    Session.set("lat", position.coords.latitude)
    Session.set("lon", position.coords.longitude)
} //callback for getCurrentPosition
Template.map.rendered = function() {
    if (! Session.get('map'))
        gmaps.initialize();
 
    // Deps.autorun(function() {
    //     var pages = FacebookPages.find().fetch();
 
    //     _.each(pages, function(page) {
    //         if (typeof page.location !== 'undefined' &&
    //             typeof page.location.latitude !== 'undefined' &&
    //             typeof page.location.longitude !== 'undefined') {
 
    //             var objMarker = {
    //                 id: page._id,
    //                 lat: page.location.latitude,
    //                 lng: page.location.longitude,
    //                 title: page.name
    //             };
 
    //             // check if marker already exists
    //             if (!gmaps.markerExists('id', objMarker.id))
    //                 gmaps.addMarker(objMarker);
 
    //         }
    //     });
    // });
}
 
Template.map.destroyed = function() {
    Session.set('map', false);
}
