import logging

"""
module - logging_manager.py

This module creates and manages a log file.
Each log file is unique to the device, as long as it is not ran on two devices
with the same name.

The following functions are included.
create_log_file_path:  Creates the path for the log file from given device name.
configure_logger: Configures the logger for the application
line_break: Adds a line break in the form of a row of hyphens to a given file.
cut_down: Trims the given file down to a specified number of lines.
log_exit_code: Logs the exit code of the application.    


"""

def create_log_file_path(device_name):
    """
    Creates the path for the log file based on a given device name.

    Takes the name of the device, and indicate that it belongs in the Logs
    directory by adding "Logs\\" in front of then name, and then indicates
    that the fie will be a log file by adding ".log" after the name.

    Parameters:
    device_name (str): The name of the current device.
    """
    log_file_name = "Logs\\" + device_name + ".log"

    return log_file_name


def configure_logger(log_file_name):
    """
    Configures the logger for the application

    the logger with then divert logging to the given file.

    The log format will be set to include the time of logging, the log level
    name and the log message. The date and time is formatted as
    'Year-Month-Day Hour:Minute:Second'.

    Parameters:
    log_file_name (str): The name of the file where logs will be written.
    """

    logging.basicConfig(
        filename=log_file_name,
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )


def line_break(log_file_name):
    """
    Adds a line break in the form of a row of hyphens to a given file.

    This code opens a given file in append mode, adds 80 hyphens and then
    a new line character. this is used to separate different
    execution in the log file.

    Parameters:
    log_file_name (str): The name of the log file.

    """
    with open(log_file_name, "a") as log_file:
        for i in range(80):
            log_file.write("-")
        log_file.write("\n")


def cut_down(log_file_name, max_lines):
    """
    Trims the given file down to a specified number of lines.

    If the log file currently has more than 'max_lines' lines, removes the
    oldest entries until it has 'max_lines' lines. If the file already has
    'max_lines' lines or fewer, does nothing.

    Parameters:
    log_file_name (str): The name of the log file.
    max_lines (int): The maximum number of lines the log file should have.
    """

    # Open the file in read mode and read all lines into a list
    with open(log_file_name, "r") as log_file:
        lines = log_file.readlines()
    line_count = len(lines)

    # Calculate how many lines need to be removed to get down to max_lines
    lines_to_remove = line_count - max_lines

    # If lines must be removed
    if lines_to_remove > 0:
        # Open the file in write mode (this automatically clears the file)
        with open(log_file_name, "w") as log_file:
            # Rewrite the file with just the last x lines
            log_file.write("".join(lines[lines_to_remove:line_count]))


def log_exit_code(exit_code):
    """
    Logs the exit code of the application.

    If the exit code is 0, its is logged as a message, indicating a
    successful execution.
    If the exit code it not 0, it is logged as an error, as something will
    have gone wrong.

    Parameters:
    exit_code (int): The exit code of the application.
    """
    if exit_code == 0:
        logging.info("Exit code: 0")
    else:
        logging.error(f"Exit code: {exit_code}")
