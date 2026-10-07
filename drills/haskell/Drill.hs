-- The Haskell harness prelude: compiled alongside every attempt and its
-- harness, so a harness can call tc/runCases, build trees, and compare
-- order-insensitive answers. Solutions use native lists where LeetCode has
-- linked lists; only the tree gets a type, because Haskell has no native one.
--
-- One copy lives here; `gleam run -m generate` copies it into
-- server/priv/haskell/Drill.hs for the api's runner and into each verify
-- directory. Do not edit the copies.
--
-- The report is one JSON line, the last thing printed, in the shape
-- server/src/server/exec.gleam reads: cases with expected/actual strings,
-- or an error with a phase and (when known) the line in Solution.hs. Stdout
-- is captured through a pipe, as in the Go prelude, so a user's prints ride
-- in the report rather than corrupting it. Only boot packages are used:
-- base, unix.
module Drill
  ( TestCase
  , tc
  , runCases
  , Tree(..)
  , tree
  , treeValues
  , sortInts
  , sortStrings
  , sortRows
  , sortGroups
  ) where

import Control.Concurrent (forkIO)
import Control.Concurrent.MVar (newEmptyMVar, putMVar, takeMVar)
import Control.Exception (SomeException, evaluate, try)
import Data.List (isPrefixOf, sort, sortBy)
import System.IO
import System.Posix.IO
  ( createPipe, dup, dupTo, fdToHandle, closeFd, stdOutput )

data TestCase = TestCase String String String

-- | One case: label, expected, actual. Both sides render through `show`,
-- so whatever the type, they compare as the same text the user reads.
tc :: Show a => String -> a -> a -> TestCase
tc label expected actual = TestCase label (show expected) (show actual)

-- | A binary tree, since Haskell has none. Level-order building below.
data Tree = Leaf | Node Tree Int Tree deriving (Eq, Show)

-- | Build a tree from LeetCode's level-order listing; Nothing is a hole.
tree :: [Maybe Int] -> Tree
tree values = build 0
  where
    slots = length values
    at i = if i < slots then values !! i else Nothing
    build i = case at i of
      Nothing -> Leaf
      Just v -> Node (build (2 * i + 1)) v (build (2 * i + 2))

-- | The tree back as a value list, in-order — enough to compare shapes
-- that encode a sorted result, and total on Leaf.
treeValues :: Tree -> [Int]
treeValues Leaf = []
treeValues (Node l v r) = treeValues l ++ [v] ++ treeValues r

-- Order-insensitive renderings, mirroring the Go prelude's sort helpers.
sortInts :: [Int] -> [Int]
sortInts = sort

sortStrings :: [String] -> [String]
sortStrings = sort

-- | Rows sorted, order inside each row kept: pair lists and the like.
sortRows :: [[Int]] -> [[Int]]
sortRows = sortBy compare

-- | Each group sorted, then the groups: anagram buckets and friends.
sortGroups :: [[String]] -> [[String]]
sortGroups = sortBy compare . map sort

-- | The harness entry point: force every case, catch whatever the attempt
-- throws, and print the one-line JSON report last.
runCases :: IO [TestCase] -> IO ()
runCases cases = do
  (result, output) <- captured (try (cases >>= mapM force))
  putStrLn (report result output)
  where
    force (TestCase label expected actual) = do
      _ <- evaluate (length expected)
      _ <- evaluate (length actual)
      pure (TestCase label expected actual)

-- | Run an action with stdout redirected into a pipe, returning what it
-- printed. A reader thread drains concurrently so a chatty attempt cannot
-- deadlock on a full pipe buffer.
captured :: IO a -> IO (a, String)
captured action = do
  hFlush stdout
  (readEnd, writeEnd) <- createPipe
  keep <- dup stdOutput
  _ <- dupTo writeEnd stdOutput
  closeFd writeEnd
  reader <- fdToHandle readEnd
  box <- newEmptyMVar
  _ <- forkIO (hGetContents reader >>= \t -> evaluate (length t) >> putMVar box t)
  value <- action
  hFlush stdout
  _ <- dupTo keep stdOutput
  closeFd keep
  output <- takeMVar box
  hClose reader
  pure (value, output)

report :: Either SomeException [TestCase] -> String -> String
report result output = case result of
  Right cases ->
    object
      [ ("cases", array (map caseJson cases))
      , ("stdout", jstr output)
      , ("error", "null")
      ]
  Left failure ->
    let message = show failure
    in object
         [ ("cases", array [])
         , ("stdout", jstr output)
         , ( "error"
           , object
               [ ("phase", jstr "run")
               , ("line", maybe "null" show (lineInSolution message))
               , ("message", jstr message)
               ]
           )
         ]

caseJson :: TestCase -> String
caseJson (TestCase label expected actual) =
  object
    [ ("label", jstr label)
    , ("expected", jstr expected)
    , ("actual", jstr actual)
    , ("passed", if expected == actual then "true" else "false")
    ]

-- | `error` under HasCallStack names its site as "Solution.hs:12:5"; pull
-- the line out so the editor can underline it. A character-level scan
-- rather than `words`, because the exception rendering around the site
-- has changed across GHC releases and only the substring is stable.
lineInSolution :: String -> Maybe Int
lineInSolution = scan
  where
    site = "Solution.hs:"
    scan [] = Nothing
    scan s
      | site `isPrefixOf` s =
          case span (`elem` "0123456789") (drop (length site) s) of
            (digits@(_ : _), _) -> Just (read digits)
            _ -> scan (drop 1 s)
      | otherwise = scan (drop 1 s)

-- A JSON emitter small enough to carry: base has no JSON library.
object :: [(String, String)] -> String
object fields =
  "{" ++ intercalateComma [jstr k ++ ":" ++ v | (k, v) <- fields] ++ "}"

array :: [String] -> String
array items = "[" ++ intercalateComma items ++ "]"

intercalateComma :: [String] -> String
intercalateComma [] = ""
intercalateComma [x] = x
intercalateComma (x : rest) = x ++ "," ++ intercalateComma rest

jstr :: String -> String
jstr s = '"' : concatMap esc s ++ "\""
  where
    esc '"' = "\\\""
    esc '\\' = "\\\\"
    esc '\n' = "\\n"
    esc '\t' = "\\t"
    esc '\r' = "\\r"
    esc c
      | c < ' ' = "\\u00" ++ pad (hex (fromEnum c))
      | otherwise = [c]
    hex n = let digits = "0123456789abcdef"
            in [digits !! (n `div` 16), digits !! (n `mod` 16)]
    pad h = h
