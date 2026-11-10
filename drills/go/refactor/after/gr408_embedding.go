package main

type Logger struct {
	prefix string
}

func (l Logger) Log(msg string) string {
	return l.prefix + msg
}

type Service struct {
	Logger
	name string
}

func newService(name string) Service {
	return Service{Logger: Logger{prefix: "[" + name + "] "}, name: name}
}

func start(s Service) string {
	return s.Log(s.name + " started")
}
