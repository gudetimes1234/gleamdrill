class Money
  def initialize(cents)
    @cents = cents
  end

  def to_string
    format("$%.2f", @cents / 100.0)
  end
end

def receipt_line(item, money)
  "#{item}: #{money.to_string}"
end
