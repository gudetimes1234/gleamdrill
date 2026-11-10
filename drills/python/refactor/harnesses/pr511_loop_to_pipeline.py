need("india_offices")
data = """office, country, telephone
Chicago, USA, +1 312 373 1000
Beijing, China, +86 4008 900 505
Bangalore, India, +91 80 4064 9570

Porto Alegre, Brazil, +55 51 3079 3550
Chennai, India, +91 44 660 44766
"""
tc("india_offices(data)", [{"city": "Bangalore", "phone": "+91 80 4064 9570"}, {"city": "Chennai", "phone": "+91 44 660 44766"}], india_offices(data))
tc('india_offices("office, country, telephone") -- header only', [], india_offices("office, country, telephone"))
tc('india_offices("") -- empty', [], india_offices(""))
uses(r"\[.+\bfor\b.+\bin\b|\b(map|filter)\(", "a comprehension pipeline")
avoids(r"\.append\(", "appending to a result")
avoids(r"\bcontinue\b", "continue")
avoids(r"=\s*(True|False)\b", "a first-line flag")
