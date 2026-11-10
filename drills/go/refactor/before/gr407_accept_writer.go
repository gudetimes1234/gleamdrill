package main

import (
	"bytes"
	"fmt"
)

func writeReport(buf *bytes.Buffer, items []string) {
	for i, item := range items {
		fmt.Fprintf(buf, "%d. %s\n", i+1, item)
	}
}
