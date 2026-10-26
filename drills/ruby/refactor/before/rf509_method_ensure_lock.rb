def with_lock(state)
  begin
    state[:locked] = true
    yield
  ensure
    state[:locked] = false
  end
end
