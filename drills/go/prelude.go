// The Go harness prelude: compiled alongside every attempt and its harness
// (all three are `package main`), so a harness can call `show`, `report`,
// build lists and trees, and a solution can use *ListNode and *TreeNode
// without declaring them.
//
// One copy lives here; `gleam run -m generate` copies it into
// server/priv/go/prelude.go for the api's runner and into each verify
// directory. Do not edit the copies.
//
// The report is one JSON line, the last thing printed, in the shape
// server/src/server/exec.gleam reads: cases with expected/actual strings,
// or an error with a phase and (when known) the line in solution.go.

package main

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
	"runtime/debug"
	"strconv"
	"strings"
)

// ListNode is LeetCode's singly linked list node.
type ListNode struct {
	Val  int
	Next *ListNode
}

// TreeNode is LeetCode's binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

type testCase struct {
	label, expected, actual string
}

type caseReport struct {
	Label    string `json:"label"`
	Expected string `json:"expected"`
	Actual   string `json:"actual"`
	Passed   bool   `json:"passed"`
}

type errorReport struct {
	Phase   string `json:"phase"`
	Line    *int   `json:"line"`
	Message string `json:"message"`
}

type runReport struct {
	Cases  []caseReport `json:"cases"`
	Stdout string       `json:"stdout"`
	Error  *errorReport `json:"error"`
}

// show renders any value the way expected and actual are compared: JSON,
// with nil slices and maps as their empty forms so a solution returning
// nil for "no answer" matches an expected empty list.
func show(v any) string {
	switch t := v.(type) {
	case *ListNode:
		return show(listValues(t))
	case *TreeNode:
		return show(treeValues(t))
	case []int:
		if t == nil {
			return "[]"
		}
	case []string:
		if t == nil {
			return "[]"
		}
	case [][]int:
		if t == nil {
			return "[]"
		}
	case []bool:
		if t == nil {
			return "[]"
		}
	}
	b, err := json.Marshal(v)
	if err != nil {
		return fmt.Sprintf("%#v", v)
	}
	return string(b)
}

// tc is one case: a label, the expected value and the actual one.
func tc(label string, expected any, actual any) testCase {
	return testCase{label, show(expected), show(actual)}
}

// What of the attempt's own printing the report carries.
const stdoutCap = 8000

// run evaluates the harness's cases and prints the report. The cases are
// built inside the callback so a panic in the solution is caught here and
// reported as a run error at the line in solution.go that raised it.
// Whatever the solution prints meanwhile goes into the report's stdout
// rather than ahead of it: os.Stdout is a pipe for the duration.
func run(cases func() []testCase) {
	real := os.Stdout
	reader, writer, err := os.Pipe()
	captured := make(chan string, 1)
	if err == nil {
		os.Stdout = writer
		go func() {
			var b strings.Builder
			io.Copy(&b, reader)
			captured <- b.String()
		}()
	}
	finish := func(report runReport) {
		if err == nil {
			writer.Close()
			os.Stdout = real
			report.Stdout = <-captured
			if len(report.Stdout) > stdoutCap {
				report.Stdout = report.Stdout[:stdoutCap] + "\n… (truncated)"
			}
		}
		emit(report)
	}
	defer func() {
		if r := recover(); r != nil {
			finish(runReport{Cases: []caseReport{}, Error: &errorReport{
				Phase:   "run",
				Line:    lineInSolution(debug.Stack()),
				Message: fmt.Sprintf("panic: %v", r),
			}})
			os.Exit(0)
		}
	}()
	out := []caseReport{}
	for _, c := range cases() {
		out = append(out, caseReport{c.label, c.expected, c.actual, c.expected == c.actual})
	}
	finish(runReport{Cases: out})
}

func emit(r runReport) {
	b, _ := json.Marshal(r)
	fmt.Println(string(b))
}

// The first frame of a stack trace inside solution.go names the line the
// user is looking for.
func lineInSolution(stack []byte) *int {
	for _, line := range strings.Split(string(stack), "\n") {
		line = strings.TrimSpace(line)
		i := strings.Index(line, "solution.go:")
		if i < 0 {
			continue
		}
		rest := line[i+len("solution.go:"):]
		end := strings.IndexAny(rest, " \t")
		if end >= 0 {
			rest = rest[:end]
		}
		if n, err := strconv.Atoi(rest); err == nil {
			return &n
		}
	}
	return nil
}

// list builds a linked list from values, nil for none.
func list(values ...int) *ListNode {
	var head *ListNode
	for i := len(values) - 1; i >= 0; i-- {
		head = &ListNode{values[i], head}
	}
	return head
}

func listValues(node *ListNode) []int {
	out := []int{}
	for n := 0; node != nil && n < 10000; n++ {
		out = append(out, node.Val)
		node = node.Next
	}
	return out
}

// tree builds a binary tree from LeetCode's level-order form, where a nil
// entry is a missing child. `x` stands for nil: tree(4, 2, 7, x, 3).
func tree(values ...any) *TreeNode {
	if len(values) == 0 || values[0] == nil {
		return nil
	}
	root := &TreeNode{Val: values[0].(int)}
	queue := []*TreeNode{root}
	i := 1
	for len(queue) > 0 && i < len(values) {
		node := queue[0]
		queue = queue[1:]
		if i < len(values) {
			if v, ok := values[i].(int); ok {
				node.Left = &TreeNode{Val: v}
				queue = append(queue, node.Left)
			}
			i++
		}
		if i < len(values) {
			if v, ok := values[i].(int); ok {
				node.Right = &TreeNode{Val: v}
				queue = append(queue, node.Right)
			}
			i++
		}
	}
	return root
}

// x is a missing child in tree(...).
var x any = nil

// treeValues is the level-order form back, trailing nils trimmed.
func treeValues(root *TreeNode) []any {
	out := []any{}
	queue := []*TreeNode{root}
	for len(queue) > 0 && len(out) < 500 {
		node := queue[0]
		queue = queue[1:]
		if node == nil {
			out = append(out, nil)
			continue
		}
		out = append(out, node.Val)
		queue = append(queue, node.Left, node.Right)
	}
	for len(out) > 0 && out[len(out)-1] == nil {
		out = out[:len(out)-1]
	}
	return out
}
