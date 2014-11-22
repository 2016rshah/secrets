Meteor.methods({
    findSchools: function (lat, lon) {
        //this.unblock(); what is this for?
        x = HTTP.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&types=school&rankby=distance&key=AIzaSyAwk5Y2vuE3gUV5GyEDDE5m6sp74uSHjSk", {}, function(err, res){
        	if(err){
        		return err
        	}
        	else{
        		return res
        	}
        });
    	return "nope"
    }, 
    returnSomething:function(lat, lon){
    	return {
    		one:lat,
    		two:lon
    	};
    }
});