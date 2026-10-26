need :present_names

tc 'present_names(["Ada", "", "  ", "Grace"])', ["Ada", "Grace"], present_names(["Ada", "", "  ", "Grace"])
tc 'present_names(["   "]) -- all blank', [], present_names(["   "])
tc "present_names([])", [], present_names([])
uses(/\.reject\b/, "reject")
avoids(/\.each\b/, "each loop")
avoids(/<<|\.push\b/, "pushing into an accumulator")
