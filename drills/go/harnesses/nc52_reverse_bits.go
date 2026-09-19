package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("reverseBits(43261596)", uint32(964176192), reverseBits(43261596)),
			tc("reverseBits(4294967293)", uint32(3221225471), reverseBits(4294967293)),
			tc("reverseBits(0)", uint32(0), reverseBits(0)),
			tc("reverseBits(1)", uint32(2147483648), reverseBits(1)),
		}
	})
}
