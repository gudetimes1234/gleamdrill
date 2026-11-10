package main

func displayName(nicks map[string]string, user string) string {
	if nicks[user] != "" {
		return nicks[user]
	}
	return user
}
