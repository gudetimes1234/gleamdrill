def escape_html(text)
  text.gsub(/[&<>]/, "&" => "&amp;", "<" => "&lt;", ">" => "&gt;")
end
