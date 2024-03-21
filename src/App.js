import { 
  Button, Container, Select, MenuItem, TextField, Typography, FormControl, InputLabel,
  Box, Modal } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { useState } from "react";

const useStyles = () => {
  return {
    container:{
      padding:'2em'
    },
    field:{
      display:'block',
      marginTop:'1em',
      marginBottom:'1em'
    },
    modal:{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    }
  }
}

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({})
  const [formValues, setFormValues] = useState({
    name:{
      value:'',
      default:'',
      error:false,
      required:true,
      errorMessage:'You must enter a name'
    },
    address:{
      value:'',
      default:'',
      error:false,
      required:true,
      errorMessage:'You must enter an address'
    },
    age:{
      value:21,
      default:21,
      error:false,
      required:false,
      errorMessage:'You must enter an age'
    },
    gender:{
      value:'Male',
      default:'Male',
      error:false,
      required:false,
      errorMessage:'You must choose between Male of Female'
    },
    jobPosition:{
      value:'Intern',
      default:'Intern',
      error:false,
      required:false,
      errorMessage:'You must fill your current job poition'
    },
    birthdate:{
      value:dayjs(new Date()),
      default:dayjs(new Date()),
      error:false,
      required:false,
      errorMessage:'You must fill your birthdate'
    },
    career:{
      value:'',
      default:'',
      error:false,
      required:false,
      errorMessage:'You must enter your career history'
    },
  })

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    let error = value === '';
    if (!formValues[name].required) {
      error = false;
    }
    setFormValues({
      ...formValues,
      [name]:{
        ...formValues[name],
        error:error,
        value
      }
    })
  }

  const dateChange = (v) => {
    const {name, value} = {name:"birthdate", value:v.$d};
    let error = isNaN(v.$d);
    if (!formValues[name].required) {
      error = false;
    }
    setFormValues({
      ...formValues,
      [name]:{
        ...formValues[name],
        error:error,
        value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formFields = Object.keys(formValues);
    let newFormValues = {...formValues};

    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue = formValues[currentField].value;
      if (formValues[currentField].required) {
        let error = currentValue === '';
        if (currentField === 'birthdate') {
          error = isNaN(currentValue);
        }
        
        newFormValues = {
          ...newFormValues,
          [currentField]:{
            ...newFormValues[currentField],
            error:error
          }
        }
      }
    }

    setFormValues(newFormValues);

    let goodToGo = true;
    for (const property in newFormValues) {
      if (newFormValues[property].required) {
        if (newFormValues[property].error) {
          goodToGo = false;
        }
      }
    }

    if (goodToGo) {
      let newValues = {};
      for (const property in newFormValues) {
        newValues[property] = newFormValues[property].value;
      }
      console.log(newValues);
      setValues(newValues);
      setOpen(true);
    }
  }

  const reset = (e) => {
    let newFormValues = {...formValues};
    for (const property in newFormValues) {
      newFormValues[property].value = formValues[property].default
    }

    setFormValues(newFormValues);
  }

  return (
    <>
      <Container sx={classes.container} >
        <form noValidate onSubmit={handleSubmit} >
          <Typography 
            variant="h6">
              Please enter your data
          </Typography>

          <TextField 
            placeholder="Enter your name"
            label="Full Name"
            name="name"
            variant="outlined"
            fullWidth
            required
            sx={classes.field}
            value={formValues.name.value}
            onChange={handleChange}
            error={formValues.name.error}
            helperText={formValues.name.error && formValues.name.errorMessage}
          />

          <TextField 
            placeholder="Enter your current address"
            label="Address"
            name="address"
            variant="outlined"
            fullWidth
            required
            sx={classes.field}
            value={formValues.address.value}
            onChange={handleChange}
            error={formValues.address.error}
            helperText={formValues.address.error && formValues.address.errorMessage}
          />

          <TextField 
            placeholder="Enter your age"
            label="Age"
            name="age"
            variant="outlined"
            fullWidth
            type="number"
            sx={classes.field}
            value={formValues.age.value}
            onChange={handleChange}
            error={formValues.age.error}
            helperText={formValues.age.error && formValues.age.errorMessage}
          />

          <FormControl fullWidth>
            <InputLabel id="gender-label">Age</InputLabel>
            <Select
              labelId="gender"
              label="Gender"
              name="gender"
              onChange={handleChange}
              value={formValues.gender.value}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>

          <TextField 
            placeholder="Enter your current Job Position"
            label="Job Position"
            name="jobPosition"
            variant="outlined"
            fullWidth
            sx={classes.field}
            value={formValues.jobPosition.value}
            onChange={handleChange}
            error={formValues.jobPosition.error}
            helperText={formValues.jobPosition.error && formValues.jobPosition.errorMessage}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
              fullWidth
              disableFuture
              label="Birth date"
              name="birthdate"
              sx={classes.field}
              value={formValues.birthdate.value}
              onChange={dateChange}
              error={formValues.birthdate.error}
              helperText={formValues.birthdate.error && formValues.birthdate.errorMessage}
            />
          </LocalizationProvider>
          
          <TextField 
            placeholder="Describe your career history"
            label="Career"
            name="career"
            variant="outlined"
            fullWidth
            sx={classes.field}
            value={formValues.career.value}
            multiline
            rows={4}
            onChange={handleChange}
            error={formValues.career.error}
            helperText={formValues.career.error && formValues.career.errorMessage}
          />

          <Button
            type="reset"
            variant="outlined"
            sx={{marginRight:'1em'}}
            onClick={reset}
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant="outlined"
            color="secondary"
          >
            Submit
          </Button>
        </form>
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={classes.modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Submission complete!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {JSON.stringify(values)}
          </Typography>
        </Box>
      </Modal>
    </>
  )
}