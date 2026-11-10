package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`mediaKind(".png")`, "image", mediaKind(".png")),
			tc(`mediaKind(".jpg")`, "image", mediaKind(".jpg")),
			tc(`mediaKind(".mov")`, "video", mediaKind(".mov")),
			tc(`mediaKind(".txt")`, "other", mediaKind(".txt")),
			tc(`mediaKind("") -- no extension`, "other", mediaKind("")),
			uses(`\bcase\b[^:\n]*,`, "a case with several values"),
			avoids(`(?s)"image".*"image"`, "the same case body written twice"),
		}
	})
}
