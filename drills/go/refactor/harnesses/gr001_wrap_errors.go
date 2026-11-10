package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("loadProfile(7).Error()", "load profile 7: not found", loadProfile(7).Error()),
			uses(`%w`, "%w to wrap the cause"),
			avoids(`%v", id, err`, "%v, which flattens the cause to text"),
		}
	})
}
