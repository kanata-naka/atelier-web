import { NextPageContext } from "next";
import { BLOG_URL } from "@/constants";

function Page() {
  return null;
}

Page.getInitialProps = async function ({ res }: NextPageContext) {
  if (res) {
    // 外部サイトにリダイレクトする
    res.writeHead(302, { Location: BLOG_URL });
    res.end();
  }
};

export default Page;
