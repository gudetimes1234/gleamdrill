package main

type Server struct {
	Host    string
	Port    int
	Timeout int
}

func NewServer(host string) Server {
	return Server{Host: host, Port: 8080, Timeout: 30}
}

func localServer() Server {
	return NewServer("localhost")
}

func testServer() Server {
	return NewServer("127.0.0.1")
}

func publicServer(host string) Server {
	return NewServer(host)
}
