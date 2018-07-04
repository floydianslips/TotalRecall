import styled from 'styled-components';

const Styles = styled.div`
  min-height: 250px;

  .cell {
    max-width: 512px;
    text-align: center;
    border-radius: 5px;
    box-shadow: 3px 2px 5px #c5c5c5;

    h1 {
      background: #4aa9e6;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    .content {
      padding: 0 30px 30px 30px;
    }
  }
`;

export default Styles;
