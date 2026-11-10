def report_line(label, total, average):
    return label.rjust(8) + " " + format(total, ",") + " " + "%.2f" % average
