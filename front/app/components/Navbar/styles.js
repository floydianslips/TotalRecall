import styled from 'styled-components';

const Styles = styled.div`
  padding: 15px;
  background-color: #2c3e50;
  font-size: 19px;
  color: white;

  top: 0;
  left: 0;
  right: 0;
  z-index: 1;

  .navbar-brand > div {
    display: inline;
  }
  
  .right {
    float: right;

    font-size: smaller;
    color: #71a3f0;
    cursor: pointer;
  }
`;

export default Styles;
