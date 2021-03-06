from random import randint,choice
import json
import urllib
def processBotCommand(userSubmitted):

    recognizedCommands = ['say','about','help','backwards','doMath','giffy']

    if('!! about' in userSubmitted):

        msg = ''
        return msg

    elif('!! say' in userSubmitted):
        msg = userSubmitted.split('!! say')[1]
        return msg.strip()

    elif('!! backwards' in userSubmitted):
        msg = userSubmitted.split('!! backwards')[1]
        backwards = "".join(list(reversed(msg)))
        return backwards.strip()

    elif('!! doMath' in userSubmitted):
        a = randint(1,100)
        b = randint(1,100)
        currentTime = "%d + %d = %d" % (a,b,a+b)

        messagesend =   str(currentTime)
        return messagesend.strip()

    elif('!! help' in userSubmitted):
        msg =  'I recognize these commands: ' + ", ".join(recognizedCommands)
        return msg

    
    elif('!! giffy' in userSubmitted):
        searchTerm = userSubmitted.split('!! giffy')[1]
        query = searchTerm.replace(' ','+')
        
        link = "http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=dc6zaTOxFJmzC&limit=5"
        
        data = json.loads(urllib.urlopen(link).read())
        
        # no results :-*(
        if(len(data['data']) == 0 ):
            return "Sorry I didn't find any gif's with that search term"
        
        else:
        
            apilink = data['data'][randint(0,len(data['data']) -1)]['images']['downsized_medium']['url']
            return apilink
    


    else:
        msg =  'command not recognized'
        return msg

def sayBye(name):
	randomPhrases  = ["Leave and don't come back ", "Get out of here ", "Good ridance ",
					 "Be gone "]
	
	return choice(randomPhrases) + name

def greetNewUser(name):
	phrases = ['Wassup, ', 'YO ', 
	                     "How's it going ", "Hey there ", "Howdy "]
	return choice(phrases) + name

def randomPhrase():
    phrases = ['there you happy ? ',
                    'i am at your command for now ...', 
                    'computers will take over',
                    'i will be issuing commands to you soon...']
    return choice(phrases)