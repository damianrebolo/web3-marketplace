import { NextPage } from "next";

import { Container } from "../components/shared/ui";

const ThegraphPage: NextPage = () => (
  <Container className="py-5">
    <div className="flex flex-nowrap justify-start items-start">
      <div className="flex flex-col gap-2 w-96">
        <div>ALL</div>
        <div>FAVOURITE</div>
      </div>
      <Container className="px-5">{/* Grid FETCH */}</Container>
    </div>
  </Container>
);

export default ThegraphPage;
