const raycast = require('raycast');
const places = require('./kalahari.json');

const getPlace = (latitude, longitude) => {
    var point = new raycast.LatLng(latitude, longitude);
    for (var i=0; i < places.length; i++) {
        var place = places[i];
        var polygon = []
        for (var j = 0; j < place.coords.length; j++) {
            polygon.push(
                new raycast.LatLng(place.coords[j].latitude, place.coords[j].longitude));
        }
        if (raycast.isLatLngInside(polygon, point)) {
            return place;
        }
    }
    return null; // no 
};

module.exports.getPlace = getPlace;