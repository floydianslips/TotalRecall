import styled from 'styled-components';

// #9e4759 #479e64
const Styles = styled.div`
  .show { visibility: initial; }
  .hidden { visibility: hidden; }
  .left { left: 0; }
  .right { right: 0; }

  .tab {
    top: 0;
    position: fixed;
    height: 100%;
    width: 50px;
    text-align: center;
    line-height: 100vh;

    transition: 0.5s filter linear, background .5s;
    -webkit-transition: 0.5s -webkit-filter linear, background .5s;
    -moz-transition: 0.5s -moz-filter linear, background .5s;
    -ms-transition: 0.5s -ms-filter linear, background .5s;
    -o-transition: 0.5s -o-filter linear, background .5s;
    
    background: #00000000;
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */

    :hover {
      background: #f0f0f0ff;
      filter: grayscale(0%);
      -webkit-filter: grayscale(0%); /* Safari 6.0 - 9.0 */
    }

    span { font-size: 2em; }
  }
`;

export default Styles;
