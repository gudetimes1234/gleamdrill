Color = Struct.new(:red, :green, :blue)

def rgb(red, green, blue)
  Color.new(red, green, blue)
end

def to_hex(color)
  format("#%02x%02x%02x", color.red, color.green, color.blue)
end

def grayscale?(color)
  color.red == color.green && color.green == color.blue
end
