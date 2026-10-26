def rgb(red, green, blue)
  [red, green, blue]
end

def to_hex(color)
  format("#%02x%02x%02x", color[0], color[1], color[2])
end

def grayscale?(color)
  color[0] == color[1] && color[1] == color[2]
end
