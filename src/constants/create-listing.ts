import * as Yup from "yup";

export const listingSchema = Yup.object().shape({
  nftId: Yup.number().required("A NFT has to be chosen"),
  price: Yup.number().max(20, "Max 150 chars").required("A description is required"),
});

export const initialValues = {
  nftId: null,
  price: "",
};
