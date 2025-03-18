import Ably from "ably";

import {getGlobalKey, GlobalKeys} from "@/services/globals";

let ablyInstance: Ably.Realtime | null = null;
/**
 * Get the Ably instance, initializing it if necessary.
 * @returns {Ably.Realtime} The Ably instance
 */
export const getAblyInstance = (): Ably.Realtime => {
  if (!ablyInstance) {
    const apiKey = getGlobalKey(GlobalKeys.ABLY_KEY) || "";
    if (!apiKey) {
      throw new Error("Ably API key is missing in environment variables.");
    }
    ablyInstance = new Ably.Realtime(apiKey);
  }
  ablyInstance.connection.on("connected", () => {
    console.log("Connected to Ably!");
  });
  return ablyInstance;
};
/**
 * Get a specific Ably channel.
 * @param {string} channelName - The name of the channel to retrieve
 * @returns {Ably.Types.RealtimeChannelCallbacks} The Ably channel instance
 */
export const getAblyChannel = (channelName: string): Ably.RealtimeChannel => {
  const ably = getAblyInstance();
  return ably.channels.get(channelName);
};
