import styled from 'styled-components';

const Style = styled.div`
  .deck-containers {
    text-align: center;
    margin: 50px auto 0 auto;
    padding: auto 15px;
  }

  .deck {
    padding: 15px;
    vertical-align: middle;
    text-align: center;
    background: #f0f0f0;
    border: 1px solid darkgrey;
    border-radius: 3px;
    transition-property: color, background;
    transition-duration: .3s;
    width: 400px;
    display: inline-block;
    margin: 1rem 1rem 1rem 1rem;
    cursor: pointer;

    &:hover {
      background: #2c3e50;
      color: white;
    }
  }
`;

export default Style;
