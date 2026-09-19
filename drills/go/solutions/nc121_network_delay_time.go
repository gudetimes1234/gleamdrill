package main

import "container/heap"

type item struct{ node, distance int }

type nearestFirst []item

func (h nearestFirst) Len() int           { return len(h) }
func (h nearestFirst) Less(i, j int) bool { return h[i].distance < h[j].distance }
func (h nearestFirst) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *nearestFirst) Push(x any)        { *h = append(*h, x.(item)) }
func (h *nearestFirst) Pop() any {
	old := *h
	x := old[len(old)-1]
	*h = old[:len(old)-1]
	return x
}

func networkDelayTime(times [][]int, n int, k int) int {
	// Dijkstra from k: the time the signal reaches every node is the
	// longest of the shortest paths, or -1 if any node is never reached.
	next := make([][]item, n+1)
	for _, t := range times {
		next[t[0]] = append(next[t[0]], item{t[1], t[2]})
	}
	best := make([]int, n+1)
	for i := range best {
		best[i] = -1
	}
	h := &nearestFirst{{k, 0}}
	for h.Len() > 0 {
		current := heap.Pop(h).(item)
		if best[current.node] >= 0 {
			continue
		}
		best[current.node] = current.distance
		for _, edge := range next[current.node] {
			if best[edge.node] < 0 {
				heap.Push(h, item{edge.node, current.distance + edge.distance})
			}
		}
	}
	answer := 0
	for node := 1; node <= n; node++ {
		if best[node] < 0 {
			return -1
		}
		answer = max(answer, best[node])
	}
	return answer
}
