import { NextPageContext } from "next";
import { BLOG_URL } from "@/constants";

function Page() {
  return null;
}

Page.getInitialProps = async function ({ res }: NextPageContext) {
  if (res) {
    // noteにリダイレクトする
    res.writeHead(302, { Location: BLOG_URL });
    res.end();
  }
};

export default Page;
