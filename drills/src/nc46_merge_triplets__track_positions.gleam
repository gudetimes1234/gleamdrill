import gleam/list

pub fn merge_triplets(
  triplets: List(#(Int, Int, Int)),
  target: #(Int, Int, Int),
) -> Bool {
  // Ask a different question: is each of the three positions hit exactly by
  // some usable triplet? A usable triplet is one no component of which exceeds
  // the target, and the answer is yes exactly when all three positions are
  // covered \u{2014} which is the same condition, arrived at without taking maxima.
  let usable =
    list.filter(triplets, fn(t) {
      t.0 <= target.0 && t.1 <= target.1 && t.2 <= target.2
    })

  list.any(usable, fn(t) { t.0 == target.0 })
  && list.any(usable, fn(t) { t.1 == target.1 })
  && list.any(usable, fn(t) { t.2 == target.2 })
}
