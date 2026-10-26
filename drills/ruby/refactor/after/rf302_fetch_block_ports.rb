def port_for(ports, service)
  ports.fetch(service) { |name| 8000 + name.length }
end
