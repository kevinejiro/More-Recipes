import 'raf/polyfill';
import {
  configure,
  shallow,
  render,
  mount,
  spyLifecycle
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';


import localStorage from './__mock__/localStorage';


global.localStorage = localStorage;
window.localStorage = localStorage;
// react enzyme adapter
configure({ adapter: new Adapter() });

global.spyLifecycle = spyLifecycle;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.moxios = moxios;
global.configureMockStore = configureMockStore;
const middleware = [thunk];
global.mockStore = configureMockStore(middleware);
