import modules.log_file_manager as lfm
import modules.device_name_manager as name
import modules.battery as battery
import modules.secret_manager as secrets
import modules.url_manager as url
import modules.path_manager as path


DEPLOYMENT_ID_JSON_PATH = "secrets\\DeploymentID.json"
LOG_FOLDER_NAME = "logs"
MAX_LOG_FILE_LENGTH = 80

SECRETS_DIRECTORY_NAME = "secrets"
ID_FILE_NAME = "DeploymentID.json"

LOG_DIRECTORY_NAME = "logs"
LOG_FILE_EXTENSION = ".log"



flags = {"DRY_RUN": True}

def main():
    # Get the name of the pc
    computer_name = name.get_encoded_device_name()

    # Get the charge of the pc's battery
    charge = battery.get_battery_charge()


    id_file_path = path.create_full_path(SECRETS_DIRECTORY_NAME, ID_FILE_NAME)

    # Retrieve the app scripts deployment ID from the json file
    id_string = secrets.get_deployment_id(id_file_path)

    # Create the URL for setting the battery information
    url_string = url.create_url(id_string, computer_name, charge)

    # Call the url to update the server with the current battery charge
    if not flags["DRY_RUN"]:
        url.call_URL(url_string)
    else:
        print("Dry run mode: would have called url '" + url_string + "'")


if __name__ == "__main__":
    # Set the default exit code to 0
    exit_code = 0

    log_file_name = path.add_extension(name.get_device_name(), LOG_FILE_EXTENSION)

    LOG_FILE_PATH = path.create_full_path(LOG_DIRECTORY_NAME, log_file_name)

    # Configure the logger
    lfm.configure_logger(LOG_FILE_PATH)

    try:
        main()
    except Exception as e:
        lfm.logging.exception("An error occurred: %s", str(e))
        # If there is an error, set the exit code to 1.
        exit_code = 1

    lfm.log_flags(flags)

    lfm.log_exit_code(exit_code)

    # Add a line to the log file to separate the executions.
    lfm.line_break(LOG_FILE_PATH)

    # cut the log file down to an 80 line maximum.
    lfm.trim_log_file(LOG_FILE_PATH, MAX_LOG_FILE_LENGTH)

    exit(exit_code)
