import React from "react";
import {
  Rubyonrails,
  ReactLogo,
  Angular,
  Html5,
  Css3,
  Java,
  Javascript,
  Spring,
  Laravel,
  Docker,
  Microsoftsqlserver,
  Mysql,
  Postgresql,
  NodeDotJs,
  Django,
  Postman,
  Cplusplus,
  Python,
  Csharp,
  Php,
  Bootstrap,
  Zendframework,
  Reactivex,
  Wordpress,
  Go,
  Swift,
  C,
  Kotlin,
  Scala,
  R,
  Meteor,
  DotNet,
  Codeigniter,
  Typescript,
  Github,
  Magento,
  Circleci,
  Adobephotoshop,
  VueDotJs,
  Kubernetes,
  Webpack,
  Trello,
  Yarn,
  Npm,
  Androidstudio,
  Xcode,
  Adobelightroom,
  Intellijidea,
  Amazonaws,
  Heroku,
  Firebase,
  Mongodb,
  Oracle,
  Framer,
  Antdesign,
  MaterialUi,
  StyledComponents,
  Sass,
  Pytorch,
  Tensorflow,
  Nginx,
  Cloudflare,
  Apache,
  Jupyter,
  Linux,
  Dart,
  Electron,
  SocketDotIo,
  Expo,
  Ionic,
  Jest,
  Visualstudiocode,
  Flutter,
  Graphql,
  Apollographql,
} from "@styled-icons/simple-icons";
import { StyledIcon } from "@styled-icons/styled-icon";

const popularFrameworks: category = {
  DotNet: DotNet,
  RubyOnRails: Rubyonrails,
  "React.js": ReactLogo,
  Angular: Angular,
  "Vue.Js": VueDotJs,
  SpringBoot: Spring,
  Laravel: Laravel,
  "Node.js": NodeDotJs,
  Django: Django,
  Sass: Sass,
  Bootstrap: Bootstrap,
  Antdesign: Antdesign,
  MaterialUi: MaterialUi,
  StyledComponents: StyledComponents,
  Graphql: Graphql,
  Flutter: Flutter,
  Reactivex: Reactivex,
  Electron: Electron,
  "Socket.Io": SocketDotIo,
  Ionic: Ionic,
  Pytorch: Pytorch,
  Tensorflow: Tensorflow,
  Wordpress: Wordpress,
  Zendframework: Zendframework,
  Meteor: Meteor,
  Codeigniter: Codeigniter,
  Magento: Magento,
};

const popularLanguages: category = {
  Java: Java,
  Javascript: Javascript,
  Typescript: Typescript,
  "C++": Cplusplus,
  Python: Python,
  "C#": Csharp,
  PHP: Php,
  Go: Go,
  Swift: Swift,
  Html5: Html5,
  CSS3: Css3,
  Microsoftsqlserver: Microsoftsqlserver,
  Mysql: Mysql,
  Postgresql: Postgresql,
  C: C,
  Kotlin: Kotlin,
  Scala: Scala,
  R: R,
  Dart: Dart,
};

const popularTools: category = {
  Docker: Docker,
  Apollographql: Apollographql,
  Kubernetes: Kubernetes,
  Postman: Postman,
  Github: Github,
  Expo: Expo,
  Webpack: Webpack,
  Trello: Trello,
  Circleci: Circleci,
  Firebase: Firebase,
  Jest: Jest,
  Amazonaws: Amazonaws,
  Heruko: Heroku,
  Mongodb: Mongodb,
  Oracle: Oracle,
  Yarn: Yarn,
  Npm: Npm,
  Androidstudio: Androidstudio,
  Xcode: Xcode,
  Intellijidea: Intellijidea,
  Visualstudiocode: Visualstudiocode,
  Framer: Framer,
  Nginx: Nginx,
  Cloudflare: Cloudflare,
  Apache: Apache,
  Jupyter: Jupyter,
  Linux: Linux,
  Adobelightroom: Adobelightroom,
  Adobephotoshop: Adobephotoshop,
};

type category = {
  [key: string]: StyledIcon;
};

interface Props {
  iconName: string;
  size: number;
  type: string;
}

export const DynamicIcon = (props: Props): any => {
  const { iconName, size, type } = props;
  switch (type) {
    case "frameworks":
      const IconName = popularFrameworks[iconName];
      return <IconName size={size} />;
    case "languages":
      const IconNameLanguage = popularLanguages[iconName];
      return <IconNameLanguage size={size} />;
    case "tools":
      const IconNameTool = popularTools[iconName];
      return <IconNameTool size={size} />;
    default:
      break;
  }
};
