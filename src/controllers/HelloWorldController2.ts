import {Controller, Get} from "@tsed/common";
import {MySocketService} from "../socket";

@Controller("/hello-world2")
export class HelloWorldController2 {
    constructor(private mySocketService: MySocketService) {
        // mySocketService = new MySocketService();

    }

    @Get("/allo")
    allo() {
        console.log(123)
        this.mySocketService.helloAll();
        return "is sent";
    }
}
