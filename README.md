# pge_mrad - Jorge Medina

Create a RESTful API to fetch stations data and store it as CSV in S3

## Installation - Local Setup

To install this project, you will need to have # [Podman](https://podman.io/docs/installation) installed on your machine. Once you have Podman installed, you can build the Docker image by running the following command in the root directory of the project:

```bash
podman build -t pge_mrad_jmr .
podman run -p 3000:3000 pge_mrad_jmr
```

## Serverless Framework Setup

To run the Serverless Framework locally, you will need to have Node.js and npm installed on your machine. Once you have Node.js and npm installed, you can install the Serverless Framework by running the following command:

```bash
npm install -g serverless
```

To run it you can use the following command:

```bash
sls offline start --stage qa    
```

Deploy to QA/PROD:

```bash
serverless deploy --stage qa #qa
serverless deploy --stage prod #prod
```


## AWS Lambda Usage
Lambda was deployed using API Gateway and can accessed through the following:

```bash
curl --location --request POST 'https://9cthicem09.execute-api.us-west-2.amazonaws.com/qa/processStations' \
--header 'x-api-token: my-secret-token'
```

## AWS S3 Usage
The CSV file is stored in S3 and can be accessed through the following:

```bash
curl --location --request GET 'https://jmrpgeqa.s3.us-west-2.amazonaws.com/data.csv' \
```

## Testing
To run the tests, you will need to have Node.js and npm installed on your machine. Once you have Node.js and npm installed, you can install the dependencies by running the following command:

```bash
npm install
npm test
```

