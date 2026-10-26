def redact(request)
  request.except(:password, :token)
end
