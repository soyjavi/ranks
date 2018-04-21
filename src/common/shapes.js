import { number, string } from 'prop-types';

export default {
  TASK: {
    id: string,
    tag: string,
    title: string,
    timelapsed: number, // seconds
    deadline: number, // seconds
    createdAt: number,
  },
};
