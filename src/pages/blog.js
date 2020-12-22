import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const Component = () => {
  return null;
};

Component.getInitialProps = async ({ res }) => {
  if (res) {
    // noteにリダイレクトする
    res.writeHead(302, { Location: publicRuntimeConfig.BLOG_URL });
    res.end();
  }
};

export default Component;
