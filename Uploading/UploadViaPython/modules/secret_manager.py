import json
import os



def get_deployment_id(file_path):

    try:
        with open(file_path, "r") as file:
            data = json.load(file)
            deployment_id = data.get("id")
            if deployment_id is None:
                raise KeyError("ID not found in JSON data")
            return deployment_id
    except (FileNotFoundError, IOError) as e:
        raise Exception(
            f"Error occurred while opening or reading JSON file: {e}"
        )
    except json.JSONDecodeError as e:
        raise Exception(f"Error occurred while parsing JSON: {e}")
