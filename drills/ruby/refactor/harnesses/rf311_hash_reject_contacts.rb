need :with_email

book = { "ann" => "ann@x.io", "bo" => nil, "cy" => "", "di" => "di@x.io" }
tc "with_email(book)", { "ann" => "ann@x.io", "di" => "di@x.io" }, with_email(book)
tc "with_email(book) leaves book alone", 4, (with_email(book); book.size)
tc "with_email({})", {}, with_email({})
uses(/\.(reject|select|filter)\b/, "reject")
avoids(/\.each\b/, "each loop")
avoids(/\.delete\b|\.dup\b/, "copy then delete")
