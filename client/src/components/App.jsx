import React, { useEffect } from "react";
import Header from "./Header";
import Note from "./Note";
import CreateItem from "./CreateItem";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../redux-store/itemSlice";
import { Grid } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.items.value);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <div className="container">
      <Header />
      <CreateItem />
      <Grid container spacing={3}>
        {notes.map((note, index) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Note key={index} note={note} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default App;
