module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "push -2, 0, -3; getMin" (-3) (getMin loaded)
       , tc "pop; top" 0 (top popped)
       , tc "getMin after pop" (-2) (getMin popped)
       , tc "push 2, 2; pop; getMin -- a duplicate minimum survives one pop" 2 (getMin doubled)
       ])
  where
    loaded = push (-3) (push 0 (push (-2) emptyMinStack))
    popped = pop loaded
    doubled = pop (push 2 (push 2 emptyMinStack))
