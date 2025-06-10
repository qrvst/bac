
import { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://i.ibb.co/LdfdXvq0/pngwing-com-4.png") center right;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const BackButton = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: #ccc;
  color: white;
  cursor: pointer;
`;

const Error = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { isFetching } = useSelector((state) => state.user);
    const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        setError("");

        if (!username || !password) {
            setError("Please fill all fields");
            return;
        }

        try {
            await login(dispatch, { username, password });
            history.push("/");
        } catch (err) {
            setError("Wrong username or password");
        }
    };

    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                {error && <Error>{error}</Error>}
                <Form>
                    <Input
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button onClick={handleClick} disabled={isFetching}>
                        {isFetching ? "LOGGING IN..." : "LOGIN"}
                    </Button>
                    <BackButton type="button" onClick={() => history.push("/")}>
                        BACK TO HOME
                    </BackButton>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Login;