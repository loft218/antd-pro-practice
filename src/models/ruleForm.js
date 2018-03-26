import moment from 'moment';
import { getOneRule } from '../services/api';


export default {
  namespace: 'ruleForm',

  state: {
    key: 0,
    description: '',
    callNo: 0,
    status: 0,
    updatedAt: moment(),
  },

  effects: {
    *getOneRule({ payload }, { call, put }) {
      const response = yield call(getOneRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    reset() {
      console.log('reset');
      return {
        key: 0,
        description: '',
        callNo: 0,
        status: 0,
        updatedAt: moment(),
      };
    },
  },
};
