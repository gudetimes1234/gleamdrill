def summarize(response)
  if response[:status] == "ok" && response.key?(:data)
    "got #{response[:data].size} records"
  elsif response[:status] == "error" && response.key?(:message)
    "failed: #{response[:message]}"
  else
    "bad response"
  end
end
