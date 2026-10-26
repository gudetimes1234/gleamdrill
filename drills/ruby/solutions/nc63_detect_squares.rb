class DetectSquares
  def initialize
    @counts = Hash.new(0)
  end

  def add(point)
    @counts[[point[0], point[1]]] += 1
  end

  def count(point)
    x, y = point
    total = 0

    # Pick the corner diagonally opposite: that one choice fixes the whole
    # square, because the other two corners must be at (x, py) and (px, y).
    # A valid diagonal partner shares neither coordinate and sits on a true
    # diagonal, and duplicates multiply rather than repeat.
    @counts.each do |(px, py), copies|
      next if px == x || py == y || (px - x).abs != (py - y).abs

      total += copies * @counts.fetch([x, py], 0) * @counts.fetch([px, y], 0)
    end

    total
  end
end
