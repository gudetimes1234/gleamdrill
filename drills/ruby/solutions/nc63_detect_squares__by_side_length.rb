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

    # Pick the corner directly above or below instead. That fixes the side
    # length, which leaves two squares to check rather than one: the
    # remaining corners can be to the left or to the right.
    @counts.each do |(px, py), copies|
      next if px != x || py == y

      side = (py - y).abs
      [x + side, x - side].each do |column|
        total += copies * @counts.fetch([column, y], 0) * @counts.fetch([column, py], 0)
      end
    end

    total
  end
end
