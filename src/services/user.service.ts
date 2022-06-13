import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Tel} from '../models/tel.model';
import {User} from '../models/user.model';
import {UserRepository} from '../repositories/user.repository';
import {UserResultInterface} from './Model/user.modal';

@injectable({scope: BindingScope.TRANSIENT})
export class UserService {
  constructor(
    @repository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  /*
   * Add service methods here
   */

  public async createUser(body: User): Promise<User> {
    const result = await this.userRepository.create(body);

    console.log('result :>> ', result);
    return result;
  }

  public async getUser(): Promise<User[]> {
    const result = await this.userRepository.find({
      include: [
        {
          relation: 'tel',
        },
      ],
      order: ['DESC'],
    });
    console.log('result :>> ', result);
    return result;
  }

  public async getUserById(id: number): Promise<UserResultInterface> {
    const result = await this.userRepository.findById(id, {
      include: [{relation: 'tels'}],
    });
    const res = {
      ...result,
      tels: result?.tels?.map((val: Tel) => val.telNumber),
    };
    return res;
  }
}
