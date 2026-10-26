class User
  attr_reader :name

  def initialize(name, admin)
    @name = name
    @admin = admin
  end

  def is_admin
    @admin
  end
end

def moderators(users)
  users.select { |user| user.is_admin }.map { |user| user.name }
end
