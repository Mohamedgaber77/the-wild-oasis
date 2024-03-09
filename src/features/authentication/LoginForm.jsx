import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";

import SpinnerMini from "../../ui/SpinnerMini";
import { useLog } from "./useLog";

function LoginForm() {
  const [email, setEmail] = useState("zimpre@bek.com");
  const [password, setPassword] = useState("zimprebek");
  const { logging, isLogging } = useLog();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return "Please enter email and password";
    logging(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLogging}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLogging}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">{isLogging ? <SpinnerMini /> : "Login"}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
