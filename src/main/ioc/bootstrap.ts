import type { WebContents } from "electron";
import { ipcMain } from "electron";
import { EVENTS } from "constant";
import { MyHandler } from "../handlers/my-handler";

export type Construct<T = any> = new (...args: Array<any>) => T;

const handlers: Construct[] = [MyHandler];

const ExistedInjectable = {};

function factory<T>(constructor: Construct<T>): T {
  const paramtypes = Reflect.getMetadata("design:paramtypes", constructor);

  const providers = paramtypes.map((provider: Construct<T>) => {
    const name = Reflect.getMetadata("name", provider);
    const item = ExistedInjectable[name] || factory(provider);
    ExistedInjectable[name] = item;
    return item;
  })
  return new constructor(...providers);
}

export async function bootstrap(webContents: WebContents) {
  for (const HandlerClass of handlers) {
    const handler = factory(HandlerClass);
    const proto = HandlerClass.prototype;

    const functions = Object.getOwnPropertyNames(proto).filter(item => {
      return typeof handler[item] === "function" && item !== "constructor";
    })

    functions.forEach(funcName => {
      let event: string | null = null;
      event = Reflect.getMetadata("ipc-invoke", proto, funcName);
      if (event) {
        ipcMain.handle(event, async (e, ...args) => {
          try {
            const result = await handler[funcName].call(handler, ...args);
            return { data: result };
          } catch (err) {
            return { err };
          }
        })
      } else {
        event = Reflect.getMetadata("ipc-on", proto, funcName);
        if (!event) return;

        const func = handler[funcName];
        handler[funcName] = async (...args: any[]) => {
          const result = await func.call(handler, ...args);
          webContents.send(event, result);
          return result;
        }
      }
    })
  }
}

export function destroy() {
  for (const EVENT in EVENTS) {
    ipcMain.removeHandler(EVENTS[EVENT]);
  }

  for (const exist in ExistedInjectable) {
    ExistedInjectable[exist].destroy && ExistedInjectable[exist].destroy();
  }
}