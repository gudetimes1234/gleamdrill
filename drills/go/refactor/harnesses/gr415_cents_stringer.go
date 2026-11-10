package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`receiptLine("tea", 250)`, "tea: $2.50", receiptLine("tea", 250)),
			tc(`receiptLine("gum", 5)`, "gum: $0.05", receiptLine("gum", 5)),
			tc(`receiptLine("free", 0)`, "free: $0.00", receiptLine("free", 0)),
			tc(`receiptLine("tv", 129999)`, "tv: $1299.99", receiptLine("tv", 129999)),
			uses(`\)\s*String\(\)\s*string\b`, "a String method"),
			avoids(`func\s+format\w*\(`, "a formatCents helper"),
		}
	})
}
