package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`settings({"theme": "dark"})`, map[string]string{"lang": "en", "theme": "dark"}, settings(map[string]string{"theme": "dark"})),
			tc(`settings({"font": "mono"})`, map[string]string{"font": "mono", "lang": "en", "theme": "light"}, settings(map[string]string{"font": "mono"})),
			tc(`settings({})`, map[string]string{"lang": "en", "theme": "light"}, settings(map[string]string{})),
			tc(`settings(nil) -- no overrides`, map[string]string{"lang": "en", "theme": "light"}, settings(nil)),
			uses(`maps\.(Copy|Clone)\(`, "maps.Copy"),
			avoids(`\bfor\b`, "a copy loop"),
		}
	})
}
