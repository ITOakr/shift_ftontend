import React from "react"

import Container from "@mui/material/Container"
import { Grid } from "@mui/material"
import { styled } from "@mui/material/styles"
import Header from "components/layouts/Header"

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(6),
}))

interface CommonLayoutProps {
  children: React.ReactElement
}

// 全てのページで共通となるレイアウト
const CommonLayout = ({ children }: CommonLayoutProps) => {
  return (
     <>
      <header>
        <Header />
      </header>
      <main>
        <StyledContainer maxWidth="lg">
          <Grid container justifyContent="center">
            <Grid size={{ xs: 12, sm: 10, md: 8, lg: 6 }}>
              {children}
            </Grid>   
          </Grid>
        </StyledContainer>
      </main>
    </>
  )
}

export default CommonLayout
