/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Profile
// ====================================================

export interface Profile_profile_skills_languages {
  __typename: "SkillsType";
  title: string;
}

export interface Profile_profile_skills_frameworks {
  __typename: "SkillsType";
  title: string;
  level: number | null;
}

export interface Profile_profile_skills_tools {
  __typename: "SkillsType";
  title: string;
}

export interface Profile_profile_skills {
  __typename: "Skills";
  languages: Profile_profile_skills_languages[];
  frameworks: Profile_profile_skills_frameworks[];
  tools: Profile_profile_skills_tools[];
}

export interface Profile_profile_projects {
  __typename: "ProjectType";
  title: string;
  github_link: string;
  description: string;
  from: any | null;
  feature: string;
}

export interface Profile_profile_education {
  __typename: "EducationType";
  school: string;
  major: string;
  from: any | null;
  to: any | null;
  description: string | null;
}

export interface Profile_profile {
  __typename: "Profile";
  id: string;
  handle: string;
  avatar: string | null;
  phone: string;
  email: string;
  bio: string;
  status: string;
  location: string | null;
  github: string | null;
  position: string | null;
  social: any | null;
  skills: Profile_profile_skills;
  projects: Profile_profile_projects[];
  education: Profile_profile_education[];
}

export interface Profile {
  profile: Profile_profile[];
}
