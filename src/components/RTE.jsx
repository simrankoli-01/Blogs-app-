// RTE.jsx
import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

const RTE = ({ name, control, label, defaultValue = "" }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block font-sans text-xs font-medium uppercase tracking-[0.18em] text-black/60">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <div className="w-full overflow-hidden border border-white/10 bg-black">
            <Editor
              apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
              value={value || ""}
              onEditorChange={onChange}
              init={{
                height: window.innerWidth < 768 ? 320 : 520,
                menubar: false,
                statusbar: false,
                resize: false,
                toolbar_mode: "wrap",
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
                  "media",
                  "table",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | bold italic | " +
                  "alignleft aligncenter alignright | " +
                  "bullist numlist | link image | removeformat | code",
                content_style: `
                  body {
                    margin: 24px;
                    background: #ffffff;
                    color: #171717;
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    line-height: 1.8;
                  }

                  h1, h2, h3 {
                    font-family: Georgia, serif;
                    font-weight: 500;
                    line-height: 1.2;
                  }

                  h1 { font-size: 34px; }
                  h2 { font-size: 28px; }
                  h3 { font-size: 22px; }

                  p {
                    margin: 0 0 16px;
                  }

                  img {
                    max-width: 100%;
                    height: auto;
                  }

                  a {
                    color: #171717;
                    text-decoration: underline;
                  }

                  blockquote {
                    margin: 24px 0;
                    padding-left: 20px;
                    border-left: 2px solid #171717;
                    font-family: Georgia, serif;
                    font-style: italic;
                  }
                `,
                mobile: {
                  menubar: false,
                  toolbar_mode: "wrap",
                  toolbar:
                    "undo redo | blocks | bold italic | " +
                    "bullist numlist | alignleft aligncenter alignright | " +
                    "link image | removeformat",
                },
              }}
            />
          </div>
        )}
      />
    </div>
  );
};

export default RTE;