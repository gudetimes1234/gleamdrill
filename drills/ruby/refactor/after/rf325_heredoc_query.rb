def report_query(table, days)
  <<~SQL
    SELECT name, total
    FROM #{table}
    WHERE age_days < #{days}
    ORDER BY total DESC
  SQL
end
