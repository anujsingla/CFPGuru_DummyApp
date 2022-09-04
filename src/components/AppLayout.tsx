import {
  Nav,
  NavItem,
  NavList,
  Page,
  PageHeader,
  PageSection,
  PageSectionVariants,
} from "@patternfly/react-core";
import { keys, map } from "lodash";
import { ReactNode } from "react";
import { AppTabs } from "../enum/appTabs";
import { NavLink } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

export function AppLayout(props: IProps) {
  const logoProps = {
    href: "/",
  };
  const PageNav = (
    <Nav variant="horizontal" aria-label="Nav">
      <NavList>
        {map(keys(AppTabs), (key) => {
          const tab = AppTabs[key];
          return (
            <NavItem key={tab.id}>
              <NavLink to={tab.path}>{tab.label}</NavLink>
            </NavItem>
          );
        })}
      </NavList>
    </Nav>
  );
  const header = (
    <PageHeader
      logoProps={logoProps}
      logo="CFP Guru"
      className="cfp-guru-header"
      topNav={PageNav}
    />
  );
  return (
    <Page header={header}>
      <PageSection variant={PageSectionVariants.light}>
        {props.children}
      </PageSection>
    </Page>
  );
}
