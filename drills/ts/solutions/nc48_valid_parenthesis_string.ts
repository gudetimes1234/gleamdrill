export function checkValidString(s: string): boolean {
  // Rather than guessing what each star should be, carry the *range* of open
  // counts still possible: low if every star so far were a closer, high if
  // every one were an opener. High going negative means even the most generous
  // reading has too many closers; low is clamped at zero because a star can
  // always be nothing.
  let low = 0;
  let high = 0;

  for (const c of s) {
    if (c === "(") {
      low++;
      high++;
    } else if (c === ")") {
      low = Math.max(low - 1, 0);
      high--;
    } else {
      low = Math.max(low - 1, 0);
      high++;
    }
    if (high < 0) return false;
  }

  return low === 0;
}
