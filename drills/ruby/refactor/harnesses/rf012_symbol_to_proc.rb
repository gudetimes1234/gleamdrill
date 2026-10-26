need :upcased, :lengths

tc 'upcased(%w[a bc])', %w[A BC], upcased(%w[a bc])
tc 'lengths(%w[a bc])', [1, 2], lengths(%w[a bc])
tc "upcased([])", [], upcased([])
uses(/&:upcase/, "&:upcase")
uses(/&:length/, "&:length")
avoids(/\{\s*\|(\w+)\|\s*\1\.\w+\s*\}/, "block that only calls one method")
