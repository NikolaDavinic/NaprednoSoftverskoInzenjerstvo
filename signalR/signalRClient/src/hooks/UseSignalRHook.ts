import { User } from "@/types/User";
import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
} from "@microsoft/signalr";
import { useEffect, useState } from "react";

const UseSignalRHook = (
  hubUrl: string,
  method: string,
  onReceiveUser: (newUser: User) => void
) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(hubUrl, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .build();

    newConnection.on(method, onReceiveUser);

    setConnection(newConnection);

    return () => {
      newConnection.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { connection };
};

export default UseSignalRHook;
