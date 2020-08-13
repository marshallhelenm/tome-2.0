import React, { useState } from "react";
import { TextInput, Box, Tabs, Tab, Form, FormField } from "grommet";
import firebase from "../firebase";
import useFormValidation from "../hooks/useFormValidation";
import { validateLogin } from "../utils";
import { useHistory } from "react-router-dom";

const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
  confirm: "",
};

const AuthForm = () => {
  const history = useHistory();
  const [firebaseError, setFireBaseError] = useState(null);
  const [login, setLogin] = useState(true);
  const {
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    values,
    clearValues,
    clearErrors,
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);

  async function authenticateUser() {
    const { name, email, password, confirm } = values;
    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password, confirm);
      history.push("/tome");
    } catch (error) {
      setFirebaseError(error.message);
    }
  }

  return (
    <Box>
      <Tabs>
        <Tab
          title="Log In"
          onClick={() => {
            setLogin(true);
            clearValues(INITIAL_STATE);
            clearErrors();
          }}
        >
          <Box pad="medium">
            <Form>
              <FormField name="email" htmlfor="email" label="Email Address">
                <TextInput
                  id="email"
                  placeholder="email address"
                  value={values.email}
                  onChange={handleChange}
                />
              </FormField>
              <FormField>
                <TextInput
                  placeholder="password"
                  value={values.password}
                  onChange={handleChange}
                />
              </FormField>
            </Form>
          </Box>
        </Tab>
        <Tab
          title="Sign Up"
          onClick={() => {
            setLogin(false);
            clearValues(INITIAL_STATE);
            clearErrors();
          }}
        >
          <Box pad="medium">
            <TextInput
              value={values.name}
              type="text"
              name="name"
              placeholder="username"
              onChange={handleChange}
              size="lg"
            />
            <TextInput
              placeholder="email address"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            <TextInput
              placeholder="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            <TextInput
              placeholder="confirm password"
              name="confirm"
              value={values.confirm}
              onChange={handleChange}
            />
          </Box>
        </Tab>
      </Tabs>
    </Box>
  );
};

export default AuthForm;
