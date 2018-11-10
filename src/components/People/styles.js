import styled from "styled-components";

export const List = styled.div`
  svg {
    margin-right: 1em;
    height: 1rem;
    width: 1rem;
  }
`;

export const TH = styled.th`
  &:not(:first-child) {
    width: 15%;
  }
`;

export const TD = styled.td`
  &:first-child {
    display: flex;
    align-items: center;
    border: 0;
    border-top: 1px solid #dee2e6;
  }
  &:not(:first-child) svg {
    margin: 0 1em;
  }
`;

export const TR = styled.tr`
  &:first-child {
    td {
      border-top: 0;
    }
  }
`;
