def ascending?(versions)
  versions.each_cons(2).all? { |older, newer| older < newer }
end
