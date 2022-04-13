import { NextPage } from "next";
import { BLOG_URL } from "../constants";

const Page: NextPage = () => {
  return null;
};

Page.getInitialProps = async ({ res }) => {
  if (res) {
    // noteにリダイレクトする
    res.writeHead(302, { Location: BLOG_URL });
    res.end();
  }
};

export default Page;
