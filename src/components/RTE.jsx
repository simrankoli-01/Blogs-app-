import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

const RTE = ({ name, control, label, defaultValue = "" }) => {
  return (
    <div className="w-full overflow-x-hidden">
      {label && (
        <label className="text-sm font-medium text-black inline-block mb-1 pl-1">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <div className="w-full overflow-hidden">
            <Editor
              apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
              initialValue={defaultValue}
              init={{
                height: window.innerWidth < 768 ? 300 : 500,
                menubar: true,
                toolbar_mode: "wrap",
                statusbar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                mobile: {
                  theme: "silver",
                  toolbar_mode: "wrap",
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | bold italic | bullist numlist | alignleft aligncenter alignright | link image | removeformat",
                },
              }}
              onEditorChange={onChange}
            />
          </div>
        )}
      />
    </div>
  );
};

export default RTE;
