def with_lock(state)
  state[:locked] = true
  yield
ensure
  state[:locked] = false
end
