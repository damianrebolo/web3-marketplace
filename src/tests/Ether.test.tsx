import { render } from "@testing-library/react";
import { EtherIcon } from "../components/shared/icons/Ether";

it("renders homepage unchanged", () => {
  const { container } = render(<EtherIcon />);
  expect(container).toMatchSnapshot();
});
