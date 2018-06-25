export class ServiceProvider{
    private static services = {};

    static getService<T>(clazz: { new (): T }){
        let service = ServiceProvider.services[clazz.toString()];
        if(service){
            return service;
        }
        service = new clazz();
        ServiceProvider.services[clazz.toString()] = service;
        return service;
    }
}

