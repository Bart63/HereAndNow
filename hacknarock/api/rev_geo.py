from geopy.geocoders import Nominatim
geolocator = Nominatim(user_agent="hacknarock")

def getCityFromLocation(lat, lon):
    location = geolocator.reverse(f"{lat}, {lon}")
    return location.raw['address']['city']