package main

type Logger struct {
	prefix string
}

func (l Logger) Log(msg string) string {
	return l.prefix + msg
}

type Service struct {
	logger Logger
	name   string
}

func (s Service) Log(msg string) string {
	return s.logger.Log(msg)
}

func newService(name string) Service {
	return Service{logger: Logger{prefix: "[" + name + "] "}, name: name}
}

func start(s Service) string {
	return s.Log(s.name + " started")
}
