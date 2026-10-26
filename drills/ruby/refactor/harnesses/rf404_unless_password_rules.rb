need :password_errors

tc 'password_errors("hunter22")', [], password_errors("hunter22")
tc 'password_errors("abc")', ["needs a digit", "too short"], password_errors("abc")
tc 'password_errors("abcdefgh")', ["needs a digit"], password_errors("abcdefgh")
tc 'password_errors("") -- empty fails both', ["needs a digit", "too short"], password_errors("")
uses(/\bunless\b/, "unless")
avoids(/\bif\s*(!|not\b)/, "if !")
avoids(/\belse\b/, "else")
