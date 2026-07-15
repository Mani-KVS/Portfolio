export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const SitePartsFragmentDoc = gql`
    fragment SiteParts on Site {
  __typename
  hero {
    __typename
    name
    role
    tagline
    profileImage
    resumeUrl
    location
    workstationImage
    workstationImageAlt
  }
  stats {
    __typename
    label
    value
    suffix
    icon
  }
  about {
    __typename
    intro
    objective
    interests
    strengths
  }
  contact {
    __typename
    email
    phone
    linkedin
    github
    leetcode
  }
  seo {
    __typename
    title
    description
    keywords
  }
}
    `;
export const SkillsPartsFragmentDoc = gql`
    fragment SkillsParts on Skills {
  __typename
  categories {
    __typename
    id
    title
    icon
    skills
  }
}
    `;
export const EducationPartsFragmentDoc = gql`
    fragment EducationParts on Education {
  __typename
  entries {
    __typename
    institution
    degree
    location
    period
    score
    isCurrent
  }
}
    `;
export const ExperiencePartsFragmentDoc = gql`
    fragment ExperienceParts on Experience {
  __typename
  entries {
    __typename
    role
    organization
    period
    location
    description
    isCurrent
  }
}
    `;
export const ProjectsPartsFragmentDoc = gql`
    fragment ProjectsParts on Projects {
  __typename
  name
  image
  description
  technologies
  github
  demo
  period
  featured
  order
}
    `;
export const CertificationsPartsFragmentDoc = gql`
    fragment CertificationsParts on Certifications {
  __typename
  name
  organization
  image
  issueDate
  credentialUrl
  order
}
    `;
export const SiteDocument = gql`
    query site($relativePath: String!) {
  site(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...SiteParts
  }
}
    ${SitePartsFragmentDoc}`;
export const SiteConnectionDocument = gql`
    query siteConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: SiteFilter) {
  siteConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...SiteParts
      }
    }
  }
}
    ${SitePartsFragmentDoc}`;
export const SkillsDocument = gql`
    query skills($relativePath: String!) {
  skills(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...SkillsParts
  }
}
    ${SkillsPartsFragmentDoc}`;
export const SkillsConnectionDocument = gql`
    query skillsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: SkillsFilter) {
  skillsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...SkillsParts
      }
    }
  }
}
    ${SkillsPartsFragmentDoc}`;
export const EducationDocument = gql`
    query education($relativePath: String!) {
  education(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...EducationParts
  }
}
    ${EducationPartsFragmentDoc}`;
export const EducationConnectionDocument = gql`
    query educationConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: EducationFilter) {
  educationConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...EducationParts
      }
    }
  }
}
    ${EducationPartsFragmentDoc}`;
export const ExperienceDocument = gql`
    query experience($relativePath: String!) {
  experience(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ExperienceParts
  }
}
    ${ExperiencePartsFragmentDoc}`;
export const ExperienceConnectionDocument = gql`
    query experienceConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ExperienceFilter) {
  experienceConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ExperienceParts
      }
    }
  }
}
    ${ExperiencePartsFragmentDoc}`;
export const ProjectsDocument = gql`
    query projects($relativePath: String!) {
  projects(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ProjectsParts
  }
}
    ${ProjectsPartsFragmentDoc}`;
export const ProjectsConnectionDocument = gql`
    query projectsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ProjectsFilter) {
  projectsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ProjectsParts
      }
    }
  }
}
    ${ProjectsPartsFragmentDoc}`;
export const CertificationsDocument = gql`
    query certifications($relativePath: String!) {
  certifications(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...CertificationsParts
  }
}
    ${CertificationsPartsFragmentDoc}`;
export const CertificationsConnectionDocument = gql`
    query certificationsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: CertificationsFilter) {
  certificationsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...CertificationsParts
      }
    }
  }
}
    ${CertificationsPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    site(variables, options) {
      return requester(SiteDocument, variables, options);
    },
    siteConnection(variables, options) {
      return requester(SiteConnectionDocument, variables, options);
    },
    skills(variables, options) {
      return requester(SkillsDocument, variables, options);
    },
    skillsConnection(variables, options) {
      return requester(SkillsConnectionDocument, variables, options);
    },
    education(variables, options) {
      return requester(EducationDocument, variables, options);
    },
    educationConnection(variables, options) {
      return requester(EducationConnectionDocument, variables, options);
    },
    experience(variables, options) {
      return requester(ExperienceDocument, variables, options);
    },
    experienceConnection(variables, options) {
      return requester(ExperienceConnectionDocument, variables, options);
    },
    projects(variables, options) {
      return requester(ProjectsDocument, variables, options);
    },
    projectsConnection(variables, options) {
      return requester(ProjectsConnectionDocument, variables, options);
    },
    certifications(variables, options) {
      return requester(CertificationsDocument, variables, options);
    },
    certificationsConnection(variables, options) {
      return requester(CertificationsConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
