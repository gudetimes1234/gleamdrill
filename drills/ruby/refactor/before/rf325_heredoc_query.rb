def report_query(table, days)
  "SELECT name, total\n" +
    "FROM #{table}\n" +
    "WHERE age_days < #{days}\n" +
    "ORDER BY total DESC\n"
end
