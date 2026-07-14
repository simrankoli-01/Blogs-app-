import React, { useCallback, useEffect } from "react";
import { Button, Input, Select, RTE } from "../index";
import { useForm } from "react-hook-form";
import service from "../../appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const { register, handleSubmit, getValues, setValue, watch, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const userData = useSelector((state) => state.auth.userData);

  const navigate = useNavigate();

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;
      if (file) {
        service.deleteFile(post.featureImg || post.featureImage);
      }

      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : post.featureImg,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await service.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;

        const dbpost = await service.createPost({
          title: data.title,
          slug: data.slug,
          content: data.content,
          status: data.status,
          featuredImage: file.$id,
          userId: userData.$id,
          username: userData.name
        });

        if (dbpost) {
          navigate(`/post/${dbpost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, setValue, slugTransform]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col sm:flex-wrap sm:flex-row"
    >
      <div className="w-full sm:w-2/3 px-2">
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
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-full sm:w-1/3 px-2 mt-4 sm:mt-0">
        <Input
          label="Featured Image:"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={post.featureImg ? service.getFileView(post.featureImg) : ""}
              alt={post.title}
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4 bg-white/20"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgcolor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "update" : "submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;