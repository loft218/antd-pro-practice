
import { routerRedux } from 'dva/router';
import moment from 'moment';
import { message } from 'antd';
import { getOneRule, fakeSubmitForm } from '../services/api';
import { delay } from '../utils/utils';

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
    *submitRuleForm({ payload }, { call, put }) {
      console.log('submitRuleForm:', payload);
      console.log('updatedAt:', payload.updatedAt.format('YYYY-MM-DD HH:mm:ss'));
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
      yield delay(1000);
      yield put(routerRedux.goBack());
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
