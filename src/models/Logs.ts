export default interface Logs {
    integrationId: number,
    originId: number,
    originName: string,
    integrationName: string,
    message: string,
    url: string,
    msgRequest: string,
    msgResponse: string,
    status: string,
    date: Date,
    favorite : string
    visible: string,
    requestMethod: string,
    contentType: string,
    urlReinstate: string,
    reinstate: string,
  }