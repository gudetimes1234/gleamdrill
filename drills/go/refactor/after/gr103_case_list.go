package main

func mediaKind(ext string) string {
	switch ext {
	case ".jpg", ".png", ".gif":
		return "image"
	case ".mp4", ".mov":
		return "video"
	default:
		return "other"
	}
}
