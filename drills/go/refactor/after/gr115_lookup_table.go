package main

var statusTexts = map[int]string{
	200: "OK",
	201: "Created",
	301: "Moved Permanently",
	404: "Not Found",
	503: "Service Unavailable",
}

func statusText(code int) string {
	if text, ok := statusTexts[code]; ok {
		return text
	}
	return "Unknown"
}
