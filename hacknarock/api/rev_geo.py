from geopy.geocoders import Nominatim
geolocator = Nominatim(user_agent="hacknarock")

def getCityFromLocation(lat, lon):
    location = geolocator.reverse(f"{lat}, {lon}")
    if not "address" in location.raw:
        return ""

    if "city" in location.raw['address']:
        return location.raw['address']['city']
    elif "country" in location.raw['address']:
        return location.raw['address']["country"]
    
    return ""