package main

type Rect struct {
	W, H float64
}

func rectArea(r Rect) float64 {
	return r.W * r.H
}

func totalArea(rects []Rect) float64 {
	total := 0.0
	for _, r := range rects {
		total += rectArea(r)
	}
	return total
}
