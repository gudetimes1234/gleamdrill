package main

import (
	"fmt"
	"sync"
)

type Tickets struct {
	mu   sync.Mutex
	left map[string]int
}

func (t *Tickets) Take(event string) error {
	t.mu.Lock()
	if t.left[event] == 0 {
		t.mu.Unlock()
		return fmt.Errorf("sold out: %s", event)
	}
	t.left[event]--
	t.mu.Unlock()
	return nil
}
