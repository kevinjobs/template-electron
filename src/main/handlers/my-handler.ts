import { EVENTS } from "constant";
import { Handler, IpcInvoke, IpcOn } from "../ioc/decorators";
import { MyService } from "../services/my-service";

@Handler()
export class MyHandler {
  constructor(private myService: MyService) {
    // do nothing;
  }

  @IpcOn(EVENTS.REPLY_MSG)
  public replyMsg(msg: string) {
    return `${this.myService.getDelayTime()} seconds later, the main process replies to your message: ${msg}`;
  }

  @IpcInvoke(EVENTS.SEND_MSG)
  public async handleSendMsg(msg: string): Promise<string> {
    console.log("get the ", msg);
    setTimeout(() => {
      this.replyMsg(msg);
    }, this.myService.getDelayTime() * 1000);

    return `the main process received your message: ${msg}`;
  }
}