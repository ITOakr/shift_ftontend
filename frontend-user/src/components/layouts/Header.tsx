import React, { useContext } from "react"
import { ComponentProps } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography, { TypographyProps } from "@mui/material/Typography"
import Button, { ButtonProps } from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"

import { styled } from "@mui/material/styles"

import { signOut } from "lib/api/auth"

import { AuthContext } from "App"

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}))

// タイトル部分（「Sample」）
//    Typography コンポーネントに対して flexGrow とリンク装飾を適用
type LinkProps = Partial<ComponentProps<typeof Link>>
const TitleTypography = styled(Typography)<TypographyProps & LinkProps>(({ theme }) => ({
  flexGrow: 1,
  textDecoration: "none",
  color: "inherit",
}))


// リンク用の Button（Sign in / Sign Up / Sign out）
//     textTransform: "none" を当てる
const LinkButton = styled(Button)<ButtonProps & LinkProps>({
  textTransform: "none",
})

const Header: React.FC = () => {
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    try {
      const res = await signOut()

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        navigate("/signin")

        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const AuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (!loading) {
      if (isSignedIn) {
        return (
          <LinkButton
            color="inherit"
            onClick={handleSignOut}
          >
            Sign out
          </LinkButton>
        )
      } else {
        return (
          <>
            <LinkButton
              component={Link}
              to="/signin"
              color="inherit"
              style={{ textTransform: "none" }}
            >
              Sign in
            </LinkButton>
            <LinkButton
              component={Link}
              to="/signup"
              color="inherit"
              style={{ textTransform: "none" }}
            >
              Sign Up
            </LinkButton>
          </>
        )
      }
    } else {
      return <></>
    }
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <StyledIconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </StyledIconButton>
          <TitleTypography
            component={Link}
            to="/"
            variant="h6"
          >
            Sample
          </TitleTypography>
          <AuthButtons />
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
