import React, { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"

import {styled} from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"

import { AuthContext } from "App"
import AlertMessage from "components/utils/AlertMessage"
import { signIn } from "lib/api/auth"
import { SignInParams } from "interfaces/index"
import { Style } from "@mui/icons-material"

// const useStyles = makeStyles((theme: Theme) => ({
//   container: {
//     marginTop: theme.spacing(6)
//   },
//   submitBtn: {
//     marginTop: theme.spacing(2),
//     flexGrow: 1,
//     textTransform: "none"
//   },
//   header: {
//     textAlign: "center"
//   },
//   card: {
//     padding: theme.spacing(2),
//     maxWidth: 400
//   },
//   box: {
//     marginTop: "2rem"
//   },
//   link: {
//     textDecoration: "none"
//   }
// }))

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: 400,
  margin: "auto",
}))

const StyledCardHeader = styled(CardHeader)({
  textAlign: "center",
})

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  flexGrow: 1,
  textTransform: "none",
}))

const StyledBox = styled(Box)({
  marginTop: "2rem",
})

const StyledLink = styled(Link)({
  textDecoration: "none",
})

// サインイン用ページ
const SignIn: React.FC = () => {
  const navigate = useNavigate()

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: SignInParams = {
      email: email,
      password: password
    }

    try {
      const res = await signIn(params)

      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        navigate("/")

        console.log("Signed in successfully!")
      } else {
        setAlertMessageOpen(true)
      }
    } catch (err) {
      console.log(err)
      setAlertMessageOpen(true)
    }
  }

  return (
    <>
      <form noValidate autoComplete="off">
        <StyledCard>
          <StyledCardHeader title="Sign In" />
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Email"
              value={email}
              margin="dense"
              onChange={event => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <SubmitButton
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={!email || !password ? true : false} // 空欄があった場合はボタンを押せないように
              onClick={handleSubmit}
            >
              Submit
            </SubmitButton>
            <StyledBox textAlign="center">
              <Typography variant="body2">
                Don't have an account? &nbsp;
                <StyledLink to="/signup">
                  Sign Up now!
                </StyledLink>
              </Typography>
            </StyledBox>
          </CardContent>
        </StyledCard>
      </form>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid emai or password"
      />
    </>
  )
}

export default SignIn
