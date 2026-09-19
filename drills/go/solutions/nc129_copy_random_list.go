package main

func copyRandomList(head *RandomNode) *RandomNode {
	// Two passes with a map from original to copy: make every copy first,
	// then wire Next and Random through the map, so a Random pointing
	// forward finds its copy already made.
	copies := map[*RandomNode]*RandomNode{}
	for node := head; node != nil; node = node.Next {
		copies[node] = &RandomNode{Val: node.Val}
	}
	for node := head; node != nil; node = node.Next {
		copies[node].Next = copies[node.Next]
		copies[node].Random = copies[node.Random]
	}
	return copies[head]
}
