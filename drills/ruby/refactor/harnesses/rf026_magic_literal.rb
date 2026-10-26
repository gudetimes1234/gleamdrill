need :potential_energy, :fall_speed

tc "potential_energy(2, 10)", 196.2, potential_energy(2, 10)
tc "fall_speed(5)", 9.9, fall_speed(5)
tc "potential_energy(0, 10)", 0.0, potential_energy(0, 10)
uses(/^\s*[A-Z][A-Z0-9_]*\s*=/, "a named constant")
tc "style: 9.81 written once", 1, Drill.code.scan("9.81").length
