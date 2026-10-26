def conversion_table(from, to, by)
  from.step(to, by).map { |c| "#{c}C = #{c * 9 / 5 + 32}F" }
end
