interface ConfigDefinition {
    host: string
    port: number
    https: {
        enabled: boolean
        key?: string
        cert?: string 
    }
    db: {
        host: string
        port: number
        database: string,
    },
    debug: {
        stackSize: number
    }
    shutdown: {
        appKill: number
        serverClose: number
    }
}

declare module 'config' {
    var config: ConfigDefinition; // eslint-disable-line vars-on-top
    export default config;
}

interface ApiError {
    code: string
    details?: any
    message: string
    source: {
        error: any
        request: {
            headers: string[]
            id: string
            url: string
        }
    }
    stack: any
    status: number
    title: string
}