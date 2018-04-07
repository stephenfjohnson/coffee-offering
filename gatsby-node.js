const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
        edges {
          node {
            excerpt(pruneLength: 400)
            html
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              path
              date
              title
              image
              heading
              offeringBy
              origin
              status
              house
              bags
              harvest
              elevation
              process
              description
              intro {
                blurbs {
                  image
                  text
                }
                heading
                description
              }
              main {
                heading
                description
                image1 {
                  alt
                  image
                }
                image2 {
                  alt
                  image
                }
                image3 {
                  alt
                  image
                }
              }
              testimonials {
                author
                quote
              }
              full_image
              pricing {
                heading
                description
                plans {
                  description
                  items
                  plan
                  price
                }
              }
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    return result.data.allMarkdownRemark.edges.forEach(edge => {
      // const pagePath = node.frontmatter.path;
      const id = edge.node.id;
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(`src/templates/${String(edge.node.frontmatter.templateKey)}.js`),
        context: { id }
      }); // additional data can be passed via context
    });
  });
};

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
