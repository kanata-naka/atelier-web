import { BLOG_URL } from "../common/models";

const Component = () => {
  return null;
};

Component.getInitialProps = async ({ res }) => {
  if (res) {
    // noteにリダイレクトする
    res.writeHead(302, { Location: BLOG_URL });
    res.end();
  }
};

export default Component;
