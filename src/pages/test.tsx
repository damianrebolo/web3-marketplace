import React from "react";
import { Formik, Form as FormikForm, FieldArray } from "formik";
import * as Yup from "yup";
import { NextPage } from "next";
import { Button } from "components/shared/ui/Button";
import Form from "components/shared/ui/Form";
import { Container } from "components/shared/ui";

const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png", "image/avif"];

const SignupSchema = Yup.object().shape({
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

const ValidationSchemaExample: NextPage = () => (
  <Container className="m-10">
    <Formik
      initialValues={{
        name: "",
        description: "",
        file: null,
        properties: [
          {
            trait_type: "",
            value: "",
          },
        ],
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ values, setFieldValue }) => (
        <FormikForm>
          <Form.Container>
            <h1 className="w-full my-8 text-2xl text-gray-700 dark:text-white">Mint NFT</h1>
            <Form.Group>
              <Form.Upload name="file" uploadValue={values.file} formats={SUPPORTED_FORMATS} />
              <Form.ErrorMessage className="col-span-12" name="file" />
            </Form.Group>
            <Form.Group>
              <Form.Field className="col-span-12" name="name" placeholder="Name" />
              <Form.ErrorMessage className="col-span-12" name="name" />
            </Form.Group>
            <Form.Group>
              <Form.TextArea className="col-span-12" name="description" rows={6} placeholder="Description" />
              <Form.ErrorMessage className="col-span-12" name="description" />
            </Form.Group>
          </Form.Container>
          <Form.Container>
            <FieldArray name="properties">
              {({ remove, push }) => (
                <>
                  <Form.Group className="place-items-end">
                    <Button
                      className="col-span-12"
                      size="sm"
                      variant="secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        setFieldValue("properties", [
                          {
                            trait_type: "",
                            value: "",
                          },
                        ]);
                      }}
                    >
                      Reset
                    </Button>
                  </Form.Group>
                  {values.properties.map((friend, index) => (
                    <Form.Group key={index} className="gap-x-3">
                      <Form.Col col="5">
                        <Form.Field name={`properties.${index}.trait_type`} placeholder="trait_type" type="text" />
                      </Form.Col>
                      <Form.Col col="6">
                        <Form.Field name={`properties.${index}.value`} placeholder="value" type="text" />
                      </Form.Col>
                      <Form.Col className="self-center place-self-end">
                        <Button className="col-span-1" size="sm" variant="secondary" onClick={() => remove(index)}>
                          X
                        </Button>
                      </Form.Col>
                      <Form.Col col="5">
                        <Form.ErrorMessage name={`properties.${index}.trait_type`} />
                      </Form.Col>
                      <Form.Col col="6">
                        <Form.ErrorMessage name={`properties.${index}.value`} />
                      </Form.Col>
                    </Form.Group>
                  ))}
                  <Form.Group className="place-items-start">
                    <Button
                      className="col-span-12"
                      size="sm"
                      variant="success"
                      onClick={(e) => {
                        e.preventDefault();
                        push({ trait_type: "", value: "" });
                      }}
                    >
                      + Add Row
                    </Button>
                  </Form.Group>
                </>
              )}
            </FieldArray>
          </Form.Container>
          <Form.Container>
            <Form.Group className="place-items-center">
              <Button className="col-span-12" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form.Container>
        </FormikForm>
      )}
    </Formik>
  </Container>
);

export default ValidationSchemaExample;
