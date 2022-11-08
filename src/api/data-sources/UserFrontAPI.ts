import { RESTDataSource, WillSendRequestOptions } from '@apollo/datasource-rest';

class UserFrontAPI extends RESTDataSource {
  override baseURL = `${process.env.USERFRONT_BASE_URL}`;

  override willSendRequest(request: WillSendRequestOptions) {
    request.headers['Content-Type'] = "application/json";
    request.headers['Authorization'] = `Bearer ${process.env.USERFRONT_API_KEY}`;
  };
}

export default UserFrontAPI;