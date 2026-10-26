def welcome_email(name, plan)
  lines = []
  lines << "Hi #{name},"
  lines << ""
  lines << "Thanks for choosing the #{plan} plan."
  lines << "Reply to this email if you need help."
  lines.join("\n") + "\n"
end
