import { ChainId, useNetwork, useNetworkMismatch } from "@thirdweb-dev/react";
import { useCallback, useEffect, useState } from "react";
import { InfoIcon } from "../icons";
import Alert from "../ui/Alert";
import { Button } from "../ui/Button";

export const MismatchAlert: React.FC = () => {
  const [show, setShow] = useState(false);
  const isMismatched = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  useEffect(() => {
    isMismatched ? setShow(true) : setShow(false);
  }, [isMismatched, setShow]);

  const swtichNetwork = useCallback(async () => {
    await switchNetwork?.(ChainId.Goerli);
  }, [switchNetwork]);

  return (
    <Alert variant="warning" show={show}>
      <Alert.Heading>Network mismatch!</Alert.Heading>
      <Alert.Body>Your wallet is connected to the wrong network, please connect it to Goerli!</Alert.Body>
      <Alert.Actions>
        <Button variant="outline-warning" size="sm" onClick={() => swtichNetwork()}>
          <InfoIcon />
          Switch
        </Button>
        <Button variant="secondary" size="sm" onClick={() => setShow(false)}>
          Dismiss
        </Button>
      </Alert.Actions>
    </Alert>
  );
};
