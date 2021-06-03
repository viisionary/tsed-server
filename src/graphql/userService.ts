import {AfterRoutesInit} from "@tsed/common";
import {GraphQLService} from "@tsed/graphql";
import {ApolloServer} from "apollo-server-koa";

export class UsersService implements AfterRoutesInit {
    private server: ApolloServer;

    constructor(private graphQLService: GraphQLService) {
    }

    $afterRoutesInit(): void | Promise<any> {
        throw new Error("Method not implemented.");
    }
    //
    // $afterRoutesInit() {
    //     this.server = this.graphQLService.get("server1")!;
    // }
}
