import { applyApplication, getApplicantsForPost, updateApplicationStatus } from "../lib/applications.js";
import { createPost, deletePost, getAllPostsByEmp, getPost, searchAvailablePostForUser, updatePost } from "../lib/postings.js";
import { ApiResponse } from "../utils/response.js";

export async function handleNewPost(req, res) {
  
  const body = req.body;
  
    body.company_name = req.user.company_name || req.user.name;
  try {
    await createPost(body);
    return res.json(new ApiResponse(200, { message: "job post added" }, true));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, { message: "failed to add job posts",error }, false));
  }
}

export async function handleUpdatePost(req, res) {
    
    const body = req.body;
  
    try {
      await updatePost(body);
      return res.json(new ApiResponse(200, { message: "job post updated" }, true));
    } catch (error) {
      return res.status(500).json(new ApiResponse(500, { message: "failed to update job posts",error }, false));
    }
  }

export async function handleGetPosts(req,res) {
    const {id} = req.query;
    try {
        const data = await getAllPostsByEmp(id);
        return res.json(new ApiResponse(200,data, true));
    } catch (error) {
        return res.json(new ApiResponse(500, { message: "posts data fetch failed",error }, false));
    }
}

export async function handleGetSinglePost(req,res) {
    const {id} = req.params;
    try {
        const data = await getPost(id);
        return res.json(new ApiResponse(200,data, true));
    } catch (error) {
        return res.json(new ApiResponse(200, { message: "posts data fetch failed",error }, false));
    }
}


export async function handleGetPostApplications(req,res) {
    const {id} = req.params;
    try {
        const data = await getApplicantsForPost(id);
        data.forEach((entry)=>{
            entry.user_data = JSON.parse(entry.user_data);
            entry.name = entry.user_data.name;
        })
        return res.json(new ApiResponse(200,data, true));
    } catch (error) {
        return res.json(new ApiResponse(500, { message: "posts data fetch failed",error }, false));
    }
}


export async function handleDeletePost(req,res) {
    const {id} = req.params;
    try {
        await deletePost(id);
        return res.json(new ApiResponse(200,{ message:`Post ${id} is deleted` }, true));
    } catch (error) {
        return res.json(new ApiResponse(500, { message: `Post ${id} deletion failed`,error }, false));
    }
}



export async function handlePostSearch(req,res) {
  const {query} = req.query;
  
  
  try {
    const {user_id} = req.user;
    const data  = await searchAvailablePostForUser(query,user_id);
    return res.json(new ApiResponse(200,data, true));
  } catch (error) {
   
    
    return res.status(500).json(new ApiResponse(500,{ message:`Search failed query`,error }, false));
  }
}


export async function handlePostApply(req,res) {
    const {user_id} = req.user;
    const {post_id} = req.query;
  try {
    const data = await applyApplication(user_id,post_id);
    return res.json(new ApiResponse(200,{message:`Applied successfully for post - ${post_id}`,data}, true));
  } catch (error) {
    return res.json(new ApiResponse(500,{message:`Application failed for post - ${post_id}`,error}, false));
  }
}




export async function  handleApplicationStatus(req,res) {
  const {id,status} = req.body;
  if(!id && !status){
    return res.status(400).json(new ApiResponse(400,{message:`Application id and status missing`}, false));
  }
  
  try {
    const data = await updateApplicationStatus(status,id);
    return res.json(new ApiResponse(200,{message:`Application status updated - ${id}`,data}, true));
  } catch (error) {
    return res.json(new ApiResponse(500,{message:`Application status failed  - ${id}`,error}, false));
  }
}
