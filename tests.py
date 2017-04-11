import unittest
import sys
sys.path.append("/home/ubuntu/workspace/PokeGames/")
import app
import pokeAPI
from rfc3987 import parse

class FunctionResponseTest(unittest.TestCase):
    #1.Tests chat bot where input is not a command
    def test_getTypeByName(self):
        response = pokeAPI.getStatsByName('bulbasaur')
        self.assertEquals(response, "[u'grass', u'poison']")
        
        
if __name__=='__main__':
    unittest.main()