import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

let connection: HubConnection | null = null;

const startConnection = (hubUrl: string, onUserReceived) => {
  connection = new HubConnectionBuilder().withUrl(hubUrl).build();

  connection.on("ReceiveUser", onUserReceived);

  connection
    .start()
    .then(() => console.log("SignalR Connected!"))
    .catch((err) => console.error("SignalR Connection Error: ", err));

  return connection;
};

const stopConnection = (connection: HubConnection) => {
  if (connection) {
    connection.stop;
  }
};

export { startConnection, stopConnection };
