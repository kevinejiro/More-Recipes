import toastr from 'toastr';

import {
  SIGN_OUT
} from '../actions/types';
/**
 *
 * @returns {void}
 */
export const signoutAction = () => ({
  type: SIGN_OUT
});

/**
 *
 * @param {object} dispatch
 * @returns {void}
 */
const signOut = () => (dispatch) => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  dispatch(signoutAction());
  toastr.options = {
    closeButton: true,
    extendedTimeOut: '1000',
    positionClass: 'toast-bottom-right',
    hideMethod: 'fadeOut'
  };
  toastr.success('log out successful');
};

export default signOut;
