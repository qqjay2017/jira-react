/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";

export const GridLayout = () => {
  return (
    <Layout>
      <Header>Header</Header>
      <Menu>Menu</Menu>
      <Content>Content</Content>
      <Aside>Aside</Aside>
      <Footer>Footer</Footer>
    </Layout>
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
  background-color: greenyellow;
`;
