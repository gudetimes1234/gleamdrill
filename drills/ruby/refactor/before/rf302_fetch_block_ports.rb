def port_for(ports, service)
  port = ports[service]
  if port.nil?
    port = 8000 + service.length
  end
  port
end
