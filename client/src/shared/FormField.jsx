import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormLabel, TextField } from "@material-ui/core";
import { useFormikContext } from "formik";

const useStyles = makeStyles((theme) => ({
  formLabel: {
    fontWeight: 600,
    marginBottom: theme.spacing(1.5),
  },
  formControl: {
    margin: theme.spacing(2, 0),
  },
}));

const FormField = ({ isRegister = false }) => {
  const classes = useStyles();
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext();

  return (
    <>
      <FormControl fullWidth className={classes.formControl}>
        <FormLabel classes={{ root: classes.formLabel }} htmlFor='username'>
          Username
        </FormLabel>
        <TextField
          fullWidth
          id='username'
          name='username'
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Enter username'
          helperText={touched.username ? errors.username : ""}
          error={touched.username ? Boolean(errors.username) : false}
        />
      </FormControl>
      {isRegister ? (
        <FormControl fullWidth className={classes.formControl}>
          <FormLabel classes={{ root: classes.formLabel }} htmlFor='email'>
            Email
          </FormLabel>
          <TextField
            fullWidth
            id='email'
            name='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='Enter email'
            helperText={touched.email ? errors.email : ""}
            error={touched.email ? Boolean(errors.email) : false}
          />
        </FormControl>
      ) : null}
      <FormControl fullWidth className={classes.formControl}>
        <FormLabel classes={{ root: classes.formLabel }} htmlFor='password'>
          Password
        </FormLabel>
        <TextField
          fullWidth
          type='password'
          id='password'
          name='password'
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Enter password'
          helperText={touched.password ? errors.password : ""}
          error={touched.password ? Boolean(errors.password) : false}
        />
      </FormControl>
    </>
  );
};

export default FormField;
