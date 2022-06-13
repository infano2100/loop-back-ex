// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import {inject} from '@loopback/core';
import {get, getModelSchemaRef, param, post, requestBody} from '@loopback/rest';
import {User} from '../models/user.model';
import {UserResultInterface} from '../services/Model/user.modal';
import {UserService} from '../services/user.service';

export class UserController {
  constructor(
    @inject('services.UserService')
    private userService: UserService,
  ) {}

  @get('/user')
  async getUserAll(): Promise<User[]> {
    // logic
    // ----------------
    // logic
    return this.userService.getUser();
  }

  @post('/user')
  async createUser(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User),
        },
      },
    })
    reqBody: User,
  ): Promise<User> {
    return this.userService.createUser(reqBody);
  }

  @get('/user/{id}')
  async getUserById(
    @param.path.number('id') userId: number,
  ): Promise<UserResultInterface> {
    // logic
    // ----------------
    // logic
    return this.userService.getUserById(userId);
  }
}
