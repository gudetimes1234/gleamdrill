class Version
  attr_reader :major, :minor

  def initialize(major, minor)
    @major = major
    @minor = minor
  end

  def <(other)
    major < other.major || (major == other.major && minor < other.minor)
  end

  def >(other)
    other < self
  end

  def ==(other)
    major == other.major && minor == other.minor
  end
end
