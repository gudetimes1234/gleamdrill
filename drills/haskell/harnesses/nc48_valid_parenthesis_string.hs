module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "checkValidString \"()\"" True (checkValidString "()")
       , tc "checkValidString \"(*)\"" True (checkValidString "(*)")
       , tc "checkValidString \"(*))\"" True (checkValidString "(*))")
       , tc "checkValidString \")(\"" False (checkValidString ")(")
       , tc "checkValidString \"(((**\"" False (checkValidString "(((**")
       , tc "checkValidString \"**((\"" False (checkValidString "**((")
       , tc "checkValidString \"\"" True (checkValidString "")
       ])
