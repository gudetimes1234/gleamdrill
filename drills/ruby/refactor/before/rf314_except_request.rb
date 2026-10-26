def redact(request)
  copy = request.dup
  copy.delete(:password)
  copy.delete(:token)
  copy
end
