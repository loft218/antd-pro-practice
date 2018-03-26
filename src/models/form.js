import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm, loadColleagues } from '../services/api';

export default {
  namespace: 'form',

  state: {
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
    basic: {
      colleagues: [],
    },
  },

  effects: {
    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/form/step-form/result'));
    },
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *loadColleagues(_, { call, put }) {
      const response = yield call(loadColleagues);
      yield put({
        type: 'saveBasicColleagues',
        payload: response,
      });
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
    saveBasicColleagues(state, { payload }) {
      return {
        ...state,
        basic: {
          ...state.basic,
          colleagues: [
            ...state.basic.colleagues,
            ...payload,
          ],
        },
      };
    },
  },
};
