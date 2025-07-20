import { useContext } from "react";
import { BlogContext } from "../pages/blog.page";
import { Link } from "react-router-dom";
import { UserContext } from "../App"
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";

const BlogInteraction = () => {

    let { blog, blog: { _id, title, blog_id, activity, activity: { total_likes, total_comments }, author: { personal_info: { username: author_username } } }, setblog, islikedByUser, setlikedByUser, setCommentsWrapper } = useContext(BlogContext);

    let { userAuth: { username, access_token } } = useContext(UserContext);

    useEffect(() => {

        if(access_token ){
            //make req to server to get like information
            axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/isliked-by-user", { _id }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(({ data: { result } }) => {
                setlikedByUser(Boolean(result))
            })
            .catch(err => {
                console.log(err);
            })
        }

    })

    const handleLike = () => {

        if(access_token){
            //like the blog
            setlikedByUser(preval => !preval);

            !islikedByUser ? total_likes++ : total_likes--;

            setblog({ ...blog, activity: { ...activity, total_likes } })

            axios.post(import.meta.env.VITE_SERVER_DOMAIN +"/like-blog", { _id, islikedByUser }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(({ data }) => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
            
        } 
        else{
            //not logged in
            toast.error("please login to like this blog")
        }
    }

    return (
        <>
            <Toaster />
            <hr className="border-grey my-2" />

            <div className="flex gap-6 justify-between">
               <div className="flex gap-6 justify-between">

                    <button
                        onClick={handleLike}
                        className={"w-10 h-10 rounded-full flex items-center justify-center " + ( islikedByUser ? "bg-red/20 text-red" : "bg-grey/80" )}
                    >
                        <i className={"fi " + ( islikedByUser ? "fi-sr-heart" : "fi-rr-heart" )}></i>
                    </button>
                    <p className="border-grey my-2">{ total_likes }</p>


                    <button
                        onClick={() => setCommentsWrapper(preval => !preval)}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-gray/80"
                    >
                        <i className="fi fi-rr-comment-dots"></i>
                    </button>
                    <p className="border-grey my-2">{ total_comments }</p>

               </div>

                <div className="flex gap-6 items-center">

                    {
                        username == author_username ? 
                        <Link to={`/editor/${blog_id}`} className="underline hover:text-purple">Edit</Link> : ""
                    }

                    <Link to={`https://twitter.com/intent/tweet?text=Read ${title}&url=${location.href}`}><i className="fi fi-brands-twitter text-xl hover:text-twitter"></i></Link>

                </div>
            </div>

            <hr className="border-grey my-2" />
        </>
    )
}

export default BlogInteraction;