import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const labelStyles ={md:1,mt:2,fontSize:'24px',fontWeight:'bold'};
const AddBlog = () => {

  const navigate=useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const handleChange= (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  }

  const sendRequest=async() => {
    const res=await axios.post("https://sameerblog.onrender.com/api/blog/add",{
      title:inputs.title,
      description:inputs.description,
      image:inputs.imageURL,
      user:localStorage.getItem("userId"),
  
    }).catch(err => console.log(err))
    let data;
    if(res)
      data=await res.data;

    return data;
  }
  
  const handleSubmit= (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data=>console.log(data)).then(() =>navigate("/blogs") )

  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor=" linear-gradient(90deg, rgba(20,0,36,1) 0%, rgba(56,9,121,1) 35%, rgba(0,212,255,1) 100%);"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={'auto'}
          marginTop={3}
          display="flex"
          flexDirection={"column"}
          width={"80%"}
        >
          <Typography fontWeight={'bold'} padding={3} color="grey"   variant="h2"  textAlign={'center'}>Post Your Blog</Typography>
          <InputLabel  sx={labelStyles}>Title</InputLabel>
          <TextField name="title" onChange={handleChange}  value={inputs.title} margin="normal" variant="outlined" />
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField  name="description" onChange={handleChange}  value={inputs.description}  margin="normal" variant="outlined"  />
          <InputLabel sx={labelStyles}>ImageURL</InputLabel>
          <TextField name="imageURL" onChange={handleChange}  value={inputs.imageURL}   margin="normal" variant="outlined" />
          <Button sx={{mt:2, borderRadius:4}} variant="contained" color="warning" type="submit"  >Submit</Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;



const a = [1,2,3,4]
const b = [...a, 6, 7]