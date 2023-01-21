# OpenFaaS Templates

These templates extend the list of available templates by the OpenSaaS community.

## Pull templates
Using the following command you can pull the templates
```
faas-cli template pull https://github.com/kinesis-medical/openfaas-templates
```

## Available templates
### `node16-ts`
This template supports the use of Typescript.
The build process will take place during the docker build.
```
faas-cli new my-ts-function --lang node16-ts
```
