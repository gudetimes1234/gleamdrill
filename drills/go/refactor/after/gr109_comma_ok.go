package main

func displayName(nicks map[string]string, user string) string {
	if nick, ok := nicks[user]; ok {
		return nick
	}
	return user
}
