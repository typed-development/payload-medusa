import * as migration_20241117_173403_initial from './20241117_173403_initial';
import * as migration_20241203_203305 from './20241203_203305';
import * as migration_20241204_023231 from './20241204_023231';

export const migrations = [
  {
    up: migration_20241117_173403_initial.up,
    down: migration_20241117_173403_initial.down,
    name: '20241117_173403_initial',
  },
  {
    up: migration_20241203_203305.up,
    down: migration_20241203_203305.down,
    name: '20241203_203305',
  },
  {
    up: migration_20241204_023231.up,
    down: migration_20241204_023231.down,
    name: '20241204_023231'
  },
];
