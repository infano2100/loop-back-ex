import {belongsTo, Entity, model, property} from '@loopback/repository';
import {User, UserWithRelations} from '../models/user.model';

@model({name: 'tel'})
export class Tel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  telNumber: string;

  // @property({
  //   type: 'number',
  //   required: true,
  // })
  // userId: number;

  @belongsTo(() => User, {name: 'user', keyTo: 'userId'})
  userId?: number;

  constructor(data?: Partial<Tel>) {
    super(data);
  }
}

export interface TelRelations {
  userId?: UserWithRelations;
  // describe navigational properties here
}

export type TelWithRelations = Tel & TelRelations;
