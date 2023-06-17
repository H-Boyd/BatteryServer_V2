import requests

"""
module - url_manager.py

This module creates an calls google script urls.

The following functions are included.
create_log_file_path: Creates the path for the log file from given device name.
configure_logger: Configures the logger for the application.
"""


def create_url(id, name, value):
    """_summary_

    Args:
        id (str): _description_
        name (str): _description_
        value (str): _description_

    Returns:
        str: _description_
    """
    url = (
        "https://script.google.com/macros/s/"
        + id
        + "/exec?type=battery&mode=set&device="
        + name
        + "&charge="
        + value
    )
    return url


def call_URL(url):
    try:
        requests.get(url, timeout=5)
    except requests.exceptions.Timeout as e:
        raise Exception(f"Error: {e}")
