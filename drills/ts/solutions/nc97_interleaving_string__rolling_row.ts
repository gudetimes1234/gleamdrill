export function isInterleave(s1: string, s2: string, s3: string): boolean {
  if (s1.length + s2.length !== s3.length) return false;

  // Bottom-up over the same two-index state. Row i says which prefixes of s2
  // can pair with the first i characters of s1; each row depends only on the
  // one above and on itself to the left, so one row suffices.
  const row = new Array<boolean>(s2.length + 1).fill(false);
  row[0] = true;
  for (let j = 1; j <= s2.length; j++) row[j] = row[j - 1] && s2[j - 1] === s3[j - 1];

  for (let i = 1; i <= s1.length; i++) {
    row[0] = row[0] && s1[i - 1] === s3[i - 1];
    for (let j = 1; j <= s2.length; j++) {
      const target = s3[i + j - 1];
      row[j] = (row[j] && s1[i - 1] === target) || (row[j - 1] && s2[j - 1] === target);
    }
  }

  return row[s2.length];
}
