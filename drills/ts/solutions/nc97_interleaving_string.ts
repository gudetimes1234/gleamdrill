export function isInterleave(s1: string, s2: string, s3: string): boolean {
  if (s1.length + s2.length !== s3.length) return false;

  const memo = new Map<string, boolean>();

  // How much of each source has been used is the entire state -- the position
  // in the target is their sum, so it never has to be tracked. That collapse
  // from three indices to two is what makes the table two-dimensional.
  const works = (i: number, j: number): boolean => {
    if (i === s1.length && j === s2.length) return true;
    const key = `${i},${j}`;
    if (!memo.has(key)) {
      const target = s3[i + j];
      memo.set(
        key,
        (i < s1.length && s1[i] === target && works(i + 1, j)) ||
          (j < s2.length && s2[j] === target && works(i, j + 1)),
      );
    }
    return memo.get(key)!;
  };

  return works(0, 0);
}
