need :escape_html

tc 'escape_html("a < b && c > d")', "a &lt; b &amp;&amp; c &gt; d", escape_html("a < b && c > d")
tc 'escape_html("&lt;") -- escaped once, not twice', "&amp;lt;", escape_html("&lt;")
tc 'escape_html("plain")', "plain", escape_html("plain")
tc "style: one gsub call", 1, Drill.code.scan(/\.gsub\b/).length
uses(/=>/, "a replacement hash")
