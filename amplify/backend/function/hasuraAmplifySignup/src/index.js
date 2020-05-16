/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const axios = require('axios');

const query = `
    mutation addUser($id: String!, $phone:String!, $email: String!){
      insert_users(objects:{
        email: $email
        id: $id
        phone: $phone
      }) {
        affected_rows
        returning {
          email
        }
      }
}
`

exports.handler = async (event, context, callback) => {

    try{
    
        const endPoint = "https://ms-hasura-aws-sample.herokuapp.com/v1/graphql";
        console.log("Request Body", event.request)
        console.log("User Attibutes: ", event.request.userAttributes)
        console.log("Event userName: ", event.userName)
    
    
         const qv = {
           email: event.request.userAttributes.email, 
           phone: event.request.userAttributes.phone_number,
           id: event.userName
         };
        
        const reqData= JSON.stringify({query: query, variables: qv})
    
        const options = {
          headers: {'Content-Type': 'application/json', 'x-hasura-admin-secret': 'N0thing123'}
        };

        const { data } = await axios.post(endPoint, reqData, options )
        console.log("Hasura DAta: ++++++++++++++++++++++" )
        console.log("Hasura  TEst: ++++++++++++++++++++++", JSON.stringify((data)))
        callback(null, event);
      
    } catch (e) {
        console.log("ERROR: ", e)
        callback(null, false)
      }
    
    
    
    // const qv = {
    //       email: '1111lambda@gmail.com', 
    //       phone: '456456456456',
    //       id: 'somee id'
    //     };
        
    
    
    
    // TODO implement
    // const response = {
    //     statusCode: 200,
    //     body: JSON.stringify('Hello from Lambda!'),
    // };
    // return response;

    // console.log("Something is bad")

    // callback(null, false)
          
};
