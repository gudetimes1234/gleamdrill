def conversion_table(from, to, by)
  rows = []
  c = from
  while c <= to
    rows << "#{c}C = #{c * 9 / 5 + 32}F"
    c += by
  end
  rows
end
