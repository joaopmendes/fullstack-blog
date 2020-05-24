import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Spinner from 'react-loader-spinner';

const Loader = () => {
  const { loaders } = useSelector((store) => store.controls);
  const isActive = loaders.some((loader) => loader.active);
  return isActive ? (
    <Modal>
      <Flex>
        <Spinner type="Bars" color="#000" height={250} width={250} />
        <h3>Loading...</h3>
      </Flex>
    </Modal>
  ) : null;
};

export default Loader;

const Modal = styled.div`
  width: 100%;
  height: 100%;
  /* background: rgba(255, 255, 255, 0.5); */
  z-index: 999;
  position: absolute;
  top: 0;
  right: 0;
`;
const Flex = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  h3 {
    margin: 10px auto;
    font-weight: bold;
  }
`;
