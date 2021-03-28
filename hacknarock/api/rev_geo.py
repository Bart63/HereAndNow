from geopy.geocoders import Nominatim
geolocator = Nominatim(user_agent="hack")
location = geolocator.reverse("50.049683, 19.944544")

print(location.address)