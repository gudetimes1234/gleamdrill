def ensure_dir(dirs, path)
  if !dirs.include?(path)
    dirs << path
    dirs.sort!
  end
  dirs
end
