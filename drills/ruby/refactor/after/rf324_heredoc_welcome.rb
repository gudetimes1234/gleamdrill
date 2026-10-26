def welcome_email(name, plan)
  <<~EMAIL
    Hi #{name},

    Thanks for choosing the #{plan} plan.
    Reply to this email if you need help.
  EMAIL
end
