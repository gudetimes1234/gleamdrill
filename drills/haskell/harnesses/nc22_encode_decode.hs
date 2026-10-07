module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "decode (encode [\"lint\", \"code\", \"love\", \"you\"])" ["lint", "code", "love", "you"] (decode (encode ["lint", "code", "love", "you"]))
       , tc "decode (encode [\"we\", \"say\", \":\", \"yes\"])" ["we", "say", ":", "yes"] (decode (encode ["we", "say", ":", "yes"]))
       , tc "decode (encode [\"\"])" [""] (decode (encode [""]))
       , tc "decode (encode [])" [] (decode (encode []))
       , tc "decode (encode [\"a#b,c\", \"3#\", \"\"])" ["a#b,c", "3#", ""] (decode (encode ["a#b,c", "3#", ""]))
       ])
