package main

import "maps"

func settings(overrides map[string]string) map[string]string {
	out := map[string]string{"theme": "light", "lang": "en"}
	maps.Copy(out, overrides)
	return out
}
