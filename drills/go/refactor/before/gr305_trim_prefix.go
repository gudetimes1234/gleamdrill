package main

func stripScheme(url string) string {
	if len(url) >= 8 && url[:8] == "https://" {
		return url[8:]
	}
	return url
}
