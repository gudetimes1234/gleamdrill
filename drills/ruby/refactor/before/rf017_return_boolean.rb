def adult?(age)
  if age >= 18
    return true
  else
    return false
  end
end

def even_and_positive?(n)
  if n.even? && n > 0
    true
  else
    false
  end
end
