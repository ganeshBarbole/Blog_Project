import React, { useCallback } from "react";
import {Button,RTE,Input,Select} from '../index';
import {useForm} from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {databaseService} from '../../appwrite/DatabaseService'

export default function PostForm(post){
    const navigate = useNavigate();
    const {register,handleSubmit,watch,setValue,getValues,control} = useForm({
        defaultValues:{
            title: post?.title || "",
            slug : post?.slug || "",
            content : post?.content || "",
            status : post?.status || Active
            
        }
    })
    const userdata = useSelector(state => state.user.userdata)

    const submit = async(data) => {
        if(post) {
              const file = data.image[0] ? databaseService.createFile(data.image[0]) :null
            if(file){
                databaseService.deleteFile(post.feacturedImage)
            }
            const dbPost = await databaseService.updatePost(post.$id,{
                ...data,
                feacturedImage : file ? file.$id : undefined,

                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            })
        }
        else {
            const file = await databaseService.createFile(data.image[0])
            if(file){
                const fileId = file.$id;
                data.feacturedImage = fileId;
                const dbPost = await databaseService.createPost({
                    ...data,
                    userId : userdata.$id
                })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === 'string'){
            return value
            .trim()
            .toLowerCase()
            .replace(/^[a-zA-Z\d\s]+/g , '-')
            .replace(/\s/g,'-')
        }
        return ''
    },[])

    React.useEffect(() => {
      const subscribtion = watch((value,{name}) => { 
          if(name === 'title'){
            setValue('slug',slugTransform((value.title),{shouldValidate : true}))
          }
      })
      return (() => {
        subscribtion.unsubscribe()
      })
    },[watch,setValue,slugTransform])

    return(
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

