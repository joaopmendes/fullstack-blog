import styled, {keyframes} from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
export const InputWrapper = styled.div`
    position: relative;
    display:flex;
    border-bottom: 1.48px solid ${props => props.touched ? props.error ? props.theme.danger : props.theme.success : props.theme.dark};
`;
export const InputInfo = styled.div`
    width: 40px;
    display: flex;
    justify-content: center;
    background: #c1bebe6b;
    align-items: center;
    color: ${props => props.touched ? props.error ? props.theme.danger : props.theme.success : props.theme.dark};

`;
export const Icon = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    color: ${props => props.error ? props.theme.danger : props.theme.success};
`;
export const ErrorMessage = styled.p`
  color: ${props => props.theme.danger};
  margin-top: 5px;
  animation: 1s ${fadeIn} ease-out;
`;
export const InputGroup = styled.div`
  width: 100%;
  margin: 1em 0;
`;
export const InputLabel = styled.label`
  display: block;
  color: ${props => props.touched ? props.error ? props.theme.danger : props.theme.success : props.theme.dark};
  font-size: 1.1em;
  width: 100%;
`;
export const InputField = styled.input`
  display: block;
  opacity: ${props => props.opacity || "100"};
  width: 100%;
  border: none;
  outline: none;
  padding: 0.4rem;
  font-size: 1.1em;
`;