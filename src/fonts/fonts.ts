import { createGlobalStyle } from 'styled-components';

import LozangeFont from './Lozange.otf';


export default createGlobalStyle`
    @font-face {
        font-family: 'Lozange';
        src: local('Lozange'), local('Lozange'),
        url(${LozangeFont}) format('otf');
        font-weight: 300;
        font-style: normal;
    }
`;