package main

func multiply(num1 string, num2 string) string {
	if num1 == "0" || num2 == "0" {
		return "0"
	}
	// Long multiplication as written by hand: one partial product per
	// digit of num2, shifted, and summed as strings.
	total := "0"
	for j := len(num2) - 1; j >= 0; j-- {
		partial := multiplyByDigit(num1, int(num2[j]-'0'))
		for shift := len(num2) - 1 - j; shift > 0; shift-- {
			partial += "0"
		}
		total = addStrings(total, partial)
	}
	return total
}

func multiplyByDigit(num string, digit int) string {
	if digit == 0 {
		return "0"
	}
	out := []byte{}
	carry := 0
	for i := len(num) - 1; i >= 0; i-- {
		value := int(num[i]-'0')*digit + carry
		out = append(out, byte('0'+value%10))
		carry = value / 10
	}
	for carry > 0 {
		out = append(out, byte('0'+carry%10))
		carry /= 10
	}
	for i, j := 0, len(out)-1; i < j; i, j = i+1, j-1 {
		out[i], out[j] = out[j], out[i]
	}
	return string(out)
}

func addStrings(a, b string) string {
	out := []byte{}
	carry := 0
	for i, j := len(a)-1, len(b)-1; i >= 0 || j >= 0 || carry > 0; i, j = i-1, j-1 {
		value := carry
		if i >= 0 {
			value += int(a[i] - '0')
		}
		if j >= 0 {
			value += int(b[j] - '0')
		}
		out = append(out, byte('0'+value%10))
		carry = value / 10
	}
	for i, j := 0, len(out)-1; i < j; i, j = i+1, j-1 {
		out[i], out[j] = out[j], out[i]
	}
	return string(out)
}
