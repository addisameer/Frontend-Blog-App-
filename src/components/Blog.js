import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import ModeEditIcon from '@mui/icons-material/ModeEdit'; 
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useNavigate} from "react-router-dom";
import axios from "axios"


const Blog = ({id,title,description ,imageURL,userName,isUser}) => {
  const navigate=useNavigate()

  const handleEdit= (e) => {
      navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async() => {
    console.log(id)
    const res=await axios.delete(`https://sameerblog.onrender.com/api/blog/${id}`).catch(err => console.log(err))
    const data= await res.data
    console.log(data)
    return data


  }
  const handleDelete = () => {
    deleteRequest().then(() => navigate("/")).then(() => navigate("/blogs"))
  }
  return (
    <div>
      {" "}
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": { boxShadow: "10px 10px 20px #ccc" },
        }}
      >
        {isUser && (
          <Box display='flex' >
            <IconButton  onClick={handleEdit}  sx={{marginLeft:'auto' }}><ModeEditIcon color="warning"/></IconButton>
            <IconButton onClick={handleDelete}  > <DeleteForeverIcon color="error"/> </IconButton>


          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName}
            </Avatar>
          }
          title={title}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image={imageURL}
          alt="Paella dish"
        />
      

        <CardContent>
        <hr/>
        <br/>
          <Typography variant="body2" color="text.secondary">
          <b> {userName}</b>{" : "} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
