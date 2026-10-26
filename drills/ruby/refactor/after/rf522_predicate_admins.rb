class User
  attr_reader :name

  def initialize(name, admin)
    @name = name
    @admin = admin
  end

  def admin?
    @admin
  end
end

def moderators(users)
  users.select(&:admin?).map(&:name)
end
