import mongoose from "mongoose";
 

const projectSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
         
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    phoneno:{
        type:String,
        required:true,
        unique:true
    },
    githublink:{
        type:String,
        required:true,
        unique:true
    },
    linkdienlink:{
        type:String,
        required:true,
        unique:true
    },
    userid:{
        type:String,
        required:true,
        
    }//from auth clerk
   , about:{
    type:String,
    required:true,
     
   },
    projects: [
    {
      title: String,
      description: String,
      tags: [String],
      demoLink: String,
      githubLink: String,
    }
  ],
   skills: {
    type: [String], // array of strings
    default: [],
  },
skillsDetailed:[
  {
    icon: String,
    color: String,
    title: String,
    description: String
  }
],
role:{
  type:String,
  required:true
},
Experience:[{
  title:String,
  company:String,
  description:String,
  period:String
}]
,
Education:[{
  title:String,
  company:String,
  description:String,
  period:String
}]
})

const Project = mongoose.models.projects || mongoose.model("projects", projectSchema);

export default Project;