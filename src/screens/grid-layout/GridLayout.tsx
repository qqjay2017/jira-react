import styled from "styled-components";

import styles from "./styles.module.less";
import ProjectListScreen from "screens/project-list";
import { Button } from "antd";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import Test from "screens/Test";

const ErrorFallback: React.FC<FallbackProps> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { error, resetErrorBoundary } = props;
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export const GridLayout = () => {
  useDocumentTitle("GridLayout", false);
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Layout>
        <Header>
          <Button
            onClick={() => {
              throw new Error("点击抛出一个异常");
            }}
          >
            点击抛出一个异常
          </Button>
        </Header>
        <Menu>
          <Test />
        </Menu>
        <Content>
          <ProjectListScreen />
        </Content>
        <Aside>Aside</Aside>
        <Footer>Footer</Footer>
      </Layout>
    </ErrorBoundary>
  );
};

const Layout = styled.div`
  display: grid;

  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-gap: 10px;

  height: 100vh;
  grid-template-areas:
    "header header header"
    "menu content aside"
    "footer footer footer";
  @media (max-width: 768px) {
    grid-template-areas:
      "header"
      "menu"
      "content"
      "aside"
      "footer";
    grid-template-columns: 1fr;
    grid-template-rows:
      auto
      minmax(75px, auto)
      1fr
      minmax(75px, auto)
      auto;
  }
`;

const Header = styled.div`
  grid-area: header;
  background-color: blanchedalmond;
`;

const Menu = styled.div`
  grid-area: menu;
  margin-left: 0.5rem;
  background-color: burlywood;
  @media (max-width: 768px) {
    margin: 0;
  }
`;

const Aside = styled.div`
  grid-area: aside;
  margin-right: 0.5rem;
  background-color: blue;
  @media (max-width: 768px) {
    margin: 0;
  }
`;

const Footer = styled.div`
  grid-area: footer;
  background-color: hotpink;
`;

const Content = styled.div`
  grid-area: content;
`;
