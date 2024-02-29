// Define the access key, application, and device names
const char* access_key = "34299c356a08ad67:7f974df277665f63";
const char* Application = "Lynx";
const char* Device = "wkwk";

// Define the topic to which you want to publish the message
char topic[100];
sprintf(topic, "/oneM2M/req/%s/antares-cse/json", access_key);

// Generate a random temperature value
int temp = rand() % 100;

// Create the data payload
char data[300];
sprintf(data,
    "{\"m2m:rqp\": {\"fr\": \"%s\", \"to\": \"/antares-cse/antares-id/%s/%s\", \"op\": 1, \"rqi\": 123456, \"pc\": {\"m2m:cin\": {\"cnf\": \"message\", \"con\": \"{\\\"temp\\\":%d, \\\"status\\\": 1}\"}}, \"ty\": 4}}",
    access_key, Application, Device, temp);

void setup() {
  // Add any setup code if needed
}

void loop() {
  // Add your main loop code here
}
