def port_for(config, name):
    try:
        return config["servers"][name]["port"]
    except KeyError:
        return 8080
