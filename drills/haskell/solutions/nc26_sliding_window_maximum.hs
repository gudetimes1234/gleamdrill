module Solution where

import Data.Array
import Data.Sequence (Seq, ViewL(..), ViewR(..), (|>))
import qualified Data.Sequence as Seq

maxSlidingWindow :: [Int] -> Int -> [Int]
maxSlidingWindow nums k = reverse results
  where
    arr = listArray (0, length nums - 1) nums
    -- The deque holds indices whose values are decreasing: the front is
    -- the window's maximum.
    (_, results) = foldl step (Seq.empty, []) (zip [0 ..] nums)
    step (deque, acc) (i, n) =
      let inWindow = case Seq.viewl deque of
            front :< rest | front <= i - k -> rest
            _ -> deque
          -- A smaller value behind a larger newcomer can never be a maximum again.
          trimmed = dropSmaller inWindow
          dropSmaller d = case Seq.viewr d of
            rest :> back | arr ! back < n -> dropSmaller rest
            _ -> d
          deque' = trimmed |> i
          acc' = case Seq.viewl deque' of
            front :< _ | i >= k - 1 -> arr ! front : acc
            _ -> acc
      in (deque', acc')
