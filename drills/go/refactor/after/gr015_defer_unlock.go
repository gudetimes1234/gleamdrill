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
	defer t.mu.Unlock()
	if t.left[event] == 0 {
		return fmt.Errorf("sold out: %s", event)
	}
	t.left[event]--
	return nil
}
