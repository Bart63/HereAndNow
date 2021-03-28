import wikipedia

def getPhotoURL(name):
    try:
        page = wikipedia.page(name)
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
        
    return(page.images[0])