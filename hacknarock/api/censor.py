from better_profanity import profanity

profanity.load_censor_words()

def censor(text):
    return profanity.censor(text)