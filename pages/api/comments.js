import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const graphcmsToken = process.env.GRAPHCMS_TOKEN;

export default async function comments(request, response) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphcmsToken}`,
    },
  });

  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $subject: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          subject: $subject
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;

  // try {
  //   const result = await graphQLClient.request(query, request.body);
  //   return response.status(200).send(result);
  // } catch (error) {
  //   console.log(error);
  //   return response.status(200).send(error);
  // }

  const result = await graphQLClient.request(query, {
    name: request.body.name,
    email: request.body.email,
    subject: request.body.subject,
    comment: request.body.comment,
    slug: request.body.slug,
  });

  return response.status(200).send(result);
}
