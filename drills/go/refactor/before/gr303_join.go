package main

func csvRow(fields []string) string {
	row := ""
	for i, f := range fields {
		if i > 0 {
			row += ","
		}
		row += f
	}
	return row
}
