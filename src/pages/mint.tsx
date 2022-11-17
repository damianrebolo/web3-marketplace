import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { ChainId } from "@thirdweb-dev/sdk";
import { useAddress, useContract, useNetwork, useNetworkMismatch, useStorageUpload } from "@thirdweb-dev/react";

import { Formik, Form as FormikForm, FieldArray } from "formik";

import { Container } from "components/shared/ui";
import { Button } from "components/shared/ui/Button";
import Form from "components/shared/ui/Form";
import { useToast } from "components/shared/core/Toaster/ToasterProvider";
import { initialValues, mintSchema, propertiesInitialValues, SUPPORTED_FORMATS } from "constants/mint";

const MintPage: NextPage = () => {
  const router = useRouter();
  const [minting, setMinting] = useState(false);
  const toast = useToast();
  const isMismatched = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const address = useAddress() as string;
  const { mutateAsync: upload } = useStorageUpload();
  const { contract: nftCollection } = useContract(process.env.NEXT_PUBLIC_CONTRACT_NFTS, "nft-collection");

  const handleMinNft = useCallback(
    async (nftValues: typeof initialValues) => {
      setMinting(true);
      try {
        // Validate network first
        if (isMismatched) {
          const switched = await switchNetwork?.(ChainId.Goerli);
          if (switched?.error) {
            throw new Error();
          } else {
            toast?.pushInfo("Network Switched, try again");
            return;
          }
        }

        const uris = await upload({
          data: [nftValues.file],
        });

        const signedPayloadReq = await fetch(`/api/mint`, {
          method: "POST",
          body: JSON.stringify({
            address,
            name: nftValues.name,
            description: nftValues.description,
            image: uris[0],
            properties: nftValues.properties,
          }),
        });

        const signedJson = await signedPayloadReq.json();

        if (!signedPayloadReq.ok) {
          throw new Error(signedJson.error);
        }

        const signedPayload = signedJson.signedPayload;

        const nft = await nftCollection?.signature.mint(signedPayload);

        if (nft) {
          router.push(`/nfts`);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast?.pushError("The transaction did not take place..");
        } else {
          console.log(error);
        }
      } finally {
        setMinting(false);
      }
    },
    [address, nftCollection, upload, router, isMismatched, switchNetwork, toast]
  );

  return (
    <Container className="m-10">
      <Formik
        initialValues={initialValues}
        validationSchema={mintSchema}
        onSubmit={(values) => {
          handleMinNft(values);
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
                          setFieldValue("properties", [propertiesInitialValues]);
                        }}
                      >
                        Reset
                      </Button>
                    </Form.Group>
                    {values.properties.map((friend, index) => (
                      <Form.Group key={index} className="gap-x-3">
                        <Form.Col col={5}>
                          <Form.Field name={`properties.${index}.trait_type`} placeholder="trait_type" type="text" />
                        </Form.Col>
                        <Form.Col col={6}>
                          <Form.Field name={`properties.${index}.value`} placeholder="value" type="text" />
                        </Form.Col>
                        <Form.Col col={1} className="self-center place-self-end">
                          <Button className="col-span-1" size="sm" variant="secondary" onClick={() => remove(index)}>
                            X
                          </Button>
                        </Form.Col>
                        <Form.Col col={5}>
                          <Form.ErrorMessage name={`properties.${index}.trait_type`} />
                        </Form.Col>
                        <Form.Col col={6}>
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
                  {minting ? "Loading..." : "Submit"}
                </Button>
              </Form.Group>
            </Form.Container>
          </FormikForm>
        )}
      </Formik>
    </Container>
  );
};

export default MintPage;
