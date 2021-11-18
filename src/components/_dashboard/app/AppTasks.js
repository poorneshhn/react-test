import PropTypes from "prop-types";
import { Form, FormikProvider, useFormik } from "formik";
import { useState, useRef } from "react";
// material
import {
  Box,
  Card,
  Checkbox,
  CardHeader,
  Typography,
  FormControlLabel,
  Stack,
} from "@mui/material";

// ----------------------------------------------------------------------

const TASKS = [
  "Create FireStone Logo",
  "Add SCSS and JS files if required",
  "Stakeholder Meeting",
  "Scoping & Estimations",
  "Sprint Showcase",
];

// ----------------------------------------------------------------------

TaskItem.propTypes = {
  task: PropTypes.string,
  checked: PropTypes.bool,
  formik: PropTypes.object,
};

function TaskItem({ task, checked, formik, ...other }) {
  const { getFieldProps } = formik;

  return (
    <Stack direction="row" justifyContent="space-between" sx={{ py: 0.75 }}>
      <FormControlLabel
        control={
          <Checkbox
            {...getFieldProps("checked")}
            value={task}
            checked={checked}
            {...other}
          />
        }
        label={
          <Typography
            variant="body2"
            sx={{
              ...(checked && {
                color: "text.disabled",
                textDecoration: "line-through",
              }),
            }}
          >
            {task}
          </Typography>
        }
      />
    </Stack>
  );
}

export default function AppTasks() {
  const [newtask, setNewTask] = useState([...TASKS]);
  const taskInput = useRef();
  const formik = useFormik({
    initialValues: {
      checked: [TASKS[2]],
    },
    onSubmit: (values) => {
      if (!taskInput.current.value) {
        alert("Enter something!");
        return;
      }
      setNewTask([...newtask, taskInput.current.value]);
      const taskInputField = document.getElementById("taskInbox");
      taskInputField.value = "";
      taskInputField.focus();
    },
  });

  const { values, handleSubmit } = formik;

  return (
    <Card>
      <CardHeader title="Tasks" />
      <Box sx={{ px: 3, py: 1 }}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <input type="text" id="taskInbox" ref={taskInput} />
            <button
              style={{ color: "white", background: "green" }}
              type="submit"
            >
              Submit
            </button>
            {newtask.map((task, index) => (
              <TaskItem
                key={index}
                task={task}
                formik={formik}
                checked={values.checked.includes(task)}
              />
            ))}
          </Form>
        </FormikProvider>
      </Box>
    </Card>
  );
}
