def ascending?(versions)
  ok = true
  i = 0
  while i < versions.length - 1
    ok = false if versions[i] >= versions[i + 1]
    i += 1
  end
  ok
end
