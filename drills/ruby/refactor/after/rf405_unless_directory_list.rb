def ensure_dir(dirs, path)
  unless dirs.include?(path)
    dirs << path
    dirs.sort!
  end
  dirs
end
