export function multiply(num1: string, num2: string): string {
  if (num1 === "0" || num2 === "0") return "0";

  // Long multiplication exactly as taught: one partial product per digit of the
  // second number, each shifted left by its position, all added up. It needs
  // string addition as well as string multiplication, which is why the
  // accumulating version exists -- but writing add once is worth it.
  let total = "0";
  [...num2].reverse().forEach((digit, shift) => {
    total = add(total, timesDigit(num1, Number(digit)) + "0".repeat(shift));
  });
  return total;
}

function timesDigit(number: string, digit: number): string {
  const out: number[] = [];
  let carry = 0;
  for (let i = number.length - 1; i >= 0; i--) {
    const product = Number(number[i]) * digit + carry;
    out.push(product % 10);
    carry = Math.floor(product / 10);
  }
  if (carry) out.push(carry);
  return out.reverse().join("").replace(/^0+/, "") || "0";
}

function add(left: string, right: string): string {
  const out: number[] = [];
  let carry = 0;
  let i = left.length - 1;
  let j = right.length - 1;
  while (i >= 0 || j >= 0 || carry) {
    let total = carry;
    if (i >= 0) total += Number(left[i--]);
    if (j >= 0) total += Number(right[j--]);
    out.push(total % 10);
    carry = Math.floor(total / 10);
  }
  return out.reverse().join("").replace(/^0+/, "") || "0";
}
