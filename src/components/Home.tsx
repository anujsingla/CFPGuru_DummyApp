import {
  Banner,
  Bullseye,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Text,
  TextContent,
  TextVariants,
} from "@patternfly/react-core";
import { useNavigate } from "react-router-dom";
import { AppTabs } from "../enum/appTabs";

export function Home() {
  const navigation = useNavigate();
  const navigateCFPForm = () => {
    navigation(`${AppTabs.CFP_FORM.path}`, { replace: true });
  };
  return (
    <Bullseye>
      <Card isPlain isLarge>
        <CardTitle>
          <TextContent>
            <Text
              className="pf-u-text-align-center font-size-7vw"
              component={TextVariants.h1}
            >
              CFP GURU
            </Text>
          </TextContent>
          <Banner screenReaderText="Banner line" variant="info" />
        </CardTitle>
        <CardBody>
          <div className="pf-u-text-align-center">
            Create killer conference submissions in minutes
          </div>
        </CardBody>
        <CardFooter className="pf-u-text-align-center">
          <Button onClick={navigateCFPForm} variant="primary">
            Start
          </Button>
        </CardFooter>
      </Card>
    </Bullseye>
  );
}
