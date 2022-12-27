import { contextBridge, ipcRenderer } from "electron";
import { EVENTS } from "constant";

export type IPC = {
  sendMsg(msg: string): Promise<string>;
  receiveMsg(): Promise<string>;
}

declare global {
  interface Window {
    ipc: IPC;
  }
}

const IPC_API: IPC = {
  sendMsg,
  receiveMsg
}

contextBridge.exposeInMainWorld("ipc", IPC_API);

// ipc handles
async function sendMsg(msg: string) {
  return await ipcRenderer.invoke(EVENTS.SEND_MSG.toString(), msg);
}

async function receiveMsg():Promise<string> {
  return new Promise((res, rej) => {
    ipcRenderer.on(EVENTS.REPLY_MSG.toString(), (evt, msg: string) => {
      res(msg);
    })
  })
}