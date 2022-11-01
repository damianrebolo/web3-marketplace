import { render } from "@testing-library/react";
import { EtherIcon } from "./Ether";

it("renders homepage unchanged", () => {
  const { container } = render(<EtherIcon />);
  expect(container).toMatchSnapshot();
});
