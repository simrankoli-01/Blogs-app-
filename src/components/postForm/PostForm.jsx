// PostForm.jsx
import React, { useCallback, useEffect } from "react";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import RTE from "../RTE";
import { useForm } from "react-hook-form";
import service from "../../appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    control,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const submit = async (data) => {
    try {
      if (post) {
        const file = data.image?.[0]
          ? await service.uploadFile(data.image[0])
          : null;

        if (file) {
          await service.deleteFile(
            post.featuredImage || post.featureImg
          );
        }

        const dbPost = await service.updatePost(post.$id, {
          title: data.title,
          slug: data.slug,
          content: data.content,
          status: data.status,
          featuredImage:
            file?.$id ||
            post.featuredImage ||
            post.featureImg,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        if (!data.image?.[0]) return;

        const file = await service.uploadFile(data.image[0]);

        if (file) {
          const dbPost = await service.createPost({
            title: data.title,
            slug: data.slug,
            content: data.content,
            status: data.status,
            featuredImage: file.$id,
            userId: userData.$id,
            username: userData.name,
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error("Post submit error:", error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (!value || typeof value !== "string") return "";

    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, slugTransform]);

  const currentImage =
    post?.featuredImage || post?.featureImg;

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]"
    >
      <div className="space-y-7">
        <Input
          label="Title"
          placeholder="Write your story title..."
          {...register("title", { required: true })}
        />

        <Input
          label="Slug"
          placeholder="story-slug"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue(
              "slug",
              slugTransform(e.currentTarget.value),
              {
                shouldValidate: true,
              }
            );
          }}
        />

        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <aside className="h-fit space-y-6 border-l border-white/10 pl-0 lg:pl-8">
        <Input
          label="Featured image"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
          {...register("image", { required: !post })}
        />

        {post && currentImage && (
          <div className="overflow-hidden border border-white/10 bg-black">
            <img
              src={service.getFileView(currentImage)}
              alt={post.title}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        )}

        <Select
          label="Status"
          options={["active", "inactive"]}
          {...register("status", { required: true })}
        />

        <Button type="submit" className="w-full">
          {post ? "Update story" : "Publish story"}
        </Button>
      </aside>
    </form>
  );
};

export default PostForm;