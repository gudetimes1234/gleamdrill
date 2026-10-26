need :describe

tc "describe(42)", "number 42", describe(42)
tc 'describe("hi")', "text hi", describe("hi")
tc "describe([1, 2, 3])", "list of 3", describe([1, 2, 3])
tc "describe(nil)", "nothing", describe(nil)
tc "describe(3.5) -- a Float is not an Integer", "unknown", describe(3.5)
uses(/\bwhen\s+(Integer|String|Array)\b/, "when with a class")
avoids(/is_a\?|kind_of\?|instance_of\?|\.nil\?/, "is_a? / nil? checks")
avoids(/\belsif\b/, "elsif")
