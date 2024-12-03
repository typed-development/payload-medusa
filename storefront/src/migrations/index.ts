import * as migration_20241117_173403_initial from './20241117_173403_initial';
import * as migration_20241203_203305 from './20241203_203305';

export const migrations = [
  {
    up: migration_20241117_173403_initial.up,
    down: migration_20241117_173403_initial.down,
    name: '20241117_173403_initial',
  },
  {
    up: migration_20241203_203305.up,
    down: migration_20241203_203305.down,
    name: '20241203_203305'
  },
];
