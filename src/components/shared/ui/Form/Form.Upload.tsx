import { useField, useFormikContext } from "formik";
import { ChangeEvent, useRef } from "react";
import Form from "./Form";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  uploadValue: File | null;
  formats: string[];
}

export const FormUpload: React.FC<Props> = ({ name, uploadValue, formats, ...props }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const { setFieldValue } = useFormikContext();

  const [field] = useField(name);
  const { value, ...rest } = field;

  return (
    <div className="w-48 h-48 col-span-4 flex justify-center items-center">
      <label className="flex flex-col justify-center items-center w-full h-full bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden">
        {uploadValue ? (
          <div
            className="w-full h-full"
            onClick={() => {
              setFieldValue(name, null);
            }}
          >
            <Form.ImagePreview file={value} width={192} height={192} />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center pt-5 pb-6" onClick={() => fileRef.current?.click()}>
            <svg
              aria-hidden="true"
              className="mb-3 w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF</p>
          </div>
        )}
      </label>
      <input
        // name={name}
        type="file"
        ref={fileRef}
        accept={formats?.join(", ")}
        hidden
        {...rest}
        {...props}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          e.target.files && setFieldValue(name, e.target.files[0]);
          e.target.value = "";
        }}
      />
    </div>
  );
};
