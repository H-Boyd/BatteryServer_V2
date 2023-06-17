import os

MODULE_DEPTH = 2


def ascend_directories(path, levels_to_ascend):
    for x in range(levels_to_ascend):
        path = os.path.dirname(path)
    return path


def get_module_file_path():
    return __file__


def get_project_path():
    return ascend_directories(get_module_file_path(), MODULE_DEPTH)


def add_extension(name, extension):
    return name + extension


def create_full_path(relative_directory, file_name):
    full_path = os.path.join(get_project_path(), relative_directory, file_name)
    return full_path


# def create_log_file_path(script_directory ,log_directory, device_name):
#     """
#     Creates the path for the log file based on a given device name.

#     Takes the name of the device, and indicate that it belongs in the Logs
#     directory by adding "Logs\\" in front of then name, and then indicates
#     that the fie will be a log file by adding ".log" after the name.

#     Parameters:
#     device_name (str): The name of the current device.
#     """
#     log_file_name = log_directory + "\\" + device_name + ".log"

#     return log_file_name
