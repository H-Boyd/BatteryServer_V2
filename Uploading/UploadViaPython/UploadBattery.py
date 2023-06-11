import json
import logging
import os
import random
import psutil
import requests
import socket

import urllib


logging.basicConfig(level=logging.ERROR)  # Set the logging level as desired


def get_pc_name():
    return socket.gethostname()


def encode_name(name):
    return urllib.parse.quote_plus(name)


def get_battery_charger():
    battery = psutil.sensors_battery()
    if battery is None:
        raise Exception("Battery not found")
    return str(battery.percent)


def get_deployment_id(file_name):
    script_directory = os.path.dirname(os.path.abspath(__file__))
    json_file_path = os.path.join(script_directory, file_name)

    try:
        with open(json_file_path, "r") as file:
            data = json.load(file)
            sheet_id = data.get("id")
            if sheet_id is None:
                raise KeyError("ID not found in JSON data")
            return sheet_id
    except (FileNotFoundError, IOError) as e:
        raise Exception(
            f"Error occurred while opening or reading JSON file: {e}"
        )
    except json.JSONDecodeError as e:
        raise Exception(f"Error occurred while parsing JSON: {e}")


def create_URL(ID, name, value):
    URL = (
        "https://script.google.com/macros/s/"
        + ID
        + "/exec?type=battery&mode=set&device="
        + name
        + "&charge="
        + value
    )
    return URL


def call_URL(URL):
    try:
        requests.get(URL, timeout=5)
    except requests.exceptions.Timeout as e:
        raise Exception(f"Error: {e}")


def main():
    # Get the name of the pc
    computer_name = get_pc_name()

    # Encode the pc name so it is URL safe
    computer_name = encode_name(computer_name)

    # Get the charge of the pc's battery
    charge = get_battery_charger()

    # Retrieve the app scripts deployment ID from the json file
    ID = get_deployment_id("DeploymentID.json")

    # Create the URL for setting the battery information
    URL = create_URL(ID, computer_name, charge)

    # Call the url to update the server with the current battery charge
    call_URL(URL)


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        logging.exception("An error occurred: %s", str(e))
        exit(1)
