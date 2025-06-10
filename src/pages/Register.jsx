
import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://i.ibb.co/qLVkqkd8/pngwing-com.png") center right;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
  display: block;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-top: 10px;
`;

const BackButton = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #ccc;
  color: white;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 20px;
`;

const Error = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {
            setLoading(true);
            await axios.post("http://localhost:5000/api/auth/register", {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            history.push("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                {error && <Error>{error}</Error>}
                <Form onSubmit={handleSubmit}>
                    <Input
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        minLength="3"
                    />
                    <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        minLength="6"
                    />
                    <Input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        required
                    />
                    <Agreement>
                        By creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <ButtonContainer>
                        <Button type="submit" disabled={loading}>
                            {loading ? "CREATING..." : "CREATE"}
                        </Button>
                        <BackButton type="button" onClick={() => history.push("/")}>
                            BACK
                        </BackButton>
                    </ButtonContainer>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Register;