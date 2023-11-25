import { Page } from './page.interface';

export type RandomPage<T> = Page<T> & {
  meta: {
    randomizationSeed: number;
  };
};
