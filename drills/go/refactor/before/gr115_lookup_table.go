package main

func statusText(code int) string {
	switch code {
	case 200:
		return "OK"
	case 201:
		return "Created"
	case 301:
		return "Moved Permanently"
	case 404:
		return "Not Found"
	case 503:
		return "Service Unavailable"
	default:
		return "Unknown"
	}
}
