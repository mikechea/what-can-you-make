import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import fetchMock from "jest-fetch-mock";
import app from 'server/app'

fetchMock.enableMocks();
console.log('settingup')
Enzyme.configure({ adapter: new Adapter() });

