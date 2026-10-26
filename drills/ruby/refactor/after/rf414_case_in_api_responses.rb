def summarize(response)
  case response
  in { status: "ok", data: } then "got #{data.size} records"
  in { status: "error", message: } then "failed: #{message}"
  else "bad response"
  end
end
