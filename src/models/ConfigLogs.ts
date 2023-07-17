export default interface ConfigLogs {
    integrationId: boolean,
    originId: boolean,
    originName : boolean,
    message: boolean,
    time: boolean,
    requestMethod: boolean,
    contentType: boolean,
    debugMode: boolean,
    username : string | null
}