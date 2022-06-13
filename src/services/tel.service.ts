import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Tel} from '../models/tel.model';
import {TelRepository} from '../repositories/tel.repository';

type PayloadBody = {
  telNumber: string;
  userId: number;
};

@injectable({scope: BindingScope.TRANSIENT})
export class TelService {
  constructor(
    @repository(TelRepository)
    private telRepository: TelRepository,
  ) {}

  public async createTel(telNumber: string, userId: number): Promise<Tel> {
    const payload: PayloadBody = {
      telNumber,
      userId,
    };
    const result = await this.telRepository.create(payload);
    return result;
  }
}
