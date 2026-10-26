need :initials

staff = [{ first: "Ada", last: "Lovelace" }, { first: "Alan", last: "Turing" }]
tc "initials(staff)", { "Ada Lovelace" => "AL", "Alan Turing" => "AT" }, initials(staff)
tc "initials([])", {}, initials([])
tc "initials([Bo Li])", { "Bo Li" => "BL" }, initials([{ first: "Bo", last: "Li" }])
uses(/\.to_h\s*(\{|do)/, "to_h with a block")
avoids(/Hash\[/, "Hash[] on pairs")
avoids(/\.map\b/, "map into pairs first")
