need :report_query

tc 'report_query("orders", 30)', "SELECT name, total\nFROM orders\nWHERE age_days < 30\nORDER BY total DESC\n", report_query("orders", 30)
tc 'report_query("refunds", 0).lines.size -- four lines', 4, report_query("refunds", 0).lines.size
uses(/<<~/, "a <<~ heredoc")
avoids(/\\n/, "\\n escapes")
avoids(/"\s*\+/, "string +")
