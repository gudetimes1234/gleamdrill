need :oldest

people = [{ name: "Ann", age: 31 }, { name: "Bo", age: 64 }, { name: "Cy", age: 7 }]
tc "oldest(people)", { name: "Bo", age: 64 }, oldest(people)
tc "oldest([]) -- nobody is nil", nil, oldest([])
uses(/\.max_by\b/, "max_by")
avoids(/\.each\b/, "each loop")
avoids(/\bnil\?/, "nil-checked best-so-far")
