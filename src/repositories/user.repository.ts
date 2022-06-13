import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {UserDataSource} from '../datasources';
import {User, UserRelations} from '../models';
import {Tel} from '../models/tel.model';
import {TelRepository} from './tel.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly tels: HasManyRepositoryFactory<Tel, typeof User.prototype.id>;

  constructor(
    @inject('datasources.user')
    dataSource: UserDataSource,

    @repository.getter('TelRepository')
    protected telsRepositoryGetter: Getter<TelRepository>,
  ) {
    super(User, dataSource);

    this.tels = this.createHasManyRepositoryFactoryFor(
      'tels',
      telsRepositoryGetter,
    );

    this.registerInclusionResolver('tels', this.tels.inclusionResolver);
  }
}
