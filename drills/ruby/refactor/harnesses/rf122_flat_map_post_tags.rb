need :all_tags

tc 'all_tags([{ tags: ["ruby", "gems"] }, { tags: ["ruby"] }])', ["ruby", "gems", "ruby"], all_tags([{ tags: ["ruby", "gems"] }, { tags: ["ruby"] }])
tc 'all_tags([{ tags: [] }, { tags: ["oop"] }]) -- an untagged post', ["oop"], all_tags([{ tags: [] }, { tags: ["oop"] }])
tc "all_tags([])", [], all_tags([])
uses(/\.flat_map\b/, "flat_map")
avoids(/\.flatten\b/, "flatten")
