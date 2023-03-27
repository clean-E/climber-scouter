import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { GraphQLError } from "graphql";
import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { gymGrade, score } from "src/data/data";
import {
  GymGrage,
  Problem,
  Record,
  RecordDocument,
} from "src/schemas/record.schema";
import { Rank, User, UserDocument } from "src/schemas/user.schema";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Record.name)
    private readonly recordModel: Model<RecordDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection
  ) {}

  async getUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (user) {
      await user.populate(["records", "records.problems"]);
      return user;
    } else {
      throw new GraphQLError("User Not Found");
    }
  }

  async getPowerRank(): Promise<Rank[]> {
    const users = await this.userModel
      .find()
      .populate(["records", "records.problems"]);

    const rank = users.map((user) => {
      let power = 0;
      if (user.records.length > 0) {
        power =
          user.records
            .map((record) => record.total)
            .reduce((a, b) => a + b, 0) / user.records.length;
      }
      return {
        name: user.name,
        power: parseInt(power.toFixed()),
      };
    });

    rank.sort((a, b) => b.power - a.power);
    return rank;
  }

  async createUser(name: string, password: string): Promise<Rank> {
    const user = await this.userModel.findOne({ name });
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    if (user) {
      // already exist
      throw new GraphQLError("Already Exist Name");
    } else {
      const newUser = await this.userModel.create({ name, password });
      return { name: newUser.name, power: 0 };
    }
  }

  async getGymGrade(gymName: string): Promise<GymGrage> {
    return gymGrade[gymName];
  }

  async createRecord(
    name: string,
    gym: string,
    problems: Problem[]
  ): Promise<User> {
    let total = 0;
    for (let i = 0; i < problems.length; i++) {
      total += score[problems[i].grade] * problems[i].count;
    }

    const newRecord = await this.recordModel.create({
      name,
      gym,
      total,
      problems,
    });

    await this.userModel.findOneAndUpdate(
      { name },
      {
        $push: { records: newRecord._id },
      }
    );
    const user = await this.userModel
      .findOne({ name })
      .populate(["records", "records.problems"]);

    return user;
  }

  async editRecord(
    id: string,
    name: string,
    password: string,
    gym: string,
    problems: Problem[]
  ): Promise<User> {
    const user = await this.userModel.findOne({ name });

    const passwordCompareResult = await bcrypt.compare(password, user.password);

    if (passwordCompareResult) {
      let total = 0;
      for (let i = 0; i < problems.length; i++) {
        total += score[problems[i].grade] * problems[i].count;
      }
      await this.recordModel.findByIdAndUpdate(id, {
        gym,
        total,
        problems,
      });

      const user = await this.userModel
        .findOne({ name })
        .populate(["records", "records.problems"]);

      return user;
    } else {
      throw new GraphQLError("Wrong Password");
    }
  }

  async deleteRecord(
    id: string,
    name: string,
    password: string
  ): Promise<User> {
    const user = await this.userModel.findOne({ name });

    const passwordCompareResult = await bcrypt.compare(password, user.password);

    if (passwordCompareResult) {
      await this.recordModel.deleteOne({ _id: id });
      const user = await this.userModel.findOneAndUpdate(
        { name },
        {
          $pull: { records: id },
        }
      );
      await user.populate(["records", "records.problems"]);
      return user;
    } else {
      throw new GraphQLError("Wrong Password");
    }
  }
}
