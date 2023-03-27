import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { Rank, User } from "src/schemas/user.schema";
import { GymGrage } from "src/schemas/record.schema";
import { CreateRecordInput } from "./dto/create-record.dto";
import { EditRecordInput } from "./dto/edit-record.dto";

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async getUser(@Args("id") id: string) {
    return await this.userService.getUser(id);
  }

  @Query(() => [Rank])
  async getPowerRank() {
    return await this.userService.getPowerRank();
  }

  @Mutation(() => Rank)
  async createUser(
    @Args("name") name: string,
    @Args("password") password: string
  ) {
    return await this.userService.createUser(name, password);
  }

  @Query(() => GymGrage)
  async getGymGrade(@Args("gymName") gymName: string) {
    return await this.userService.getGymGrade(gymName);
  }

  @Mutation(() => User)
  async createRecord(@Args("record") record: CreateRecordInput) {
    return await this.userService.createRecord(
      record.name,
      record.gym,
      record.problems
    );
  }

  @Mutation(() => User)
  async editRecord(@Args("record") record: EditRecordInput) {
    return await this.userService.editRecord(
      record.id,
      record.name,
      record.password,
      record.gym,
      record.problems
    );
  }

  @Mutation(() => User)
  async deleteRecord(
    @Args("id", { description: "기록 id" }) id: string,
    @Args("name") name: string,
    @Args("password") password: string
  ) {
    return await this.userService.deleteRecord(id, name, password);
  }
}
