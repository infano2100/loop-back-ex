import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {UserDataSource} from '../datasources';
import {Tel, TelRelations} from '../models';
import {User} from '../models/user.model';
import {UserRepository} from '../repositories/user.repository';

export class TelRepository extends DefaultCrudRepository<
  Tel,
  typeof Tel.prototype.id,
  TelRelations
> {
  public readonly user: BelongsToAccessor<User, typeof User.prototype.id>;

  constructor(
    @inject('datasources.user')
    dataSource: UserDataSource,

    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Tel, dataSource);

    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);

    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
