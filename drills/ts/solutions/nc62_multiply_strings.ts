export function multiply(num1: string, num2: string): string {
  if (num1 === "0" || num2 === "0") return "0";

  const a = [...num1].reverse().map(Number);
  const b = [...num2].reverse().map(Number);

  // Long multiplication with the carrying postponed. Digit i of one number
  // times digit j of the other always lands at position i + j, so every product
  // can be dropped straight into its slot and the carries settled in one sweep
  // at the end.
  const slots = new Array<number>(a.length + b.length).fill(0);
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) slots[i + j] += a[i] * b[j];
  }

  let carry = 0;
  const digits: number[] = [];
  for (const slot of slots) {
    const total = slot + carry;
    digits.push(total % 10);
    carry = Math.floor(total / 10);
  }

  return digits.reverse().join("").replace(/^0+/, "") || "0";
}
