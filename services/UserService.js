import UserModel from "../Models/UserModel.js"

const UserService={
    async createUser(query){
      const user=await UserModel.create(query);
      return user;
    },
    async findUser(query){
        const user=await UserModel.findOne(query);
        return user;
    },
    async updateUser(filter,query){
      await UserModel.updateOne(filter,query);
      const user=await this.findUser(filter)
      return user;
    }
}
export default UserService