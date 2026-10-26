need :volume_level

tc "volume_level(40)", 40, volume_level(40)
tc "volume_level(-5) -- too low", 0, volume_level(-5)
tc "volume_level(130) -- too high", 100, volume_level(130)
tc "volume_level(100) -- the limit itself", 100, volume_level(100)
uses(/\.clamp\b/, "clamp")
avoids(/\bif\b|\?.*:/, "if/elsif")
