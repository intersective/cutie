export const environment = {
  production: true,
  demo: false,
  appkey: '<CUSTOM_APPKEY>',
  pusherKey: '<CUSTOM_PUSHERKEY>',
  env: '<CUSTOM_APPENV>',
  APIEndpoint: '<CUSTOM_APIENDPOINT>',
  APIEndpointOld: '<CUSTOM_APIENDPOINTOLD>',
  Practera: '<CUSTOM_PRACTERCORE>',
  graphQL: '<CUSTOM_GEAPHQLENDPOINT>',
  chatGraphQL: '<CUSTOM_CHATGEAPHQLENDPOINT>',
  filestack: {
    key: '<CUSTOM_FILESTACK_KEY>',
    s3Config: {
      location: 's3',
      container: '<CUSTOM_S3_BUCKET>',
      containerChina: '<CUSTOM_S3_BUCKET_CHINA>',
      region: '<CUSTOM_AWS_REGION>',
      regionChina: '<CUSTOM_AWS_REGION_CHINA>',
      paths: {
        any: '<CUSTOM_PATH_ANY>',
        image: '<CUSTOM_PATH_IMAGE>',
        video: '<CUSTOM_PATH_VIDEO>'
      },
      workflows: [
        '<CUSTOM_FILESTACK_VIRUS_DETECTION>',
      ],
    },
    policy: '<CUSTOM_FILESTACK_POLICY>',
    signature: '<CUSTOM_FILESTACK_SIGNATURE>',
    workflows: {
      virusDetection: '<CUSTOM_FILESTACK_VIRUS_DETECTION>',
    },
  }
};
