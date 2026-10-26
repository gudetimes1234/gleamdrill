need :with_lock

state = { locked: false }
tc "with_lock(state) { state[:locked] } -- locked inside", true, with_lock(state) { state[:locked] }
tc "state[:locked] afterwards", false, state[:locked]
failed = { locked: false }
begin
  with_lock(failed) { raise "boom" }
rescue RuntimeError
end
tc "unlocked even when the block raises", false, failed[:locked]
tc "with_lock(state) { 42 } -- the block's value comes back", 42, with_lock(state) { 42 }
uses(/^\s*ensure\b/, "ensure")
avoids(/\bbegin\b/, "begin")
