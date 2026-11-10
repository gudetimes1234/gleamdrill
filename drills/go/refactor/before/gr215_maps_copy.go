package main

func settings(overrides map[string]string) map[string]string {
	out := map[string]string{"theme": "light", "lang": "en"}
	for k, v := range overrides {
		out[k] = v
	}
	return out
}
