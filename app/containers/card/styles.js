import styled from 'styled-components';

const Styles = styled.div`
  min-height: 250px;

  .cell {
    max-width: 512px;
    text-align: center;
    border-radius: 5px;
    box-shadow: 3px 2px 5px #c5c5c5;

    .card-head {
      height: 40px;
      background: #47749e;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    .content-wrapper {
      height: calc(100% - 40px);
      display: flex;
      justify-content: center;
    }

    .content {
      // height: 100%;
      font-size: larger;
      align-self: center;
      text-align: center;
      padding: 30px;
    }
  }
`;

export default Styles;
