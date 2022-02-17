# OpenFaaS Templates

These templates extend the list of available templates by the OpenSaaS community.
Currently I only have one template, which is the `node16-ts`

## Pull templates
Using the following command you can pull the templates
```
faas-cli template pull https://github.com/tim-brand/openfaas-templates
```

## Available templates
- node16-ts

## New function based on my template
```
faas-cli new my-ts-function --lang node16-ts
```
