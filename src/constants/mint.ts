import * as Yup from "yup";

const FILE_SIZE = 160 * 1024;
export const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png", "image/avif"];

export const mintSchema = Yup.object().shape({
  name: Yup.string().max(50, "Max 50 chars").required("A name is required"),
  description: Yup.string().max(150, "Max 150 chars").required("A description is required"),
  file: Yup.mixed()
    .nullable()
    .required("A file is required")
    .test("SUPPORTED_FORMATS", "Unsupported Format", (value) => value && SUPPORTED_FORMATS.includes(value.type))
    .test("FILE_SIZE", "File too large", (value) => value && value.size <= FILE_SIZE),
  properties: Yup.array().of(
    Yup.object().shape({
      trait_type: Yup.string().max(50, "Max 50 chars"),
      value: Yup.string().max(50, "Max 50 chars"),
    })
  ),
});

export const attrInitialValues = {
  trait_type: "",
  value: "",
};

export const initialValues = {
  name: "",
  description: "",
  file: null,
  attributes: [attrInitialValues],
};
