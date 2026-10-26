class Version
  include Comparable

  attr_reader :major, :minor

  def initialize(major, minor)
    @major = major
    @minor = minor
  end

  def <=>(other)
    [major, minor] <=> [other.major, other.minor]
  end
end
