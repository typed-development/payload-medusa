/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
/* deno-fmt-ignore-file */
import "sst"
export {}
declare module "sst" {
  export interface Resource {
    "Assets": {
      "name": string
      "type": "sst.aws.Bucket"
    }
    "Core": {
      "service": string
      "type": "sst.aws.Service"
      "url": string
    }
    "CoreDBURL": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "VPC": {
      "type": "sst.aws.Vpc"
    }
  }
}