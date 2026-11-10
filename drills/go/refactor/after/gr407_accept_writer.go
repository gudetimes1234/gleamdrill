package main

import (
	"fmt"
	"io"
)

func writeReport(w io.Writer, items []string) {
	for i, item := range items {
		fmt.Fprintf(w, "%d. %s\n", i+1, item)
	}
}
