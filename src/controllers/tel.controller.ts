// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import {inject} from '@loopback/core';
import {getModelSchemaRef, param, post, requestBody} from '@loopback/rest';
import {Tel} from '../models/tel.model';
import {TelService} from '../services/tel.service';

export class TelController {
  constructor(
    @inject('services.TelService')
    private telService: TelService,
  ) {}

  @post('/tel/{id}')
  async createUser(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tel),
        },
      },
    })
    @param.path.number('id')
    userId: number,
    reqBody: {
      telNumber: string;
    },
  ): Promise<Tel> {
    const {telNumber} = reqBody;
    return this.telService.createTel(telNumber, userId);
  }
}
