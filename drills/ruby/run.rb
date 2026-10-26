# The Ruby drill runner, shared by the server (server/priv/ruby/run.rb), the
# terminal app (embedded_ruby.runner) and verify_all.sh: copied there by
# `gleam run -m generate`, so edit this one.
#
#   ruby --disable-gems run.rb DIR
#
# Loads DIR/solution.rb, then DIR/harness.rb, with $stdout captured, and
# prints one JSON report as the last line:
#   {"cases":[{label, expected, actual, passed}], "stdout": "...", "error": null | {phase, line, message}}
# A harness checks the names it calls with `need`, then records each case
# with `tc(label, expected, actual)`; values compare by `inspect`.

require "json"
require "stringio"

module Drill
  LIMIT = 4000
  CASES = []
  OUTPUT = StringIO.new

  class SignatureMismatch < StandardError; end

  def self.report(error)
    $stdout = STDOUT
    text = OUTPUT.string
    text = text[0, LIMIT] + "\n… (truncated)" if text.length > LIMIT
    cases = error ? [] : CASES
    STDOUT.write("\n" + JSON.generate({ cases: cases, stdout: text, error: error }) + "\n")
    STDOUT.flush
  end

  # The line in solution.rb an exception came from, if it came from there.
  def self.solution_line(error)
    at = (error.backtrace_locations || []).find { |l| File.basename(l.path.to_s) == "solution.rb" }
    return at.lineno if at
    (error.backtrace || []).each do |frame|
      found = frame[/solution\.rb:(\d+)/, 1]
      return found.to_i if found
    end
    nil
  end
end

def tc(label, expected, actual)
  e = expected.inspect
  a = actual.inspect
  Drill::CASES << { label: label, expected: e, actual: a, passed: e == a }
end

def need(*names)
  names.each do |name|
    found =
      if name.to_s.match?(/\A[A-Z]/)
        Object.const_defined?(name)
      else
        Object.private_method_defined?(name) || Object.method_defined?(name)
      end
    raise Drill::SignatureMismatch, name.to_s unless found
  end
end

dir = ARGV[0] || "."
begin
  $stdout = Drill::OUTPUT
  load File.join(dir, "solution.rb")
  load File.join(dir, "harness.rb")
  Drill.report(nil)
rescue SyntaxError => e
  line = e.message[/solution\.rb:(\d+)/, 1]
  message = e.message.sub(/\A.*?solution\.rb:\d+:\s*/m, "")
  Drill.report({ phase: "compile", line: line && line.to_i, message: "SyntaxError: #{message}"[0, 2000] })
rescue Drill::SignatureMismatch => e
  Drill.report({ phase: "run", line: nil,
                 message: "the check can't find #{e.message}: keep the starter's name and arguments" })
rescue Exception => e # a drill may raise anything, NotImplementedError included
  Drill.report({ phase: "run", line: Drill.solution_line(e), message: "#{e.class}: #{e.message}"[0, 2000] })
end
