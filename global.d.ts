import { Mock } from 'jest';

declare module '*.jpg';
declare module '*.png';

type JestMockObject = {
  [key: string]: Mock;
};
declare global {
  var jestMocks: JestMockObject; // eslint-disable-line no-var
}
