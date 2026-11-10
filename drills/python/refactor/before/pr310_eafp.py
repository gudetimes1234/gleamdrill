def port_for(config, name):
    if "servers" in config and name in config["servers"] and "port" in config["servers"][name]:
        return config["servers"][name]["port"]
    return 8080
