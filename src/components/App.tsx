import React from 'react';
import { CookingSession } from "./CookingSession/CookingSession";
import { CenterFlexRow } from "./UtilityComponents";
import styled from "@emotion/styled";

const AppWrapper = styled(CenterFlexRow)({})

const App = () => {
  return (
    <AppWrapper bordered>
      <CookingSession/>
    </AppWrapper>
  );
};

export default App

