import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import profileService from "../../appwrite/profile";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "../index";
import { Link, useNavigate } from "react-router-dom";
import service from "../../appwrite/conf";

const EditProfile = () => {
  const [profile, setProfile] = useState(null);
  const [preview, setPreview] = useState("");
  const userData = useSelector((state) => state.auth.userData);
  const { register, handleSubmit, reset, watch } = useForm();
  const navigate = useNavigate();
  const image = watch("image");
  const bio = watch("bio", profile?.bio || "");

  console.log("loggedin user:", userData)
  // console.log(bio.length)

  useEffect(() => {
    if (!image?.[0]) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(image[0]);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  // console.log(preview)

  useEffect(() => {
    if (userData) {
      profileService.getUserProfile(userData.$id).then((data) => {
        setProfile(data);

        reset({
          name: data.name,
          bio: data.bio,
        });
      });
    }
  }, [userData, reset]);
  // console.log(profile)

  const submit = async (data) => {
    
    let imageId = profile.profileImg;

    if (data.image?.[0]) {
      const file = await service.uploadFile(data.image[0]);
      if (file) {
        if (profile.profileImg) {
          await service.deleteFile(profile.profileImg);
        }
        imageId = file.$id;
      }
    }

    const updated = await profileService.updateProfile(userData.$id, {
      name: data.name,
      bio: data.bio,
      profileImg: imageId,
    })
    navigate("/profile");
     console.log("Updated profile:", updated);
  };

  return (
    <div className="w-full md:py-7 py-0">
      <form
        onSubmit={handleSubmit(submit)}
        className="max-w-3xl bg-white/20 mx-auto text-white p-6 md:rounded-2xl rounded-none md:py-4 py-5 md:px-20 px-3"
      >
        <div className="flex flex-col justify-center items-center gap-3 text-center">
          <img
            src={
              preview
                ? preview
                : profile?.profileImg
                ? service.getFileView(profile.profileImg)
                : `https://ui-avatars.com/api/?name=${profile?.name}&background=random`
            }
            alt=""
            className="md:w-36 w-20 md:h-36 h-20 rounded-full border-2 border-white/50 object-cover"
          />
          <input
            id="profileImage"
            type="file"
            accept="image/png, image/jpg, image/jpeg,*"
            className="hidden"
            {...register("image")}
          />
          <label
            htmlFor="profileImage"
            className="cursor-pointer w-30 bg-blue-600 text-xs p-2 font-semibold text-white rounded-xl hover:bg-blue-800"
          >
            Change photo
          </label>
        </div>

        <div className="mt-2">
          <Input
            label="Name"
            placeholder="Name"
            className="mb-3 text-white"
            {...register("name")}
          />

          <div className="relative mb-3">
            <label className="block mb-2 font-medium">Bio</label>

            <textarea
              rows={5}
              maxLength={150}
              className="w-full rounded-xl md:text-[14px] text-xs bg-white/10 border border-white/30 p-3 text-white placeholder:text-gray-300 outline-none focus:border-blue-500 resize-none"
              {...register("bio")}
            />
            <span className="absolute bottom-2 right-3 text-xs text-gray-400">
              {bio.length}/150
            </span>
          </div>

          <Input
            label="Email"
            value={profile?.email || ""}
            type="email"
            readOnly
            className="text-white mb-3 cursor-not-allowed"
          />

          <Button
            type="submit"
            className="w-full mt-2 hover:bg-violet-800 cursor-pointer"
          >
            {" "}
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
