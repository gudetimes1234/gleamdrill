need :avatar_url

Profile = Struct.new(:avatar)
Member = Struct.new(:profile)
tc "avatar_url(member with avatar)", "/a/1.png", avatar_url(Member.new(Profile.new("/a/1.png")))
tc "avatar_url(member, no profile)", nil, avatar_url(Member.new(nil))
tc "avatar_url(nil)", nil, avatar_url(nil)
uses(/&\./, "safe navigation &.")
avoids(/&&/, "&& chain")
