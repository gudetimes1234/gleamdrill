class Bird
  def initialize(data)
    @data = data
  end

  def plumage
    "unknown"
  end
end

class EuropeanSwallow < Bird
  def plumage
    "average"
  end
end

class AfricanSwallow < Bird
  def plumage
    @data[:coconuts] > 2 ? "tired" : "average"
  end
end

class NorwegianBlueParrot < Bird
  def plumage
    @data[:voltage] > 100 ? "scorched" : "beautiful"
  end
end

KINDS = { "european" => EuropeanSwallow, "african" => AfricanSwallow, "norwegian_blue" => NorwegianBlueParrot }.freeze

def plumage(bird)
  KINDS.fetch(bird[:type], Bird).new(bird).plumage
end
