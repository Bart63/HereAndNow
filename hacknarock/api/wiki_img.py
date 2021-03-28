import wikipedia
from rev_geo import getCityFromLocation
import random

def getPhotoURL(lat, lon):
    try:
        page = wikipedia.page(getCityFromLocation(lat, lon))
    except wikipedia.DisambiguationError:
        print("DisambiguationError: page resolved to Disambiguation page.")
        return ""
    except wikipedia.PageError:
        print("PageError: Wikipedia didn't match a query.")
        return ""
    except wikipedia.RedirectError:
        print("RedirectError: Page title unexpectedly resolved to a redirect.")
        return ""
    except wikipedia.HTTPTimeoutError:
        print("HTTPTimeoutError: a request to the Mediawiki servers timed out")
        return ""
        
    images_except = [url for url in page.images
                            if not url.endswith("Decrease2.svg")]

    if not images_except:
        return ""

    return(random.choice(images_except))