package main

type Server struct {
	Host    string
	Port    int
	Timeout int
}

func localServer() Server {
	return Server{Host: "localhost", Port: 8080, Timeout: 30}
}

func testServer() Server {
	return Server{Host: "127.0.0.1", Port: 8080, Timeout: 30}
}

func publicServer(host string) Server {
	return Server{Host: host, Port: 8080, Timeout: 30}
}
