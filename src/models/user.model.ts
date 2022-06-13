import {Entity, hasMany, model, property} from '@loopback/repository';
import {Tel, TelWithRelations} from '../models/tel.model';

@model({name: 'user'})
export class User extends Entity {
  constructor(data?: Partial<User>) {
    super(data);
  }

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
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @hasMany(() => Tel, {keyTo: 'userId', keyFrom: 'id'})
  tels?: Tel[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;
}

export interface UserRelations {
  tels?: TelWithRelations[];
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
