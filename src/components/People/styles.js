import styled from "styled-components";

export const List = styled.div`
  svg {
    margin-right: 1em;
  }
`;

export const TH = styled.th`
  &:not(:first-child) {
    width: 15%;
  }
`;

export const TD = styled.td`
  &:not(:first-child) svg {
    margin: 0 1em;
  }
`;
