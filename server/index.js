import express, { response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(cors());

const CONNECTION_URL = "mongodb+srv://admin-Abdallah:Abdallah123@cluster0.o8mpl.mongodb.net/keeperDatabase?retryWrites=true&w=majority";

const itemSchema = mongoose.Schema({
  title: String,
  content: String,
});

const ItemModel = mongoose.model("item", itemSchema);

const port = process.env.PORT || 5000;

app.get("/items", async (req, res) => {
  try {
    const response = await ItemModel.find();
    res.status(201).json(response);
  } catch (error) {
    res.status(404).json(console.log(error.message));
  }
});

app.post("/items", async (req, res) => {
  const data = req.body;
  const response = new ItemModel(data);
  try {
    await response.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(404).json(console.log(error.message));
  }
});

app.delete("/items/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).send("this id is not valid");
  }
  await ItemModel.findByIdAndRemove(id);
  res.json("item deleted successfully !");
});

mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(port, () => console.log(`server is running on port :${port}`)))
  .catch((error) => console.log(error.message));
