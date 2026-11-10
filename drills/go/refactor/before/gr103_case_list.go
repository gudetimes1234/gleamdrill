package main

func mediaKind(ext string) string {
	switch ext {
	case ".jpg":
		return "image"
	case ".png":
		return "image"
	case ".gif":
		return "image"
	case ".mp4":
		return "video"
	case ".mov":
		return "video"
	default:
		return "other"
	}
}
