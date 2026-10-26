def escape_html(text)
  text.gsub("&", "&amp;").gsub("<", "&lt;").gsub(">", "&gt;")
end
